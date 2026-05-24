import path from 'path'
import fs from 'fs'
import { config } from '../config/index.js'
import { logger } from '../lib/logger.js'
import { broadcast } from '../lib/sse.js'
import { generateVideoScript } from '../lib/claude.js'
import { generateSceneImages } from '../lib/pollinations.js'
import { synthesizeSpeech, getAudioDuration } from '../lib/tts.js'
import { assembleReel, generateThumbnail, calculateSceneDurations } from '../lib/ffmpeg.js'
import { updateContentItem, getContentItem } from '../models/contentItem.js'
import { getBrand } from '../models/brand.js'

export interface VideoReelParams {
  contentItemId: string
  topic: string
  hook: string
}

export async function buildVideoReel(params: VideoReelParams): Promise<string> {
  const { contentItemId, topic, hook } = params
  const item = getContentItem(contentItemId)
  if (!item) throw new Error(`Content item not found: ${contentItemId}`)

  const brand = getBrand(item.brandId)
  if (!brand) throw new Error(`Brand not found: ${item.brandId}`)

  const jobDir = path.join(config.tempDir, contentItemId)
  if (!fs.existsSync(jobDir)) fs.mkdirSync(jobDir, { recursive: true })

  const emitProgress = (stage: string, percent: number) => {
    broadcast('video:progress', { contentItemId, stage, percent })
    logger.debug(`Video [${contentItemId}] ${stage} ${percent}%`)
  }

  updateContentItem(contentItemId, { status: 'generating' })

  try {
    // Stage 1: Generate script
    emitProgress('Generating script', 5)
    const script = await generateVideoScript({
      topic,
      hook,
      brandName: brand.name,
      voice: brand.voice,
      durationSeconds: 60,
    })
    updateContentItem(contentItemId, { script: script.fullScript })

    // Stage 2: Generate scene images in parallel
    emitProgress('Generating visuals', 20)
    const brandStyle = `${brand.colorPrimary} and ${brand.colorSecondary} color palette, dark background, modern minimal`
    const imagePaths = await generateSceneImages(script.sceneDescriptions, contentItemId, brandStyle)

    // Stage 3: Synthesize voice
    emitProgress('Synthesizing voice', 55)
    const audioPath = path.join(jobDir, 'narration.mp3')
    await synthesizeSpeech(script.fullScript, audioPath)

    // Stage 4: Calculate timing
    emitProgress('Calculating timing', 65)
    const audioDuration = await getAudioDuration(audioPath)
    const durations = calculateSceneDurations(audioDuration, imagePaths.length)
    const scenes = imagePaths.map((imagePath, i) => ({ imagePath, durationSeconds: durations[i] }))

    // Stage 5: Assemble reel
    emitProgress('Assembling video', 70)
    const outputPath = path.join(config.assetsDir, 'videos', `${contentItemId}.mp4`)
    await assembleReel({
      scenes,
      audioPath,
      outputPath,
      onProgress: (pct) => emitProgress('Assembling video', 70 + Math.round(pct * 0.25)),
    })

    // Stage 6: Generate thumbnail
    emitProgress('Generating thumbnail', 97)
    const thumbnailPath = path.join(config.assetsDir, 'thumbnails', `${contentItemId}.jpg`)
    await generateThumbnail(outputPath, thumbnailPath)

    updateContentItem(contentItemId, {
      status: 'ready',
      mediaPath: outputPath,
      thumbnailPath,
      script: script.fullScript,
    })

    // Cleanup temp dir
    fs.rmSync(jobDir, { recursive: true, force: true })

    emitProgress('Complete', 100)
    broadcast('video:complete', { contentItemId, mediaPath: outputPath })
    logger.info(`Video reel complete: ${contentItemId}`)
    return outputPath

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    updateContentItem(contentItemId, { status: 'failed', error: msg })
    broadcast('video:error', { contentItemId, error: msg })
    throw error
  }
}

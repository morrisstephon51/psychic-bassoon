import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'
import { config } from '../config/index.js'
import { logger } from './logger.js'

ffmpeg.setFfmpegPath(config.ffmpegPath)

export interface SlideScene {
  imagePath: string
  durationSeconds: number
}

// Assemble final reel from scenes + audio using concat demuxer
// More reliable than filter_complex for variable clip counts
export async function assembleReel(params: {
  scenes: SlideScene[]
  audioPath: string
  outputPath: string
  brandWatermark?: string
  onProgress?: (percent: number) => void
}): Promise<string> {
  const { scenes, audioPath, outputPath, onProgress } = params
  const jobDir = path.dirname(outputPath)

  if (!fs.existsSync(jobDir)) fs.mkdirSync(jobDir, { recursive: true })

  // Step 1: Convert each image to a video clip at the target duration
  const clipPaths: string[] = []
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i]
    const clipPath = path.join(jobDir, `clip_${i.toString().padStart(2, '0')}.mp4`)
    await imageToVideoClip(scene.imagePath, clipPath, scene.durationSeconds)
    clipPaths.push(clipPath)
    onProgress?.(Math.round((i / scenes.length) * 40))
  }

  // Step 2: Write concat manifest
  const concatManifest = path.join(jobDir, 'concat.txt')
  const manifestContent = clipPaths.map((p) => `file '${p}'`).join('\n')
  fs.writeFileSync(concatManifest, manifestContent)
  onProgress?.(45)

  // Step 3: Concatenate clips
  const concatPath = path.join(jobDir, 'concat.mp4')
  await concatClips(concatManifest, concatPath)
  onProgress?.(65)

  // Step 4: Merge with audio
  await mergeAudio(concatPath, audioPath, outputPath)
  onProgress?.(90)

  // Cleanup temp clips
  for (const p of clipPaths) {
    try { fs.unlinkSync(p) } catch { /* ignore */ }
  }
  try { fs.unlinkSync(concatPath) } catch { /* ignore */ }
  try { fs.unlinkSync(concatManifest) } catch { /* ignore */ }

  onProgress?.(100)
  logger.info(`Reel assembled: ${outputPath}`)
  return outputPath
}

function imageToVideoClip(imagePath: string, outputPath: string, duration: number): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg(imagePath)
      .inputOptions(['-loop 1'])
      .outputOptions([
        `-t ${duration}`,
        '-vf scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z=\'min(zoom+0.0015,1.5)\':d=1:s=1080x1920',
        '-c:v libx264',
        '-pix_fmt yuv420p',
        '-r 30',
        '-preset fast',
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run()
  })
}

function concatClips(manifestPath: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(manifestPath)
      .inputOptions(['-f concat', '-safe 0'])
      .outputOptions(['-c copy'])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run()
  })
}

function mergeAudio(videoPath: string, audioPath: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions([
        '-c:v copy',
        '-c:a aac',
        '-shortest',
        '-map 0:v:0',
        '-map 1:a:0',
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run()
  })
}

export async function generateThumbnail(videoPath: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: ['00:00:02'],
        filename: path.basename(outputPath),
        folder: path.dirname(outputPath),
        size: '1080x1920',
      })
      .on('end', () => resolve(outputPath))
      .on('error', reject)
  })
}

export function calculateSceneDurations(audioDuration: number, sceneCount: number): number[] {
  const base = audioDuration / sceneCount
  return Array(sceneCount).fill(0).map(() => Math.max(2, base))
}

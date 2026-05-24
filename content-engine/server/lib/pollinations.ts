import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { logger } from './logger.js'
import { config } from '../config/index.js'

const BASE_URL = 'https://image.pollinations.ai/prompt'

export interface ImageOptions {
  width?: number
  height?: number
  seed?: number
  nologo?: boolean
  enhance?: boolean
  model?: string
}

export async function generateImage(
  prompt: string,
  outputPath: string,
  options: ImageOptions = {}
): Promise<string> {
  const {
    width = 1080,
    height = 1920,
    nologo = true,
    enhance = true,
    model = 'flux',
  } = options

  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    nologo: String(nologo),
    enhance: String(enhance),
    model,
  })
  if (options.seed !== undefined) params.set('seed', String(options.seed))

  const encodedPrompt = encodeURIComponent(prompt)
  const url = `${BASE_URL}/${encodedPrompt}?${params}`

  logger.debug(`Generating image: ${prompt.substring(0, 60)}...`)

  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const response = await axios.get(url, {
    responseType: 'stream',
    timeout: 60_000,
  })

  await new Promise<void>((resolve, reject) => {
    const writer = fs.createWriteStream(outputPath)
    response.data.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
  })

  logger.debug(`Image saved: ${outputPath}`)
  return outputPath
}

export async function generateSceneImages(
  sceneDescriptions: string[],
  jobId: string,
  brandStyle: string = 'dark tech aesthetic, purple and green neon accents, modern minimal'
): Promise<string[]> {
  const tempDir = path.join(config.tempDir, jobId, 'scenes')
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

  const imagePaths: string[] = []

  for (let i = 0; i < sceneDescriptions.length; i++) {
    const enhancedPrompt = `${sceneDescriptions[i]}, ${brandStyle}, no text, no watermark, cinematic`
    const outputPath = path.join(tempDir, `scene_${i.toString().padStart(2, '0')}.jpg`)
    await generateImage(enhancedPrompt, outputPath, { width: 1080, height: 1920 })
    imagePaths.push(outputPath)

    // Small delay to be polite to free API
    if (i < sceneDescriptions.length - 1) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  return imagePaths
}

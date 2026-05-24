import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { logger } from './logger.js'

// Uses edge-tts (Microsoft neural voices, free)
// Install: pip install edge-tts

const DEFAULT_VOICE = 'en-US-AriaNeural'
const DEFAULT_RATE = '+10%'
const DEFAULT_PITCH = '+0Hz'

export interface TTSOptions {
  voice?: string
  rate?: string
  pitch?: string
}

export async function synthesizeSpeech(
  text: string,
  outputPath: string,
  options: TTSOptions = {}
): Promise<string> {
  const voice = options.voice ?? DEFAULT_VOICE
  const rate = options.rate ?? DEFAULT_RATE
  const pitch = options.pitch ?? DEFAULT_PITCH

  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  return new Promise((resolve, reject) => {
    const args = [
      '-m', 'edge_tts',
      '--voice', voice,
      '--rate', rate,
      '--pitch', pitch,
      '--text', text,
      '--write-media', outputPath,
    ]

    logger.debug(`TTS: synthesizing ${text.length} chars → ${outputPath}`)

    const proc = spawn('python3', args, { stdio: ['ignore', 'pipe', 'pipe'] })

    let stderr = ''
    proc.stderr.on('data', (d: Buffer) => { stderr += d.toString() })

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`edge-tts exited ${code}: ${stderr}`))
      } else if (!fs.existsSync(outputPath)) {
        reject(new Error(`edge-tts did not produce output at ${outputPath}`))
      } else {
        logger.debug(`TTS complete: ${outputPath}`)
        resolve(outputPath)
      }
    })

    proc.on('error', (err) => reject(new Error(`Failed to spawn edge_tts: ${err.message}`)))
  })
}

export async function getAudioDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const proc = spawn('python3', [
      '-c',
      `import mutagen.mp3; import sys; f = mutagen.mp3.MP3(sys.argv[1]); print(f.info.length)`,
      filePath,
    ])

    let stdout = ''
    proc.stdout.on('data', (d: Buffer) => { stdout += d.toString() })
    proc.on('close', (code) => {
      if (code !== 0) {
        // fallback: assume 60s if mutagen not available
        resolve(60)
      } else {
        resolve(parseFloat(stdout.trim()) || 60)
      }
    })
    proc.on('error', () => resolve(60))
  })
}

export const VOICE_OPTIONS = {
  'aria-neural': 'en-US-AriaNeural',
  'guy-neural': 'en-US-GuyNeural',
  'jenny-neural': 'en-US-JennyNeural',
  'eric-neural': 'en-US-EricNeural',
  'ana-neural': 'en-US-AnaNeural',
}

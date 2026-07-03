import { readFileSync } from 'fs'
import { join } from 'path'
import type { VideoSceneData } from './content-types.js'
import type { QualityReport } from './types.js'

interface TrendsData {
  typography: { trending: string[]; overused: string[] }
  color_moods: { trending: string[]; overused: string[] }
  layout_patterns: { trending: string[]; overused: string[] }
  motion_styles: { trending: string[]; overused: string[] }
  content_formats: { trending: string[]; overused: string[] }
}

function loadTrends(): TrendsData {
  try {
    const raw = readFileSync(join(process.cwd(), 'trends/current_trends.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { typography: { trending: [], overused: [] }, color_moods: { trending: [], overused: [] }, layout_patterns: { trending: [], overused: [] }, motion_styles: { trending: [], overused: [] }, content_formats: { trending: [], overused: [] } }
  }
}

const OVERUSED_PATTERNS = [
  { pattern: /purple.*pink|pink.*purple/i, label: 'purple-to-pink gradient — generic tech look' },
  { pattern: /impact/i, label: 'Impact font — overused emphasis choice' },
  { pattern: /rainbow/i, label: 'rainbow gradient text — visual noise' },
  { pattern: /teal.*coral|coral.*teal/i, label: 'teal-coral color scheme — dated 2021-era trend' },
  { pattern: /gold.*black|black.*gold/i, label: 'gold-on-black — overused luxury cliché' },
]

export function runTrendAlignmentAgent(data: VideoSceneData): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 80
  const trends = loadTrends()

  for (const scene of data.scenes) {
    const bg = scene.background
    const allColors = [
      bg?.value ?? '',
      ...(scene.text_layers ?? []).map(l => l.color),
      ...(scene.text_layers ?? []).map(l => l.background_color),
    ].join(' ')

    for (const { pattern, label } of OVERUSED_PATTERNS) {
      if (pattern.test(allColors)) {
        issues.push(`Scene ${scene.scene_id}: Detected overused pattern — ${label}`)
        score -= 10
      }
    }

    const allTextContent = (scene.text_layers ?? []).map(l => l.text).join(' ').toLowerCase()
    if (/lorem ipsum|placeholder|tbd|sample|test/i.test(allTextContent)) {
      issues.push(`Scene ${scene.scene_id}: Placeholder text detected — "${allTextContent.match(/lorem ipsum|placeholder|tbd|sample|test/i)?.[0]}"`)
      score -= 15
    }

    const layers = scene.text_layers ?? []
    const isAllCentered = layers.length > 0 && layers.every(l => l.position === 'center')
    if (isAllCentered && layers.length > 2) {
      issues.push(`Scene ${scene.scene_id}: All ${layers.length} layers centered — symmetrical layout lacks visual tension`)
      suggestions.push('Break symmetry: offset headline left/right or use top + bottom anchoring')
      score -= 8
    }

    const isAllSameAnimation = layers.length > 1 && layers.every(l => l.animation === layers[0].animation)
    if (isAllSameAnimation && layers[0]?.animation === 'fade_in') {
      issues.push(`Scene ${scene.scene_id}: Generic fade-in applied to every element — lacks motion personality`)
      suggestions.push('Use staggered animations: mix slide_up, pop_in, and typewriter for visual interest')
      score -= 5
    }
  }

  if (issues.length === 0) {
    suggestions.push(...trends.layout_patterns.trending.slice(0, 2).map(t => `Consider trending layout: ${t}`))
    suggestions.push(...trends.motion_styles.trending.slice(0, 1).map(t => `Consider trending motion style: ${t}`))
    score = 90
  }

  score = Math.max(0, Math.min(100, score))

  return {
    agentName: 'TrendAlignmentAgent',
    score,
    issues,
    suggestions,
    approved: score >= 65,
    timestamp: new Date().toISOString(),
  }
}

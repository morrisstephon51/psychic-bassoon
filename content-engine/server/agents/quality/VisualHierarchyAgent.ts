import type { VideoSceneData } from './content-types.js'
import type { QualityReport } from './types.js'

const SIZE_RANK: Record<string, number> = { sm: 0, md: 1, lg: 2, xl: 3, '2xl': 4 }

export function runVisualHierarchyAgent(data: VideoSceneData): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100

  for (const scene of data.scenes) {
    const layers = scene.text_layers ?? []

    const hasHeadline = layers.some(l => l.style === 'headline' || l.style === 'cta')
    if (layers.length > 0 && !hasHeadline) {
      issues.push(`Scene ${scene.scene_id}: No headline layer — viewer has no clear focal point`)
      suggestions.push('Add a headline text layer to anchor visual hierarchy')
      score -= 15
    }

    const largeLayers = layers.filter(l => SIZE_RANK[l.font_size] >= SIZE_RANK['xl'])
    if (largeLayers.length > 2) {
      issues.push(`Scene ${scene.scene_id}: ${largeLayers.length} oversized text elements compete for attention`)
      suggestions.push('Reduce to one primary xl/2xl headline; demote others to lg or md')
      score -= 8 * (largeLayers.length - 2)
    }

    if (layers.length > 5) {
      issues.push(`Scene ${scene.scene_id}: ${layers.length} text layers — composition is overcrowded`)
      suggestions.push('Limit to 3–4 text layers per scene to preserve breathing room')
      score -= 10
    }

    const ranks = layers.map(l => SIZE_RANK[l.font_size] ?? 1)
    if (ranks.length > 1 && Math.max(...ranks) - Math.min(...ranks) < 1) {
      issues.push(`Scene ${scene.scene_id}: All text layers are the same font size — no size hierarchy`)
      suggestions.push('Use at least 2 distinct font sizes to guide the eye from primary to secondary content')
      score -= 12
    }

    if (!scene.background?.type) {
      issues.push(`Scene ${scene.scene_id}: Missing background — foreground/background depth undefined`)
      suggestions.push('Define a background (gradient, image, or solid_color) to establish z-axis layering')
      score -= 15
    }

    const positions = layers.map(l => l.position)
    const positionConflicts = positions.filter((p, i) => positions.indexOf(p) !== i)
    if (positionConflicts.length > 0) {
      issues.push(`Scene ${scene.scene_id}: Multiple layers share position '${positionConflicts[0]}' — likely overlap`)
      suggestions.push('Assign unique positions to each text layer to avoid unintended overlapping')
      score -= 8
    }
  }

  score = Math.max(0, score)

  return {
    agentName: 'VisualHierarchyAgent',
    score,
    issues,
    suggestions,
    approved: score >= 70,
    timestamp: new Date().toISOString(),
  }
}

import type { VideoSceneData } from './content-types.js'
import type { QualityReport } from './types.js'

function parseHex(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6) return null
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)]
}

function linearize(v: number): number {
  const s = v / 255
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(hex: string): number | null {
  const rgb = parseHex(hex)
  if (!rgb) return null
  const [r, g, b] = rgb.map(linearize)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(fg: string, bg: string): number | null {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  if (l1 === null || l2 === null) return null
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

const FONT_SIZE_PX: Record<string, number> = { sm: 12, md: 16, lg: 20, xl: 28, '2xl': 36 }
const BODY_MIN_PX = 16
const CAPTION_MIN_PX = 12

export function runAccessibilityComplianceAgent(data: VideoSceneData): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100
  let hardFail = false

  for (const scene of data.scenes) {
    const bgColor = scene.background?.type === 'solid_color' ? scene.background.value : null

    for (const layer of scene.text_layers ?? []) {
      const textColor = layer.color
      const pillBg = layer.background_pill ? layer.background_color : null
      const effectiveBg = pillBg ?? bgColor

      if (textColor && effectiveBg && effectiveBg !== 'transparent') {
        const ratio = contrastRatio(textColor, effectiveBg)
        if (ratio !== null) {
          const isLargeText = (FONT_SIZE_PX[layer.font_size] ?? 16) >= 24 || layer.bold
          const required = isLargeText ? 3.0 : 4.5
          if (ratio < required) {
            issues.push(
              `Scene ${scene.scene_id} layer '${layer.id}': contrast ratio ${ratio.toFixed(1)}:1 — ` +
              `below WCAG AA minimum of ${required}:1 (${isLargeText ? 'large' : 'normal'} text)`
            )
            suggestions.push(`Increase contrast between '${textColor}' and '${effectiveBg}' — try #ffffff on dark or #000000 on light`)
            score -= 20
            hardFail = true
          }
        }
      }

      const pxSize = FONT_SIZE_PX[layer.font_size] ?? 16
      if (layer.style === 'caption' || layer.style === 'body') {
        const min = layer.style === 'caption' ? CAPTION_MIN_PX : BODY_MIN_PX
        if (pxSize < min) {
          issues.push(`Scene ${scene.scene_id} layer '${layer.id}': font size ${pxSize}px is below minimum ${min}px for ${layer.style} text`)
          suggestions.push(`Increase font_size to 'md' (16px) or larger for body copy`)
          score -= 10
        }
      }
    }

    const allColors = (scene.text_layers ?? []).map(l => l.color).filter(Boolean)
    const uniqueColors = new Set(allColors)
    if (uniqueColors.size === 1 && (scene.text_layers?.length ?? 0) > 2) {
      issues.push(`Scene ${scene.scene_id}: All text layers use a single color — information differentiation relies on color alone`)
      suggestions.push('Add weight (bold) or size variation alongside color to distinguish content types')
      score -= 8
    }
  }

  score = Math.max(0, score)

  return {
    agentName: 'AccessibilityComplianceAgent',
    score,
    issues,
    suggestions,
    approved: !hardFail,
    timestamp: new Date().toISOString(),
  }
}

import type { VideoSceneData, BrandVault } from './content-types.js'
import type { QualityReport } from './types.js'

function parseHex(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '').trim()
  if (clean.length !== 6) return null
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)]
}

function colorDistance(a: string, b: string): number {
  const ca = parseHex(a)
  const cb = parseHex(b)
  if (!ca || !cb) return 999
  return Math.sqrt((ca[0] - cb[0]) ** 2 + (ca[1] - cb[1]) ** 2 + (ca[2] - cb[2]) ** 2)
}

function isApproved(color: string, palette: string[], threshold = 45): boolean {
  if (!color || color === 'transparent' || color.startsWith('rgba') || color.startsWith('rgb')) return true
  return palette.some(c => colorDistance(color, c) <= threshold)
}

export function runBrandConsistencyAgent(data: VideoSceneData, brand: BrandVault): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100
  let colorViolations = 0

  const p = brand.color_palette
  const approvedPalette = [
    p?.primary, p?.secondary, p?.accent,
    p?.background_dark, p?.background_light, p?.text_on_dark,
    '#ffffff', '#000000', '#111111', '#eeeeee',
  ].filter((c): c is string => typeof c === 'string' && c.length > 0)

  for (const scene of data.scenes) {
    for (const layer of scene.text_layers ?? []) {
      if (layer.color && !isApproved(layer.color, approvedPalette)) {
        issues.push(`Scene ${scene.scene_id}: Text color '${layer.color}' is not in the brand palette`)
        colorViolations++
        score -= 12
      }
      if (layer.background_pill && layer.background_color && !isApproved(layer.background_color, approvedPalette)) {
        issues.push(`Scene ${scene.scene_id}: Pill background '${layer.background_color}' is not in the brand palette`)
        colorViolations++
        score -= 8
      }
    }

    const bg = scene.background
    if (bg?.type === 'solid_color' && bg.value && !isApproved(bg.value, approvedPalette)) {
      issues.push(`Scene ${scene.scene_id}: Solid background '${bg.value}' is not in the brand palette`)
      colorViolations++
      score -= 8
    }
  }

  if (colorViolations > 0) {
    suggestions.push(`Use brand colors: ${approvedPalette.slice(0, 4).join(', ')}`)
  }

  if (!brand.logo_url) {
    issues.push('Brand logo URL is not configured — logo cannot be verified in output')
    suggestions.push('Upload a brand logo in Brand Vault settings')
    score -= 5
  }

  const fonts = brand.font_preferences
  if (!fonts?.headline || !fonts?.body) {
    issues.push('Brand font preferences not fully configured')
    suggestions.push('Set headline and body font preferences in Brand Vault to enable font enforcement')
    score -= 5
  }

  score = Math.max(0, score)

  return {
    agentName: 'BrandConsistencyAgent',
    score,
    issues,
    suggestions,
    approved: colorViolations === 0,
    timestamp: new Date().toISOString(),
  }
}

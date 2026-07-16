import { readFileSync } from 'fs'
import { join } from 'path'
import type { VideoSceneData } from './content-types.js'
import type { QualityReport, BlockReport } from './types.js'
import { runVisualHierarchyAgent } from './VisualHierarchyAgent.js'
import { runBrandConsistencyAgent } from './BrandConsistencyAgent.js'
import { runTrendAlignmentAgent } from './TrendAlignmentAgent.js'
import { runAccessibilityComplianceAgent } from './AccessibilityComplianceAgent.js'
import { runHookStrengthAgent } from './HookStrengthAgent.js'
import { runNarrativeFlowAgent } from './NarrativeFlowAgent.js'
import { runPlatformComplianceAgent } from './PlatformComplianceAgent.js'
import type { BrandVault } from './content-types.js'

interface PlatformLimits {
  [platform: string]: {
    video_max_mb?: number
    image_max_mb?: number
    min_width?: number
    min_height?: number
    supported_aspect_ratios?: string[]
    video_max_duration_s?: number
  }
}

const PLACEHOLDER_PATTERNS = [/lorem ipsum/i, /\bTBD\b/, /\bSAMPLE\b/, /\bplaceholder\b/i, /\[.*?\]/]

const MIN_RESOLUTION: Record<string, number> = {
  '1080x1920': 1080,
  '1080x1080': 1080,
  '1920x1080': 1080,
}

const EXPECTED_ASPECT_RATIOS: Record<string, string> = {
  '1080x1920': '9:16',
  '1080x1080': '1:1',
  '1920x1080': '16:9',
}

function loadPlatformLimits(): PlatformLimits {
  try {
    const raw = readFileSync(join(process.cwd(), 'config/platform_limits.json'), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function runFinalProductionQAAgent(data: VideoSceneData, brand: BrandVault): BlockReport {
  const reports: Record<string, QualityReport> = {
    VisualHierarchyAgent: runVisualHierarchyAgent(data),
    BrandConsistencyAgent: runBrandConsistencyAgent(data, brand),
    TrendAlignmentAgent: runTrendAlignmentAgent(data),
    AccessibilityComplianceAgent: runAccessibilityComplianceAgent(data),
    HookStrengthAgent: runHookStrengthAgent(data),
    NarrativeFlowAgent: runNarrativeFlowAgent(data),
    PlatformComplianceAgent: runPlatformComplianceAgent(data),
  }

  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100

  const blockedBy = Object.entries(reports)
    .filter(([, r]) => !r.approved)
    .map(([name]) => name)

  if (blockedBy.length > 0) {
    issues.push(`Upstream agents failed: ${blockedBy.join(', ')}`)
    score -= blockedBy.length * 20
  }

  const minPx = MIN_RESOLUTION[data.resolution]
  if (minPx && minPx < 1080) {
    issues.push(`Resolution ${data.resolution} is below minimum spec of 1080px`)
    score -= 20
  }

  const expectedRatio = EXPECTED_ASPECT_RATIOS[data.resolution]
  if (expectedRatio && data.aspect_ratio !== expectedRatio) {
    issues.push(`Aspect ratio mismatch: declared '${data.aspect_ratio}' but resolution '${data.resolution}' implies '${expectedRatio}'`)
    suggestions.push(`Set aspect_ratio to '${expectedRatio}' to match the declared resolution`)
    score -= 10
  }

  for (const scene of data.scenes) {
    for (const layer of scene.text_layers ?? []) {
      for (const pattern of PLACEHOLDER_PATTERNS) {
        if (pattern.test(layer.text)) {
          issues.push(`Scene ${scene.scene_id}: Placeholder text detected in layer '${layer.id}': "${layer.text.slice(0, 40)}"`)
          score -= 25
        }
      }
    }
    if (PLACEHOLDER_PATTERNS.some(p => p.test(scene.voiceover_text ?? ''))) {
      issues.push(`Scene ${scene.scene_id}: Placeholder text in voiceover_text`)
      score -= 10
    }
  }

  if (!data.platform_copy?.tiktok_caption && !data.platform_copy?.instagram_caption) {
    issues.push('No platform copy generated — social media captions are missing')
    suggestions.push('Ensure the AI generation step produces platform_copy for all target platforms')
    score -= 10
  }

  if (!data.broll_search_queries?.length && data.scenes.some(s => s.background.type === 'broll_video')) {
    issues.push('B-roll scenes present but no broll_search_queries defined')
    score -= 5
  }

  score = Math.max(0, score)

  const selfReport: QualityReport = {
    agentName: 'FinalProductionQAAgent',
    score,
    issues,
    suggestions,
    approved: score >= 80 && blockedBy.length === 0,
    timestamp: new Date().toISOString(),
  }

  reports.FinalProductionQAAgent = selfReport

  return {
    exportAllowed: selfReport.approved,
    blockedBy: selfReport.approved ? [] : [...blockedBy, ...(score < 80 ? ['FinalProductionQAAgent'] : [])],
    reports,
    timestamp: new Date().toISOString(),
  }
}

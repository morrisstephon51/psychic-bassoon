import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import type { VideoSceneData, BrandVault } from './content-types.js'
import type { BlockReport, QualityReport } from './types.js'
import { runFinalProductionQAAgent } from './FinalProductionQAAgent.js'

export type { QualityReport, BlockReport }

export { runVisualHierarchyAgent } from './VisualHierarchyAgent.js'
export { runBrandConsistencyAgent } from './BrandConsistencyAgent.js'
export { runTrendAlignmentAgent } from './TrendAlignmentAgent.js'
export { runAccessibilityComplianceAgent } from './AccessibilityComplianceAgent.js'
export { runHookStrengthAgent } from './HookStrengthAgent.js'
export { runNarrativeFlowAgent } from './NarrativeFlowAgent.js'
export { runPlatformComplianceAgent } from './PlatformComplianceAgent.js'
export { runFinalProductionQAAgent } from './FinalProductionQAAgent.js'

function persistReport(report: BlockReport, contentItemId: string): void {
  try {
    const dir = join(process.cwd(), 'logs/quality_reports')
    mkdirSync(dir, { recursive: true })
    const filename = `${contentItemId}_${Date.now()}.json`
    writeFileSync(join(dir, filename), JSON.stringify(report, null, 2))
  } catch (err) {
    console.error('[design_quality] Failed to write quality report:', err)
  }
}

export async function runDesignQualityPipeline(
  data: VideoSceneData,
  brand: BrandVault,
  contentItemId: string,
): Promise<BlockReport> {
  const report = runFinalProductionQAAgent(data, brand)
  persistReport(report, contentItemId)

  if (!report.exportAllowed) {
    console.warn(
      `[design_quality] Export BLOCKED for ${contentItemId}. Failed agents: ${report.blockedBy.join(', ')}`
    )
  }

  return report
}

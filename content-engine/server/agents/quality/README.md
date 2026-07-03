# Design Quality Agents

Five specialized agents that review AI-generated media before export. All agents analyze `VideoSceneData` (the JSON scene structure) and return a structured `QualityReport`.

## Pipeline

```
VideoSceneData + BrandVault
  → VisualHierarchyAgent      (score ≥ 70 required)
  → BrandConsistencyAgent     (zero color violations required)
  → TrendAlignmentAgent       (score ≥ 65 required)
  → AccessibilityComplianceAgent (zero contrast failures required)
  → FinalProductionQAAgent    (meta-agent; orchestrates all 4 above + production checks)
  → BlockReport { exportAllowed, blockedBy, reports }
```

## Usage

```typescript
import { runDesignQualityPipeline } from '@/agents/design_quality'

const report = await runDesignQualityPipeline(videoSceneData, brandVault, contentItemId)

if (!report.exportAllowed) {
  console.warn('Export blocked by:', report.blockedBy)
  // show report.reports[agentName].issues to user
} else {
  // proceed to export
}
```

## Agents

| Agent | Threshold | Checks |
|-------|-----------|--------|
| `VisualHierarchyAgent` | score ≥ 70 | Focal point, size hierarchy, overcrowding, position conflicts |
| `BrandConsistencyAgent` | zero color violations | Color palette delta, logo configured, font preferences |
| `TrendAlignmentAgent` | score ≥ 65 | Overused patterns, placeholder text, centered layouts |
| `AccessibilityComplianceAgent` | zero contrast failures | WCAG AA contrast, font size minimums |
| `FinalProductionQAAgent` | all upstream pass + score ≥ 80 | Resolution, aspect ratio, placeholder text, platform copy |

## Reports

Reports are written to `logs/quality_reports/{contentItemId}_{timestamp}.json` automatically.

## Config Files

- `config/platform_limits.json` — max file sizes and dimension specs per platform
- `trends/current_trends.json` — trend data consumed by `TrendAlignmentAgent`

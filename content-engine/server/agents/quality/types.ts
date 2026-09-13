export interface QualityReport {
  agentName: string
  score: number
  issues: string[]
  suggestions: string[]
  approved: boolean
  timestamp: string
}

export interface BlockReport {
  exportAllowed: boolean
  blockedBy: string[]
  reports: Record<string, QualityReport>
  timestamp: string
}

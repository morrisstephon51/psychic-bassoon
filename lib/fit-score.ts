// Grant fit score: 0–100 based on org type, geography, mission alignment, and
// stage eligibility. Pure, dependency-free scoring logic so it can be unit
// tested (lib/**/*.test.ts) and shared by any server route that needs to score
// a grant. Extracted from app/api/cron/scan-grants/route.ts, where it was
// defined but never called — see lib/fit-score.test.ts.

export type ScorableGrant = {
  tags?: string[] | null
  requirements?: string | null
  source?: string | null
}

export function computeFitScore(grant: ScorableGrant): number {
  const text = `${(grant.tags || []).join(' ')} ${grant.requirements || ''}`.toLowerCase()
  let score = 0

  // Org type match (30 pts)
  if (text.includes('nonprofit') || text.includes('fiscal sponsor') || text.includes('community')) score += 30
  else if (text.includes('small business') || text.includes('for-profit')) score += 5
  else score += 15

  // Geography match (20 pts)
  if (text.includes('illinois') || text.includes('chicago') || text.includes('cook county')) score += 20
  else if (text.includes('midwest')) score += 12
  else score += 8

  // Mission alignment (30 pts)
  if (text.includes('ai') || text.includes('digital equity') || text.includes('literacy') ||
      text.includes('faith') || text.includes('workforce')) score += 30
  else if (text.includes('education') || text.includes('technology') || text.includes('community')) score += 18
  else score += 8

  // Stage eligibility (20 pts)
  if (text.includes('fiscal sponsor') || text.includes('pre-entity') ||
      text.includes('emerging') || text.includes('early stage')) score += 20
  else if (text.includes('requires 501') || text.includes('established')) score += 5
  else score += 12

  return Math.min(score, 100)
}

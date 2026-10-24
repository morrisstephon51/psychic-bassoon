// Unit tests for computeFitScore. This logic lived inline in the scan-grants
// cron route and was never called (fit_score was only ever hand-entered, so the
// FitBar / "priority" filter on the grants page sat inert). Extracting it to lib
// both fixes the dead-code bug (the cron now imports and calls it) and brings it
// under the `lib/**/*.test.ts` runner so the scoring contract is pinned.
//
// Zero dependencies: runs on the built-in Node test runner.
//   node --test lib/fit-score.test.ts   (or `npm test`)

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeFitScore } from './fit-score.ts'

test('fully Plug-AI-aligned grant scores the 100 ceiling', () => {
  // nonprofit (30) + chicago (20) + ai (30) + fiscal sponsor (20) = 100.
  assert.equal(
    computeFitScore({ tags: ['nonprofit', 'ai'], requirements: 'chicago fiscal sponsor emerging' }),
    100,
  )
})

test('empty grant falls to the neutral baseline, not 0', () => {
  // else-branches: org 15 + geo 8 + mission 8 + stage 12 = 43.
  assert.equal(computeFitScore({ tags: [], requirements: '' }), 43)
})

test('null/absent fields are handled without throwing (same baseline)', () => {
  assert.equal(computeFitScore({}), 43)
  assert.equal(computeFitScore({ tags: null, requirements: null, source: null }), 43)
})

test('low-fit for-profit grant scores in the weak band', () => {
  // for-profit (5) + no geo (8) + no mission (8) + requires-501/established (5) = 26.
  assert.equal(
    computeFitScore({ tags: ['for-profit'], requirements: 'established org, requires 501c3' }),
    26,
  )
})

test('mid-tier midwest education grant', () => {
  // no org match (15) + midwest (12) + education (18) + no stage (12) = 57.
  assert.equal(
    computeFitScore({ tags: ['midwest'], requirements: 'education programs' }),
    57,
  )
})

test('score is always within the 0–100 DB CHECK bounds', () => {
  const samples = [
    computeFitScore({ tags: ['nonprofit', 'ai', 'chicago', 'faith'], requirements: 'fiscal sponsor emerging early stage' }),
    computeFitScore({ tags: [], requirements: '' }),
    computeFitScore({ tags: ['for-profit'], requirements: 'established' }),
  ]
  for (const s of samples) {
    assert.ok(s >= 0 && s <= 100, `score ${s} out of 0-100 bounds`)
  }
})

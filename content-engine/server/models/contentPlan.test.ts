import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'

// Set env BEFORE loading any module that imports config or opens the DB.
// Each run gets its own throwaway SQLite file.
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'test-key'
process.env.DB_PATH = path.join(os.tmpdir(), `ce-update-plan-${process.pid}-${process.hrtime.bigint()}.db`)

const { runMigrations } = await import('../db/schema.js')
const { createContentPlan, updateContentPlan, getContentPlan } = await import('./contentPlan.js')
const { ensureDefaultBrand } = await import('./brand.js')

runMigrations()
const brandId = ensureDefaultBrand().id // content_plans.brand_id is a foreign key

function planWithRawPlan() {
  const plan = createContentPlan({ brandId, weekStart: '2026-11-23', theme: 'advent', platforms: ['instagram'] })
  updateContentPlan(plan.id, { status: 'ready', rawPlan: { days: [1, 2, 3] } })
  assert.deepEqual(getContentPlan(plan.id)!.rawPlan, { days: [1, 2, 3] }, 'precondition: raw_plan set')
  return plan.id
}

// THE BUG (#50): COALESCE(?, raw_plan) kept the old plan when null was passed on purpose.
test('updateContentPlan({ rawPlan: null }) clears a stored plan', () => {
  const id = planWithRawPlan()
  updateContentPlan(id, { status: 'generating', rawPlan: null })
  const after = getContentPlan(id)!
  assert.equal(after.rawPlan, null, 'raw_plan must clear when null is passed explicitly')
  assert.equal(after.status, 'generating')
})

// Omitted key must still preserve every column (no over-clear).
test('updateContentPlan without a rawPlan key preserves raw_plan and other fields', () => {
  const id = planWithRawPlan()
  updateContentPlan(id, { status: 'done' })
  const after = getContentPlan(id)!
  assert.deepEqual(after.rawPlan, { days: [1, 2, 3] }, 'omitted rawPlan must keep existing value')
  assert.equal(after.theme, 'advent')
  assert.deepEqual(after.platforms, ['instagram'])
  assert.equal(after.status, 'done')
})

// A new value still overwrites.
test('updateContentPlan with a new rawPlan overwrites the old one', () => {
  const id = planWithRawPlan()
  updateContentPlan(id, { rawPlan: { days: [9] } })
  assert.deepEqual(getContentPlan(id)!.rawPlan, { days: [9] })
})

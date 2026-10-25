import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

// Set env BEFORE loading any module that imports config (which requires
// ANTHROPIC_API_KEY) or opens the DB. Each run gets its own throwaway SQLite file.
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'test-key'
const tmpDb = path.join(os.tmpdir(), `ce-publish-claim-${process.pid}-${process.hrtime.bigint()}.db`)
process.env.DB_PATH = tmpDb

const { getDb } = await import('../db/client.js')
const { runMigrations } = await import('../db/schema.js')
const {
  createContentItem,
  getContentItem,
  updateContentItem,
  claimForPublishing,
} = await import('../models/contentItem.js')

runMigrations()
const db = getDb()
db.prepare(
  `INSERT INTO brands (id, name, handle, niche, voice, hashtags) VALUES ('b1','B','h','n','v','#x')`,
).run()
db.prepare(
  `INSERT INTO content_plans (id, brand_id, week_start, theme, platforms) VALUES ('p1','b1','2026-01-01','t','["instagram"]')`,
).run()

function newItem(status: string) {
  const item = createContentItem({ planId: 'p1', brandId: 'b1', type: 'text_post', platform: 'instagram' })
  updateContentItem(item.id, { status: status as never, scheduledAt: '2026-01-01T00:00:00Z' })
  return item.id
}

test('a scheduled item can be claimed exactly once', () => {
  const id = newItem('scheduled')
  assert.equal(claimForPublishing(id), true, 'first claim must win')
  assert.equal(claimForPublishing(id), false, 'second claim must lose — already publishing')
  assert.equal(getContentItem(id)!.status, 'publishing')
})

test('a ready item can be claimed; re-claim fails', () => {
  const id = newItem('ready')
  assert.equal(claimForPublishing(id), true)
  assert.equal(claimForPublishing(id), false)
})

test('items not in ready/scheduled are never claimable', () => {
  for (const status of ['pending', 'generating', 'published', 'failed', 'publishing']) {
    const id = newItem(status)
    assert.equal(claimForPublishing(id), false, `status=${status} must not be claimable`)
    assert.equal(getContentItem(id)!.status, status, `status=${status} must be left untouched`)
  }
})

test('two scheduler ticks selecting the same scheduled item publish it once', () => {
  // The publisher cron runs every minute and enqueues a publish job for every
  // still-'scheduled' item. If a job lingers in the queue past one tick, the same
  // item is enqueued twice. Simulate both publish attempts reaching the claim:
  // exactly one proceeds, the duplicate is rejected before any post.
  const id = newItem('scheduled')
  const tick1 = claimForPublishing(id)
  const tick2 = claimForPublishing(id)
  assert.deepEqual([tick1, tick2].filter(Boolean).length, 1, 'exactly one publish attempt may proceed')
})

test.after(() => {
  try { fs.rmSync(tmpDb, { force: true }) } catch { /* ignore */ }
  for (const ext of ['-wal', '-shm']) { try { fs.rmSync(tmpDb + ext, { force: true }) } catch { /* ignore */ } }
})

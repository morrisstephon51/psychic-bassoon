import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

// Set env BEFORE importing anything that loads config (needs ANTHROPIC_API_KEY)
// or opens the DB. Each run gets its own throwaway SQLite file.
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'test-key'
const tmpDb = path.join(os.tmpdir(), `ce-reenqueue-${process.pid}-${process.hrtime.bigint()}.db`)
process.env.DB_PATH = tmpDb

const { getDb } = await import('../db/client.js')
const { runMigrations } = await import('../db/schema.js')
const { createContentItem, updateContentItem, getScheduledItems } = await import('../models/contentItem.js')
const { enqueue, hasActivePublishJob, dequeue, completeJob, listJobs } = await import('../lib/queue.js')

runMigrations()
const db = getDb()
db.prepare(`INSERT INTO brands (id,name,handle,niche,voice,hashtags) VALUES ('b1','B','h','n','v','#x')`).run()
db.prepare(`INSERT INTO content_plans (id,brand_id,week_start,theme,platforms) VALUES ('p1','b1','2026-01-01','t','["instagram"]')`).run()

const NOW = '2026-06-01T00:00:00Z'

function newScheduledItem(): string {
  const it = createContentItem({ planId: 'p1', brandId: 'b1', type: 'text_post', platform: 'instagram' })
  updateContentItem(it.id, { status: 'scheduled', scheduledAt: '2026-01-01T00:00:00Z' })
  return it.id
}

function publishJobCount(id: string): number {
  return [...listJobs('queued'), ...listJobs('processing')]
    .filter((j) => j.type === 'publish_content' && j.payload.contentItemId === id).length
}

// The old publisher loop: enqueue a publish job for every still-'scheduled' item.
function tickOld(): void {
  for (const item of getScheduledItems(NOW)) {
    enqueue('publish_content', { contentItemId: item.id }, { priority: 10 })
  }
}

// The patched publisher loop: skip items that already have an active publish job.
function tickNew(): void {
  for (const item of getScheduledItems(NOW)) {
    if (hasActivePublishJob(item.id)) continue
    enqueue('publish_content', { contentItemId: item.id }, { priority: 10 })
  }
}

test('control: the OLD loop re-enqueues on every tick while a job waits (the bug)', () => {
  const id = newScheduledItem()
  tickOld(); tickOld(); tickOld()
  assert.equal(publishJobCount(id), 3, 'old loop floods the queue with a duplicate per tick')
})

test('fix: three ticks enqueue at most one publish job per item', () => {
  const id = newScheduledItem()
  tickNew(); tickNew(); tickNew()
  assert.equal(publishJobCount(id), 1, 'at most one live publish job')
})

test('fix: a job already processing also suppresses re-enqueue', () => {
  const id = newScheduledItem()
  tickNew()
  // Drain the queue until THIS item's publish job is 'processing'.
  let guard = 0
  while (!listJobs('processing').some((j) => j.type === 'publish_content' && j.payload.contentItemId === id) && guard++ < 50) {
    const j = dequeue('publish_content')
    if (!j) break
    if (j.payload.contentItemId !== id) completeJob(j.id)
  }
  tickNew()
  assert.equal(publishJobCount(id), 1, 'processing counts as active — no second job')
})

test('once published, a new tick adds no publish job', () => {
  const id = newScheduledItem()
  tickNew()
  assert.equal(publishJobCount(id), 1, 'one job from the first tick')
  // Terminate that job and move the item to its normal success state.
  let j = dequeue('publish_content')
  while (j && j.payload.contentItemId !== id) { completeJob(j.id); j = dequeue('publish_content') }
  if (j) completeJob(j.id)
  updateContentItem(id, { status: 'published' })
  tickNew()
  assert.equal(publishJobCount(id), 0, 'published items are excluded by getScheduledItems — no new job')
})

test.after(() => {
  try { fs.rmSync(tmpDb, { force: true }) } catch { /* ignore */ }
  for (const ext of ['-wal', '-shm']) { try { fs.rmSync(tmpDb + ext, { force: true }) } catch { /* ignore */ } }
})

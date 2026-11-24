import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

// Set env BEFORE loading any module that imports config (which requires
// ANTHROPIC_API_KEY) or opens the DB. Each run gets its own throwaway SQLite file.
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'test-key'
const tmpDb = path.join(os.tmpdir(), `ce-update-item-${process.pid}-${process.hrtime.bigint()}.db`)
process.env.DB_PATH = tmpDb

const { getDb } = await import('../db/client.js')
const { runMigrations } = await import('../db/schema.js')
const { createContentItem, getContentItem, updateContentItem } = await import('./contentItem.js')

runMigrations()
const db = getDb()
db.prepare(
  `INSERT INTO brands (id, name, handle, niche, voice, hashtags) VALUES ('b1','B','h','n','v','#x')`,
).run()
db.prepare(
  `INSERT INTO content_plans (id, brand_id, week_start, theme, platforms) VALUES ('p1','b1','2026-01-01','t','["instagram"]')`,
).run()

function failedItem(errorMsg: string) {
  const item = createContentItem({ planId: 'p1', brandId: 'b1', type: 'text_post', platform: 'instagram' })
  updateContentItem(item.id, { status: 'failed', error: errorMsg })
  const after = getContentItem(item.id)!
  assert.equal(after.error, errorMsg, 'precondition: error must be set')
  return item.id
}

// --- THE BUG: an explicit `error: null` must clear a stale error. ---
test('updateContentItem({ error: null }) clears a previously-set error', () => {
  const id = failedItem('boom: generation failed')
  updateContentItem(id, { status: 'pending', error: null })
  assert.equal(getContentItem(id)!.error, null, 'error must be cleared when null is passed explicitly')
})

// --- The complementary half: an OMITTED error must be preserved (do not over-clear). ---
test('updateContentItem without an error key preserves the existing error', () => {
  const id = failedItem('still broken')
  updateContentItem(id, { status: 'ready' })
  assert.equal(getContentItem(id)!.error, 'still broken', 'omitted key must keep existing value')
})

// --- Real scenario 1: the /regenerate route (status:'pending', error:null). ---
test('regenerate flow resets a failed item to pending AND clears its error', () => {
  const id = failedItem('upstream 500')
  updateContentItem(id, { status: 'pending', error: null })
  const after = getContentItem(id)!
  assert.equal(after.status, 'pending')
  assert.equal(after.error, null, 'a regenerating item must not keep showing the old failure')
})

// --- Real scenario 2: the publish-success path (status:'published', error:null). ---
test('a previously-failed item that republishes successfully carries no stale error', () => {
  const id = failedItem('first publish timed out')
  updateContentItem(id, {
    status: 'published',
    postId: 'post_123',
    postUrl: 'https://example.com/p/123',
    publishedAt: '2026-01-02T00:00:00Z',
    error: null,
  })
  const after = getContentItem(id)!
  assert.equal(after.status, 'published')
  assert.equal(after.postUrl, 'https://example.com/p/123')
  assert.equal(after.error, null, 'a published item must not keep a prior failure error')
})

// --- Sanity: a new error value still overwrites an old one. ---
test('passing a new error string overwrites the previous error', () => {
  const id = failedItem('error A')
  updateContentItem(id, { error: 'error B' })
  assert.equal(getContentItem(id)!.error, 'error B')
})

test.after(() => {
  try { fs.rmSync(tmpDb, { force: true }) } catch { /* ignore */ }
  for (const ext of ['-wal', '-shm']) { try { fs.rmSync(tmpDb + ext, { force: true }) } catch { /* ignore */ } }
})

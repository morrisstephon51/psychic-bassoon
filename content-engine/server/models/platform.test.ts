import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'

// Set env BEFORE loading any module that imports config (which requires
// ANTHROPIC_API_KEY) or opens the DB. Each run gets its own throwaway SQLite file.
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'test-key'
process.env.DB_PATH = path.join(os.tmpdir(), `ce-update-platform-${process.pid}-${process.hrtime.bigint()}.db`)

const { runMigrations } = await import('../db/schema.js')
const { updatePlatform, getPlatform } = await import('./platform.js')

runMigrations() // seeds the default platforms (instagram, tiktok, ...) with no credentials

function platformWithCredentials(name: string, creds: Record<string, string>) {
  updatePlatform(name, { credentials: creds })
  assert.deepEqual(getPlatform(name)!.credentials, creds, 'precondition: credentials must be set')
}

// --- THE BUG: an explicit `credentials: null` must clear stored credentials. ---
// `credentials` is `Record<string,string> | null` and PUT /platforms/:name forwards
// req.body straight into updatePlatform, so `{ credentials: null }` ("disconnect
// this platform") is a valid request. The old `updates.credentials ? … : (existing
// … )` truthiness conflated "omitted" with "explicitly null/empty" and silently kept
// the old credentials. Same class as updateContentItem (issue #36) / upsertBrand (#44).
test('updatePlatform({ credentials: null }) clears stored credentials (disconnect)', () => {
  platformWithCredentials('instagram', { accessToken: 'secret-token' })
  updatePlatform('instagram', { credentials: null })
  assert.equal(getPlatform('instagram')!.credentials, null, 'credentials must clear when null is passed explicitly')
})

// --- The complementary half: an OMITTED credentials key must be preserved. ---
// Toggling `enabled` (the only field the Settings UI sends today) must not wipe keys.
test('updatePlatform without a credentials key preserves stored credentials', () => {
  platformWithCredentials('tiktok', { accessToken: 'keep-me' })
  updatePlatform('tiktok', { enabled: true })
  assert.deepEqual(getPlatform('tiktok')!.credentials, { accessToken: 'keep-me' }, 'omitted key must keep existing value')
})

// --- Same defect on the other nullable column, `last_post_at`. ---
test('updatePlatform({ lastPostAt: null }) clears a previously-set last_post_at', () => {
  updatePlatform('youtube', { lastPostAt: '2026-01-01T00:00:00Z' })
  assert.equal(getPlatform('youtube')!.lastPostAt, '2026-01-01T00:00:00Z', 'precondition: last_post_at set')
  updatePlatform('youtube', { lastPostAt: null })
  assert.equal(getPlatform('youtube')!.lastPostAt, null, 'last_post_at must clear when null is passed explicitly')
})

test('updatePlatform without a lastPostAt key preserves the existing value', () => {
  updatePlatform('twitter', { lastPostAt: '2026-02-02T00:00:00Z' })
  updatePlatform('twitter', { enabled: true })
  assert.equal(getPlatform('twitter')!.lastPostAt, '2026-02-02T00:00:00Z', 'omitted key must keep existing value')
})

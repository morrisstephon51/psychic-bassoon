import { test } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'

// Set env BEFORE loading any module that imports config (which requires
// ANTHROPIC_API_KEY) or opens the DB. Each run gets its own throwaway SQLite file.
process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'test-key'
process.env.DB_PATH = path.join(os.tmpdir(), `ce-upsert-brand-${process.pid}-${process.hrtime.bigint()}.db`)

const { runMigrations } = await import('../db/schema.js')
const { upsertBrand, getBrand } = await import('./brand.js')

runMigrations()

function brandWithLogo(logo: string) {
  const b = upsertBrand({ name: 'B', handle: '@b', niche: 'n', voice: 'v', hashtags: '#x', logoUrl: logo })
  assert.equal(getBrand(b.id)!.logoUrl, logo, 'precondition: logo must be set')
  return b.id
}

// --- THE BUG: an explicit `logoUrl: null` must clear the stored logo. ---
// `logoUrl` is `string | null` and PUT /brand forwards req.body straight into
// upsertBrand, so `{ logoUrl: null }` ("remove the logo") is a valid request.
// `data.logoUrl ?? existing.logoUrl` conflates "omitted" with "explicitly null"
// and silently keeps the old logo. Same class as updateContentItem (issue #36).
test('upsertBrand({ logoUrl: null }) clears a previously-set logo', () => {
  const id = brandWithLogo('https://cdn.example.com/logo.png')
  upsertBrand({ id, logoUrl: null })
  assert.equal(getBrand(id)!.logoUrl, null, 'logo must be cleared when null is passed explicitly')
})

// --- The complementary half: an OMITTED logoUrl must be preserved (no over-clear). ---
test('upsertBrand without a logoUrl key preserves the existing logo', () => {
  const id = brandWithLogo('https://cdn.example.com/keep.png')
  upsertBrand({ id, name: 'Renamed' })
  assert.equal(getBrand(id)!.logoUrl, 'https://cdn.example.com/keep.png', 'omitted key must keep existing value')
})

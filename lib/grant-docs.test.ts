// Regression tests for the grant-document data-loss bug: generate-docs runs a
// destructive `grant_documents.delete()` right before re-inserting, and
// `content` is NOT NULL. A bare `JSON.parse` let a valid-JSON-but-incomplete
// model response (missing/empty `loi` or `narrative`) through, so the delete
// wiped the grant's docs and the insert then failed on the NOT NULL column —
// leaving the grant with nothing. parseGrantDocs must throw BEFORE returning
// any partial object so the route can bail out before deleting.
//   node --test lib/grant-docs.test.ts   (or `npm test`)

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseGrantDocs, GrantDocsParseError } from './grant-docs.ts'

test('returns both documents when the response is complete', () => {
  const docs = parseGrantDocs('{"loi":"Dear funder","narrative":"The problem is..."}')
  assert.deepEqual(docs, { loi: 'Dear funder', narrative: 'The problem is...' })
})

test('ignores extra keys but keeps the two required docs', () => {
  const docs = parseGrantDocs('{"loi":"L","narrative":"N","budget":"B"}')
  assert.deepEqual(docs, { loi: 'L', narrative: 'N' })
})

// --- The bug cases: each MUST throw, because reaching the delete with any of
// these would destroy the grant's existing docs for nothing. ---

test('throws when narrative is absent (the truncated-response case)', () => {
  assert.throws(() => parseGrantDocs('{"loi":"L"}'), GrantDocsParseError)
})

test('throws when loi is absent', () => {
  assert.throws(() => parseGrantDocs('{"narrative":"N"}'), GrantDocsParseError)
})

test('throws when a required field is an empty or whitespace-only string', () => {
  assert.throws(() => parseGrantDocs('{"loi":"L","narrative":""}'), GrantDocsParseError)
  assert.throws(() => parseGrantDocs('{"loi":"   ","narrative":"N"}'), GrantDocsParseError)
})

test('throws when a required field is the wrong type (null / number)', () => {
  assert.throws(() => parseGrantDocs('{"loi":null,"narrative":"N"}'), GrantDocsParseError)
  assert.throws(() => parseGrantDocs('{"loi":"L","narrative":42}'), GrantDocsParseError)
})

test('throws on invalid JSON', () => {
  assert.throws(() => parseGrantDocs('{"loi":"L", truncat'), GrantDocsParseError)
})

test('throws when the payload is valid JSON but not an object', () => {
  assert.throws(() => parseGrantDocs('"just a string"'), GrantDocsParseError)
  assert.throws(() => parseGrantDocs('null'), GrantDocsParseError)
  assert.throws(() => parseGrantDocs('["loi","narrative"]'), GrantDocsParseError)
})

// Invariant guard: the function never returns a partial/empty pair.
test('never returns an object with an empty required field', () => {
  const inputs = ['{"loi":"L"}', '{"narrative":"N"}', '{"loi":"","narrative":""}', '{}']
  for (const raw of inputs) {
    let result: unknown = 'threw'
    try { result = parseGrantDocs(raw) } catch { /* expected */ }
    assert.equal(result, 'threw', `expected parseGrantDocs(${raw}) to throw, got a value`)
  }
})

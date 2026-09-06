// Regression tests for the date-only off-by-one bug (issue #21).
//
// Pin the timezone to America/Chicago (our audience, and a west-of-UTC zone
// where the bug manifests) BEFORE importing the module under test, so these
// assertions are deterministic no matter what timezone the runner sits in.
// The old code did `new Date('YYYY-MM-DD')`, which the JS spec parses as UTC
// midnight and then renders one calendar day earlier for negative-offset
// viewers. The fix parses date-only strings at LOCAL midnight instead.
//
// Zero dependencies: runs on the built-in Node test runner (Node >= 23).
//   node --test lib/utils.test.ts   (or `npm test`)
process.env.TZ = 'America/Chicago'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatDate, formatShortDate } from './utils.ts'

test('formatDate keeps the calendar day for date-only strings (issue #21)', () => {
  // Before the fix this rendered "August 29, 2026" in Chicago time.
  assert.match(formatDate('2026-08-30'), /August 30, 2026/)
})

test('formatDate renders the correct weekday for date-only strings', () => {
  // Local-midnight parsing must keep the weekday intact too — a UTC-parse
  // off-by-one would shift these back to the prior day (Monday / Friday).
  // (Folded in from the previously-unrun tests/utils.date.test.ts.)
  assert.equal(formatDate('2026-09-15'), 'Tuesday, September 15, 2026')
  assert.equal(formatDate('2026-07-04'), 'Saturday, July 4, 2026')
})

test('formatShortDate keeps the calendar day for date-only strings (issue #21)', () => {
  // Before the fix this rendered "Aug 29, 2026" in Chicago time.
  assert.equal(formatShortDate('2026-08-30'), 'Aug 30, 2026')
})

test('date-only handling holds across a Jan 1 boundary (no year/month rollback)', () => {
  assert.equal(formatShortDate('2026-01-01'), 'Jan 1, 2026')
})

test('full datetime strings pass through unchanged (explicit UTC time respected)', () => {
  // 02:00 UTC on Aug 30 is 21:00 CDT on Aug 29 — a full datetime must NOT be
  // coerced to local midnight, so this correctly stays on the 29th. This locks
  // in the toLocalDate regex boundary (date-only vs full datetime).
  assert.equal(formatShortDate('2026-08-30T02:00:00Z'), 'Aug 29, 2026')
})

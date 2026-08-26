// Regression tests for issue #21: date-only strings must render in LOCAL time,
// not UTC, so Central Time (Chicago) viewers don't see the day before.
//
// Run pinned to the audience timezone (V8 reads TZ at process start):
//   TZ='America/Chicago' node --test tests/utils.date.test.ts
//
// No test framework needed — uses Node's built-in test runner + type stripping.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatDate, formatShortDate } from '../lib/utils.ts'

test('formatShortDate keeps the correct calendar day for a date-only string', () => {
  // 2026-09-15 is a Tuesday. Pre-fix this rendered "Sep 14, 2026" in CT.
  assert.equal(formatShortDate('2026-09-15'), 'Sep 15, 2026')
})

test('formatDate keeps the correct weekday+day for a date-only string', () => {
  assert.equal(formatDate('2026-09-15'), 'Tuesday, September 15, 2026')
})

test('a different date-only string also holds (not a tautology)', () => {
  assert.equal(formatShortDate('2026-01-01'), 'Jan 1, 2026')
  assert.equal(formatDate('2026-07-04'), 'Saturday, July 4, 2026')
})

test('full datetime strings still pass through with their explicit time', () => {
  // Noon local — unaffected by the UTC-midnight rollback, so day is preserved.
  assert.equal(formatShortDate('2026-09-15T12:00:00'), 'Sep 15, 2026')
})

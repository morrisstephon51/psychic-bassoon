// Regression tests for the date-only off-by-one (issue #21) as it reaches the
// shared grant-DEADLINE helpers used by the grants page, the scan-grants cron,
// and grant-document generation. Those three sites had each re-introduced a raw
// `new Date('YYYY-MM-DD')` (UTC midnight) after issue #21 was fixed in
// formatDate/formatShortDate — so a Chicago viewer saw deadlines, "days left"
// labels, and the 30-day urgency window skew one calendar day early.
//
// Pin the audience timezone BEFORE importing the module so the assertions are
// deterministic no matter what timezone the runner sits in. Chicago is west of
// UTC, where the bug manifests. Zero deps: built-in Node test runner.
//   node --test lib/date-helpers.test.ts   (or `npm test`)
process.env.TZ = 'America/Chicago'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { daysUntil, formatLongDate } from './utils.ts'

test('formatLongDate keeps the calendar day for date-only strings (issue #21)', () => {
  // A raw UTC parse renders this as "August 29, 2026" for Chicago viewers.
  assert.equal(formatLongDate('2026-08-30'), 'August 30, 2026')
})

test('formatLongDate holds across a month boundary', () => {
  // UTC parse -> "February 28, 2026"; local parse keeps March 1.
  assert.equal(formatLongDate('2026-03-01'), 'March 1, 2026')
})

test('daysUntil counts to the deadline LOCAL midnight, not UTC (issue #21)', () => {
  // now = Oct 21 20:00 CDT (= Oct 22 01:00Z). A deadline of Oct 22 is
  // "tomorrow" locally -> 1 day away. A UTC parse anchors the deadline at
  // Oct 22 00:00Z, one hour BEFORE now, ceils to 0, and the alert + "days left"
  // label drop a day.
  const now = new Date('2026-10-22T01:00:00Z')
  assert.equal(daysUntil('2026-10-22', now), 1)
})

test('daysUntil treats a due-today deadline as 0 (stays in the >= 0 window)', () => {
  // A deadline that is "today" locally must not go negative and fall out of the
  // cron's `days >= 0` urgency window. Math.ceil can yield -0 here, which is
  // fine downstream (-0 >= 0, String(-0) === "0"); `===` treats -0 and 0 as
  // equal, where assert.equal's Object.is semantics would not.
  const now = new Date('2026-10-22T14:00:00Z') // Oct 22 09:00 CDT
  const d = daysUntil('2026-10-22', now)
  assert.ok(d === 0, `due-today should be 0, got ${d}`)
})

test('daysUntil keeps a 30-day-out deadline inside the cron urgency window', () => {
  const now = new Date('2026-10-22T17:00:00Z') // Oct 22 12:00 CDT
  assert.ok(daysUntil('2026-11-21', now) <= 30)
})

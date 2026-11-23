// Run: node --import tsx --test "client/src/**/*.test.ts"
// Pin the zone before any Date work: the bug only exists in DST-observing zones.
process.env.TZ = 'America/Chicago'

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { getWeekDays, weekRange, bucketByDay, nextLocalMidnight } from './week'

const item = (iso: string) => ({ scheduledAt: iso })

test('fall-back Sunday (25h day): a 23:30 post stays in the Sunday column and the fetch window', () => {
  // Week Mon 26 Oct - Sun 1 Nov 2026; CDT->CST at 02:00 on 1 Nov.
  const days = getWeekDays(new Date('2026-10-28T17:00:00Z'))
  const lateSunday = item('2026-11-02T05:30:00Z') // Sun 1 Nov 23:30 CST
  const buckets = bucketByDay(days, [lateSunday])
  assert.deepEqual(buckets[6], [lateSunday])
  const { to } = weekRange(days)
  assert.ok(new Date(lateSunday.scheduledAt) < new Date(to), 'post must fall inside [from, to)')
  assert.equal(to, '2026-11-02T06:00:00.000Z') // Mon 2 Nov 00:00 CST
})

test('spring-forward Sunday (23h day): next Monday 00:30 is not pulled into Sunday', () => {
  // Week Mon 8 - Sun 14 Mar 2027; CST->CDT at 02:00 on 14 Mar.
  const days = getWeekDays(new Date('2027-03-10T17:00:00Z'))
  const nextMonday = item('2027-03-15T05:30:00Z') // Mon 15 Mar 00:30 CDT
  assert.deepEqual(bucketByDay(days, [nextMonday])[6], [])
  assert.equal(weekRange(days).to, '2027-03-15T05:00:00.000Z') // Mon 15 Mar 00:00 CDT
})

test('every day boundary is a local midnight across a full year of weeks', () => {
  let probe = new Date('2026-01-05T18:00:00Z')
  for (let w = 0; w < 53; w++) {
    const days = getWeekDays(probe)
    for (const d of days) {
      const end = nextLocalMidnight(d)
      assert.equal(end.getHours(), 0)
      assert.equal(end.getMinutes(), 0)
      assert.equal(end.getDate(), new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getDate())
    }
    probe = new Date(probe.getTime() + 7 * 86400000)
  }
})

test('call site: ScheduleCalendar uses the helpers, not fixed 24h arithmetic', () => {
  const src = readFileSync(new URL('../pages/ScheduleCalendar.tsx', import.meta.url), 'utf8')
  assert.ok(!src.includes('86400000'), 'no fixed-length day math')
  assert.match(src, /weekRange\(weekDays\)/)
  assert.match(src, /bucketByDay\(weekDays,/)
})

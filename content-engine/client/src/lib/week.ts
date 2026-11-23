// Local-calendar week helpers for the schedule calendar.
//
// Day boundaries are computed with setDate/setHours on local dates, never by
// adding 86_400_000 ms. A day is not always 24 hours long: the US DST
// transitions happen at 02:00 on a Sunday, which is the last column of this
// Monday-first week. On fall-back Sunday the day is 25 hours, so start + 24h
// stops at 23:00 and posts scheduled 23:00-23:59 disappear (from the fetch
// window and from the column). On spring-forward Sunday the day is 23 hours,
// so start + 24h runs to Monday 01:00 and pulls next Monday's 00:xx posts into
// Sunday.

export function getWeekDays(now: Date = new Date()): Date[] {
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
  monday.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

/** Local midnight at the start of the day after `day`. */
export function nextLocalMidnight(day: Date): Date {
  const d = new Date(day)
  d.setDate(d.getDate() + 1)
  d.setHours(0, 0, 0, 0)
  return d
}

/** ISO bounds for the schedule fetch: [Monday 00:00, next Monday 00:00). */
export function weekRange(weekDays: Date[]): { from: string; to: string } {
  return {
    from: weekDays[0].toISOString(),
    to: nextLocalMidnight(weekDays[weekDays.length - 1]).toISOString(),
  }
}

/** Group items into one bucket per day, using local-midnight day bounds. */
export function bucketByDay<T extends { scheduledAt?: string | null }>(
  weekDays: Date[],
  items: T[],
): T[][] {
  return weekDays.map((day) => {
    const dayEnd = nextLocalMidnight(day)
    return items.filter((item) => {
      if (!item.scheduledAt) return false
      const t = new Date(item.scheduledAt)
      return t >= day && t < dayEnd
    })
  })
}

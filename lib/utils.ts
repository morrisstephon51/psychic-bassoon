export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Parse a date-only string ('YYYY-MM-DD') as LOCAL midnight. The JS spec parses
// date-only strings as UTC, which rolls back a day for Central Time viewers
// (our Chicago audience) — see issue #21. Full datetime strings pass through
// unchanged so their explicit time/zone is respected.
//
// Exported so every module that renders or counts down a grant deadline shares
// this one parse instead of re-introducing `new Date('YYYY-MM-DD')` (UTC) and
// drifting back into the issue-#21 off-by-one.
export function toLocalDate(dateStr: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr)
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(dateStr)
}

export function formatDate(dateStr: string): string {
  const date = toLocalDate(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatShortDate(dateStr: string): string {
  const date = toLocalDate(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Long "Month D, YYYY" form (no weekday) for grant-document prose and deadline
// labels. Shares toLocalDate so it does not re-introduce the issue-#21 UTC
// off-by-one that `new Date(dateStr).toLocaleDateString(...)` renders for
// west-of-UTC (Chicago) viewers.
export function formatLongDate(dateStr: string): string {
  return toLocalDate(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Whole calendar days from `now` until a date-only deadline, counted against
// the deadline's LOCAL midnight (issue #21). A raw `new Date('YYYY-MM-DD')`
// anchors the deadline at UTC midnight, which for a Chicago viewer skews the
// count by a day near the day boundary — dropping a grant due "tomorrow" to
// "0 days" in the evening, or flipping a due-today grant to -1 and out of the
// urgency window. Pass an explicit `now` to keep callers deterministic.
export function daysUntil(dateStr: string, now: Date = new Date()): number {
  return Math.ceil((toLocalDate(dateStr).getTime() - now.getTime()) / 86400000)
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

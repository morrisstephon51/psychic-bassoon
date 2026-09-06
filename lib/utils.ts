export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Parse a date-only string ('YYYY-MM-DD') as LOCAL midnight. The JS spec parses
// date-only strings as UTC, which rolls back a day for Central Time viewers
// (our Chicago audience) — see issue #21. Full datetime strings pass through
// unchanged so their explicit time/zone is respected.
function toLocalDate(dateStr: string): Date {
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

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

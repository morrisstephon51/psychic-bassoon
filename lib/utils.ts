export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Date-only ISO strings ('YYYY-MM-DD') are parsed as UTC midnight by the JS
// spec, so toLocaleDateString rolls them back a day for our Central Time
// audience. Parse those as LOCAL midnight instead. Full datetime strings
// (with a time/zone component) keep their existing behavior.
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

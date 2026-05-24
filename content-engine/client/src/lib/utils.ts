export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function platformColor(platform: string): string {
  const map: Record<string, string> = {
    instagram: 'text-pink-400',
    tiktok: 'text-white',
    youtube: 'text-red-400',
    twitter: 'text-sky-400',
    linkedin: 'text-blue-400',
    threads: 'text-gray-300',
  }
  return map[platform] ?? 'text-text-secondary'
}

export function platformBg(platform: string): string {
  const map: Record<string, string> = {
    instagram: 'bg-pink-500/15',
    tiktok: 'bg-white/10',
    youtube: 'bg-red-500/15',
    twitter: 'bg-sky-500/15',
    linkedin: 'bg-blue-500/15',
    threads: 'bg-gray-500/15',
  }
  return map[platform] ?? 'bg-surface-3'
}

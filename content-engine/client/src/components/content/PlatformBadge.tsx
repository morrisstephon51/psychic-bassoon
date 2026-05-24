import { Instagram, Youtube, Linkedin, Twitter } from 'lucide-react'
import { cn, platformColor, platformBg } from '../../lib/utils'

function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.98a8.19 8.19 0 004.79 1.54V7.07a4.85 4.85 0 01-1.02-.38z" />
    </svg>
  )
}

const icons: Record<string, React.FC<{ size?: number }>> = {
  instagram: ({ size }) => <Instagram size={size ?? 14} />,
  youtube: ({ size }) => <Youtube size={size ?? 14} />,
  linkedin: ({ size }) => <Linkedin size={size ?? 14} />,
  twitter: ({ size }) => <Twitter size={size ?? 14} />,
  tiktok: ({ size }) => <TikTokIcon size={size ?? 14} />,
  threads: ({ size }) => <span style={{ fontSize: size ?? 14, lineHeight: 1 }}>@</span>,
}

interface PlatformBadgeProps {
  platform: string
  showLabel?: boolean
  size?: number
}

export function PlatformBadge({ platform, showLabel = true, size = 14 }: PlatformBadgeProps) {
  const Icon = icons[platform]
  const colorClass = platformColor(platform)
  const bgClass = platformBg(platform)

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium', bgClass, colorClass)}>
      {Icon && <Icon size={size - 2} />}
      {showLabel && platform}
    </span>
  )
}

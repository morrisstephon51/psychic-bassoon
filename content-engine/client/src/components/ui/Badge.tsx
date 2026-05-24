import { cn } from '../../lib/utils'
import type { ContentStatus, JobStatus } from '../../types'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-surface-3 text-text-secondary',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-yellow-400',
    danger: 'bg-danger/15 text-red-400',
    info: 'bg-accent/15 text-accent-light',
  }

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: ContentStatus | JobStatus }) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium', `status-${status}`)}>
      {status === 'processing' || status === 'generating' || status === 'publishing' ? (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      ) : null}
      {status}
    </span>
  )
}

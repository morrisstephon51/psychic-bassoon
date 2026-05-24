'use client'

import { cn } from '@/lib/utils'

type BadgeVariant = 'difficulty' | 'format' | 'cost' | 'format-tag' | 'spots' | 'default'
type DifficultyValue = 'Beginner' | 'Intermediate' | 'Advanced'
type CostValue = 'Free' | 'Free + Paid' | 'Paid'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

const difficultyColors: Record<DifficultyValue, string> = {
  Beginner: 'bg-green-500/15 text-green-400 border-green-500/30',
  Intermediate: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Advanced: 'bg-red-500/15 text-red-400 border-red-500/30',
}

const costColors: Record<CostValue, string> = {
  Free: 'bg-green-500/15 text-green-400 border-green-500/30',
  'Free + Paid': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Paid: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
}

export default function Badge({ label, variant = 'default', className }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border'

  if (variant === 'difficulty') {
    const color = difficultyColors[label as DifficultyValue] ?? 'bg-zinc-800 text-zinc-400 border-zinc-700'
    return <span className={cn(base, color, className)}>{label}</span>
  }

  if (variant === 'cost') {
    const color = costColors[label as CostValue] ?? 'bg-zinc-800 text-zinc-400 border-zinc-700'
    return <span className={cn(base, color, className)}>{label}</span>
  }

  if (variant === 'format') {
    return (
      <span className={cn(base, 'bg-purple-500/15 text-purple-300 border-purple-500/30', className)}>
        {label}
      </span>
    )
  }

  if (variant === 'format-tag') {
    return (
      <span className={cn(base, 'bg-amber-500/15 text-amber-400 border-amber-500/30', className)}>
        {label}
      </span>
    )
  }

  if (variant === 'spots') {
    const num = parseInt(label)
    const isLow = !isNaN(num) && num <= 10
    return (
      <span
        className={cn(
          base,
          isLow
            ? 'bg-red-500/15 text-red-400 border-red-500/30'
            : 'bg-zinc-800 text-zinc-400 border-zinc-700',
          className
        )}
      >
        {label} spots left
      </span>
    )
  }

  return (
    <span className={cn(base, 'bg-zinc-800 text-zinc-400 border-zinc-700', className)}>
      {label}
    </span>
  )
}

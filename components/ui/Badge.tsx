'use client'

import { cn } from '@/lib/utils'

type BadgeVariant = 'difficulty' | 'format' | 'cost' | 'format-tag' | 'default'
type DifficultyValue = 'Beginner' | 'Intermediate' | 'Advanced'
type CostValue = 'Free' | 'Free + Paid' | 'Paid'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

const difficultyColors: Record<DifficultyValue, string> = {
  Beginner: 'bg-green-100 text-green-700 border-green-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced: 'bg-red-100 text-red-600 border-red-200',
}

const costColors: Record<CostValue, string> = {
  Free: 'bg-green-100 text-green-700 border-green-200',
  'Free + Paid': 'bg-blue-100 text-blue-700 border-blue-200',
  Paid: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default function Badge({ label, variant = 'default', className }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border'

  if (variant === 'difficulty') {
    const color = difficultyColors[label as DifficultyValue] ?? 'bg-gray-100 text-gray-600 border-gray-200'
    return <span className={cn(base, color, className)}>{label}</span>
  }

  if (variant === 'cost') {
    const color = costColors[label as CostValue] ?? 'bg-gray-100 text-gray-600 border-gray-200'
    return <span className={cn(base, color, className)}>{label}</span>
  }

  if (variant === 'format') {
    return <span className={cn(base, 'bg-purple-100 text-purple-700 border-purple-200', className)}>{label}</span>
  }

  if (variant === 'format-tag') {
    return <span className={cn(base, 'bg-amber-100 text-amber-700 border-amber-200', className)}>{label}</span>
  }

  return <span className={cn(base, 'bg-[#F5F3FF] text-[#6B5A8E] border-[#EDE9FE]', className)}>{label}</span>
}

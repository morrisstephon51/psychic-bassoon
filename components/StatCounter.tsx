'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  className?: string
}

export default function StatCounter({ value, suffix = '', prefix = '', label, duration = 2000, className }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="font-heading font-bold text-4xl md:text-5xl text-[#1A0533] mb-1">
        <span className="text-green-600">{prefix}</span>
        {count.toLocaleString()}
        <span className="text-green-600">{suffix}</span>
      </div>
      <p className="text-[#6B5A8E] text-sm md:text-base font-medium">{label}</p>
    </div>
  )
}

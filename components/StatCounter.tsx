'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
}

export default function StatCounter({ value, label, suffix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1200
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading font-bold text-4xl text-[#1A0533]">
        {count}
        {suffix}
      </p>
      <p className="text-[#9385B5] text-sm mt-1">{label}</p>
    </div>
  )
}

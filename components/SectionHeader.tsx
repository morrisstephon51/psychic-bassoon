'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <motion.div
      className={cn(alignClasses[align], className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className="inline-block text-green-400 text-sm font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[#F5F5F5] leading-tight',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[#A3A3A3] text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

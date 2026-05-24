'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-green-500 hover:bg-green-400 text-black font-bold shadow-lg hover:shadow-green-500/25',
  secondary: 'bg-purple-700 hover:bg-purple-600 text-white font-semibold shadow-lg hover:shadow-purple-700/25',
  outline: 'border-2 border-purple-600 text-purple-400 hover:bg-purple-600/10 font-semibold',
  ghost: 'text-[#A3A3A3] hover:text-white hover:bg-white/5 font-medium',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  pulse = false,
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  const motionProps = pulse
    ? {
        animate: { scale: [1, 1.03, 1] },
        transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' as const },
      }
    : {}

  if (href) {
    return (
      <motion.a href={href} className={classes} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

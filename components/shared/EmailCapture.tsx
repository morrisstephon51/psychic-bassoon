'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

interface EmailCaptureProps {
  headline?: string
  subtext?: string
  buttonLabel?: string
  placeholder?: string
  dark?: boolean
  compact?: boolean
}

export default function EmailCapture({
  headline = 'Get Your Free AI Starter Guide',
  subtext = "We'll show you the top 5 free AI tools — and exactly how to use them.",
  buttonLabel = 'Plug Me In',
  placeholder = 'Enter your email address',
  dark = true,
  compact = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 py-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <CheckCircle size={28} className="text-green-400" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-2">You&apos;re Plugged In! 🔌</h3>
          <p className="text-[#A3A3A3] text-sm max-w-sm">
            Check your inbox — your free AI Starter Guide is on its way. Welcome to the community.
          </p>
        </div>
      </motion.div>
    )
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#555] focus:outline-none focus:border-purple-600 transition-colors"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-xl text-sm transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
        >
          {buttonLabel}
          <ArrowRight size={16} />
        </button>
      </form>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative rounded-3xl p-8 md:p-12 overflow-hidden ${
        dark
          ? 'bg-gradient-to-br from-purple-900/40 to-[#111111] border border-purple-800/30'
          : 'bg-[#111111] border border-[#222]'
      }`}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-700/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-green-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
          <Mail size={24} className="text-green-400" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#F5F5F5] mb-2">{headline}</h3>
          <p className="text-[#A3A3A3] text-base max-w-lg leading-relaxed">{subtext}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div
            className={`relative flex-1 transition-all duration-300 ${
              focused ? 'ring-2 ring-purple-600 ring-offset-2 ring-offset-transparent rounded-xl' : ''
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              className="w-full md:w-72 bg-[#0A0A0A] border border-[#333] rounded-xl px-5 py-3.5 text-sm text-[#F5F5F5] placeholder:text-[#555] focus:outline-none focus:border-purple-600 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {buttonLabel}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
      <p className="relative z-10 text-[#555] text-xs mt-4 text-center md:text-right">
        No spam. No games. Unsubscribe anytime.
      </p>
    </motion.section>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

interface EmailCaptureProps {
  headline?: string
  subtext?: string
  buttonLabel?: string
  placeholder?: string
  compact?: boolean
  dark?: boolean
}

export default function EmailCapture({
  headline = 'Get Your Free AI Starter Guide',
  subtext = "We'll show you the top 5 free AI tools — and exactly how to use them.",
  buttonLabel = 'Plug Me In',
  placeholder = 'Enter your email address',
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
        <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl text-[#1A0533] mb-2">You&apos;re Plugged In! 🔌</h3>
          <p className="text-[#6B5A8E] text-sm max-w-sm">
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
          className="flex-1 bg-white border border-[#EDE9FE] rounded-xl px-4 py-3 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
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
      className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 60%, #F0FFF4 100%)', border: '1px solid #EDE9FE', boxShadow: '0 4px 32px rgba(107,33,168,0.06)' }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-green-200/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="w-14 h-14 rounded-2xl bg-green-100 border border-green-200 flex items-center justify-center flex-shrink-0">
          <Mail size={24} className="text-green-600" />
        </div>

        <div className="flex-1">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#1A0533] mb-2">{headline}</h3>
          <p className="text-[#6B5A8E] text-base max-w-lg leading-relaxed">{subtext}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className={`relative flex-1 transition-all duration-300 ${focused ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-transparent rounded-xl' : ''}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              className="w-full md:w-72 bg-white border border-[#EDE9FE] rounded-xl px-5 py-3.5 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
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
      <p className="relative z-10 text-[#9385B5] text-xs mt-4 text-center md:text-right">
        No spam. No games. Unsubscribe anytime.
      </p>
    </motion.section>
  )
}

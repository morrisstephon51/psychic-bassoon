'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Users, Zap, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

const activityFeed = [
  { name: 'Deja W.', city: 'Chicago, IL', win: 'got her first callback after AI resume rewrite' },
  { name: 'Marcus T.', city: 'Atlanta, GA', win: 'saved $400/mo on social media with Canva AI' },
  { name: 'Aaliyah C.', city: 'Houston, TX', win: 'GPA went from 2.8 → 3.4 using AI study tools' },
  { name: 'Pastor Kevin', city: 'Memphis, TN', win: 'ran a 40-person AI workshop at his church' },
  { name: 'Sister Ruth', city: 'Detroit, MI', win: 'uses ChatGPT every day at 75 years old' },
  { name: 'Keisha M.', city: 'Atlanta, GA', win: 'saved 10+ hours a week running her daycare' },
  { name: 'Tyrone B.', city: 'Chicago, IL', win: 'landed first job with benefits in 4 years' },
]

function ActivityTicker() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % activityFeed.length), 3800)
    return () => clearInterval(t)
  }, [])

  const item = activityFeed[idx]

  return (
    <div className="inline-flex items-center gap-2 bg-[#111111] border border-[#222] rounded-full pl-1 pr-4 py-1 overflow-hidden max-w-full">
      <span className="flex-shrink-0 flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 rounded-full px-2.5 py-1 text-green-400 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Live
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-[#A3A3A3] truncate"
        >
          <span className="text-[#F5F5F5] font-medium">{item.name}</span>
          {' '}from{' '}
          <span className="text-purple-300">{item.city}</span>
          {' '}
          {item.win}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-green-900/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center py-20">
        {/* Live activity ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-5"
        >
          <ActivityTicker />
        </motion.div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-green-400 text-sm font-semibold mb-8"
        >
          <Users size={14} className="flex-shrink-0" />
          <span>500+ community members trained</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6"
        >
          <span className="text-[#F5F5F5]">AI Is For </span>
          <span className="text-gradient">You.</span>
          <br />
          <span className="text-[#F5F5F5]">Not Just</span>{' '}
          <span className="text-[#A3A3A3] line-through decoration-red-500 decoration-4">Them.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-[#A3A3A3] text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          The Plug AI teaches real people in real communities how to use AI tools —
          for <span className="text-[#F5F5F5] font-semibold">free jobs</span>,{' '}
          <span className="text-[#F5F5F5] font-semibold">better pay</span>, and{' '}
          <span className="text-[#F5F5F5] font-semibold">bigger futures</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="/learn"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl text-lg transition-colors duration-200 shadow-lg shadow-green-500/25 glow-green"
          >
            <Zap size={20} className="fill-black" />
            Get Started Free
            <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="/community"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 border-2 border-[#333] hover:border-purple-600 text-[#F5F5F5] font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:bg-purple-600/10"
          >
            <Play size={18} className="fill-current" />
            Join the Community
          </motion.a>
        </motion.div>

        {/* Social proof mini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#A3A3A3]"
        >
          {/* Avatar stack */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['D', 'M', 'T', 'R', 'J'].map((letter, i) => (
                <div
                  key={letter}
                  className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    backgroundColor: ['#6B21A8', '#7C3AED', '#8B5CF6', '#22C55E', '#16A34A'][i],
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <span>
              Join <span className="text-[#F5F5F5] font-semibold">500+</span> people already learning
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#333]" />
          <span>100% Free to start</span>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#333]" />
          <span>No experience needed</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555] text-xs"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[#333] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#555]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

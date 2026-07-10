'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, Zap, Play, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'
import { lessons } from '@/lib/data/lessons'

const tickerItems = lessons.map((l) => ({ emoji: l.emoji, title: l.title }))

function LessonTicker() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % tickerItems.length), 3800)
    return () => clearInterval(t)
  }, [])

  const item = tickerItems[idx]

  return (
    <div className="inline-flex items-center gap-2 bg-white border border-[#EDE9FE] rounded-full pl-1 pr-4 py-1 shadow-card overflow-hidden max-w-full">
      <span className="flex-shrink-0 flex items-center gap-1.5 bg-green-100 border border-green-200 rounded-full px-2.5 py-1 text-green-700 text-xs font-semibold">
        <BookOpen size={11} />
        Free Lesson
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-[#6B5A8E] truncate"
        >
          <span>{item.emoji}</span>{' '}
          <span className="text-[#1A0533] font-medium">{item.title}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 55%, #F0FFF4 100%)' }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Purple blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-purple-300/20 blur-[120px] pointer-events-none" />
      {/* Green blob */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-green-300/15 blur-[100px] pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center py-20">
        {/* Rotating free-lesson ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-5"
        >
          <LessonTicker />
        </motion.div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 text-green-700 text-sm font-semibold mb-8"
        >
          <Users size={14} className="flex-shrink-0" />
          <span>Free AI education for everyday people</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6"
        >
          <span className="text-[#1A0533]">AI Is For </span>
          <span className="text-gradient">You.</span>
          <br />
          <span className="text-[#1A0533]">Not Just</span>{' '}
          <span className="text-[#9385B5] line-through decoration-red-400 decoration-4">Them.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-[#6B5A8E] text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          The Plug AI teaches real people in real communities how to use AI tools —
          for <span className="text-[#1A0533] font-semibold">better jobs</span>,{' '}
          <span className="text-[#1A0533] font-semibold">better pay</span>, and{' '}
          <span className="text-[#1A0533] font-semibold">bigger futures</span>.
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
            className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl text-lg transition-colors duration-200 shadow-lg shadow-green-500/30 glow-green"
          >
            <Zap size={20} className="fill-black" />
            Get Started Free
            <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="/workshops"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 border-2 border-[#D8D0F7] hover:border-purple-500 text-[#1A0533] font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:bg-purple-50 bg-white shadow-card"
          >
            <Play size={18} className="fill-purple-600 text-purple-600" />
            Bring Us to Your Community
          </motion.a>
        </motion.div>

        {/* Honest value props */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[#6B5A8E]"
        >
          <span>
            <span className="text-[#1A0533] font-semibold">{lessons.length} free lessons</span> ready right now
          </span>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#D8D0F7]" />
          <span>100% Free to start</span>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#D8D0F7]" />
          <span>No experience needed</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9385B5] text-xs"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[#D8D0F7] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#C4B5FD]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

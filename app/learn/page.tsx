'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ChevronDown } from 'lucide-react'
import LessonCard from '@/components/LessonCard'
import SectionHeader from '@/components/SectionHeader'
import { lessons, type LessonCategory } from '@/lib/data/lessons'

const categories: ('All' | LessonCategory)[] = ['All', 'Beginner', 'Job Skills', 'Business', 'Daily Life']

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | LessonCategory>('All')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered =
    activeCategory === 'All' ? lessons : lessons.filter((l) => l.category === activeCategory)
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 px-4 md:px-8 bg-[#0d0d0d] border-b border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/15 blur-[80px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-purple-400 text-sm font-semibold mb-6"
          >
            <BookOpen size={14} />
            Free Lessons — No Account Needed
          </motion.div>
          <SectionHeader
            title="Start Here. No Experience Needed."
            subtitle="Every lesson is written in plain English — no jargon, no prerequisites. Pick a topic that matters to your life and start reading."
            align="center"
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#1a1a1a] px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setVisibleCount(6)
              }}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-700/30'
                  : 'bg-[#111111] border border-[#222] text-[#A3A3A3] hover:text-white hover:border-purple-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#A3A3A3]">
              <p className="text-lg mb-2">No lessons in this category yet.</p>
              <p className="text-sm">Check back soon — we&apos;re adding new content weekly.</p>
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visible.map((lesson, i) => (
                  <LessonCard key={lesson.id} lesson={lesson} index={i} />
                ))}
              </motion.div>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-10"
                >
                  <button
                    onClick={() => setVisibleCount((c) => c + 6)}
                    className="inline-flex items-center gap-2 border border-[#333] hover:border-purple-600 text-[#A3A3A3] hover:text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  >
                    Load More Lessons
                    <ChevronDown size={16} />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

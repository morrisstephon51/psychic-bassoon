'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { Lesson } from '@/lib/data/lessons'

interface LessonCardProps {
  lesson: Lesson
  index?: number
}

export default function LessonCard({ lesson, index = 0 }: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group bg-white border border-[#EDE9FE] hover:border-purple-300 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 shadow-card hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-4xl leading-none" role="img" aria-label={lesson.title}>
          {lesson.emoji}
        </span>
        <Badge label={lesson.difficulty} variant="difficulty" />
      </div>

      <div className="flex-1">
        <h3 className="font-heading font-bold text-lg text-[#1A0533] group-hover:text-purple-700 transition-colors duration-200 leading-snug mb-2">
          {lesson.title}
        </h3>
        <p className="text-[#6B5A8E] text-sm leading-relaxed line-clamp-3">{lesson.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#EDE9FE]">
        <div className="flex items-center gap-1.5 text-[#9385B5] text-xs">
          <Clock size={13} />
          <span>{lesson.readTime}</span>
        </div>
        <Link
          href={`/learn/${lesson.slug}`}
          className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-500 text-sm font-semibold transition-colors duration-200 group/link"
        >
          Start Lesson
          <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  )
}

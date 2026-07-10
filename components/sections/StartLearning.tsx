'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import LessonCard from '@/components/LessonCard'
import SectionHeader from '@/components/SectionHeader'
import { lessons } from '@/lib/data/lessons'

const featuredSlugs = ['what-is-ai', 'chatgpt-resume', 'prompt-writing-101']

export default function StartLearning() {
  const featured = lessons.filter((l) => featuredSlugs.includes(l.slug))

  return (
    <section className="py-24 px-4 md:px-8 bg-[#F5F3FF] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] bg-purple-200/20 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Start Right Now"
          title={<>Don&apos;t Wait for a Workshop. <span className="text-gradient">Start Today.</span></>}
          subtitle={`${lessons.length} free lessons written in plain English — no account, no signup, no experience needed. Here's where most people start.`}
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 border border-[#D8D0F7] hover:border-purple-600 text-[#6B5A8E] hover:text-purple-700 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 bg-white"
          >
            Browse All {lessons.length} Free Lessons
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

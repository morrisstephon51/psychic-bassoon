'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard, { type Testimonial } from '@/components/TestimonialCard'
import SectionHeader from '@/components/SectionHeader'

const testimonials: Testimonial[] = [
  { id: '1', quote: "I hadn't worked in 2 years. Stefan's workshop showed me how to use ChatGPT to rewrite my resume in one afternoon. I got 3 callbacks the first week. I cried. This stuff is real.", name: 'Deja Williams', role: 'Job Seeker → Now Employed', city: 'Chicago, IL', stars: 5 },
  { id: '2', quote: "I run a small hair salon. I was spending $400 a month on someone to do my social media. After The Plug AI workshop, I do it myself with Canva AI in 20 minutes. That's money back in my pocket.", name: 'Marcus Thompson', role: 'Small Business Owner', city: 'Atlanta, GA', stars: 5 },
  { id: '3', quote: "My granddaughter kept telling me to use these AI things and I had no idea what she was talking about. After the seniors workshop, I use ChatGPT every day. It's like having a patient helper who never gets tired of my questions.", name: 'Ruth Jenkins', role: 'Retired Teacher', city: 'Detroit, MI', stars: 5 },
  { id: '4', quote: "I'm a pastor. I brought The Plug AI to our church for a Saturday workshop. 40 people showed up. By the end, everyone had a working AI account and our admin lady redesigned all our flyers. The church talked about it for weeks.", name: 'Pastor Kevin Moore', role: 'Senior Pastor, New Covenant Church', city: 'Memphis, TN', stars: 5 },
  { id: '5', quote: "I'm a first-gen college student. I was paying $80 for tutoring I couldn't really afford. Now I use Claude and ChatGPT to help me understand my coursework. My GPA went from 2.8 to 3.4 in one semester. No cap.", name: 'Aaliyah Carter', role: 'College Junior', city: 'Houston, TX', stars: 5 },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [paginate])

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="py-24 px-4 md:px-8 bg-[#F5F3FF] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] bg-purple-200/20 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="Community Voices"
          title={<>Real People, <span className="text-gradient">Real Results</span></>}
          subtitle="Don't take our word for it. Here's what community members say after going through The Plug AI."
          className="mb-16"
        />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((t, i) => (
            <TestimonialCard key={t.id + i} testimonial={t} index={i} />
          ))}
        </div>

        {/* Mobile single card */}
        <div className="md:hidden overflow-hidden mb-6">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border border-[#EDE9FE] bg-white flex items-center justify-center text-[#6B5A8E] hover:text-purple-700 hover:border-purple-300 transition-colors shadow-card"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className={`rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 h-2 bg-green-500' : 'w-2 h-2 bg-[#D8D0F7]'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border border-[#EDE9FE] bg-white flex items-center justify-center text-[#6B5A8E] hover:text-purple-700 hover:border-purple-300 transition-colors shadow-card"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

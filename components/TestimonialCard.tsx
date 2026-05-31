'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  city: string
  stars: number
  avatarUrl?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-white border border-[#EDE9FE] rounded-2xl p-6 md:p-8 flex flex-col gap-5 relative shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
        <Quote size={18} className="text-purple-600" />
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        ))}
      </div>

      <blockquote className="text-[#1A0533] text-base md:text-lg leading-relaxed flex-1 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 pt-4 border-t border-[#EDE9FE]">
        <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-[#1A0533] font-semibold text-sm">{testimonial.name}</p>
          <p className="text-[#9385B5] text-xs">{testimonial.role} · {testimonial.city}</p>
        </div>
      </div>
    </motion.div>
  )
}

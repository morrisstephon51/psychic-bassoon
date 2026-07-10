'use client'

import { motion } from 'framer-motion'
import StatCounter from '@/components/StatCounter'
import { lessons } from '@/lib/data/lessons'
import { resources } from '@/lib/data/resources'
import { tools } from '@/lib/data/tools'

const builtFor = [
  'Community Organizations', 'Faith Communities', 'Workforce Programs', 'Public Libraries',
  'Youth Centers', 'Senior Services', 'Nonprofits', 'Job Seekers',
  'Small Business Owners', 'Students & Parents', 'Job Training Programs', 'After-School Programs',
]

export default function SocialProof() {
  return (
    <section className="py-16 border-y border-[#EDE9FE] bg-[#F5F3FF] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[200px] bg-purple-200/30 blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[#9385B5] text-sm font-medium tracking-wide uppercase mb-6 px-4"
        >
          Built for the communities big tech overlooks
        </motion.p>

        {/* Scrolling marquee */}
        <div className="overflow-hidden mb-12 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="flex gap-3 animate-marquee w-max">
            {[...builtFor, ...builtFor].map((org, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-4 py-2 rounded-full border border-[#EDE9FE] text-[#6B5A8E] text-sm bg-white whitespace-nowrap shadow-card"
              >
                {org}
              </span>
            ))}
          </div>
        </div>

        {/* Stats — all real: derived from the content on this site */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-4 px-4"
        >
          <div className="relative">
            <StatCounter value={lessons.length} label="Free Lessons" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#EDE9FE]" />
          </div>
          <div className="relative">
            <StatCounter value={resources.length} label="Downloadable Guides" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#EDE9FE]" />
          </div>
          <div className="relative">
            <StatCounter value={tools.length} label="Tools Covered" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#EDE9FE]" />
          </div>
          <div>
            <StatCounter value={100} suffix="%" label="Free to Start" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

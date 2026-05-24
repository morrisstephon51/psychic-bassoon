'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight, Zap } from 'lucide-react'
import { upcomingWorkshops } from '@/lib/data/workshops'
import { formatShortDate } from '@/lib/utils'

export default function FeaturedWorkshop() {
  const featured = upcomingWorkshops[0]

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/60 to-[#111111] border border-purple-800/40"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-700/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-green-500/8 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Left: Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold tracking-wide uppercase">
                  Featured Upcoming Workshop
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[#F5F5F5] mb-4 leading-tight">
                {featured.title}
              </h2>
              <p className="text-[#A3A3A3] text-base leading-relaxed mb-6 max-w-xl">
                {featured.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-[#A3A3A3]">
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-green-400" />
                  <span>{formatShortDate(featured.date)} · {featured.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-green-400" />
                  <span>{featured.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={15} className="text-amber-400" />
                  <span className="text-amber-400 font-semibold">
                    Only {featured.spotsRemaining} spots left!
                  </span>
                </div>
              </div>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-2">
                {featured.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-[#1a1a1a]/80 border border-[#333] rounded-full text-xs text-[#A3A3A3]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-center gap-4 lg:min-w-[220px]">
              <div className="bg-[#111111]/80 border border-[#222] rounded-2xl p-6 text-center w-full">
                <p className="text-[#A3A3A3] text-xs mb-2">Spots remaining</p>
                <div className="font-heading font-bold text-5xl text-white mb-1">{featured.spotsRemaining}</div>
                <p className="text-[#A3A3A3] text-xs">of {featured.totalSpots} total</p>
                <div className="mt-3 h-2 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: `${Math.round((featured.spotsRemaining / featured.totalSpots) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <motion.a
                href="/workshops"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl text-center transition-colors duration-200 flex items-center justify-center gap-2 text-base"
              >
                Reserve Your Spot
                <ArrowRight size={18} />
              </motion.a>

              <a
                href="/workshops"
                className="text-[#A3A3A3] hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                View all workshops
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import StatCounter from '@/components/StatCounter'

const trustedBy = [
  'Community Organizations',
  'Faith Communities',
  'Workforce Programs',
  'Public Libraries',
  'Youth Centers',
  'Senior Services',
]

export default function SocialProof() {
  return (
    <section className="py-16 px-4 md:px-8 border-y border-[#1a1a1a] bg-[#0d0d0d] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[200px] bg-purple-900/10 blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Trust statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[#A3A3A3] text-sm font-medium tracking-wide uppercase mb-6"
        >
          Trusted by community orgs, churches, and workforce programs
        </motion.p>

        {/* Scrolling trust logos / tags */}
        <div className="overflow-hidden mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {trustedBy.map((org, i) => (
              <motion.span
                key={org}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="px-4 py-2 rounded-full border border-[#222] text-[#A3A3A3] text-sm bg-[#111111]"
              >
                {org}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12"
        >
          <div className="relative">
            <StatCounter value={500} suffix="+" label="People Trained" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#1a1a1a]" />
          </div>
          <div className="relative">
            <StatCounter value={12} suffix="+" label="Live Workshops" />
            <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[#1a1a1a]" />
          </div>
          <div>
            <StatCounter value={6} label="Cities Reached" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

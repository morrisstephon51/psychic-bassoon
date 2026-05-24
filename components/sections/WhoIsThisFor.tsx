'use client'

import { motion } from 'framer-motion'
import { Briefcase, Store, Heart, GraduationCap, Church, Users } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const audiences = [
  {
    icon: Briefcase,
    label: 'Job Seekers',
    description: 'Use AI to land more interviews and earn more',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: Store,
    label: 'Small Business Owners',
    description: 'Run your business without a full team',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Heart,
    label: 'Seniors',
    description: 'Simple tools, life-changing results',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
  },
  {
    icon: GraduationCap,
    label: 'Youth & Students',
    description: 'Get ahead before graduation',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Church,
    label: 'Faith Communities',
    description: 'AI tools built for ministry and outreach',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Users,
    label: 'Working Parents',
    description: 'Do more with less time every day',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function WhoIsThisFor() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Who This Is For"
          title={
            <>
              If They Left You Out,{' '}
              <span className="text-gradient">We&apos;re For You</span>
            </>
          }
          subtitle="The Plug AI was built for the people tech forgot. If any of these sound like you, you're in the right place."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {audiences.map((audience) => {
            const Icon = audience.icon
            return (
              <motion.div
                key={audience.label}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-[#111111] border border-[#222] hover:border-purple-700 rounded-2xl p-5 flex flex-col items-center text-center gap-3 cursor-default transition-colors duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ${audience.bg}`}
                >
                  <Icon size={22} className={audience.color} />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-[#F5F5F5] leading-snug mb-1">
                    {audience.label}
                  </p>
                  <p className="text-[#A3A3A3] text-xs leading-snug">{audience.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-[#A3A3A3] text-base mt-10"
        >
          Not sure which category you are?{' '}
          <a href="/learn" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
            Start with our beginner lessons →
          </a>
        </motion.p>
      </div>
    </section>
  )
}

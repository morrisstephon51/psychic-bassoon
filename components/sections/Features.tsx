'use client'

import { motion } from 'framer-motion'
import { DollarSign, MessageSquare, Heart } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const features = [
  {
    icon: DollarSign,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100 border-green-200',
    title: 'Access',
    tagline: "AI tools cost $0 to start. We show you how.",
    description:
      "The most powerful AI tools in the world are completely free. We cut through the noise and show you exactly which ones to use, how to access them, and how to get real results — starting today.",
    highlight: '$0 to start',
    highlightColor: 'bg-green-50 border-green-200 text-green-700',
    dotColor: 'bg-green-500',
    accentBorder: 'hover:border-green-300',
    accentGlow: 'group-hover:from-green-50/80',
  },
  {
    icon: MessageSquare,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100 border-purple-200',
    title: 'Clarity',
    tagline: 'No jargon. No gatekeeping. Just real talk.',
    description:
      "Forget the tech bro vocabulary. We explain AI in plain language — the way you'd explain it to a friend over coffee. No prerequisites, no condescension. Just clear, honest, practical education.",
    highlight: 'Real talk only',
    highlightColor: 'bg-purple-50 border-purple-200 text-purple-700',
    dotColor: 'bg-purple-500',
    accentBorder: 'hover:border-purple-300',
    accentGlow: 'group-hover:from-purple-50/80',
  },
  {
    icon: Heart,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50 border-red-200',
    title: 'Community',
    tagline: "You don't go up alone. We go together.",
    description:
      "The Plug AI isn't just content — it's a community. Ask questions, share wins, help each other out. When one of us levels up, we bring others with us. That's the whole mission.",
    highlight: 'We go together',
    highlightColor: 'bg-red-50 border-red-200 text-red-600',
    dotColor: 'bg-red-400',
    accentBorder: 'hover:border-red-200',
    accentGlow: 'group-hover:from-red-50/60',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Features() {
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What Is The Plug AI?"
          title={
            <>
              Built For People Who Were{' '}
              <span className="text-gradient">Left Out</span>
            </>
          }
          subtitle="We built The Plug AI for communities that the tech world forgot — and then dared to move on without. Not anymore."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`bg-white border border-[#EDE9FE] ${feature.accentBorder} rounded-2xl p-8 group cursor-default transition-all duration-300 relative overflow-hidden shadow-card hover:shadow-card-hover`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${feature.accentGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${feature.iconBg}`}>
                    <Icon size={22} className={feature.iconColor} />
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-[#1A0533] mb-2">{feature.title}</h3>
                  <p className="text-green-600 text-sm font-semibold mb-3">{feature.tagline}</p>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{feature.description}</p>

                  <div className={`mt-6 inline-flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-xs font-medium ${feature.highlightColor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${feature.dotColor}`} />
                    {feature.highlight}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

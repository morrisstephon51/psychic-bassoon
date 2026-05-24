'use client'

import { motion } from 'framer-motion'
import { DollarSign, MessageSquare, Heart } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const features = [
  {
    icon: DollarSign,
    iconColor: 'text-green-400',
    iconBg: 'bg-green-500/10 border-green-500/20',
    title: 'Access',
    tagline: "AI tools cost $0 to start. We show you how.",
    description:
      "The most powerful AI tools in the world are completely free. We cut through the noise and show you exactly which ones to use, how to access them, and how to get real results — starting today.",
    highlight: '$0 to start',
  },
  {
    icon: MessageSquare,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Clarity',
    tagline: 'No jargon. No gatekeeping. Just real talk.',
    description:
      "Forget the tech bro vocabulary. We explain AI in plain language — the way you&apos;d explain it to a friend over coffee. No prerequisites, no condescension. Just clear, honest, practical education.",
    highlight: 'Real talk only',
  },
  {
    icon: Heart,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10 border-red-500/20',
    title: 'Community',
    tagline: "You don't go up alone. We go together.",
    description:
      "The Plug AI isn't just content — it's a community. Ask questions, share wins, help each other out. When one of us levels up, we bring others with us. That's the whole mission.",
    highlight: 'We go together',
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Features() {
  return (
    <section className="py-24 px-4 md:px-8">
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
                className="bg-[#111111] border border-[#222] hover:border-purple-700 rounded-2xl p-8 group cursor-default transition-colors duration-300 relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/5 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${feature.iconBg}`}
                  >
                    <Icon size={22} className={feature.iconColor} />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-bold text-2xl text-[#F5F5F5] mb-2">{feature.title}</h3>
                  <p className="text-green-400 text-sm font-semibold mb-3">{feature.tagline}</p>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{feature.description}</p>

                  {/* Highlight pill */}
                  <div className="mt-6 inline-flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 py-1.5 text-xs text-[#A3A3A3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
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

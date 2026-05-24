'use client'

import { motion } from 'framer-motion'
import { Quote, Target, Eye, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import EmailCapture from '@/components/shared/EmailCapture'

const values = [
  {
    icon: Zap,
    title: 'Access',
    description:
      'AI tools are free or nearly free. The barrier was never money — it was exposure and support. We remove both.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: Eye,
    title: 'Clarity',
    description:
      'We translate tech into English. No gatekeeping, no prerequisites, no condescension. Just clear, honest teaching.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Target,
    title: 'Empowerment',
    description:
      'Skills create options. Options create freedom. We teach practical skills you can use tomorrow — not someday.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      "You don't level up alone here. We go together — sharing wins, answering questions, lifting each other up.",
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
]

const milestones = [
  {
    year: '2024',
    title: 'The Idea',
    description:
      "Stefan sits in a workforce development training and realizes: nobody's teaching AI to the people who need it most. The communities. The overlooked ones. He decides to change that.",
  },
  {
    year: 'Early 2025',
    title: 'First Workshop',
    description:
      'First community workshop. 12 people show up. 11 leave with a working ChatGPT account and a rewritten resume draft. One attendee gets a job interview 6 days later.',
  },
  {
    year: 'Mid 2025',
    title: 'Growing the Community',
    description:
      'Newsletter launches. Discord community opens. Churches and nonprofits start reaching out asking for workshops. The Plug AI starts traveling.',
  },
  {
    year: '2026',
    title: 'Scaling Up',
    description:
      '500+ people trained, 12+ workshops across 6 cities, partnerships with workforce centers and faith communities. Online lessons launch to reach people we can\'t reach in person — yet.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-b border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/15 blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SectionHeader
            eyebrow="Our Story"
            title={
              <>
                Built From the{' '}
                <span className="text-gradient">Inside Out</span>
              </>
            }
            subtitle="The Plug AI didn't start with venture capital or a tech pedigree. It started with a simple observation: the people who needed AI most were the ones nobody was teaching it to."
          />
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-900/40 to-[#111111] border border-purple-800/30 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-purple-700 flex items-center justify-center text-4xl font-heading font-bold text-white mx-auto mb-4">
                    S
                  </div>
                  <p className="text-[#A3A3A3] text-sm">Photo Coming Soon</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-black font-bold px-4 py-2 rounded-2xl text-sm shadow-lg shadow-green-500/30">
                Founded by Stefan
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">
                  Meet The Founder
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#F5F5F5] mt-2 mb-4">
                  Stefan
                </h2>
              </div>

              <div className="space-y-4 text-[#A3A3A3] leading-relaxed">
                <p>
                  Stefan started his career in healthcare training — teaching people skills that changed their
                  economic trajectories. He watched people go from nothing to careers, from unemployed to
                  thriving, because someone took the time to actually teach them.
                </p>
                <p>
                  When AI exploded into public consciousness, he saw the same pattern he&apos;d seen before.
                  People in tech were celebrating. Everyone else was left wondering: <em>What does this mean for me?
                  Is this going to take my job? Can I even use this?</em>
                </p>
                <p>
                  The tech world wasn&apos;t answering those questions. They were too busy building products for
                  people who already had everything. Stefan decided to answer them — for everyone else.
                </p>
                <p>
                  <span className="text-[#F5F5F5] font-semibold">The Plug AI</span> is the result. Not a startup.
                  Not a brand play. A mission.
                </p>
              </div>

              {/* Pull Quote */}
              <blockquote className="relative border-l-2 border-green-500 pl-5 py-2">
                <div className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Quote size={12} className="text-black" />
                </div>
                <p className="text-[#F5F5F5] font-semibold text-lg italic leading-relaxed">
                  &ldquo;I got into rooms they said weren&apos;t for us. Now I&apos;m holding the door open.&rdquo;
                </p>
                <footer className="text-[#A3A3A3] text-sm mt-2">— Stefan, Founder of The Plug AI</footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-y border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-green-400 text-sm font-semibold tracking-widest uppercase block mb-4">
              Our Mission
            </span>
            <blockquote className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[#F5F5F5] leading-tight mb-6">
              &ldquo;I teach communities that have been left behind how to use AI —{' '}
              <span className="text-gradient">so they stop being left out.</span>&rdquo;
            </blockquote>
            <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto">
              This isn&apos;t corporate speak. It&apos;s a personal commitment to the communities we came from —
              and the communities still waiting for someone to show up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our 4 Pillars"
            subtitle="Everything we do comes back to these four values. They're not aspirational — they're operational."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[#111111] border border-[#222] rounded-2xl p-6 text-center hover:border-purple-700 transition-colors duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4 ${value.bg}`}
                  >
                    <Icon size={22} className={value.color} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-3">{value.title}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Our Journey"
            title="How We Got Here"
            align="left"
            className="mb-12"
          />
          <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-700 via-green-500 to-[#222]" />

            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex items-start gap-6 pl-12 relative"
              >
                <div className="absolute left-0 w-11 h-11 rounded-full bg-[#111111] border-2 border-purple-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={18} className="text-green-400" />
                </div>
                <div>
                  <span className="text-green-400 text-sm font-bold tracking-wide">{m.year}</span>
                  <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mt-1 mb-2">{m.title}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Placeholder */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#A3A3A3] text-sm font-semibold tracking-widest uppercase block mb-6">
            Press & Features
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Local News Feature', 'Community Blog', 'Podcast Guest', 'Newsletter Feature'].map((item) => (
              <div
                key={item}
                className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 h-16 flex items-center justify-center"
              >
                <p className="text-[#333] text-xs text-center">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555] text-xs mt-4">Press features coming soon</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#F5F5F5] mb-4">
            Join The Movement
          </h2>
          <p className="text-[#A3A3A3] text-lg mb-8 max-w-xl mx-auto">
            Get the free AI Starter Guide and become part of a community that&apos;s changing the game —
            together.
          </p>
          <EmailCapture compact headline="" subtext="" />
        </div>
      </section>
    </div>
  )
}

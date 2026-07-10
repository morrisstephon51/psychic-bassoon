'use client'

import { motion } from 'framer-motion'
import { Quote, Target, Eye, Zap, Users, ArrowRight, CheckCircle, TrendingUp, MapPin, Star } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import EmailCapture from '@/components/shared/EmailCapture'
import Link from 'next/link'
import { lessons } from '@/lib/data/lessons'
import { resources } from '@/lib/data/resources'
import { workshopTracks } from '@/lib/data/workshops'

const values = [
  {
    icon: Zap,
    title: 'Access',
    description:
      'AI tools are free or nearly free. The barrier was never money — it was exposure and support. We remove both.',
    color: 'text-green-600',
    bg: 'bg-green-100 border-green-200',
  },
  {
    icon: Eye,
    title: 'Clarity',
    description:
      'We translate tech into English. No gatekeeping, no prerequisites, no condescension. Just clear, honest teaching.',
    color: 'text-blue-600',
    bg: 'bg-blue-100 border-blue-200',
  },
  {
    icon: Target,
    title: 'Empowerment',
    description:
      'Skills create options. Options create freedom. We teach practical skills you can use tomorrow — not someday.',
    color: 'text-amber-600',
    bg: 'bg-amber-100 border-amber-200',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      "You don't level up alone here. We go together — sharing wins, answering questions, lifting each other up.",
    color: 'text-purple-600',
    bg: 'bg-purple-100 border-purple-200',
  },
]

const milestones = [
  {
    year: 'The Spark',
    title: 'A Gap Nobody Was Filling',
    description:
      "Stefan sits in a workforce development training and realizes: nobody's teaching AI to the people who need it most. The communities. The overlooked ones. He decides to change that.",
  },
  {
    year: 'Now',
    title: 'Building the Library',
    description:
      `${lessons.length} free plain-English lessons and ${resources.length} downloadable guides are live on this site — covering job hunting, small business, senior-friendly basics, AI safety, and more. All free, no account needed.`,
  },
  {
    year: 'Next',
    title: 'Launching Live Workshops',
    description:
      `${workshopTracks.length} workshop tracks are ready to run — from AI 101 to a full-day youth camp. First public dates are being finalized now and will be announced to the newsletter first.`,
  },
  {
    year: 'The Vision',
    title: 'Every Community, Plugged In',
    description:
      'Partnerships with churches, workforce centers, libraries, and schools — so anyone, anywhere, can learn to use AI regardless of income, age, or background.',
  },
]

const achievements = [
  { icon: Users, value: `${lessons.length}`, label: 'Free Lessons Live', color: 'text-green-600', bg: 'bg-green-100 border-green-200' },
  { icon: MapPin, value: `${resources.length}`, label: 'Downloadable Guides', color: 'text-purple-600', bg: 'bg-purple-100 border-purple-200' },
  { icon: TrendingUp, value: `${workshopTracks.length}`, label: 'Workshop Tracks', color: 'text-blue-600', bg: 'bg-blue-100 border-blue-200' },
  { icon: Star, value: '100%', label: 'Free to Attend', color: 'text-amber-600', bg: 'bg-amber-100 border-amber-200' },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE] relative overflow-hidden">
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
            {/* Visual side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#F5F3FF] via-white to-[#F0FFF4] border border-[#EDE9FE] p-8 space-y-6 shadow-[0_4px_24px_rgba(107,33,168,0.10)]">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center text-3xl font-heading font-bold text-white flex-shrink-0">
                    S
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#1A0533]">Stefan</h3>
                    <p className="text-green-600 text-sm font-semibold">Founder, The Plug AI</p>
                  </div>
                </div>

                {/* Mission statement */}
                <blockquote className="border-l-2 border-green-500 pl-4">
                  <p className="text-[#1A0533] font-semibold italic leading-relaxed">
                    &ldquo;I got into rooms they said weren&apos;t for us.<br />Now I&apos;m holding the door open.&rdquo;
                  </p>
                </blockquote>

                {/* Achievement grid */}
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((a) => {
                    const Icon = a.icon
                    return (
                      <div key={a.label} className={`rounded-xl border p-3 flex items-center gap-3 ${a.bg}`}>
                        <Icon size={16} className={a.color} />
                        <div>
                          <p className={`font-heading font-bold text-base ${a.color}`}>{a.value}</p>
                          <p className="text-[#6B5A8E] text-xs">{a.label}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-black font-bold px-4 py-2 rounded-2xl text-sm shadow-lg shadow-green-500/30">
                100% Free. Always.
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
                <span className="text-green-600 text-sm font-semibold tracking-widest uppercase">
                  Meet The Founder
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1A0533] mt-2 mb-4">
                  Stefan
                </h2>
              </div>

              <div className="space-y-4 text-[#6B5A8E] leading-relaxed">
                <p>
                  Stefan started his career in healthcare training — teaching people skills that changed their
                  economic trajectories. He watched people go from nothing to careers, from unemployed to
                  thriving, because someone took the time to actually teach them.
                </p>
                <p>
                  When AI exploded into public consciousness, he saw the same pattern he&apos;d seen before.
                  People in tech were celebrating. Everyone else was left wondering:{' '}
                  <em>What does this mean for me? Is this going to take my job? Can I even use this?</em>
                </p>
                <p>
                  The tech world wasn&apos;t answering those questions. They were too busy building products for
                  people who already had everything. Stefan decided to answer them — for everyone else.
                </p>
                <p>
                  <span className="text-[#1A0533] font-semibold">The Plug AI</span> is the result. Not a startup.
                  Not a brand play. A mission.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors group"
              >
                Get in touch with Stefan
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-green-600 text-sm font-semibold tracking-widest uppercase block mb-4">
              Our Mission
            </span>
            <blockquote className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A0533] leading-tight mb-6">
              &ldquo;I teach communities that have been left behind how to use AI —{' '}
              <span className="text-gradient">so they stop being left out.</span>&rdquo;
            </blockquote>
            <p className="text-[#6B5A8E] text-lg max-w-2xl mx-auto">
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
                  className="bg-white border border-[#EDE9FE] rounded-2xl p-6 text-center hover:border-purple-700 transition-colors duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4 ${value.bg}`}
                  >
                    <Icon size={22} className={value.color} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#1A0533] mb-3">{value.title}</h3>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Our Journey"
            title="Where We Are & Where We're Going"
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
                <div className="absolute left-0 w-11 h-11 rounded-full bg-white border-2 border-purple-700 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <span className="text-green-600 text-sm font-bold tracking-wide">{m.year}</span>
                  <h3 className="font-heading font-bold text-xl text-[#1A0533] mt-1 mb-2">{m.title}</h3>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-t border-[#EDE9FE]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1A0533] mb-4">
            Join The Movement
          </h2>
          <p className="text-[#6B5A8E] text-lg mb-8 max-w-xl mx-auto">
            Get the free AI Starter Guide and become part of a community that&apos;s changing the game —
            together.
          </p>
          <EmailCapture compact headline="" subtext="" />
        </div>
      </section>
    </div>
  )
}

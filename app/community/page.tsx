'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Mail,
  Instagram,
  Star,
  ArrowRight,
  Trophy,
  Users,
  Zap,
  CheckCircle,
} from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

const channels = [
  {
    icon: MessageCircle,
    name: 'Discord Community',
    description:
      "Join our free Discord server where 300+ members ask questions, share wins, and help each other learn. It's the most active AI community for everyday people you'll find.",
    cta: 'Join Free',
    href: '#',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    glow: 'hover:border-indigo-600',
    badge: '500+ members',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  },
  {
    icon: Mail,
    name: 'Weekly Newsletter',
    description:
      'Every week: one AI tip you can use immediately, one free tool you might not know about, and one community win to keep you inspired. No fluff. Just plug.',
    cta: 'Subscribe Free',
    href: '#',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    glow: 'hover:border-green-600',
    badge: '1,200+ subscribers',
    badgeColor: 'bg-green-500/15 text-green-400 border-green-500/30',
  },
  {
    icon: Instagram,
    name: 'Instagram & TikTok',
    description:
      'Quick AI tips, workshop recaps, community spotlights, and real talk about technology and opportunity. Follow along for daily doses of AI education.',
    cta: 'Follow Along',
    href: '#',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    glow: 'hover:border-pink-600',
    badge: 'Daily content',
    badgeColor: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  },
]

const memberSpotlights = [
  {
    name: 'Tyrone B.',
    city: 'Chicago, IL',
    story:
      "Started with zero tech knowledge. Used The Plug AI community to learn ChatGPT basics, then used it to prep for job interviews. Got hired as a customer service lead — first job with benefits in 4 years.",
    win: 'New Job with Benefits',
    emoji: '💼',
  },
  {
    name: 'Sister Gloria',
    city: 'Memphis, TN',
    story:
      "75 years old. Joined the community after a seniors workshop. Now she uses AI to write birthday cards, understand her Medicare statement, and find recipes. Says it's the best thing since sliced bread.",
    win: 'Daily Life Revolution',
    emoji: '✨',
  },
  {
    name: 'Keisha M.',
    city: 'Atlanta, GA',
    story:
      "Single mom running a daycare. Uses Canva AI to make her flyers, ChatGPT to write parent communication, and Notion AI to track her schedule. Saves 10+ hours a week. That's 10 hours back with her kids.",
    win: '10 Hours/Week Saved',
    emoji: '👨‍👩‍👧',
  },
]

export default function CommunityPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleAmbassador = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-b border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-purple-900/15 blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeader
            eyebrow="The Plug AI Community"
            title={
              <>
                You&apos;re Not Doing{' '}
                <span className="text-gradient">This Alone.</span>
              </>
            }
            subtitle="Learning is better together. Connect with hundreds of community members who are figuring this out right alongside you — asking the same questions, celebrating the same wins."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-[#A3A3A3]"
          >
            <div className="flex items-center gap-2">
              <Users size={15} className="text-green-400" />
              500+ active members
            </div>
            <div className="flex items-center gap-2">
              <Star size={15} className="text-amber-400" />
              Free to join
            </div>
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-purple-400" />
              Questions answered daily
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Where We Connect"
            title="Find Your Spot"
            subtitle="Three ways to plug in — pick the one that fits your life."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((channel, i) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className={`bg-[#111111] border border-[#222] ${channel.glow} rounded-2xl p-8 flex flex-col gap-5 transition-colors duration-300`}
                >
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${channel.bg}`}>
                    <Icon size={26} className={channel.color} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-heading font-bold text-xl text-[#F5F5F5]">{channel.name}</h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${channel.badgeColor}`}
                      >
                        {channel.badge}
                      </span>
                    </div>
                    <p className="text-[#A3A3A3] text-sm leading-relaxed">{channel.description}</p>
                  </div>
                  <motion.a
                    href={channel.href}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-5 rounded-xl text-sm transition-colors duration-200"
                  >
                    {channel.cta}
                    <ArrowRight size={16} />
                  </motion.a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community Spotlights */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Community Spotlight"
            title={
              <>
                Members Who{' '}
                <span className="text-gradient">Went Up</span>
              </>
            }
            subtitle="Real community members, real results. This is what happens when you stop waiting for the world to include you."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memberSpotlights.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-[#111111] border border-[#222] rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center font-heading font-bold text-white text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#F5F5F5] text-sm">{member.name}</p>
                    <p className="text-[#A3A3A3] text-xs">{member.city}</p>
                  </div>
                </div>
                <p className="text-[#A3A3A3] text-sm leading-relaxed italic">&ldquo;{member.story}&rdquo;</p>
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5 text-green-400 text-xs font-semibold">
                  <span>{member.emoji}</span>
                  {member.win}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge of the Week */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111] border border-amber-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-2xl rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Trophy size={26} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                    Challenge of the Week
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#F5F5F5] mb-2">
                  Use AI to Write One Email Today
                </h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">
                  Open ChatGPT. Tell it: &ldquo;Help me write a professional email to [anyone] about [anything].&rdquo; Send it.
                  Share your win in the Discord. That&apos;s it. That&apos;s the challenge.
                </p>
              </div>
              <a
                href="#"
                className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl text-sm transition-colors duration-200 flex items-center gap-2"
              >
                Join Challenge
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ambassador Program */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <SectionHeader
              eyebrow="Ambassador Program"
              title={
                <>
                  Bring AI to{' '}
                  <span className="text-gradient">YOUR Community</span>
                </>
              }
              subtitle="Want to be the person who plugs your neighborhood in? Become a Plug AI Ambassador — and we'll give you everything you need to run your own workshops."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-sm">
              {[
                { icon: '🎓', label: 'Free Training', desc: 'We train you to run workshops' },
                { icon: '📦', label: 'Resource Kit', desc: 'Full materials provided free' },
                { icon: '🤝', label: 'Support Network', desc: 'Direct line to our team' },
              ].map((item) => (
                <div key={item.label} className="bg-[#111111] border border-[#222] rounded-xl p-4 text-center">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <p className="font-semibold text-[#F5F5F5] text-sm">{item.label}</p>
                  <p className="text-[#A3A3A3] text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111111] border border-[#222] rounded-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-2">Application Received!</h3>
                <p className="text-[#A3A3A3] text-sm">
                  We&apos;ll review your application and reach out within 5 business days.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-5">Apply to Become an Ambassador</h3>
                <form onSubmit={handleAmbassador} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <ArrowRight size={16} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

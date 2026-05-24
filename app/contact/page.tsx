'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Youtube, Linkedin, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

type SubjectOption =
  | ''
  | 'Workshop Request'
  | 'Partnership'
  | 'Media / Press'
  | 'General Question'

const socialLinks = [
  { label: 'Instagram', handle: '@theplugai', href: '#', icon: Instagram, color: 'hover:border-pink-600 hover:text-pink-400' },
  { label: 'YouTube', handle: 'The Plug AI', href: '#', icon: Youtube, color: 'hover:border-red-600 hover:text-red-400' },
  { label: 'LinkedIn', handle: 'The Plug AI', href: '#', icon: Linkedin, color: 'hover:border-blue-600 hover:text-blue-400' },
]

// TikTok icon
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.98a8.19 8.19 0 004.79 1.54V7.07a4.85 4.85 0 01-1.02-.38z" />
    </svg>
  )
}

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState<SubjectOption>('')
  const [messageText, setMessageText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-4 md:px-8 bg-[#0d0d0d] border-b border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/15 blur-[80px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <SectionHeader
            eyebrow="Get In Touch"
            title="Let's Talk"
            subtitle="Have a question, want to partner, or need to bring a workshop to your community? We'd love to hear from you."
          />
        </div>
      </section>

      <div className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111] border border-[#222] rounded-3xl p-8 md:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle size={28} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-[#F5F5F5] mb-2">Message Sent!</h3>
                  <p className="text-[#A3A3A3] text-sm max-w-xs">
                    We&apos;ll respond within 48 hours. Thanks for reaching out — it means a lot.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setName('')
                    setEmail('')
                    setSubject('')
                    setMessageText('')
                  }}
                  className="text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-heading font-bold text-2xl text-[#F5F5F5] mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your full name"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Subject *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as SubjectOption)}
                      required
                      className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option>Workshop Request</option>
                      <option>Partnership</option>
                      <option>Media / Press</option>
                      <option>General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Message *</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    Send Message
                    <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#111111] border border-[#222] rounded-2xl p-6 space-y-5"
            >
              <h3 className="font-heading font-bold text-lg text-[#F5F5F5]">Contact Info</h3>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-xs mb-0.5">Email</p>
                  <a
                    href="mailto:hello@theplugai.com"
                    className="text-[#F5F5F5] text-sm font-medium hover:text-green-400 transition-colors"
                  >
                    hello@theplugai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-xs mb-0.5">Response Time</p>
                  <p className="text-[#F5F5F5] text-sm font-medium">Within 48 hours</p>
                  <p className="text-[#A3A3A3] text-xs">We read every message.</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#111111] border border-[#222] rounded-2xl p-6 space-y-4"
            >
              <h3 className="font-heading font-bold text-lg text-[#F5F5F5]">Follow Along</h3>
              <div className="space-y-3">
                {socialLinks.map(({ label, handle, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-[#222] text-[#A3A3A3] transition-all duration-200 ${color}`}
                  >
                    <Icon size={18} />
                    <div>
                      <p className="text-sm font-medium text-[#F5F5F5]">{label}</p>
                      <p className="text-xs">{handle}</p>
                    </div>
                  </a>
                ))}
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#222] text-[#A3A3A3] hover:border-white/30 hover:text-white transition-all duration-200"
                >
                  <TikTokIcon size={18} />
                  <div>
                    <p className="text-sm font-medium text-[#F5F5F5]">TikTok</p>
                    <p className="text-xs">@theplugai</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* FAQ teaser */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-900/30 to-[#111111] border border-purple-800/30 rounded-2xl p-6"
            >
              <h3 className="font-heading font-bold text-base text-[#F5F5F5] mb-3">Quick Answers</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Are workshops free?', 'Yes, always. 100% free.'],
                  ['Do I need experience?', 'Zero. We start from scratch.'],
                  ['Is this online or in-person?', 'Both — check the workshop page.'],
                ].map(([q, a]) => (
                  <div key={q} className="py-2 border-b border-[#1a1a1a] last:border-0">
                    <p className="text-[#F5F5F5] font-medium text-xs">{q}</p>
                    <p className="text-[#A3A3A3] text-xs mt-0.5">{a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

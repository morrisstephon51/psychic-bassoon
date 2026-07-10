'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, Clock, ArrowRight, Loader2 } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'

type SubjectOption =
  | ''
  | 'Workshop Request'
  | 'Partnership'
  | 'Media / Press'
  | 'General Question'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [subject, setSubject] = useState<SubjectOption>('')
  const [messageText, setMessageText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, zip_code: zipCode, subject, message: messageText }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setName('')
    setEmail('')
    setPhone('')
    setZipCode('')
    setSubject('')
    setMessageText('')
    setError(null)
  }

  const inputClass = 'w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors'

  return (
    <div className="pt-24">
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE] relative overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#EDE9FE] rounded-3xl p-8 md:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-[#1A0533] mb-2">Message Sent!</h3>
                  <p className="text-[#6B5A8E] text-sm max-w-xs">
                    We&apos;ll respond within 48 hours. Thanks for reaching out — it means a lot.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-heading font-bold text-2xl text-[#1A0533] mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Name *</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Email *</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Phone *</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="(312) 555-0100" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Zip Code *</label>
                      <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required placeholder="60619" maxLength={10} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Subject *</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value as SubjectOption)} required className={inputClass}>
                      <option value="">Select a subject</option>
                      <option>Workshop Request</option>
                      <option>Partnership</option>
                      <option>Media / Press</option>
                      <option>General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Message *</label>
                    <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} required rows={5} placeholder="Tell us what's on your mind..." className={`${inputClass} resize-none`} />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" />Sending…</>
                    ) : (
                      <>Send Message<ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white border border-[#EDE9FE] rounded-2xl p-6 space-y-5">
              <h3 className="font-heading font-bold text-lg text-[#1A0533]">Contact Info</h3>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[#6B5A8E] text-xs mb-0.5">Email</p>
                  <a href="mailto:hello@theplugai.com" className="text-[#1A0533] text-sm font-medium hover:text-green-600 transition-colors">hello@theplugai.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-[#6B5A8E] text-xs mb-0.5">Response Time</p>
                  <p className="text-[#1A0533] text-sm font-medium">Within 48 hours</p>
                  <p className="text-[#6B5A8E] text-xs">We read every message.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white border border-[#EDE9FE] rounded-2xl p-6 space-y-3">
              <h3 className="font-heading font-bold text-lg text-[#1A0533]">Follow Along</h3>
              <p className="text-[#6B5A8E] text-sm leading-relaxed">
                Our Instagram, TikTok, and YouTube channels are launching soon. Until then, the
                newsletter is the best way to keep up — every new lesson, guide, and workshop date
                lands there first.
              </p>
              <a href="/community" className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 text-sm font-semibold transition-colors">
                Join the newsletter
                <ArrowRight size={14} />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-gradient-to-br from-[#F5F3FF] to-[#F0EEFF] border border-[#EDE9FE] rounded-2xl p-6">
              <h3 className="font-heading font-bold text-base text-[#1A0533] mb-3">Quick Answers</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Are workshops free?', 'Yes, always. 100% free.'],
                  ['Do I need experience?', 'Zero. We start from scratch.'],
                  ['Is this online or in-person?', 'Both — check the workshop page.'],
                ].map(([q, a]) => (
                  <div key={q} className="py-2 border-b border-[#EDE9FE] last:border-0">
                    <p className="text-[#1A0533] font-medium text-xs">{q}</p>
                    <p className="text-[#6B5A8E] text-xs mt-0.5">{a}</p>
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

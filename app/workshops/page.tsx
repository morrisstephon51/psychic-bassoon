'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, ArrowRight, CheckCircle, Monitor, MapPin } from 'lucide-react'
import SectionHeader from '@/components/SectionHeader'
import EmailCapture from '@/components/shared/EmailCapture'
import { workshopTracks } from '@/lib/data/workshops'

export default function WorkshopsPage() {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [eventType, setEventType] = useState('')
  const [attendance, setAttendance] = useState('')
  const [datePref, setDatePref] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/workshop-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          organization: org,
          event_type: eventType,
          attendance,
          date_preference: datePref,
          email: contactEmail,
          message,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 md:px-8 bg-[#F5F3FF] border-b border-[#EDE9FE] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-purple-900/15 blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeader
            eyebrow="Live Workshops"
            title={
              <>
                Live Learning.{' '}
                <span className="text-gradient">Real Results.</span>
              </>
            }
            subtitle="In-person and virtual workshops where you'll walk away with real skills, real accounts set up, and real next steps — in 2 hours or less."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#6B5A8E]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              100% Free to Attend
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Beginner-Friendly
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Hands-On Practice
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              Take-Home Resources
            </div>
          </motion.div>
        </div>
      </section>

      {/* Launching soon + waitlist */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#EDE9FE] rounded-3xl p-8 md:p-10 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 text-green-700 text-sm font-semibold mb-5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              First public sessions launching soon
            </div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#1A0533] mb-3">
              We&apos;re Finalizing Our First Public Dates
            </h2>
            <p className="text-[#6B5A8E] max-w-xl mx-auto mb-8">
              We only announce a workshop once it&apos;s real — confirmed venue, confirmed date, confirmed
              seats. Join the waitlist and you&apos;ll get every date before it&apos;s posted anywhere else.
            </p>
            <div className="flex justify-center">
              <EmailCapture compact source="workshop-waitlist" buttonLabel="Join the Waitlist" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Tracks */}
      <section className="py-16 px-4 md:px-8 bg-[#F5F3FF] border-y border-[#EDE9FE]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Workshop Tracks"
            title="What We Teach"
            subtitle="Six ready-to-run curricula, each built for a specific community. Every track is hands-on — you leave with working accounts and real skills, not just notes."
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopTracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white border border-[#EDE9FE] hover:border-purple-400 rounded-2xl p-6 flex flex-col gap-4 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{track.emoji}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#6B5A8E] bg-[#F5F3FF] border border-[#EDE9FE] rounded-full px-3 py-1">
                    {track.format === 'Virtual' ? <Monitor size={11} /> : <MapPin size={11} />}
                    {track.format}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#1A0533] text-base mb-2 leading-snug">{track.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#6B5A8E] mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {track.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={11} />
                      {track.audience}
                    </span>
                  </div>
                  <p className="text-[#6B5A8E] text-sm leading-relaxed">{track.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {track.topics.map((topic) => (
                    <span key={topic} className="px-2.5 py-1 bg-[#F5F3FF] border border-[#EDE9FE] rounded-full text-xs text-[#6B5A8E]">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bring The Plug AI To Your Community */}
      <section className="py-20 px-4 md:px-8" id="request">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <SectionHeader
              eyebrow="Bring The Plug AI To You"
              title={
                <>
                  We&apos;ll Come to{' '}
                  <span className="text-gradient">Your Community</span>
                </>
              }
              subtitle="Churches, workforce centers, schools, community orgs, nonprofits — if your community needs this, we'll make it happen. Free of charge."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mt-8 text-sm"
            >
              {['Faith Communities', 'Workforce Programs', 'Schools', 'Libraries', 'Community Centers', 'Nonprofits'].map(
                (org) => (
                  <span
                    key={org}
                    className="px-4 py-2 bg-white border border-[#EDE9FE] rounded-full text-[#6B5A8E]"
                  >
                    {org}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Workshop Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#EDE9FE] rounded-3xl p-8 md:p-10"
          >
            {status === 'done' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-600" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#1A0533] mb-2">
                  Request Submitted!
                </h3>
                <p className="text-[#6B5A8E]">
                  We&apos;ll be in touch within 48 hours. We&apos;re excited to bring AI education to your community.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-2xl text-[#1A0533] mb-6">
                  Request a Workshop
                </h3>
                <form onSubmit={handleRequest} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Your Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full name"
                        className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Organization *</label>
                      <input
                        type="text"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        required
                        placeholder="Church, school, org name"
                        className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Type of Event *</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        required
                        className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm focus:outline-none transition-colors"
                      >
                        <option value="">Select type</option>
                        <option>Community Workshop</option>
                        <option>Church Service / Ministry</option>
                        <option>Workforce Training</option>
                        <option>School Program</option>
                        <option>Youth Event</option>
                        <option>Senior Program</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Estimated Attendance</label>
                      <input
                        type="text"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                        placeholder="e.g. 20-50 people"
                        className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Preferred Date(s)</label>
                      <input
                        type="text"
                        value={datePref}
                        onChange={(e) => setDatePref(e.target.value)}
                        placeholder="e.g. September 2026, flexible"
                        className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Contact Email *</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#6B5A8E] mb-2">Tell Us About Your Community</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Who will be attending? What are their needs? Any specific AI topics you want covered?"
                      className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    {status === 'sending' ? 'Sending…' : 'Request a Workshop'}
                    <ArrowRight size={18} />
                  </button>
                  {status === 'error' && (
                    <p className="text-center text-red-500 text-sm">
                      Something went wrong — please try again, or reach us through the contact page.
                    </p>
                  )}
                  <p className="text-center text-[#9385B5] text-xs">
                    We respond within 48 hours. All workshops are free.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

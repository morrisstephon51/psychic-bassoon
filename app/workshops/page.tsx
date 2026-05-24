'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, Building2, ArrowRight, CheckCircle } from 'lucide-react'
import WorkshopCard from '@/components/WorkshopCard'
import SectionHeader from '@/components/SectionHeader'
import { upcomingWorkshops, pastWorkshops } from '@/lib/data/workshops'

export default function WorkshopsPage() {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [eventType, setEventType] = useState('')
  const [attendance, setAttendance] = useState('')
  const [datePref, setDatePref] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleRequest = (e: React.FormEvent) => {
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
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#A3A3A3]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              100% Free to Attend
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              Beginner-Friendly
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              Hands-On Practice
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-400" />
              Take-Home Resources
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#F5F5F5]">
              Upcoming Events
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {upcomingWorkshops.length} events scheduled
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWorkshops.map((workshop, i) => (
              <WorkshopCard key={workshop.id} workshop={workshop} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Workshops */}
      <section className="py-16 px-4 md:px-8 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Past Workshops"
            title="What We've Built Together"
            subtitle="Real workshops, real communities, real impact. Here's a look at where The Plug AI has been."
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastWorkshops.map((pw, i) => (
              <motion.div
                key={pw.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-[#111111] border border-[#222] rounded-2xl p-6 space-y-4"
              >
                {/* Photo placeholder */}
                <div className="h-32 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Users size={28} className="text-[#333] mx-auto mb-2" />
                    <p className="text-[#333] text-xs">Workshop Photo</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#F5F5F5] text-base mb-2">{pw.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#A3A3A3] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {pw.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {pw.location}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-400 text-xs font-semibold mb-3">
                    <Users size={11} />
                    {pw.attendees} attendees
                  </div>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{pw.recap}</p>
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
                    className="px-4 py-2 bg-[#111111] border border-[#222] rounded-full text-[#A3A3A3]"
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
            className="bg-[#111111] border border-[#222] rounded-3xl p-8 md:p-10"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-400" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#F5F5F5] mb-2">
                  Request Submitted!
                </h3>
                <p className="text-[#A3A3A3]">
                  We&apos;ll be in touch within 48 hours. We&apos;re excited to bring AI education to your community.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-2xl text-[#F5F5F5] mb-6">
                  Request a Workshop
                </h3>
                <form onSubmit={handleRequest} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Your Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full name"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Organization *</label>
                      <input
                        type="text"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        required
                        placeholder="Church, school, org name"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Type of Event *</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        required
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm focus:outline-none transition-colors"
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
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Estimated Attendance</label>
                      <input
                        type="text"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                        placeholder="e.g. 20-50 people"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Preferred Date(s)</label>
                      <input
                        type="text"
                        value={datePref}
                        onChange={(e) => setDatePref(e.target.value)}
                        placeholder="e.g. July 2026, flexible"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Contact Email *</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Tell Us About Your Community</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Who will be attending? What are their needs? Any specific AI topics you want covered?"
                      className="w-full bg-[#0A0A0A] border border-[#333] focus:border-purple-600 rounded-xl px-4 py-3 text-[#F5F5F5] text-sm placeholder:text-[#444] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-base transition-colors duration-200"
                  >
                    Request a Workshop
                    <ArrowRight size={18} />
                  </button>
                  <p className="text-center text-[#555] text-xs">
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

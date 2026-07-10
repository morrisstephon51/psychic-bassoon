'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react'
import { workshopTracks } from '@/lib/data/workshops'
import EmailCapture from '@/components/shared/EmailCapture'

export default function FeaturedWorkshop() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 60%, #F0FFF4 100%)', border: '1px solid #EDE9FE', boxShadow: '0 4px 32px rgba(107,33,168,0.08)' }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-green-200/20 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-50" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Left: Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 text-sm font-semibold tracking-wide uppercase">
                  Live Workshops — Launching Soon
                </span>
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A0533] mb-4 leading-tight">
                Hands-On AI Workshops for Your Community
              </h2>
              <p className="text-[#6B5A8E] text-base leading-relaxed mb-6 max-w-xl">
                We&apos;re building free, in-person and virtual workshops — {workshopTracks.length} tracks covering
                everything from AI basics to job hunting to running your small business.
                Public dates will be announced to the newsletter first.
              </p>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-[#6B5A8E]">
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-green-600" />
                  <span>Dates announced by email</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-green-600" />
                  <span>In-person &amp; virtual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-green-600" />
                  <span>Always free to attend</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {workshopTracks.slice(0, 4).map((track) => (
                  <span key={track.id} className="px-3 py-1 bg-white border border-[#EDE9FE] rounded-full text-xs text-[#6B5A8E] shadow-card">
                    {track.emoji} {track.title.split(':')[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-stretch gap-4 lg:min-w-[300px]">
              <div className="bg-white border border-[#EDE9FE] rounded-2xl p-6 w-full shadow-card">
                <p className="font-heading font-bold text-[#1A0533] text-base mb-1">Be first to know</p>
                <p className="text-[#9385B5] text-xs mb-4">Join the waitlist — workshop dates hit inboxes before anywhere else.</p>
                <EmailCapture compact source="workshop-waitlist" buttonLabel="Join Waitlist" />
              </div>

              <a href="/workshops#request" className="text-center text-[#9385B5] hover:text-[#6B5A8E] text-sm transition-colors flex items-center justify-center gap-1">
                Or request a workshop for your organization <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

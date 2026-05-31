'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const quickLinks = [
  { label: 'Learn', href: '/learn' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Community', href: '/community' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'YouTube', href: '#', icon: Youtube },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
]

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.98a8.19 8.19 0 004.79 1.54V7.07a4.85 4.85 0 01-1.02-.38z" />
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="bg-[#F5F3FF] border-t border-[#EDE9FE] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                  <Zap size={16} className="text-green-400 fill-green-400" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="font-heading font-bold text-lg text-[#1A0533]">
                The Plug <span className="text-green-500">AI</span>
              </span>
            </Link>
            <p className="text-[#6B5A8E] text-sm leading-relaxed max-w-xs">
              Teaching communities that have been left behind how to use AI — so they stop being left out.
              Founded by Stefan.
            </p>
            <p className="text-purple-600 text-sm font-semibold italic">
              &ldquo;Get Connected. Get Skilled. Get into AI.&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white border border-[#EDE9FE] flex items-center justify-center text-[#6B5A8E] hover:text-purple-700 hover:border-purple-300 transition-colors duration-200 shadow-card"
                >
                  <Icon size={16} />
                </Link>
              ))}
              <Link
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white border border-[#EDE9FE] flex items-center justify-center text-[#6B5A8E] hover:text-purple-700 hover:border-purple-300 transition-colors duration-200 shadow-card"
              >
                <TikTokIcon size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-[#1A0533] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B5A8E] hover:text-purple-700 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-green-500"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-[#1A0533] mb-2">Stay Plugged In</h4>
            <p className="text-[#6B5A8E] text-sm mb-4">
              Get free AI tips, workshop announcements, and community updates.
            </p>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
              >
                <p className="text-green-700 font-semibold text-sm">You&apos;re plugged in! 🔌</p>
                <p className="text-green-600 text-xs mt-1">Check your inbox for a welcome email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#EDE9FE] rounded-xl px-4 py-2.5 text-sm text-[#1A0533] placeholder:text-[#9385B5] focus:outline-none focus:border-purple-400 transition-colors shadow-card"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2.5 rounded-xl text-sm transition-colors duration-200"
                >
                  Plug Me In
                </button>
              </form>
            )}
            <p className="text-[#9385B5] text-xs mt-2">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="border-t border-[#EDE9FE] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#9385B5]">
          <p>© 2026 The Plug AI. All Rights Reserved. Built with purpose by Stefan.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#6B5A8E] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#6B5A8E] transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#6B5A8E] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

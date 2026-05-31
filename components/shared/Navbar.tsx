'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'Learn', href: '/learn' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Community', href: '/community' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#EDE9FE] shadow-[0_2px_16px_rgba(107,33,168,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                <Zap size={16} className="text-green-400 fill-green-400" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="font-heading font-bold text-lg text-[#1A0533] group-hover:text-purple-700 transition-colors">
              The Plug <span className="text-green-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-purple-700 bg-purple-50'
                      : 'text-[#6B5A8E] hover:text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/learn"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-2 rounded-xl text-sm transition-colors duration-200 shadow-sm"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#6B5A8E] hover:text-purple-700 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-[#EDE9FE]">
              <Link href="/" className="flex items-center gap-2">
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
              <button
                className="w-10 h-10 flex items-center justify-center text-[#6B5A8E]"
                onClick={() => setMobileOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-4 text-2xl font-heading font-bold transition-colors duration-200 border-b border-[#EDE9FE] ${
                        isActive ? 'text-purple-700' : 'text-[#1A0533] hover:text-purple-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="px-8 pb-12">
              <Link
                href="/learn"
                className="block w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl text-center text-lg transition-colors duration-200"
              >
                Get Started Free
              </Link>
              <p className="text-center text-[#9385B5] text-sm mt-4">
                &ldquo;Get Connected. Get Skilled. Get into AI.&rdquo;
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

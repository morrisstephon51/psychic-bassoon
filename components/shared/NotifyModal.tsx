'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { submitToFormspree, FORMSPREE_NEWSLETTER_ID } from '@/lib/formspree'

interface NotifyModalProps {
  trigger: (open: () => void) => React.ReactNode
  title: string
  description?: string
  source: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NotifyModal({ trigger, title, description, source }: NotifyModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  const open = () => {
    setStatus('idle')
    setEmail('')
    setIsOpen(true)
  }
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (status !== 'success') return
    const closeTimer = setTimeout(close, 2500)
    return () => clearTimeout(closeTimer)
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    if (status === 'loading') return
    setStatus('loading')
    const result = await submitToFormspree(FORMSPREE_NEWSLETTER_ID, {
      email,
      source,
      _subject: `Notify me: ${source} — The Plug AI`,
    })
    setStatus(result.ok ? 'success' : 'error')
  }

  return (
    <>
      {trigger(open)}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white border border-[#EDE9FE] rounded-2xl p-6 shadow-card-hover"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[#9385B5] hover:text-[#1A0533] hover:bg-[#F5F3FF] transition-colors"
              >
                <X size={18} />
              </button>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center gap-3 py-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <p className="font-heading font-bold text-lg text-[#1A0533]">You&apos;re on the list</p>
                  <p className="text-[#6B5A8E] text-sm">We&apos;ll email you the moment this is live.</p>
                </div>
              ) : (
                <>
                  <div className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center mb-4">
                    <Mail size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1A0533] mb-1 pr-6">{title}</h3>
                  {description && <p className="text-[#6B5A8E] text-sm mb-4">{description}</p>}

                  <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-3 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? 'Sending…' : 'Notify Me'}
                      {status !== 'loading' && <ArrowRight size={16} />}
                    </button>
                    {status === 'error' && (
                      <p className="flex items-start gap-1.5 text-red-600 text-xs">
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                        <span>
                          Something went wrong. Email us directly at{' '}
                          <a href="mailto:hello@theplugai.net" className="underline">hello@theplugai.net</a>.
                        </span>
                      </p>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

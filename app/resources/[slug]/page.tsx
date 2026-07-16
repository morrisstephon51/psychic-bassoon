'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Download, CheckCircle, BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { resources } from '@/lib/data/resources'
import { submitToFormspree, FORMSPREE_NEWSLETTER_ID } from '@/lib/formspree'
import Badge from '@/components/ui/Badge'

export default function ResourceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const resource = resources.find((r) => r.slug === slug)

  const [email, setEmail] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!resource) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading font-bold text-3xl text-[#1A0533] mb-4">Resource Not Found</h1>
          <Link href="/resources" className="text-purple-600 hover:text-purple-700 text-sm">
            ← Back to Resources
          </Link>
        </div>
      </div>
    )
  }

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await submitToFormspree(FORMSPREE_NEWSLETTER_ID, {
      email,
      _subject: `Resource Download: ${resource.title}`,
      resource: resource.title,
    })
    setLoading(false)
    setUnlocked(true)
  }

  const showContent = !resource.emailGated || unlocked

  return (
    <div className="pt-24 bg-[#FAFAFA] min-h-screen">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-[#6B5A8E] hover:text-purple-700 text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Resources
        </Link>
      </div>

      {/* Header */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Badge label={resource.format} variant="format" />
            {resource.pages && (
              <span className="text-xs text-[#6B5A8E] bg-white px-2 py-0.5 rounded-full border border-[#EDE9FE]">
                {resource.pages}
              </span>
            )}
            {!resource.emailGated && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 font-medium">
                Free · No email required
              </span>
            )}
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#1A0533] mb-4">
            {resource.title}
          </h1>
          <p className="text-[#6B5A8E] text-lg leading-relaxed max-w-2xl">{resource.content.intro}</p>
        </div>
      </section>

      {/* Email gate */}
      {resource.emailGated && !unlocked && (
        <section className="px-4 md:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#EDE9FE] rounded-2xl p-8 max-w-lg mx-auto text-center shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center mx-auto mb-4">
                <Lock size={24} className="text-purple-600" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#1A0533] mb-2">Get Free Access</h2>
              <p className="text-[#6B5A8E] text-sm mb-6">
                Enter your email and we&apos;ll unlock this guide instantly. No spam, no upsells — just
                the resource.
              </p>
              <form onSubmit={handleUnlock} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-[#FAFAFA] border border-[#D8D0F7] focus:border-purple-400 rounded-xl px-4 py-3 text-[#1A0533] text-sm placeholder:text-[#9385B5] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-bold py-3.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Unlocking…'
                  ) : (
                    <>
                      <Download size={16} />
                      Unlock Free Guide
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Preview takeaways */}
            <div className="mt-10 max-w-2xl mx-auto">
              <h3 className="font-heading font-semibold text-[#1A0533] mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-600" />
                What you&apos;ll learn inside:
              </h3>
              <ul className="space-y-3">
                {resource.content.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#6B5A8E]">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    {takeaway}
                  </li>
                ))}
                {resource.content.keyTakeaways.length > 3 && (
                  <li className="flex items-start gap-3 text-sm text-[#9385B5] italic">
                    <Lock size={16} className="text-[#D8D0F7] flex-shrink-0 mt-0.5" />
                    And {resource.content.keyTakeaways.length - 3} more key takeaways...
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Full content */}
      {showContent && (
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            {unlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8 flex items-center gap-4"
              >
                <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">You&apos;re in! Full guide unlocked.</p>
                  <p className="text-green-700 text-xs mt-0.5">
                    You&apos;ll also receive new resources and AI tips — unsubscribe anytime.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="space-y-8">
              {resource.content.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-[#EDE9FE] rounded-2xl p-8 shadow-sm"
                >
                  <h2 className="font-heading font-bold text-xl text-[#1A0533] mb-4">{section.heading}</h2>
                  <div className="text-[#6B5A8E] text-sm leading-relaxed whitespace-pre-line">
                    {section.body}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="mt-10 bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-8">
              <h2 className="font-heading font-bold text-xl text-[#1A0533] mb-6 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-600" />
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {resource.content.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-green-700">
                      {i + 1}
                    </span>
                    <span className="text-[#1A0533] text-sm leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors duration-200"
              >
                <BookOpen size={16} />
                Browse All Free Resources
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 border border-[#EDE9FE] hover:border-purple-400 text-[#6B5A8E] hover:text-purple-700 font-medium px-6 py-3 rounded-xl text-sm transition-colors duration-200"
              >
                Explore AI Guides →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

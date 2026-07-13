'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text: string
  path: string
}

export default function ShareButton({ title, text, path }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        // User cancelled the share sheet, or it failed — fall through to copy.
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — nothing more we can do gracefully.
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 border border-[#D8D0F7] hover:border-purple-600 text-[#6B5A8E] hover:text-purple-700 px-5 py-2.5 rounded-xl text-sm transition-all duration-200"
    >
      {copied ? (
        <>
          <Check size={15} className="text-green-600" />
          Link Copied!
        </>
      ) : (
        <>
          <Share2 size={15} />
          Share This Lesson
        </>
      )}
    </button>
  )
}

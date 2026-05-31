'use client'

import { motion } from 'framer-motion'
import { Download, FileText, Lock } from 'lucide-react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { Resource } from '@/lib/data/resources'

interface ResourceCardProps {
  resource: Resource
  index?: number
}

export default function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="bg-white border border-[#EDE9FE] hover:border-purple-400 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-[0_1px_3px_rgba(107,33,168,0.07),0_4px_16px_rgba(107,33,168,0.04)] hover:shadow-[0_4px_24px_rgba(107,33,168,0.14)]"
    >
      {/* Thumbnail */}
      <div className="relative h-36 bg-[#F0EEFF] overflow-hidden">
        <Image
          src={resource.thumbnail}
          alt={resource.title}
          fill
          className="object-cover opacity-90"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge label={resource.format} variant="format" />
          {resource.pages && (
            <span className="text-xs text-[#6B5A8E] bg-white/80 px-2 py-0.5 rounded-full border border-[#EDE9FE]">
              {resource.pages}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileText size={16} className="text-purple-600" />
          </div>
          <h3 className="font-heading font-bold text-[#1A0533] text-base leading-snug">{resource.title}</h3>
        </div>
        <p className="text-[#6B5A8E] text-sm leading-relaxed flex-1">{resource.description}</p>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Button href={resource.downloadUrl} variant="primary" fullWidth size="sm">
          {resource.emailGated ? (
            <>
              <Lock size={14} />
              Download Free
            </>
          ) : (
            <>
              <Download size={14} />
              Download Free
            </>
          )}
        </Button>
        {resource.emailGated && (
          <p className="text-center text-xs text-[#9385B5] mt-2">Email required · No spam, ever</p>
        )}
      </div>
    </motion.div>
  )
}

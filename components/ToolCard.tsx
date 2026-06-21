'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import type { Tool } from '@/lib/data/tools'

interface ToolCardProps {
  tool: Tool
  index?: number
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group bg-white border border-[#EDE9FE] hover:border-purple-400 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 shadow-[0_1px_3px_rgba(107,33,168,0.07),0_4px_16px_rgba(107,33,168,0.04)] hover:shadow-[0_4px_24px_rgba(107,33,168,0.14)]"
    >
      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: tool.color + '20', border: `1px solid ${tool.color}30` }}
        >
          <span style={{ color: tool.color }}>{tool.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-heading font-bold text-[#1A0533] text-base">{tool.name}</h3>
          <p className="text-[#9385B5] text-xs">{tool.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#6B5A8E] text-sm leading-relaxed flex-1 line-clamp-3">{tool.description}</p>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge label={tool.cost} variant="cost" />
        <Badge label={tool.difficulty} variant="difficulty" />
        <Badge label={tool.category} variant="default" className="text-xs" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#EDE9FE]">
        <Link
          href={`/learn/${tool.learnSlug}`}
          className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 text-sm font-semibold transition-colors duration-200"
        >
          Learn How to Use It
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-lg bg-[#F5F3FF] border border-[#EDE9FE] flex items-center justify-center text-[#6B5A8E] hover:text-purple-600 hover:border-purple-300 transition-colors"
          aria-label={`Open ${tool.name}`}
        >
          <ExternalLink size={13} />
        </a>
      </div>
    </motion.div>
  )
}

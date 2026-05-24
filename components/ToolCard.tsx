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
      className="group bg-[#111111] border border-[#222] hover:border-purple-700 rounded-2xl p-6 flex flex-col gap-4 transition-colors duration-300"
    >
      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: tool.color + '30', border: `1px solid ${tool.color}40` }}
        >
          <span style={{ color: tool.color }}>{tool.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-heading font-bold text-[#F5F5F5] text-base">{tool.name}</h3>
          <p className="text-[#A3A3A3] text-xs">{tool.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#A3A3A3] text-sm leading-relaxed flex-1 line-clamp-3">{tool.description}</p>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge label={tool.cost} variant="cost" />
        <Badge label={tool.difficulty} variant="difficulty" />
        <Badge label={tool.category} variant="default" className="text-xs" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
        <Link
          href={`/learn/${tool.learnSlug}`}
          className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors duration-200"
        >
          Learn How to Use It
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#A3A3A3] hover:text-white transition-colors cursor-pointer">
          <ExternalLink size={13} />
        </div>
      </div>
    </motion.div>
  )
}

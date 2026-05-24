'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, Video, Building2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { formatShortDate } from '@/lib/utils'
import type { Workshop } from '@/lib/data/workshops'

interface WorkshopCardProps {
  workshop: Workshop
  index?: number
}

export default function WorkshopCard({ workshop, index = 0 }: WorkshopCardProps) {
  const spotsPercent = Math.round((workshop.spotsRemaining / workshop.totalSpots) * 100)
  const isAlmostFull = workshop.spotsRemaining <= 10

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-[#111111] border border-[#222] hover:border-purple-700 rounded-2xl p-6 flex flex-col gap-5 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {workshop.format === 'Virtual' ? (
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
              <Video size={18} className="text-blue-400" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-purple-400" />
            </div>
          )}
          <Badge
            label={workshop.format}
            variant="default"
            className={
              workshop.format === 'Virtual'
                ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                : 'bg-purple-500/15 text-purple-400 border-purple-500/30'
            }
          />
        </div>
        <Badge label={String(workshop.spotsRemaining)} variant="spots" />
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-xl text-[#F5F5F5] leading-snug">
        {workshop.title}
      </h3>

      {/* Description */}
      <p className="text-[#A3A3A3] text-sm leading-relaxed line-clamp-3">{workshop.description}</p>

      {/* Meta */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
          <Calendar size={14} className="text-green-400 flex-shrink-0" />
          <span>{formatShortDate(workshop.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
          <Clock size={14} className="text-green-400 flex-shrink-0" />
          <span>{workshop.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#A3A3A3]">
          <MapPin size={14} className="text-green-400 flex-shrink-0" />
          <span className="line-clamp-1">{workshop.city !== 'Virtual' ? workshop.city : 'Online — Zoom'}</span>
        </div>
      </div>

      {/* Capacity bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-[#A3A3A3] mb-1.5">
          <span className="flex items-center gap-1.5">
            <Users size={12} />
            {workshop.spotsRemaining} of {workshop.totalSpots} spots remaining
          </span>
          <span className={isAlmostFull ? 'text-red-400 font-medium' : ''}>{spotsPercent}% left</span>
        </div>
        <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isAlmostFull ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${spotsPercent}%` }}
          />
        </div>
      </div>

      {/* CTA */}
      <Button
        href={workshop.registrationUrl}
        variant={isAlmostFull ? 'secondary' : 'primary'}
        fullWidth
        size="md"
      >
        {isAlmostFull ? '⚡ Almost Full — Reserve Now' : 'Reserve Your Spot'}
      </Button>
    </motion.div>
  )
}

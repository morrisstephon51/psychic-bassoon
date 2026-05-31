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
      className="bg-white border border-[#EDE9FE] hover:border-purple-300 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 shadow-card hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {workshop.format === 'Virtual' ? (
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Video size={18} className="text-blue-600" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Building2 size={18} className="text-purple-600" />
            </div>
          )}
          <Badge
            label={workshop.format}
            variant="default"
            className={workshop.format === 'Virtual'
              ? 'bg-blue-100 text-blue-700 border-blue-200'
              : 'bg-purple-100 text-purple-700 border-purple-200'
            }
          />
        </div>
        <Badge label={String(workshop.spotsRemaining)} variant="spots" />
      </div>

      <h3 className="font-heading font-bold text-xl text-[#1A0533] leading-snug">
        {workshop.title}
      </h3>

      <p className="text-[#6B5A8E] text-sm leading-relaxed line-clamp-3">{workshop.description}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-[#6B5A8E]">
          <Calendar size={14} className="text-green-600 flex-shrink-0" />
          <span>{formatShortDate(workshop.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6B5A8E]">
          <Clock size={14} className="text-green-600 flex-shrink-0" />
          <span>{workshop.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#6B5A8E]">
          <MapPin size={14} className="text-green-600 flex-shrink-0" />
          <span className="line-clamp-1">{workshop.city !== 'Virtual' ? workshop.city : 'Online — Zoom'}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-[#9385B5] mb-1.5">
          <span className="flex items-center gap-1.5">
            <Users size={12} />
            {workshop.spotsRemaining} of {workshop.totalSpots} spots remaining
          </span>
          <span className={isAlmostFull ? 'text-red-500 font-medium' : ''}>{spotsPercent}% left</span>
        </div>
        <div className="h-1.5 bg-[#EDE9FE] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isAlmostFull ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${spotsPercent}%` }}
          />
        </div>
      </div>

      <Button href={workshop.registrationUrl} variant={isAlmostFull ? 'secondary' : 'primary'} fullWidth size="md">
        {isAlmostFull ? '⚡ Almost Full — Reserve Now' : 'Reserve Your Spot'}
      </Button>
    </motion.div>
  )
}

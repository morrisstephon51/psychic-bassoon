import { useQuery } from '@tanstack/react-query'
import { getSchedule } from '../lib/api'
import { PlatformBadge } from '../components/content/PlatformBadge'
import { StatusBadge } from '../components/ui/Badge'
import { formatDateTime } from '../lib/utils'

function getWeekDays(): Date[] {
  const now = new Date()
  const day = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
  monday.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ScheduleCalendar() {
  const weekDays = getWeekDays()
  const from = weekDays[0].toISOString()
  const to = new Date(weekDays[6].getTime() + 86400000).toISOString()

  const { data: scheduled } = useQuery({
    queryKey: ['schedule', from, to],
    queryFn: () => getSchedule({ from, to }),
    refetchInterval: 30_000,
  })

  const itemsByDay = weekDays.map((day) => {
    const dayEnd = new Date(day.getTime() + 86400000)
    return (scheduled ?? []).filter((item) => {
      if (!item.scheduledAt) return false
      const t = new Date(item.scheduledAt)
      return t >= day && t < dayEnd
    })
  })

  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Schedule Calendar</h2>
        <p className="text-sm text-text-muted mt-0.5">
          Week of {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => {
          const isToday = day.toDateString() === new Date().toDateString()
          return (
            <div key={i} className="bg-surface-1 border border-surface-3 rounded-xl overflow-hidden">
              {/* Day header */}
              <div className={`px-3 py-2 border-b border-surface-3 text-center ${isToday ? 'bg-accent/15' : ''}`}>
                <p className={`text-xs font-semibold ${isToday ? 'text-accent-light' : 'text-text-muted'}`}>
                  {DAY_LABELS[i]}
                </p>
                <p className={`text-base font-bold mt-0.5 ${isToday ? 'text-accent-light' : 'text-text-primary'}`}>
                  {day.getDate()}
                </p>
              </div>

              {/* Items */}
              <div className="p-2 space-y-1.5 min-h-24">
                {itemsByDay[i].map((item) => (
                  <div
                    key={item.id}
                    className="bg-surface-2 rounded-lg p-2 space-y-1"
                  >
                    <PlatformBadge platform={item.platform} showLabel={false} />
                    <p className="text-xs text-text-primary leading-tight line-clamp-2">
                      {item.title ?? '(untitled)'}
                    </p>
                    <p className="text-xs text-text-muted">
                      {item.scheduledAt ? new Date(item.scheduledAt).toLocaleTimeString('en-US', {
                        hour: 'numeric', minute: '2-digit',
                      }) : ''}
                    </p>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

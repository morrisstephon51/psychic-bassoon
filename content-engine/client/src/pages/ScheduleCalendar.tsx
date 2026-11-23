import { useQuery } from '@tanstack/react-query'
import { getSchedule } from '../lib/api'
import { PlatformBadge } from '../components/content/PlatformBadge'
import { StatusBadge } from '../components/ui/Badge'
import { formatDateTime } from '../lib/utils'
import { getWeekDays, weekRange, bucketByDay } from '../lib/week'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ScheduleCalendar() {
  const weekDays = getWeekDays()
  const { from, to } = weekRange(weekDays)

  const { data: scheduled } = useQuery({
    queryKey: ['schedule', from, to],
    queryFn: () => getSchedule({ from, to }),
    refetchInterval: 30_000,
  })

  const itemsByDay = bucketByDay(weekDays, scheduled ?? [])

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

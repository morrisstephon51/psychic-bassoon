import { useQuery } from '@tanstack/react-query'
import { getJobs, getQueueStats } from '../lib/api'
import { useSSE } from '../lib/sse'
import { queryClient } from '../lib/queryClient'
import { QueueCard } from '../components/queue/QueueCard'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import type { JobStatus } from '../types'

const STATUS_TABS: { label: string; value: JobStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Queued', value: 'queued' },
  { label: 'Processing', value: 'processing' },
  { label: 'Done', value: 'done' },
  { label: 'Failed', value: 'failed' },
]

import { useState } from 'react'

export default function QueueMonitor() {
  const [filter, setFilter] = useState<JobStatus | 'all'>('all')

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs', filter],
    queryFn: () => getJobs({ status: filter === 'all' ? undefined : filter, limit: 100 }),
    refetchInterval: 3000,
  })

  const { data: stats } = useQuery({
    queryKey: ['queueStats'],
    queryFn: getQueueStats,
    refetchInterval: 3000,
  })

  useSSE('job:start', () => queryClient.invalidateQueries({ queryKey: ['jobs'] }))
  useSSE('job:complete', () => queryClient.invalidateQueries({ queryKey: ['jobs'] }))
  useSSE('job:failed', () => queryClient.invalidateQueries({ queryKey: ['jobs'] }))

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Queue Monitor</h2>
        <p className="text-sm text-text-muted mt-0.5">Real-time job processing status</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Queued', value: stats.queued ?? 0, color: 'text-yellow-400' },
            { label: 'Processing', value: stats.processing ?? 0, color: 'text-accent-light' },
            { label: 'Done', value: stats.done ?? 0, color: 'text-success' },
            { label: 'Failed', value: stats.failed ?? 0, color: 'text-red-400' },
          ].map(({ label, value, color }) => (
            <Card key={label}>
              <CardBody className="text-center py-3">
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-text-muted">{label}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 bg-surface-1 border border-surface-3 rounded-lg p-1 w-fit">
        {STATUS_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filter === t.value ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Jobs list */}
      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-text-primary">{jobs?.length ?? 0} jobs</span>
        </CardHeader>
        {isLoading ? (
          <CardBody>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-surface-2 rounded-lg animate-pulse" />
              ))}
            </div>
          </CardBody>
        ) : (jobs?.length ?? 0) === 0 ? (
          <CardBody>
            <p className="text-center text-text-muted text-sm py-8">No jobs found</p>
          </CardBody>
        ) : (
          <div>
            {jobs?.map((job) => <QueueCard key={job.id} job={job} />)}
          </div>
        )}
      </Card>
    </div>
  )
}

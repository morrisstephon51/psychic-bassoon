import { Bell, RefreshCw } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getQueueStats } from '../../lib/api'
import { useSSE } from '../../lib/sse'
import { useQueueStore } from '../../store/queueStore'
import { queryClient } from '../../lib/queryClient'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const { data: stats } = useQuery({ queryKey: ['queueStats'], queryFn: getQueueStats, refetchInterval: 10_000 })
  const setStats = useQueueStore((s) => s.setStats)

  // Update queue stats via SSE
  useSSE('job:complete', () => {
    queryClient.invalidateQueries({ queryKey: ['queueStats'] })
    queryClient.invalidateQueries({ queryKey: ['content'] })
  })

  useSSE('job:start', () => {
    queryClient.invalidateQueries({ queryKey: ['queueStats'] })
  })

  return (
    <header className="h-14 border-b border-surface-3 bg-surface-1 flex items-center justify-between px-5">
      <h1 className="font-semibold text-text-primary">{title}</h1>
      <div className="flex items-center gap-4">
        {stats && (
          <div className="flex items-center gap-3 text-xs text-text-muted">
            {stats.processing ? (
              <span className="flex items-center gap-1">
                <RefreshCw size={11} className="animate-spin text-accent-light" />
                {stats.processing} running
              </span>
            ) : null}
            {stats.queued ? (
              <span className="text-yellow-400">{stats.queued} queued</span>
            ) : null}
          </div>
        )}
        <button className="p-1.5 rounded-lg hover:bg-surface-2 text-text-muted hover:text-text-primary transition-colors">
          <Bell size={16} />
        </button>
      </div>
    </header>
  )
}

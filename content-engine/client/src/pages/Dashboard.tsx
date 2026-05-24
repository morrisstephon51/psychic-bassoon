import { useQuery, useMutation } from '@tanstack/react-query'
import { Zap, Video, FileText, Send, TrendingUp, Plus } from 'lucide-react'
import { getContent, getQueueStats, getPlatforms, triggerPlan, getPlans } from '../lib/api'
import { useSSE } from '../lib/sse'
import { queryClient } from '../lib/queryClient'
import { useNotificationStore } from '../store/notificationStore'
import { Button } from '../components/ui/Button'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { ContentGrid } from '../components/content/ContentGrid'
import type { PlanEvent } from '../types'

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number | string; icon: React.FC<{size?: number; className?: string}>; color: string
}) {
  return (
    <Card>
      <CardBody className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          <p className="text-xs text-text-muted">{label}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default function Dashboard() {
  const { add: notify } = useNotificationStore()

  const { data: stats } = useQuery({ queryKey: ['queueStats'], queryFn: getQueueStats, refetchInterval: 5000 })
  const { data: platforms } = useQuery({ queryKey: ['platforms'], queryFn: getPlatforms })
  const { data: recentContent, isLoading } = useQuery({
    queryKey: ['content', 'recent'],
    queryFn: () => getContent({ limit: 8 }),
  })
  const { data: plans } = useQuery({ queryKey: ['plans'], queryFn: getPlans })

  const triggerMutation = useMutation({
    mutationFn: () => triggerPlan(),
    onSuccess: (r) => {
      notify({ type: 'success', title: 'Content plan generating!', message: `Plan ${r.planId.slice(0, 8)}...` })
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
    onError: (e) => notify({ type: 'error', title: 'Failed to generate plan', message: e.message }),
  })

  // Real-time updates
  useSSE<PlanEvent>('plan:ready', () => {
    queryClient.invalidateQueries({ queryKey: ['content', 'recent'] })
  })

  const enabledPlatforms = platforms?.filter((p) => p.enabled) ?? []
  const publishedCount = recentContent?.filter((c) => c.status === 'published').length ?? 0
  const videoCount = recentContent?.filter((c) => c.type === 'video_reel').length ?? 0

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Command Center</h2>
          <p className="text-sm text-text-muted mt-0.5">
            {enabledPlatforms.length} platforms · {plans?.length ?? 0} plans created
          </p>
        </div>
        <Button onClick={() => triggerMutation.mutate()} loading={triggerMutation.isPending}>
          <Plus size={16} />
          Generate Week's Content
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Jobs Running" value={stats?.processing ?? 0} icon={Zap} color="bg-accent/15 text-accent-light" />
        <StatCard label="Videos Created" value={videoCount} icon={Video} color="bg-purple-500/15 text-purple-400" />
        <StatCard label="Posts Ready" value={recentContent?.filter((c) => c.status === 'ready').length ?? 0} icon={FileText} color="bg-blue-500/15 text-blue-400" />
        <StatCard label="Published" value={publishedCount} icon={Send} color="bg-success/15 text-success" />
      </div>

      {/* Recent content */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Recent Content</h3>
          <a href="/content" className="text-xs text-accent-light hover:text-accent">View all →</a>
        </div>
        <ContentGrid items={recentContent ?? []} loading={isLoading} />
      </div>
    </div>
  )
}

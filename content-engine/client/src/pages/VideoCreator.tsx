import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Video, Play, RefreshCw } from 'lucide-react'
import { getContent, regenerateContent } from '../lib/api'
import { useSSE } from '../lib/sse'
import { queryClient } from '../lib/queryClient'
import { useNotificationStore } from '../store/notificationStore'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StatusBadge } from '../components/ui/Badge'
import { formatRelative } from '../lib/utils'
import type { VideoProgressEvent } from '../types'

export default function VideoCreator() {
  const { add: notify } = useNotificationStore()
  const [progress, setProgress] = useState<Record<string, { stage: string; percent: number }>>({})

  const { data: videos, isLoading } = useQuery({
    queryKey: ['content', 'videos'],
    queryFn: () => getContent({ limit: 50 }),
  })

  const videoItems = videos?.filter((v) => v.type === 'video_reel') ?? []

  useSSE<VideoProgressEvent>('video:progress', (data) => {
    setProgress((prev) => ({
      ...prev,
      [data.contentItemId]: { stage: data.stage, percent: data.percent },
    }))
  })

  useSSE('video:complete', (data: { contentItemId: string }) => {
    setProgress((prev) => {
      const next = { ...prev }
      delete next[data.contentItemId]
      return next
    })
    queryClient.invalidateQueries({ queryKey: ['content'] })
    notify({ type: 'success', title: 'Video reel complete!' })
  })

  const regenMutation = useMutation({
    mutationFn: (id: string) => regenerateContent(id),
    onSuccess: () => notify({ type: 'info', title: 'Regeneration queued' }),
  })

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Video Creator</h2>
        <p className="text-sm text-text-muted mt-0.5">{videoItems.length} video reels</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-1 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : videoItems.length === 0 ? (
        <Card>
          <CardBody className="text-center py-16">
            <Video size={40} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-muted">No video reels yet. Generate a content plan to create videos.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videoItems.map((item) => {
            const prog = progress[item.id]
            return (
              <Card key={item.id}>
                <CardHeader className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video size={14} className="text-accent-light" />
                    <span className="text-sm font-medium text-text-primary truncate max-w-xs">{item.title}</span>
                  </div>
                  <StatusBadge status={item.status} />
                </CardHeader>
                <CardBody className="space-y-3">
                  {/* Progress bar */}
                  {prog && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-accent-light flex items-center gap-1.5">
                          <RefreshCw size={10} className="animate-spin" />
                          {prog.stage}
                        </span>
                        <span className="text-text-muted">{prog.percent}%</span>
                      </div>
                      <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500"
                          style={{ width: `${prog.percent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Thumbnail preview */}
                  {item.thumbnailPath && (
                    <div className="relative h-32 bg-surface-2 rounded-lg overflow-hidden group cursor-pointer">
                      <img
                        src={`/assets/thumbnails/${item.id}.jpg`}
                        alt={item.title ?? ''}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={24} className="text-white" fill="white" />
                      </div>
                    </div>
                  )}

                  {/* Script preview */}
                  {item.script && (
                    <p className="text-xs text-text-muted line-clamp-3">{item.script}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>{item.platform}</span>
                    <span>{formatRelative(item.createdAt)}</span>
                  </div>

                  {item.status === 'failed' && (
                    <Button size="sm" variant="secondary" onClick={() => regenMutation.mutate(item.id)}
                      loading={regenMutation.isPending}>
                      <RefreshCw size={12} />
                      Retry
                    </Button>
                  )}
                </CardBody>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

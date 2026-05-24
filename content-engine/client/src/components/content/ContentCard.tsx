import { Video, FileText, ExternalLink, RefreshCw, Send } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { publishContent, regenerateContent } from '../../lib/api'
import { queryClient } from '../../lib/queryClient'
import { useNotificationStore } from '../../store/notificationStore'
import { StatusBadge } from '../ui/Badge'
import { PlatformBadge } from './PlatformBadge'
import { Card, CardBody } from '../ui/Card'
import { Button } from '../ui/Button'
import { formatRelative } from '../../lib/utils'
import type { ContentItem } from '../../types'

interface ContentCardProps {
  item: ContentItem
}

export function ContentCard({ item }: ContentCardProps) {
  const { add: notify } = useNotificationStore()

  const publishMutation = useMutation({
    mutationFn: () => publishContent(item.id),
    onSuccess: (r) => {
      notify({ type: 'success', title: 'Published!', message: r.postUrl })
      queryClient.invalidateQueries({ queryKey: ['content'] })
    },
    onError: (e) => notify({ type: 'error', title: 'Publish failed', message: e.message }),
  })

  const regenMutation = useMutation({
    mutationFn: () => regenerateContent(item.id),
    onSuccess: () => {
      notify({ type: 'info', title: 'Regeneration queued' })
      queryClient.invalidateQueries({ queryKey: ['content'] })
    },
  })

  return (
    <Card hover>
      <CardBody className="space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {item.type === 'video_reel' ? (
              <Video size={14} className="text-accent-light" />
            ) : (
              <FileText size={14} className="text-text-muted" />
            )}
            <PlatformBadge platform={item.platform} />
          </div>
          <StatusBadge status={item.status} />
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-text-primary line-clamp-2 leading-snug">
          {item.title ?? '(untitled)'}
        </p>

        {/* Caption preview */}
        {item.caption && (
          <p className="text-xs text-text-muted line-clamp-2">{item.caption}</p>
        )}

        {/* Thumbnail */}
        {item.thumbnailPath && (
          <div className="h-24 rounded-lg bg-surface-2 overflow-hidden">
            <img
              src={`/assets/thumbnails/${item.id}.jpg`}
              alt={item.title ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Error */}
        {item.error && (
          <p className="text-xs text-red-400 bg-danger/10 rounded-lg px-2 py-1.5">{item.error}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-text-muted">{formatRelative(item.createdAt)}</span>
          <div className="flex items-center gap-1.5">
            {item.postUrl && (
              <a href={item.postUrl} target="_blank" rel="noreferrer"
                className="p-1.5 rounded-lg hover:bg-surface-2 text-text-muted hover:text-success transition-colors">
                <ExternalLink size={13} />
              </a>
            )}
            {(item.status === 'failed') && (
              <Button size="sm" variant="ghost" loading={regenMutation.isPending}
                onClick={() => regenMutation.mutate()}>
                <RefreshCw size={12} />
              </Button>
            )}
            {item.status === 'ready' && (
              <Button size="sm" loading={publishMutation.isPending}
                onClick={() => publishMutation.mutate()}>
                <Send size={12} />
                Publish
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

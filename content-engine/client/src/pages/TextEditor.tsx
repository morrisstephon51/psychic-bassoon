import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Copy, ExternalLink } from 'lucide-react'
import { getContent } from '../lib/api'
import { useNotificationStore } from '../store/notificationStore'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import { PlatformBadge } from '../components/content/PlatformBadge'
import type { ContentItem } from '../types'

export default function TextEditor() {
  const { add: notify } = useNotificationStore()
  const [selected, setSelected] = useState<ContentItem | null>(null)

  const { data: items, isLoading } = useQuery({
    queryKey: ['content', 'text'],
    queryFn: () => getContent({ limit: 100 }),
  })

  const textItems = items?.filter((i) => i.type === 'text_post' || i.type === 'carousel') ?? []

  const copyCaption = (item: ContentItem) => {
    const text = [item.caption, item.hashtags].filter(Boolean).join('\n\n')
    navigator.clipboard.writeText(text)
    notify({ type: 'success', title: 'Caption copied!' })
  }

  return (
    <div className="flex gap-5 max-w-6xl h-[calc(100vh-8rem)]">
      {/* List panel */}
      <div className="w-72 flex-shrink-0 space-y-1 overflow-y-auto">
        <p className="text-sm font-medium text-text-primary mb-3">{textItems.length} text posts</p>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 bg-surface-1 rounded-lg animate-pulse" />
          ))
        ) : textItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selected?.id === item.id
                ? 'bg-accent/15 border-accent/30'
                : 'bg-surface-1 border-surface-3 hover:border-accent/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <PlatformBadge platform={item.platform} showLabel={false} />
              <StatusBadge status={item.status} />
            </div>
            <p className="text-xs text-text-primary truncate">{item.title ?? '(untitled)'}</p>
          </button>
        ))}
      </div>

      {/* Editor panel */}
      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <Card className="h-full">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlatformBadge platform={selected.platform} />
                <StatusBadge status={selected.status} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyCaption(selected)}
                  className="p-1.5 rounded-lg hover:bg-surface-2 text-text-muted hover:text-text-primary transition-colors"
                >
                  <Copy size={14} />
                </button>
                {selected.postUrl && (
                  <a href={selected.postUrl} target="_blank" rel="noreferrer"
                    className="p-1.5 rounded-lg hover:bg-surface-2 text-text-muted hover:text-success transition-colors">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">{selected.title}</h3>
              </div>
              {selected.caption && (
                <div>
                  <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Caption</p>
                  <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{selected.caption}</p>
                </div>
              )}
              {selected.hashtags && (
                <div>
                  <p className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wide">Hashtags</p>
                  <p className="text-sm text-accent-light">{selected.hashtags}</p>
                </div>
              )}
              {selected.error && (
                <div className="bg-danger/10 border border-danger/30 rounded-lg p-3">
                  <p className="text-xs text-red-400">{selected.error}</p>
                </div>
              )}
            </CardBody>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            Select a post to view and edit
          </div>
        )}
      </div>
    </div>
  )
}

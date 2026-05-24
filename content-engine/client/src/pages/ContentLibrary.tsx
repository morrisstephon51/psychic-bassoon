import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getContent } from '../lib/api'
import { useSSE } from '../lib/sse'
import { queryClient } from '../lib/queryClient'
import { ContentGrid } from '../components/content/ContentGrid'
import type { ContentStatus } from '../types'

const STATUS_FILTERS: { label: string; value: ContentStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Generating', value: 'generating' },
  { label: 'Ready', value: 'ready' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Published', value: 'published' },
  { label: 'Failed', value: 'failed' },
]

const PLATFORMS = ['all', 'instagram', 'tiktok', 'youtube', 'twitter', 'linkedin']

export default function ContentLibrary() {
  const [status, setStatus] = useState<ContentStatus | 'all'>('all')
  const [platform, setPlatform] = useState('all')

  const { data: items, isLoading } = useQuery({
    queryKey: ['content', status, platform],
    queryFn: () => getContent({
      status: status === 'all' ? undefined : status,
      platform: platform === 'all' ? undefined : platform,
      limit: 100,
    }),
  })

  // Refresh on content changes
  useSSE('content:ready', () => queryClient.invalidateQueries({ queryKey: ['content'] }))
  useSSE('publish:success', () => queryClient.invalidateQueries({ queryKey: ['content'] }))
  useSSE('video:complete', () => queryClient.invalidateQueries({ queryKey: ['content'] }))

  return (
    <div className="space-y-5 max-w-7xl">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Content Library</h2>
        <p className="text-sm text-text-muted mt-0.5">{items?.length ?? 0} items</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1 bg-surface-1 border border-surface-3 rounded-lg p-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                status === f.value ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-surface-1 border border-surface-3 rounded-lg p-1">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                platform === p ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <ContentGrid items={items ?? []} loading={isLoading} />
    </div>
  )
}

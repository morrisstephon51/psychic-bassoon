import { ContentCard } from './ContentCard'
import type { ContentItem } from '../../types'

interface ContentGridProps {
  items: ContentItem[]
  loading?: boolean
}

export function ContentGrid({ items, loading }: ContentGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-52 bg-surface-1 border border-surface-3 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-text-muted text-sm">No content yet.</p>
        <p className="text-text-muted text-xs mt-1">Generate a content plan to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  )
}

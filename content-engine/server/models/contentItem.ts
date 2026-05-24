import { v4 as uuid } from 'uuid'
import { getDb } from '../db/client.js'

export type ContentType = 'video_reel' | 'text_post' | 'carousel' | 'story'
export type ContentStatus =
  | 'pending'
  | 'generating'
  | 'ready'
  | 'scheduled'
  | 'publishing'
  | 'published'
  | 'failed'

export interface ContentItem {
  id: string
  planId: string
  brandId: string
  type: ContentType
  platform: string
  status: ContentStatus
  title: string | null
  caption: string | null
  hashtags: string | null
  script: string | null
  mediaPath: string | null
  thumbnailPath: string | null
  postId: string | null
  postUrl: string | null
  scheduledAt: string | null
  publishedAt: string | null
  error: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

function deserialize(row: Record<string, unknown>): ContentItem {
  return {
    id: row.id as string,
    planId: row.plan_id as string,
    brandId: row.brand_id as string,
    type: row.type as ContentType,
    platform: row.platform as string,
    status: row.status as ContentStatus,
    title: (row.title as string) || null,
    caption: (row.caption as string) || null,
    hashtags: (row.hashtags as string) || null,
    script: (row.script as string) || null,
    mediaPath: (row.media_path as string) || null,
    thumbnailPath: (row.thumbnail_path as string) || null,
    postId: (row.post_id as string) || null,
    postUrl: (row.post_url as string) || null,
    scheduledAt: (row.scheduled_at as string) || null,
    publishedAt: (row.published_at as string) || null,
    error: (row.error as string) || null,
    metadata: row.metadata ? JSON.parse(row.metadata as string) : null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

export function createContentItem(data: {
  planId: string
  brandId: string
  type: ContentType
  platform: string
  title?: string
  caption?: string
  hashtags?: string
  script?: string
  scheduledAt?: string
  metadata?: Record<string, unknown>
}): ContentItem {
  const id = uuid()
  const now = new Date().toISOString()

  getDb().prepare(`
    INSERT INTO content_items
    (id, plan_id, brand_id, type, platform, status, title, caption, hashtags, script, scheduled_at, metadata, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, data.planId, data.brandId, data.type, data.platform,
    data.title ?? null, data.caption ?? null, data.hashtags ?? null,
    data.script ?? null, data.scheduledAt ?? null,
    data.metadata ? JSON.stringify(data.metadata) : null,
    now, now,
  )

  return getContentItem(id)!
}

export function getContentItem(id: string): ContentItem | null {
  const row = getDb().prepare('SELECT * FROM content_items WHERE id = ?').get(id) as Record<string, unknown> | undefined
  return row ? deserialize(row) : null
}

export function updateContentItem(id: string, updates: Partial<ContentItem>): ContentItem | null {
  const db = getDb()
  const now = new Date().toISOString()
  const existing = getContentItem(id)
  if (!existing) return null

  db.prepare(`
    UPDATE content_items SET
    status=?, title=?, caption=?, hashtags=?, script=?,
    media_path=?, thumbnail_path=?, post_id=?, post_url=?,
    scheduled_at=?, published_at=?, error=?, metadata=?, updated_at=?
    WHERE id=?
  `).run(
    updates.status ?? existing.status,
    updates.title ?? existing.title,
    updates.caption ?? existing.caption,
    updates.hashtags ?? existing.hashtags,
    updates.script ?? existing.script,
    updates.mediaPath ?? existing.mediaPath,
    updates.thumbnailPath ?? existing.thumbnailPath,
    updates.postId ?? existing.postId,
    updates.postUrl ?? existing.postUrl,
    updates.scheduledAt ?? existing.scheduledAt,
    updates.publishedAt ?? existing.publishedAt,
    updates.error ?? existing.error,
    updates.metadata ? JSON.stringify(updates.metadata) : (existing.metadata ? JSON.stringify(existing.metadata) : null),
    now,
    id,
  )

  return getContentItem(id)
}

export function listContentItems(filters: {
  planId?: string
  status?: ContentStatus
  platform?: string
  limit?: number
} = {}): ContentItem[] {
  const conditions: string[] = []
  const params: unknown[] = []

  if (filters.planId) { conditions.push('plan_id = ?'); params.push(filters.planId) }
  if (filters.status) { conditions.push('status = ?'); params.push(filters.status) }
  if (filters.platform) { conditions.push('platform = ?'); params.push(filters.platform) }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const limit = filters.limit ?? 100

  const rows = getDb().prepare(`
    SELECT * FROM content_items ${where} ORDER BY created_at DESC LIMIT ?
  `).all(...params, limit) as Record<string, unknown>[]

  return rows.map(deserialize)
}

export function getScheduledItems(before: string): ContentItem[] {
  const rows = getDb().prepare(`
    SELECT * FROM content_items
    WHERE status = 'scheduled' AND scheduled_at <= ?
    ORDER BY scheduled_at ASC
  `).all(before) as Record<string, unknown>[]
  return rows.map(deserialize)
}

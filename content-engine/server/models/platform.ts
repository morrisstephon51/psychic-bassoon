import { getDb } from '../db/client.js'

export interface Platform {
  id: string
  name: string
  enabled: boolean
  credentials: Record<string, string> | null
  rateLimitRpm: number
  lastPostAt: string | null
  totalPosts: number
  createdAt: string
  updatedAt: string
}

function deserialize(row: Record<string, unknown>): Platform {
  return {
    id: row.id as string,
    name: row.name as string,
    enabled: Boolean(row.enabled),
    credentials: row.credentials ? JSON.parse(row.credentials as string) : null,
    rateLimitRpm: (row.rate_limit_rpm as number) ?? 60,
    lastPostAt: (row.last_post_at as string) || null,
    totalPosts: (row.total_posts as number) ?? 0,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

export function getPlatform(name: string): Platform | null {
  const row = getDb().prepare('SELECT * FROM platforms WHERE name = ?').get(name) as Record<string, unknown> | undefined
  return row ? deserialize(row) : null
}

export function listPlatforms(): Platform[] {
  const rows = getDb().prepare('SELECT * FROM platforms ORDER BY name').all() as Record<string, unknown>[]
  return rows.map(deserialize)
}

export function enabledPlatforms(): Platform[] {
  const rows = getDb().prepare('SELECT * FROM platforms WHERE enabled = 1').all() as Record<string, unknown>[]
  return rows.map(deserialize)
}

export function updatePlatform(name: string, updates: {
  enabled?: boolean
  credentials?: Record<string, string>
  rateLimitRpm?: number
  lastPostAt?: string
  totalPosts?: number
}): Platform | null {
  const now = new Date().toISOString()
  const existing = getPlatform(name)
  if (!existing) return null

  getDb().prepare(`
    UPDATE platforms SET
    enabled=?, credentials=?, rate_limit_rpm=?, last_post_at=?, total_posts=?, updated_at=?
    WHERE name=?
  `).run(
    updates.enabled !== undefined ? (updates.enabled ? 1 : 0) : (existing.enabled ? 1 : 0),
    updates.credentials ? JSON.stringify(updates.credentials) : (existing.credentials ? JSON.stringify(existing.credentials) : null),
    updates.rateLimitRpm ?? existing.rateLimitRpm,
    updates.lastPostAt ?? existing.lastPostAt,
    updates.totalPosts ?? existing.totalPosts,
    now,
    name,
  )

  return getPlatform(name)
}

export function recordPost(name: string): void {
  const now = new Date().toISOString()
  getDb().prepare(`
    UPDATE platforms SET last_post_at=?, total_posts=total_posts+1, updated_at=? WHERE name=?
  `).run(now, now, name)
}

import { v4 as uuid } from 'uuid'
import { getDb } from '../db/client.js'

export type PlanStatus = 'pending' | 'generating' | 'ready' | 'publishing' | 'done' | 'failed'

export interface ContentPlan {
  id: string
  brandId: string
  weekStart: string
  theme: string
  platforms: string[]
  status: PlanStatus
  rawPlan: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

function deserialize(row: Record<string, unknown>): ContentPlan {
  return {
    id: row.id as string,
    brandId: row.brand_id as string,
    weekStart: row.week_start as string,
    theme: row.theme as string,
    platforms: JSON.parse((row.platforms as string) || '[]'),
    status: row.status as PlanStatus,
    rawPlan: row.raw_plan ? JSON.parse(row.raw_plan as string) : null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

export function createContentPlan(data: {
  brandId: string
  weekStart: string
  theme?: string
  platforms: string[]
}): ContentPlan {
  const id = uuid()
  const now = new Date().toISOString()

  getDb().prepare(`
    INSERT INTO content_plans (id, brand_id, week_start, theme, platforms, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)
  `).run(id, data.brandId, data.weekStart, data.theme ?? '', JSON.stringify(data.platforms), now, now)

  return getContentPlan(id)!
}

export function getContentPlan(id: string): ContentPlan | null {
  const row = getDb().prepare('SELECT * FROM content_plans WHERE id = ?').get(id) as Record<string, unknown> | undefined
  return row ? deserialize(row) : null
}

export function updateContentPlan(id: string, updates: Partial<ContentPlan>): ContentPlan | null {
  const now = new Date().toISOString()
  getDb().prepare(`
    UPDATE content_plans SET
    theme=COALESCE(?, theme), platforms=COALESCE(?, platforms),
    status=COALESCE(?, status), raw_plan=COALESCE(?, raw_plan), updated_at=?
    WHERE id=?
  `).run(
    updates.theme ?? null,
    updates.platforms ? JSON.stringify(updates.platforms) : null,
    updates.status ?? null,
    updates.rawPlan ? JSON.stringify(updates.rawPlan) : null,
    now, id,
  )
  return getContentPlan(id)
}

export function listContentPlans(limit = 20): ContentPlan[] {
  const rows = getDb().prepare('SELECT * FROM content_plans ORDER BY week_start DESC LIMIT ?').all(limit) as Record<string, unknown>[]
  return rows.map(deserialize)
}

import { v4 as uuid } from 'uuid'
import { getDb } from '../db/client.js'
import { logger } from './logger.js'

export interface Job {
  id: string
  type: string
  status: 'queued' | 'processing' | 'done' | 'failed'
  payload: Record<string, unknown>
  result: Record<string, unknown> | null
  error: string | null
  attempts: number
  maxAttempts: number
  priority: number
  createdAt: string
  updatedAt: string
  startedAt: string | null
  completedAt: string | null
}

export function enqueue(
  type: string,
  payload: Record<string, unknown>,
  options: { priority?: number; maxAttempts?: number } = {}
): Job {
  const db = getDb()
  const id = uuid()
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO jobs (id, type, status, payload, attempts, max_attempts, priority, created_at, updated_at)
    VALUES (?, ?, 'queued', ?, 0, ?, ?, ?, ?)
  `).run(id, type, JSON.stringify(payload), options.maxAttempts ?? 3, options.priority ?? 0, now, now)

  logger.debug(`Enqueued job ${id} type=${type}`)
  return getJob(id)!
}

// Atomic dequeue — only one worker gets each job
export function dequeue(type?: string): Job | null {
  const db = getDb()

  return db.transaction(() => {
    const row = type
      ? db.prepare(`
          SELECT * FROM jobs
          WHERE status = 'queued' AND type = ? AND attempts < max_attempts
          ORDER BY priority DESC, created_at ASC
          LIMIT 1
        `).get(type) as Record<string, unknown> | undefined
      : db.prepare(`
          SELECT * FROM jobs
          WHERE status = 'queued' AND attempts < max_attempts
          ORDER BY priority DESC, created_at ASC
          LIMIT 1
        `).get() as Record<string, unknown> | undefined

    if (!row) return null

    const now = new Date().toISOString()
    db.prepare(`
      UPDATE jobs SET status = 'processing', started_at = ?, updated_at = ?, attempts = attempts + 1
      WHERE id = ?
    `).run(now, now, row.id)

    return deserializeJob({ ...row, status: 'processing', started_at: now, attempts: (row.attempts as number) + 1 })
  })()
}

export function completeJob(id: string, result: Record<string, unknown> = {}): void {
  const now = new Date().toISOString()
  getDb().prepare(`
    UPDATE jobs SET status = 'done', result = ?, completed_at = ?, updated_at = ? WHERE id = ?
  `).run(JSON.stringify(result), now, now, id)
}

export function failJob(id: string, error: string): void {
  const db = getDb()
  const now = new Date().toISOString()
  const job = getJob(id)

  if (job && job.attempts >= job.maxAttempts) {
    db.prepare(`
      UPDATE jobs SET status = 'failed', error = ?, updated_at = ?, completed_at = ? WHERE id = ?
    `).run(error, now, now, id)
    logger.warn(`Job ${id} permanently failed after ${job.attempts} attempts`)
  } else {
    db.prepare(`
      UPDATE jobs SET status = 'queued', error = ?, updated_at = ? WHERE id = ?
    `).run(error, now, id)
    logger.warn(`Job ${id} failed, will retry`)
  }
}

export function getJob(id: string): Job | null {
  const row = getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(id) as Record<string, unknown> | undefined
  return row ? deserializeJob(row) : null
}

export function listJobs(status?: string, limit = 50): Job[] {
  const rows = status
    ? getDb().prepare('SELECT * FROM jobs WHERE status = ? ORDER BY created_at DESC LIMIT ?').all(status, limit)
    : getDb().prepare('SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?').all(limit)
  return (rows as Record<string, unknown>[]).map(deserializeJob)
}

export function queueStats(): Record<string, number> {
  const rows = getDb().prepare(`
    SELECT status, COUNT(*) as count FROM jobs GROUP BY status
  `).all() as { status: string; count: number }[]
  return Object.fromEntries(rows.map((r) => [r.status, r.count]))
}

function deserializeJob(row: Record<string, unknown>): Job {
  return {
    id: row.id as string,
    type: row.type as string,
    status: row.status as Job['status'],
    payload: JSON.parse((row.payload as string) || '{}'),
    result: row.result ? JSON.parse(row.result as string) : null,
    error: (row.error as string) || null,
    attempts: row.attempts as number,
    maxAttempts: (row.max_attempts as number) ?? 3,
    priority: (row.priority as number) ?? 0,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    startedAt: (row.started_at as string) || null,
    completedAt: (row.completed_at as string) || null,
  }
}

import { v4 as uuid } from 'uuid'
import { getDb } from '../db/client.js'
import { config } from '../config/index.js'

export interface Brand {
  id: string
  name: string
  handle: string
  niche: string
  voice: string
  hashtags: string
  colorPrimary: string
  colorSecondary: string
  logoUrl: string | null
  createdAt: string
  updatedAt: string
}

function deserialize(row: Record<string, unknown>): Brand {
  return {
    id: row.id as string,
    name: row.name as string,
    handle: row.handle as string,
    niche: row.niche as string,
    voice: row.voice as string,
    hashtags: row.hashtags as string,
    colorPrimary: (row.color_primary as string) ?? '#7c3aed',
    colorSecondary: (row.color_secondary as string) ?? '#22c55e',
    logoUrl: (row.logo_url as string) || null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

export function getDefaultBrand(): Brand | null {
  const row = getDb().prepare('SELECT * FROM brands LIMIT 1').get() as Record<string, unknown> | undefined
  return row ? deserialize(row) : null
}

export function getBrand(id: string): Brand | null {
  const row = getDb().prepare('SELECT * FROM brands WHERE id = ?').get(id) as Record<string, unknown> | undefined
  return row ? deserialize(row) : null
}

export function upsertBrand(data: Partial<Brand> & { id?: string }): Brand {
  const db = getDb()
  const id = data.id ?? uuid()
  const now = new Date().toISOString()

  const existing = data.id ? getBrand(data.id) : getDefaultBrand()

  if (existing) {
    db.prepare(`
      UPDATE brands SET name=?, handle=?, niche=?, voice=?, hashtags=?,
      color_primary=?, color_secondary=?, logo_url=?, updated_at=? WHERE id=?
    `).run(
      data.name ?? existing.name,
      data.handle ?? existing.handle,
      data.niche ?? existing.niche,
      data.voice ?? existing.voice,
      data.hashtags ?? existing.hashtags,
      data.colorPrimary ?? existing.colorPrimary,
      data.colorSecondary ?? existing.colorSecondary,
      data.logoUrl ?? existing.logoUrl,
      now,
      existing.id,
    )
    return getBrand(existing.id)!
  }

  db.prepare(`
    INSERT INTO brands (id, name, handle, niche, voice, hashtags, color_primary, color_secondary, logo_url, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    data.name ?? config.brandName,
    data.handle ?? config.brandHandle,
    data.niche ?? config.brandNiche,
    data.voice ?? config.brandVoice,
    data.hashtags ?? config.brandHashtags,
    data.colorPrimary ?? '#7c3aed',
    data.colorSecondary ?? '#22c55e',
    data.logoUrl ?? null,
    now,
    now,
  )

  return getBrand(id)!
}

export function ensureDefaultBrand(): Brand {
  const existing = getDefaultBrand()
  if (existing) return existing
  return upsertBrand({})
}

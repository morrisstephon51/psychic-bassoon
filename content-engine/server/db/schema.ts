import { getDb } from './client.js'
import { logger } from '../lib/logger.js'

export function runMigrations(): void {
  const db = getDb()

  db.exec(`
    CREATE TABLE IF NOT EXISTS brands (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      handle TEXT NOT NULL,
      niche TEXT NOT NULL,
      voice TEXT NOT NULL,
      hashtags TEXT NOT NULL,
      color_primary TEXT DEFAULT '#7c3aed',
      color_secondary TEXT DEFAULT '#22c55e',
      logo_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS content_plans (
      id TEXT PRIMARY KEY,
      brand_id TEXT NOT NULL REFERENCES brands(id),
      week_start TEXT NOT NULL,
      theme TEXT NOT NULL,
      platforms TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending','generating','ready','publishing','done','failed')),
      raw_plan TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS content_items (
      id TEXT PRIMARY KEY,
      plan_id TEXT NOT NULL REFERENCES content_plans(id),
      brand_id TEXT NOT NULL REFERENCES brands(id),
      type TEXT NOT NULL CHECK(type IN ('video_reel','text_post','carousel','story')),
      platform TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending','generating','ready','scheduled','publishing','published','failed')),
      title TEXT,
      caption TEXT,
      hashtags TEXT,
      script TEXT,
      media_path TEXT,
      thumbnail_path TEXT,
      post_id TEXT,
      post_url TEXT,
      scheduled_at TEXT,
      published_at TEXT,
      error TEXT,
      metadata TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      status TEXT DEFAULT 'queued' CHECK(status IN ('queued','processing','done','failed')),
      payload TEXT NOT NULL,
      result TEXT,
      error TEXT,
      attempts INTEGER DEFAULT 0,
      max_attempts INTEGER DEFAULT 3,
      priority INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      started_at TEXT,
      completed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS platforms (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      enabled INTEGER DEFAULT 0,
      credentials TEXT,
      rate_limit_rpm INTEGER DEFAULT 60,
      last_post_at TEXT,
      total_posts INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS schedules (
      id TEXT PRIMARY KEY,
      content_item_id TEXT NOT NULL REFERENCES content_items(id),
      platform TEXT NOT NULL,
      scheduled_at TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending','published','failed','cancelled')),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS analytics (
      id TEXT PRIMARY KEY,
      content_item_id TEXT NOT NULL REFERENCES content_items(id),
      platform TEXT NOT NULL,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      shares INTEGER DEFAULT 0,
      comments INTEGER DEFAULT 0,
      saves INTEGER DEFAULT 0,
      reach INTEGER DEFAULT 0,
      impressions INTEGER DEFAULT 0,
      fetched_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, priority DESC, created_at);
    CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status, scheduled_at);
    CREATE INDEX IF NOT EXISTS idx_content_items_plan ON content_items(plan_id);
    CREATE INDEX IF NOT EXISTS idx_schedules_pending ON schedules(status, scheduled_at);
  `)

  // Seed default platforms
  const insertPlatform = db.prepare(`
    INSERT OR IGNORE INTO platforms (id, name, enabled)
    VALUES (?, ?, 0)
  `)
  const platforms = ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'threads']
  for (const p of platforms) {
    insertPlatform.run(p, p)
  }

  logger.info('Database migrations applied')
}

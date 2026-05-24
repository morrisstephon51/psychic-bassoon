import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { config } from '../config/index.js'
import { logger } from '../lib/logger.js'

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (_db) return _db

  const dbDir = path.dirname(config.dbPath)
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true })

  _db = new Database(config.dbPath)

  // WAL mode for concurrent reads + single-writer
  _db.pragma('journal_mode = WAL')
  _db.pragma('synchronous = NORMAL')
  _db.pragma('foreign_keys = ON')
  _db.pragma('busy_timeout = 5000')

  logger.info(`SQLite connected: ${config.dbPath}`)
  return _db
}

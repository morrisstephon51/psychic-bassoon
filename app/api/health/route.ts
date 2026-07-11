import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Pinged daily by Vercel Cron (see vercel.json) so the Supabase free-tier
// project never pauses from inactivity — a paused DB silently breaks every
// form on the site.
export async function GET() {
  try {
    const db = createServiceClient()
    const { error } = await db.from('subscribers').select('id', { count: 'exact', head: true })
    if (error) throw error

    return NextResponse.json({ ok: true, db: 'up' })
  } catch (err) {
    console.error('[health]', err)
    return NextResponse.json({ ok: false, db: 'down' }, { status: 500 })
  }
}

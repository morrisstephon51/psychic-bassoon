import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { email, source } = body ?? {}

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }

  try {
    const db = createServiceClient()
    const { error } = await db
      .from('subscribers')
      .upsert(
        { email: email.trim().toLowerCase().slice(0, 254), source: typeof source === 'string' ? source.slice(0, 100) : 'website' },
        { onConflict: 'email' }
      )
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 })
  }
}

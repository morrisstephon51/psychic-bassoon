import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendContactNotification } from '@/lib/mailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { name, organization, event_type, attendance, date_preference, email, message } = body ?? {}

  if (!name || !organization || !event_type || !email) {
    return NextResponse.json({ error: 'Name, organization, event type, and email are required' }, { status: 400 })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
  }

  const safeEmail = email.trim().toLowerCase().slice(0, 254)
  const safeName  = String(name).slice(0, 200)
  const safeOrg   = String(organization).slice(0, 200)
  const safeType  = String(event_type).slice(0, 100)
  const safeMsg   = message ? String(message).slice(0, 2000) : null

  try {
    const db = createServiceClient()
    const { error } = await db.from('workshop_requests').insert({
      name:            safeName,
      organization:    safeOrg,
      event_type:      safeType,
      attendance:      attendance || null,
      date_preference: date_preference || null,
      email:           safeEmail,
      message:         safeMsg,
    })
    if (error) throw error

    // Email is non-blocking — DB insert is the source of truth
    sendContactNotification({
      name:     safeName,
      email:    safeEmail,
      phone:    'n/a',
      zip_code: 'n/a',
      subject:  `Workshop request from ${safeOrg}`,
      message:  `Event type: ${safeType}\nAttendance: ${attendance || 'n/a'}\nPreferred dates: ${date_preference || 'n/a'}\n\n${safeMsg || ''}`,
    }).catch((err) => console.error('[mailer]', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[workshop-request]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

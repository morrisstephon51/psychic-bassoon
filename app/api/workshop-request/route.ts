import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendContactNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { name, organization, event_type, attendance, date_preference, email, message } = body ?? {}

  if (!name || !organization || !event_type || !email) {
    return NextResponse.json({ error: 'Name, organization, event type, and email are required' }, { status: 400 })
  }

  try {
    const db = createServiceClient()
    const { error } = await db.from('workshop_requests').insert({
      name,
      organization,
      event_type,
      attendance: attendance || null,
      date_preference: date_preference || null,
      email,
      message: message || null,
    })
    if (error) throw error

    // Email is non-blocking — DB insert is the source of truth
    sendContactNotification({
      name,
      email,
      phone: 'n/a',
      zip_code: 'n/a',
      subject: `Workshop request from ${organization}`,
      message: `Event type: ${event_type}\nAttendance: ${attendance || 'n/a'}\nPreferred dates: ${date_preference || 'n/a'}\n\n${message || ''}`,
    }).catch((err) => console.error('[mailer]', err))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[workshop-request]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

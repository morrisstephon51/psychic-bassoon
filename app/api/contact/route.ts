import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendContactNotification } from '@/lib/mailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { name, email, phone, zip_code, subject, message } = body ?? {}

  if (!name || !email || !phone || !zip_code || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
  }

  const safe = {
    name:     String(name).slice(0, 200),
    email:    email.trim().toLowerCase().slice(0, 254),
    phone:    String(phone).slice(0, 30),
    zip_code: String(zip_code).slice(0, 10),
    subject:  String(subject).slice(0, 200),
    message:  String(message).slice(0, 2000),
  }

  try {
    const db = createServiceClient()
    const { error } = await db.from('contacts').insert(safe)
    if (error) throw error

    // Email is non-blocking — DB insert is the source of truth
    sendContactNotification({ ...safe }).catch(
      (err) => console.error('[mailer]', err)
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendContactNotification } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { name, email, phone, zip_code, subject, message } = body ?? {}

  if (!name || !email || !phone || !zip_code || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  try {
    const db = createServiceClient()
    const { error } = await db.from('contacts').insert({ name, email, phone, zip_code, subject, message })
    if (error) throw error

    // Email is non-blocking — DB insert is the source of truth
    sendContactNotification({ name, email, phone, zip_code, subject, message }).catch(
      (err) => console.error('[mailer]', err)
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

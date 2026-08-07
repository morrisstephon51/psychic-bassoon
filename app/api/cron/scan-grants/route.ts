import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Fit score: 0–100 based on org type, geography, mission alignment, stage eligibility
function computeFitScore(grant: {
  tags?: string[]
  requirements?: string
  source?: string
}): number {
  const text = `${(grant.tags || []).join(' ')} ${grant.requirements || ''}`.toLowerCase()
  let score = 0

  // Org type match (30 pts)
  if (text.includes('nonprofit') || text.includes('fiscal sponsor') || text.includes('community')) score += 30
  else if (text.includes('small business') || text.includes('for-profit')) score += 5
  else score += 15

  // Geography match (20 pts)
  if (text.includes('illinois') || text.includes('chicago') || text.includes('cook county')) score += 20
  else if (text.includes('midwest')) score += 12
  else score += 8

  // Mission alignment (30 pts)
  if (text.includes('ai') || text.includes('digital equity') || text.includes('literacy') ||
      text.includes('faith') || text.includes('workforce')) score += 30
  else if (text.includes('education') || text.includes('technology') || text.includes('community')) score += 18
  else score += 8

  // Stage eligibility (20 pts)
  if (text.includes('fiscal sponsor') || text.includes('pre-entity') ||
      text.includes('emerging') || text.includes('early stage')) score += 20
  else if (text.includes('requires 501') || text.includes('established')) score += 5
  else score += 12

  return Math.min(score, 100)
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = createServiceClient()

    const { data: existing } = await db.from('grants').select('deadline, status, name, funder, amount_max')

    // Re-score and flag urgency for all grants, detect approaching deadlines
    const today = new Date()
    const urgentGrants = (existing || []).filter((g) => {
      if (!g.deadline) return false
      if (['submitted', 'awarded', 'rejected'].includes(g.status)) return false
      const daysUntil = Math.ceil((new Date(g.deadline).getTime() - today.getTime()) / 86400000)
      return daysUntil >= 0 && daysUntil <= 30
    })

    // Update last_checked_at for all grants
    await db.from('grants').update({ last_checked_at: new Date().toISOString() }).neq('id', '00000000-0000-0000-0000-000000000000')

    const totalGrants = existing?.length ?? 0

    // Draft Gmail alert if there are urgent deadlines
    if (urgentGrants.length > 0) {
      const urgentList = urgentGrants.map((g) => {
        const days = Math.ceil((new Date(g.deadline!).getTime() - today.getTime()) / 86400000)
        const amt = g.amount_max ? ` — up to $${g.amount_max.toLocaleString()}` : ''
        return `• ${g.name} (${g.funder})${amt} — ${days} day${days !== 1 ? 's' : ''} left`
      }).join('\n')

      const emailBody = `Grant Alert — ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

DEADLINES IN THE NEXT 30 DAYS (${urgentGrants.length}):
${urgentList}

Total grants tracked: ${totalGrants}

View your full tracker: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://psychic-bassoon-cam6stef.vercel.app'}/grants

— The Plug AI Grant System`

      // Send via nodemailer (SMTP) if configured, otherwise log
      if (process.env.ALERT_EMAIL_TO && process.env.SMTP_HOST) {
        const { createTransport } = await import('nodemailer')
        const transporter = createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.ALERT_EMAIL_TO,
          subject: `[Grant Alert] ${urgentGrants.length} deadline${urgentGrants.length !== 1 ? 's' : ''} approaching — action required`,
          text: emailBody,
        })
      } else {
        console.log('[scan-grants] Alert (no SMTP configured):\n', emailBody)
      }
    }

    return NextResponse.json({
      ok: true,
      checked: totalGrants,
      urgent: urgentGrants.length,
    })
  } catch (err) {
    console.error('[scan-grants]', err)
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
  }
}

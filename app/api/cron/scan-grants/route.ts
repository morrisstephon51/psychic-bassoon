import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { computeFitScore } from '@/lib/fit-score'

export const dynamic = 'force-dynamic'

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

    const { data: existing } = await db
      .from('grants')
      .select('id, deadline, status, name, funder, amount_max, fit_score, tags, requirements, source')

    const grants = existing || []

    // Backfill fit_score for grants that don't have one yet. computeFitScore is
    // the system's scoring heuristic; before this it was defined but never
    // called, so fit_score was only ever whatever was entered by hand and the
    // FitBar / "priority" filter on /grants sat inert for un-scored grants. We
    // only score rows where fit_score IS NULL so any manually-curated score is
    // preserved (no data loss). To have the heuristic own the field outright,
    // drop the `g.fit_score == null` guard so it re-scores every grant.
    let scored = 0
    for (const g of grants) {
      if (g.fit_score != null) continue
      const fit = computeFitScore({ tags: g.tags, requirements: g.requirements, source: g.source })
      const { error: scoreErr } = await db.from('grants').update({ fit_score: fit }).eq('id', g.id)
      if (scoreErr) {
        console.error('[scan-grants] fit_score update failed for', g.id, scoreErr)
      } else {
        scored++
      }
    }

    // Flag urgency and detect approaching deadlines.
    const today = new Date()
    const urgentGrants = grants.filter((g) => {
      if (!g.deadline) return false
      if (['submitted', 'awarded', 'rejected'].includes(g.status)) return false
      const daysUntil = Math.ceil((new Date(g.deadline).getTime() - today.getTime()) / 86400000)
      return daysUntil >= 0 && daysUntil <= 30
    })

    // Update last_checked_at for all grants
    await db.from('grants').update({ last_checked_at: new Date().toISOString() }).neq('id', '00000000-0000-0000-0000-000000000000')

    const totalGrants = grants.length

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
      scored,
      urgent: urgentGrants.length,
    })
  } catch (err) {
    console.error('[scan-grants]', err)
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
  }
}

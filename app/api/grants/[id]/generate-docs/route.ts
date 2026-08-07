import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const STEFAN_PROFILE = `
Organization: The Plug AI
Founder: Stephon (Stefan) Morris
Email: founder@theplugai.info
Mission: AI literacy education for faith leaders, community health workers, and first-generation students in Chicago's south suburban Cook County, Illinois.
Community served: Faith leaders (pastors, church administrators), community health workers, first-generation college students — people the tech industry has consistently left behind.
Proof of impact: Live 4-church deployment — MOFEC, All Nations, Faith Mission, Holy City — through "My Health My Power" initiative at BigHeart Health. Includes 15-campaign church invitation video library, branded QR business cards for health specialists, and a social media content calendar.
Technical depth: Built and deployed autonomous AI agent systems (MUNDI multi-agent dashboard, content pipeline, intake routing agents) — rare for a community-stage nonprofit founder.
Stage: Pre-501(c)(3), pursuing fiscal sponsorship through a church partner (Kenneth Vasser's congregation). Deployed proof of concept exists. Zero paid staff. Operating entirely on free-tier services.
Differentiator: Not an outsider studying underserved communities — worked inside healthcare ops (Mount Sinai Hospital), education technology (Apollo After Schools), and Chicago's south suburban church networks. This is personal and proven, not parachuted-in.
Website: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://psychic-bassoon-cam6stef.vercel.app'}
`.trim()

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const secret = process.env.MUTATION_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = createServiceClient()

    const { data: grant, error: fetchErr } = await db
      .from('grants')
      .select('*')
      .eq('id', params.id)
      .single()

    if (fetchErr || !grant) {
      return NextResponse.json({ error: 'Grant not found' }, { status: 404 })
    }

    const amountRange = grant.amount_min && grant.amount_max
      ? `$${grant.amount_min.toLocaleString()}–$${grant.amount_max.toLocaleString()}`
      : grant.amount_max
        ? `up to $${grant.amount_max.toLocaleString()}`
        : 'amount not specified'

    const deadline = grant.deadline
      ? new Date(grant.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : 'rolling / open'

    const prompt = `You are a professional grant writer. Generate two documents for a grant application.

APPLICANT PROFILE:
${STEFAN_PROFILE}

GRANT DETAILS:
Name: ${grant.name}
Funder: ${grant.funder}
Amount: ${amountRange}
Deadline: ${deadline}
Requirements / Focus: ${grant.requirements || 'General community development and digital equity focus'}
Tags: ${(grant.tags || []).join(', ')}

Generate EXACTLY this JSON structure (no markdown, just raw JSON):
{
  "loi": "...",
  "narrative": "..."
}

LOI (Letter of Intent) rules:
- 400–500 words
- Four paragraphs: (1) hook — the specific problem in Cook County, (2) who we are and the proof, (3) what we're asking for and why this funder specifically, (4) close with next step
- No jargon. Plain declarative sentences. Voice: direct, community-first, evidence-backed.
- Use specific facts: 4 churches, Cook County IL, faith leaders + community health workers + first-gen students

NARRATIVE (Full Application) rules:
- 800–1000 words
- Sections: Problem Statement | Our Solution | Proof of Impact | Team | Budget Use | Evaluation
- Same voice as LOI — real, direct, no buzzwords
- Budget section: describe how funds will be used (curriculum, community outreach, tech infrastructure, fiscal sponsor admin) without inventing numbers
- Evaluation: describe how success will be measured (workshops held, participants trained, community partners engaged)`

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      throw new Error(`Groq error: ${groqRes.status} ${errText}`)
    }

    const groqData = await groqRes.json()
    const content = groqData.choices?.[0]?.message?.content
    if (!content) throw new Error('Empty Groq response')

    let docs: { loi: string; narrative: string }
    try {
      docs = JSON.parse(content)
    } catch {
      throw new Error('Groq returned invalid JSON')
    }

    const inserts = [
      { grant_id: params.id, doc_type: 'loi', content: docs.loi },
      { grant_id: params.id, doc_type: 'narrative', content: docs.narrative },
    ]

    // Delete existing docs for this grant before inserting new ones
    await db.from('grant_documents').delete().eq('grant_id', params.id)

    const { data: saved, error: insertErr } = await db
      .from('grant_documents')
      .insert(inserts)
      .select()

    if (insertErr) throw insertErr

    return NextResponse.json({ ok: true, documents: saved })
  } catch (err) {
    console.error('[generate-docs]', err)
    return NextResponse.json({ error: 'Document generation failed' }, { status: 500 })
  }
}

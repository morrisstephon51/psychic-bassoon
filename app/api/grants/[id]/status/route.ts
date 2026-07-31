import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const VALID_STATUSES = ['identified','researching','drafting','submitted','awarded','rejected','watching']

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const db = createServiceClient()
    const { error } = await db
      .from('grants')
      .update({ status })
      .eq('id', params.id)

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[grants PATCH status]', err)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}

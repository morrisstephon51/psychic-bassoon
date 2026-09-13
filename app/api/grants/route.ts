import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = createServiceClient()
    const { data, error } = await db
      .from('grants')
      .select('*, grant_documents(*)')
      .order('deadline', { ascending: true, nullsFirst: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('[grants GET]', err)
    return NextResponse.json({ error: 'Failed to fetch grants' }, { status: 500 })
  }
}

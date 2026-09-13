import { NextRequest, NextResponse } from 'next/server'

/**
 * Guards a mutating grant endpoint. Fails CLOSED: if MUTATION_SECRET is not
 * configured the request is denied (503) rather than allowed through, so a
 * deploy that forgot to set the secret does not expose an open, cost-bearing
 * endpoint (e.g. generate-docs spends Groq API calls on every request).
 *
 * The browser sends the matching NEXT_PUBLIC_MUTATION_SECRET as a Bearer token.
 * Note that NEXT_PUBLIC_* values ship in the client bundle, so this is a light
 * gate against drive-by/unauthenticated abuse, not a defense against a
 * determined attacker. Both vars must be set to the SAME value for the UI to
 * work; see .env.example.
 *
 * @returns a NextResponse to short-circuit with, or null when authorized.
 */
export function requireMutationAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.MUTATION_SECRET

  if (!secret) {
    console.error('[mutation-auth] MUTATION_SECRET is not set — denying mutation')
    return NextResponse.json(
      { error: 'Mutations are not configured on this deployment' },
      { status: 503 }
    )
  }

  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}

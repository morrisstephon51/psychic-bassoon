export async function submitToFormspree(
  formId: string | undefined,
  data: Record<string, string>
): Promise<{ ok: boolean }> {
  if (!formId) return { ok: false }
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    return { ok: res.ok }
  } catch {
    // Network/CORS failure: resolve to { ok: false } so callers never hang.
    // Both callers (NotifyModal, resources/[slug]) await this without a
    // try/catch and rely on it resolving, not rejecting.
    return { ok: false }
  }
}

export const FORMSPREE_CONTACT_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID
export const FORMSPREE_NEWSLETTER_ID = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID

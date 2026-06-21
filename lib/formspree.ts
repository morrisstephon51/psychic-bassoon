export async function submitToFormspree(
  formId: string | undefined,
  data: Record<string, string>
): Promise<{ ok: boolean }> {
  if (!formId) return { ok: false }
  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  return { ok: res.ok }
}

export const FORMSPREE_CONTACT_ID = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID
export const FORMSPREE_NEWSLETTER_ID = process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID

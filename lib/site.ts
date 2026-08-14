/**
 * Canonical origin for the site, shared by page metadata, the sitemap, and robots.
 *
 * Reads NEXT_PUBLIC_APP_URL first, then NEXT_PUBLIC_SITE_URL, so this stays in sync
 * with the grant tracker (PR #11), whose .env.example documents and whose code reads
 * NEXT_PUBLIC_SITE_URL for the same canonical origin. Set EITHER one to a custom
 * domain when deploying elsewhere and every canonical, Open Graph, sitemap, robots,
 * and grant-email URL agrees. Falls back to the Vercel URL when neither is set.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://psychic-bassoon-cam6stef.vercel.app'

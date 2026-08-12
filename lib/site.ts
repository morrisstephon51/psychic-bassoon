/**
 * Canonical origin for the site, shared by page metadata, the sitemap, and robots.
 * Override with NEXT_PUBLIC_APP_URL (e.g. a custom domain) when deploying elsewhere;
 * falls back to the Vercel URL so canonical, Open Graph, sitemap, and robots stay in sync.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://psychic-bassoon-cam6stef.vercel.app'

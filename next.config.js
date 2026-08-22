/** @type {import('next').NextConfig} */

// Baseline security response headers applied to every route.
// These are the safe, render-neutral hardening headers: none of them block
// scripts, styles, or images, so they carry zero risk to the live pages while
// closing the gaps every security scanner (Mozilla Observatory,
// securityheaders.com, Lighthouse best-practices) flags on an unheadered site.
//
// A full Content-Security-Policy is deliberately NOT set here: a correct CSP
// needs per-request nonces plus an allow-list vetted against the site's real
// asset origins (images.unsplash.com, picsum.photos, via.placeholder.com and
// Next.js's own inline runtime). A wrong CSP silently breaks the production
// site, so it belongs in its own tested change, not this baseline pass.
const securityHeaders = [
  // Stop the site being framed on a hostile origin (clickjacking / UI-redress).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Don't let browsers MIME-sniff a response into a different content type.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Send only the origin (never the full path/query) to other sites.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Keep clients on HTTPS for a year (Vercel already serves everything over TLS).
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // We use none of these device APIs anywhere; deny them by default.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

module.exports = nextConfig

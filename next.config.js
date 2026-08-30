/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  async rewrites() {
    return {
      // beforeFiles so the static scroll experience wins the root route over
      // app/page.tsx. Every other route (learn, workshops, community, about,
      // contact, resources, APIs) is untouched.
      beforeFiles: [{ source: '/', destination: '/plug/index.html' }],
      afterFiles: [],
      fallback: [],
    }
  },
}

module.exports = nextConfig

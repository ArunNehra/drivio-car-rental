/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://script.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://script.google.com https://script.googleusercontent.com; frame-src 'self' https://wa.me https://api.whatsapp.com;",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap%20xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

/**
 * @type {import('next').NextConfig}
 */
const path = require('path')

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// ANALYZE=true yarn build
// module.exports = withBundleAnalyzer({})

module.exports = {
  images: {
    domains: [
      'static.dtravel.com',
      'dtrav-dev.s3.ap-southeast-1.amazonaws.com',
      'images.dataismist.com',
      'images.dtravel.com',
    ],
    // unoptimized: true,
    // loader: 'custom',
    // loaderFile: './loader.ts',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: false,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://host.dataismist.com https://host.dtravel.xyz https://direct-stg.dtravel.com https://host.dtravel.com http://chris.dataismist.com:3000;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/property/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1, immutable',
          },
        ],
      },
    ]
  },
  experimental: {
    urlImports: [
      // 'https://framer.com/m/',
      // 'https://framerusercontent.com/',
      // 'https://ga.jspm.io/',
      // 'https://jspm.dev/',
      'https://static.dtravel.com/',
      'https://images.dataismist.com/',
      'https://images.dtravel.com/',
    ],
  },
}

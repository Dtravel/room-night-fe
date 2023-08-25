/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  generateRobotsTxt: true, // (optional)
  // sitemapSize: 7000,
  outDir: './out',
  // ...other options
}

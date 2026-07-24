export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://komputeks.vercel.app'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin/', '/dashboard/', '/api/'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

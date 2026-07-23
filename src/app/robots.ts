export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://komputeks-brand.vercel.app';
  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/', disallow: ['/admin/', '/dashboard/', '/api/'] },
      { userAgent: 'Bingbot', allow: '/', disallow: ['/admin/', '/dashboard/', '/api/'] },
      { userAgent: 'DuckDuckBot', allow: '/', disallow: ['/admin/', '/dashboard/', '/api/'] },
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/dashboard/', '/api/'] },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'PerplexityBot', disallow: '/' },
      { userAgent: 'Omgili', disallow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
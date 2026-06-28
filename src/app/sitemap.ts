import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://komputeks-brand.vercel.app';

  const routes = [
    '', '/about', '/products', '/contact', '/faq', '/privacy', '/terms',
    '/docs', '/docs/user-manual', '/docs/changelog', '/docs/roadmap',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
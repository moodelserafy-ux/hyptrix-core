import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://hyptrix.com';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/deploy',
    '/features',
    '/pricing',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'always' : 'daily',
    priority: route === '' ? 1.0 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}${route}`,
        ar: `${baseUrl}${route}?lang=ar`,
      },
    },
  }));
}

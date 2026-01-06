import { articles } from '../data/articles';

export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(baseUrl: string = 'https://viser360.com'): string {
  const urls: SitemapURL[] = [];

  urls.push({
    loc: `${baseUrl}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
  });

  urls.push({
    loc: `${baseUrl}/categories`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
  });

  urls.push({
    loc: `${baseUrl}/about`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  });

  urls.push({
    loc: `${baseUrl}/contact`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7,
  });

  urls.push({
    loc: `${baseUrl}/faq`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6,
  });

  urls.push({
    loc: `${baseUrl}/terms`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  });

  urls.push({
    loc: `${baseUrl}/privacy`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.5,
  });

  articles.forEach((article) => {
    urls.push({
      loc: `${baseUrl}/article/${article.slug}`,
      lastmod: article.updated_at.split('T')[0],
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return xml;
}

export function downloadSitemap() {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

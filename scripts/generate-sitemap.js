import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://viser360.com';
const staticPages = [
  { loc: '/', priority: 1.0, changefreq: 'daily' },
  { loc: '/categories', priority: 0.8, changefreq: 'weekly' },
  { loc: '/about', priority: 0.7, changefreq: 'monthly' },
  { loc: '/contact', priority: 0.7, changefreq: 'monthly' },
  { loc: '/faq', priority: 0.6, changefreq: 'monthly' },
  { loc: '/terms', priority: 0.5, changefreq: 'yearly' },
  { loc: '/privacy', priority: 0.5, changefreq: 'yearly' },
];

const articlesDir = path.join(__dirname, '../src/data/articles');
const articleFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.ts') && f !== 'loader.ts');

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

staticPages.forEach(page => {
  xml += `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
});

articleFiles.forEach(file => {
  const slug = file.replace('.ts', '');
  xml += `
  <url>
    <loc>${baseUrl}/article/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
});

xml += `
</urlset>`;

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log(`✓ Sitemap generated successfully with ${staticPages.length + articleFiles.length} URLs`);

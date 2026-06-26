/**
 * Prerender скрипт для SEO
 * Генерує статичні HTML-файли для сторінок і статей блогу
 * 
 * Це дозволяє Googlebot бачити повний контент без виконання JS
 * 
 * Використання:
 *   node scripts/prerender.js
 * 
 * Результат: dist/{route}/index.html і dist/blog/{slug}/index.html — готові SEO-сторінки
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const siteUrl = 'https://ksgenadivna.pp.ua';
const ogImage = `${siteUrl}/og-image.png`;

const pageRoutes = [
  {
    path: '/poslugy',
    dir: 'poslugy',
    label: 'Послуги',
    title: 'Послуги рієлтора у Кропивницькому | Ксенія Бондаренко',
    description: 'Послуги рієлтора у Кропивницькому: купівля, продаж, оренда, оцінка нерухомості та юридичний супровід угод.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/pro-mene',
    dir: 'pro-mene',
    label: 'Про мене',
    title: 'Про Ксенію Бондаренко | Рієлтор у Кропивницькому',
    description: 'Ксенія Бондаренко — рієлтор у Кропивницькому з досвідом супроводу купівлі, продажу та оренди нерухомості.',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/blog',
    dir: 'blog',
    label: 'Блог',
    title: 'Блог про нерухомість Кропивницького | Ксенія Бондаренко',
    description: 'Статті, поради та аналітика про купівлю, продаж, оренду й ринок нерухомості у Кропивницькому.',
    changefreq: 'daily',
    priority: '0.9',
  },
];

// Читаємо статті
const articles = JSON.parse(
  readFileSync(join(rootDir, 'src/data/articles.json'), 'utf-8')
);

function getKyivDate() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function generateBreadcrumbSchema(page) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.label,
        item: `${siteUrl}${page.path}`,
      },
    ],
  }, null, 2);
}

function generatePageHTML(baseHtml, page) {
  const canonicalUrl = `${siteUrl}${page.path}`;
  const breadcrumbSchema = generateBreadcrumbSchema(page);

  return baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${page.title}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${page.description}" />`)
    .replace('</head>', `    <script type="application/ld+json">\n${breadcrumbSchema}\n    </script>\n  </head>`);
}

function generateSitemap(publishedArticles, buildDate) {
  const urls = [
    { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
    ...pageRoutes.map((page) => ({
      loc: `${siteUrl}${page.path}`,
      changefreq: page.changefreq,
      priority: page.priority,
    })),
    ...publishedArticles.map((article) => ({
      loc: `${siteUrl}/blog/${article.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: article.publishDate,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${urls.map((url) => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod || buildDate}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
}

// HTML шаблон для статті
function generateArticleHTML(article) {
  const keywords = article.keywords.join(', ');
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | Ксенія Бондаренко</title>
  <meta name="description" content="${article.metaDescription}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="Ксенія Бондаренко">
  <link rel="canonical" href="${articleUrl}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.metaDescription}">
  <meta property="og:url" content="${articleUrl}">
  <meta property="og:site_name" content="Ксенія Бондаренко — Агент з нерухомості">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${article.title}">
  <meta property="article:published_time" content="${article.publishDate}T${article.publishTime}:00+03:00">
  <meta property="article:author" content="Ксенія Бондаренко">
  <meta property="article:section" content="${article.category}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.metaDescription}">
  <meta name="twitter:image" content="${ogImage}">
  
  <!-- Schema.org Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${article.title.replace(/"/g, '\\"')}",
    "description": "${article.metaDescription.replace(/"/g, '\\"')}",
    "author": {
      "@type": "Person",
      "name": "Ксенія Бондаренко",
      "url": "https://ksgenadivna.pp.ua"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ксенія Бондаренко — Агент з нерухомості",
      "logo": {
        "@type": "ImageObject",
        "url": "${ogImage}",
        "width": 1200,
        "height": 630
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "${ogImage}",
      "width": 1200,
      "height": 630
    },
    "datePublished": "${article.publishDate}T${article.publishTime}:00+03:00",
    "dateModified": "${article.publishDate}T${article.publishTime}:00+03:00",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${articleUrl}"
    },
    "keywords": "${keywords}",
    "articleSection": "${article.category}"
  }
  </script>
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
    header { border-bottom: 1px solid #eee; padding-bottom: 1rem; margin-bottom: 2rem; }
    .logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; color: #6b8a9a; text-decoration: none; }
    .meta { color: #888; font-size: 0.875rem; margin: 1rem 0; }
    .meta span { margin-right: 1rem; }
    h1 { font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 1rem; line-height: 1.2; }
    .content { font-size: 1.125rem; line-height: 1.8; }
    .content p { margin-bottom: 1.5rem; }
    footer { border-top: 1px solid #eee; padding-top: 1rem; margin-top: 3rem; text-align: center; color: #888; font-size: 0.875rem; }
    .cta { background: #6b8a9a; color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; display: inline-block; margin-top: 2rem; }
    .cta:hover { background: #557080; }
  </style>
</head>
<body>
  <header>
    <a href="/" class="logo">Ксенія Бондаренко</a>
    <div class="meta">
      <span>📅 ${article.publishDate}</span>
      <span>📖 ${article.readTime}</span>
      <span>🏷️ ${article.category}</span>
    </div>
  </header>
  
  <main>
    <article>
      <h1>${article.title}</h1>
      <div class="content">
        <p><strong>${article.metaDescription}</strong></p>
        ${(article.content || '').split('\n').filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join('\n        ')}
      </div>
    </article>
    
    <a href="/#contact" class="cta">Безкоштовна консультація з нерухомості</a>
  </main>
  
  <footer>
    <p>© 2026 Ксенія Бондаренко — Агент з нерухомості у Кропивницькому</p>
    <p><a href="/blog">Всі статті</a> | <a href="/">Головна</a></p>
  </footer>
</body>
</html>`;
}

const buildDate = getKyivDate();
const publishedArticles = articles.filter((article) => article.publishDate <= buildDate);

// Генеруємо HTML для основних сторінок
const distIndexPath = join(rootDir, 'dist/index.html');
const baseHtml = readFileSync(distIndexPath, 'utf-8');

for (const page of pageRoutes) {
  const pageDir = join(rootDir, 'dist', page.dir);
  if (!existsSync(pageDir)) {
    mkdirSync(pageDir, { recursive: true });
  }
  writeFileSync(join(pageDir, 'index.html'), generatePageHTML(baseHtml, page), 'utf-8');
}

// Генеруємо HTML для кожної опублікованої статті
const outputDir = join(rootDir, 'dist/blog');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

let generated = 0;
for (const article of publishedArticles) {
  const html = generateArticleHTML(article);
  const articleDir = join(outputDir, article.slug);
  if (!existsSync(articleDir)) {
    mkdirSync(articleDir, { recursive: true });
  }
  writeFileSync(join(articleDir, 'index.html'), html, 'utf-8');
  generated++;
}

writeFileSync(join(rootDir, 'dist/sitemap.xml'), generateSitemap(publishedArticles, buildDate), 'utf-8');

console.log(`✅ Prerendered ${pageRoutes.length} pages and ${generated} articles to dist/`);
console.log('');
console.log('Тепер Googlebot бачить опубліковані статті як окремі HTML-файли з повним контентом.');
console.log('Додай ці файли до Cloudflare Pages при деплої.');

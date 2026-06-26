/**
 * Prerender скрипт для SEO
 * Генерує статичні HTML-файли для кожної статті блогу
 * 
 * Це дозволяє Googlebot бачити повний контент без виконання JS
 * 
 * Використання:
 *   node scripts/prerender.js
 * 
 * Результат: dist/blog/*.html — готові SEO-сторінки
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Читаємо статті
const articles = JSON.parse(
  readFileSync(join(rootDir, 'src/data/articles.json'), 'utf-8')
);

// HTML шаблон для статті
function generateArticleHTML(article) {
  const keywords = article.keywords.join(', ');
  const articleUrl = `https://ksgenadivna.pp.ua/blog/${article.slug}`;
  
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
  <meta property="article:published_time" content="${article.publishDate}T${article.publishTime}:00+03:00">
  <meta property="article:author" content="Ксенія Бондаренко">
  <meta property="article:section" content="${article.category}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${article.title}">
  <meta name="twitter:description" content="${article.metaDescription}">
  
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
        "url": "https://ksgenadivna.pp.ua/og-image.png"
      }
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

// Генеруємо HTML для кожної статті
const outputDir = join(rootDir, 'dist/blog');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

let generated = 0;
for (const article of articles) {
  const html = generateArticleHTML(article);
  const filePath = join(outputDir, `${article.slug}.html`);
  writeFileSync(filePath, html, 'utf-8');
  generated++;
}

console.log(`✅ Prerendered ${generated} articles to dist/blog/`);
console.log('');
console.log('Тепер Googlebot бачить кожну статтю як окремий HTML-файл з повним контентом.');
console.log('Додай ці файли до Cloudflare Pages при деплої.');

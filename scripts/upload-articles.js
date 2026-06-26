/**
 * Скрипт для завантаження статей у Cloudflare D1
 * 
 * Використання:
 *   npx wrangler d1 execute ksbondarenko-blog --file=worker/schema.sql
 *   node scripts/upload-articles.js
 * 
 * Або через wrangler:
 *   npx wrangler d1 execute ksbondarenko-blog --command="INSERT INTO articles..."
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Читаємо статті з JSON
const articlesData = JSON.parse(
  readFileSync(join(process.cwd(), 'src/data/articles.json'), 'utf-8')
);

// Генеруємо SQL для завантаження
function generateInsertSQL(articles) {
  const statements = articles.map((article) => {
    const keywords = JSON.stringify(article.keywords).replace(/'/g, "''");
    const title = article.title.replace(/'/g, "''");
    const metaDescription = article.metaDescription.replace(/'/g, "''");
    const content = (article.content || '').replace(/'/g, "''").replace(/\n/g, '\\n');
    
    return `INSERT OR REPLACE INTO articles (id, slug, title, meta_description, content, keywords, category, read_time, publish_date, publish_time) VALUES (
      '${article.id}',
      '${article.slug}',
      '${title}',
      '${metaDescription}',
      '${content}',
      '${keywords}',
      '${article.category}',
      '${article.readTime}',
      '${article.publishDate}',
      '${article.publishTime}'
    );`;
  });

  return statements.join('\n');
}

// Генеруємо batch insert (швидший)
function generateBatchInsertSQL(articles) {
  const batchSize = 10;
  const batches = [];
  
  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    const values = batch.map((article) => {
      const keywords = JSON.stringify(article.keywords).replace(/'/g, "''");
      const title = article.title.replace(/'/g, "''");
      const metaDescription = article.metaDescription.replace(/'/g, "''");
      const content = (article.content || '').replace(/'/g, "''").replace(/\n/g, '\\n');
      
      return `('${article.id}', '${article.slug}', '${title}', '${metaDescription}', '${content}', '${keywords}', '${article.category}', '${article.readTime}', '${article.publishDate}', '${article.publishTime}')`;
    }).join(',\n');
    
    batches.push(`INSERT OR REPLACE INTO articles (id, slug, title, meta_description, content, keywords, category, read_time, publish_date, publish_time) VALUES\n${values};`);
  }
  
  return batches.join('\n\n');
}

// Зберігаємо SQL файл
const sql = generateBatchInsertSQL(articlesData);
writeFileSync(join(__dirname, 'upload-articles.sql'), sql);

console.log(`✅ Generated SQL for ${articlesData.length} articles`);
console.log(`📄 Saved to: scripts/upload-articles.sql`);
console.log('');
console.log('To upload to D1, run:');
console.log('  npx wrangler d1 execute ksbondarenko-blog --file=scripts/upload-articles.sql');
console.log('');
console.log('Or for local development:');
console.log('  npx wrangler d1 execute ksbondarenko-blog --local --file=scripts/upload-articles.sql');

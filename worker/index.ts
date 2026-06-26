/**
 * Cloudflare Worker API для блогу Ксенії Бондаренко
 * 
 * Endpoints:
 *   GET /api/articles — список опублікованих статей (фільтр по даті)
 *   GET /api/articles?category=Гайди — фільтр по категорії
 *   GET /api/articles?search=квартира — пошук по заголовку
 *   GET /api/articles/upcoming — наступні статті (для адмінки)
 *   GET /api/articles/:slug — окрема стаття
 * 
 * Автоматична публікація: стаття з'являється коли publish_date <= NOW()
 */

export interface Env {
  DB: D1Database;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
};

// Handle CORS preflight
function handleOptions() {
  return new Response(null, {
    headers: {
      ...corsHeaders,
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Error response
function errorResponse(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders,
  });
}

// GET /api/articles — список опублікованих статей
async function getPublishedArticles(url: URL, db: D1Database) {
  const category = url.searchParams.get('category');
  const search = url.searchParams.get('search');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
  const offset = parseInt(url.searchParams.get('offset') || '0');

  // Базовий запит: тільки опубліковані (publish_date <= сьогодні)
  let query = `
    SELECT id, slug, title, meta_description, keywords, category, 
           read_time, publish_date, publish_time
    FROM articles 
    WHERE publish_date <= date('now')
  `;
  const params: string[] = [];

  // Фільтр по категорії
  if (category && category !== 'Всі') {
    query += ` AND category = ?`;
    params.push(category);
  }

  // Пошук по заголовку або keywords
  if (search) {
    query += ` AND (title LIKE ? OR meta_description LIKE ? OR keywords LIKE ?)`;
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  // Сортування: найновіші першими
  query += ` ORDER BY publish_date DESC, publish_time DESC`;

  // Пагінація
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit.toString(), offset.toString());

  const result = await db.prepare(query).all(...params);

  // Форматування результату
  const articles = result.results.map((row: any) => ({
    ...row,
    keywords: JSON.parse(row.keywords || '[]'),
  }));

  // Підрахунок загальної кількості
  let countQuery = `SELECT COUNT(*) as total FROM articles WHERE publish_date <= date('now')`;
  const countParams: string[] = [];
  if (category && category !== 'Всі') {
    countQuery += ` AND category = ?`;
    countParams.push(category);
  }
  if (search) {
    countQuery += ` AND (title LIKE ? OR meta_description LIKE ? OR keywords LIKE ?)`;
    const searchPattern = `%${search}%`;
    countParams.push(searchPattern, searchPattern, searchPattern);
  }
  const countResult = await db.prepare(countQuery).first(...countParams);

  return {
    articles,
    total: countResult?.total || 0,
    limit,
    offset,
  };
}

// GET /api/articles/upcoming — наступні статті
async function getUpcomingArticles(db: D1Database) {
  const result = await db.prepare(`
    SELECT id, slug, title, category, publish_date, publish_time
    FROM articles 
    WHERE publish_date > date('now')
    ORDER BY publish_date ASC, publish_time ASC
    LIMIT 10
  `).all();

  return {
    articles: result.results,
    count: result.results?.length || 0,
  };
}

// GET /api/articles/:slug — окрема стаття
async function getArticleBySlug(slug: string, db: D1Database) {
  const result = await db.prepare(`
    SELECT * FROM articles WHERE slug = ? AND publish_date <= date('now')
  `).first(slug);

  if (!result) {
    return null;
  }

  return {
    ...result,
    keywords: JSON.parse(result.keywords || '[]'),
  };
}

// Головний обробник
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Тільки GET
    if (request.method !== 'GET') {
      return errorResponse('Method not allowed', 405);
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Маршрутизація
      if (path === '/api/articles') {
        const data = await getPublishedArticles(url, env.DB);
        return new Response(JSON.stringify(data, null, 2), {
          headers: {
            ...corsHeaders,
            'Cache-Control': 'public, max-age=300', // 5 хв кеш
          },
        });
      }

      if (path === '/api/articles/upcoming') {
        const data = await getUpcomingArticles(env.DB);
        return new Response(JSON.stringify(data, null, 2), {
          headers: {
            ...corsHeaders,
            'Cache-Control': 'private, no-cache',
          },
        });
      }

      // /api/articles/:slug
      const slugMatch = path.match(/^\/api\/articles\/(.+)$/);
      if (slugMatch) {
        const slug = slugMatch[1];
        const article = await getArticleBySlug(slug, env.DB);
        if (!article) {
          return errorResponse('Article not found', 404);
        }
        return new Response(JSON.stringify(article, null, 2), {
          headers: {
            ...corsHeaders,
            'Cache-Control': 'public, max-age=600', // 10 хв кеш
          },
        });
      }

      // Головна сторінка API
      if (path === '/api' || path === '/api/') {
        return new Response(JSON.stringify({
          name: 'Blog API — Ксенія Бондаренко',
          version: '1.0',
          endpoints: {
            'GET /api/articles': 'Список опублікованих статей',
            'GET /api/articles?category=Гайди': 'Фільтр по категорії',
            'GET /api/articles?search=квартира': 'Пошук',
            'GET /api/articles/upcoming': 'Наступні статті',
            'GET /api/articles/:slug': 'Окрема стаття',
          },
        }, null, 2), {
          headers: corsHeaders,
        });
      }

      return errorResponse('Not found', 404);
    } catch (err: any) {
      console.error('Worker error:', err);
      return errorResponse(err.message || 'Internal server error', 500);
    }
  },

  // Cron Trigger — щоденна перевірка публікацій
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    console.log('Cron triggered at:', new Date().toISOString());

    // Перевіряємо чи є нові статті для публікації
    const result = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM articles 
      WHERE publish_date = date('now')
    `).first();

    const publishedToday = result?.count || 0;
    console.log(`Articles published today: ${publishedToday}`);

    // Тут можна додати логіку:
    // - Надіслати webhook для перезбірки сайту
    // - Оновити sitemap
    // - Надіслати сповіщення

    return new Response(JSON.stringify({
      status: 'ok',
      publishedToday,
      timestamp: new Date().toISOString(),
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

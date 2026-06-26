var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/index.ts
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json; charset=utf-8"
};
function handleOptions() {
  return new Response(null, {
    headers: {
      ...corsHeaders,
      "Access-Control-Max-Age": "86400"
    }
  });
}
__name(handleOptions, "handleOptions");
function errorResponse(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders
  });
}
__name(errorResponse, "errorResponse");
async function getPublishedArticles(url, db) {
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 100);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let query = `
    SELECT id, slug, title, meta_description, keywords, category, 
           read_time, publish_date, publish_time
    FROM articles 
    WHERE publish_date <= date('now')
  `;
  const params = [];
  if (category && category !== "\u0412\u0441\u0456") {
    query += ` AND category = ?`;
    params.push(category);
  }
  if (search) {
    query += ` AND (title LIKE ? OR meta_description LIKE ? OR keywords LIKE ?)`;
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }
  query += ` ORDER BY publish_date DESC, publish_time DESC`;
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit.toString(), offset.toString());
  const result = await db.prepare(query).all(...params);
  const articles = result.results.map((row) => ({
    ...row,
    keywords: JSON.parse(row.keywords || "[]")
  }));
  let countQuery = `SELECT COUNT(*) as total FROM articles WHERE publish_date <= date('now')`;
  const countParams = [];
  if (category && category !== "\u0412\u0441\u0456") {
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
    offset
  };
}
__name(getPublishedArticles, "getPublishedArticles");
async function getUpcomingArticles(db) {
  const result = await db.prepare(`
    SELECT id, slug, title, category, publish_date, publish_time
    FROM articles 
    WHERE publish_date > date('now')
    ORDER BY publish_date ASC, publish_time ASC
    LIMIT 10
  `).all();
  return {
    articles: result.results,
    count: result.results?.length || 0
  };
}
__name(getUpcomingArticles, "getUpcomingArticles");
async function getArticleBySlug(slug, db) {
  const result = await db.prepare(`
    SELECT * FROM articles WHERE slug = ? AND publish_date <= date('now')
  `).first(slug);
  if (!result) {
    return null;
  }
  return {
    ...result,
    keywords: JSON.parse(result.keywords || "[]")
  };
}
__name(getArticleBySlug, "getArticleBySlug");
var index_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return handleOptions();
    }
    if (request.method !== "GET") {
      return errorResponse("Method not allowed", 405);
    }
    const url = new URL(request.url);
    const path = url.pathname;
    try {
      if (path === "/api/articles") {
        const data = await getPublishedArticles(url, env.DB);
        return new Response(JSON.stringify(data, null, 2), {
          headers: {
            ...corsHeaders,
            "Cache-Control": "public, max-age=300"
            // 5 хв кеш
          }
        });
      }
      if (path === "/api/articles/upcoming") {
        const data = await getUpcomingArticles(env.DB);
        return new Response(JSON.stringify(data, null, 2), {
          headers: {
            ...corsHeaders,
            "Cache-Control": "private, no-cache"
          }
        });
      }
      const slugMatch = path.match(/^\/api\/articles\/(.+)$/);
      if (slugMatch) {
        const slug = slugMatch[1];
        const article = await getArticleBySlug(slug, env.DB);
        if (!article) {
          return errorResponse("Article not found", 404);
        }
        return new Response(JSON.stringify(article, null, 2), {
          headers: {
            ...corsHeaders,
            "Cache-Control": "public, max-age=600"
            // 10 хв кеш
          }
        });
      }
      if (path === "/api" || path === "/api/") {
        return new Response(JSON.stringify({
          name: "Blog API \u2014 \u041A\u0441\u0435\u043D\u0456\u044F \u0411\u043E\u043D\u0434\u0430\u0440\u0435\u043D\u043A\u043E",
          version: "1.0",
          endpoints: {
            "GET /api/articles": "\u0421\u043F\u0438\u0441\u043E\u043A \u043E\u043F\u0443\u0431\u043B\u0456\u043A\u043E\u0432\u0430\u043D\u0438\u0445 \u0441\u0442\u0430\u0442\u0435\u0439",
            "GET /api/articles?category=\u0413\u0430\u0439\u0434\u0438": "\u0424\u0456\u043B\u044C\u0442\u0440 \u043F\u043E \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457",
            "GET /api/articles?search=\u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0430": "\u041F\u043E\u0448\u0443\u043A",
            "GET /api/articles/upcoming": "\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0456 \u0441\u0442\u0430\u0442\u0442\u0456",
            "GET /api/articles/:slug": "\u041E\u043A\u0440\u0435\u043C\u0430 \u0441\u0442\u0430\u0442\u0442\u044F"
          }
        }, null, 2), {
          headers: corsHeaders
        });
      }
      return errorResponse("Not found", 404);
    } catch (err) {
      console.error("Worker error:", err);
      return errorResponse(err.message || "Internal server error", 500);
    }
  },
  // Cron Trigger — щоденна перевірка публікацій
  async scheduled(event, env, ctx) {
    console.log("Cron triggered at:", (/* @__PURE__ */ new Date()).toISOString());
    const result = await env.DB.prepare(`
      SELECT COUNT(*) as count FROM articles 
      WHERE publish_date = date('now')
    `).first();
    const publishedToday = result?.count || 0;
    console.log(`Articles published today: ${publishedToday}`);
    return new Response(JSON.stringify({
      status: "ok",
      publishedToday,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map

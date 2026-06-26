-- Cloudflare D1 Schema for Blog Articles
-- Таблиця статей з автоматичною публікацією за датою

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content TEXT,
  keywords TEXT, -- JSON array
  category TEXT NOT NULL,
  read_time TEXT,
  publish_date TEXT NOT NULL, -- YYYY-MM-DD
  publish_time TEXT DEFAULT '09:00',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Індекс для швидкого пошуку опублікованих статей
CREATE INDEX IF NOT EXISTS idx_articles_publish_date ON articles(publish_date);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Таблиця для логування публікацій (опціонально)
CREATE TABLE IF NOT EXISTS publish_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id TEXT NOT NULL,
  published_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);

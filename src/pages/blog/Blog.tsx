import { useState, useEffect } from "react";
import { Calendar, Clock, BookOpen, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

type Article = {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  keywords: string[];
  publish_date: string;
  publish_time: string;
  category: string;
  read_time: string;
};

type ApiResponse = {
  articles: Article[];
  total: number;
  limit: number;
  offset: number;
};

const API_BASE = "/api/articles";

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Всі");

  const categories = ["Всі", "Гайди", "Поради", "Аналітика", "Новини"];

  // Завантаження статей з API
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "Всі") {
          params.set("category", selectedCategory);
        }
        if (searchQuery) {
          params.set("search", searchQuery);
        }
        params.set("limit", "50");

        const response = await fetch(`${API_BASE}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setArticles(data.articles);
        setTotal(data.total);
      } catch (err: any) {
        console.error("Failed to fetch articles:", err);
        setError(err.message || "Не вдалося завантажити статті");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, searchQuery]);

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const articlesReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="blog" className="section-padding bg-secondary relative overflow-hidden">
      <AnimatedBackground variant="grid" />

      <div className="section-container relative z-10">
        <div
          ref={headerReveal.ref}
          className={`text-center mb-12 md:mb-16 reveal ${
            headerReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Блог
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Новини та статті</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Корисна інформація про ринок нерухомості Кропивницького, поради та аналітика
          </p>
          {!loading && !error && (
            <p className="text-primary text-sm font-medium mt-3">
              Опубліковано статей: {total}
            </p>
          )}
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Пошук статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="text-sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Завантаження статей...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-destructive mb-2">⚠️ {error}</p>
            <p className="text-muted-foreground text-sm">
              Спробуйте оновити сторінку або поверніться пізніше.
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div
            ref={articlesReveal.ref}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger ${
              articlesReveal.isVisible ? "is-visible" : ""
            }`}
          >
            {articles.map((article) => (
              <Card
                key={article.id}
                className={`group bg-card border-border overflow-hidden lift-on-hover reveal ${
                  articlesReveal.isVisible ? "is-visible" : ""
                }`}
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.publish_date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.read_time}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.meta_description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.keywords?.slice(0, 3).map((kw: string, i: number) => (
                      <span key={i} className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
                        #{kw.split(" ").slice(0, 2).join("")}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                  >
                    Читати далі →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Статей не знайдено. Спробуйте змінити фільтри.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;

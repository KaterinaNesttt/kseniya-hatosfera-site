import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import { blogArticles } from "@/data/articles";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="section-padding bg-secondary relative overflow-hidden min-h-screen">
        <AnimatedBackground variant="grid" />
        <div className="section-container relative z-10 text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Статтю не знайдено
          </h1>
          <Button asChild>
            <Link to="/blog">Повернутися до блогу</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <article className="section-padding bg-secondary relative overflow-hidden min-h-screen">
      <AnimatedBackground variant="grid" />

      <div className="section-container relative z-10 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            До блогу
          </Link>
        </Button>

        <header className="mb-10">
          <span className="inline-flex px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-5">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
            {article.title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
            {article.metaDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.publishDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </header>

        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 md:p-10">
          <div className="space-y-5 text-foreground text-base md:text-lg leading-relaxed">
            {article.content.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
            {article.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;

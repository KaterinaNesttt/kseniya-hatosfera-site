import { useState } from "react";
import { Calendar, Clock, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

const News = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const news = [
    {
      id: 1,
      title:
        "Мінус 291 мільйон: у Кропивницькому переглянули трирічну програму капбудівництва",
      excerpt:
        "Депутати скоротили бюджет програми капітального будівництва на 2025–2027 роки майже на 300 млн грн.",
      fullText: `Під час сесії 5 лютого 2026 року кропивницькі депутати внесли зміни до програми капітального будівництва, реконструкції та капітального ремонту на 2025–2027 роки. Загальний обсяг фінансування зменшено з 989,7 млн до 698,4 млн грн. Основне скорочення припало на 2027 рік (з 327,8 млн до 72 млн грн).  
      Гроші планують спрямувати на:  
      • будівництво житла для переселенців  
      • стоматологічну поліклініку  
      • капітальні ремонти шкіл та гімназій  
      • термомодернізацію навчальних закладів (51,7 млн грн у 2026 році)  
      • дорогу на вул. Дона Амінадо (20 млн грн у 2026 році)`,
      date: "5 лютого 2026",
      readTime: "5 хв",
      category: "Новини",
    },
    {
      id: 2,
      title:
        "Нове будівництво і реконструкція: яке житло може з’явитися у Кропивницькому з 2026 року",
      excerpt:
        "Планується зведення двох багатоповерхівок та реконструкція гуртожитку під житло для ВПО.",
      fullText: `До портфеля публічних інвестицій громади включено 42 проєкти, серед яких:  
      1. Будівництво соціального житла для ВПО та малозабезпечених — 50 млн грн (2026–2028)  
      2. Багатоповерхівка на вул. Державності, 102-й мікрорайон — 159,8 млн грн (2021–2028)  
      3. Реконструкція гуртожитку на вул. Металургів, 15 (с-ще Нове) — 167,4 млн грн (2022–2028)  
      Джерела фінансування: місцевий бюджет, державна субвенція, гранти.`,
      date: "14 листопада 2025",
      readTime: "6 хв",
      category: "Новини",
    },
    {
      id: 3,
      title:
        '"Ближче до нижчих цін, але не найнижчі": як за рік змінився ринок нерухомості у Кропивницькому',
      excerpt:
        "Ціни на вторинному ринку зросли на 12–26 %, попит на оренду перевищує пропозицію.",
      fullText: `За 2025 рік:  
      • однокімнатні квартири +15 % (≈ $30 тис.)  
      • двокімнатні +12 %  
      • трикімнатні +26 %  
      На первинному ринку ціни дещо знизились через запуск нових ЖК.  
      Оренда: 1-кімнатні — 5–17 тис. грн/міс, 2-кімнатні — 7,5–25 тис. грн.  
      Попит на оренду значно перевищує пропозицію, особливо на квартири з центральним опаленням та в будинках 70–90-х рр.`,
      date: "26 грудня 2025",
      readTime: "7 хв",
      category: "Аналітика",
    },
  ];

  const tips = [
    {
      title: "Підготовка документів",
      description: "Перелік необхідних документів для швидкого оформлення угоди",
    },
    {
      title: "Перевірка продавця",
      description: "Як убезпечити себе від шахрайства при купівлі нерухомості",
    },
    {
      title: "Огляд квартири",
      description: "На що звертати увагу при огляді потенційного житла",
    },
  ];

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const articlesReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const sidebarReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="news"
      className="section-padding bg-secondary relative overflow-hidden"
    >
      {/* Анімований фон секції — рухома сітка для інформаційного блоку */}
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
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Новини та матеріали</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Корисна інформація про ринок нерухомості Кропивницького, поради та
            актуальні новини
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div
            ref={articlesReveal.ref}
            className={`lg:col-span-2 space-y-6 stagger ${
              articlesReveal.isVisible ? "is-visible" : ""
            }`}
          >
            {news.map((article) => (
              <Card
                key={article.id}
                className={`group bg-card border-border overflow-hidden lift-on-hover reveal ${
                  articlesReveal.isVisible ? "is-visible" : ""
                }`}
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground mb-3 transition-colors duration-300 group-hover:text-primary leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div
                    className={`grid transition-all duration-700 ease-out ${
                      expanded[article.id]
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line pt-2 border-t border-border/60">
                        {article.fullText}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto py-2 group/btn"
                    onClick={() => toggleExpand(article.id)}
                    aria-expanded={!!expanded[article.id]}
                  >
                    <span className="font-medium">
                      {expanded[article.id] ? "Згорнути" : "Читати далі"}
                    </span>
                    <span className="inline-flex items-center ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                      {expanded[article.id] ? (
                        <ChevronUp className="w-4 h-4 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      )}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div
            ref={sidebarReveal.ref}
            className={`reveal-right ${
              sidebarReveal.isVisible ? "is-visible" : ""
            }`}
          >
            <div className="bg-gradient-to-br from-primary to-steel-dark rounded-2xl p-6 md:p-8 text-primary-foreground sticky top-24 shadow-xl relative overflow-hidden">
              {/* Декоративний елемент */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-foreground/15 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl">
                    Корисні матеріали
                  </h3>
                </div>

                <div className="space-y-5">
                  {tips.map((tip, index) => (
                    <div
                      key={index}
                      className="pb-5 border-b border-primary-foreground/15 last:border-0 last:pb-0 group/tip cursor-default"
                    >
                      <h4 className="font-semibold mb-2 flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all duration-300 group-hover/tip:bg-primary-foreground group-hover/tip:text-primary group-hover/tip:scale-110">
                          {index + 1}
                        </span>
                        <span className="transition-transform duration-300 group-hover/tip:translate-x-0.5">
                          {tip.title}
                        </span>
                      </h4>
                      <p className="text-primary-foreground/80 text-sm pl-9">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>

                <a
                  href="/buyer-guide.pdf"
                  download="Гід_покупця_нерухомості_Кропивницький.pdf"
                  className="block w-full mt-8"
                >
                  <Button className="w-full bg-primary-foreground text-primary hover:bg-white font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    Завантажити гід покупця
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Плавний перехід до Contact (background — білий) */}
      <div
        className="section-fade-bottom"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.5) 60%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
};

export default News;

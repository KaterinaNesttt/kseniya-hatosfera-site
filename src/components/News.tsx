import { useState } from "react";
import { Calendar, ArrowRight, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const News = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const news = [
    {
      id: 1,
      title: "Мінус 291 мільйон: у Кропивницькому переглянули трирічну програму капбудівництва",
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

  return (
    <section id="news" className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Блог
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            Новини та матеріали
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Корисна інформація про ринок нерухомості Кропивницького, поради та актуальні новини
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {news.map((article) => (
              <Card
                key={article.id}
                className="bg-card border-border overflow-hidden card-hover"
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expanded[article.id] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                      {article.fullText}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10 p-0 group"
                    onClick={() => toggleExpand(article.id)}
                  >
                    {expanded[article.id] ? "Згорнути" : "Читати далі"}
                    <span className="inline-flex items-center ml-2 transition-transform duration-300">
                      {expanded[article.id] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}

           
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground sticky top-24">
              <h3 className="font-serif text-2xl mb-6">Корисні матеріали</h3>

              <div className="space-y-6">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-primary-foreground/20 last:border-0 last:pb-0"
                  >
                    <h4 className="font-semibold mb-2 flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      {tip.title}
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
                <Button className="w-full bg-primary-foreground text-primary hover:bg-white/90 font-medium shadow-md">
                  Завантажити гід покупця
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
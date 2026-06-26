import { CheckCircle, Home, Building, Key, FileText, Scale, MapPin, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

const services = [
  {
    icon: Home,
    title: "Купівля житла",
    description: "Повний супровід при купівлі квартири, будинку чи земельної ділянки. Від пошуку варіантів до оформлення документів.",
    features: ["Підбір об'єктів за вашими критеріями", "Перевірка документів та юридична чистота", "Проведення переговорів з продавцем", "Супровід у нотаріальній конторі"],
  },
  {
    icon: Building,
    title: "Продаж нерухомості",
    description: "Професійна допомога у продажу вашої нерухомості за максимально вигідною ціною у короткі терміни.",
    features: ["Оцінка ринкової вартості", "Фотозйомка", "Розміщення на всіх платформах", "Проведення показів"],
  },
  {
    icon: Key,
    title: "Оренда житла",
    description: "Підберу для вас квартиру чи будинок для оренди з перевіреним орендодавцем та вигідними умовами.",
    features: ["Велика база перевірених об'єктів", "Перевірка орендодавця", "Допомога у укладенні договору", "Захист ваших інтересів"],
  },
  {
    icon: FileText,
    title: "Юридичний супровід",
    description: "Повний юридичний супровід угоди з нерухомістю. Перевірка документів, підготовка договорів, реєстрація.",
    features: ["Перевірка правовстановлюючих документів", "Аналіз ризиків угоди", "Підготовка договору купівлі-продажу", "Супровід у Реєстраційній службі"],
  },
  {
    icon: Scale,
    title: "Оцінка нерухомості",
    description: "Безкоштовна попередня оцінка вашої нерухомості для визначення справедливої ринкової ціни.",
    features: ["Аналіз аналогічних об'єктів", "Оцінка стану та інфраструктури", "Рекомендації щодо ціноутворення", "Прогноз змін вартості"],
  },
  {
    icon: MapPin,
    title: "Підбір земельних ділянок",
    description: "Допомога у підборі земельної ділянки під будівництво, сільськогосподарське використання чи інвестиції.",
    features: ["Перевірка кадастрових даних", "Аналіз цільового призначення", "Оцінка інфраструктури", "Перевірка обтяжень"],
  },  
];

const Services = () => {
  const headerReveal = useScrollReveal<HTMLDivElement>();
  const servicesReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="services" className="section-padding bg-secondary relative overflow-hidden">
      <AnimatedBackground variant="aurora" />

      <div className="section-container relative z-10">
        <div
          ref={headerReveal.ref}
          className={`text-center mb-12 md:mb-16 reveal ${
            headerReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Послуги
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Мої послуги</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Повний спектр послуг у сфері нерухомості у Кропивницькому. Індивідуальний підхід до кожного клієнта.
          </p>
        </div>

        <div
          ref={servicesReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger ${
            servicesReveal.isVisible ? "is-visible" : ""
          }`}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal ${
                servicesReveal.isVisible ? "is-visible" : ""
              }`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                <service.icon className="w-7 h-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-steel-dark px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <a href="/#contact">Безкоштовна консультація</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;

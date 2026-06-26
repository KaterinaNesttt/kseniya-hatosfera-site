import { Award, Shield, Heart, GraduationCap, Briefcase, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ownerImage from "@/assets/owner.webp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

const AboutPage = () => {
  const stats = [
    { value: "6+", label: "Років досвіду" },
    { value: "500+", label: "Успішних угод" },
    { value: "100%", label: "Задоволених клієнтів" },
  ];

  const features = [
    {
      icon: Award,
      title: "Професіоналізм",
      description: "6+ років успішної роботи на ринку нерухомості Кропивницького. Глибоке знання місцевого ринку та його особливостей.",
    },
    {
      icon: Shield,
      title: "Надійність",
      description: "Повний юридичний супровід кожної угоди. Перевірка документів, захист від шахрайства, безпечне проведення розрахунків.",
    },
    {
      icon: Heart,
      title: "Індивідуальний підхід",
      description: "Враховую всі побажання та потреби клієнтів. Кожна угода унікальна — і я знаходжу найкраще рішення для кожного.",
    },
    {
      icon: GraduationCap,
      title: "Постійне навчання",
      description: "Регулярно вдосконалюю свої знання, відвідую професійні семінари та слідкую за змінами в законодавстві.",
    },
    {
      icon: Briefcase,
      title: "Широкий спектр послуг",
      description: "Від купівлі-продажу до оренди, оцінки та іпотечного консультування — повний комплекс послуг в одних руках.",
    },
  ];

  const achievements = [
    "Понад 500 успішних угод з нерухомістю",
    "Власна база перевірених об'єктів",
    "Ліцензований ріелтор з офіційною акредитацією",
    "Безкоштовна оцінка нерухомості для клієнтів",
    "Гарантія юридичної чистоти кожної угоди",
    "Супровід від першої консультації до отримання ключів",
  ];

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const imageReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const contentReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const featuresReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const achievementsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="section-padding bg-secondary relative overflow-hidden">
      <AnimatedBackground variant="aurora" />

      <div className="section-container relative z-10">
        <div
          ref={headerReveal.ref}
          className={`text-center mb-12 md:mb-16 reveal ${
            headerReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Про мене
          </span>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Ксенія Бондаренко</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Професійний агент з нерухомості у Кропивницькому. Допомагаю знаходити ідеальні рішення для вашого комфорту.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-4 bg-card rounded-xl shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          {/* Owner Card */}
          <div
            ref={imageReveal.ref}
            className={`relative reveal-left ${
              imageReveal.isVisible ? "is-visible" : ""
            }`}
          >
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl group">
              <img
                src={ownerImage}
                alt="Ксенія Бондаренко - агент з нерухомості у Кропивницькому"
                width="1024"
                height="1024"
                loading="lazy"
                className="w-full h-[380px] sm:h-[450px] md:h-[500px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-transparent p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-primary-foreground mb-1">
                  Ксенія Бондаренко
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  Агент з нерухомості у Кропивницькому
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentReveal.ref}
            className={`reveal-right ${
              contentReveal.isVisible ? "is-visible" : ""
            }`}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              Ваш надійний партнер у світі нерухомості
            </h3>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              Мене звати Ксенія Бондаренко, і я працюю на ринку нерухомості Кропивницького з 2019 року. 
              Моя місія — зробити процес купівлі, продажу та оренди нерухомості максимально простим, 
              прозорим та комфортним для кожного клієнта.
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              За роки роботи я допомогла понад 500 клієнтам знайти ідеальне житло, вигідно продати 
              нерухомість або оформити оренду. Кожна угода для мене — це не просто робота, а можливість 
              допомогти людям покращити якість свого життя.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-steel-dark px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <a href="/#contact" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Зв'язатися зі мною
              </a>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div
          ref={featuresReveal.ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 stagger ${
            featuresReveal.isVisible ? "is-visible" : ""
          }`}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex gap-4 p-5 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 reveal ${
                featuresReveal.isVisible ? "is-visible" : ""
              }`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div
          ref={achievementsReveal.ref}
          className={`bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border reveal ${
            achievementsReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-6 text-center">
            Мої досягнення
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-foreground p-2">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;

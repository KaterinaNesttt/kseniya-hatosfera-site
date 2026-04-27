import { CheckCircle, Award, Shield, Heart } from "lucide-react";
import ownerImage from "@/assets/owner.jpg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Професіоналізм",
      description: "6+ років успішної роботи на ринку нерухомості",
    },
    {
      icon: Shield,
      title: "Надійність",
      description: "Повний юридичний супровід кожної угоди",
    },
    {
      icon: Heart,
      title: "Індивідуальний підхід",
      description: "Враховую всі побажання та потреби клієнтів",
    },
  ];

  const achievements = [
    "Понад 500 успішних угод",
    "Власна база перевірених об'єктів",
    "Ліцензований ріелтор",
    "Безкоштовна оцінка нерухомості",
  ];

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const imageReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const contentReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const featuresReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const achievementsReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="about"
      className="section-padding bg-secondary relative overflow-hidden"
    >
      {/* Анімований фон секції */}
      <AnimatedBackground variant="aurora" />

      {/* Плавний перехід зверху (від Hero — відео/темне) */}
      <div
        className="section-fade-top"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.5) 50%, transparent 100%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-12 md:mb-16 reveal ${
            headerReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Про мене
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Агент, якому довіряють</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Ксенія Бондаренко — професіонал, який допомагає знаходити ідеальні
            рішення для вашого комфорту
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                alt="Ксенія Бондаренко - агент з нерухомості"
                loading="lazy"
                className="w-full h-[380px] sm:h-[450px] md:h-[500px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Тонкий blur-overlay при hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-transparent p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-primary-foreground mb-1 transition-transform duration-300 group-hover:translate-x-1">
                  Ксенія Бондаренко
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  Агент з нерухомості
                </p>
              </div>
            </div>

            {/* Декоративний елемент — обмежено в межах батька, щоб не виходив за viewport */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 border-2 border-primary/20 rounded-2xl -z-10" />
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

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Я працюю на ринку нерухомості з 2019 року і моя місія — зробити
              процес купівлі, продажу та оренди нерухомості максимально простим,
              прозорим та комфортним для кожного клієнта.
            </p>

            {/* Features */}
            <div
              ref={featuresReveal.ref}
              className={`space-y-5 mb-8 stagger ${
                featuresReveal.isVisible ? "is-visible" : ""
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex gap-4 group cursor-default reveal ${
                    featuresReveal.isVisible ? "is-visible" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-6">
                    <feature.icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-semibold text-foreground mb-1 transition-colors duration-200 group-hover:text-primary">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div
              ref={achievementsReveal.ref}
              className={`grid sm:grid-cols-2 gap-3 stagger ${
                achievementsReveal.isVisible ? "is-visible" : ""
              }`}
            >
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-foreground p-2 rounded-lg transition-all duration-300 hover:bg-primary/5 hover:translate-x-1 reveal ${
                    achievementsReveal.isVisible ? "is-visible" : ""
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

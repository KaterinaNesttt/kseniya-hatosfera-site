import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+380 50 215 5397",
      link: "tel:+380502155397",
    },
    {
      icon: Mail,
      title: "Email",
      content: "ksenia.bondarenko@gmail.ua",
      link: "mailto:ksenia.bondarenko@gmail.ua",
    },
    {
      icon: MapPin,
      title: "Адреса",
      content: "м. Кропивницький, вул. Островського 15",
      link: "#",
    },
    {
      icon: Clock,
      title: "Графік роботи",
      content: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
      link: null,
    },
  ];

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const infoReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const formReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Анімований фон секції — градієнтний mesh з мерехтливими точками */}
      <AnimatedBackground variant="mesh" />

      {/* Плавний перехід зверху (від News — secondary) */}
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
            Контакти
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Зв'яжіться зі мною</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Готова відповісти на ваші запитання та допомогти знайти ідеальний
            варіант
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div
            ref={infoReveal.ref}
            className={`reveal-left ${infoReveal.isVisible ? "is-visible" : ""}`}
          >
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Мої контакти
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 stagger is-visible">
              {contactInfo.map((item, index) => {
                const ContentEl = (
                  <>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-6">
                      <item.icon className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <span className="text-xs sm:text-sm text-muted-foreground block">
                        {item.title}
                      </span>
                      <span className="block font-medium text-foreground text-sm sm:text-base break-words transition-colors duration-200 group-hover:text-primary">
                        {item.content}
                      </span>
                    </div>
                  </>
                );

                if (item.link && item.link !== "#") {
                  return (
                    <a
                      key={index}
                      href={item.link}
                      className="group flex gap-3 sm:gap-4 p-3 -m-3 rounded-xl transition-colors duration-300 hover:bg-secondary/60"
                    >
                      {ContentEl}
                    </a>
                  );
                }
                return (
                  <div
                    key={index}
                    className="group flex gap-3 sm:gap-4 p-3 -m-3 rounded-xl transition-colors duration-300 hover:bg-secondary/60"
                  >
                    {ContentEl}
                  </div>
                );
              })}
            </div>

            {/* Google Map */}
            <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg group">
              <iframe
                src="https://www.google.com/maps?q=Кропивницький&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full transition-all duration-500 group-hover:scale-[1.02]"
                title="Карта розташування"
              />
              {/* Тонка рамка-акцент */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl" />
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formReveal.ref}
            className={`bg-gradient-to-br from-secondary to-secondary/60 rounded-2xl p-6 sm:p-8 shadow-lg reveal-right ${
              formReveal.isVisible ? "is-visible" : ""
            }`}
          >
            <h3 className="font-serif text-2xl text-foreground mb-6">
              Надіслати запит
            </h3>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ім'я *
                  </label>
                  <Input
                    placeholder="Ваше ім'я"
                    className="bg-background border-border focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Телефон *
                  </label>
                  <Input
                    placeholder="+380..."
                    className="bg-background border-border focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background border-border focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Тип запиту
                </label>
                <select className="w-full h-10 px-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                  <option value="">Оберіть тип запиту</option>
                  <option value="buy">Хочу купити</option>
                  <option value="sell">Хочу продати</option>
                  <option value="rent">Хочу орендувати</option>
                  <option value="consult">Консультація</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Повідомлення
                </label>
                <Textarea
                  placeholder="Опишіть ваш запит..."
                  rows={4}
                  className="bg-background border-border focus:border-primary resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button
                type="submit"
                className="group w-full btn-primary py-6 text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                Надіслати запит
              </Button>

              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                Надсилаючи форму, ви погоджуєтесь з політикою конфіденційності
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Плавний перехід до Footer (foreground — темний) */}
      <div
        className="section-fade-bottom"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--foreground) / 0.5) 60%, hsl(var(--foreground) / 0.85) 100%)",
        }}
      />
    </section>
  );
};

export default Contact;

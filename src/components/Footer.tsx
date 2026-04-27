import { Phone, Mail, MapPin, Facebook, Instagram, Send } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";

const Footer = () => {
  const links = {
    services: [
      { label: "Продаж нерухомості", href: "#" },
      { label: "Оренда житла", href: "#" },
      { label: "Оцінка нерухомості", href: "#" },
      { label: "Юридичний супровід", href: "#" },
    ],
    company: [
      { label: "Про агенцію", href: "#about" },
      { label: "Новини", href: "#news" },
      { label: "Контакти", href: "#contact" },
    ],
  };

  const reveal = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Декоративний градієнт зверху */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent z-10" />

      {/* Анімований фон футера — крапкова сітка на темному фоні */}
      <AnimatedBackground variant="dots" tone="dark" intensity={1} />

      <div
        ref={reveal.ref}
        className={`section-container py-12 md:py-16 relative z-10 reveal ${
          reveal.isVisible ? "is-visible" : ""
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-3 mb-6 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-primary-foreground font-serif text-xl font-bold">
                  ХСФ
                </span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold block">
                  Ксенія Бондаренко
                </span>
                <span className="text-xs text-primary-foreground/60 tracking-widest uppercase">
                  Агент з нерухомості
                </span>
              </div>
            </a>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Професійний агент з нерухомості з багаторічним досвідом.
              Допомагаю знаходити ідеальне житло для кожного клієнта.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Send, label: "Telegram", href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">
              Послуги
            </h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-all duration-200 inline-block hover:translate-x-1 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">
              Компанія
            </h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-all duration-200 inline-block hover:translate-x-1 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-4 md:mb-6">
              Контакти
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+380502155397"
                  className="group flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                >
                  <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <Phone className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                  </span>
                  <span className="text-sm md:text-base">+380 50 215 5397</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ksenia.bondarenko@gmail.ua"
                  className="group flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                >
                  <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <Mail className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
                  </span>
                  <span className="text-sm md:text-base break-all">
                    ksenia.bondarenko@gmail.ua
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/70">
                  <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm md:text-base">
                    м. Кропивницький, вул. Островського 15
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="section-container py-5 md:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-primary-foreground/50 text-xs sm:text-sm text-center sm:text-left">
            © 2026 Ксенія Бондаренко. Всі права захищені.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <a
              href="#"
              className="text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-200"
            >
              Політика конфіденційності
            </a>
            <a
              href="#"
              className="text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-200"
            >
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

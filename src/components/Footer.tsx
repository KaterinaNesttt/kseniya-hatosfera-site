import { Phone, Mail, MapPin, Facebook, Instagram, Send } from "lucide-react";

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
      { label: "Наші об'єкти", href: "#properties" },
      { label: "Новини", href: "#news" },
      { label: "Контакти", href: "#contact" },
    ],
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">ХСФ</span>
              </div>
              <div>
                <span className="font-serif text-xl font-semibold block">Ксенія Бондаренко</span>
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
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Послуги</h4>
            <ul className="space-y-3">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Компанія</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Контакти</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+380123456789" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+380 50 215 5397</span>
                </a>
              </li>
              <li>
              <a href="mailto:ksenia.bondarenko@email.ua" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>ksenia.bondarenko@gmail.ua</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/70">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>м. Кропивницький, вул. Островського 15</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 Ксенія Бондаренко. Всі права захищені.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Політика конфіденційності
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

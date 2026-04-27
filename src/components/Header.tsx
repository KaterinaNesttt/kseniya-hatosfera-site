import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-scroll-reveal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокуємо скрол body при відкритому мобільному меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#about", id: "about", label: "Про мене" },
    { href: "#news", id: "news", label: "Новини" },
    { href: "#contact", id: "contact", label: "Контакти" },
  ];

  // Активна секція для підсвічування навігації
  const activeSection = useActiveSection(navLinks.map((l) => l.id));

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: "smooth",
      });
    }
  };

  // Класи, що змінюються залежно від стану scrolled
  const headerBg = scrolled
    ? "bg-primary/80 backdrop-blur-xl shadow-lg"
    : "bg-transparent backdrop-blur-sm";

  const textColor = scrolled ? "text-primary-foreground" : "text-primary-foreground";

  const mutedTextColor = scrolled
    ? "text-primary-foreground/80"
    : "text-primary-foreground/70";

  const hoverColor = scrolled ? "hover:text-white" : "hover:text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-foreground rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-primary font-serif text-lg md:text-xl font-bold">
                КБ
              </span>
            </div>
            <div className="hidden sm:block">
              <span
                className={`font-serif text-xl md:text-2xl font-semibold ${textColor} tracking-tight`}
              >
                Ксенія Бондаренко
              </span>
              <span
                className={`block text-xs ${mutedTextColor} tracking-widest uppercase`}
              >
                Агент з нерухомості
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-medium transition-colors duration-200 py-1 ${textColor} ${hoverColor}`}
                >
                  {link.label}
                  {/* Анімований індикатор активної секції */}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary-foreground rounded-full origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA Button + Phone */}
          <div className="hidden md:flex items-center gap-5">
            <Button
              asChild
              className={`
                transition-all duration-300 hover:scale-105
                ${
                  scrolled
                    ? "bg-primary-foreground text-primary hover:bg-white"
                    : "bg-primary-foreground/95 text-primary hover:bg-primary-foreground shadow-lg hover:shadow-xl"
                }
              `}
            >
              <a
                href="tel:+380502155397"
                className="flex items-center gap-2 font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>+380 50 215 5397</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden relative p-2 ${textColor} hover:opacity-80 transition-opacity z-50`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="relative block w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Menu — анімоване випадне меню */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen
              ? "max-h-[80vh] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="py-6 border-t border-primary-foreground/20">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium py-3 px-2 rounded-lg transition-all duration-200 ${textColor} hover:bg-primary-foreground/10 hover:translate-x-1 ${
                    isMenuOpen ? "animate-fade-in-left" : ""
                  }`}
                  style={{
                    animationDelay: isMenuOpen ? `${index * 60}ms` : "0ms",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+380502155397"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 py-3 px-2 mt-2 rounded-lg ${mutedTextColor} hover:bg-primary-foreground/10 transition-all duration-200`}
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">+380 50 215 5397</span>
              </a>
              <Button
                asChild
                className="w-full mt-3 bg-primary-foreground text-primary hover:bg-white font-medium shadow-md"
              >
                <a
                  href="tel:+380502155397"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Безкоштовна консультація
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

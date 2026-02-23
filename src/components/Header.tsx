import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Про мене" },
    { href: "#news", label: "Новини" },
    { href: "#contact", label: "Контакти" },
    {/* href: "#properties", label: "Об'єкти" */},
  ];

  // Класи, що змінюються залежно від стану scrolled
  const headerBg = scrolled
    ? "bg-primary/70 backdrop-blur-lg shadow-md"
    : "bg-primary-foreground/60 backdrop-blur-sm";

  const textColor = scrolled
    ? "text-primary-foreground"
    : "text-foreground";

  const mutedTextColor = scrolled
    ? "text-primary-foreground/80"
    : "text-muted-foreground";

  const hoverColor = scrolled
    ? "hover:text-white"
    : "hover:text-primary";

  const phoneHover = scrolled
    ? "hover:text-white"
    : "hover:text-primary";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-foreground rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary font-serif text-lg md:text-xl font-bold">КБ</span>
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-200 ${textColor} ${hoverColor}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button + Phone */}
          <div className="hidden md:flex items-center gap-5">
           
            <Button
              className={`
                transition-all duration-200
                ${scrolled
                  ? "bg-primary-foreground text-primary hover:bg-white/90"
                  : "btn-primary"}
              `}
            >
               <a
              href="tel:+380502155397"
              className={`flex items-center gap-2 font-medium `}
            >
             <Phone className="w-4 h-4" />
              <span>+380 50 215 5397</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${textColor} hover:opacity-80 transition-opacity`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/30 animate-fade-in bg-inherit">
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium py-1 transition-colors ${textColor} ${hoverColor}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+380502155397"
                className={`flex items-center gap-2 py-1 ${mutedTextColor}`}
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">+380 50 215 5397</span>
              </a>
              <Button
                className={`
                  w-full mt-3
                  ${scrolled
                    ? "bg-primary-foreground text-primary hover:bg-white/90"
                    : "btn-primary"}
                `}
              >
                Консультація
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
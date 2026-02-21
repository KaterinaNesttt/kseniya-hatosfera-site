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
    { href: "#about", label: "Про нас" },
    { href: "#properties", label: "Об'єкти" },
    { href: "#news", label: "Новини" },
    { href: "#contact", label: "Контакти" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50  backdrop-blur-md  duration-500 ${
      scrolled ?
      "bg-primary/40 shadow-sm opacity-95 py-3" :
      "bg-primary-foreground/85 opacity-80 py-5"}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" onClick={(e) => {e.preventDefault();window.scrollTo({ top: 0, behavior: "smooth" });}}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif text-lg md:text-xl font-bold">КБ</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Ксенія Бондаренко
              </span>
              <span className="block text-xs text-muted-foreground tracking-widest uppercase">
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
                className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+380502155397" className="flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors ">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+380 50 215 5397</span>
            </a>
            <Button className="btn-primary">
              Консультація
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <a href="tel:+380502155397" className="flex items-center gap-2 text-muted-foreground py-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+380 50 215 5397</span>
              </a>
              <Button className="btn-primary w-full mt-2">
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

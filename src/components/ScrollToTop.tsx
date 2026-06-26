import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      variant="default"
      size="icon"
      className={`fixed bottom-6 right-6 z-40 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Прокрутити догори"
    >
      <ChevronUp className="w-5 h-5" />
    </Button>
  );
};

export default ScrollToTop;

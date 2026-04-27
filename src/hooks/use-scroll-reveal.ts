import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  /** Поріг видимості (0-1) */
  threshold?: number;
  /** Відступ навколо елемента (CSS rootMargin) */
  rootMargin?: string;
  /** Чи спрацьовувати лише один раз */
  once?: boolean;
  /** Затримка перед застосуванням стану is-visible (мс) */
  delay?: number;
}

/**
 * Хук для виявлення появи елемента у viewport.
 * Повертає ref та булевий стан isVisible.
 *
 * Використання:
 * const { ref, isVisible } = useScrollReveal();
 * <div ref={ref} className={isVisible ? "is-visible" : ""}>...</div>
 *
 * Або через клас reveal:
 * <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`}>...</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.12,
    rootMargin = "-60px 0px -60px 0px",
    once = false,
    delay = 0,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Респектуємо налаштування користувача (prefers-reduced-motion)
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mql.matches) {
        setIsVisible(true);
        return;
      }
    }

    // Якщо IntersectionObserver не підтримується — показуємо одразу
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timeoutId = setTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, delay]);

  return { ref, isVisible };
}

/**
 * Спостерігає за активною секцією (для підсвічування навігації).
 * Повертає id поточної видимої секції.
 */
export function useActiveSection(sectionIds: string[], offset = 120) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY + offset;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          current = id;
          break;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return active;
}

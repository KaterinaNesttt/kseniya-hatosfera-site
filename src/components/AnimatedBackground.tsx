import { memo } from "react";

type Variant = "aurora" | "grid" | "mesh" | "dots" | "waves";

interface AnimatedBackgroundProps {
  variant: Variant;
  /** Базовий тон фону: світлий (для bg-secondary) чи темний (для footer) */
  tone?: "light" | "dark";
  /** Інтенсивність ефекту (0..1.5), за замовчанням 1 */
  intensity?: number;
  className?: string;
}

/**
 * Анімований фон секції. Рендериться як абсолютний шар поверх базового кольору.
 * Батьківський елемент має бути `relative` та `overflow-hidden`.
 */
export const AnimatedBackground = memo(function AnimatedBackground({
  variant,
  tone = "light",
  intensity = 1,
  className = "",
}: AnimatedBackgroundProps) {
  const k = Math.max(0.4, Math.min(1.5, intensity));

  if (variant === "aurora") {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {/* Велика яскрава пляма зверху-зліва */}
        <div
          className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, hsl(var(--steel) / 0.75), transparent 65%)",
            opacity: 1 * k,
            animationDuration: "12s",
          }}
        />
        {/* Велика пляма знизу-справа */}
        <div
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, hsl(var(--steel-light) / 0.85), transparent 65%)",
            opacity: 1 * k,
            animationDuration: "14s",
            animationDelay: "-5s",
          }}
        />
        {/* Дрібніша центральна — швидша */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full blur-3xl animate-drift"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-dark) / 0.35), transparent 60%)",
            opacity: 0.9 * k,
            animationDuration: "10s",
          }}
        />
        {/* Додаткова рухома пляма для динаміки */}
        <div
          className="absolute top-1/4 right-1/4 w-[380px] h-[380px] rounded-full blur-3xl animate-drift-slow"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-light) / 0.6), transparent 65%)",
            opacity: 0.8 * k,
            animationDelay: "-3s",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[340px] h-[340px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel) / 0.55), transparent 60%)",
            opacity: 0.8 * k,
            animationDuration: "13s",
            animationDelay: "-8s",
          }}
        />
      </div>
    );
  }

  if (variant === "grid") {
    const gridColor =
      tone === "dark"
        ? "hsl(0 0% 100% / 0.18)"
        : "hsl(var(--steel) / 0.25)";
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {/* Рухома сітка — без різкої маски, видно по всій ширині */}
        <div
          className="absolute inset-0 animate-grid-shift"
          style={{
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
            opacity: 1 * k,
            maskImage:
              "radial-gradient(ellipse at center, black 55%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 55%, transparent 95%)",
          }}
        />
        {/* Великі рухомі плями — тепер яскравіші */}
        <div
          className="absolute top-1/4 -right-32 w-[520px] h-[520px] rounded-full blur-3xl animate-drift"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel) / 0.7), transparent 65%)",
            opacity: 1 * k,
          }}
        />
        <div
          className="absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full blur-3xl animate-drift-slow"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-light) / 0.75), transparent 60%)",
            opacity: 1 * k,
            animationDelay: "-4s",
          }}
        />
        {/* Додаткова пляма по центру */}
        <div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-dark) / 0.5), transparent 60%)",
            opacity: 0.85 * k,
            animationDuration: "13s",
          }}
        />
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {/* 4 великих градієнтних шари, що дрейфують */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[750px] h-[750px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel) / 0.7), transparent 60%)",
            opacity: 1 * k,
            animationDuration: "13s",
          }}
        />
        <div
          className="absolute top-0 -right-1/4 w-[680px] h-[680px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-light) / 0.85), transparent 60%)",
            opacity: 1 * k,
            animationDuration: "16s",
            animationDelay: "-6s",
          }}
        />
        <div
          className="absolute -bottom-1/4 left-1/3 w-[620px] h-[620px] rounded-full blur-3xl animate-aurora"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-dark) / 0.6), transparent 60%)",
            opacity: 1 * k,
            animationDuration: "18s",
            animationDelay: "-3s",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl animate-drift"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel) / 0.5), transparent 65%)",
            opacity: 0.9 * k,
          }}
        />

        {/* Мерехтливі точки — делікатні, без glow */}
        <div className="absolute inset-0">
          {[
            { top: "8%", left: "14%", delay: "0s", size: "w-1 h-1" },
            { top: "18%", left: "78%", delay: "0.4s", size: "w-1 h-1" },
            { top: "28%", left: "42%", delay: "0.9s", size: "w-1 h-1" },
            { top: "38%", left: "88%", delay: "1.3s", size: "w-1 h-1" },
            { top: "48%", left: "12%", delay: "1.7s", size: "w-1.5 h-1.5" },
            { top: "55%", left: "62%", delay: "2.1s", size: "w-1 h-1" },
            { top: "62%", left: "30%", delay: "0.6s", size: "w-1 h-1" },
            { top: "70%", left: "82%", delay: "1.0s", size: "w-1 h-1" },
            { top: "78%", left: "20%", delay: "1.5s", size: "w-1 h-1" },
            { top: "85%", left: "55%", delay: "1.9s", size: "w-1 h-1" },
          ].map((dot, i) => (
            <span
              key={i}
              className={`absolute rounded-full bg-primary/30 animate-twinkle ${dot.size}`}
              style={{
                top: dot.top,
                left: dot.left,
                animationDelay: dot.delay,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    const dotColor =
      tone === "dark"
        ? "hsl(0 0% 100% / 0.22)"
        : "hsl(var(--steel) / 0.32)";
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0 animate-grid-shift"
          style={{
            backgroundImage: `radial-gradient(${dotColor} 2px, transparent 2px)`,
            backgroundSize: "32px 32px",
            opacity: 1 * k,
            maskImage:
              "radial-gradient(ellipse at center, black 50%, transparent 95%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 50%, transparent 95%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full blur-3xl animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel) / 0.55), transparent 65%)",
            opacity: 1 * k,
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full blur-3xl animate-drift"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-light) / 0.45), transparent 65%)",
            opacity: 0.9 * k,
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl animate-drift-slow"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--steel-dark) / 0.5), transparent 65%)",
            opacity: 0.9 * k,
            animationDelay: "-5s",
          }}
        />
      </div>
    );
  }

  // waves
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            "linear-gradient(120deg, hsl(var(--steel-light) / 0.5), hsl(var(--steel) / 0.4), hsl(var(--steel-dark) / 0.45), hsl(var(--steel-light) / 0.5))",
          backgroundSize: "300% 300%",
          opacity: 1 * k,
        }}
      />
      <div
        className="absolute -top-32 left-1/4 w-[560px] h-[560px] rounded-full blur-3xl animate-drift"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--steel) / 0.5), transparent 65%)",
          opacity: 1 * k,
        }}
      />
    </div>
  );
});

export default AnimatedBackground;

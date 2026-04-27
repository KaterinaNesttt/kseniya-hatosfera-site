import { ArrowRight, MapPin, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";
import { useEffect, useRef } from "react";

const Hero = () => {
  const stats = [
    { icon: Home, value: "150+", label: "Об'єктів" },
    { icon: Users, value: "500+", label: "Клієнтів" },
    { icon: MapPin, value: "6+", label: "Років досвіду" },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});
    video.playbackRate = 0.85; // плавніше відчуття
  }, []);

  const handleConsultClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      const headerOffset = 80;
      const elementPosition =
        target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden">
      {/* Фон з відео — абсолютний (а не fixed), щоб не ламати layout на iOS */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/fallback.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Двошаровий градієнт: затемнення + кольоровий тон бренду */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/40" />

        {/* Анімовані декоративні плями */}
        <div
          className="decor-blob bg-steel-light/30 w-[500px] h-[500px] -top-32 -right-32 animate-float"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="decor-blob bg-primary/30 w-[400px] h-[400px] -bottom-32 -left-32 animate-float"
          style={{ animationDuration: "12s", animationDelay: "1s" }}
        />
      </div>

      {/* Контент */}
      <div className="section-container relative z-10 py-16 md:py-20">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full mb-6 animate-fade-in shadow-lg">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
              <span className="relative inline-flex w-2 h-2 bg-primary-foreground rounded-full" />
            </span>
            <span className="text-xs sm:text-sm font-medium">
              Ваш персональний агент з нерухомості
            </span>
          </div>

          {/* Заголовок */}
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6 animate-blur-in"
            style={{ animationDelay: "0.15s", opacity: 0 }}
          >
            Знайдемо ваш{" "}
            <span className="block mt-2 bg-gradient-to-r from-primary-foreground via-steel-light to-primary-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift">
              ідеальний дім
            </span>
          </h1>

          {/* Опис */}
          <p
            className="text-base sm:text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.35s", opacity: 0 }}
          >
            Професійний підхід до пошуку нерухомості. Довіртеся експерту з
            багаторічним досвідом.
          </p>

          {/* Кнопки */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center md:justify-start animate-fade-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary-foreground text-primary hover:bg-white px-8 py-6 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <a href="#contact" onClick={handleConsultClick}>
                Безкоштовна консультація
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Статистика */}
          <div
            className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto md:mx-0 animate-fade-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-3 sm:p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 transition-all duration-300 hover:bg-primary-foreground/10 hover:-translate-y-1 hover:border-primary-foreground/20"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-steel-light mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-sm text-primary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Індикатор скролу внизу */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce-subtle z-10">

      </div>

      {/* Плавний перехід до наступної секції (About — bg-secondary) */}
      <div
        className="section-fade-bottom"
        style={{
          background:
            "linear-gradient(to bottom, transparent 70%, hsl(var(--secondary)) 100%, hsl(var(--secondary)) 50%)",
        }}
      />
    </section>
  );
};

export default Hero;

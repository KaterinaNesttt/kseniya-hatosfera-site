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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Автозапуск + невелика швидкість
    video.play().catch(() => {});
    video.playbackRate = 0.99;

    const handleScroll = () => {
      if (!sectionRef.current || !video) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.scrollY - rect.top + window.innerHeight) / (rect.height + window.innerHeight)));

      // Паралакс: відео рухається повільніше за сторінку
      // scale від 1.0 до 1.12 + вертикальний зсув
      const scale = 1.0 + scrollProgress * 0.35;
      const translateY = scrollProgress * 80; // пікселі зсуву вгору

      video.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // початкове положення

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden"
    >
      {/* Video Background з паралаксом */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/fallback.jpg"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            transformOrigin: "center center",
            transition: "transform 0.15s ease-out", // плавність
          }}
        />
        {/* Градієнт поверх відео для кращої читабельності тексту */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/45 opacity-90" />
      </div>

      {/* Основний контент */}
      <div className="section-container relative z-10 py-20">
        <div className="max-w-xl mx-auto text-center md:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
            <span className="text-sm font-medium">Ваш персональний агент з нерухомості</span>
          </div>

          {/* Заголовок */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6 animate-slide-up">
            Знайдемо ваш <span className="block text-steel-light">ідеальний дім</span>
          </h1>

          {/* Опис */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Професійний підхід до пошуку нерухомості. Довіртеся експерту з багаторічним досвідом.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up justify-start md:justify-start" style={{ animationDelay: "0.2s" }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-steel-dark text-primary-foreground px-8 py-6 text-lg font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Безкоштовна консультація
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-3 gap-6 max-w-md animate-slide-up mx-auto md:mx-0" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 text-steel-light mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Стрілка вниз */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
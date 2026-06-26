import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState } from "react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+380 50 215 5397",
      link: "tel:+380****5397",
    },
    {
      icon: Mail,
      title: "Email",
      content: "kseniiabondarenko11@gmail.com",
      link: "mailto:kseniiabondarenko11@gmail.com",
    },
    {
      icon: MapPin,
      title: "Адреса",
      content: "м. Кропивницький, вул. Островського 15",
      link: "#",
    },
    {
      icon: Clock,
      title: "Графік роботи",
      content: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
      link: null,
    },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) {
      newErrors.name = "Введіть ваше ім'я";
    }
    if (!formState.phone.trim()) {
      newErrors.phone = "Введіть номер телефону";
    } else if (!/^[+\d\s()-]{10,}$/.test(formState.phone.trim())) {
      newErrors.phone = "Некоректний номер телефону";
    }
    if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Некоректний email";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", phone: "", email: "", type: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const headerReveal = useScrollReveal<HTMLDivElement>();
  const infoReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const formReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Анімований фон секції — градієнтний mesh з мерехтливими точками */}
      <AnimatedBackground variant="mesh" />

      {/* Плавний перехід зверху (від News — secondary) */}
      <div
        className="section-fade-top"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.5) 50%, transparent 100%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-12 md:mb-16 reveal ${
            headerReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Контакти
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            <span className="heading-underline">Зв'яжіться зі мною</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6">
            Готова відповісти на ваші запитання та допомогти знайти ідеальний
            варіант
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div
            ref={infoReveal.ref}
            className={`reveal-left ${infoReveal.isVisible ? "is-visible" : ""}`}
          >
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Мої контакти
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 stagger is-visible">
              {contactInfo.map((item, index) => {
                const ContentEl = (
                  <>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-6">
                      <item.icon className="w-5 h-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <span className="text-xs sm:text-sm text-muted-foreground block">
                        {item.title}
                      </span>
                      <span className="block font-medium text-foreground text-sm sm:text-base break-words transition-colors duration-200 group-hover:text-primary">
                        {item.content}
                      </span>
                    </div>
                  </>
                );

                if (item.link && item.link !== "#") {
                  return (
                    <a
                      key={index}
                      href={item.link}
                      className="group flex gap-3 sm:gap-4 p-3 -m-3 rounded-xl transition-colors duration-300 hover:bg-secondary/60"
                    >
                      {ContentEl}
                    </a>
                  );
                }
                return (
                  <div
                    key={index}
                    className="group flex gap-3 sm:gap-4 p-3 -m-3 rounded-xl transition-colors duration-300 hover:bg-secondary/60"
                  >
                    {ContentEl}
                  </div>
                );
              })}
            </div>

            {/* Google Map */}
            <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg group">
              <iframe
                src="https://www.google.com/maps?q=Кропивницький,+вул.+Островського+15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full transition-all duration-500 group-hover:scale-[1.02]"
                title="Карта розташування — вул. Островського 15, Кропивницький"
              />
              {/* Тонка рамка-акцент */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl" />
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formReveal.ref}
            className={`bg-gradient-to-br from-secondary to-secondary/60 rounded-2xl p-6 sm:p-8 shadow-lg reveal-right ${
              formReveal.isVisible ? "is-visible" : ""
            }`}
          >
            <h3 className="font-serif text-2xl text-foreground mb-6">
              Надіслати запит
            </h3>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-medium flex items-center gap-2" role="alert">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Дякую! Ваш запит надіслано. Я зв'яжуся з вами найближчим часом.
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Ім'я <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ваше ім'я"
                    value={formState.name}
                    onChange={handleChange}
                    className={`bg-background border-border focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                      errors.name ? "border-destructive" : ""
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-destructive text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Телефон <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+380..."
                    value={formState.phone}
                    onChange={handleChange}
                    className={`bg-background border-border focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                      errors.phone ? "border-destructive" : ""
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-destructive text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={handleChange}
                  className={`bg-background border-border focus:border-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${
                    errors.email ? "border-destructive" : ""
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-destructive text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                  Тип запиту
                </label>
                <select
                  id="type"
                  name="type"
                  value={formState.type}
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                >
                  <option value="">Оберіть тип запиту</option>
                  <option value="buy">Хочу купити</option>
                  <option value="sell">Хочу продати</option>
                  <option value="rent">Хочу орендувати</option>
                  <option value="consult">Консультація</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Повідомлення
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Опишіть ваш запит..."
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="bg-background border-border focus:border-primary resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="group w-full btn-primary py-6 text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Надсилання...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    Надіслати запит
                  </>
                )}
              </Button>

              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                Надсилаючи форму, ви погоджуєтесь з політикою конфіденційності
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Плавний перехід до Footer (foreground — темний) */}
      <div
        className="section-fade-bottom"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--foreground) / 0.5) 60%, hsl(var(--foreground) / 0.85) 100%)",
        }}
      />
    </section>
  );
};

export default Contact;

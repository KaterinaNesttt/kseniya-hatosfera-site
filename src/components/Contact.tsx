import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      content: "+380 50 215 5397",
      link: "tel:+380502155397",
    },
    {
      icon: Mail,
      title: "Email",
      content: "ksenia.bondarenko@gmail.ua",
      link: "mailto:ksenia.bondarenko@gmail.ua",
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

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Контакти
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-4">
            Зв'яжіться зі мною
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Готова відповісти на ваші запитання та допомогти знайти ідеальний варіант
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Мої контакти
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{item.title}</span>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        className="block font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span className="block font-medium text-foreground">{item.content}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

               {/* Google Map */}
<div className="relative h-64 rounded-2xl overflow-hidden">
  <iframe
    src="https://www.google.com/maps?q=Кропивницький&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full"
  />
</div>


          </div>

          {/* Contact Form */}
          <div className="bg-secondary rounded-2xl p-8">
            <h3 className="font-serif text-2xl text-foreground mb-6">
              Надіслати запит
            </h3>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ім'я *
                  </label>
                  <Input 
                    placeholder="Ваше ім'я" 
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Телефон *
                  </label>
                  <Input 
                    placeholder="+380..." 
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Тип запиту
                </label>
                <select className="w-full h-10 px-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:border-primary">
                  <option value="">Оберіть тип запиту</option>
                  <option value="buy">Хочу купити</option>
                  <option value="sell">Хочу продати</option>
                  <option value="rent">Хочу орендувати</option>
                  <option value="consult">Консультація</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Повідомлення
                </label>
                <Textarea 
                  placeholder="Опишіть ваш запит..." 
                  rows={4}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full btn-primary py-6 text-lg">
                <Send className="w-5 h-5 mr-2" />
                Надіслати запит
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Надсилаючи форму, ви погоджуєтесь з політикою конфіденційності
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

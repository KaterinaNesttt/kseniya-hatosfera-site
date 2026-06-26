import { MapPin, Maximize, BedDouble, Bath, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Properties = () => {
  const properties = [
    {
      id: 1,
      image: property1,
      title: "Сучасна квартира в центрі",
      location: "вул. Хрещатик, Київ",
      price: "2 500 000 ₴",
      type: "Продаж",
      area: 85,
      bedrooms: 2,
      bathrooms: 1,
      featured: true,
    },
    {
      id: 2,
      image: property2,
      title: "Простора квартира з ремонтом",
      location: "вул. Шевченка, Львів",
      price: "35 000 ₴/міс",
      type: "Оренда",
      area: 120,
      bedrooms: 3,
      bathrooms: 2,
      featured: false,
    },
    {
      id: 3,
      image: property3,
      title: "Затишна студія біля парку",
      location: "вул. Соборна, Одеса",
      price: "1 200 000 ₴",
      type: "Продаж",
      area: 45,
      bedrooms: 1,
      bathrooms: 1,
      featured: false,
    },
  ];

  return (
    <section id="properties" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-medium uppercase tracking-widest text-sm">
              Наші об'єкти
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3">
              Актуальні пропозиції
            </h2>
          </div>
          <Button variant="outline" className="btn-outline self-start md:self-auto">
            Всі об'єкти
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card 
              key={property.id} 
              className="group bg-card border-border overflow-hidden card-hover cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge 
                    className={`${
                      property.type === "Продаж" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-steel-light text-primary-foreground"
                    } font-medium`}
                  >
                    {property.type}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-foreground text-background font-medium">
                      Топ
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                
                <h3 className="font-serif text-xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {property.title}
                </h3>

                {/* Features */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4" />
                    <span>{property.area} м²</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {property.price}
                  </span>
                  <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                    Детальніше
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;

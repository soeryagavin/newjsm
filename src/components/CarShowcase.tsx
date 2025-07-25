import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Car, 
  Calendar, 
  Gauge, 
  Palette,
  Settings,
  MessageCircle,
  MapPin,
  Eye,
  Calculator
} from "lucide-react";

const CarShowcase = () => {
  const [selectedCar, setSelectedCar] = useState(0);

  const cars = [
    {
      id: 1,
      name: "Toyota Avanza 1.3 G",
      year: 2019,
      price: 165000000,
      sold: false,
      images: [
        "https://images.unsplash.com/photo-1570294924617-710c4c39b57e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop"
      ],
      specs: {
        transmission: "Manual",
        mileage: "45.000 km",
        color: "Putih",
        fuelType: "Bensin"
      },
      condition: "Sangat Baik",
      dp: 25000000,
      description: "Unit terawat, buku lengkap, pajak hidup, siap pakai."
    },
    {
      id: 2,
      name: "Honda Jazz RS CVT",
      year: 2018,
      price: 190000000,
      sold: false,
      images: [
        "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1619641805191-c4d8e6c0e95d?w=800&h=600&fit=crop"
      ],
      specs: {
        transmission: "CVT",
        mileage: "38.000 km",
        color: "Merah",
        fuelType: "Bensin"
      },
      condition: "Sangat Baik",
      dp: 30000000,
      description: "Unit istimewa, service record Honda, interior original."
    },
    {
      id: 3,
      name: "Daihatsu Xenia R Deluxe",
      year: 2020,
      price: 145000000,
      sold: true,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      specs: {
        transmission: "Manual",
        mileage: "25.000 km",
        color: "Silver",
        fuelType: "Bensin"
      },
      condition: "Sangat Baik",
      dp: 20000000,
      description: "Unit seperti baru, km rendah, pajak panjang."
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === cars[selectedCar].images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? cars[selectedCar].images.length - 1 : prev - 1
    );
  };

  return (
    <section id="cars" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Etalase Mobil Bekas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Koleksi mobil bekas berkualitas dengan kondisi prima, 
            sudah melalui pengecekan menyeluruh dari tim ahli kami.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car List */}
          <div className="lg:col-span-1 space-y-4">
            {cars.map((car, index) => (
              <Card 
                key={car.id}
                className={`cursor-pointer transition-all hover:shadow-card ${
                  index === selectedCar ? 'ring-2 ring-primary shadow-elevated' : ''
                } ${car.sold ? 'opacity-75' : ''}`}
                onClick={() => {
                  setSelectedCar(index);
                  setCurrentImageIndex(0);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{car.name}</h3>
                    {car.sold && (
                      <Badge variant="destructive" className="text-xs">
                        TERJUAL
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {car.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="h-3 w-3" />
                      {car.specs.mileage}
                    </div>
                  </div>
                  {!car.sold && (
                    <p className="font-bold text-primary">
                      {formatPrice(car.price)}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Car Details */}
          <div className="lg:col-span-2">
            <Card className="shadow-automotive">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-primary">
                      {cars[selectedCar].name}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {cars[selectedCar].year}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Serang, Banten
                      </div>
                    </div>
                  </div>
                  {cars[selectedCar].sold ? (
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      TERJUAL
                    </Badge>
                  ) : (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(cars[selectedCar].price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        DP mulai {formatPrice(cars[selectedCar].dp)}
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Image Carousel */}
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={cars[selectedCar].images[currentImageIndex]}
                      alt={`${cars[selectedCar].name} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {cars[selectedCar].sold && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <h3 className="text-4xl font-bold mb-2">TERJUAL</h3>
                          <p>Unit ini sudah terjual</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {cars[selectedCar].images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Image indicators */}
                  {cars[selectedCar].images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {cars[selectedCar].images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Transmisi</p>
                      <p className="font-medium">{cars[selectedCar].specs.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Kilometer</p>
                      <p className="font-medium">{cars[selectedCar].specs.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Warna</p>
                      <p className="font-medium">{cars[selectedCar].specs.color}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bahan Bakar</p>
                      <p className="font-medium">{cars[selectedCar].specs.fuelType}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">Deskripsi & Kondisi</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-success text-success-foreground">{cars[selectedCar].condition}</Badge>
                  </div>
                  <p className="text-muted-foreground">{cars[selectedCar].description}</p>
                </div>

                {/* Actions */}
                {!cars[selectedCar].sold && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button variant="automotive" className="flex-1" asChild>
                      <a href="#credit">
                        <Calculator className="h-4 w-4" />
                        Simulasi Kredit
                      </a>
                    </Button>
                    <Button variant="whatsapp" className="flex-1" asChild>
                      <a 
                        href={`https://wa.me/6208995053443?text=Halo, saya tertarik dengan ${cars[selectedCar].name} tahun ${cars[selectedCar].year}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Hubungi via WhatsApp
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;
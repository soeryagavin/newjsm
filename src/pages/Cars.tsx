import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Calculator,
  Search,
  Filter,
  Zap
} from "lucide-react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cars = [
    {
      id: 1,
      name: "Toyota Avanza 1.3 G Premium",
      year: 2019,
      price: 165000000,
      sold: false,
      images: [
        "https://images.unsplash.com/photo-1570294924617-710c4c39b57e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1619641805191-c4d8e6c0e95d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1471479917193-f00955256257?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop"
      ].slice(0, 15),
      specs: {
        transmission: "Manual",
        mileage: "45.000 km",
        color: "Putih",
        fuelType: "Bensin"
      },
      condition: "Sangat Baik",
      dp: 25000000,
      description: "Unit terawat dengan perawatan premium. Service record lengkap Toyota Auto2000, interior original masih seperti baru, mesin halus responsif, kaki-kaki empuk. Dilengkapi dengan fitur advanced safety dan sistem infotainment canggih.",
      aiScore: 95,
      features: ["Service Record", "Interior Original", "Mesin Prima", "Safety Features", "Infotainment System", "Garansi Mesin"]
    },
    {
      id: 2,
      name: "Honda Jazz RS CVT Executive",
      year: 2018,
      price: 190000000,
      sold: false,
      images: [
        "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1619641805191-c4d8e6c0e95d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570294924617-710c4c39b57e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1471479917193-f00955256257?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop"
      ].slice(0, 15),
      specs: {
        transmission: "CVT",
        mileage: "38.000 km",
        color: "Merah",
        fuelType: "Bensin"
      },
      condition: "Sangat Baik",
      dp: 30000000,
      description: "Unit istimewa dengan spesifikasi RS Executive. Service record Honda resmi, interior sporty original, CVT responsif dan halus. Dilengkapi fitur Honda SENSING dan smart entry system untuk pengalaman berkendara premium.",
      aiScore: 92,
      features: ["Honda SENSING", "Smart Entry", "CVT Premium", "RS Sporty Interior", "LED Headlights", "Cruise Control"]
    },
    {
      id: 3,
      name: "Daihatsu Xenia R Deluxe Ultimate",
      year: 2020,
      price: 145000000,
      sold: true,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1471479917193-f00955256257?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop"
      ].slice(0, 15),
      specs: {
        transmission: "Manual",
        mileage: "25.000 km",
        color: "Silver",
        fuelType: "Bensin"
      },
      condition: "Sangat Baik",
      dp: 20000000,
      description: "Unit seperti baru dengan kilometer rendah dan perawatan premium. Pajak panjang, surat lengkap, interior spacious dan nyaman. Mesin irit BBM dengan performa optimal untuk keluarga modern.",
      aiScore: 88,
      features: ["Low Mileage", "Spacious Interior", "Fuel Efficient", "Family Friendly", "Complete Documents", "Extended Warranty"]
    }
  ];

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

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    return "text-accent";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Future <span className="text-transparent bg-gradient-cyber bg-clip-text">Garage</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Koleksi mobil bekas premium dengan AI assessment dan teknologi masa depan
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari mobil impian Anda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gradient-glass backdrop-blur-glass border-border/50"
            />
          </div>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/20">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Car List */}
          <div className="lg:col-span-1 space-y-4">
            {cars.map((car, index) => (
              <Card 
                key={car.id}
                className={`cursor-pointer transition-all hover:shadow-glow bg-gradient-card border-border/50 ${
                  index === selectedCar ? 'ring-2 ring-primary shadow-neon' : ''
                } ${car.sold ? 'opacity-75' : ''}`}
                onClick={() => {
                  setSelectedCar(index);
                  setCurrentImageIndex(0);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm text-foreground">{car.name}</h3>
                    <div className="flex gap-1">
                      {car.sold && (
                        <Badge variant="destructive" className="text-xs">
                          TERJUAL
                        </Badge>
                      )}
                      <Badge variant="secondary" className={`text-xs ${getAIScoreColor(car.aiScore)}`}>
                        <Zap className="h-2 w-2 mr-1" />
                        {car.aiScore}
                      </Badge>
                    </div>
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
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                      {cars[selectedCar].name}
                      <Badge variant="secondary" className={`${getAIScoreColor(cars[selectedCar].aiScore)}`}>
                        <Zap className="h-3 w-3 mr-1" />
                        AI Score: {cars[selectedCar].aiScore}
                      </Badge>
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
                      <p className="text-2xl font-bold text-primary animate-neon-pulse">
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
                {/* Premium Image Gallery */}
                <div className="relative group">
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted border border-primary/30 shadow-xl">
                    <img
                      src={cars[selectedCar].images[currentImageIndex]}
                      alt={`${cars[selectedCar].name} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    
                    {/* Premium overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                    
                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {cars[selectedCar].images.length}
                    </div>
                    
                    {cars[selectedCar].sold && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-white text-center">
                          <h3 className="text-5xl font-bold mb-3 animate-neon-pulse bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">TERJUAL</h3>
                          <p className="text-lg">Unit premium ini sudah terjual</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Navigation buttons */}
                  {cars[selectedCar].images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20 text-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20 text-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  {/* Premium image indicators */}
                  {cars[selectedCar].images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {cars[selectedCar].images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white shadow-lg scale-125' 
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Premium Features Showcase */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {cars[selectedCar].features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Premium Specifications Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Settings className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-xs text-muted-foreground font-medium">Transmisi</p>
                      <p className="font-bold text-foreground">{cars[selectedCar].specs.transmission}</p>
                    </div>
                  </div>
                  <div className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/30 hover:border-accent/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Gauge className="h-5 w-5 text-accent mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-xs text-muted-foreground font-medium">Kilometer</p>
                      <p className="font-bold text-foreground">{cars[selectedCar].specs.mileage}</p>
                    </div>
                  </div>
                  <div className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-success/20 via-success/10 to-transparent border border-success/30 hover:border-success/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Palette className="h-5 w-5 text-success mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-xs text-muted-foreground font-medium">Warna</p>
                      <p className="font-bold text-foreground">{cars[selectedCar].specs.color}</p>
                    </div>
                  </div>
                  <div className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Car className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-xs text-muted-foreground font-medium">Bahan Bakar</p>
                      <p className="font-bold text-foreground">{cars[selectedCar].specs.fuelType}</p>
                    </div>
                  </div>
                </div>

                {/* Advanced AI Assessment */}
                <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-r from-primary/15 via-accent/10 to-success/15 border border-primary/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse opacity-50" />
                  <div className="relative">
                    <h4 className="font-bold mb-4 flex items-center gap-3 text-foreground text-lg">
                      <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      AI Premium Quality Assessment
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1">
                        <div className={`text-4xl font-bold mb-2 ${getAIScoreColor(cars[selectedCar].aiScore)}`}>
                          {cars[selectedCar].aiScore}/100
                        </div>
                        <Badge variant="secondary" className={`${getAIScoreColor(cars[selectedCar].aiScore)} bg-transparent border`}>
                          {cars[selectedCar].aiScore >= 90 ? 'Premium Grade' : cars[selectedCar].aiScore >= 80 ? 'Excellent' : 'Good'}
                        </Badge>
                      </div>
                      <div className="lg:col-span-2">
                        <div className="space-y-3">
                          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-primary via-accent to-success h-3 rounded-full transition-all duration-1000 ease-out shadow-lg" 
                              style={{ width: `${cars[selectedCar].aiScore}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <p className="font-medium text-primary">Kondisi</p>
                              <p className="text-muted-foreground">95%</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-accent">Riwayat</p>
                              <p className="text-muted-foreground">92%</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-success">Nilai Pasar</p>
                              <p className="text-muted-foreground">98%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Deskripsi & Kondisi</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-success/20 to-success/10 text-success border-success/20">
                      {cars[selectedCar].condition}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{cars[selectedCar].description}</p>
                </div>

                {/* Premium Action Buttons */}
                {!cars[selectedCar].sold && (
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      variant="default" 
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary via-primary to-accent hover:shadow-xl hover:scale-105 transition-all duration-300 group" 
                      asChild
                    >
                      <a href="/credit">
                        <Calculator className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        AI Credit Simulation Premium
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12 text-base font-semibold border-2 border-success text-success hover:bg-success hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 group" 
                      asChild
                    >
                      <a 
                        href={`https://wa.me/6208995053443?text=Halo, saya tertarik dengan mobil premium ${cars[selectedCar].name} tahun ${cars[selectedCar].year}. Mohon info detail dan jadwal test drive.`}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-5 w-5 mr-2 group-hover:bounce transition-all duration-300" />
                        Premium Consultation
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
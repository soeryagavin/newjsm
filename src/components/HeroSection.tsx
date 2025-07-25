import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  MapPin, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Shield,
  Star,
  Car,
  Calculator
} from "lucide-react";
import carShowroomBg from "@/assets/car-showroom-bg.jpg";

const HeroSection = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const stories = [
    {
      id: 1,
      title: "Promo Akhir Tahun",
      thumbnail: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&h=300&fit=crop",
      duration: "30s"
    },
    {
      id: 2,
      title: "Unit Terbaru",
      thumbnail: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=300&fit=crop", 
      duration: "25s"
    },
    {
      id: 3,
      title: "Testimoni Customer",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
      duration: "28s"
    }
  ];

  const highlights = [
    { title: "Layanan Terpercaya", icon: Shield },
    { title: "8 Tahun Pengalaman", icon: Award },
    { title: "1000+ Customer Puas", icon: Star },
    { title: "Lokasi Strategis", icon: MapPin }
  ];

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-primary/20 to-accent/30" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url(${carShowroomBg})` }}
      />
      
      <div className="relative container py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Calendar className="h-3 w-3 mr-1" />
                Berdiri sejak 2016
              </Badge>
              <h1 className="text-5xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
                <span className="block text-transparent bg-gradient-cyber bg-clip-text animate-neon-pulse">
                  JSM+
                </span>
                <span className="block text-2xl lg:text-4xl text-accent font-medium mt-2">
                  by Jaya Setia Mobilindo
                </span>
              </h1>
              <p className="text-xl text-foreground mb-6 leading-relaxed">
                🚗 <strong className="text-accent">WUJUDKAN MOBIL IMPIAN DENGAN KREDIT CERDAS!</strong> ✨
                <br />Dapatkan mobil berkualitas premium dengan cicilan terjangkau mulai dari 2 jutaan/bulan. 
                <span className="text-accent font-semibold">DP ringan 20%, bunga kompetitif 8.5%, proses cepat 1 hari!</span>
                <br />Mengapa kredit? Hemat cash flow, preservasi tabungan untuk investasi lain!
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50 hover:shadow-glow transition-all">
                  <item.icon className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" className="bg-gradient-primary hover:shadow-neon transition-all" asChild>
                <a href="#cars">
                  <Car className="h-5 w-5" />
                  Explore Premium Cars
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all" asChild>
                <a href="#credit">
                  <Calculator className="h-5 w-5" />
                  Kredit Simulator AI
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Live Stream & Stories */}
          <div className="space-y-6 animate-slide-up">
            
            {/* Live Stream */}
            <Card className="overflow-hidden shadow-automotive">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-900">
                  {/* YouTube/Live Stream Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                        <Play className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Live Streaming</h3>
                      <p className="text-sm text-gray-300">Tonton live showroom kami</p>
                      <Badge variant="destructive" className="mt-2">
                        🔴 LIVE
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stories Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Stories & Highlights</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
                    disabled={currentStory === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={() => setCurrentStory(Math.min(stories.length - 1, currentStory + 1))}
                    disabled={currentStory === stories.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {stories.map((story, index) => (
                  <Card 
                    key={story.id} 
                    className={`flex-shrink-0 w-24 cursor-pointer transition-all ${
                      index === currentStory ? 'ring-2 ring-accent' : ''
                    }`}
                    onClick={() => setCurrentStory(index)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={story.thumbnail} 
                          alt={story.title}
                          className="w-24 h-24 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs px-1">
                            {story.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium text-center truncate">
                          {story.title}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
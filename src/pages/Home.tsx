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
  Calculator,
  Zap,
  Globe,
  Cpu
} from "lucide-react";
import { Link } from "react-router-dom";
import carShowroomBg from "@/assets/car-showroom-bg.jpg";

const Home = () => {
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
    { title: "Layanan Terpercaya", icon: Shield, color: "text-success" },
    { title: "8 Tahun Pengalaman", icon: Award, color: "text-primary" },
    { title: "1000+ Customer Puas", icon: Star, color: "text-accent" },
    { title: "Lokasi Strategis", icon: MapPin, color: "text-primary" }
  ];

  const features = [
    {
      title: "Live Streaming",
      description: "Tonton showroom secara real-time",
      icon: Play,
      link: "#live",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Etalase Digital",
      description: "Koleksi mobil bekas premium",
      icon: Car,
      link: "/cars",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Simulasi AI",
      description: "Kredit dengan kalkulasi cerdas",
      icon: Cpu,
      link: "/credit",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: "SLIK Checker",
      description: "Cek riwayat kredit instant",
      icon: Zap,
      link: "/slik",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Elegant Car Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-primary/20 to-accent/30" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: `url(${carShowroomBg})` }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float" />
          <div className="absolute top-32 right-20 w-1 h-1 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-32 w-3 h-3 bg-success rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 right-10 w-1 h-1 bg-primary rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <div className="relative container py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <Badge variant="secondary" className="mb-4 bg-gradient-glass backdrop-blur-glass border border-primary/20">
                  <Calendar className="h-3 w-3 mr-1" />
                  Berdiri sejak 2016
                </Badge>
                <h1 className="text-5xl lg:text-8xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
                  <span className="block text-transparent bg-gradient-cyber bg-clip-text animate-neon-pulse">
                    JSM+
                  </span>
                  <span className="block text-2xl lg:text-4xl text-accent font-medium mt-2">
                    by Jaya Setia Mobilindo
                  </span>
                </h1>
                <p className="text-xl text-foreground mb-6 leading-relaxed">
                  🚗 <strong className="text-accent">KREDIT MOBIL IMPIAN LEBIH MENGUNTUNGKAN!</strong> ✨
                  <br />Mengapa pilih kredit? Hemat cash flow untuk investasi lain, cicilan mulai 2 juta/bulan, 
                  DP ringan 20%, bunga kompetitif 8.5%, tenor fleksibel hingga 5 tahun! 
                  <span className="text-accent font-semibold">Smart financing untuk lifestyle upgrade tanpa stress!</span>
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50 hover:shadow-glow transition-all">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="lg" className="bg-gradient-primary hover:shadow-neon transition-all" asChild>
                  <Link to="/cars">
                    <Car className="h-5 w-5" />
                    Explore Future Cars
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all" asChild>
                  <Link to="/credit">
                    <Calculator className="h-5 w-5" />
                    AI Credit Simulation
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Live Stream & Stories */}
            <div className="space-y-6 animate-slide-up">
              
              {/* Live Stream */}
              <Card className="overflow-hidden shadow-automotive border border-primary/20 bg-gradient-card">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-background to-secondary">
                    {/* YouTube/Live Stream Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-foreground">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center animate-glow">
                          <Play className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Future Live Streaming</h3>
                        <p className="text-sm text-muted-foreground">Pengalaman showroom virtual</p>
                        <Badge variant="destructive" className="mt-2 animate-neon-pulse">
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
                  <h3 className="text-lg font-semibold text-foreground">Digital Stories</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground hover:bg-primary/20 hover:shadow-glow"
                      onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
                      disabled={currentStory === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground hover:bg-primary/20 hover:shadow-glow"
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
                      className={`flex-shrink-0 w-24 cursor-pointer transition-all bg-gradient-card border-border/50 hover:shadow-glow ${
                        index === currentStory ? 'ring-2 ring-accent shadow-glow' : ''
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
                            <Badge variant="secondary" className="text-xs px-1 bg-gradient-glass backdrop-blur-glass">
                              {story.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium text-center truncate text-foreground">
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

      {/* Features Grid */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
              Future <span className="text-transparent bg-gradient-cyber bg-clip-text">Features</span>
            </h2>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              💳 <strong className="text-accent">Kredit = Kebebasan Finansial!</strong> 
              Bayar cash = tabungan habis. Pilih kredit = tabungan aman untuk emergency & investasi. 
              Cicilan mulai 2 juta, tenor hingga 60 bulan, promo bunga 0% untuk 3 bulan pertama! 
              <span className="text-accent font-semibold">Mobil dapat, uang tabungan tetap aman!</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-neon bg-gradient-card border border-border/50"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:animate-float`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground mb-4">{feature.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/20" asChild>
                    <Link to={feature.link}>
                      Explore →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-success/10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary animate-neon-pulse">8+</h3>
              <p className="text-foreground">Tahun Pengalaman</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-accent animate-neon-pulse">1000+</h3>
              <p className="text-foreground">Customer Puas</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-success animate-neon-pulse">500+</h3>
              <p className="text-foreground">Unit Terjual</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-primary animate-neon-pulse">24/7</h3>
              <p className="text-foreground">Digital Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
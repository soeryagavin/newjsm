import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Mail,
  Star,
  Shield,
  Award,
  Globe,
  Users,
  Zap,
  Car
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "WhatsApp",
      value: "08995053443",
      action: "https://wa.me/6208995053443",
      color: "text-success"
    },
    {
      icon: MapPin,
      title: "Lokasi",
      value: "Ranca Tales, Drangong, Taktakan, Serang, Banten",
      action: "#maps",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      value: "Senin - Minggu: 08:00 - 18:00",
      action: null,
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@jsmplus.com",
      action: "mailto:info@jsmplus.com",
      color: "text-success"
    }
  ];

  const features = [
    { icon: Car, title: "500+ Unit Tersedia", color: "text-primary" },
    { icon: Users, title: "1000+ Customer Puas", color: "text-success" },
    { icon: Shield, title: "Garansi Kualitas", color: "text-accent" },
    { icon: Award, title: "8 Tahun Pengalaman", color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Contact <span className="text-transparent bg-gradient-cyber bg-clip-text">Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hubungi kami untuk konsultasi mobil impian Anda. Tim expert siap membantu 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-neon bg-gradient-card border border-primary/20">
            <CardHeader className="bg-gradient-glass backdrop-blur-glass">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="h-5 w-5 text-primary" />
                Send Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama Anda"
                    className="bg-gradient-glass backdrop-blur-glass border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">No. WhatsApp</Label>
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    className="bg-gradient-glass backdrop-blur-glass border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                  className="bg-gradient-glass backdrop-blur-glass border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Minat pada Honda Jazz 2018"
                  className="bg-gradient-glass backdrop-blur-glass border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Pesan</Label>
                <Textarea
                  id="message"
                  placeholder="Tuliskan pertanyaan atau minat Anda..."
                  rows={4}
                  className="bg-gradient-glass backdrop-blur-glass border-border/50"
                />
              </div>

              <Button className="w-full bg-gradient-primary hover:shadow-neon">
                <MessageCircle className="h-4 w-4" />
                Kirim Pesan
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Atau hubungi langsung via:</p>
                <Button variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground" asChild>
                  <a href="https://wa.me/6208995053443" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp: 08995053443
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="shadow-glow bg-gradient-card border border-border/50 hover:shadow-neon transition-all group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:animate-float">
                        <info.icon className={`h-6 w-6 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                      {info.action && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={info.action} target="_blank" rel="noopener noreferrer">
                            <Zap className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="h-5 w-5 text-primary" />
                  Lokasi Showroom
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop')] bg-cover bg-center opacity-30" />
                  <div className="text-center text-foreground relative z-10">
                    <MapPin className="h-12 w-12 mx-auto mb-3 text-primary animate-float" />
                    <h3 className="text-lg font-semibold mb-2">JSM+ Showroom</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Ranca Tales, Drangong, Taktakan<br />
                      Serang, Banten
                    </p>
                    <Button variant="outline" className="mt-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Buka di Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Mengapa Pilih <span className="text-transparent bg-gradient-cyber bg-clip-text">JSM+</span>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-all bg-gradient-card border border-border/50 group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center group-hover:animate-float">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="shadow-neon bg-gradient-card border border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Siap Menemukan Mobil Impian?
              </h3>
              <p className="text-muted-foreground mb-6">
                Tim expert kami siap membantu Anda menemukan mobil bekas berkualitas 
                dengan harga terbaik dan proses yang mudah.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-primary hover:shadow-neon" asChild>
                  <a href="/cars">
                    <Car className="h-4 w-4" />
                    Lihat Koleksi Mobil
                  </a>
                </Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                  <a href="https://wa.me/6208995053443" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Chat WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
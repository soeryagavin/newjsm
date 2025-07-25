import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Car, 
  Award, 
  Users, 
  MessageCircle,
  Mail,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const businessInfo = {
    name: "JSM+ by Jaya Setia Mobilindo",
    established: "2016",
    address: "Ranca Tales, Drangong, Taktakan, Serang, Banten",
    phone: "08995053443",
    email: "info@jsm-mobilindo.com",
    workingHours: "Senin - Sabtu: 08:00 - 17:00 WIB"
  };

  const services = [
    "Jual Beli Mobil Bekas",
    "Tukar Tambah Kendaraan", 
    "Konsultasi Kredit",
    "Cek Kondisi Kendaraan",
    "Bantuan Administrasi"
  ];

  const achievements = [
    { icon: Award, label: "8+ Tahun Pengalaman", value: "Sejak 2016" },
    { icon: Users, label: "1000+ Customer", value: "Terpercaya" },
    { icon: Car, label: "500+ Unit Terjual", value: "Berkualitas" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">JSM+</h3>
                  <p className="text-primary-foreground/80 text-sm">Jaya Setia Mobilindo</p>
                </div>
              </div>
              <p className="text-primary-foreground/90 leading-relaxed mb-4">
                Showroom mobil bekas terpercaya di Serang, Banten sejak tahun 2016. 
                Kami mengutamakan transparansi, kualitas, dan kepuasan pelanggan dalam setiap transaksi.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  Berdiri sejak {businessInfo.established}
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground">
                  Terpercaya & Bergaransi
                </Badge>
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <achievement.icon className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="text-xs font-medium">{achievement.label}</p>
                  <p className="text-xs text-primary-foreground/70">{achievement.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Kontak & Lokasi</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Alamat Showroom</p>
                  <p className="text-sm text-primary-foreground/80">{businessInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Telepon / WhatsApp</p>
                  <p className="text-sm text-primary-foreground/80">{businessInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Jam Operasional</p>
                  <p className="text-sm text-primary-foreground/80">{businessInfo.workingHours}</p>
                  <p className="text-sm text-primary-foreground/60">Minggu: Tutup</p>
                </div>
              </div>
            </div>

            <Button variant="accent" className="w-full" asChild>
              <a 
                href={`https://wa.me/62${businessInfo.phone.substring(1)}`}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Hubungi via WhatsApp
              </a>
            </Button>
          </div>

          {/* Services & Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Layanan Kami</h4>
            
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-primary-foreground/90">{service}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-primary-foreground/20">
              <h5 className="font-medium mb-3">Quick Links</h5>
              <div className="space-y-2">
                <a href="#cars" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Etalase Mobil
                </a>
                <a href="#credit" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Simulasi Kredit
                </a>
                <a href="#slik" className="block text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Cek SLIK OJK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-8">
          <h4 className="text-lg font-semibold mb-4 text-center">Lokasi Showroom</h4>
          <Card className="overflow-hidden shadow-automotive">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted">
                {/* Google Maps Embed Placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <h5 className="font-semibold mb-2">JSM+ Showroom</h5>
                    <p className="text-sm max-w-md">
                      Ranca Tales, Drangong, Taktakan, Serang, Banten
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a 
                        href="https://maps.google.com/?q=Ranca+Tales+Drangong+Taktakan+Serang+Banten"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Buka di Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © 2024 JSM+ by Jaya Setia Mobilindo. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <span>Showroom Mobil Bekas Terpercaya Sejak 2016</span>
              <Badge variant="outline" className="border-accent text-accent">
                Serang, Banten
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
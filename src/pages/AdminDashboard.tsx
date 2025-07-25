import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Palette, 
  Clock, 
  User, 
  Home, 
  Car,
  Calculator,
  Phone,
  MapPin,
  Save,
  Eye,
  Mail,
  Globe,
  Shield,
  Database,
  Plus,
  Trash2,
  Edit,
  Image,
  DollarSign,
  Calendar as CalendarIcon,
  Gauge,
  PaintBucket
} from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // State untuk pengaturan website
  const [settings, setSettings] = useState({
    // Informasi Perusahaan
    companyName: "JSM+ by Jaya Setia Mobilindo",
    companyDescription: "Dealer mobil bekas terpercaya dengan teknologi AI assessment dan layanan premium untuk pengalaman jual beli mobil yang aman dan transparan.",
    companyPhone: "08995053443",
    companyEmail: "info@jsm-plus.id",
    companyAddress: "Jl. Raya Serang No. 123, Serang, Banten 42111",
    companyWebsite: "https://jsm-plus.id",
    
    // Jam Kerja
    workingHours: {
      monday: "09:00 - 17:00",
      tuesday: "09:00 - 17:00", 
      wednesday: "09:00 - 17:00",
      thursday: "09:00 - 17:00",
      friday: "09:00 - 17:00",
      saturday: "09:00 - 15:00",
      sunday: "Tutup"
    },
    
    // Konten Beranda
    heroTitle: "JSM+ by Jaya Setia Mobilindo",
    heroSubtitle: "AI-Powered Car Dealership",
    heroDescription: "Platform jual beli mobil bekas dengan teknologi AI assessment, simulasi kredit otomatis, dan layanan premium untuk pengalaman yang aman dan transparan.",
    
    // Warna Tema
    colors: {
      primary: "220 70% 60%",
      secondary: "220 14% 96%",
      accent: "280 65% 60%",
      success: "142 71% 45%",
      muted: "220 14% 96%",
      background: "220 65% 4%",
      foreground: "220 20% 98%"
    },
    
    // Pengaturan Layanan
    services: {
      creditSimulation: true,
      slikCheck: true,
      aiAssessment: true,
      whatsappIntegration: true,
      carShowcase: true
    },
    
    // Pengaturan Kredit
    creditSettings: {
      minDp: 20,
      maxTenor: 60,
      interestRate: 8.5,
      adminFee: 500000,
      insuranceRate: 3.5
    }
  });

  // State untuk manajemen mobil
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Toyota Avanza 1.3 G Premium",
      year: 2019,
      price: 165000000,
      sold: false,
      mileage: "45.000 km",
      color: "Putih",
      transmission: "Manual",
      fuelType: "Bensin",
      condition: "Sangat Baik",
      dp: 25000000,
      description: "Unit terawat dengan perawatan premium. Service record lengkap Toyota Auto2000.",
      images: ["https://images.unsplash.com/photo-1570294924617-710c4c39b57e?w=800&h=600&fit=crop"],
      aiScore: 95
    },
    {
      id: 2,
      name: "Honda Jazz RS CVT Executive",
      year: 2018,
      price: 190000000,
      sold: false,
      mileage: "38.000 km",
      color: "Merah",
      transmission: "CVT",
      fuelType: "Bensin",
      condition: "Sangat Baik",
      dp: 30000000,
      description: "Unit istimewa dengan spesifikasi RS Executive. Service record Honda resmi.",
      images: ["https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=800&h=600&fit=crop"],
      aiScore: 92
    }
  ]);

  const [newCar, setNewCar] = useState({
    name: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: "",
    color: "",
    transmission: "Manual",
    fuelType: "Bensin",
    condition: "Baik",
    dp: 0,
    description: "",
    images: [""],
    sold: false
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulasi API call ke Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Pengaturan Tersimpan",
        description: `Pengaturan ${section} berhasil diperbarui.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan pengaturan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Kelola pengaturan website dan konten</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
              <Database className="h-3 w-3 mr-1" />
              Supabase Connected
            </Badge>
            <Badge variant="outline">Admin Access</Badge>
          </div>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gradient-card">
            <TabsTrigger value="company" className="data-[state=active]:bg-primary/20">
              <User className="h-4 w-4 mr-2" />
              Perusahaan
            </TabsTrigger>
            <TabsTrigger value="home" className="data-[state=active]:bg-primary/20">
              <Home className="h-4 w-4 mr-2" />
              Beranda
            </TabsTrigger>
            <TabsTrigger value="cars" className="data-[state=active]:bg-primary/20">
              <Car className="h-4 w-4 mr-2" />
              Stock Mobil
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-primary/20">
              <Palette className="h-4 w-4 mr-2" />
              Tema
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary/20">
              <Clock className="h-4 w-4 mr-2" />
              Jam Kerja
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-primary/20">
              <Settings className="h-4 w-4 mr-2" />
              Layanan
            </TabsTrigger>
            <TabsTrigger value="credit" className="data-[state=active]:bg-primary/20">
              <Calculator className="h-4 w-4 mr-2" />
              Kredit
            </TabsTrigger>
          </TabsList>

          {/* Tab Informasi Perusahaan */}
          <TabsContent value="company">
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Informasi Perusahaan
                </CardTitle>
                <CardDescription>
                  Kelola informasi dasar perusahaan dan kontak
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nama Perusahaan</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => updateSetting('companyName', e.target.value)}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Website</Label>
                    <Input
                      id="companyWebsite"
                      value={settings.companyWebsite}
                      onChange={(e) => updateSetting('companyWebsite', e.target.value)}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">Nomor Telepon</Label>
                    <Input
                      id="companyPhone"
                      value={settings.companyPhone}
                      onChange={(e) => updateSetting('companyPhone', e.target.value)}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      value={settings.companyEmail}
                      onChange={(e) => updateSetting('companyEmail', e.target.value)}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Alamat</Label>
                  <Input
                    id="companyAddress"
                    value={settings.companyAddress}
                    onChange={(e) => updateSetting('companyAddress', e.target.value)}
                    className="bg-gradient-glass backdrop-blur-glass"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Deskripsi Perusahaan</Label>
                  <Textarea
                    id="companyDescription"
                    value={settings.companyDescription}
                    onChange={(e) => updateSetting('companyDescription', e.target.value)}
                    rows={4}
                    className="bg-gradient-glass backdrop-blur-glass"
                  />
                </div>
                <Button 
                  onClick={() => handleSave('Perusahaan')}
                  disabled={loading}
                  className="bg-gradient-primary hover:shadow-neon"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Konten Beranda */}
          <TabsContent value="home">
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Konten Beranda
                </CardTitle>
                <CardDescription>
                  Kelola konten utama yang ditampilkan di halaman beranda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Judul Utama</Label>
                  <Input
                    id="heroTitle"
                    value={settings.heroTitle}
                    onChange={(e) => updateSetting('heroTitle', e.target.value)}
                    className="bg-gradient-glass backdrop-blur-glass"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Sub Judul</Label>
                  <Input
                    id="heroSubtitle"
                    value={settings.heroSubtitle}
                    onChange={(e) => updateSetting('heroSubtitle', e.target.value)}
                    className="bg-gradient-glass backdrop-blur-glass"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroDescription">Deskripsi</Label>
                  <Textarea
                    id="heroDescription"
                    value={settings.heroDescription}
                    onChange={(e) => updateSetting('heroDescription', e.target.value)}
                    rows={4}
                    className="bg-gradient-glass backdrop-blur-glass"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => handleSave('Beranda')}
                    disabled={loading}
                    className="bg-gradient-primary hover:shadow-neon"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/" target="_blank">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Stock Mobil */}
          <TabsContent value="cars">
            <div className="space-y-6">
              {/* Header dengan tombol tambah mobil */}
              <Card className="shadow-neon bg-gradient-card border border-primary/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-primary" />
                        Manajemen Stock Mobil
                      </CardTitle>
                      <CardDescription>
                        Kelola inventory mobil yang tersedia untuk dijual
                      </CardDescription>
                    </div>
                    <Button className="bg-gradient-primary hover:shadow-neon">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Mobil
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* List mobil */}
              <div className="grid gap-4">
                {cars.map((car) => (
                  <Card key={car.id} className="shadow-neon bg-gradient-card border border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Gambar mobil */}
                        <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={car.images[0]} 
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Info mobil */}
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg text-foreground">{car.name}</h3>
                            <div className="flex gap-2">
                              {car.sold ? (
                                <Badge variant="destructive">TERJUAL</Badge>
                              ) : (
                                <Badge variant="default" className="bg-success text-success-foreground">TERSEDIA</Badge>
                              )}
                              <Badge variant="secondary">AI: {car.aiScore}</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                              <span>{car.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Gauge className="h-3 w-3 text-muted-foreground" />
                              <span>{car.mileage}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <PaintBucket className="h-3 w-3 text-muted-foreground" />
                              <span>{car.color}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Settings className="h-3 w-3 text-muted-foreground" />
                              <span>{car.transmission}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2">
                            <div>
                              <p className="text-xl font-bold text-primary">
                                Rp {car.price.toLocaleString('id-ID')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                DP: Rp {car.dp.toLocaleString('id-ID')}
                              </p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className={car.sold ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}
                              >
                                {car.sold ? "Buka Kembali" : "Tandai Terjual"}
                              </Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/20">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Form tambah mobil baru */}
              <Card className="shadow-neon bg-gradient-card border border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Tambah Mobil Baru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carName">Nama Mobil</Label>
                      <Input
                        id="carName"
                        value={newCar.name}
                        onChange={(e) => setNewCar(prev => ({...prev, name: e.target.value}))}
                        placeholder="Toyota Avanza 1.3 G"
                        className="bg-gradient-glass backdrop-blur-glass"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carYear">Tahun</Label>
                      <Input
                        id="carYear"
                        type="number"
                        value={newCar.year}
                        onChange={(e) => setNewCar(prev => ({...prev, year: Number(e.target.value)}))}
                        className="bg-gradient-glass backdrop-blur-glass"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carPrice">Harga</Label>
                      <Input
                        id="carPrice"
                        type="number"
                        value={newCar.price}
                        onChange={(e) => setNewCar(prev => ({...prev, price: Number(e.target.value)}))}
                        placeholder="150000000"
                        className="bg-gradient-glass backdrop-blur-glass"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carMileage">Kilometer</Label>
                      <Input
                        id="carMileage"
                        value={newCar.mileage}
                        onChange={(e) => setNewCar(prev => ({...prev, mileage: e.target.value}))}
                        placeholder="45.000 km"
                        className="bg-gradient-glass backdrop-blur-glass"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carColor">Warna</Label>
                      <Input
                        id="carColor"
                        value={newCar.color}
                        onChange={(e) => setNewCar(prev => ({...prev, color: e.target.value}))}
                        placeholder="Putih"
                        className="bg-gradient-glass backdrop-blur-glass"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carTransmission">Transmisi</Label>
                      <Input
                        id="carTransmission"
                        value={newCar.transmission}
                        onChange={(e) => setNewCar(prev => ({...prev, transmission: e.target.value}))}
                        placeholder="Manual/CVT/Automatic"
                        className="bg-gradient-glass backdrop-blur-glass"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carDescription">Deskripsi</Label>
                    <Textarea
                      id="carDescription"
                      value={newCar.description}
                      onChange={(e) => setNewCar(prev => ({...prev, description: e.target.value}))}
                      rows={3}
                      placeholder="Deskripsi detail kondisi mobil..."
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carImages">URL Gambar</Label>
                    <Input
                      id="carImages"
                      value={newCar.images[0]}
                      onChange={(e) => setNewCar(prev => ({...prev, images: [e.target.value]}))}
                      placeholder="https://example.com/car-image.jpg"
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  
                  <Button 
                    onClick={() => handleSave('Stock Mobil')}
                    disabled={loading}
                    className="bg-gradient-primary hover:shadow-neon"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Mobil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Tema & Warna */}
          <TabsContent value="theme">
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Tema & Warna
                </CardTitle>
                <CardDescription>
                  Sesuaikan skema warna dan tampilan website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(settings.colors).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">
                        {key}
                      </Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-8 h-8 rounded border border-border"
                          style={{ backgroundColor: `hsl(${value})` }}
                        />
                        <Input
                          id={key}
                          value={value}
                          onChange={(e) => updateSetting(`colors.${key}`, e.target.value)}
                          placeholder="HSL values"
                          className="bg-gradient-glass backdrop-blur-glass"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => handleSave('Tema')}
                  disabled={loading}
                  className="bg-gradient-primary hover:shadow-neon"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Terapkan Tema
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Jam Kerja */}
          <TabsContent value="schedule">
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Jam Kerja
                </CardTitle>
                <CardDescription>
                  Atur jam operasional untuk setiap hari
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <Label className="w-20 capitalize">{day}</Label>
                    <Input
                      value={hours}
                      onChange={(e) => updateSetting(`workingHours.${day}`, e.target.value)}
                      placeholder="09:00 - 17:00 atau Tutup"
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                ))}
                <Button 
                  onClick={() => handleSave('Jam Kerja')}
                  disabled={loading}
                  className="bg-gradient-primary hover:shadow-neon"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Jadwal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Pengaturan Layanan */}
          <TabsContent value="services">
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Pengaturan Layanan
                </CardTitle>
                <CardDescription>
                  Aktifkan atau nonaktifkan fitur website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.services).map(([service, enabled]) => (
                  <div key={service} className="flex items-center justify-between p-3 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50">
                    <Label className="capitalize font-medium">
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <Badge variant={enabled ? "default" : "secondary"}>
                      {enabled ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                ))}
                <Button 
                  onClick={() => handleSave('Layanan')}
                  disabled={loading}
                  className="bg-gradient-primary hover:shadow-neon"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Pengaturan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Pengaturan Kredit */}
          <TabsContent value="credit">
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Pengaturan Kredit
                </CardTitle>
                <CardDescription>
                  Atur parameter simulasi kredit dan kalkulasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minDp">Minimum DP (%)</Label>
                    <Input
                      id="minDp"
                      type="number"
                      value={settings.creditSettings.minDp}
                      onChange={(e) => updateSetting('creditSettings.minDp', Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTenor">Maksimum Tenor (bulan)</Label>
                    <Input
                      id="maxTenor"
                      type="number"
                      value={settings.creditSettings.maxTenor}
                      onChange={(e) => updateSetting('creditSettings.maxTenor', Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Suku Bunga (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={settings.creditSettings.interestRate}
                      onChange={(e) => updateSetting('creditSettings.interestRate', Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminFee">Biaya Admin (Rp)</Label>
                    <Input
                      id="adminFee"
                      type="number"
                      value={settings.creditSettings.adminFee}
                      onChange={(e) => updateSetting('creditSettings.adminFee', Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handleSave('Kredit')}
                  disabled={loading}
                  className="bg-gradient-primary hover:shadow-neon"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Pengaturan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
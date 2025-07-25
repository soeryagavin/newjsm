import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Phone, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const ADMIN_PHONE = "08995053443";

  const sendOtp = async () => {
    if (phone !== ADMIN_PHONE) {
      toast({
        title: "Akses Ditolak",
        description: "Nomor telepon tidak terdaftar sebagai admin",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Terkirim",
        description: "Kode OTP telah dikirim ke WhatsApp Anda",
      });
    }, 2000);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    // Simulate OTP verification (in production, use real OTP verification)
    setTimeout(() => {
      if (otp === "123456") {
        setIsAuthenticated(true);
        toast({
          title: "Login Berhasil",
          description: "Selamat datang di Admin Dashboard",
        });
        
        // Redirect ke dashboard admin
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        toast({
          title: "OTP Salah",
          description: "Silakan periksa kembali kode OTP",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
              <Shield className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Admin Dashboard JSM+
              </h1>
            </div>
            <p className="text-muted-foreground">Kelola showroom mobil Anda dengan mudah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Kelola Mobil */}
            <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🚗 Kelola Mobil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tambah, edit, dan hapus unit mobil bekas
                </p>
                <Button className="w-full">Kelola Inventory</Button>
              </CardContent>
            </Card>

            {/* Story & Video */}
            <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📱 Story & Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload story dan kelola video highlight
                </p>
                <Button className="w-full">Kelola Konten</Button>
              </CardContent>
            </Card>

            {/* Pengaturan Showroom */}
            <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚙️ Pengaturan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Edit bio, lokasi, dan informasi showroom
                </p>
                <Button className="w-full">Pengaturan</Button>
              </CardContent>
            </Card>

            {/* Berita Otomotif */}
            <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📰 Berita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Kelola berita otomotif dan artikel
                </p>
                <Button className="w-full">Kelola Berita</Button>
              </CardContent>
            </Card>

            {/* Live Streaming */}
            <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📺 Live Stream
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Atur URL live streaming dan jadwal
                </p>
                <Button className="w-full">Pengaturan Stream</Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Lihat statistik pengunjung dan penjualan
                </p>
                <Button className="w-full">Lihat Analytics</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl shadow-primary/20 border-primary/20">
        <CardHeader className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full border border-primary/20 mx-auto">
            <Shield className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Masuk ke dashboard admin JSM+
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isOtpSent ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nomor WhatsApp Admin</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="08995053443"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <Button 
                onClick={sendOtp} 
                disabled={isLoading || !phone}
                className="w-full"
              >
                {isLoading ? "Mengirim OTP..." : "Kirim OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  OTP telah dikirim ke WhatsApp
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Gunakan kode: <span className="font-mono font-bold">123456</span> (demo)
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Kode OTP</label>
                <Input
                  placeholder="Masukkan 6 digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg font-mono border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOtpSent(false);
                    setOtp("");
                  }}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
                <Button 
                  onClick={verifyOtp} 
                  disabled={isLoading || otp.length !== 6}
                  className="flex-1"
                >
                  {isLoading ? "Verifikasi..." : "Masuk"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
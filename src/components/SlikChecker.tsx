import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  FileSearch,
  User,
  IdCard,
  Info
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SlikChecker = () => {
  const [formData, setFormData] = useState({
    nik: "",
    fullName: "",
    phoneNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nik || formData.nik.length !== 16) {
      toast({
        title: "NIK tidak valid",
        description: "NIK harus terdiri dari 16 digit",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.fullName) {
      toast({
        title: "Nama lengkap diperlukan",
        description: "Silakan masukkan nama lengkap sesuai KTP",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.phoneNumber) {
      toast({
        title: "Nomor telepon diperlukan",
        description: "Silakan masukkan nomor telepon aktif",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const checkSlik = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call to SLIK OJK
    setTimeout(() => {
      // Mock response - in real implementation, this would call actual SLIK API
      const mockResults = {
        status: "success",
        nik: formData.nik,
        name: formData.fullName,
        creditScore: Math.floor(Math.random() * 400) + 600, // Random score 600-999
        creditHistory: [
          {
            institution: "Bank XYZ",
            type: "KPR",
            amount: 250000000,
            status: "Lancar",
            remaining: 180000000
          },
          {
            institution: "Leasing ABC",
            type: "Kendaraan",
            amount: 80000000,
            status: "Lunas",
            remaining: 0
          }
        ],
        recommendations: {
          eligible: true,
          maxCredit: 150000000,
          riskLevel: "Low"
        }
      };
      
      setResults(mockResults);
      setIsLoading(false);
      
      toast({
        title: "Pengecekan SLIK berhasil",
        description: "Data riwayat kredit telah ditemukan",
      });
    }, 3000);
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 850) return "text-success";
    if (score >= 750) return "text-primary";
    if (score >= 650) return "text-yellow-600";
    return "text-destructive";
  };

  const getCreditScoreLabel = (score: number) => {
    if (score >= 850) return "Excellent";
    if (score >= 750) return "Very Good";
    if (score >= 650) return "Good";
    return "Fair";
  };

  return (
    <section id="slik" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Cek SLIK OJK
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Periksa riwayat kredit Anda melalui Sistem Layanan Informasi Keuangan OJK 
            untuk mengetahui kelayakan kredit kendaraan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-primary" />
                Informasi Pemohon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* NIK */}
              <div className="space-y-2">
                <Label htmlFor="nik" className="flex items-center gap-2">
                  <IdCard className="h-4 w-4" />
                  NIK (Nomor Induk Kependudukan)
                </Label>
                <Input
                  id="nik"
                  type="text"
                  value={formData.nik}
                  onChange={(e) => handleInputChange("nik", e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="Masukkan 16 digit NIK"
                  maxLength={16}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.nik.length}/16 digit
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nama Lengkap (sesuai KTP)
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Nomor Telepon
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="Masukkan nomor telepon aktif"
                />
              </div>

              {/* Disclaimer */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Informasi Penting:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Data yang Anda masukkan akan digunakan untuk pengecekan SLIK OJK</li>
                      <li>• Pastikan data sesuai dengan KTP dan dokumen resmi</li>
                      <li>• Proses pengecekan membutuhkan waktu 1-3 menit</li>
                      <li>• Data Anda akan dijaga kerahasiaannya</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={checkSlik} 
                className="w-full" 
                variant="automotive"
                disabled={isLoading || !formData.nik || !formData.fullName}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Mengecek SLIK...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Cek Riwayat Kredit
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Hasil Pengecekan SLIK
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Data Pemohon</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Nama:</strong> {results.name}</p>
                      <p><strong>NIK:</strong> {results.nik}</p>
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div className="text-center p-6 bg-gradient-primary rounded-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Credit Score</h3>
                    <p className="text-4xl font-bold mb-2">{results.creditScore}</p>
                    <Badge variant="secondary" className="bg-white text-primary">
                      {getCreditScoreLabel(results.creditScore)}
                    </Badge>
                  </div>

                  {/* Credit History */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <FileSearch className="h-4 w-4" />
                      Riwayat Kredit
                    </h4>
                    <div className="space-y-3">
                      {results.creditHistory.map((credit: any, index: number) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{credit.institution}</p>
                              <p className="text-sm text-muted-foreground">{credit.type}</p>
                            </div>
                            <Badge variant={credit.status === "Lancar" ? "secondary" : "secondary"} 
                                   className={credit.status === "Lancar" ? "bg-success text-success-foreground" : ""}>
                              {credit.status}
                            </Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <p><strong>Plafon:</strong> {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0
                            }).format(credit.amount)}</p>
                            {credit.remaining > 0 && (
                              <p><strong>Sisa:</strong> {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                              }).format(credit.remaining)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Rekomendasi Kredit
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Status Kelayakan:</span>
                        <Badge variant={results.recommendations.eligible ? "secondary" : "destructive"}
                               className={results.recommendations.eligible ? "bg-success text-success-foreground" : ""}>
                          {results.recommendations.eligible ? "Layak" : "Tidak Layak"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Maksimal Kredit:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                          }).format(results.recommendations.maxCredit)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <Badge variant="secondary">{results.recommendations.riskLevel}</Badge>
                      </div>
                    </div>
                  </div>

                  <Button variant="whatsapp" className="w-full" asChild>
                    <a 
                      href={`https://wa.me/6208995053443?text=Halo, saya sudah cek SLIK dengan score ${results.creditScore}. Ingin konsultasi kredit mobil.`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Konsultasi Kredit via WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">Belum ada hasil pengecekan</p>
                  <p className="text-sm">Isi formulir di sebelah kiri untuk memulai pengecekan SLIK</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SLIK Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-center">Tentang SLIK OJK</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Apa itu SLIK?
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Sistem Layanan Informasi Keuangan (SLIK) adalah sistem yang dikelola OJK 
                    untuk memberikan informasi riwayat kredit dan pembiayaan seseorang atau badan usaha.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Manfaat Cek SLIK
                  </h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Mengetahui credit score Anda</li>
                    <li>• Melihat riwayat kredit yang pernah diambil</li>
                    <li>• Mempersiapkan pengajuan kredit baru</li>
                    <li>• Memantau kesehatan keuangan</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SlikChecker;
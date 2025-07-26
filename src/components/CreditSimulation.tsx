import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, Building, Percent, Clock } from "lucide-react";

const CreditSimulation = () => {
  const [carPrice, setCarPrice] = useState<number>(165000000);
  const [downPayment, setDownPayment] = useState<number>(25000000);
  const [leasingCompany, setLeasingCompany] = useState<string>("");
  const [tenure, setTenure] = useState<number>(36);
  const [results, setResults] = useState<any>(null);

  const leasingOptions = [
    { 
      id: "bcaf", 
      name: "BCAF (BCA Finance)", 
      interestRate: 7.5, 
      insurance: 3.5
    },
    { 
      id: "muf", 
      name: "MUF (Mandiri Utama Finance)", 
      interestRate: 8.0, 
      insurance: 3.2
    },
    { 
      id: "oto", 
      name: "OTO Finance", 
      interestRate: 8.5, 
      insurance: 3.8
    },
    { 
      id: "adira", 
      name: "Adira Finance", 
      interestRate: 8.2, 
      insurance: 3.6
    }
  ];

  const tenureOptions = [
    { months: 12, years: "1 tahun" },
    { months: 24, years: "2 tahun" },
    { months: 36, years: "3 tahun" },
    { months: 48, years: "4 tahun" },
    { months: 60, years: "5 tahun" }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateCredit = () => {
    if (!leasingCompany || !carPrice || !downPayment) return;

    const selectedLeasing = leasingOptions.find(l => l.id === leasingCompany);
    if (!selectedLeasing) return;

    const principal = carPrice - downPayment;
    const monthlyRate = selectedLeasing.interestRate / 100 / 12;
    const numPayments = tenure;

    // Calculate monthly payment using PMT formula
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    const insuranceCost = (carPrice * selectedLeasing.insurance / 100) * (tenure / 12);

    const totalCosts = {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment + selectedLeasing.adminFee + insuranceCost),
      totalInterest: Math.round(totalInterest),
      adminFee: selectedLeasing.adminFee,
      insuranceCost: Math.round(insuranceCost),
      principal: principal
    };

    setResults(totalCosts);
  };

  return (
    <section id="credit" className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Simulasi Kredit Mobil
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hitung cicilan bulanan sesuai kemampuan Anda dengan berbagai pilihan leasing partner terpercaya.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Parameter Kredit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Car Price */}
              <div className="space-y-2">
                <Label htmlFor="carPrice">Harga Mobil</Label>
                <Input
                  id="carPrice"
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  placeholder="Masukkan harga mobil"
                />
                <p className="text-sm text-muted-foreground">
                  {formatPrice(carPrice)}
                </p>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <Label htmlFor="downPayment">Uang Muka (DP)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  placeholder="Masukkan uang muka"
                />
                <p className="text-sm text-muted-foreground">
                  {formatPrice(downPayment)} ({((downPayment / carPrice) * 100).toFixed(1)}% dari harga mobil)
                </p>
              </div>

              {/* Leasing Company */}
              <div className="space-y-2">
                <Label>Perusahaan Leasing</Label>
                <Select value={leasingCompany} onValueChange={setLeasingCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih perusahaan leasing" />
                  </SelectTrigger>
                  <SelectContent>
                    {leasingOptions.map((leasing) => (
                      <SelectItem key={leasing.id} value={leasing.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{leasing.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {leasing.interestRate}%
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenure */}
              <div className="space-y-2">
                <Label>Jangka Waktu Kredit</Label>
                <Select value={tenure.toString()} onValueChange={(value) => setTenure(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jangka waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenureOptions.map((option) => (
                      <SelectItem key={option.months} value={option.months.toString()}>
                        {option.years} ({option.months} bulan)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateCredit} 
                className="w-full" 
                variant="automotive"
                disabled={!leasingCompany || !carPrice || !downPayment}
              >
                <Calculator className="h-4 w-4" />
                Hitung Cicilan
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Hasil Simulasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Monthly Payment Highlight */}
                  <div className="text-center p-6 bg-gradient-primary rounded-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Cicilan Bulanan</h3>
                    <p className="text-3xl font-bold">{formatPrice(results.monthlyPayment)}</p>
                    <p className="text-sm opacity-90">per bulan selama {tenure / 12} tahun</p>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Rincian Biaya
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Pokok Pinjaman</span>
                        <span className="font-medium">{formatPrice(results.principal)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Total Bunga</span>
                        <span className="font-medium text-accent">{formatPrice(results.totalInterest)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground">Asuransi</span>
                        <span className="font-medium">{formatPrice(results.insuranceCost)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      Informasi Tambahan
                    </h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Suku bunga: {leasingOptions.find(l => l.id === leasingCompany)?.interestRate}% per tahun</p>
                      <p>• Perhitungan di atas adalah simulasi dan dapat berubah</p>
                      <p>• Syarat dan ketentuan berlaku sesuai kebijakan leasing</p>
                      <p>• Untuk perhitungan detail, silakan hubungi kami</p>
                    </div>
                  </div>

                  <Button variant="whatsapp" className="w-full" asChild>
                    <a 
                      href={`https://wa.me/6208995053443?text=Halo, saya ingin konsultasi kredit dengan cicilan ${formatPrice(results.monthlyPayment)}/bulan`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Konsultasi via WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Masukkan parameter kredit di sebelah kiri untuk melihat hasil simulasi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leasing Partners */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">
            Partner Leasing Terpercaya
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {leasingOptions.map((leasing) => (
              <Card key={leasing.id} className="text-center hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {leasing.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold mb-2">{leasing.name}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Bunga: {leasing.interestRate}%</p>
                    <p>Admin: {formatPrice(leasing.adminFee)}</p>
                    <p>Asuransi: {leasing.insurance}%</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditSimulation;
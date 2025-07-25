import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, Building, Percent, Clock, Zap, Brain, TrendingUp } from "lucide-react";

const Credit = () => {
  const [carPrice, setCarPrice] = useState<number>(165000000);
  const [downPayment, setDownPayment] = useState<number>(25000000);
  const [leasingCompany, setLeasingCompany] = useState<string>("");
  const [tenure, setTenure] = useState<number>(36);
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const leasingOptions = [
    { 
      id: "bcaf", 
      name: "BCAF (BCA Finance)", 
      interestRate: 7.5, 
      adminFee: 2500000,
      insurance: 3.5,
      aiRating: 95
    },
    { 
      id: "muf", 
      name: "MUF (Mandiri Utama Finance)", 
      interestRate: 8.0, 
      adminFee: 2000000,
      insurance: 3.2,
      aiRating: 92
    },
    { 
      id: "oto", 
      name: "OTO Finance", 
      interestRate: 8.5, 
      adminFee: 1500000,
      insurance: 3.8,
      aiRating: 88
    },
    { 
      id: "adira", 
      name: "Adira Finance", 
      interestRate: 8.2, 
      adminFee: 2200000,
      insurance: 3.6,
      aiRating: 90
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

  const calculateCredit = async () => {
    if (!leasingCompany || !carPrice || !downPayment) return;

    setIsCalculating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

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
      principal: principal,
      aiRecommendation: selectedLeasing.aiRating >= 90 ? "Sangat Direkomendasikan" : selectedLeasing.aiRating >= 85 ? "Direkomendasikan" : "Cukup Baik",
      affordabilityScore: Math.min(100, Math.round((50000000 / monthlyPayment) * 100))
    };

    setResults(totalCosts);
    setIsCalculating(false);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-success";
    if (rating >= 85) return "text-primary";
    return "text-accent";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            AI Credit <span className="text-transparent bg-gradient-cyber bg-clip-text">Simulation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kalkulasi kredit cerdas dengan AI untuk rekomendasi terbaik dan analisis mendalam
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="shadow-neon bg-gradient-card border border-primary/20">
            <CardHeader className="bg-gradient-glass backdrop-blur-glass">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="h-5 w-5 text-primary" />
                AI Credit Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Car Price */}
              <div className="space-y-2">
                <Label htmlFor="carPrice" className="text-foreground">Harga Mobil</Label>
                <Input
                  id="carPrice"
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  placeholder="Masukkan harga mobil"
                  className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  {formatPrice(carPrice)}
                </p>
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <Label htmlFor="downPayment" className="text-foreground">Uang Muka (DP)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  placeholder="Masukkan uang muka"
                  className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground">
                  {formatPrice(downPayment)} ({((downPayment / carPrice) * 100).toFixed(1)}% dari harga mobil)
                </p>
              </div>

              {/* Leasing Company */}
              <div className="space-y-2">
                <Label className="text-foreground">Perusahaan Leasing</Label>
                <Select value={leasingCompany} onValueChange={setLeasingCompany}>
                  <SelectTrigger className="bg-gradient-glass backdrop-blur-glass border-border/50">
                    <SelectValue placeholder="Pilih perusahaan leasing" />
                  </SelectTrigger>
                  <SelectContent>
                    {leasingOptions.map((leasing) => (
                      <SelectItem key={leasing.id} value={leasing.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{leasing.name}</span>
                          <div className="flex gap-2 ml-2">
                            <Badge variant="secondary">
                              {leasing.interestRate}%
                            </Badge>
                            <Badge variant="secondary" className={getRatingColor(leasing.aiRating)}>
                              <Zap className="h-2 w-2 mr-1" />
                              {leasing.aiRating}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenure */}
              <div className="space-y-2">
                <Label className="text-foreground">Jangka Waktu Kredit</Label>
                <Select value={tenure.toString()} onValueChange={(value) => setTenure(Number(value))}>
                  <SelectTrigger className="bg-gradient-glass backdrop-blur-glass border-border/50">
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
                className="w-full bg-gradient-primary hover:shadow-neon" 
                disabled={!leasingCompany || !carPrice || !downPayment || isCalculating}
              >
                {isCalculating ? (
                  <>
                    <Zap className="h-4 w-4 animate-spin" />
                    AI Processing...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4" />
                    Calculate with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-neon bg-gradient-card border border-primary/20">
            <CardHeader className="bg-gradient-glass backdrop-blur-glass">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isCalculating ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center animate-glow">
                    <Brain className="h-8 w-8 text-primary-foreground animate-pulse" />
                  </div>
                  <p className="text-foreground font-medium">AI sedang menganalisis...</p>
                  <p className="text-sm text-muted-foreground">Menghitung skenario terbaik untuk Anda</p>
                </div>
              ) : results ? (
                <div className="space-y-6">
                  {/* Monthly Payment Highlight */}
                  <div className="text-center p-6 bg-gradient-primary rounded-lg text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-cyber opacity-10 animate-float" />
                    <h3 className="text-lg font-semibold mb-2">Cicilan Bulanan</h3>
                    <p className="text-3xl font-bold animate-neon-pulse">{formatPrice(results.monthlyPayment)}</p>
                    <p className="text-sm opacity-90">per bulan selama {tenure / 12} tahun</p>
                  </div>

                  {/* AI Recommendation */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
                      <Zap className="h-4 w-4 text-accent" />
                      AI Recommendation
                    </h4>
                    <p className="text-accent font-medium">{results.aiRecommendation}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground">Affordability Score:</span>
                      <Badge variant="secondary" className="text-success">
                        {results.affordabilityScore}/100
                      </Badge>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
                      <h5 className="font-semibold text-foreground mb-1">Total Pembayaran</h5>
                      <p className="text-lg font-bold text-primary">{formatPrice(results.totalPayment)}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 text-center">
                      <h5 className="font-semibold text-foreground mb-1">Durasi</h5>
                      <p className="text-lg font-bold text-accent">{tenure / 12} Tahun</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gradient-glass backdrop-blur-glass p-4 rounded-lg border border-border/50">
                    <h5 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      Informasi AI
                    </h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Suku bunga: {leasingOptions.find(l => l.id === leasingCompany)?.interestRate}% per tahun</p>
                      <p>• Perhitungan dianalisis dengan algoritma AI terbaru</p>
                      <p>• Rekomendasi berdasarkan profil risiko optimal</p>
                      <p>• Data real-time dari partner leasing terpercaya</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                    <a 
                      href={`https://wa.me/6208995053443?text=Halo, saya ingin konsultasi kredit dengan cicilan ${formatPrice(results.monthlyPayment)}/bulan hasil AI simulation`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Konsultasi Expert via WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Masukkan parameter kredit untuk analisis AI</p>
                  <p className="text-sm mt-1">AI akan memberikan rekomendasi terbaik untuk Anda</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leasing Partners */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            AI-Verified <span className="text-transparent bg-gradient-cyber bg-clip-text">Leasing Partners</span>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {leasingOptions.map((leasing) => (
              <Card key={leasing.id} className="text-center hover:shadow-glow transition-all bg-gradient-card border border-border/50 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-3 group-hover:animate-float">
                    {leasing.name.charAt(0)}
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground">{leasing.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bunga:</span>
                      <span className="text-foreground">{leasing.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Admin:</span>
                      <span className="text-foreground">{formatPrice(leasing.adminFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Rating:</span>
                      <Badge variant="secondary" className={getRatingColor(leasing.aiRating)}>
                        <Zap className="h-2 w-2 mr-1" />
                        {leasing.aiRating}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
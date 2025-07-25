import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Zap, Building2, ArrowRight, Scale } from "lucide-react";

const CreditComparison = () => {
  const [carPrice, setCarPrice] = useState<number>(165000000);
  const [downPayment, setDownPayment] = useState<number>(25000000);
  const [tenure, setTenure] = useState<number>(36);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const leasingOptions = [
    { 
      id: "bcaf", 
      name: "BCAF", 
      fullName: "BCA Finance",
      interestRate: 7.5, 
      adminFee: 2500000,
      insurance: 3.5,
      aiRating: 95,
      features: ["Proses cepat", "Digital approval", "Asuransi all risk"]
    },
    { 
      id: "muf", 
      name: "MUF", 
      fullName: "Mandiri Utama Finance",
      interestRate: 8.0, 
      adminFee: 2000000,
      insurance: 3.2,
      aiRating: 92,
      features: ["Syarat mudah", "Bunga kompetitif", "Jaringan luas"]
    },
    { 
      id: "oto", 
      name: "OTO", 
      fullName: "OTO Finance",
      interestRate: 8.5, 
      adminFee: 1500000,
      insurance: 3.8,
      aiRating: 88,
      features: ["Biaya admin rendah", "Flexible payment", "Quick approval"]
    },
    { 
      id: "adira", 
      name: "Adira", 
      fullName: "Adira Finance",
      interestRate: 8.2, 
      adminFee: 2200000,
      insurance: 3.6,
      aiRating: 90,
      features: ["Berpengalaman", "Layanan prima", "Multi brand"]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateAllComparisons = async () => {
    if (!carPrice || !downPayment) return;

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const results = leasingOptions.map(leasing => {
      const principal = carPrice - downPayment;
      const monthlyRate = leasing.interestRate / 100 / 12;
      const numPayments = tenure;

      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalPayment = monthlyPayment * numPayments;
      const insuranceCost = (carPrice * leasing.insurance / 100) * (tenure / 12);
      const totalCost = totalPayment + leasing.adminFee + insuranceCost;

      return {
        ...leasing,
        monthlyPayment: Math.round(monthlyPayment),
        totalCost: Math.round(totalCost),
        savings: 0 // Will be calculated after sorting
      };
    });

    // Sort by monthly payment and calculate savings
    results.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
    const cheapest = results[0].monthlyPayment;
    results.forEach(result => {
      result.savings = result.monthlyPayment - cheapest;
    });

    setComparisons(results);
    setIsCalculating(false);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-success";
    if (rating >= 85) return "text-primary";
    return "text-accent";
  };

  const getBestChoice = () => {
    if (comparisons.length === 0) return null;
    return comparisons[0]; // Already sorted by monthly payment
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Credit <span className="text-transparent bg-gradient-cyber bg-clip-text">Comparison</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bandingkan penawaran kredit dari semua leasing partner untuk mendapatkan deal terbaik
          </p>
        </div>

        {/* Input Section */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-neon bg-gradient-card border border-primary/20">
          <CardHeader className="bg-gradient-glass backdrop-blur-glass">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Scale className="h-5 w-5 text-primary" />
              Parameter Perbandingan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carPrice" className="text-foreground">Harga Mobil</Label>
                <Input
                  id="carPrice"
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">{formatPrice(carPrice)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment" className="text-foreground">Uang Muka</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">{formatPrice(downPayment)}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenure" className="text-foreground">Tenure (Bulan)</Label>
                <Input
                  id="tenure"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">{tenure / 12} tahun</p>
              </div>
            </div>

            <Button 
              onClick={calculateAllComparisons} 
              className="w-full bg-gradient-primary hover:shadow-neon" 
              disabled={!carPrice || !downPayment || isCalculating}
            >
              {isCalculating ? (
                <>
                  <Zap className="h-4 w-4 animate-spin" />
                  Comparing All Options...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4" />
                  Compare All Leasing Options
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {isCalculating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center animate-glow">
              <Scale className="h-8 w-8 text-primary-foreground animate-pulse" />
            </div>
            <p className="text-foreground font-medium">Membandingkan semua opsi...</p>
            <p className="text-sm text-muted-foreground">Mencari penawaran terbaik untuk Anda</p>
          </div>
        ) : comparisons.length > 0 ? (
          <div className="space-y-8">
            {/* Best Choice Highlight */}
            {getBestChoice() && (
              <Card className="max-w-4xl mx-auto shadow-glow bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30">
                <CardHeader className="text-center bg-gradient-glass backdrop-blur-glass">
                  <CardTitle className="flex items-center justify-center gap-2 text-foreground">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Rekomendasi Terbaik
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{getBestChoice()?.fullName}</h3>
                    <p className="text-4xl font-bold text-primary mb-2">{formatPrice(getBestChoice()?.monthlyPayment || 0)}</p>
                    <p className="text-muted-foreground">per bulan</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="font-semibold text-foreground">{formatPrice(getBestChoice()?.totalCost || 0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">AI Rating</p>
                      <Badge variant="secondary" className={getRatingColor(getBestChoice()?.aiRating || 0)}>
                        <Zap className="h-2 w-2 mr-1" />
                        {getBestChoice()?.aiRating}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Interest</p>
                      <p className="font-semibold text-foreground">{getBestChoice()?.interestRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Comparisons */}
            <div className="grid gap-6">
              {comparisons.map((comparison, index) => (
                <Card key={comparison.id} className={`shadow-neon transition-all hover:shadow-glow ${index === 0 ? 'border border-primary/40 bg-gradient-card' : 'bg-gradient-card border border-border/50'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
                          {comparison.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{comparison.fullName}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={getRatingColor(comparison.aiRating)}>
                              <Zap className="h-2 w-2 mr-1" />
                              {comparison.aiRating}
                            </Badge>
                            {index === 0 && (
                              <Badge variant="default" className="bg-primary text-primary-foreground">
                                Best Deal
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{formatPrice(comparison.monthlyPayment)}</p>
                        <p className="text-sm text-muted-foreground">per bulan</p>
                        {comparison.savings > 0 && (
                          <p className="text-xs text-accent">+{formatPrice(comparison.savings)} vs terbaik</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Cost</p>
                        <p className="font-semibold text-foreground">{formatPrice(comparison.totalCost)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-semibold text-foreground">{comparison.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Admin Fee</p>
                        <p className="font-semibold text-foreground">{formatPrice(comparison.adminFee)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Insurance</p>
                        <p className="font-semibold text-foreground">{comparison.insurance}%</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {comparison.features.map((feature: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                <a 
                  href={`https://wa.me/6208995053443?text=Halo, saya tertarik dengan perbandingan kredit. Cicilan terbaik: ${formatPrice(getBestChoice()?.monthlyPayment || 0)}/bulan`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Diskusi Hasil Perbandingan <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreditComparison;
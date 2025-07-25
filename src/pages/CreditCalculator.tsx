import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, PieChart, TrendingUp, DollarSign, Calendar, Target, Brain } from "lucide-react";

const CreditCalculator = () => {
  const [mode, setMode] = useState<'payment' | 'budget'>('payment');
  const [carPrice, setCarPrice] = useState<number>(165000000);
  const [downPayment, setDownPayment] = useState<number>(25000000);
  const [interestRate, setInterestRate] = useState<number>(8.0);
  const [tenure, setTenure] = useState<number>(36);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(5000000);
  const [results, setResults] = useState<any>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateFromPayment = () => {
    const principal = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = tenure;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: principal,
      interestRate: interestRate,
      tenure: tenure,
      downPaymentPercentage: ((downPayment / carPrice) * 100).toFixed(1)
    };
  };

  const calculateFromBudget = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = tenure;

    // Calculate principal from monthly budget
    const principal = (monthlyBudget * (Math.pow(1 + monthlyRate, numPayments) - 1)) / 
                     (monthlyRate * Math.pow(1 + monthlyRate, numPayments));

    const maxCarPrice = principal + downPayment;
    const totalPayment = monthlyBudget * numPayments;
    const totalInterest = totalPayment - principal;

    return {
      maxCarPrice: Math.round(maxCarPrice),
      monthlyPayment: monthlyBudget,
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal),
      downPaymentPercentage: ((downPayment / maxCarPrice) * 100).toFixed(1),
      affordabilityScore: Math.min(100, Math.round((principal / 150000000) * 100))
    };
  };

  useEffect(() => {
    if (mode === 'payment') {
      setResults(calculateFromPayment());
    } else {
      setResults(calculateFromBudget());
    }
  }, [carPrice, downPayment, interestRate, tenure, monthlyBudget, mode]);

  const getAffordabilityColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-accent";
    return "text-warning";
  };

  const scenarios = [
    { name: "Konservatif", rate: 7.5, tenure: 24, dp: 30 },
    { name: "Moderat", rate: 8.0, tenure: 36, dp: 25 },
    { name: "Agresif", rate: 8.5, tenure: 48, dp: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Advanced <span className="text-transparent bg-gradient-cyber bg-clip-text">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kalkulator kredit canggih dengan berbagai mode perhitungan dan analisis mendalam
          </p>
        </div>

        <Tabs value={mode} onValueChange={(value) => setMode(value as 'payment' | 'budget')} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Hitung Cicilan
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Tentukan Budget
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Payment Mode Input */}
              <Card className="shadow-neon bg-gradient-card border border-primary/20">
                <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Calculator className="h-5 w-5 text-primary" />
                    Parameter Kendaraan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="carPrice" className="text-foreground">Harga Mobil</Label>
                    <Input
                      id="carPrice"
                      type="number"
                      value={carPrice}
                      onChange={(e) => setCarPrice(Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground">{formatPrice(carPrice)}</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-foreground">Uang Muka: {formatPrice(downPayment)} ({((downPayment / carPrice) * 100).toFixed(1)}%)</Label>
                    <Slider
                      value={[downPayment]}
                      onValueChange={(value) => setDownPayment(value[0])}
                      max={carPrice * 0.5}
                      min={carPrice * 0.1}
                      step={1000000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-foreground">Suku Bunga: {interestRate}% per tahun</Label>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={15}
                      min={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-foreground">Jangka Waktu: {tenure} bulan ({(tenure / 12).toFixed(1)} tahun)</Label>
                    <Slider
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      max={84}
                      min={12}
                      step={6}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 tahun</span>
                      <span>7 tahun</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className="shadow-neon bg-gradient-card border border-primary/20">
                <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Hasil Perhitungan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {results && (
                    <>
                      <div className="text-center p-6 bg-gradient-primary rounded-lg text-primary-foreground">
                        <h3 className="text-lg font-semibold mb-2">Cicilan Bulanan</h3>
                        <p className="text-3xl font-bold">{formatPrice(results.monthlyPayment)}</p>
                        <p className="text-sm opacity-90">per bulan selama {(results.tenure / 12).toFixed(1)} tahun</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50 text-center">
                          <DollarSign className="h-6 w-6 mx-auto text-primary mb-2" />
                          <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                          <p className="font-semibold text-foreground">{formatPrice(results.totalPayment)}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50 text-center">
                          <PieChart className="h-6 w-6 mx-auto text-accent mb-2" />
                          <p className="text-sm text-muted-foreground">Total Bunga</p>
                          <p className="font-semibold text-accent">{formatPrice(results.totalInterest)}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pokok Pinjaman</span>
                          <span className="font-medium text-foreground">{formatPrice(results.principal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Persentase DP</span>
                          <span className="font-medium text-foreground">{results.downPaymentPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Effective Rate</span>
                          <span className="font-medium text-foreground">{((results.totalInterest / results.principal) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Budget Mode Input */}
              <Card className="shadow-neon bg-gradient-card border border-primary/20">
                <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5 text-primary" />
                    Budget & Preferensi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyBudget" className="text-foreground">Budget Cicilan Bulanan</Label>
                    <Input
                      id="monthlyBudget"
                      type="number"
                      value={monthlyBudget}
                      onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground">{formatPrice(monthlyBudget)}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="downPaymentBudget" className="text-foreground">Uang Muka Tersedia</Label>
                    <Input
                      id="downPaymentBudget"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="bg-gradient-glass backdrop-blur-glass border-border/50 text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground">{formatPrice(downPayment)}</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-foreground">Target Suku Bunga: {interestRate}%</Label>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={12}
                      min={6}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-foreground">Jangka Waktu: {tenure} bulan</Label>
                    <Slider
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      max={60}
                      min={12}
                      step={6}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Budget Results */}
              <Card className="shadow-neon bg-gradient-card border border-primary/20">
                <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Brain className="h-5 w-5 text-primary" />
                    Rekomendasi Mobil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {results && (
                    <>
                      <div className="text-center p-6 bg-gradient-primary rounded-lg text-primary-foreground">
                        <h3 className="text-lg font-semibold mb-2">Maksimal Harga Mobil</h3>
                        <p className="text-3xl font-bold">{formatPrice(results.maxCarPrice)}</p>
                        <p className="text-sm opacity-90">dengan budget {formatPrice(monthlyBudget)}/bulan</p>
                      </div>

                      <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
                          <Brain className="h-4 w-4 text-accent" />
                          Affordability Score
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getAffordabilityColor(results.affordabilityScore)}>
                            {results.affordabilityScore}/100
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {results.affordabilityScore >= 80 ? "Sangat Terjangkau" : 
                             results.affordabilityScore >= 60 ? "Terjangkau" : 
                             results.affordabilityScore >= 40 ? "Cukup Terjangkau" : "Perlu Pertimbangan"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pokok Pinjaman</span>
                          <span className="font-medium text-foreground">{formatPrice(results.principal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Pembayaran</span>
                          <span className="font-medium text-foreground">{formatPrice(results.totalPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Bunga</span>
                          <span className="font-medium text-accent">{formatPrice(results.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Persentase DP</span>
                          <span className="font-medium text-foreground">{results.downPaymentPercentage}%</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Scenario Analysis */}
        <Card className="mt-8 shadow-neon bg-gradient-card border border-primary/20">
          <CardHeader className="bg-gradient-glass backdrop-blur-glass">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <PieChart className="h-5 w-5 text-primary" />
              Analisis Skenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {scenarios.map((scenario, index) => {
                const principal = (mode === 'payment' ? carPrice : results?.maxCarPrice || 0) - (downPayment * scenario.dp / 25);
                const monthlyRate = scenario.rate / 100 / 12;
                const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, scenario.tenure)) / 
                                     (Math.pow(1 + monthlyRate, scenario.tenure) - 1);

                return (
                  <div key={scenario.name} className="p-4 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50">
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {scenario.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bunga</span>
                        <span className="text-foreground">{scenario.rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tenure</span>
                        <span className="text-foreground">{scenario.tenure} bulan</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">DP</span>
                        <span className="text-foreground">{scenario.dp}%</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-border/50">
                        <span className="text-muted-foreground">Cicilan</span>
                        <span className="text-primary">{formatPrice(Math.round(monthlyPayment))}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
            <a 
              href={`https://wa.me/6208995053443?text=Halo, saya telah menggunakan kalkulator kredit. ${mode === 'payment' ? `Cicilan: ${formatPrice(results?.monthlyPayment || 0)}` : `Budget: ${formatPrice(monthlyBudget)}`}`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              Konsultasi Hasil Perhitungan
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreditCalculator;
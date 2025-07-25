import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Search,
  Brain,
  Database,
  Zap,
  TrendingUp,
  TrendingDown,
  Info
} from "lucide-react";

const SLIK = () => {
  const [nik, setNik] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);

  const checkSLIK = async () => {
    if (!nik || !fullName) return;

    setIsChecking(true);
    
    // Simulate SLIK checking process
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock SLIK data
    const mockResults = {
      creditScore: Math.floor(Math.random() * 300) + 600, // 600-900
      status: "Good",
      lastUpdate: new Date().toISOString().split('T')[0],
      creditHistory: [
        {
          bank: "Bank BCA",
          type: "Kredit Kendaraan",
          amount: 120000000,
          status: "Lunas",
          startDate: "2020-01-15",
          endDate: "2023-01-15",
          performance: "Lancar"
        },
        {
          bank: "Bank Mandiri",
          type: "Kartu Kredit",
          amount: 15000000,
          status: "Aktif",
          startDate: "2021-06-01",
          endDate: "2026-06-01",
          performance: "Lancar"
        },
        {
          bank: "BRI Finance",
          type: "Kredit Konsumen",
          amount: 50000000,
          status: "Aktif",
          startDate: "2022-03-10",
          endDate: "2025-03-10",
          performance: "Lancar"
        }
      ],
      recommendations: [
        "Profil kredit Anda sangat baik",
        "Recommended untuk kredit kendaraan",
        "Dapat memperoleh suku bunga kompetitif",
        "Limit kredit optimal: Rp 200-300 juta"
      ],
      riskLevel: "Low",
      aiAnalysis: {
        paymentBehavior: 85,
        creditUtilization: 45,
        creditAge: 78,
        accountMix: 92
      }
    };

    setResults(mockResults);
    setIsChecking(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-primary";
    return "text-destructive";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 800) return "Excellent";
    if (score >= 750) return "Very Good";
    if (score >= 650) return "Good";
    if (score >= 550) return "Fair";
    return "Poor";
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-success";
      case "Medium": return "text-primary";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            AI SLIK <span className="text-transparent bg-gradient-cyber bg-clip-text">Checker</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cek riwayat kredit Anda dengan teknologi AI dan analisis mendalam dari database OJK
          </p>
        </div>

        {/* Input Form */}
        <Card className="shadow-neon bg-gradient-card border border-primary/20 mb-8">
          <CardHeader className="bg-gradient-glass backdrop-blur-glass">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Database className="h-5 w-5 text-primary" />
              SLIK Credit Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nik" className="text-foreground">NIK (Nomor Induk Kependudukan)</Label>
                <Input
                  id="nik"
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="Masukkan NIK 16 digit"
                  maxLength={16}
                  className="bg-gradient-glass backdrop-blur-glass border-border/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sesuai KTP"
                  className="bg-gradient-glass backdrop-blur-glass border-border/50"
                />
              </div>
            </div>

            <Button 
              onClick={checkSLIK} 
              className="w-full bg-gradient-primary hover:shadow-neon" 
              disabled={!nik || !fullName || isChecking}
            >
              {isChecking ? (
                <>
                  <Zap className="h-4 w-4 animate-spin" />
                  Scanning SLIK Database...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Check Credit History
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>🔒 Data Anda aman dan terenkripsi</p>
              <p>📊 Terhubung langsung dengan database OJK</p>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isChecking && (
          <Card className="shadow-glow bg-gradient-card border border-primary/20 mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center animate-glow">
                  <Brain className="h-10 w-10 text-primary-foreground animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI Analyzing Your Credit Profile</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🔍 Scanning SLIK OJK Database</p>
                  <p>🧠 AI Processing Credit History</p>
                  <p>📊 Generating Risk Assessment</p>
                </div>
                <Progress value={66} className="mt-4 w-full h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results && !isChecking && (
          <div className="space-y-6">
            {/* Credit Score Overview */}
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Credit Score Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Score Display */}
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(results.creditScore)} animate-neon-pulse`}>
                      {results.creditScore}
                    </div>
                    <div className="space-y-1">
                      <Badge variant="secondary" className={getScoreColor(results.creditScore)}>
                        {getScoreGrade(results.creditScore)}
                      </Badge>
                      <p className="text-sm text-muted-foreground">Credit Score</p>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Shield className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className={getRiskColor(results.riskLevel)}>
                      {results.riskLevel} Risk
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">Risk Assessment</p>
                  </div>

                  {/* Last Update */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-accent flex items-center justify-center">
                      <Clock className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <p className="font-semibold text-foreground">{results.lastUpdate}</p>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="shadow-glow bg-gradient-card border border-accent/20">
              <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Brain className="h-5 w-5 text-accent" />
                  AI Deep Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(results.aiAnalysis).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-medium text-foreground">{value as number}%</span>
                    </div>
                    <Progress value={value as number} className="h-2" />
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>

            {/* Credit History */}
            <Card className="shadow-neon bg-gradient-card border border-primary/20">
              <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Credit History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {results.creditHistory.map((item: any, index: number) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-glass backdrop-blur-glass border border-border/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{item.bank}</h4>
                          <p className="text-sm text-muted-foreground">{item.type}</p>
                        </div>
                        <Badge variant={item.status === "Lunas" ? "secondary" : "outline"} 
                               className={item.status === "Lunas" ? "text-success border-success" : "text-primary border-primary"}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Amount: </span>
                          <span className="font-medium text-foreground">{formatCurrency(item.amount)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Period: </span>
                          <span className="font-medium text-foreground">{item.startDate} - {item.endDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Performance: </span>
                          <Badge variant="secondary" className="text-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {item.performance}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="shadow-glow bg-gradient-card border border-success/20">
              <CardHeader className="bg-gradient-glass backdrop-blur-glass">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Zap className="h-5 w-5 text-success" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {results.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-success/10 to-primary/10 border border-success/20">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground" asChild>
                    <a 
                      href={`https://wa.me/6208995053443?text=Halo, saya sudah cek SLIK score ${results.creditScore} dan ingin konsultasi kredit`}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Konsultasi Credit Expert
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        {!results && !isChecking && (
          <Card className="shadow-card bg-gradient-glass backdrop-blur-glass border border-border/50">
            <CardContent className="p-6">
              <div className="text-center">
                <Info className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Tentang SLIK Check</h3>
                <div className="text-sm text-muted-foreground space-y-2 max-w-lg mx-auto">
                  <p>SLIK (Sistem Layanan Informasi Keuangan) adalah database kredit nasional yang dikelola oleh OJK</p>
                  <p>Layanan ini membantu Anda memahami profil kredit dan meningkatkan peluang persetujuan</p>
                  <p>Data yang ditampilkan adalah simulasi untuk demo purposes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SLIK;
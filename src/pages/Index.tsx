import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CarShowcase from "@/components/CarShowcase";
import CreditSimulation from "@/components/CreditSimulation";
import SlikChecker from "@/components/SlikChecker";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CarShowcase />
        <CreditSimulation />
        <SlikChecker />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

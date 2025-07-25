import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  Car, 
  Phone, 
  MapPin,
  Calculator,
  CreditCard,
  Home,
  MessageCircle,
  Zap,
  Shield,
  ChevronDown,
  Scale,
  Target
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cars", href: "/cars", icon: Car },
    { name: "SLIK", href: "/slik", icon: CreditCard },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Admin", href: "/admin", icon: Shield },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-primary/20 bg-gradient-card backdrop-blur-glass supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all group">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground animate-glow group-hover:scale-110 transition-transform">
            <Zap className="h-7 w-7" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              <span className="text-transparent bg-gradient-cyber bg-clip-text animate-neon-pulse">JSM+</span>
            </h1>
            <p className="text-sm text-accent font-medium">by Jaya Setia Mobilindo</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-1 text-sm font-medium transition-all hover:text-primary hover:shadow-glow px-3 py-2 rounded-lg ${
                isActive(item.href) ? 'text-primary bg-primary/10 shadow-glow' : 'text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Credit Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`flex items-center space-x-1 text-sm font-medium transition-all hover:text-primary hover:shadow-glow px-3 py-2 rounded-lg ${
                location.pathname.startsWith('/credit') ? 'text-primary bg-primary/10 shadow-glow' : 'text-foreground'
              }`}>
                <Calculator className="h-4 w-4" />
                <span>Credit</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-gradient-card backdrop-blur-glass border-primary/20">
              <DropdownMenuItem asChild>
                <Link to="/credit" className="flex items-center gap-2 w-full">
                  <Calculator className="h-4 w-4" />
                  Simulasi Kredit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/credit/comparison" className="flex items-center gap-2 w-full">
                  <Scale className="h-4 w-4" />
                  Perbandingan Kredit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/credit/calculator" className="flex items-center gap-2 w-full">
                  <Target className="h-4 w-4" />
                  Kalkulator Advanced
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Contact CTA */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-right text-xs">
            <p className="font-medium text-foreground">Future Contact</p>
            <p className="text-accent">08995053443</p>
          </div>
          <Button variant="outline" size="sm" className="border-success text-success hover:bg-success hover:text-success-foreground hover:shadow-glow" asChild>
            <a href="https://wa.me/6208995053443" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto text-foreground hover:bg-primary/20 hover:shadow-glow"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-gradient-card backdrop-blur-glass">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all hover:bg-primary/20 hover:shadow-glow ${
                  isActive(item.href) ? 'text-primary bg-primary/10' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile Credit Links */}
            <div className="border-t border-border/50 pt-3 mt-3">
              <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 px-3">
                <Calculator className="h-4 w-4" />
                Credit Services
              </p>
              <Link
                to="/credit"
                className={`flex items-center space-x-3 px-6 py-2 rounded-md text-sm font-medium transition-all hover:bg-primary/20 hover:shadow-glow ${
                  location.pathname === '/credit' ? 'text-primary bg-primary/10' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="h-3 w-3" />
                <span>Simulasi Kredit</span>
              </Link>
              <Link
                to="/credit/comparison"
                className={`flex items-center space-x-3 px-6 py-2 rounded-md text-sm font-medium transition-all hover:bg-primary/20 hover:shadow-glow ${
                  location.pathname === '/credit/comparison' ? 'text-primary bg-primary/10' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Scale className="h-3 w-3" />
                <span>Perbandingan Kredit</span>
              </Link>
              <Link
                to="/credit/calculator"
                className={`flex items-center space-x-3 px-6 py-2 rounded-md text-sm font-medium transition-all hover:bg-primary/20 hover:shadow-glow ${
                  location.pathname === '/credit/calculator' ? 'text-primary bg-primary/10' : 'text-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Target className="h-3 w-3" />
                <span>Kalkulator Advanced</span>
              </Link>
            </div>
            <div className="pt-3 border-t border-border/50">
              <Button variant="outline" className="w-full border-success text-success hover:bg-success hover:text-success-foreground" asChild>
                <a href="https://wa.me/6208995053443" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp: 08995053443
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
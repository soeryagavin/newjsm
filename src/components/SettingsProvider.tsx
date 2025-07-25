import React, { createContext, useContext, useState, useEffect } from 'react';

interface WebsiteSettings {
  companyName: string;
  companyDescription: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  companyWebsite: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  workingHours: {
    [key: string]: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    muted: string;
    background: string;
    foreground: string;
  };
  services: {
    creditSimulation: boolean;
    slikCheck: boolean;
    aiAssessment: boolean;
    whatsappIntegration: boolean;
    carShowcase: boolean;
  };
  creditSettings: {
    minDp: number;
    maxTenor: number;
    interestRate: number;
    adminFee: number;
    insuranceRate: number;
  };
}

interface SettingsContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  loading: boolean;
}

const defaultSettings: WebsiteSettings = {
  companyName: "JSM+ by Jaya Setia Mobilindo",
  companyDescription: "Dealer mobil bekas terpercaya dengan teknologi AI assessment dan layanan premium untuk pengalaman jual beli mobil yang aman dan transparan.",
  companyPhone: "08995053443",
  companyEmail: "info@jsm-plus.id",
  companyAddress: "Jl. Raya Serang No. 123, Serang, Banten 42111",
  companyWebsite: "https://jsm-plus.id",
  heroTitle: "JSM+ by Jaya Setia Mobilindo",
  heroSubtitle: "AI-Powered Car Dealership",
  heroDescription: "Platform jual beli mobil bekas dengan teknologi AI assessment, simulasi kredit otomatis, dan layanan premium untuk pengalaman yang aman dan transparan.",
  workingHours: {
    monday: "09:00 - 17:00",
    tuesday: "09:00 - 17:00",
    wednesday: "09:00 - 17:00",
    thursday: "09:00 - 17:00",
    friday: "09:00 - 17:00",
    saturday: "09:00 - 15:00",
    sunday: "Tutup"
  },
  colors: {
    primary: "220 70% 60%",
    secondary: "220 14% 96%",
    accent: "280 65% 60%",
    success: "142 71% 45%",
    muted: "220 14% 96%",
    background: "220 65% 4%",
    foreground: "220 20% 98%"
  },
  services: {
    creditSimulation: true,
    slikCheck: true,
    aiAssessment: true,
    whatsappIntegration: true,
    carShowcase: true
  },
  creditSettings: {
    minDp: 20,
    maxTenor: 60,
    interestRate: 8.5,
    adminFee: 500000,
    insuranceRate: 3.5
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);

  // Load settings from Supabase on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // TODO: Load from Supabase database
      // For now, use localStorage as fallback
      const saved = localStorage.getItem('website-settings');
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    setLoading(true);
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      
      // TODO: Save to Supabase database
      // For now, save to localStorage
      localStorage.setItem('website-settings', JSON.stringify(updated));
      
      // Apply CSS custom properties for theme colors
      if (newSettings.colors) {
        const root = document.documentElement;
        Object.entries(newSettings.colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Locale, type TranslationSchema, translations } from "@/data/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("vi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale") as Locale;
      if (saved === "vi" || saved === "zh") {
        setLocaleState(saved);
      } else {
        setLocaleState("vi");
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("locale", newLocale);
    } catch {
      // Ignore
    }
  };

  const toggleLocale = () => {
    const nextLocale: Locale = locale === "vi" ? "zh" : "vi";
    setLocale(nextLocale);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggleLocale, t: translations[locale] || translations.vi }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

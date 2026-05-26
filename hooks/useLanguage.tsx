"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale } from "@/types";
import { translations } from "@/constants/translations";

interface LanguageContextType {
  locale: Locale;
  t: (section: keyof typeof translations.ka, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale: Locale = "ka";

  const t = useCallback((section: keyof typeof translations.ka, key: string) => {
    const sectionData = translations[locale][section] as Record<string, string>;
    return sectionData[key] ?? key;
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

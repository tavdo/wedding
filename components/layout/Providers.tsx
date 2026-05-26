"use client";

import { useLenis } from "@/hooks/useLenis";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import { WeddingDataProvider } from "@/hooks/useWeddingData";

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <WeddingDataProvider>{children}</WeddingDataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

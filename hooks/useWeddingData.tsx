"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { WeddingData } from "@/types";
import { WEDDING_DATA } from "@/constants/wedding-data";

interface WeddingDataContextType {
  data: WeddingData;
  loading: boolean;
  refresh: () => Promise<void>;
}

const defaultImages = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  finale: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80",
  preloader: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
};

const fallbackData: WeddingData = {
  ...WEDDING_DATA,
  images: defaultImages,
};

const WeddingDataContext = createContext<WeddingDataContextType>({
  data: fallbackData,
  loading: true,
  refresh: async () => {},
});

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeddingData>(fallbackData);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch("/api/wedding");
      if (res.ok) {
        const json = (await res.json()) as WeddingData;
        setData({ ...json, images: json.images || defaultImages });
      }
    } catch {
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <WeddingDataContext.Provider value={{ data, loading, refresh }}>
      {children}
    </WeddingDataContext.Provider>
  );
}

export function useWeddingData() {
  return useContext(WeddingDataContext);
}

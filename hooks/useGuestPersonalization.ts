"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { GuestPersonalization } from "@/types";
import { parseGuestFromSearchParams } from "@/utils/personalization";

export function useGuestPersonalization(): GuestPersonalization {
  const searchParams = useSearchParams();
  const [guest, setGuest] = useState<GuestPersonalization>({});

  useEffect(() => {
    const params: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setGuest(parseGuestFromSearchParams(params));
  }, [searchParams]);

  return guest;
}

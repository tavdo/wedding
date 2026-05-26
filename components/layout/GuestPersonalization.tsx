"use client";

import { Suspense } from "react";
import { useGuestPersonalization } from "@/hooks/useGuestPersonalization";

function GuestPersonalizationInner() {
  useGuestPersonalization();
  return null;
}

export function GuestPersonalization() {
  return (
    <Suspense fallback={null}>
      <GuestPersonalizationInner />
    </Suspense>
  );
}

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Providers } from "@/components/layout/Providers";
import { GuestPersonalization } from "@/components/layout/GuestPersonalization";
import { LuxuryNavbar } from "@/components/layout/LuxuryNavbar";
import { CinematicLoader } from "@/components/sections/CinematicLoader";
import { HeroSection } from "@/components/sections/HeroSection";
import { WaxSealIntro } from "@/components/sections/WaxSealIntro";
import { LoveStoryTimeline } from "@/components/sections/LoveStoryTimeline";
import { EventDetails } from "@/components/sections/EventDetails";
import { CountdownTimer } from "@/components/sections/CountdownTimer";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { RSVPForm } from "@/components/sections/RSVPForm";
import { MusicPlayer } from "@/components/sections/MusicPlayer";
import { FinaleSection } from "@/components/sections/FinaleSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <Providers>
      <GuestPersonalization />
      <AnimatePresence mode="wait">
        {loading && <CinematicLoader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <LuxuryNavbar />

      <main>
        <HeroSection />
        <WaxSealIntro />
        <LoveStoryTimeline />
        <EventDetails />
        <CountdownTimer />
        <GalleryGrid />
        <RSVPForm />
        <FinaleSection />
      </main>

      <FooterSection />
      <MusicPlayer />
    </Providers>
  );
}

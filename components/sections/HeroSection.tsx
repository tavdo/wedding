"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { RevealText } from "@/components/ui/RevealText";
import { luxuryEasing } from "@/components/animations/variants";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    gsap.to(bg, {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
    };
  }, []);

  const scrollToStory = () => {
    document.querySelector("#wax-seal")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
    >
      {/* Cinematic background */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 scale-110"
        initial={{ scale: 1.2, filter: "blur(8px)" }}
        animate={{ scale: 1.1, filter: "blur(0px)" }}
        transition={{ duration: 2.5, ease: luxuryEasing.cinematic, delay: 3.2 }}
      >
        <Image
          src={wedding.images.hero}
          alt="პარიზის ქორწილის ატმოსფერო"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-matte-black/70 via-matte-black/50 to-matte-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3 }}
      />
      <motion.div
        className="film-grain absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      />

      {/* Light leak */}
      <div className="animate-light-leak pointer-events-none absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-champagne/10 blur-[100px]" />
      <motion.div
        className="pointer-events-none absolute -right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-muted-rose/10 blur-[80px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingParticles count={25} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          className="text-editorial mb-8 text-champagne/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1.2, ease: luxuryEasing.reveal }}
        >
          {t("hero", "subtitle")}
        </motion.p>

        <RevealText
          text={`${wedding.couple.partner1} & ${wedding.couple.partner2}`}
          as="h1"
          className="text-cinematic mb-6 text-5xl leading-tight text-warm-white sm:text-7xl md:text-8xl lg:text-9xl"
          delay={4}
          splitBy="char"
        />

        <motion.p
          className="font-handwritten mb-4 text-2xl text-champagne-light md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 1.5 }}
        >
          {wedding.dateFormatted}
        </motion.p>

        <motion.p
          className="mx-auto mb-12 max-w-md text-sm font-light tracking-widest text-warm-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.2, duration: 1 }}
        >
          {wedding.couple.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 1, ease: luxuryEasing.reveal }}
        >
          <AnimatedButton onClick={scrollToStory} variant="secondary">
            {t("hero", "cta")}
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
      >
        <span className="text-editorial text-warm-white/40">{t("hero", "scroll")}</span>
        <motion.div
          className="animate-scroll-pulse h-12 w-px bg-gradient-to-b from-champagne/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

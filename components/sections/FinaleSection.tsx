"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { luxuryEasing } from "@/components/animations/variants";

export function FinaleSection() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 scale-110"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1.05 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: luxuryEasing.cinematic }}
      >
        <Image
          src={wedding.images.finale}
          alt="რომანტიკული ფინალი"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-matte-black/60 via-matte-black/70 to-matte-black/90" />
      <div className="film-grain absolute inset-0" />
      <FloatingParticles count={35} color="rgba(255, 220, 180, 0.3)" />

      {/* Candle glow effects */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/3 h-32 w-32 rounded-full bg-champagne/10 blur-[60px]"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 bottom-1/3 h-40 w-40 rounded-full bg-muted-rose/10 blur-[70px]"
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: luxuryEasing.reveal }}
      >
        <motion.blockquote
          className="text-cinematic mb-12 text-3xl leading-relaxed text-warm-white/90 md:text-5xl md:leading-snug"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          &ldquo;{wedding.quote.text}&rdquo;
        </motion.blockquote>

        <motion.p
          className="text-editorial mb-16 text-champagne/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          — {wedding.quote.author}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1.2 }}
        >
          <p className="font-handwritten mb-4 text-3xl text-champagne-light md:text-4xl">
            {t("finale", "thankYou")}
          </p>
          <p className="text-cinematic text-2xl text-warm-white md:text-3xl">
            {wedding.couple.partner1} & {wedding.couple.partner2}
          </p>
          <p className="text-editorial mt-8 text-warm-white/40">
            {t("finale", "message")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

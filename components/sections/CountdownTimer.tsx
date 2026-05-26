"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { useCountdown } from "@/hooks/useCountdown";
import { padNumber } from "@/lib/utils";
import { RevealText } from "@/components/ui/RevealText";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

const units = ["days", "hours", "minutes", "seconds"] as const;

export function CountdownTimer() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const [mounted, setMounted] = useState(false);
  const timeLeft = useCountdown(wedding.date);

  useEffect(() => {
    setMounted(true);
  }, []);

  const values = {
    days: timeLeft.days,
    hours: timeLeft.hours,
    minutes: timeLeft.minutes,
    seconds: timeLeft.seconds,
  };

  return (
    <section className="section-padding relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,98,0.06) 0%, transparent 60%)",
        }}
      />
      <FloatingParticles count={20} color="rgba(201, 169, 98, 0.25)" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <RevealText
          text={t("countdown", "title")}
          as="h2"
          className="text-cinematic mb-4 text-4xl text-warm-white md:text-6xl"
        />
        <motion.p variants={fadeUpVariants} className="text-editorial mb-16 text-champagne/60">
          {t("countdown", "subtitle")}
        </motion.p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {units.map((unit, i) => (
            <motion.div
              key={unit}
              variants={fadeUpVariants}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-sm p-6 md:p-8"
            >
              <motion.div className="relative mb-3 overflow-hidden">
                {mounted ? (
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={values[unit]}
                      className="text-cinematic block text-5xl text-champagne md:text-7xl"
                      initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.5 }}
                      style={{
                        textShadow: "0 0 40px rgba(201,169,98,0.3)",
                      }}
                    >
                      {unit === "days" ? values[unit] : padNumber(values[unit])}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span className="text-cinematic block text-5xl text-champagne md:text-7xl opacity-0">
                    00
                  </span>
                )}
              </motion.div>
              <p className="text-editorial text-warm-white/50">{t("countdown", unit)}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUpVariants}
          className="font-handwritten mt-12 text-xl text-muted-rose-light md:text-2xl"
        >
          {wedding.dateFormatted}
        </motion.p>
      </motion.div>
    </section>
  );
}

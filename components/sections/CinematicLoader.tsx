"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeddingData } from "@/hooks/useWeddingData";
import { luxuryEasing } from "@/components/animations/variants";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const { data: wedding } = useWeddingData();
  const [phase, setPhase] = useState<"logo" | "shimmer" | "exit">("logo");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("shimmer"), 1200);
    const timer2 = setTimeout(() => setPhase("exit"), 2800);
    const timer3 = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!visible && phase === "exit") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-matte-black"
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0, filter: "blur(20px)" } : { opacity: 1 }}
      transition={{ duration: 1.2, ease: luxuryEasing.cinematic }}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${wedding.images.preloader})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: luxuryEasing.reveal }}
        >
          <motion.div className="flex h-32 w-32 items-center justify-center rounded-full border border-champagne/30">
            <span className="text-cinematic text-3xl text-champagne tracking-[0.2em]">
              {wedding.couple.initials}
            </span>
          </motion.div>

          {phase === "shimmer" && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(201,169,98,0.6), transparent)",
              }}
            />
          )}
        </motion.div>

        <motion.div
          className="h-px w-32 overflow-hidden bg-champagne/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-champagne"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: luxuryEasing.smooth, delay: 0.3 }}
          />
        </motion.div>

        <motion.p
          className="text-editorial text-champagne/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {wedding.couple.partner1} & {wedding.couple.partner2}
        </motion.p>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

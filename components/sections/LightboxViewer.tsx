"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import type { GalleryImage } from "@/types";
import { luxuryEasing } from "@/components/animations/variants";

interface LightboxViewerProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxViewer({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxViewerProps) {
  const { t } = useLanguage();
  const image = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, handlePrev, handleNext]);

  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrev();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-matte-black/95 backdrop-blur-xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 text-2xl text-warm-white/60 transition-colors hover:text-champagne"
          aria-label={t("common", "closeLightbox")}
        >
          ×
        </button>

        <button
          onClick={handlePrev}
          className="absolute left-4 z-10 hidden text-3xl text-warm-white/40 transition-colors hover:text-champagne md:block"
          aria-label={t("common", "prevImage")}
        >
          ‹
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 z-10 hidden text-3xl text-warm-white/40 transition-colors hover:text-champagne md:block"
          aria-label={t("common", "nextImage")}
        >
          ›
        </button>

        <motion.div
          className="relative mx-4 max-h-[85vh] max-w-5xl"
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.6, ease: luxuryEasing.cinematic }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="max-h-[85vh] w-auto object-contain"
                priority
              />
              <p className="text-editorial mt-4 text-center text-warm-white/50">
                {image.alt}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-8 bg-champagne"
                  : "w-4 bg-warm-white/20 hover:bg-warm-white/40"
              }`}
              aria-label={`${t("common", "goToImage")} ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

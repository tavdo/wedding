"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWeddingData } from "@/hooks/useWeddingData";
import { useLanguage } from "@/hooks/useLanguage";
import { RevealText } from "@/components/ui/RevealText";
import { LightboxViewer } from "@/components/sections/LightboxViewer";
import { fadeUpVariants, staggerContainer } from "@/components/animations/variants";

export function GalleryGrid() {
  const { t } = useLanguage();
  const { data: wedding } = useWeddingData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding relative overflow-hidden bg-background">
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mb-16 text-center">
          <RevealText
            text={t("gallery", "title")}
            as="h2"
            className="text-cinematic mb-4 text-4xl text-warm-white md:text-6xl"
          />
          <motion.p variants={fadeUpVariants} className="text-editorial text-champagne/60">
            {t("gallery", "subtitle")}
          </motion.p>
        </div>

        <div className="masonry-grid">
          {wedding.gallery.map((image, index) => (
            <motion.div
              key={image.id}
              className="masonry-item group relative cursor-pointer overflow-hidden rounded-sm"
              variants={fadeUpVariants}
              transition={{ delay: index * 0.08 }}
              onClick={() => setLightboxIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(index)}
              aria-label={`${t("gallery", "view")} ${image.alt}`}
            >
              <motion.div
                className="relative overflow-hidden"
                style={{ aspectRatio: `${image.width}/${image.height}` }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-[1.5s] group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <motion.div
                  className="absolute inset-0 bg-matte-black/0 transition-colors duration-700 group-hover:bg-matte-black/30"
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                >
                  <span className="text-editorial border border-champagne/40 px-6 py-3 text-champagne">
                    {t("gallery", "view")}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {lightboxIndex !== null && (
        <LightboxViewer
          images={wedding.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

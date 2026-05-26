"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { scaleRevealVariants } from "@/components/animations/variants";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-sm p-8 md:p-10",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
        className
      )}
      variants={scaleRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 16px 48px rgba(201, 169, 98, 0.12)",
              borderColor: "rgba(201, 169, 98, 0.3)",
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

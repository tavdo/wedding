"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { luxuryEasing } from "@/components/animations/variants";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export function AnimatedButton({
  variant = "primary",
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary:
      "bg-champagne/90 text-matte-black border border-champagne/30 shadow-[0_0_40px_rgba(201,169,98,0.15)]",
    secondary:
      "bg-transparent text-warm-white border border-champagne/40 hover:bg-champagne/10",
    ghost: "bg-transparent text-champagne border-none",
  };

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden px-8 py-4 text-editorial tracking-[0.3em] transition-colors duration-700",
        "rounded-sm font-sans text-xs uppercase",
        variants[variant],
        className
      )}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 60px rgba(201, 169, 98, 0.25)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.6, ease: luxuryEasing.smooth }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-light/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: luxuryEasing.smooth }}
      />
    </motion.button>
  );
}

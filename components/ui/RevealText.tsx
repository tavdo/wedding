"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { letterRevealVariants } from "@/components/animations/variants";

interface RevealTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "char" | "word";
}

export function RevealText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "char",
}: RevealTextProps) {
  const items =
    splitBy === "char" ? text.split("") : text.split(" ");

  return (
    <Tag className={cn("overflow-hidden", className)}>
      <motion.span
        className="inline-flex flex-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delayChildren: delay }}
      >
        {items.map((item, i) => (
          <motion.span
            key={`${item}-${i}`}
            custom={i}
            variants={letterRevealVariants}
            className="inline-block"
            style={{ whiteSpace: item === " " ? "pre" : undefined }}
          >
            {item}
            {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParallax } from "@/components/animations/useScrollReveal";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.2,
  priority = false,
  fill = true,
  width,
  height,
}: ParallaxImageProps) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <motion.div ref={ref} className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        className="object-cover transition-transform duration-[2s] ease-out hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
}

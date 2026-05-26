export const luxuryEasing = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  cinematic: [0.43, 0.13, 0.23, 0.96] as const,
  reveal: [0.16, 1, 0.3, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: luxuryEasing.reveal },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.4, ease: luxuryEasing.smooth },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const scaleRevealVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: luxuryEasing.cinematic },
  },
};

export const letterRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.04,
      ease: luxuryEasing.reveal,
    },
  }),
};

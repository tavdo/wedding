"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  start?: string;
  scrub?: boolean | number;
  scale?: number;
  blur?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 60,
    opacity = 0,
    duration = 1.4,
    delay = 0,
    start = "top 85%",
    scrub = false,
    scale = 1,
    blur = 8,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        y,
        opacity,
        scale: scale !== 1 ? scale * 0.95 : 1,
        filter: blur ? `blur(${blur}px)` : "blur(0px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: scrub ? undefined : duration,
        delay: scrub ? undefined : delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: scrub ? undefined : "play none none reverse",
          scrub: scrub || false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [y, opacity, duration, delay, start, scrub, scale, blur]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
}

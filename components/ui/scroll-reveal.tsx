"use client";

import type { ReactNode } from "react";
import type { UseInViewOptions } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  margin?: UseInViewOptions["margin"];
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  offset = 14,
  direction = "up",
  margin = "-90px",
}: ScrollRevealProps) {
  return (
    <BlurFade
      inView
      inViewMargin={margin}
      delay={delay}
      duration={duration}
      offset={offset}
      direction={direction}
      className={className}
    >
      {children}
    </BlurFade>
  );
}

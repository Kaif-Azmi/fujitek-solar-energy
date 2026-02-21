import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  margin?: string;
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
  void delay;
  void duration;
  void offset;
  void direction;
  void margin;

  return (
    <div className={className}>
      {children}
    </div>
  );
}

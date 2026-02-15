"use client";

import { motion } from "framer-motion";

type InfiniteGridProps = {
  className?: string;
};

const GRID_STYLE = {
  backgroundImage: `
    linear-gradient(to right, color-mix(in srgb, var(--brand) 20%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--brand) 20%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const ACCENT_GLOW_STYLE = {
  background: `
    radial-gradient(
      circle at center,
      color-mix(in srgb, var(--brand) 85%, transparent) 0%,
      transparent 52%
    )
  `,
};

export function InfiniteGrid({ className = "" }: InfiniteGridProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={GRID_STYLE}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={ACCENT_GLOW_STYLE}
        animate={{
          x: ["-12%", "12%", "-12%"],
          y: ["-8%", "8%", "-8%"],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

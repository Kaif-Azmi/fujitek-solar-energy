import React from "react";
import { ArrowUpRight, Zap } from "lucide-react";

export interface ProductCardProps {
  title: string;
  description: string;
  price: string;
}

export default function ProductCard({
  title,
  description,
  price,
}: ProductCardProps) {
  return (
    <div
      className="
        group relative w-[300px] shrink-0 snap-start
        overflow-hidden rounded-xl
        border border-border
        bg-background
        shadow-[0_8px_24px_rgba(2,6,23,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(2,6,23,0.14)]
      "
    >
      {/* ===== Accent glow ===== */}
      <div
        className="
          pointer-events-none absolute -top-24 -right-24
          h-64 w-64 rounded-full
          bg-accent/20 blur-3xl
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* ===== Header ===== */}
      <div className="relative z-10 flex flex-col items-center gap-1 px-6 pt-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {price}
        </span>

        <h3 className="text-center text-lg font-bold text-foreground">
          {title}
        </h3>
      </div>

      {/* ===== Image Placeholder ===== */}
      <div className="relative z-10 mx-auto mt-6 flex h-44 w-44 items-center justify-center rounded-lg bg-surface">
        <Zap className="h-10 w-10 text-primary/40" />
        <span className="sr-only">Product image</span>
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-4 px-6 pb-8 text-center">
        <p className="line-clamp-3 text-sm leading-relaxed text-secondary">
          {description}
        </p>

        <button
          className="
            inline-flex items-center gap-2
            rounded-full border border-border
            bg-background px-5 py-2
            text-xs font-semibold uppercase tracking-wide text-foreground
            transition-all
            hover:bg-primary hover:text-white
            focus:outline-none focus:ring-2 focus:ring-primary/30
          "
        >
          Order Now
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* ===== Bottom bar ===== */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-1
          bg-gradient-to-r from-primary via-accent to-primary
          opacity-60
        "
      />
    </div>
  );
}

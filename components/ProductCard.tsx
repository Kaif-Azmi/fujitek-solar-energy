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
        overflow-hidden rounded-2xl
        bg-white
        border border-primary/10
        shadow-[0_12px_32px_rgba(0,0,0,0.08)]
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
      "
    >
      {/* Accent Glow */}
      <div
        className="
          pointer-events-none absolute -top-32 -right-32
          h-72 w-72 rounded-full
          bg-accent/30 blur-3xl
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Price */}
      <div className="relative z-10 px-6 pt-8 text-center">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {price}
        </span>

        <h3 className="mt-4 text-lg text-strong text-foreground">
          {title}
        </h3>
      </div>

      {/* Image Area */}
      <div className="relative z-10 mx-auto mt-6 flex h-44 w-44 items-center justify-center rounded-xl bg-primary/5 border border-primary/10 transition-all duration-300 group-hover:bg-primary/10">
        <Zap className="h-10 w-10 text-primary/60 transition-transform duration-300 group-hover:scale-110" />
        <span className="sr-only">Product image</span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-5 px-6 pb-8 text-center">
        <p className="line-clamp-3 text-sm leading-relaxed text-secondary">
          {description}
        </p>

        <button
          className="
            inline-flex items-center gap-2
            rounded-full
            bg-primary px-6 py-2.5
            text-xs font-semibold uppercase tracking-wide text-white
            transition-all duration-300
            hover:bg-primary/90
            hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-primary/30
          "
        >
          Order Now
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}


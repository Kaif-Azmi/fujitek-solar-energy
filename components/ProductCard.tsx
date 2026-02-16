import { IndianRupee } from "lucide-react";
import Image from "next/image";
import { getOptimizedCloudinaryUrl } from "@/lib/image";

export interface ProductCardProps {
  name: string;
  category: "Panel" | "Inverter" | "Battery" | "EV Charger";
  price: number;
  imageUrl: string;
}

const CATEGORY_LABELS: Record<ProductCardProps["category"], string> = {
  Panel: "Solar Panels",
  Inverter: "Inverters",
  Battery: "Batteries",
  "EV Charger": "EV Chargers",
};

export default function ProductCard({ name, category, price, imageUrl }: ProductCardProps) {
  return (
    <article>
      <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-primary/15 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
        </div>

        <div className="relative border-b border-border/60 bg-primary/5 p-4 sm:p-6">
          <div className="grid aspect-[4/3] w-full place-items-center [perspective:900px] sm:aspect-[16/11]">
            <Image
              src={getOptimizedCloudinaryUrl(imageUrl, { width: 960, quality: 72, crop: "fit" })}
              alt={name}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              className="object-contain transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none group-hover:scale-[1.05] md:group-hover:[transform:rotateX(10deg)_rotateY(-14deg)_translateZ(26px)_scale(1.03)]"
            />
          </div>
        </div>

        <div className="relative space-y-3 p-4 sm:p-5">
          <div className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 md:group-hover:[transform:translateZ(14px)] motion-reduce:transform-none">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
              {CATEGORY_LABELS[category]}
            </p>
          </div>

          <h3 className="text-pretty text-base font-semibold leading-snug text-foreground sm:text-lg">
            {name}
          </h3>

          <div className="flex items-baseline gap-2 text-foreground">
            <span className="text-lg font-bold tabular-nums sm:text-xl">
              ₹ {price.toLocaleString("en-IN")}
            </span>
            <IndianRupee className="sr-only" aria-hidden />
          </div>
        </div>
      </div>
    </article>
  );
}

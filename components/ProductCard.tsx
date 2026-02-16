import Link from "next/link";
import { ArrowUpRight, IndianRupee } from "lucide-react";
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
    <article className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-background shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
        <div className="relative border-b border-border/60 bg-gradient-to-b from-primary/[0.08] to-background">
          <div className="absolute right-3 top-3 z-20 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            {CATEGORY_LABELS[category]}
          </div>

          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={getOptimizedCloudinaryUrl(imageUrl, { width: 1024, quality: 76, crop: "fit" })}
              alt={name}
              width={1024}
              height={1024}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
              className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-7 sm:px-6">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-snug text-foreground">
            {name}
          </h3>

          <div className="mt-4 flex items-center gap-2 text-foreground">
            <IndianRupee className="h-5 w-5 text-primary" aria-hidden />
            <p className="text-2xl font-bold tracking-tight tabular-nums">
              {price.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
            <p className="text-sm text-secondary">Installation-ready hardware</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              Get Quote
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}



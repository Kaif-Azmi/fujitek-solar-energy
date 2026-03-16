import Link from "next/link";
import Image from "next/image";
import { defaultLocale, type Locale } from "@/lib/i18n";

export interface ProductCardProps {
  name: string;
  category: "Panel" | "Inverter" | "Battery" | "EV Charger";
  price: number;
  imageUrl: string;
  locale?: Locale;
  contactHref?: string;
  labels?: ProductCardLabels;
}

const DEFAULT_CATEGORY_LABELS: Record<ProductCardProps["category"], string> = {
  Panel: "Solar Panels",
  Inverter: "Inverters",
  Battery: "Batteries",
  "EV Charger": "EV Chargers",
};

type ProductCardLabels = {
  categoryPanel: string;
  categoryInverter: string;
  categoryBattery: string;
  categoryEvCharger: string;
  installationReady: string;
  getQuote: string;
};

const DEFAULT_LABELS: ProductCardLabels = {
  categoryPanel: "Solar Panels",
  categoryInverter: "Inverters",
  categoryBattery: "Batteries",
  categoryEvCharger: "EV Chargers",
  installationReady: "Installation-ready hardware",
  getQuote: "Get Quote",
};

export default function ProductCard({
  name,
  category,
  price,
  imageUrl,
  locale = defaultLocale,
  contactHref = "/contact",
  labels = DEFAULT_LABELS,
}: ProductCardProps) {
  const categoryLabels: Record<ProductCardProps["category"], string> = {
    Panel: labels.categoryPanel,
    Inverter: labels.categoryInverter,
    Battery: labels.categoryBattery,
    "EV Charger": labels.categoryEvCharger,
  };

  const numberLocale = locale === "hi" ? "hi-IN" : "en-IN";

  return (
    <article className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] sm:rounded-3xl">
        <div className="relative border-b border-border/60 bg-gradient-to-b from-primary/[0.08] to-background">
          <div className="absolute right-2 top-2 z-20 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary sm:right-3 sm:top-3 sm:px-3 sm:text-[10px] sm:tracking-[0.16em]">
            {categoryLabels[category] ?? DEFAULT_CATEGORY_LABELS[category]}
          </div>

          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={name}
              width={1024}
              height={1024}
              quality={72}
              sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(50vw - 2.5rem), 360px"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-7">
          <h3 className="line-clamp-2 min-h-[3rem] text-base font-semibold leading-snug text-foreground sm:min-h-[3.5rem] sm:text-lg">
            {name}
          </h3>

          <div className="mt-3 flex items-center gap-1.5 text-foreground sm:mt-4 sm:gap-2">
            <span className="text-primary sm:text-lg" aria-hidden>
              ₹
            </span>
            <p className="text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
              {price.toLocaleString(numberLocale)}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-border/70 pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-secondary">{labels.installationReady}</p>
            <Link
              href={contactHref}
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              {labels.getQuote}
              <span className="text-xs font-semibold" aria-hidden>
                {">"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

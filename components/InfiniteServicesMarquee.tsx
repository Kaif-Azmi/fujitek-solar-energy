import { Zap } from "lucide-react";

const PRODUCTS = [
  "On-Grid Solar Inverters",
  "Off-Grid Solar Inverters",
  "Hybrid Solar Inverters",
  "Solar Panels",
  "Solar Batteries",
  "Smart PWM Charge Controllers",
  "Low-Cost Smart PWM Controllers (OEM)",
  "Lithium E-Rickshaw Chargers",
  "Electric Scooty Chargers",
];

const LOOPED_PRODUCTS = [...PRODUCTS, ...PRODUCTS];

export default function InfiniteServicesMarquee() {
  return (
    <section
      className="relative w-full overflow-hidden bg-surface py-section"
      aria-label="Solar inverters, batteries, charge controllers and EV charger manufacturing"
    >
      <h2 className="sr-only">
        Solar Inverter, Battery and EV Charger Manufacturer in India
      </h2>

      {/* STRIP 1 */}
      <div className="relative -rotate-2 bg-primary shadow-md">
        <div
          className="marquee-ltr flex w-max items-center gap-20 py-5"
          aria-hidden="true"
        >
          {LOOPED_PRODUCTS.map((item, i) => (
            <ProductItem key={`ltr-${i}`} label={item} variant="primary" />
          ))}
        </div>
      </div>

      {/* STRIP 2 */}
      <div className="relative mt-12 rotate-2 bg-accent shadow-md">
        <div
          className="marquee-rtl flex w-max items-center gap-20 py-5"
          aria-hidden="true"
        >
          {LOOPED_PRODUCTS.map((item, i) => (
            <ProductItem key={`rtl-${i}`} label={item} variant="accent" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductItem({
  label,
  variant,
}: {
  label: string;
  variant: "primary" | "accent";
}) {
  const textColor =
    variant === "primary" ? "text-white" : "text-primary";
  const iconColor =
    variant === "primary" ? "text-accent" : "text-primary";

  return (
    <div
      className={`flex items-center gap-4 whitespace-nowrap text-lg font-semibold tracking-wide ${textColor} sm:text-xl`}
    >
      <Zap className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";

interface InfiniteServicesMarqueeProps {
  items?: string[];
  ariaLabel?: string;
  srOnlyTitle?: string;
}

const DEFAULT_PRODUCTS = [
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

export default function InfiniteServicesMarquee({
  items = DEFAULT_PRODUCTS,
  ariaLabel = "Solar inverters, batteries, charge controllers and EV charger manufacturing",
  srOnlyTitle = "Solar Inverter, Battery and EV Charger Manufacturer in India",
}: InfiniteServicesMarqueeProps) {
  const loopedProducts = [...items, ...items];

  return (
    <section
      className="relative w-full overflow-hidden bg-surface py-section"
      aria-label={ariaLabel}
    >
      <h2 className="sr-only">{srOnlyTitle}</h2>

      <div className="relative -rotate-2 bg-primary shadow-md">
        <div
          className="marquee-ltr flex w-max items-center gap-20 py-5"
          aria-hidden="true"
        >
          {loopedProducts.map((item, i) => (
            <ProductItem key={`ltr-${i}`} label={item} variant="primary" />
          ))}
        </div>
      </div>

      <div className="relative mt-12 rotate-2 bg-accent shadow-md">
        <div
          className="marquee-rtl flex w-max items-center gap-20 py-5"
          aria-hidden="true"
        >
          {loopedProducts.map((item, i) => (
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
  const textColor = "text-black";
  const iconColor = "text-black";
  const iconName = getIconNameForLabel(label);

  return (
    <div
      className={`flex items-center gap-4 whitespace-nowrap text-lg font-bold tracking-wide ${textColor} sm:text-xl`}
    >
      <PublicIcon name={iconName} className={`h-6 w-6 ${iconColor}`} />
      <span>{label}</span>
    </div>
  );
}

function getIconNameForLabel(label: string): PublicIconName {
  const normalized = label.toLowerCase();
  if (normalized.includes("panel")) return "solar-panel";
  if (normalized.includes("batter")) return "battery";
  if (
    normalized.includes("charger") ||
    normalized.includes("ev") ||
    normalized.includes("scooty") ||
    normalized.includes("rickshaw")
  ) {
    return "car";
  }
  if (normalized.includes("controller") || normalized.includes("pwm")) {
    return "microchip";
  }
  if (normalized.includes("inverter")) return "microchip";
  return "sun";
}

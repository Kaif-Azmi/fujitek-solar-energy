import Image from "next/image";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  translator: "/images/icons/language_translator.svg",
  "solar-panel": "/images/icons/solar_panel_in_sunlight.svg",
  sun: "/images/icons/shining_sun.svg",
  savings: "/images/icons/savings_of_money.svg",
  battery: "/images/icons/ecology-battery.svg",
  microchip: "/images/icons/microchip-for_inverters.svg",
  shield: "/images/icons/shield_for_safety.svg",
  handshake: "/images/icons/partnership_handshake.svg",
  network: "/images/icons/networking_of_people.svg",
  truck: "/images/icons/delivery-truck.svg",
  car: "/images/icons/electric-car.svg",
  support: "/images/icons/customer_support_person.svg",
} as const;

export type PublicIconName = keyof typeof ICON_MAP;

type PublicIconProps = {
  name: PublicIconName;
  className?: string;
  alt?: string;
  decorative?: boolean;
};

export function PublicIcon({
  name,
  className,
  alt,
  decorative = true,
}: PublicIconProps) {
  const src = ICON_MAP[name];

  return (
    <span
      className={cn(
        "relative inline-flex h-6 w-6 shrink-0 items-center justify-center",
        className,
      )}
      aria-hidden={decorative ? true : undefined}
    >
      <Image
        src={src}
        alt={decorative ? "" : (alt ?? name)}
        fill
        sizes="64px"
        loading="lazy"
        decoding="async"
        className="object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] saturate-110 contrast-125"
      />
    </span>
  );
}

export const SolarPanelIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="solar-panel" {...props} />
);
export const SunIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="sun" {...props} />
);
export const SavingsIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="savings" {...props} />
);
export const BatteryIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="battery" {...props} />
);
export const MicrochipIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="microchip" {...props} />
);
export const ShieldIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="shield" {...props} />
);
export const HandshakeIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="handshake" {...props} />
);
export const NetworkIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="network" {...props} />
);
export const TruckIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="truck" {...props} />
);
export const CarIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="car" {...props} />
);
export const SupportIcon = (props: Omit<PublicIconProps, "name">) => (
  <PublicIcon name="support" {...props} />
);

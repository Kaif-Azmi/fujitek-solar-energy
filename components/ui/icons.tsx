// components/ui/icons.tsx
import {
  Zap,
  Wrench as LucideWrench,
  Handshake as LucideHandshake,
  MapPin as LucideMapPin,
  Phone as LucidePhone,
  Mail as LucideMail,
  Sun as LucideSun,
  Leaf as LucideLeaf,
  Star as LucideStar,
  Rocket as LucideRocket,
} from "lucide-react";

type IconProps = {
  className?: string;
};

/* ⚡ Energy / Power */
export const Lightning = (props: IconProps) => (
  <Zap {...props} />
);

/* 🔧 Service / Inverter */
export const Wrench = (props: IconProps) => (
  <LucideWrench {...props} />
);

/* 🤝 Trust / Partnership */
export const Handshake = (props: IconProps) => (
  <LucideHandshake {...props} />
);

/* 📍 Location */
export const MapPin = (props: IconProps) => (
  <LucideMapPin {...props} />
);

/* 📞 Phone */
export const Phone = (props: IconProps) => (
  <LucidePhone {...props} />
);

/* ✉️ Mail */
export const Mail = (props: IconProps) => (
  <LucideMail {...props} />
);

/* ☀️ Solar */
export const Sun = (props: IconProps) => (
  <LucideSun {...props} />
);

/* 🍃 Environment */
export const Leaf = (props: IconProps) => (
  <LucideLeaf {...props} />
);

/* ⭐ Highlight */
export const Star = (props: IconProps) => (
  <LucideStar {...props} />
);

/* 🚀 Growth / Future */
export const Rocket = (props: IconProps) => (
  <LucideRocket {...props} />
);

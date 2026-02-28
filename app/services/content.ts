import type { CtaLink, FaqItem, HighlightItem, NavItem, ProcessStep } from "@/components/services/types";

export type ServiceSectionContent = {
  id: string;
  title: string;
  mainDescription: string;
  featureTitle: string;
  features: { title: string; description: string; icon: "grid" | "shield" | "chart" }[];
  highlightTitle: string;
  highlightDescription: string;
  highlightItems: HighlightItem[];
  detailParagraphs: string[];
};

/* ================= HERO ================= */

export const heroContent: { title: string; intro: string; ctas: [CtaLink, CtaLink, CtaLink] } = {
  title: "Solar & EV Power Electronics Manufacturing",
  intro:
    "Fujitek Solar Energy manufactures high-performance solar inverters, solar panels, lithium chargers, smart PWM charge controllers, and EV charging equipment for dealers, distributors, OEM partners, and institutional buyers across India. Our engineering focuses on efficiency, grid stability, durability, and scalable production capability.",
  ctas: [
    { label: "Explore Products", href: "/products" },
    { label: "Request Bulk Pricing", href: "/contact" },
    { label: "Become a Dealer", href: "/contact" },
  ],
};

/* ================= NAV ================= */

export const sectionNavItems: NavItem[] = [
  { id: "solar-inverters", label: "Inverters" },
  { id: "solar-panels", label: "Solar Panels" },
  { id: "ev-chargers", label: "EV Chargers" },
  { id: "charge-controllers", label: "Charge Controllers" },
  { id: "oem-bulk-supply", label: "OEM Supply" },
  { id: "process", label: "Process" },
  { id: "faqs", label: "FAQs" },
];

/* ================= TRUST ================= */

export const trustMetrics = [
  { value: "High", label: "Conversion efficiency across inverter range" },
  { value: "OEM", label: "Bulk manufacturing & dealer supply capability" },
  { value: "Tested", label: "Quality-controlled production standards" },
  { value: "Pan India", label: "Distribution-ready product supply" },
];

/* ================= PROCESS ================= */

export const processSteps: ProcessStep[] = [
  {
    title: "Requirement Discovery",
    description: "We capture your project load profile, target use-case, and supply volume needs.",
  },
  {
    title: "Technical Mapping",
    description: "Our team aligns inverter, panel, charger, and controller options to your deployment scope.",
  },
  {
    title: "Commercial Structuring",
    description: "You receive clear pricing, dealer/OEM terms, and supply timelines for execution planning.",
  },
  {
    title: "Fulfillment & Support",
    description: "Orders are dispatched through a structured supply process with post-order technical assistance.",
  },
];

/* ================= SECTIONS ================= */

export const serviceSections: ServiceSectionContent[] = [
  {
    id: "solar-inverters",
    title: "On-Grid, Off-Grid & Hybrid Inverters",
    mainDescription:
      "Fujitek manufactures on-grid, off-grid, and hybrid solar inverters engineered for Indian voltage conditions, high-temperature operation, and long-term reliability. Our inverter architecture focuses on stable conversion efficiency, protection coordination, and monitoring compatibility.",
    featureTitle: "Inverter Engineering Focus",
    features: [
      {
        title: "On-Grid Inverters",
        description:
          "Designed for grid-synchronized systems focused on bill reduction and export-ready compatibility.",
        icon: "grid",
      },
      {
        title: "Hybrid Inverters",
        description:
          "Battery-ready systems with backup logic and scalable expansion capability.",
        icon: "chart",
      },
      {
        title: "Protection & Stability",
        description:
          "Engineered with voltage tolerance, surge protection compatibility, and operational safety controls.",
        icon: "shield",
      },
    ],
    highlightTitle: "Inverter Product Highlights",
    highlightDescription: "Reliable conversion and scalable architecture.",
    highlightItems: [
      { label: "Types", value: "On-grid, Off-grid, Hybrid" },
      { label: "Efficiency", value: "High conversion performance under load" },
      { label: "Monitoring", value: "Dashboard-ready models available" },
      { label: "Application", value: "Residential & Commercial compatibility" },
    ],
    detailParagraphs: [
      "Our inverter range is designed for dealers and system integrators looking for reliable power electronics built for Indian grid realities.",
    ],
  },

  {
    id: "solar-panels",
    title: "Solar Panels & Module Supply",
    mainDescription:
      "We supply high-efficiency solar panels aligned with performance and durability expectations for residential and commercial systems.",
    featureTitle: "Panel Focus",
    features: [
      { title: "High Output Modules", description: "Optimized for yield and durability.", icon: "chart" },
      { title: "Warranty Alignment", description: "Manufacturer-backed coverage.", icon: "shield" },
      { title: "Scalable Supply", description: "Bulk-ready distribution capability.", icon: "grid" },
    ],
    highlightTitle: "Panel Capabilities",
    highlightDescription: "Built for long operational life.",
    highlightItems: [
      { label: "Usage", value: "Residential & Commercial" },
      { label: "Durability", value: "Long-term performance stability" },
      { label: "Compatibility", value: "Works with on-grid & hybrid systems" },
      { label: "Supply Model", value: "Dealer & OEM ready" },
    ],
    detailParagraphs: [
      "Our panel supply supports distributors and system partners looking for consistent product availability.",
    ],
  },

  {
    id: "ev-chargers",
    title: "EV Chargers & Lithium Vehicle Chargers",
    mainDescription:
      "Fujitek manufactures EV charging equipment including lithium e-rickshaw chargers and electric scooty chargers designed for safety, durability, and daily-use reliability.",
    featureTitle: "EV Charging Portfolio",
    features: [
      {
        title: "E-Rickshaw Chargers",
        description: "Lithium-compatible charging solutions for commercial electric vehicles.",
        icon: "grid",
      },
      {
        title: "Scooty Chargers",
        description: "Safe and efficient battery charging for electric two-wheelers.",
        icon: "chart",
      },
      {
        title: "Protection Standards",
        description: "Designed with electrical safety and operational stability in mind.",
        icon: "shield",
      },
    ],
    highlightTitle: "EV Charger Range",
    highlightDescription: "Reliable hardware for growing EV demand.",
    highlightItems: [
      { label: "Vehicle Types", value: "E-rickshaw & Electric Scooters" },
      { label: "Usage", value: "Dealer & commercial supply" },
      { label: "Focus", value: "Safety & battery protection" },
      { label: "Availability", value: "Bulk-ready distribution" },
    ],
    detailParagraphs: [
      "Our EV charging equipment supports India's expanding electric mobility ecosystem.",
    ],
  },

  {
    id: "charge-controllers",
    title: "Smart PWM Charge Controllers",
    mainDescription:
      "We manufacture low-cost smart PWM charge controllers for battery systems, designed for OEM integration and reliable off-grid usage.",
    featureTitle: "Controller Engineering",
    features: [
      { title: "Battery Protection", description: "Prevents overcharge and deep discharge.", icon: "shield" },
      { title: "Stable Charging Logic", description: "Optimized charging curves for battery life.", icon: "chart" },
      { title: "OEM Integration", description: "Designed for system builders and manufacturers.", icon: "grid" },
    ],
    highlightTitle: "Controller Advantages",
    highlightDescription: "Smart control for battery reliability.",
    highlightItems: [
      { label: "Type", value: "Smart PWM" },
      { label: "Application", value: "Off-grid & battery systems" },
      { label: "Target Market", value: "OEM & bulk buyers" },
      { label: "Design Focus", value: "Cost-efficient reliability" },
    ],
    detailParagraphs: [
      "These controllers are built for stable charging performance in off-grid and battery-based systems.",
    ],
  },

  {
    id: "oem-bulk-supply",
    title: "OEM & Bulk Supply Capability",
    mainDescription:
      "Fujitek supports distributors, dealers, and institutional buyers with structured bulk supply capability across product categories.",
    featureTitle: "Supply Strength",
    features: [
      { title: "Dealer Network Support", description: "Distribution-focused supply chain model.", icon: "grid" },
      { title: "Bulk Pricing Structure", description: "Volume-based commercial models.", icon: "chart" },
      { title: "Quality Control", description: "Production-level testing standards.", icon: "shield" },
    ],
    highlightTitle: "Business Model",
    highlightDescription: "Manufacturing-backed scalability.",
    highlightItems: [
      { label: "Supply", value: "Pan-India distribution" },
      { label: "Focus", value: "OEM & dealers" },
      { label: "Quality", value: "Structured testing workflow" },
      { label: "Scalability", value: "Bulk manufacturing ready" },
    ],
    detailParagraphs: [
      "We position ourselves as a reliable hardware manufacturing partner for India's renewable energy ecosystem.",
    ],
  },
];

/* ================= FAQ ================= */

export const faqs: FaqItem[] = [
  {
    question: "Do you provide installation services?",
    answer:
      "Fujitek primarily focuses on manufacturing and product supply. Installation may be supported through partner networks.",
  },
  {
    question: "Do you support bulk or dealer orders?",
    answer:
      "Yes, we support OEM partnerships, dealer networks, and institutional bulk procurement.",
  },
  {
    question: "Which inverter types do you manufacture?",
    answer:
      "We manufacture on-grid, off-grid, and hybrid inverters for residential and commercial use.",
  },
  {
    question: "Do you manufacture EV chargers?",
    answer:
      "Yes, including lithium e-rickshaw chargers and electric scooty chargers.",
  },
];

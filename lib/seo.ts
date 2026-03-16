import type { Metadata } from "next";

type SeoPage = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
};

type SiteSeo = {
  name: string;
  url: string;
  description: string;
  keywords: string[];
  business: {
    areaServed: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    x?: string;
  };
};

function getOptionalPublicUrl(
  envKey:
    | "NEXT_PUBLIC_SOCIAL_FACEBOOK"
    | "NEXT_PUBLIC_SOCIAL_INSTAGRAM"
    | "NEXT_PUBLIC_SOCIAL_X"
) {
  const value = process.env[envKey];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/* ================= SITE LEVEL SEO ================= */

export const siteSeo: SiteSeo = {
  name: "Fujitek Solar Energy",
  url: "https://www.fujiteksolar.com",
  description:
    "Fujitek Solar Energy manufactures solar inverters, solar panels, batteries, smart charge controllers, and EV chargers in India.",
  keywords: [
    "solar inverter manufacturer",
    "on grid inverter",
    "off grid inverter",
    "hybrid inverter",
    "solar panel manufacturer",
    "solar battery",
    "PWM charge controller",
    "EV charger manufacturer",
    "lithium e-rickshaw charger",
    "electric scooty charger",
    "renewable energy equipment India",
    "Fujitek Solar",
  ],
  business: {
    areaServed: "India",
    phone: "+918447097751",
    email: "info@fujiteksolar.com",
    address: "A5, Yadav Park, Rohtak Road, Nangloi, Delhi",
    city: "Delhi",
    state: "Delhi",
    postalCode: "110041",
    country: "India",
  },
  social: {
    facebook: getOptionalPublicUrl("NEXT_PUBLIC_SOCIAL_FACEBOOK"),
    instagram: getOptionalPublicUrl("NEXT_PUBLIC_SOCIAL_INSTAGRAM"),
    x: getOptionalPublicUrl("NEXT_PUBLIC_SOCIAL_X"),
  },
};

/* ================= PAGE LEVEL SEO ================= */

export const pageSeo: Record<string, SeoPage> = {
  home: {
    title:
      "Solar Inverter, EV Charger & Solar Panel Manufacturer in India",
    description:
      "Fujitek Solar Energy manufactures on-grid, off-grid, and hybrid solar inverters, solar panels, batteries, smart PWM charge controllers, and EV chargers across India.",
    canonicalPath: "/",
  },

  products: {
    title:
      "Solar Inverters, EV Chargers & Charge Controllers | Fujitek Products",
    description:
      "Explore Fujitek solar products including on-grid inverters, hybrid inverters, solar batteries, smart PWM charge controllers, lithium e-rickshaw chargers, and electric scooty chargers.",
    canonicalPath: "/products",
  },

  services: {
    title:
      "Solar Inverters, EV Chargers & Energy Hardware | Fujitek",
    description:
      "Fujitek Solar Energy manufactures high-performance solar inverters, batteries, smart charge controllers, and EV chargers for dealers and bulk buyers.",
    canonicalPath: "/services",
  },

  about: {
    title:
      "About Fujitek Solar Energy | Renewable Energy Equipment Manufacturer",
    description:
      "Learn about Fujitek Solar Energy, a Delhi-based manufacturer of solar inverters, panels, batteries, and EV charging solutions serving customers across India.",
    canonicalPath: "/about",
  },

  contact: {
    title:
      "Contact Fujitek Solar Energy | Solar & EV Charger Manufacturer",
    description:
      "Get in touch with Fujitek Solar Energy for product inquiries, bulk orders, dealership opportunities, and technical support.",
    canonicalPath: "/contact",
  },
};

/* ================= METADATA BUILDER ================= */

const DEFAULT_OG_IMAGE_PATH = "/images/solar_panels.webp";

function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, siteSeo.url).toString();
}

export function buildPageMetadata(page: SeoPage): Metadata {
  const canonicalUrl = `${siteSeo.url}${page.canonicalPath ?? ""}`;
  const ogImageUrl = toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    metadataBase: new URL(siteSeo.url),

    title: {
      default: page.title,
      template: `%s | ${siteSeo.name}`,
    },

    description: page.description,
    keywords: page.keywords ?? siteSeo.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      type: "website",
      siteName: siteSeo.name,
      locale: "en_IN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteSeo.name} solar solutions`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImageUrl],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

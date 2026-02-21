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
    facebook: string;
    instagram: string;
    x: string;
  };
};

export const siteSeo = {
  name: "Fujitek Solar Energy",
  url: "https://www.fujiteksolar.com",
  description:
    "Fujitek Solar Energy provides high-efficiency solar panels, inverters, and end-to-end solar solutions for homes, businesses, and industries across India.",
  keywords: [
    "solar energy",
    "solar inverter",
    "solar panels",
    "solar installation",
    "renewable energy",
    "fujitek solar",
  ],
  business: {
    areaServed: "India",
    phone: "+918447097751",
    email: "info@fujiteksolar.com",
    address: "A5, Yadav Park, Rohtak Road, Nangloi, Delhi, India, 110041",
    city: "Delhi",
    state: "Delhi",
    postalCode: "110041",
    country: "India",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    x: "https://x.com",
  },
} satisfies SiteSeo;

export const pageSeo = {
  home: {
    title: "Solar & Inverter Solutions for Homes and Businesses",
    description:
      "Explore Fujitek Solar Energy services, products, and projects for reliable solar power systems across residential, commercial, and industrial needs.",
    canonicalPath: "/",
  },
  products: {
    title: "Solar Products: Panels, Inverters, Batteries and Components",
    description:
      "Browse Fujitek solar products including panels, inverters, battery storage, monitoring systems, and installation accessories.",
    canonicalPath: "/products",
  },
  services: {
    title: "Solar Installation Services in Uttar Pradesh | Fujitek",
    description:
      "Residential and commercial solar, inverter, EV charger installation and maintenance across Lucknow, Noida, Kanpur, and nearby UP cities.",
    canonicalPath: "/service",
  },
  about: {
    title: "About Fujitek Solar Energy and Our Mission",
    description:
      "Learn about Fujitek Solar Energy, our journey, mission, and commitment to reliable renewable energy solutions in India.",
    canonicalPath: "/about",
  },
  contact: {
    title: "Contact Fujitek Solar Energy for Solar Consultation",
    description:
      "Contact Fujitek Solar Energy for product guidance, installation support, and customized solar energy solutions.",
    canonicalPath: "/contact",
  },
} satisfies Record<string, SeoPage>;

export function buildPageMetadata(page: SeoPage): Metadata {
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords ?? siteSeo.keywords,
    alternates: {
      canonical: page.canonicalPath ?? "/",
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      siteName: siteSeo.name,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

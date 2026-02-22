import { siteSeo } from "@/lib/seo";

type ProductSchemaInput = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

const ORG_ID = `${siteSeo.url}#organization`;
const LOCAL_BUSINESS_ID = `${siteSeo.url}#local-business`;

function getSameAsLinks() {
  return [siteSeo.social.facebook, siteSeo.social.instagram, siteSeo.social.x].filter(
    (url): url is string => Boolean(url && /^https?:\/\//.test(url)),
  );
}

export function getOrganizationSchema() {
  const sameAs = getSameAsLinks();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteSeo.name,
    url: siteSeo.url,
    logo: `${siteSeo.url}/fujitek-logo-tab.svg`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: siteSeo.business.areaServed,
        telephone: siteSeo.business.phone,
        email: siteSeo.business.email,
        availableLanguage: ["English", "Hindi"],
      },
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    name: siteSeo.name,
    image: `${siteSeo.url}/fujitek-logo-tab.svg`,
    url: siteSeo.url,
    telephone: siteSeo.business.phone,
    email: siteSeo.business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSeo.business.address,
      addressLocality: siteSeo.business.city,
      addressRegion: siteSeo.business.state,
      postalCode: siteSeo.business.postalCode,
      addressCountry: siteSeo.business.country,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    parentOrganization: {
      "@id": ORG_ID,
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteSeo.url,
    name: siteSeo.name,
    publisher: {
      "@id": ORG_ID,
    },
    inLanguage: "en-IN",
  };
}

export function getProductListSchema(products: ProductSchemaInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fujitek Solar Products",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${siteSeo.url}/products#${product.id}`,
        name: product.name,
        category: product.category,
        image: product.image,
        brand: {
          "@type": "Brand",
          name: siteSeo.name,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `${siteSeo.url}/products`,
        },
      },
    })),
  };
}

import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { defaultLocale, normalizeLocale } from "@/lib/i18n";
import { siteSeo } from "@/lib/seo";
import { getLocalBusinessSchema, getOrganizationSchema, getWebsiteSchema } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteSeo.name} | Solar & Inverter Solutions`,
    template: `%s | ${siteSeo.name}`,
  },
  description: siteSeo.description,
  keywords: siteSeo.keywords,
  metadataBase: new URL(siteSeo.url),
  icons: {
    icon: "/images/logos/fujitek-logo-tab.svg",
    shortcut: "/images/logos/fujitek-logo-tab.svg",
    apple: "/images/logos/fujitek-logo-tab.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const localeFromHeader = normalizeLocale(requestHeaders.get("x-locale"));
  const lang = localeFromHeader ?? defaultLocale;
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebsiteSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`bg-app ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={localBusinessSchema} />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteSeo } from "@/lib/seo";

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
  openGraph: {
    title: `${siteSeo.name} | Solar & Inverter Solutions`,
    description: siteSeo.description,
    type: "website",
    siteName: siteSeo.name,
    url: siteSeo.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSeo.name} | Solar & Inverter Solutions`,
    description: siteSeo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-app ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

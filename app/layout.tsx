import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "@/components/Providers";

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
    default: "Fujitek Solar Energy | Solar & Inverter Solutions",
    template: "%s | Fujitek Solar Energy",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}

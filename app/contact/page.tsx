import type { Metadata } from "next";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = buildPageMetadata(pageSeo.contact);

export default function ContactPage() {
  return <ContactPageClient />;
}

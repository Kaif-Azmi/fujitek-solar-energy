"use client";

import { useState } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteSeo } from "@/lib/seo";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
} from "@/components/ui";
import { Phone, Mail, MapPin, Facebook, Instagram, X } from "lucide-react";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden {...props}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-221.7 99.3-221.7 221.7 0 39.1 10.2 77.3 29.6 111L0 480l118.7-31.1c32.7 17.8 69.5 27.2 107.3 27.2h.1c122.3 0 221.7-99.3 221.7-221.7 0-59.3-23.1-115-65-157.3zM223.9 438.7h-.1c-33.1 0-65.5-8.9-93.8-25.8l-6.7-4-70.4 18.5 18.8-68.6-4.4-7c-18.6-29.6-28.4-63.7-28.4-98.6 0-102 83-185 185-185 49.5 0 96.1 19.3 131.2 54.3 35.1 35.1 54.4 81.8 54.4 131.3 0 102-83 184.9-185 184.9zm101.4-138.2c-5.5-2.8-32.8-16.1-37.9-17.9-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.3 17.9-17.6 21.5-3.2 3.7-6.5 4.1-12 .9-32.6-16.3-54-29.1-75.6-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.1-4.5-10.8-9.1-9.4-12.5-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9s-19.4 18.9-19.4 46 19.8 53.3 22.5 57c2.8 3.7 38.9 59.4 94.3 83.2 35 15.1 48.7 16.4 66.2 13.8 10.7-1.6 32.8-13.4 37.4-26.3 4.6-12.9 4.6-24 3.2-26.3-1.3-2.3-5-3.7-10.5-6.5z" />
    </svg>
  );
}

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  company: "",
  location: "",
  inquiryType: "",
  message: "",
};

export default function Contact() {
  const contactNumber = siteSeo.business.phone;
  const contactNumberDisplay = "+91 84470 97751";
  const contactEmail = siteSeo.business.email;

  const whatsappMessage = encodeURIComponent(
    "Hi Fujitek Solar Energy, I am interested in your solar inverters / EV chargers. Please share product details and pricing."
  );
  const whatsappLink = `https://wa.me/${contactNumber.replace("+", "")}?text=${whatsappMessage}`;

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to submit your inquiry.");
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Submission failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection
        badge="CONTACT SALES"
        title="Partner with Fujitek Solar Energy"
        highlight="Bulk Supply & Dealer Inquiries"
        description="Connect with our sales and product team for bulk orders, dealership opportunities, OEM partnerships, and technical product details."
      />

      <section className="relative overflow-hidden">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-5">

            {/* ================= FORM ================= */}
            <ScrollReveal className="order-1 md:col-span-3">
              {submitted && (
                <Alert variant="success" className="mb-6">
                  <AlertDescription>
                    Thank you. Our sales team will contact you shortly.
                  </AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Card variant="primary" className="rounded-2xl shadow-strong">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    Request Product Details or Pricing
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <div>
                      <label className="mb-2 block text-sm text-white">
                        Name
                      </label>
                      <Input
                        variant="inverse"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white">
                        Email
                      </label>
                      <Input
                        variant="inverse"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white">
                        Phone
                      </label>
                      <Input
                        variant="inverse"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white">
                        Company / Business Name
                      </label>
                      <Input
                        variant="inverse"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white">
                        Location
                      </label>
                      <Input
                        variant="inverse"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full rounded-md border border-accent bg-primary text-white px-3 py-2"
                        required
                      >
                        <option value="">Select</option>
                        <option>Solar Inverters</option>
                        <option>Solar Panels</option>
                        <option>EV Chargers</option>
                        <option>Smart PWM Charge Controllers</option>
                        <option>Bulk / Dealer Inquiry</option>
                        <option>OEM Partnership</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm text-white">
                        Message / Requirement
                      </label>
                      <Textarea
                        variant="inverse"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[140px]"
                        placeholder="Share your product requirement, expected quantity, or dealership interest."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="sm:col-span-2 h-12"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* ================= CONTACT INFO ================= */}
            <ScrollReveal delay={0.08} className="order-2 md:col-span-2">
              <Card className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <CardHeader className="border-b border-border/60 bg-white pb-5">
                  <p className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Sales Support
                  </p>
                  <CardTitle className="text-2xl text-foreground md:text-[1.8rem]">
                    Talk to Our <span className="highlight text-primary">Sales Team</span>
                  </CardTitle>
                  <p className="text-[1.05rem] leading-relaxed text-secondary">
                    Explore our{" "}
                    <Link
                      href="/products"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      product portfolio
                    </Link>{" "}
                    for pricing, dealership opportunities, and bulk supply discussions.
                  </p>
                </CardHeader>

                <CardContent className="space-y-3.5 bg-white">
                  {[
                    {
                      id: "call",
                      label: "Call",
                      text: contactNumberDisplay,
                      href: `tel:${contactNumber}`,
                      icon: Phone,
                    },
                    {
                      id: "whatsapp",
                      label: "WhatsApp",
                      text: contactNumberDisplay,
                      href: whatsappLink,
                      icon: null,
                    },
                    {
                      id: "email",
                      label: "Email",
                      text: contactEmail,
                      href: `mailto:${contactEmail}`,
                      icon: Mail,
                    },
                    {
                      id: "location",
                      label: "Location",
                      text: siteSeo.business.address,
                      icon: MapPin,
                    },
                  ].map((item) => {
                    const isWhatsApp = item.id === "whatsapp";
                    const isWholeCardLink =
                      (item.id === "call" ||
                        item.id === "whatsapp" ||
                        item.id === "email") &&
                      Boolean(item.href);
                    const cardBaseClass =
                      "rounded-2xl border border-border/70 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]";

                    const rowContent = (
                      <>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              isWhatsApp
                                ? "bg-[#25D366]/15 text-[#25D366]"
                                : "bg-primary/12 text-primary"
                            }`}
                          >
                            {isWhatsApp ? (
                              <WhatsAppIcon className="h-[18px] w-[18px]" />
                            ) : (
                              item.icon && <item.icon className="h-5 w-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                              {item.label}
                            </p>
                            {item.href && !isWholeCardLink ? (
                              <a
                                href={item.href}
                                target={item.href.startsWith("https://") ? "_blank" : undefined}
                                rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                                className="break-words text-[1.03rem] font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                              >
                                {item.text}
                              </a>
                            ) : (
                              <p className="text-[1.03rem] font-medium text-foreground">{item.text}</p>
                            )}
                          </div>
                        </div>
                      </>
                    );

                    if (isWholeCardLink && item.href) {
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          target={item.href.startsWith("https://") ? "_blank" : undefined}
                          rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                          className={`${cardBaseClass} block cursor-pointer no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40`}
                          aria-label={`${item.label} ${item.text}`}
                        >
                          {rowContent}
                        </a>
                      );
                    }

                    return (
                      <div key={item.id} className={cardBaseClass}>
                        {rowContent}
                      </div>
                    );
                  })}

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 flex items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366] px-4 py-3 text-[1.05rem] font-semibold text-white shadow-[0_8px_18px_rgba(37,211,102,0.28)] transition hover:bg-[#1ebe57] hover:border-[#1ebe57]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>

                  <p className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5 text-sm leading-relaxed text-secondary">
                    Looking for dealer pricing or bulk supply? Message us on WhatsApp and our team will share product details quickly.
                  </p>

                  <div className="flex gap-3 pt-1">
                    {[siteSeo.social.instagram, siteSeo.social.facebook, siteSeo.social.x]
                      .filter(Boolean)
                      .map((href, index) => {
                        const icons = [Instagram, Facebook, X];
                        const Icon = icons[index];
                        return (
                          <a
                            key={href}
                            href={href!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white text-secondary transition hover:border-primary hover:bg-primary hover:text-white"
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

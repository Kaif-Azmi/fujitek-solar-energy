"use client";

import { useState } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, X } from "lucide-react";

export default function Contact() {
  const contactNumber = "+918447097751";
  const contactNumberDisplay = "+91 84470 97751";
  const whatsappMessage = encodeURIComponent(
    "Hi Fujitek Solar Energy, I am interested in your solar solutions. Please share details."
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    service: "",
    contactTime: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <HeroSection
        badge="CONTACT US"
        title="Let&apos;s Power Your Future"
        highlight="with Trusted Solar Solutions"
        description="Fill out the form and our experts will guide you with the best solar solution tailored to your needs."
      />

      <section className="relative overflow-hidden" aria-label="Contact Fujitek Solar Energy">
        <InfiniteGrid className="z-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-5">
            <ScrollReveal className="order-1 md:order-2 md:col-span-3">
              {submitted && (
                <Alert variant="success" className="mb-6">
                  <AlertDescription>
                    Thank you for your message. We&apos;ll contact you shortly.
                  </AlertDescription>
                </Alert>
              )}

              <Card
                variant="primary"
                className="rounded-2xl border border-primary-hover/40 shadow-strong"
              >
                <CardHeader className="border-white/20">
                  <CardTitle className="text-2xl text-white">Leave us a message</CardTitle>
                </CardHeader>

                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    aria-label="Solar consultation contact form"
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white">
                        Name
                      </label>
                      <Input
                        id="contact-name"
                        variant="inverse"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white">
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        variant="inverse"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-white">
                        Phone number
                      </label>
                      <Input
                        id="contact-phone"
                        variant="inverse"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-location" className="mb-2 block text-sm font-medium text-white">
                        Location
                      </label>
                      <Input
                        id="contact-location"
                        variant="inverse"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-property-type" className="mb-2 block text-sm font-medium text-white">
                        Type of property
                      </label>
                      <select
                        id="contact-property-type"
                        name="propertyType"
                        onChange={handleChange}
                        className="w-full rounded-md border border-accent bg-primary text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      >
                        <option value="">Select</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-white">
                        Service interested in
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        onChange={handleChange}
                        className="w-full rounded-md border border-accent bg-primary text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      >
                        <option value="">Select</option>
                        <option>Installation</option>
                        <option>Maintenance</option>
                        <option>Consultation</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact-time" className="mb-2 block text-sm font-medium text-white">
                        Preferred time to contact
                      </label>
                      <select
                        id="contact-time"
                        name="contactTime"
                        onChange={handleChange}
                        className="w-full rounded-md border border-accent bg-primary text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/40"
                      >
                        <option value="">Select</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white">
                        Specific Requirement
                      </label>
                      <Textarea
                        id="contact-message"
                        variant="inverse"
                        name="message"
                        onChange={handleChange}
                        className="min-h-[140px]"
                        placeholder="Tell us more about your requirement"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="sm:col-span-2 h-12">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="order-2 md:order-1 md:col-span-2">
              <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">Talk to Our Solar Team</h2>

              <p className="mt-6 max-w-md text-secondary">
                Fill out the form and our experts will guide you with the best solar solution tailored to your needs. You can also review our{" "}
                <Link href="/products" className="text-primary underline-offset-4 hover:underline">
                  solar products
                </Link>{" "}
                and{" "}
                <Link href="/service" className="text-primary underline-offset-4 hover:underline">
                  installation services
                </Link>
                .
              </p>

              <div className="my-8 space-y-6">
                {[
                  { icon: Phone, text: contactNumberDisplay, href: `tel:${contactNumber}` },
                  {
                    icon: MessageCircle,
                    text: `WhatsApp: ${contactNumberDisplay}`,
                    href: `https://wa.me/${contactNumber.replace("+", "")}?text=${whatsappMessage}`,
                  },
                  { icon: Mail, text: "contact@yourdomain.com" },
                  { icon: MapPin, text: "Office address goes here" },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("https://") ? "_blank" : undefined}
                        rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}
                        className="text-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        {text}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{text}</p>
                    )}
                  </div>
                ))}
              </div>

              <p className="max-w-md rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-secondary">
                Prefer WhatsApp? Message us on <span className="font-semibold text-foreground">{contactNumberDisplay}</span> and our team will reply with consultation details.
              </p>

              <div className="mt-8 flex gap-3">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: X, label: "X" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary transition-colors hover:bg-primary hover:text-background"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}


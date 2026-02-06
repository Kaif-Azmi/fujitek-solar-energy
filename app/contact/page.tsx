"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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

export default function Contact() {
  const { data: session, status } = useSession();

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

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) return;
    setFormData((prev) => ({
      ...prev,
      name: session.user?.name || "",
      email: session.user?.email || "",
    }));
  }, [status, session]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    <section className="min-h-screen bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-5">
          {/* ================= FORM ================= */}
          <div className="order-1 md:order-2 md:col-span-3">
            {submitted && (
              <Alert variant="success" className="mb-6">
                <AlertDescription>
                  Thank you for your message. We’ll contact you shortly.
                </AlertDescription>
              </Alert>
            )}

            <Card className="rounded-2xl border border-border/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Leave us a message
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Phone number
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Location
                    </label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Type of property
                    </label>
                    <select
                      name="propertyType"
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Service interested in
                    </label>
                    <select
                      name="service"
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Installation</option>
                      <option>Maintenance</option>
                      <option>Consultation</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Preferred time to contact
                    </label>
                    <select
                      name="contactTime"
                      onChange={handleChange}
                      className="w-full rounded-md border border-border bg-background px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Specific Requirement
                    </label>
                    <Textarea
                      name="message"
                      onChange={handleChange}
                      className="min-h-[140px]"
                      placeholder="Tell us more about your requirement"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="sm:col-span-2 h-12"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* ================= INFO ================= */}
          <div className="order-2 md:order-1 md:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
              <Phone className="h-4 w-4" />
              Contact
            </span>

            <h1 className="mt-6 text-3xl font-extrabold md:text-4xl">
              Let’s Power Your
              <span className="block text-primary">Future with Solar</span>
            </h1>

            <p className="mt-6 max-w-md text-secondary">
              Fill out the form and our experts will guide you with the best
              solar solution tailored to your needs.
            </p>

            <div className="my-8 space-y-6">
              {[
                { icon: Phone, text: "+91 98869 89292" },
                { icon: Mail, text: "contact@yourdomain.com" },
                { icon: MapPin, text: "Office address goes here" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-foreground">{text}</p>
                </div>
              ))}
            </div>

            {/* ================= SOCIAL ICONS ================= */}
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
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full
                    bg-secondary/20
                    text-secondary
                    transition-colors
                    hover:bg-primary
                    hover:text-background
                  "
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

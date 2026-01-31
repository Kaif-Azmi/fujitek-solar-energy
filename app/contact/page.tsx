'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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
  MapPin,
  Phone,
  Mail,
} from '@/components/ui';

export default function Contact() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return;

    setFormData((prev) => ({
      ...prev,
      name: prev.name || session.user?.name || '',
      email: prev.email || session.user?.email || '',
    }));
  }, [status, session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface py-section">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <header className="mb-14 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-secondary">
            Have questions about our solar solutions? We’d love to hear from you.
          </p>
        </header>

        {/* Success Alert */}
        {submitted && (
          <Alert variant="success" className="mb-6">
            <AlertDescription>
              Thank you for your message. We’ll get back to you shortly.
            </AlertDescription>
          </Alert>
        )}

        {/* Contact Form */}
        <Card className="mb-14">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icon: MapPin, title: 'Address', value: 'Coming soon' },
            { icon: Phone, title: 'Phone', value: 'Coming soon' },
            { icon: Mail, title: 'Email', value: 'Coming soon' },
          ].map((item) => (
            <Card
              key={item.title}
              className="flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="py-8">
                <item.icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="mb-1 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Icons (INLINE SVGs) */}
        <div className="mt-14 flex justify-center gap-6">
          {/* X */}
          <a
            href="#"
            aria-label="X"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M18.244 2H21l-6.52 7.45L22 22h-6.77l-5.3-6.6L4.3 22H1.5l6.97-7.97L2 2h6.92l4.8 6.02L18.244 2z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A4.5 4.5 0 1112 17a4.5 4.5 0 010-9zm0 2A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zm4.75-.9a1.05 1.05 0 11-1.05-1.05 1.05 1.05 0 011.05 1.05z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.5l-.4 3h-2.1v7A10 10 0 0022 12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

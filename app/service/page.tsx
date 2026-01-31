import Link from 'next/link';
import { Card, CardContent, CardTitle, Button } from '@/components/ui';

interface Service {
  title: string;
  description: string;
}

export default function Service() {
  const services: Service[] = [
    { title: 'Installation', description: 'Professional installation of solar panels and complete system setup with certified technicians' },
    { title: 'Consultation', description: 'Expert consultation to determine the best solar solution for your property and needs' },
    { title: 'System Design', description: 'Custom design of solar energy systems optimized for your specific location and usage' },
    { title: 'Maintenance', description: 'Regular maintenance and cleaning to ensure optimal system performance throughout the year' },
    { title: 'Monitoring', description: 'Real-time monitoring of system performance with detailed analytics and reporting' },
    { title: 'Support', description: '24/7 customer support and quick response time for any issues or questions' },
  ];

  const highlights = [
    'Experienced and certified technicians',
    'Quality products and workmanship guaranteed',
    'Competitive pricing and flexible payment options',
    'Comprehensive warranty and after-sales support',
  ];

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-section">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Comprehensive solar energy solutions from consultation to ongoing support and maintenance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center justify-center h-full text-center">
              <CardContent className="p-6 flex flex-col items-center justify-center w-full">
                <CardTitle className="mb-3">{service.title}</CardTitle>
                <p className="text-secondary leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-16 p-8 bg-background flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Services?</h2>
          <ul className="space-y-4 text-secondary text-left max-w-md">
            {highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white text-sm font-medium" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-16 text-center">
          <p className="text-secondary mb-4">Ready to go solar?</p>
          <Link href="/contact">
            <Button variant="default" size="lg">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

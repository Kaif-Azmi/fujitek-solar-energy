import Link from 'next/link';
import { Card, CardContent, CardTitle, Leaf, Star, Handshake, Rocket, Button } from '@/components/ui';
import MissionLottie from '@/components/MissionLottie';

export default function About() {
  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '5MWh', label: 'Energy Generated' },
  ];

  const values = [
    { icon: Leaf, title: 'Sustainability', description: 'Committed to environmental protection' },
    { icon: Star, title: 'Quality', description: 'Best materials and workmanship' },
    { icon: Handshake, title: 'Integrity', description: 'Transparent and honest dealings' },
    { icon: Rocket, title: 'Innovation', description: 'Latest technology and solutions' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary py-section">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Fujitek Solar Energy</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Leading the sustainable energy revolution with innovative solar solutions
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-section">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-section">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-secondary mb-4 leading-relaxed">
              At Fujitek Solar Energy, we are committed to making renewable energy accessible and affordable for everyone.
              Our mission is to help businesses and homeowners transition to clean, sustainable solar power.
            </p>
            <p className="text-secondary leading-relaxed">
              We believe that solar energy is the future, and we are dedicated to providing the highest quality products
              and services to support your journey toward energy independence.
            </p>
          </div>
          <div className="w-full">
            <MissionLottie />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-section">
          {stats.map((stat, i) => (
            <Card key={i} className="flex flex-col items-center justify-center min-h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center w-full">
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-secondary">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mb-section">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="flex flex-col items-center justify-center min-h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center w-full">
                  <Icon className="mx-auto mb-3" />
                  <CardTitle className="mb-2">{title}</CardTitle>
                  <p className="text-sm text-secondary">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-section">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Team</h2>
          <p className="text-secondary text-center max-w-2xl mx-auto leading-relaxed">
            Our expert team consists of experienced engineers, technicians, and customer service professionals
            dedicated to delivering exceptional service and results.
          </p>
        </section>

        <Card className="overflow-hidden border-primary">
          <div
            className="flex min-h-[220px] flex-col items-center justify-center gap-4 p-8 text-center"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            <h3 className="text-2xl font-bold text-white">Join Us in the Solar Revolution</h3>
            <p className="text-white/90 text-base">Ready to make a difference? Contact us today to learn more.</p>
            <Link href="/contact">
              <Button variant="inverse" size="lg">Get Started</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

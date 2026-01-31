import { Card, CardContent, CardTitle } from './ui/card';

interface Service {
  title: string;
  shortDescription?: string;
  description?: string;
}

interface ServicesPreviewProps {
  services?: Service[];
}

export default function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  return (
    <section className="w-full" aria-label="Services">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center justify-center h-full text-center">
              <CardContent className="pt-6 flex flex-col items-center justify-center flex-1 w-full">
                <CardTitle className="mb-3 text-lg">{service.title}</CardTitle>
                <p className="text-sm text-muted leading-relaxed flex-1">{service.shortDescription || service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

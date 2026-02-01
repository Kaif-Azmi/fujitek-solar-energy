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
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Services
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted">
            End-to-end solar and inverter services designed to deliver reliable performance and long-term value.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="
                group relative
                flex h-full flex-col
                border border-border
                bg-background
                transition-all duration-300

                hover:-translate-y-1
                hover:shadow-xl
                hover:border-primary/40
              "
            >
              {/* Icon placeholder (future-ready) */}
              <div className="flex items-center justify-center pt-6">
                <div
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-full
                    bg-primary/10 text-primary
                    transition-all
                    group-hover:bg-primary
                    group-hover:text-white
                  "
                >
                  ⚡
                </div>
              </div>

              <CardContent className="flex flex-1 flex-col items-center text-center p-6">
                {/* Service title */}
                <CardTitle className="mb-3 text-lg font-semibold text-foreground">
                  {service.title}
                </CardTitle>

                {/* Description */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                  {service.shortDescription || service.description}
                </p>

                {/* Action cue */}
                <span
                  className="
                    text-sm font-medium text-primary
                    opacity-0 transition-opacity
                    group-hover:opacity-100
                  "
                >
                  Learn more →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

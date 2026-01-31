import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button } from './ui';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What types of inverters does Fujitek offer?',
    answer:
      'We provide a range of inverters including string inverters and hybrid inverters optimized for residential and commercial installations across Indian grid conditions.',
  },
  {
    question: 'Do you provide installation and commissioning?',
    answer:
      'Yes — Fujitek offers end-to-end support from site assessment, installation, and commissioning to ensure systems run at peak efficiency.',
  },
  {
    question: 'What warranties do you offer?',
    answer:
      'Our products come with industry-standard manufacturer warranties and we provide after-sales service to support warranty claims and maintenance.',
  },
  {
    question: 'Can I monitor system performance remotely?',
    answer:
      'Most Fujitek inverters support remote monitoring and performance analytics so you can track production and system health in real time.',
  },
  {
    question: 'How quickly is after-sales support available?',
    answer:
      'We maintain a trusted after-sales network to ensure prompt service — typical response times vary by region but we prioritise urgent issues.',
  },
  {
    question: 'Do you offer solutions for industrial sites?',
    answer:
      'Yes. We design scalable systems for industrial and commercial sites with tailored engineering and project management services.',
  },
];

export default function FaqSection() {
  return (
    <section className="w-full bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start md:items-center">
          {/* Left: FAQ list (60%) */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">FAQ</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold text-foreground">Common Questions</h2>
              <p className="mt-3 text-muted max-w-2xl">Answers to the most common questions we receive.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FAQS.map((f, i) => (
                <Card key={i} className="relative rounded-lg border-border shadow-sm min-h-40">
                  {/* question icon - positioned top-right */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-sm text-muted shadow">?</div>
                  </div>

                  <CardHeader className="p-6 pr-14">
                    <CardTitle className="text-lg">{f.question}</CardTitle>
                  </CardHeader>

                  <div className="border-t border-border" />

                  <CardContent className="p-6 pt-3 text-sm text-muted leading-relaxed">{f.answer}</CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Support card (40%) */}
          <div className="md:col-span-2 flex items-center">
            <Card className="rounded-lg border-border shadow-sm w-full card--accent-border flex min-h-[280px] flex-col items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center text-center p-8 w-full">
                <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center mb-4 text-success" aria-hidden>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4.2A8.01 8.01 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-foreground">Still have Questions?</h3>
                <p className="mt-2 text-sm text-secondary">Our team will answer all your questions. We ensure a quick response.</p>

                <div className="mt-6 w-full max-w-xs">
                  <Link href="/contact">
                    <Button className="w-full" variant="default">Contact Support</Button>
                  </Link>
                </div>

                <p className="mt-4 text-xs text-muted">Available Monday–Saturday · Response within 24–48 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { Highlighter } from "@/components/ui/highlighter";
import SectionHeader from "@/components/ui/section-header";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

interface ProjectsPreviewProps {
  projects?: Project[];
  ariaLabel?: string;
  heading?: string;
  description?: string;
  badgeLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

const PROJECTS_PREVIEW_DEFAULTS = {
  ariaLabel: "Recent solar projects",
  heading: "Recent Solar Installations",
  description:
    "A snapshot of solar and inverter projects successfully delivered across residential, commercial, and industrial sites.",
  badgeLabel: "Projects",
  ctaHref: "/contact",
  ctaLabel: "Discuss a similar solar project",
};

const PROJECT_IMAGE_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZThlZWY2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZDNlMmYwIi8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==";

function ProjectIcon({ index }: { index: number }) {
  const icons: PublicIconName[] = ["solar-panel", "microchip", "network"];
  const name = icons[index % icons.length];
  return <PublicIcon name={name} className="h-6 w-6" />;
}

function ProjectTag({ index }: { index: number }) {
  const tags = ["Residential", "Industrial", "Commercial"] as const;
  return tags[index % tags.length];
}

export default function ProjectsPreview({
  projects = [],
  ariaLabel = PROJECTS_PREVIEW_DEFAULTS.ariaLabel,
  heading = PROJECTS_PREVIEW_DEFAULTS.heading,
  description = PROJECTS_PREVIEW_DEFAULTS.description,
  badgeLabel = PROJECTS_PREVIEW_DEFAULTS.badgeLabel,
  ctaHref = PROJECTS_PREVIEW_DEFAULTS.ctaHref,
  ctaLabel = PROJECTS_PREVIEW_DEFAULTS.ctaLabel,
}: ProjectsPreviewProps) {
  return (
    <section className="relative w-full overflow-hidden py-section" aria-label={ariaLabel}>
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mb-12 flex flex-col items-center gap-6 text-center md:mb-14 md:flex-row md:items-end md:justify-between md:text-left">
          <SectionHeader
            badge={badgeLabel}
            title={
              <Highlighter
                action="underline"
                color="var(--accent)"
                strokeWidth={2}
                animationDuration={700}
                iterations={1}
              >
                {heading}
              </Highlighter>
            }
            description={description}
          />

          <Button asChild variant="explore" size="lg" className="shrink-0">
            <Link href={ctaHref} aria-label={ctaLabel}>
              {ctaLabel}
            </Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={`${project.title}-${index}`}>
              <Card className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-accent/15 blur-2xl" />
                  <div className="absolute -right-20 -bottom-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
                </div>

                <Link
                  href={ctaHref}
                  aria-label={`${project.title}: ${ctaLabel}`}
                  className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />

                <CardContent className="relative flex h-full flex-col p-6">
                  <div className="relative mb-5 overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt ?? `${project.title} installation`}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                        quality={72}
                        placeholder="blur"
                        blurDataURL={PROJECT_IMAGE_BLUR_DATA_URL}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <ProjectIcon index={index} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {ProjectTag({ index })}
                        </p>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {project.title}
                        </CardTitle>
                      </div>
                    </div>

                    <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-secondary transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary">
                      <span className="text-sm font-semibold" aria-hidden>
                        {">"}
                      </span>
                    </div>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-secondary">
                    {project.description}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-primary">{ctaLabel}</p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardTitle } from "@/components/ui";
import { Briefcase, Factory, Home } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
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

const ProjectIcon = ({ index }: { index: number }) => {
  const icons = [Home, Factory, Briefcase];
  const Icon = icons[index % icons.length];
  return <Icon className="h-5 w-5" strokeWidth={1.8} />;
};

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
    <section
      className="w-full py-28 bg-surface-elevated"
      aria-label={ariaLabel}
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-20 text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            {badgeLabel}
          </span>

          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-foreground">
            {heading}
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={index}>
              <Card
                className="
                  group relative
                  flex h-full flex-col
                  rounded-2xl
                  bg-surface-elevated
                  border border-border
                  shadow-medium
                  transition-all duration-300

                  hover:-translate-y-2
                  hover:shadow-strong
                  hover:border-primary/40
                "
              >
                {/* Accent Glow */}
                <div
                  className="
                    pointer-events-none absolute -top-20 -right-20
                    h-56 w-56 rounded-full
                    bg-accent/30 blur-3xl
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                  "
                />

                <CardContent className="relative flex flex-1 flex-col p-8">

                  {/* ================= ICON ================= */}
                  <div
                    className="
                      mb-6 flex h-12 w-12 items-center justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                      transition-all duration-300

                      group-hover:bg-primary
                      group-hover:text-white
                      group-hover:scale-110
                    "
                  >
                    <ProjectIcon index={index} />
                  </div>

                  {/* ================= TITLE ================= */}
                  <CardTitle className="mb-3 text-lg font-semibold text-foreground">
                    {project.title}
                  </CardTitle>

                  {/* ================= DESCRIPTION ================= */}
                  <p className="mb-8 flex-1 text-sm leading-relaxed text-secondary">
                    {project.description}
                  </p>

                  {/* ================= CTA ================= */}
                  <Link
                    href={ctaHref}
                    className="
                      inline-flex items-center gap-1
                      text-sm font-semibold
                      text-primary
                      transition-all duration-300
                    "
                  >
                    {ctaLabel}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

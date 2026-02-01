import { Card, CardContent, CardTitle } from '@/components/ui'

interface Project {
  title: string;
  description: string;
}

interface ProjectsPreviewProps {
  projects?: Project[];
}

export default function ProjectsPreview({ projects = [] }: ProjectsPreviewProps) {
  return (
    <section className="w-full" aria-label="Recent projects">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            Projects
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Recent Projects
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted">
            A snapshot of solar and inverter projects successfully delivered across residential, commercial, and industrial sites.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
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
                hover:border-secondary/40
              "
            >
              {/* Accent bar (navy = execution / engineering) */}
              <div className="h-1 w-full bg-secondary" />

              <CardContent className="flex flex-1 flex-col p-6 text-left">
                {/* Project title */}
                <CardTitle className="mb-3 text-lg font-semibold text-foreground">
                  {project.title}
                </CardTitle>

                {/* Description */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {/* Execution cue */}
                <span className="text-sm font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                  View project →
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

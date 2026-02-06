import { Card, CardContent, CardTitle } from '@/components/ui'
import { Briefcase, Factory, Home } from 'lucide-react'

interface Project {
  title: string
  description: string
}

interface ProjectsPreviewProps {
  projects?: Project[]
}

const ProjectIcon = ({ index }: { index: number }) => {
  const icons = [Home, Factory, Briefcase]
  const Icon = icons[index % icons.length]
  return <Icon className="h-5 w-5" strokeWidth={1.8} />
}

export default function ProjectsPreview({ projects = [] }: ProjectsPreviewProps) {
  return (
    <section className="w-full py-24 bg-surface" aria-label="Recent projects">
      <div className="mx-auto max-w-6xl px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center rounded-full border border-secondary/40 px-4 py-1.5 text-sm font-medium text-secondary">
            Projects
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-foreground">
            Recent Solar Installations
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-secondary leading-relaxed">
            A snapshot of solar and inverter projects successfully delivered
            across residential, commercial, and industrial sites.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="
                group relative
                flex h-full flex-col
                rounded-xl
                border border-border
                bg-background
                transition-all duration-300 ease-out

                hover:-translate-y-1.5
                hover:shadow-2xl
                hover:border-secondary/60
              "
            >
              {/* ================= TOP SIGNAL LINE ================= */}
              <div className="relative h-[2px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-secondary/60" />
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-primary via-accent to-secondary
                    opacity-0
                    transition-opacity duration-300
                    group-hover:opacity-100
                  "
                />
              </div>

              <CardContent className="relative flex flex-1 flex-col p-7">

                {/* ================= ICON ================= */}
                <div
                  className="
                    mb-6 flex h-11 w-11 items-center justify-center
                    rounded-lg
                    border border-secondary/40
                    text-secondary
                    transition-all duration-300

                    group-hover:border-primary
                    group-hover:text-primary
                    group-hover:scale-105
                  "
                >
                  <ProjectIcon index={index} />
                </div>

                {/* ================= TITLE ================= */}
                <CardTitle className="mb-3 text-lg font-semibold text-foreground">
                  {project.title}
                </CardTitle>

                {/* ================= DESCRIPTION ================= */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-secondary">
                  {project.description}
                </p>

                {/* ================= CTA ================= */}
                <span
                  className="
                    inline-flex items-center gap-1
                    text-sm font-medium
                    text-secondary
                    transition-all duration-300

                    group-hover:text-primary
                  "
                >
                  View project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

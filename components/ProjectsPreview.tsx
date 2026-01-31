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
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col items-center justify-center h-full text-center">
              <CardContent className="pt-6 flex flex-col items-center justify-center w-full">
                <CardTitle className="mb-3">{project.title}</CardTitle>
                <p className="text-muted">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

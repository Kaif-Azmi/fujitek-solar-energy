import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export default function ProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-slate-500 mt-1">Manage project showcases</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">Project showcases and management will appear here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}

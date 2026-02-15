import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export default function LeadsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl text-strong">Leads</h1>
        <p className="text-slate-500 mt-1">View and manage contact submissions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">Leads and contact submissions will appear here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}


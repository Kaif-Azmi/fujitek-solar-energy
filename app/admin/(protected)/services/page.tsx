import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
          <h1 className="text-3xl text-strong">Services</h1>
          <p className="text-slate-500 mt-1">Manage service offerings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-slate-600">Service listings and editing will appear here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}


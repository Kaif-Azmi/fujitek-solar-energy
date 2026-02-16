import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function LeadsPage() {
  return (
    <div className="p-6 space-y-6">
      <ScrollReveal>
        <div>
          <h1 className="text-3xl text-strong">Leads</h1>
          <p className="text-slate-500 mt-1">View and manage contact submissions</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.06}>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Leads and contact submissions will appear here soon.</p>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}


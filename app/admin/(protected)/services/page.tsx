import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-6">
      <ScrollReveal>
        <div>
            <h1 className="text-3xl text-strong">Services</h1>
            <p className="text-slate-500 mt-1">Manage service offerings</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.06}>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-slate-600">Service listings and editing will appear here soon.</p>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}


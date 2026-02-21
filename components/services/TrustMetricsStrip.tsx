import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui";

type MetricItem = {
  value: string;
  label: string;
};

type TrustMetricsStripProps = {
  items: MetricItem[];
};

export default function TrustMetricsStrip({ items }: TrustMetricsStripProps) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <div className="grid gap-3 min-[500px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {items.map((item, index) => (
            <Card
              key={item.label}
              className={cn(
                "border-border/70 shadow-none hover:translate-y-0 hover:shadow-none",
                index % 2 === 0 ? "bg-primary" : "bg-accent",
              )}
            >
              <CardContent className="px-4 py-4 sm:py-5">
                <div className={cn("inline-flex items-center gap-2", index % 2 === 0 ? "text-accent" : "text-primary")}>
                  <BadgeCheck className="h-4 w-4" aria-hidden />
                  <p className="text-sm font-semibold uppercase tracking-wide">{item.value}</p>
                </div>
                <p className={cn("mt-2 text-sm leading-7", index % 2 === 0 ? "text-white" : "text-secondary")}>{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


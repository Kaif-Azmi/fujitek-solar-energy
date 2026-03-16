import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";
import { PublicIcon } from "@/components/ui/icons";

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
          {items.map((item, index) => {
            const isPrimaryCard = index % 2 === 0;
            return (
              <Card
                key={item.label}
                className={cn(
                  "relative overflow-hidden border-0 shadow-[0_10px_26px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.18)]",
                  isPrimaryCard
                    ? "bg-gradient-to-br from-primary-deep to-primary"
                    : "bg-gradient-to-br from-accent to-[#7edc74]",
                )}
              >
                <CardContent className="px-5 py-5 sm:px-6 sm:py-6">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-2.5 py-1",
                      isPrimaryCard
                        ? "border-white/35 bg-white/15 text-white"
                        : "border-primary-deep/20 bg-white/45 text-primary-deep",
                    )}
                  >
                    <PublicIcon name="shield" className="h-4 w-4" />
                    <p
                      className={cn(
                        "text-xs font-bold uppercase tracking-[0.12em] leading-none",
                        isPrimaryCard ? "text-white" : "text-primary-deep",
                      )}
                    >
                      {item.value}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "mt-3 text-base font-medium leading-7 sm:text-[1.03rem]",
                      isPrimaryCard ? "text-white" : "text-primary-deep",
                    )}
                  >
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


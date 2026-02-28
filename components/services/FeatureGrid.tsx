import type { FeatureItem } from "@/components/services/types";
import { Card, CardContent, CardTitle } from "@/components/ui";

type FeatureGridProps = {
  title?: string;
  items: FeatureItem[];
};

export default function FeatureGrid({ title, items }: FeatureGridProps) {
  return (
    <div className="mt-10">
      {title ? <h3 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h3> : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.title}
            className="h-full border-primary/70 bg-primary shadow-[0_10px_24px_rgba(22,63,109,0.24)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(22,63,109,0.3)]"
          >
            <CardContent className="p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                {item.icon}
              </div>
              <CardTitle className="mt-4 text-lg font-semibold text-white">{item.title}</CardTitle>
              <p className="mt-2 text-[0.98rem] font-medium leading-7 text-white">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

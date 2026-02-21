import type { FeatureItem } from "@/components/services/types";
import { Card, CardContent, CardTitle } from "@/components/ui";

type FeatureGridProps = {
  title?: string;
  items: FeatureItem[];
};

export default function FeatureGrid({ title, items }: FeatureGridProps) {
  return (
    <div className="mt-10">
      {title ? <h3 className="text-lg font-semibold text-foreground sm:text-xl">{title}</h3> : null}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.title}
            className="h-full border-primary/70 bg-primary shadow-none hover:translate-y-0 hover:shadow-none"
          >
            <CardContent className="p-5">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">
                {item.icon}
              </div>
              <CardTitle className="mt-4 text-base text-white">{item.title}</CardTitle>
              <p className="mt-2 text-sm leading-7 text-white/90">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

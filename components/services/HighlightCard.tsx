import { CheckCircle2 } from "lucide-react";
import type { HighlightItem } from "@/components/services/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type HighlightCardProps = {
  title: string;
  description?: string;
  items: HighlightItem[];
};

export default function HighlightCard({ title, description, items }: HighlightCardProps) {
  return (
    <Card className="border-border/70 bg-background shadow-none hover:translate-y-0 hover:shadow-none">
      <CardHeader className="border-border/60 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
        <CardTitle className="text-lg text-foreground">{title}</CardTitle>
        {description ? <p className="text-sm leading-7 text-secondary">{description}</p> : null}
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
              <p className="text-sm leading-7 text-secondary">
                <span className="font-semibold text-foreground">{item.label}: </span>
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

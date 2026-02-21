import Link from "next/link";
import type { CtaLink } from "@/components/services/types";
import { Card, CardContent, CardTitle } from "@/components/ui";
import Button from "@/components/ui/button";

type CTASectionProps = {
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
};

export default function CTASection({ title, description, primary, secondary }: CTASectionProps) {
  return (
    <Card className="border-border/70 bg-background shadow-none hover:translate-y-0 hover:shadow-none">
      <CardContent className="p-5 sm:p-8">
        <CardTitle className="text-lg text-foreground sm:text-xl">{title}</CardTitle>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-secondary sm:text-base">{description}</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild variant="explore" size="default" className="w-auto">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button asChild variant="outline" size="default" className="w-auto">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}




import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  badge?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  badgeClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className,
  badgeClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-2xl", centered ? "mx-auto text-center" : "", className)}>
      {badge ? (
        <span
          className={cn(
            "inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary",
            badgeClassName,
          )}
        >
          {badge}
        </span>
      ) : null}

      <h2 className={cn("mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl", titleClassName)}>
        {title}
      </h2>

      {description ? (
        <p className={cn("mt-3 text-base leading-relaxed text-secondary", descriptionClassName)}>{description}</p>
      ) : null}
    </div>
  );
}

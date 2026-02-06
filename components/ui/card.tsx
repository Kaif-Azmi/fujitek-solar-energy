import * as React from "react";

/**
 * Card color variants
 */
type CardVariant = "default" | "navy" | "green" | "yellow";

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface",
  navy: "bg-navy/8",
  green: "bg-primary/8",
  yellow: "bg-accent/12",
};

/**
 * CARD
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: CardVariant;
  }
>(({ className = "", variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={`
      group relative rounded-xl
      ${variantStyles[variant]}

      /* single clean border (no pseudo elements) */
      border border-border/30

      /* depth */
      shadow-[0_8px_24px_rgba(0,0,0,0.08)]
      transition-all duration-200 ease-out

      /* hover */
      hover:-translate-y-[1px]
      hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
      hover:border-primary/40

      /* focus */
      focus-within:ring-2
      focus-within:ring-primary/30
      focus-within:ring-offset-2
      focus-within:ring-offset-background

      ${className}
    `}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * CARD HEADER
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`
      flex flex-col gap-1.5
      p-6
      border-b border-border/30
      bg-muted-bg/40
      ${className}
    `}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CARD TITLE
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`
      text-lg font-semibold
      leading-tight tracking-tight
      text-foreground
      ${className}
    `}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CARD DESCRIPTION
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`
      text-sm leading-relaxed
      text-muted
      ${className}
    `}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CARD CONTENT
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`
      p-6
      text-foreground
      ${className}
    `}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/**
 * CARD FOOTER
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`
      flex items-center justify-between
      p-6 pt-4
      border-t border-border/30
      bg-background/80
      ${className}
    `}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

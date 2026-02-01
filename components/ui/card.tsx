import * as React from "react";

/**
 * Card color variants
 * Soft brand-aligned surfaces (solar + inverter)
 */
type CardVariant = "default" | "navy" | "green" | "yellow";

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface",
  navy: "bg-navy/5",
  green: "bg-primary/5",
  yellow: "bg-accent/10",
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
      border border-border/60
      ${variantStyles[variant]}
      shadow-sm
      transition-all duration-200

      hover:shadow-md
      hover:-translate-y-[1px]
      hover:border-primary/40

      focus-within:ring-2
      focus-within:ring-primary/30

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
      flex flex-col space-y-1.5
      p-6
      border-b border-border/40
      bg-muted/30
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
  HTMLParagraphElement,
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
      p-6 pt-0
      border-t border-border/40
      bg-background
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

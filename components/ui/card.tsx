import * as React from "react";

type CardVariant =
  | "default"
  | "navy"
  | "green"
  | "yellow"
  | "primary";

const variantStyles: Record<CardVariant, string> = {
  default: "text-foreground",
  navy: "bg-secondary text-white",
  green: "bg-primary/10 text-foreground",
  yellow: "bg-accent/15 text-foreground",
  primary: "bg-primary text-white",
};

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

      border border-border/30

      shadow-medium
      transition-all duration-200 ease-out

      hover:-translate-y-[2px]
      hover:shadow-strong

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

/* ================= HEADER ================= */

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`
      flex flex-col gap-1.5
      p-6
      border-b border-border/20
      ${className}
    `}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ================= TITLE ================= */

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`
      text-lg font-semibold
      leading-tight tracking-tight
      ${className}
    `}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ================= DESCRIPTION ================= */

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`
      text-sm leading-relaxed
      opacity-80
      ${className}
    `}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ================= CONTENT ================= */

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`p-6 ${className}`}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ================= FOOTER ================= */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`
      flex items-center justify-between
      p-6 pt-4
      border-t border-border/20
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

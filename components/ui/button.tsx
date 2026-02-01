"use client";

import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "explore" | "inverse";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "group inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium " +
      "transition-all duration-200 " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
      "focus-visible:ring-offset-background " + // 🔥 THIS FIXES WHITE FLASH
      "disabled:pointer-events-none disabled:opacity-50";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      /* PRIMARY CTA — YELLOW */
      default:
        "bg-accent text-secondary border border-accent " +
        "shadow-sm " +
        "hover:bg-accent-hover hover:border-accent-hover " +
        "hover:shadow-xl hover:-translate-y-[1px] " +
        "focus-visible:ring-accent/40",

      /* SECONDARY */
      secondary:
        "bg-surface text-foreground border border-border " +
        "hover:border-primary/40 hover:shadow-md " +
        "focus-visible:ring-border/40",

      /* OUTLINE */
      outline:
        "bg-transparent text-primary border border-primary/70 " +
        "hover:bg-primary hover:text-white hover:border-primary " +
        "hover:shadow-md " +
        "focus-visible:ring-primary/40",

      /* DESTRUCTIVE */
      destructive:
        "bg-destructive text-white border border-destructive " +
        "hover:bg-destructive/90 hover:shadow-lg " +
        "focus-visible:ring-destructive/40",

      /* EXPLORE — GREEN */
      explore:
  "bg-primary text-white border border-primary " +
  "hover:bg-primary-hover hover:border-primary-hover " +
  "hover:shadow-lg hover:-translate-y-[1px] " +
  "focus-visible:ring-primary/40",


      /* INVERSE */
      inverse:
        "bg-white text-secondary border border-white/80 " +
        "hover:bg-white hover:shadow-xl " +
        "focus-visible:ring-white/40",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      default: "h-10 px-5 text-sm",
      sm: "h-8 px-3 text-xs rounded-md",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;

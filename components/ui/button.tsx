"use client";

import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "explore" | "inverse";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium " +
      "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary " +
      "disabled:opacity-50 disabled:pointer-events-none";

      const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
        default:
          "bg-transparent text-primary border border-primary " +
          "hover:bg-primary hover:text-primary-foreground " +
          "focus:outline-none focus:ring-2 focus:ring-primary/40 " +
          "transition-all duration-200 shadow-sm",
      
        secondary:
          "bg-surface text-foreground border border-border " +
          "hover:bg-hover hover:border-primary/40 " +
          "focus:outline-none focus:ring-2 focus:ring-border/40 " +
          "transition-colors",
      
        outline:
          "bg-transparent text-primary border border-primary/70 " +
          "hover:bg-primary/10 hover:border-primary " +
          "focus:outline-none focus:ring-2 focus:ring-primary/30 " +
          "transition-colors",
      
        destructive:
          "bg-destructive text-white border border-destructive " +
          "hover:bg-destructive/90 " +
          "focus:outline-none focus:ring-2 focus:ring-destructive/40 " +
          "transition-colors",
      
        explore:
          "bg-primary/5 text-primary border border-primary/40 " +
          "hover:bg-primary hover:text-primary-foreground hover:border-primary " +
          "focus:outline-none focus:ring-2 focus:ring-primary/40 " +
          "shadow-sm transition-all",
      
        inverse:
          "bg-white text-primary border border-primary " +
          "hover:bg-primary hover:text-white " +
          "focus:outline-none focus:ring-2 focus:ring-primary/40 " +
          "transition-colors",
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

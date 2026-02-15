"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "explore" | "exploreInverse";
  size?: "default" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isExploreVariant =
      variant === "explore" || variant === "exploreInverse";

    const baseClasses =
      "group inline-flex items-center justify-center whitespace-nowrap font-medium " +
      "transition-all duration-200 " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
      "focus-visible:ring-offset-background " +
      "disabled:pointer-events-none disabled:opacity-50";

    const defaultSizeClasses = {
      default: "h-10 px-5 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-lg",
    };

    const exploreSizeClasses = {
      default: "h-11 pl-6 pr-2 text-sm",
      lg: "h-12 pl-7 pr-2 text-base",
    };

    const defaultVariantClasses =
      "bg-accent text-secondary border border-accent " +
      "shadow-sm hover:bg-accent-hover hover:border-accent-hover " +
      "hover:shadow-xl hover:-translate-y-[1px] " +
      "focus-visible:ring-accent/40";

    const exploreVariantClasses =
      "relative rounded-full bg-primary text-white border border-primary " +
      "shadow-md hover:shadow-lg " +
      "hover:bg-primary-hover hover:border-primary-hover font-semibold " +
      "focus-visible:ring-primary/40";

    const exploreInverseVariantClasses =
      "relative rounded-full bg-accent text-primary border border-accent " +
      "shadow-md hover:shadow-lg " +
      "hover:bg-accent-hover hover:border-accent-hover font-semibold " +
      "focus-visible:ring-accent/40";

    const iconClasses = cn(
      "inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1",
      size === "lg" ? "h-9 w-9" : "h-8 w-8",
      variant === "explore"
        ? "bg-accent text-primary"
        : "bg-primary text-accent"
    );

    const arrowClasses = cn(
      size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]",
      "stroke-[2.8]"
    );

    if (asChild && isExploreVariant) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;

      return React.cloneElement(
        child,
        {
          ...props,
          className: cn(
            baseClasses,
            "w-auto justify-between gap-3",
            exploreSizeClasses[size],
            variant === "explore"
              ? exploreVariantClasses
              : exploreInverseVariantClasses,
            child.props.className,
            className
          ),
        },
        <span className="inline-flex items-center gap-3">
          <span className="font-semibold">{child.props.children}</span>
          <span aria-hidden className={iconClasses}>
            <ArrowRight className={arrowClasses} />
          </span>
        </span>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          baseClasses,
          isExploreVariant
            ? cn(
                "w-auto justify-between gap-3",
                exploreSizeClasses[size],
                variant === "explore"
                  ? exploreVariantClasses
                  : exploreInverseVariantClasses
              )
            : cn(defaultSizeClasses[size], defaultVariantClasses),
          className
        )}
        {...props}
      >
        {isExploreVariant ? (
          <span className="inline-flex items-center gap-3">
            <span className="font-semibold">
              <Slottable>{children}</Slottable>
            </span>
            <span aria-hidden className={iconClasses}>
              <ArrowRight className={arrowClasses} />
            </span>
          </span>
        ) : (
          <Slottable>{children}</Slottable>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;

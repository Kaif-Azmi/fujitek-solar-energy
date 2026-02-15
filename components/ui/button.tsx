"use client";

import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "explore";
  size?: "default" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "group inline-flex items-center justify-center whitespace-nowrap font-medium " +
      "transition-all duration-200 " +
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
      "focus-visible:ring-offset-background " +
      "disabled:pointer-events-none disabled:opacity-50";

    const sizes = {
      default: "h-10 px-5 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-lg",
    };

    const defaultStyle =
      "bg-accent text-secondary border border-accent " +
      "shadow-sm hover:bg-accent-hover hover:border-accent-hover " +
      "hover:shadow-xl hover:-translate-y-[1px] " +
      "focus-visible:ring-accent/40";

    const exploreStyle =
      "relative rounded-full pl-7 pr-2 py-2.5 " +
      "bg-primary text-white border border-primary " +
      "shadow-md hover:shadow-lg " +
      "hover:bg-primary-hover hover:border-primary-hover " +
      "focus-visible:ring-primary/40";

    return (
      <button
        ref={ref}
        className={`${base} ${
          variant === "explore" ? exploreStyle : `${sizes[size]} ${defaultStyle}`
        } ${className}`}
        {...props}
      >
        {variant === "explore" ? (
          <>
            <span className="mr-4">{children}</span>

            <span
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-accent
                text-primary
                transition-transform duration-200
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;

import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "inverse";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white text-foreground border-border placeholder:text-muted",
      inverse: "bg-primary text-white border-accent placeholder:text-white/60",
    };
    const variantFocusStyles = {
      default: "",
      inverse: "focus:ring-accent/40",
    };

    return (
      <input
        ref={ref}
        type={type}
        className={`
          flex h-10 w-full rounded-lg
          border px-3 py-2
          text-sm
          ${variantStyles[variant]}

          transition-colors duration-200
          hover:border-primary/40

          focus:outline-none
          focus:border-primary
          focus:ring-2
          focus:ring-primary/30
          focus:ring-offset-2
          focus:ring-offset-background
          ${variantFocusStyles[variant]}

          disabled:cursor-not-allowed
          disabled:opacity-50

          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={`
        flex h-10 w-full rounded-lg
        border border-border
        bg-background px-3 py-2
        text-sm text-foreground
        placeholder:text-muted

        transition-colors duration-200
        hover:border-primary/40

        focus:outline-none
        focus:border-primary
        focus:ring-2
        focus:ring-primary/30
        focus:ring-offset-2
        focus:ring-offset-background

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };

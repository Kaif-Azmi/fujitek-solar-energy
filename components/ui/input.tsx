import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => (
    <input
      type={type}
      className={
        "flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 " +
        "text-sm text-foreground placeholder:text-muted " +
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary " +
        "disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };

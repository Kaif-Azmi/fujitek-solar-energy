import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "inverse";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white text-foreground border-border placeholder:text-muted",
      inverse: "bg-primary text-white border-accent placeholder:text-white/60",
    };
    const variantFocusStyles = {
      default: "",
      inverse: "focus:ring-accent/40",
    };

    return (
      <textarea
        ref={ref}
        className={`
          flex min-h-[6rem] w-full rounded-lg
          px-3 py-2
          text-sm
          border
          ${variantStyles[variant]}

          shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]

          resize-y
          transition-all duration-200 ease-out

          hover:border-border/60

          focus:outline-none
          focus:border-primary/50
          focus:shadow-[0_0_0_1px_rgba(0,0,0,0.02)]
          focus:ring-2
          focus:ring-primary/30
          focus:ring-offset-1
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

Textarea.displayName = "Textarea";

export { Textarea };

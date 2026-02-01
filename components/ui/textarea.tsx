import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`
        flex min-h-[6rem] w-full rounded-lg
        border border-border
        bg-background px-3 py-2
        text-sm text-foreground
        placeholder:text-muted

        resize-y
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

Textarea.displayName = "Textarea";

export { Textarea };

import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`
        flex min-h-[6rem] w-full rounded-lg
        bg-background px-3 py-2
        text-sm text-foreground
        placeholder:text-muted

        /* base border (soft) */
        border border-border/40

        /* subtle depth to avoid flat look */
        shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]

        resize-y
        transition-all duration-200 ease-out

        /* hover */
        hover:border-border/60

        /* focus */
        focus:outline-none
        focus:border-primary/50
        focus:shadow-[0_0_0_1px_rgba(0,0,0,0.02)]
        focus:ring-2
        focus:ring-primary/30
        focus:ring-offset-1
        focus:ring-offset-background

        /* disabled */
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

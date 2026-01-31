import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      className={
        "flex min-h-[6rem] w-full rounded-lg border border-border bg-background px-3 py-2 " +
        "text-sm text-foreground placeholder:text-muted " +
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 " +
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y " +
        className
      }
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };

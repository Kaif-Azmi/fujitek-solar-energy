import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variants = {
      /* Neutral / info */
      default:
        "bg-surface border-border text-foreground",

      /* Error / danger */
      destructive:
        "bg-destructive-bg border-destructive/40 text-foreground",

      /* Success / solar-positive */
      success:
        "bg-success-bg border-success/40 text-foreground",
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

/* ===============================
   SUBCOMPONENTS
   =============================== */

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-semibold leading-tight text-foreground ${className}`}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm leading-relaxed text-secondary ${className}`}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

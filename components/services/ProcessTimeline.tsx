import type { ProcessStep } from "@/components/services/types";

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative rounded-2xl border border-border/80 bg-background p-5 shadow-[0_8px_22px_rgba(15,23,42,0.06)]"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-sm font-bold text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-base font-semibold leading-tight text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-secondary">{step.description}</p>
            </div>
          </div>

          {index < steps.length - 1 ? (
            <span
              className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-primary/35 xl:block"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

import type { ProcessStep } from "@/components/services/types";

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="mt-8 space-y-6 md:flex md:items-start md:space-y-0">
      {steps.map((step, index) => (
        <li key={step.title} className="relative md:flex-1">
          <div className="flex items-start md:block">
            <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-foreground">
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span className="absolute left-5 top-10 h-[calc(100%-2rem)] w-px bg-border md:left-1/2 md:top-5 md:h-px md:w-full" aria-hidden />
            ) : null}
            <div className="ml-4 md:ml-0 md:mt-4 md:pr-5">
              <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-7 text-secondary md:max-w-none">{step.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

import type { ProcessStep } from "@/components/services/types";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

const STEP_ICONS: PublicIconName[] = [
  "network",
  "microchip",
  "handshake",
  "truck",
  "support",
  "shield",
];

const STEP_STYLES = [
  {
    glow: "bg-primary/16",
    panel: "from-white via-white to-primary-soft/45",
    badge: "border-primary/20 bg-primary-soft text-primary-deep",
    iconWrap: "border-primary/15 bg-white/90",
  },
  {
    glow: "bg-accent/28",
    panel: "from-white via-white to-accent-soft/80",
    badge: "border-accent/40 bg-accent-soft text-primary-deep",
    iconWrap: "border-accent/30 bg-white/90",
  },
  {
    glow: "bg-primary/20",
    panel: "from-white via-white to-primary/10",
    badge: "border-primary/25 bg-primary/10 text-primary-deep",
    iconWrap: "border-primary/20 bg-white/90",
  },
  {
    glow: "bg-accent/24",
    panel: "from-white via-white to-primary-soft/30",
    badge: "border-primary/20 bg-white text-primary-deep",
    iconWrap: "border-primary/15 bg-accent-soft/85",
  },
] as const;

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="mt-10">
      <div className="relative">
        {steps.length > 1 ? (
          <div
            className="pointer-events-none absolute left-10 right-10 top-8 hidden h-px bg-gradient-to-r from-primary/10 via-primary/35 to-primary/10 xl:block"
            aria-hidden
          />
        ) : null}

        <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const icon = STEP_ICONS[index % STEP_ICONS.length];
            const style = STEP_STYLES[index % STEP_STYLES.length];
            const progressWidth = `${((index + 1) / steps.length) * 100}%`;

            return (
              <li key={step.title} className="group relative">
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-8 top-4 h-24 rounded-full blur-3xl opacity-80 transition-opacity duration-300 group-hover:opacity-100",
                    style.glow,
                  )}
                />

                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-to-br p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]",
                    style.panel,
                  )}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-accent/80 to-primary/20" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-2.5 py-2 shadow-sm backdrop-blur-sm">
                      <span
                        className={cn(
                          "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
                          style.badge,
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("grid h-12 w-12 place-items-center rounded-full border shadow-sm", style.iconWrap)}>
                        <PublicIcon name={icon} className="h-6 w-6" />
                      </span>
                    </div>

                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary-deep/55">
                      {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-6 flex-1">
                    <h3 className="text-[1.35rem] font-semibold leading-[1.15] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[0.97rem] leading-7 text-secondary">{step.description}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-primary-hover to-accent transition-all duration-500"
                        style={{ width: progressWidth }}
                      />
                    </div>
                    <span className="rounded-full border border-border/70 bg-white/85 px-2.5 py-1 text-[0.7rem] font-semibold text-primary-deep shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {index < steps.length - 1 ? (
                    <span
                      className="pointer-events-none absolute -right-3 top-8 hidden h-6 w-6 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-sm xl:flex"
                      aria-hidden
                    >
                      {">"}
                    </span>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

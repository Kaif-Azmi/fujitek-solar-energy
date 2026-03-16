"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";

type FlowItem = {
  title: string;
  description: string;
};

interface WhyChooseFlowProps {
  leftLabel: string;
  rightLabel: string;
  leftItems: FlowItem[];
  rightItems: FlowItem[];
}

function IconNode({
  icon,
  label,
  nodeRef,
  className,
}: {
  icon: PublicIconName;
  label: string;
  nodeRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const orbitId = React.useMemo(() => {
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return slug ? `icon-orbit-${slug}` : "icon-orbit";
  }, [label]);

  return (
    <div
      ref={nodeRef}
      className={cn(
        "absolute z-10 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-white/30 via-white/20 to-white/10 text-white shadow-[0_12px_30px_rgba(8,23,42,0.28)] ring-1 ring-white/10 backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-105 sm:h-16 sm:w-16",
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full text-black/80"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <defs>
          <path
            id={orbitId}
            d="M 32 6 a 26 26 0 1 1 0 52 a 26 26 0 1 1 0 -52"
          />
        </defs>
        <g className="origin-center animate-[spin_12s_linear_infinite]">
          <text
            className="fill-current text-[7px] font-semibold uppercase tracking-[0.18em]"
            textAnchor="middle"
          >
            <textPath href={`#${orbitId}`} startOffset="25%">
              {label} • {label}
            </textPath>
          </text>
        </g>
      </svg>
      <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/85 text-brand shadow-[0_10px_24px_rgba(8,23,42,0.35)] ring-1 ring-white/60 sm:h-10 sm:w-10">
        <PublicIcon name={icon} className="h-7 w-7 sm:h-8 sm:w-8" />
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function WhyChooseFlow({
  leftItems,
  rightItems,
  leftLabel,
  rightLabel,
}: WhyChooseFlowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const leftUpperRef = React.useRef<HTMLDivElement>(null);
  const leftTopRef = React.useRef<HTMLDivElement>(null);
  const leftBottomRef = React.useRef<HTMLDivElement>(null);
  const coreRef = React.useRef<HTMLDivElement>(null);
  const rightUpperRef = React.useRef<HTMLDivElement>(null);
  const rightTopRef = React.useRef<HTMLDivElement>(null);
  const rightBottomRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative rounded-2xl border border-white/12 bg-primary-deep/68 px-6 py-8 shadow-[0_18px_45px_rgba(8,23,43,0.28)] sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-center text-[0.72rem] font-semibold tracking-[0.12em] text-accent shadow-[0_10px_26px_rgba(6,22,42,0.42)] backdrop-blur">
        Fujitek Solar · {leftLabel} + {rightLabel}
      </div>
      <div
        ref={containerRef}
        className="relative mx-auto h-[18rem] w-full max-w-[44rem] sm:h-[20rem]"
      >
        <IconNode
          icon="solar-panel"
          label="Solar systems"
          nodeRef={leftUpperRef}
          className="left-0 top-0 sm:left-2 sm:top-0"
        />
        <IconNode
          icon="microchip"
          label={leftItems[0]?.title ?? "Power Electronics"}
          nodeRef={leftTopRef}
          className="left-0 top-1/2 -translate-y-1/2 sm:left-2"
        />
        <IconNode
          icon="battery"
          label={leftItems[1]?.title ?? "Solar and EV Portfolio"}
          nodeRef={leftBottomRef}
          className="bottom-0 left-0 sm:bottom-0 sm:left-2"
        />
        <IconNode
          icon="truck"
          label="Supply logistics"
          nodeRef={rightUpperRef}
          className="right-0 top-0 sm:right-2 sm:top-0"
        />
        <IconNode
          icon="handshake"
          label={rightItems[0]?.title ?? "OEM and Bulk Supply"}
          nodeRef={rightTopRef}
          className="right-0 top-1/2 -translate-y-1/2 sm:right-2"
        />
        <IconNode
          icon="shield"
          label={rightItems[1]?.title ?? "Quality Standards"}
          nodeRef={rightBottomRef}
          className="bottom-0 right-0 sm:bottom-0 sm:right-2"
        />

        <div
          ref={coreRef}
          className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-white/80 via-white/40 to-white/10 p-4 shadow-[0_14px_40px_rgba(8,23,42,0.28)] ring-1 ring-white/10 backdrop-blur-sm sm:h-24 sm:w-24"
        >
          <Image
            src="/images/logos/fujitek-logo-tab.svg"
            alt="Fujitek logo"
            width={48}
            height={48}
            sizes="(max-width: 640px) 40px, 48px"
            loading="lazy"
            decoding="async"
            className="h-auto w-10 sm:w-12"
          />
          <span className="sr-only">Fujitek Core</span>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={leftUpperRef}
          toRef={coreRef}
          gradientId="beam-left-upper"
          curvature={76}
          duration={4.6}
          delay={0.05}
          pathColor="rgba(255,255,255,0.20)"
          pathWidth={2.4}
          pathOpacity={0.95}
          gradientStartColor="#b6f2a9"
          gradientStopColor="#d8f7cf"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={leftTopRef}
          toRef={coreRef}
          gradientId="beam-left-top"
          curvature={0}
          duration={4.8}
          delay={0.1}
          pathColor="rgba(255,255,255,0.20)"
          pathWidth={2.4}
          pathOpacity={0.95}
          gradientStartColor="#9eea8f"
          gradientStopColor="#d8f7cf"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={leftBottomRef}
          toRef={coreRef}
          gradientId="beam-left-bottom"
          curvature={-76}
          duration={5.1}
          delay={0.45}
          pathColor="rgba(255,255,255,0.20)"
          pathWidth={2.4}
          pathOpacity={0.95}
          gradientStartColor="#84df74"
          gradientStopColor="#d8f7cf"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={coreRef}
          toRef={rightUpperRef}
          gradientId="beam-right-upper"
          curvature={76}
          duration={4.7}
          delay={0.12}
          pathColor="rgba(255,255,255,0.20)"
          pathWidth={2.4}
          pathOpacity={0.95}
          gradientStartColor="#ffffff"
          gradientStopColor="#79c4ff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={coreRef}
          toRef={rightTopRef}
          gradientId="beam-right-top"
          curvature={0}
          duration={4.9}
          delay={0.2}
          pathColor="rgba(255,255,255,0.20)"
          pathWidth={2.4}
          pathOpacity={0.95}
          gradientStartColor="#ffffff"
          gradientStopColor="#82c8ff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={coreRef}
          toRef={rightBottomRef}
          gradientId="beam-right-bottom"
          curvature={-76}
          duration={5.2}
          delay={0.55}
          pathColor="rgba(255,255,255,0.20)"
          pathWidth={2.4}
          pathOpacity={0.95}
          gradientStartColor="#ffffff"
          gradientStopColor="#8bb8ff"
        />
      </div>
    </div>
  );
}

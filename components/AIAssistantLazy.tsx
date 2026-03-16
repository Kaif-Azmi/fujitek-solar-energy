"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PublicIcon } from "@/components/ui/icons";

const AIAssistant = dynamic(() => import("./AIAssistant"), {
  ssr: false,
});

export default function AIAssistantLazy() {
  const [enabled, setEnabled] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);

  if (!enabled) {
    return (
      <div className="group fixed bottom-6 right-6 z-50">
        <div className="pointer-events-none absolute -inset-2 rounded-full bg-accent blur-md transition-opacity duration-300 group-hover:opacity-100" />
        <button
          type="button"
          onClick={() => {
            setAutoOpen(true);
            setEnabled(true);
          }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-hover to-primary-deep text-white shadow-[0_18px_40px_rgba(12,38,79,0.35)] ring-2 ring-white/20"
          aria-label="Open solar AI advisor"
        >
          <PublicIcon name="support" className="h-9 w-9" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-background bg-accent text-primary">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </button>
      </div>
    );
  }

  return <AIAssistant startOpen={autoOpen} />;
}

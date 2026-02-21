"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AIAssistant = dynamic(() => import("./AIAssistant"), {
  ssr: false,
});

export default function AIAssistantLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const loadAssistant = () => setEnabled(true);

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(loadAssistant, { timeout: 2200 });
    } else {
      timeoutId = setTimeout(loadAssistant, 1000);
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <AIAssistant />;
}

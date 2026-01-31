"use client";

import { Button } from "@/components/ui";
import * as React from "react";

export function ExploreButton() {
  return (
    <Button
      variant="explore"
      className="
        rounded-full px-6 py-6 text-base font-medium
        shadow-lg hover:shadow-xl
        transition-all flex items-center gap-3
      "
    >
      <span>Explore</span>

      <span
        className="
          flex h-9 w-9 items-center justify-center rounded-full
          border border-primary text-primary
          transition-colors
          group-hover:bg-primary group-hover:text-primary-foreground
        "
        aria-hidden="true"
      >
        {/* ArrowUpRight Icon */}
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M7 17L17 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7h10v10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Button>
  );
}

export default ExploreButton;

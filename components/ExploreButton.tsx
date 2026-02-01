"use client";

import { Button } from "@/components/ui";

export function ExploreButton() {
  return (
    <Button
      variant="explore"
      className="
        group
        rounded-full px-6 py-3 text-base font-medium
        transition-all
        flex items-center gap-3
      "
    >
      <span>Explore</span>

      {/* Arrow circle */}
      <span
  className="
    flex h-9 w-9 items-center justify-center rounded-full

    /* SAFE OVERLAY */
    bg-white/20
    text-current

    transition-all duration-200
  "
  aria-hidden="true"
>

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

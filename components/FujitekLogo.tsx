/**
 * Fujitek Solar company logo for use in cards and UI.
 * Text + sun icon in brand colors (no third-party assets).
 */

export default function FujitekLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 text-primary font-semibold text-sm tracking-tight ${className}`}
      aria-label="Fujitek Solar"
    >
      <svg
        className="h-6 w-6 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <span>Fujitek Solar</span>
    </div>
  );
}

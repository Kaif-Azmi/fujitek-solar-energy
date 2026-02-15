"use client";

type Status = "active" | "inactive";

type Props = {
  value: Status;
  onChange: (next: Status) => void;
  disabled?: boolean;
};

export default function StatusToggle({ value, onChange, disabled }: Props) {
  const active = value === "active";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      disabled={disabled}
      onClick={() => onChange(active ? "inactive" : "active")}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
        active ? "bg-emerald-500" : "bg-slate-300"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          active ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}


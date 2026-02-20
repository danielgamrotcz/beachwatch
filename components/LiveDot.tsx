"use client";

export function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-open)]"
        style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-open)]" />
    </span>
  );
}

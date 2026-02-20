"use client";

interface StatCardProps {
  label: string;
  value: string;
  color?: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--color-surface)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        border: "1px solid var(--color-border)",
      }}
    >
      <p
        className="text-[11px] font-medium uppercase tracking-wider"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {label}
      </p>
      <p
        className="tabular-nums mt-1 text-2xl font-bold"
        style={{ letterSpacing: "-0.03em", color: color ?? "var(--color-text)" }}
      >
        {value}
      </p>
    </div>
  );
}

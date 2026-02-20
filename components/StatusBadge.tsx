"use client";

import { BeachStatusType } from "@/lib/types";
import { Lang } from "@/lib/i18n";

interface StatusBadgeProps {
  status: BeachStatusType;
  label: { en: string; cs: string };
  lang: Lang;
}

export function StatusBadge({ status, label, lang }: StatusBadgeProps) {
  const colors: Record<BeachStatusType, string> = {
    open: "var(--color-open)",
    narrow: "var(--color-narrow)",
    flooded: "var(--color-flooded)",
  };

  const color = colors[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        color,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {label[lang]}
    </span>
  );
}

"use client";

import { BeachState } from "@/lib/types";
import { Lang, t } from "@/lib/i18n";
import { StatusBadge } from "./StatusBadge";

interface BeachCardProps {
  state: BeachState;
  lang: Lang;
  selected: boolean;
  onClick: () => void;
}

export function BeachCard({ state, lang, selected, onClick }: BeachCardProps) {
  const { beach, status, currentHeight, trend } = state;
  const trendLabel = t(lang, `trend.${trend}`);

  return (
    <button
      onClick={onClick}
      className="beach-card w-full text-left rounded-2xl p-5 transition-shadow"
      style={{
        background: "var(--color-surface)",
        boxShadow: selected
          ? "0 0 0 2px var(--color-accent), 0 4px 20px rgba(0,0,0,0.08)"
          : "0 1px 3px rgba(0,0,0,0.04)",
        border: selected ? "none" : "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">{beach.icon}</span>
            <h3 className="text-[17px] font-semibold truncate" style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}>
              {beach.name}
            </h3>
          </div>
          <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-tertiary)" }}>{beach.nameTh}</p>
        </div>
        <StatusBadge status={status.status} labelKey={status.labelKey} lang={lang} />
      </div>

      <p className="mt-2 text-sm truncate" style={{ color: "var(--color-text-secondary)" }}>
        {t(lang, beach.descriptionKey)}
      </p>

      <div className="mt-3 flex gap-4">
        <StatCell label={t(lang, "stat.level")} value={`${currentHeight}m`} />
        <StatCell label={t(lang, "beach.tide")} value={trendLabel} />
        <StatCell label={t(lang, "beach.width")} value={status.visibleWidth > 0 ? `${status.visibleWidth}m` : "\u2014"} color={status.color} />
      </div>

      <div className="mt-3">
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${status.widthPercent}%`, background: status.color }} />
        </div>
        <p className="mt-1 text-right text-[11px] tabular-nums" style={{ color: "var(--color-text-tertiary)" }}>{status.widthPercent}%</p>
      </div>
    </button>
  );
}

function StatCell({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--color-text-tertiary)" }}>{label}</p>
      <p className="tabular-nums text-sm font-semibold mt-0.5" style={{ color: color ?? "var(--color-text)" }}>{value}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { BeachState, ForecastWindow } from "@/lib/types";
import { Lang, t } from "@/lib/i18n";
import { getForecastWindows } from "@/lib/tide-status";

function dayPrefix(iso: string, lang: Lang): string {
  const d = new Date(iso);
  const now = new Date();
  // Compare ICT dates
  const toICTDate = (date: Date) => {
    const ict = new Date(date.getTime() + 7 * 3600000);
    return ict.toISOString().slice(0, 10);
  };
  const eventDate = toICTDate(d);
  const todayDate = toICTDate(now);
  if (eventDate === todayDate) return "";
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (eventDate === toICTDate(tomorrow)) return t(lang, "day.tomorrow.short") + " ";
  const weekday = d.toLocaleDateString(lang === "cs" ? "cs-CZ" : lang === "th" ? "th-TH" : "en-US", { weekday: "short" });
  return weekday + " ";
}
import { StatusBadge } from "./StatusBadge";
import { TideChart } from "./TideChart";

interface BeachDetailProps {
  state: BeachState;
  lang: Lang;
  onClose: () => void;
}

export function BeachDetail({ state, lang, onClose }: BeachDetailProps) {
  const { beach, status, currentHeight, events, tideData } = state;
  const forecast = getForecastWindows(tideData, beach);
  const [chartExpanded, setChartExpanded] = useState(false);

  const statusIcon = status.status === "open" ? "\u2705" : status.status === "narrow" ? "\u26a0\ufe0f" : "\ud83d\udeab";

  return (
    <div
      className="flex flex-col gap-5 rounded-2xl p-5"
      style={{ background: "var(--color-surface)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid var(--color-border)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{beach.icon}</span>
          <div>
            <h2 className="text-lg font-bold" style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}>{beach.name}</h2>
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{beach.nameTh}</p>
          </div>
        </div>
        <button onClick={onClose} className="flex items-center justify-center rounded-full min-w-11 min-h-11 transition-colors hover:bg-[var(--color-accent-light)]" aria-label={t(lang, "detail.close")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Status hero */}
      <div className="flex items-center gap-3 rounded-xl p-4" style={{ background: `color-mix(in srgb, ${status.color} 8%, transparent)` }}>
        <span className="text-3xl">{statusIcon}</span>
        <div>
          <StatusBadge status={status.status} labelKey={status.labelKey} lang={lang} />
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-secondary)" }}>{t(lang, status.sublabelKey)}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4">
        <QuickStat label={t(lang, "stat.level")} value={`${currentHeight}m`} />
        <QuickStat label={t(lang, "beach.width")} value={status.visibleWidth > 0 ? `${status.visibleWidth}m / ${beach.properties.beachWidthMax}m` : "\u2014"} />
      </div>

      {/* Chart — tap to expand */}
      <div className="relative cursor-pointer" onClick={() => setChartExpanded(true)}>
        <TideChart data={tideData} beach={beach} lang={lang} compact />
        <div className="absolute top-1 right-1 rounded-md p-1" style={{ background: "var(--color-surface)", opacity: 0.6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="var(--color-text-tertiary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Chart fullscreen overlay */}
      {chartExpanded && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }} onClick={() => setChartExpanded(false)}>
          <div className="w-full max-w-3xl px-3" onClick={(e) => e.stopPropagation()}>
            <TideChart data={tideData} beach={beach} lang={lang} />
          </div>
        </div>
      )}

      {/* Forecast windows */}
      {forecast.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>{t(lang, "forecast.title")}</h3>
          <div className="flex flex-col gap-1.5">
            {forecast.map((w, i) => (
              <ForecastRow key={i} window={w} lang={lang} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming events */}
      {events.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>{t(lang, "detail.upcoming")}</h3>
          <div className="flex flex-col gap-2">
            {events.map((event, i) => {
              const time = new Date(event.time);
              const ictH = (time.getUTCHours() + 7) % 24;
              const hours = ictH.toString().padStart(2, "0");
              const mins = time.getUTCMinutes().toString().padStart(2, "0");
              const prefix = dayPrefix(event.time, lang);
              const icon = event.type === "high" ? "\u2b06\ufe0f" : event.type === "low" ? "\u2b07\ufe0f" : "\ud83c\udf0a";

              return (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  <span className="text-xs">{icon}</span>
                  <span className="tabular-nums font-medium w-[72px]">{prefix}{hours}:{mins}</span>
                  <span>{t(lang, event.labelKey)}</span>
                  {event.height != null && <span className="tabular-nums ml-auto text-xs">{event.height}m</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Google Maps link */}
      <a
        href={beach.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-colors"
        style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}
      >
        {t(lang, "detail.openMaps")} {"\u2197"}
      </a>

      <p className="text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>{t(lang, "footer.disclaimer")}</p>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1">
      <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--color-text-tertiary)" }}>{label}</p>
      <p className="tabular-nums text-sm font-semibold mt-0.5" style={{ color: "var(--color-text)" }}>{value}</p>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = { open: "#34C759", narrow: "#FF9500", flooded: "#FF3B30" };

function ForecastRow({ window: w, lang }: { window: ForecastWindow; lang: Lang }) {
  const formatICT = (iso: string) => {
    const d = new Date(iso);
    const h = (d.getUTCHours() + 7) % 24;
    return `${dayPrefix(iso, lang)}${h.toString().padStart(2, "0")}:00`;
  };
  const timeRange = `${formatICT(w.startTime)}\u2013${formatICT(w.endTime)}`;
  const color = STATUS_COLORS[w.status];
  const label = t(lang, `status.${w.status}`);
  const widthLabel = w.status === "flooded"
    ? "\u2014"
    : w.minWidth === w.maxWidth
      ? `${w.minWidth}m`
      : `${w.minWidth}\u2013${w.maxWidth}m`;

  return (
    <div className="flex items-center gap-2 text-sm" style={{ color }}>
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <span className="tabular-nums font-medium w-[140px]">{timeRange}</span>
      <span className="font-semibold">{label}</span>
      <span className="tabular-nums ml-auto text-xs">{widthLabel}</span>
    </div>
  );
}

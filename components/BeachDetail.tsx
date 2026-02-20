"use client";

import { BeachState } from "@/lib/types";
import { Lang, t } from "@/lib/i18n";
import { StatusBadge } from "./StatusBadge";
import { TideChart } from "./TideChart";

interface BeachDetailProps {
  state: BeachState;
  lang: Lang;
  onClose: () => void;
}

export function BeachDetail({ state, lang, onClose }: BeachDetailProps) {
  const { beach, status, currentHeight, events, tideData } = state;

  const statusIcon =
    status.status === "open"
      ? "\u2705"
      : status.status === "narrow"
        ? "\u26a0\ufe0f"
        : "\ud83d\udeab";

  return (
    <div
      className="flex flex-col gap-5 rounded-2xl p-5"
      style={{
        background: "var(--color-surface)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid var(--color-border)",
      }}
    >
      {/* Close button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{beach.icon}</span>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}
            >
              {beach.name}
            </h2>
            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
              {beach.nameTh}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 transition-colors hover:bg-[var(--color-accent-light)]"
          aria-label={t(lang, "detail.close")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="var(--color-text-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Status hero */}
      <div
        className="flex items-center gap-3 rounded-xl p-4"
        style={{
          background: `color-mix(in srgb, ${status.color} 8%, transparent)`,
        }}
      >
        <span className="text-3xl">{statusIcon}</span>
        <div>
          <StatusBadge status={status.status} label={status.label} lang={lang} />
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {status.sublabel[lang]}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex gap-4">
        <QuickStat label={t(lang, "stat.level")} value={`${currentHeight}m`} />
        <QuickStat
          label={t(lang, "beach.width")}
          value={
            status.visibleWidth > 0
              ? `${status.visibleWidth}m / ${beach.properties.beachWidthMax}m`
              : "\u2014"
          }
        />
      </div>

      {/* Chart */}
      <TideChart data={tideData} beach={beach} lang={lang} compact />

      {/* Upcoming events */}
      {events.length > 0 && (
        <div>
          <h3
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--color-text)" }}
          >
            {t(lang, "detail.upcoming")}
          </h3>
          <div className="flex flex-col gap-2">
            {events.map((event, i) => {
              const time = new Date(event.time);
              const hours = time.getHours().toString().padStart(2, "0");
              const mins = time.getMinutes().toString().padStart(2, "0");
              const icon =
                event.type === "high"
                  ? "\u2b06\ufe0f"
                  : event.type === "low"
                    ? "\u2b07\ufe0f"
                    : "\ud83c\udf0a";

              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span className="text-xs">{icon}</span>
                  <span className="tabular-nums font-medium w-12">
                    {hours}:{mins}
                  </span>
                  <span>{event.label[lang]}</span>
                  {event.height != null && (
                    <span className="tabular-nums ml-auto text-xs">
                      {event.height}m
                    </span>
                  )}
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
        style={{
          background: "var(--color-accent-light)",
          color: "var(--color-accent)",
        }}
      >
        {t(lang, "detail.openMaps")}
        <span className="text-xs">\u2197</span>
      </a>

      {/* Disclaimer */}
      <p className="text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>
        {t(lang, "footer.disclaimer")}
      </p>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1">
      <p
        className="text-[10px] font-medium uppercase tracking-wider"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {label}
      </p>
      <p
        className="tabular-nums text-sm font-semibold mt-0.5"
        style={{ color: "var(--color-text)" }}
      >
        {value}
      </p>
    </div>
  );
}

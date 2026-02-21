"use client";

import { TideData, Beach } from "@/lib/types";
import { Lang, t } from "@/lib/i18n";
import { getBeachStatus } from "@/lib/tide-status";

interface TideChartProps {
  data: TideData;
  beach?: Beach;
  lang: Lang;
  compact?: boolean;
}

const CHART_W = 600;
const BASE_H = 200;
const BAR_H = 30;

export function TideChart({ data, beach, lang, compact }: TideChartProps) {
  const chartH = beach ? BASE_H + BAR_H : BASE_H;
  const padBottom = beach ? 62 : 32;
  const PAD = { top: 24, right: 16, bottom: padBottom, left: 40 };
  const w = CHART_W - PAD.left - PAD.right;
  const h = chartH - PAD.top - PAD.bottom;

  const points = data.points;
  if (points.length < 2) return null;

  const heights = points.map((p) => p.height);
  const minH = Math.min(...heights) - 0.1;
  const maxH = Math.max(...heights) + 0.1;

  const startTime = new Date(points[0].time).getTime();
  const endTime = new Date(points[points.length - 1].time).getTime();
  const timeSpan = endTime - startTime;

  function xScale(ms: number): number {
    return PAD.left + ((ms - startTime) / timeSpan) * w;
  }

  function yScale(height: number): number {
    return PAD.top + h - ((height - minH) / (maxH - minH)) * h;
  }

  const pathD = points
    .map((p, i) => {
      const px = xScale(new Date(p.time).getTime());
      return `${i === 0 ? "M" : "L"}${px},${yScale(p.height)}`;
    })
    .join(" ");

  const lastPt = new Date(points[points.length - 1].time).getTime();
  const firstPt = new Date(points[0].time).getTime();
  const fillD = `${pathD} L${xScale(lastPt)},${PAD.top + h} L${xScale(firstPt)},${PAD.top + h} Z`;

  // Current time marker
  const now = new Date();
  const nowMs = now.getTime();
  const nowInRange = nowMs >= startTime && nowMs <= endTime;
  const nowX = nowInRange ? xScale(nowMs) : null;

  let nowY: number | null = null;
  if (nowInRange) {
    for (let i = 0; i < points.length - 1; i++) {
      const t0 = new Date(points[i].time).getTime();
      const t1 = new Date(points[i + 1].time).getTime();
      if (nowMs >= t0 && nowMs <= t1) {
        const ratio = (nowMs - t0) / (t1 - t0);
        const height = points[i].height + ratio * (points[i + 1].height - points[i].height);
        nowY = yScale(height);
        break;
      }
    }
  }

  // Time labels every 2h in ICT (span two days for data crossing midnight)
  const timeLabels: { x: number; label: string }[] = [];
  const dayStart = new Date(points[0].time);
  dayStart.setUTCHours(0 - 7, 0, 0, 0); // midnight ICT in UTC

  for (let offset = 0; offset <= 48; offset += 4) {
    const ms = dayStart.getTime() + offset * 3600000;
    if (ms >= startTime && ms <= endTime) {
      const displayHour = offset % 24;
      timeLabels.push({
        x: xScale(ms),
        label: `${displayHour.toString().padStart(2, "0")}:00`,
      });
    }
  }

  // Walkability status bar segments
  const walkSegments: { x: number; width: number; color: string }[] = [];
  if (beach) {
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = xScale(new Date(points[i].time).getTime());
      const x1 = xScale(new Date(points[i + 1].time).getTime());
      const midHeight = (points[i].height + points[i + 1].height) / 2;
      const s = getBeachStatus(beach, midHeight);
      walkSegments.push({ x: x0, width: x1 - x0, color: s.color });
    }
  }

  // Threshold lines
  const thresholds = beach
    ? [
        { height: beach.properties.criticalHeight, color: "var(--color-flooded)" },
        { height: beach.properties.narrowHeight, color: "var(--color-narrow)" },
      ].filter((th) => th.height >= minH && th.height <= maxH)
    : [];

  const gradientId = compact ? "tideGradientCompact" : "tideGradient";

  return (
    <div
      className={compact ? "" : "rounded-2xl p-5"}
      style={
        compact
          ? {}
          : {
              background: "var(--color-surface)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid var(--color-border)",
            }
      }
    >
      {!compact && (
        <div className="mb-3">
          <h2 className="text-[17px] font-semibold" style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}>
            {t(lang, "chart.title")}
          </h2>
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            {t(lang, "chart.subtitle")} (ICT, UTC+7)
          </p>
        </div>
      )}
      <svg viewBox={`0 0 ${CHART_W} ${chartH}`} className="w-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <path d={fillD} fill={`url(#${gradientId})`} />

        {thresholds.map((th, i) => (
          <line key={i} x1={PAD.left} y1={yScale(th.height)} x2={PAD.left + w} y2={yScale(th.height)}
            stroke={th.color} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        ))}

        <path d={pathD} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {data.extremes.map((ext, i) => {
          const extMs = new Date(ext.time).getTime();
          const ex = xScale(extMs);
          const ey = yScale(ext.height);
          if (ex < PAD.left || ex > PAD.left + w) return null;
          return (
            <circle key={i} cx={ex} cy={ey} r="3.5" fill="var(--color-accent)" />
          );
        })}

        {nowX !== null && (
          <>
            <line x1={nowX} y1={PAD.top} x2={nowX} y2={PAD.top + h}
              stroke="var(--color-text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
            {nowY !== null && (
              <circle cx={nowX} cy={nowY} r="4.5" fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth="2" />
            )}
          </>
        )}

        {timeLabels.map((tl, i) => (
          <text key={i} x={tl.x} y={PAD.top + h + 18} textAnchor="middle" fontSize="10" fill="var(--color-text-tertiary)">
            {tl.label}
          </text>
        ))}

        {/* Walkability status bar */}
        {walkSegments.length > 0 && (
          <g>
            <clipPath id={compact ? "walkClipCompact" : "walkClip"}>
              <rect x={PAD.left} y={PAD.top + h + 28} width={w} height={8} rx={4} />
            </clipPath>
            <g clipPath={`url(#${compact ? "walkClipCompact" : "walkClip"})`}>
              {walkSegments.map((seg, i) => (
                <rect key={i} x={seg.x} y={PAD.top + h + 28} width={seg.width + 0.5} height={8} fill={seg.color} opacity="0.7" />
              ))}
            </g>
            {[
              { color: "#34C759", key: "status.open" },
              { color: "#FF9500", key: "status.narrow" },
              { color: "#FF3B30", key: "status.flooded" },
            ].map((item, i) => {
              const lx = PAD.left + (w / 3) * i;
              const ly = PAD.top + h + 46;
              return (
                <g key={i}>
                  <circle cx={lx} cy={ly} r={3} fill={item.color} opacity={0.7} />
                  <text x={lx + 6} y={ly + 3.5} fontSize="9" fill="var(--color-text-tertiary)">{t(lang, item.key)}</text>
                </g>
              );
            })}
          </g>
        )}

        {[minH, (minH + maxH) / 2, maxH].map((val, i) => (
          <text key={i} x={PAD.left - 6} y={yScale(val) + 3} textAnchor="end" fontSize="10" fill="var(--color-text-tertiary)">
            {val.toFixed(1)}
          </text>
        ))}
      </svg>
    </div>
  );
}

"use client";

import { TideData, Beach } from "@/lib/types";
import { Lang, t } from "@/lib/i18n";

interface TideChartProps {
  data: TideData;
  beach?: Beach;
  lang: Lang;
  compact?: boolean;
}

const CHART_W = 600;
const CHART_H = 200;
const PAD = { top: 24, right: 16, bottom: 32, left: 40 };

export function TideChart({ data, beach, lang, compact }: TideChartProps) {
  const w = CHART_W - PAD.left - PAD.right;
  const h = CHART_H - PAD.top - PAD.bottom;

  const points = data.points;
  if (points.length < 2) return null;

  // Compute bounds
  const heights = points.map((p) => p.height);
  const minH = Math.min(...heights) - 0.1;
  const maxH = Math.max(...heights) + 0.1;

  const startTime = new Date(points[0].time).getTime();
  const endTime = new Date(points[points.length - 1].time).getTime();
  const timeSpan = endTime - startTime;

  function xScale(time: string): number {
    const t = new Date(time).getTime();
    return PAD.left + ((t - startTime) / timeSpan) * w;
  }

  function yScale(height: number): number {
    return PAD.top + h - ((height - minH) / (maxH - minH)) * h;
  }

  // Build polyline path
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${xScale(p.time)},${yScale(p.height)}`)
    .join(" ");

  // Gradient fill path
  const fillD = `${pathD} L${xScale(points[points.length - 1].time)},${PAD.top + h} L${xScale(points[0].time)},${PAD.top + h} Z`;

  // Current time marker
  const now = new Date();
  const nowMs = now.getTime();
  const nowInRange = nowMs >= startTime && nowMs <= endTime;
  const nowX = nowInRange
    ? PAD.left + ((nowMs - startTime) / timeSpan) * w
    : null;

  // Interpolate current height
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

  // Time labels (every 6h)
  const timeLabels: { x: number; label: string }[] = [];
  for (let hour = 0; hour <= 24; hour += 6) {
    const d = new Date(points[0].time);
    d.setHours(hour, 0, 0, 0);
    if (d.getTime() >= startTime && d.getTime() <= endTime) {
      timeLabels.push({
        x: xScale(d.toISOString()),
        label: `${hour}:00`,
      });
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
          <h2
            className="text-[17px] font-semibold"
            style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}
          >
            {t(lang, "chart.title")}
          </h2>
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            {t(lang, "chart.subtitle")}
          </p>
        </div>
      )}
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Gradient fill */}
        <path d={fillD} fill={`url(#${gradientId})`} />

        {/* Threshold lines */}
        {thresholds.map((th, i) => (
          <line
            key={i}
            x1={PAD.left}
            y1={yScale(th.height)}
            x2={PAD.left + w}
            y2={yScale(th.height)}
            stroke={th.color}
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.5"
          />
        ))}

        {/* Tide curve */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Extremes */}
        {data.extremes.map((ext, i) => {
          const ex = xScale(ext.time);
          const ey = yScale(ext.height);
          if (ex < PAD.left || ex > PAD.left + w) return null;
          return (
            <g key={i}>
              <circle cx={ex} cy={ey} r="3.5" fill="var(--color-accent)" />
              <text
                x={ex}
                y={ey - 8}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--color-text-secondary)"
              >
                {ext.height}m
              </text>
            </g>
          );
        })}

        {/* Current time marker */}
        {nowX !== null && (
          <>
            <line
              x1={nowX}
              y1={PAD.top}
              x2={nowX}
              y2={PAD.top + h}
              stroke="var(--color-text-tertiary)"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            {nowY !== null && (
              <circle
                cx={nowX}
                cy={nowY}
                r="4.5"
                fill="var(--color-accent)"
                stroke="var(--color-surface)"
                strokeWidth="2"
              />
            )}
          </>
        )}

        {/* Time labels */}
        {timeLabels.map((tl, i) => (
          <text
            key={i}
            x={tl.x}
            y={PAD.top + h + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--color-text-tertiary)"
          >
            {tl.label}
          </text>
        ))}

        {/* Y-axis labels */}
        {[minH, (minH + maxH) / 2, maxH].map((val, i) => (
          <text
            key={i}
            x={PAD.left - 6}
            y={yScale(val) + 3}
            textAnchor="end"
            fontSize="10"
            fill="var(--color-text-tertiary)"
          >
            {val.toFixed(1)}
          </text>
        ))}
      </svg>
    </div>
  );
}

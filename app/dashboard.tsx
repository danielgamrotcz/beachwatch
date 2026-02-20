"use client";

import { useCallback, useEffect, useState } from "react";
import { BeachState } from "@/lib/types";
import { t, useLang } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { TideChart } from "@/components/TideChart";
import { BeachCard } from "@/components/BeachCard";
import { BeachDetail } from "@/components/BeachDetail";

interface DashboardProps {
  initialStates: BeachState[];
}

export function Dashboard({ initialStates }: DashboardProps) {
  const [states, setStates] = useState(initialStates);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lang, setLang] = useLang();

  // Periodic refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/tide");
        if (res.ok) {
          const data: BeachState[] = await res.json();
          setStates(data);
        }
      } catch {
        // Keep stale data
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const selected = states.find((s) => s.beach.id === selectedId) ?? null;

  // Aggregate stats from first beach (same tide data for all)
  const first = states[0];
  const walkableCount = states.filter((s) => s.status.walkable).length;
  const trendLabel = t(lang, `trend.${first.trend}` as "trend.rising");

  // Format update time
  const fetchedAt = new Date(first.tideData.fetchedAt);
  const updateTime = `${fetchedAt.getHours().toString().padStart(2, "0")}:${fetchedAt.getMinutes().toString().padStart(2, "0")}`;
  const sourceLabel =
    first.tideData.source === "stormglass"
      ? t(lang, "footer.sourceApi")
      : t(lang, "footer.source");

  const handleClose = useCallback(() => setSelectedId(null), []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-bg)" }}
    >
      <Header lang={lang} onLangChange={setLang} />

      <main className="mx-auto max-w-5xl px-6 py-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label={t(lang, "stat.level")}
            value={`${first.currentHeight}m`}
          />
          <StatCard label={t(lang, "stat.trend")} value={trendLabel} />
          <StatCard
            label={t(lang, "stat.walkable")}
            value={`${walkableCount}/${states.length}`}
            color="var(--color-open)"
          />
          <StatCard label={t(lang, "stat.updated")} value={updateTime} />
        </div>

        {/* Tide chart */}
        <div className="mt-6">
          <TideChart
            data={first.tideData}
            beach={selected?.beach}
            lang={lang}
          />
        </div>

        {/* Beaches section */}
        <h2
          className="mt-8 mb-3 text-[17px] font-semibold"
          style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}
        >
          {t(lang, "section.beaches")}
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          {/* Beach cards grid */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {states.map((s) => (
              <BeachCard
                key={s.beach.id}
                state={s}
                lang={lang}
                selected={selectedId === s.beach.id}
                onClick={() =>
                  setSelectedId(
                    selectedId === s.beach.id ? null : s.beach.id
                  )
                }
              />
            ))}
          </div>

          {/* Detail sidebar (desktop) / bottom sheet (mobile) */}
          {selected && (
            <div className="md:sticky md:top-20 md:w-96 md:shrink-0">
              <BeachDetail
                state={selected}
                lang={lang}
                onClose={handleClose}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer
          className="mt-8 rounded-2xl p-4 text-center"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
            {sourceLabel}
          </p>
          <p
            className="mt-1 text-[11px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {t(lang, "footer.disclaimer")}
          </p>
        </footer>
      </main>
    </div>
  );
}

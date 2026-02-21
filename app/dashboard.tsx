"use client";

import { useCallback, useEffect, useState } from "react";
import { BeachState } from "@/lib/types";
import { t, useLang } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { TideChart } from "@/components/TideChart";
import { BeachCard } from "@/components/BeachCard";
import { BeachDetail } from "@/components/BeachDetail";
import { BeachMapWrapper } from "@/components/BeachMapWrapper";

interface DashboardProps {
  initialStates: BeachState[];
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function Dashboard({ initialStates }: DashboardProps) {
  const [states, setStates] = useState(initialStates);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nearestId, setNearestId] = useState<string | null>(initialStates[0]?.beach.id ?? null);
  const [lang, setLang] = useLang();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let closest = initialStates[0]?.beach.id ?? null;
        let minDist = Infinity;
        for (const s of initialStates) {
          const d = haversine(latitude, longitude, s.beach.coordinates.lat, s.beach.coordinates.lng);
          if (d < minDist) { minDist = d; closest = s.beach.id; }
        }
        setNearestId(closest);
      },
    );
  }, [initialStates]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/tide");
        if (res.ok) {
          const data: BeachState[] = await res.json();
          setStates(data);
        }
      } catch { /* keep stale data */ }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const selected = states.find((s) => s.beach.id === selectedId) ?? null;
  const chartBeachId = selectedId ?? nearestId;
  const chartState = states.find((s) => s.beach.id === chartBeachId) ?? null;
  const first = states[0];
  const walkableCount = states.filter((s) => s.status.walkable).length;
  const trendLabel = t(lang, `trend.${first.trend}`);

  const fetchedAt = new Date(first.tideData.fetchedAt);
  const ictH = (fetchedAt.getUTCHours() + 7) % 24;
  const updateTime = `${ictH.toString().padStart(2, "0")}:${fetchedAt.getUTCMinutes().toString().padStart(2, "0")}`;
  const sourceLabel = first.tideData.source === "stormglass" ? t(lang, "footer.sourceApi") : t(lang, "footer.source");

  const handleClose = useCallback(() => setSelectedId(null), []);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Header lang={lang} onLangChange={setLang} />

      <main className="mx-auto max-w-5xl px-6 py-6">
        <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-4">
          <StatCard label={t(lang, "stat.level")} value={`${first.currentHeight}m`} />
          <StatCard label={t(lang, "stat.trend")} value={trendLabel} />
          <StatCard label={t(lang, "stat.walkable")} value={`${walkableCount}/${states.length}`} color="var(--color-open)" />
          <StatCard label={t(lang, "stat.updated")} value={updateTime} />
        </div>

        <div className="mt-6">
          {chartState && (
            <p className="mb-2 flex items-center gap-1.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              📍 {chartState.beach.name}
              {!selectedId && nearestId && (
                <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>({t(lang, "gps.nearest")})</span>
              )}
            </p>
          )}
          <TideChart data={first.tideData} beach={chartState?.beach} lang={lang} />
        </div>

        <div className="mt-6">
          <BeachMapWrapper
            states={states}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(selectedId === id ? null : id)}
            lang={lang}
          />
        </div>

        <h2 className="mt-8 mb-3 text-[17px] font-semibold" style={{ letterSpacing: "-0.02em", color: "var(--color-text)" }}>
          {t(lang, "section.beaches")}
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {states.map((s) => (
              <BeachCard
                key={s.beach.id}
                state={s}
                lang={lang}
                selected={selectedId === s.beach.id}
                onClick={() => setSelectedId(selectedId === s.beach.id ? null : s.beach.id)}
              />
            ))}
          </div>

          {/* Desktop: scrollable sticky sidebar */}
          {selected && (
            <div className="hidden md:block md:sticky md:top-20 md:w-96 md:shrink-0 md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:rounded-2xl">
              <BeachDetail state={selected} lang={lang} onClose={handleClose} />
            </div>
          )}
        </div>

        {/* Mobile: bottom sheet overlay */}
        {selected && (
          <div className="fixed inset-0 z-50 md:hidden" onClick={handleClose}>
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bottom-sheet-scroll pb-[env(safe-area-inset-bottom)]"
              style={{ background: "var(--color-bg)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex justify-center py-2" style={{ background: "var(--color-bg)" }}>
                <div className="h-1 w-10 rounded-full" style={{ background: "var(--color-text-tertiary)" }} />
              </div>
              <div className="px-4 pb-4">
                <BeachDetail state={selected} lang={lang} onClose={handleClose} />
              </div>
            </div>
          </div>
        )}

        <footer className="mt-8 mb-4 rounded-2xl p-4 text-center" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>{sourceLabel}</p>
          <p className="mt-1 text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>{t(lang, "footer.disclaimer")}</p>
          <p className="mt-2 text-[11px]" style={{ color: "var(--color-text-tertiary)" }}>
            <a href="https://danielgamrot.cz" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>Daniel Gamrot</a>
            {" \u00b7 "}
            <a href="mailto:daniel@gamrot.cz" style={{ color: "var(--color-accent)" }}>daniel@gamrot.cz</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

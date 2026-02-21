import { NextResponse } from "next/server";
import { getCachedTide, isTideDataStale, setCachedTide } from "@/lib/kv";
import { generateHarmonicTide } from "@/lib/tide-harmonic";
import { fetchTideFromStormGlass } from "@/lib/stormglass";
import { BEACHES } from "@/lib/beaches";
import { getBeachStatus, getCurrentTidePoint, getTideTrend, getUpcomingEvents } from "@/lib/tide-status";
import { BeachState } from "@/lib/types";

export async function GET() {
  let tideData = await getCachedTide();

  // Auto-refresh: if cached data is stale (>6h), fetch new data
  if (!tideData || isTideDataStale(tideData)) {
    const fresh = await fetchTideFromStormGlass();
    if (fresh) {
      await setCachedTide(fresh);
      tideData = fresh;
    } else if (!tideData) {
      // No cache and no API — use harmonic fallback
      tideData = generateHarmonicTide();
    }
    // If stale cache + API fail — keep using stale data (better than nothing)
  }

  const now = new Date();

  const states: BeachState[] = BEACHES.map((beach) => {
    const current = getCurrentTidePoint(tideData, now);
    const status = getBeachStatus(beach, current.height);
    const trend = getTideTrend(tideData, now);
    const events = getUpcomingEvents(tideData, beach, now);

    return {
      beach,
      status,
      currentHeight: current.height,
      trend,
      tideData,
      events,
    };
  });

  return NextResponse.json(states, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

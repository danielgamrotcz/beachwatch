import { NextResponse } from "next/server";
import { getCachedTide } from "@/lib/redis";
import { generateHarmonicTide } from "@/lib/tide-harmonic";
import { BEACHES } from "@/lib/beaches";
import { getBeachStatus, getCurrentTidePoint, getTideTrend, getUpcomingEvents } from "@/lib/tide-status";
import { BeachState } from "@/lib/types";

export async function GET() {
  // Try cached data first, fall back to harmonic model
  const tideData = (await getCachedTide()) ?? generateHarmonicTide();
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

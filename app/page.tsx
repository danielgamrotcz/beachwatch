import { BEACHES } from "@/lib/beaches";
import { getCachedTide } from "@/lib/kv";
import { generateHarmonicTide } from "@/lib/tide-harmonic";
import {
  getBeachStatus,
  getCurrentTidePoint,
  getTideTrend,
  getUpcomingEvents,
} from "@/lib/tide-status";
import { BeachState } from "@/lib/types";
import { Dashboard } from "./dashboard";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function Home() {
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

  return <Dashboard initialStates={states} />;
}

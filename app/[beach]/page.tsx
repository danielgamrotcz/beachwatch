import { BEACHES } from "@/lib/beaches";
import { getCachedTide } from "@/lib/redis";
import { generateHarmonicTide } from "@/lib/tide-harmonic";
import {
  getBeachStatus,
  getCurrentTidePoint,
  getTideTrend,
  getUpcomingEvents,
} from "@/lib/tide-status";
import { BeachState } from "@/lib/types";
import { BeachDetailPage } from "./beach-detail-page";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 300;

export function generateStaticParams() {
  return BEACHES.map((b) => ({ beach: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ beach: string }>;
}): Promise<Metadata> {
  const { beach: beachId } = await params;
  const beach = BEACHES.find((b) => b.id === beachId);
  if (!beach) return {};

  return {
    title: `${beach.name} — Beach Watch`,
    description: beach.description.en,
    openGraph: {
      title: `${beach.name} — Beach Watch`,
      description: `Real-time tide status for ${beach.name}, Hua Hin`,
    },
  };
}

async function getBeachState(beachId: string): Promise<BeachState | null> {
  const beach = BEACHES.find((b) => b.id === beachId);
  if (!beach) return null;

  const tideData = (await getCachedTide()) ?? generateHarmonicTide();
  const now = new Date();
  const current = getCurrentTidePoint(tideData, now);

  return {
    beach,
    status: getBeachStatus(beach, current.height),
    currentHeight: current.height,
    trend: getTideTrend(tideData, now),
    tideData,
    events: getUpcomingEvents(tideData, beach, now),
  };
}

export default async function BeachPage({
  params,
}: {
  params: Promise<{ beach: string }>;
}) {
  const { beach: beachId } = await params;
  const state = await getBeachState(beachId);
  if (!state) notFound();

  return <BeachDetailPage state={state} />;
}

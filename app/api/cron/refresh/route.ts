import { NextResponse } from "next/server";
import { fetchTideFromStormGlass } from "@/lib/stormglass";
import { setCachedTide } from "@/lib/redis";
import { generateHarmonicTide } from "@/lib/tide-harmonic";

export async function GET(request: Request) {
  // Verify cron secret (Vercel passes this header for cron jobs)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Try Storm Glass API first
  const data = await fetchTideFromStormGlass();

  if (data) {
    await setCachedTide(data);
    return NextResponse.json({
      ok: true,
      source: "stormglass",
      points: data.points.length,
      extremes: data.extremes.length,
    });
  }

  // Fallback: generate harmonic data and cache it
  const harmonic = generateHarmonicTide();
  await setCachedTide(harmonic);

  return NextResponse.json({
    ok: true,
    source: "harmonic",
    points: harmonic.points.length,
    extremes: harmonic.extremes.length,
  });
}

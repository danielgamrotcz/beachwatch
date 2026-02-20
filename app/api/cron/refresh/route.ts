import { NextResponse } from "next/server";
import { fetchTideFromStormGlass } from "@/lib/stormglass";
import { setCachedTide } from "@/lib/kv";
import { generateHarmonicTide } from "@/lib/tide-harmonic";

export async function GET(request: Request) {
  // Verify cron secret — Cloudflare cron triggers or manual calls
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  // Skip auth for Cloudflare cron triggers (no auth header, internal call)
  if (cronSecret && authHeader && authHeader !== `Bearer ${cronSecret}`) {
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

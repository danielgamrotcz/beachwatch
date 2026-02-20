import { TIDE_REFERENCE_POINT } from "./beaches";
import { TideData, TideExtreme, TidePoint } from "./types";

interface StormGlassSeaLevelResponse {
  data: Array<{ time: string; sg: number }>;
}

interface StormGlassExtremesResponse {
  data: Array<{ time: string; height: number; type: "high" | "low" }>;
}

export async function fetchTideFromStormGlass(): Promise<TideData | null> {
  const apiKey = process.env.STORMGLASS_API_KEY;
  if (!apiKey) return null;

  const { lat, lng } = TIDE_REFERENCE_POINT;
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);

  const startISO = start.toISOString();
  const endISO = end.toISOString();
  const headers = { Authorization: apiKey };

  try {
    const [seaLevelRes, extremesRes] = await Promise.all([
      fetch(
        `https://api.stormglass.io/v2/tide/sea-level/point?lat=${lat}&lng=${lng}&start=${startISO}&end=${endISO}`,
        { headers }
      ),
      fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}&start=${startISO}&end=${endISO}`,
        { headers }
      ),
    ]);

    if (!seaLevelRes.ok || !extremesRes.ok) return null;

    const seaLevel: StormGlassSeaLevelResponse = await seaLevelRes.json();
    const extremesData: StormGlassExtremesResponse = await extremesRes.json();

    const points: TidePoint[] = seaLevel.data.map((d) => ({
      time: d.time,
      height: Math.round(d.sg * 100) / 100,
    }));

    const extremes: TideExtreme[] = extremesData.data.map((d) => ({
      time: d.time,
      height: Math.round(d.height * 100) / 100,
      type: d.type,
    }));

    return {
      points,
      extremes,
      fetchedAt: new Date().toISOString(),
      source: "stormglass",
    };
  } catch {
    return null;
  }
}

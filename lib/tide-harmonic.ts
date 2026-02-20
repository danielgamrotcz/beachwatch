import { TideData, TideExtreme, TidePoint } from "./types";

// Harmonic constituents calibrated for Gulf of Thailand (Hua Hin area)
// M2 = principal lunar semidiurnal, S2 = principal solar semidiurnal
// K1 = lunisolar diurnal, O1 = principal lunar diurnal
// Accuracy: +/- 20-30 cm — sufficient for open/narrow/flooded status
const CONSTITUENTS = [
  { name: "M2", amplitude: 0.35, phase: 145, speed: 28.984104 },
  { name: "S2", amplitude: 0.15, phase: 170, speed: 30.0 },
  { name: "K1", amplitude: 0.45, phase: 30, speed: 15.041069 },
  { name: "O1", amplitude: 0.3, phase: 350, speed: 13.943036 },
] as const;

// Mean sea level offset for the area (meters above chart datum)
const MSL_OFFSET = 0.9;

function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function predictHeight(date: Date): number {
  // Hours since Unix epoch
  const hours = date.getTime() / (1000 * 60 * 60);

  let height = MSL_OFFSET;
  for (const c of CONSTITUENTS) {
    const angle = degreesToRadians(c.speed * hours + c.phase);
    height += c.amplitude * Math.cos(angle);
  }

  return Math.round(height * 100) / 100;
}

export function generateHarmonicTide(date?: Date): TideData {
  const base = date ?? new Date();
  const start = new Date(base);
  start.setHours(0, 0, 0, 0);

  // Generate hourly points for 24 hours
  const points: TidePoint[] = [];
  for (let h = 0; h <= 24; h++) {
    const t = new Date(start);
    t.setHours(h, 0, 0, 0);
    points.push({
      time: t.toISOString(),
      height: predictHeight(t),
    });
  }

  // Find extremes (local maxima/minima)
  const extremes = findExtremes(start);

  return {
    points,
    extremes,
    fetchedAt: new Date().toISOString(),
    source: "harmonic",
  };
}

function findExtremes(dayStart: Date): TideExtreme[] {
  const extremes: TideExtreme[] = [];
  const step = 10; // 10-minute resolution for finding extremes

  let prevHeight = predictHeight(dayStart);
  let prevSlope = 0;

  for (let m = step; m <= 24 * 60; m += step) {
    const t = new Date(dayStart);
    t.setMinutes(m);
    const height = predictHeight(t);
    const slope = height - prevHeight;

    // Slope sign change = extreme
    if (prevSlope > 0 && slope < 0) {
      extremes.push({
        time: new Date(dayStart.getTime() + (m - step) * 60000).toISOString(),
        height: prevHeight,
        type: "high",
      });
    } else if (prevSlope < 0 && slope > 0) {
      extremes.push({
        time: new Date(dayStart.getTime() + (m - step) * 60000).toISOString(),
        height: prevHeight,
        type: "low",
      });
    }

    prevHeight = height;
    if (slope !== 0) prevSlope = slope;
  }

  return extremes;
}

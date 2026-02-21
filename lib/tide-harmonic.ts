import { TideData, TideExtreme, TidePoint } from "./types";

// Harmonic constituents from TICON-4 Ko Lak station (11.795°N, 99.817°E)
// Nearest reference station to Hua Hin in the Gulf of Thailand
// Amplitudes include nodal factor (f) for 2025-2027 mid-cycle
// Phases = V0 + u - g (astronomical argument + nodal correction - phase lag)
// calibrated via @neaps/tide-predictor at Feb 2026 reference, valid ~2025-2027
// Recalibrate every ~5 years as nodal cycle is 18.6 years
const CONSTITUENTS = [
  { name: "K1", amplitude: 0.5606, phase: 311.8, speed: 15.041069 },
  { name: "O1", amplitude: 0.3982, phase: 131.6, speed: 13.943036 },
  { name: "P1", amplitude: 0.1528, phase: 289.5, speed: 14.958931 },
  { name: "Q1", amplitude: 0.0765, phase: 254.2, speed: 13.398661 },
  { name: "M2", amplitude: 0.0599, phase: 231.0, speed: 28.984104 },
  { name: "S2", amplitude: 0.0147, phase: 15.7, speed: 30.0 },
] as const;

// Heights are relative to MSL (mean sea level = 0)
const MSL_OFFSET = 0;

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

export function generateHarmonicTide(date?: Date, days = 3): TideData {
  const base = date ?? new Date();
  const start = new Date(base);
  start.setHours(0, 0, 0, 0);

  const points: TidePoint[] = [];
  for (let h = 0; h <= days * 24; h++) {
    const t = new Date(start);
    t.setHours(h, 0, 0, 0);
    points.push({
      time: t.toISOString(),
      height: predictHeight(t),
    });
  }

  const extremes = findExtremes(start, days);

  return {
    points,
    extremes,
    fetchedAt: new Date().toISOString(),
    source: "harmonic",
  };
}

function findExtremes(dayStart: Date, days = 3): TideExtreme[] {
  const extremes: TideExtreme[] = [];
  const step = 10; // 10-minute resolution for finding extremes

  let prevHeight = predictHeight(dayStart);
  let prevSlope = 0;

  for (let m = step; m <= days * 24 * 60; m += step) {
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

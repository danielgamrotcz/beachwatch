import { Beach, BeachStatus, TideData, TideEvent, TidePoint, TideTrend } from "./types";

export function getBeachStatus(beach: Beach, height: number): BeachStatus {
  const { criticalHeight, narrowHeight, beachWidthMax } = beach.properties;

  if (height >= criticalHeight) {
    return {
      walkable: false,
      status: "flooded",
      label: { cs: "Zaplaven\u00e1", en: "Flooded" },
      sublabel: { cs: "Pl\u00e1\u017e je pod vodou", en: "Beach is underwater" },
      color: "#FF3B30",
      visibleWidth: 0,
      widthPercent: 0,
    };
  }

  if (height >= narrowHeight) {
    const ratio = (criticalHeight - height) / (criticalHeight - narrowHeight);
    const width = Math.round(ratio * beachWidthMax * 0.4);
    return {
      walkable: true,
      status: "narrow",
      label: { cs: "Pr\u016fchodn\u00e1", en: "Passable" },
      sublabel: { cs: "\u00dazk\u00fd pruh p\u00edsku", en: "Narrow sand strip" },
      color: "#FF9500",
      visibleWidth: width,
      widthPercent: Math.round((width / beachWidthMax) * 100),
    };
  }

  const ratio = 1 - height / narrowHeight;
  const width = Math.round((0.4 + ratio * 0.6) * beachWidthMax);
  return {
    walkable: true,
    status: "open",
    label: { cs: "Voln\u00e1", en: "Open" },
    sublabel: { cs: "Pl\u00e1\u017e je otev\u0159en\u00e1", en: "Beach is open" },
    color: "#34C759",
    visibleWidth: width,
    widthPercent: Math.round((width / beachWidthMax) * 100),
  };
}

export function getCurrentTidePoint(data: TideData, now?: Date): TidePoint {
  const time = now ?? new Date();
  const ms = time.getTime();
  const points = data.points;

  // Find the two closest points for interpolation
  let before = points[0];
  let after = points[points.length - 1];

  for (let i = 0; i < points.length - 1; i++) {
    const t0 = new Date(points[i].time).getTime();
    const t1 = new Date(points[i + 1].time).getTime();
    if (ms >= t0 && ms <= t1) {
      before = points[i];
      after = points[i + 1];
      break;
    }
  }

  const t0 = new Date(before.time).getTime();
  const t1 = new Date(after.time).getTime();
  const span = t1 - t0;
  if (span === 0) return before;

  const ratio = (ms - t0) / span;
  const height = before.height + ratio * (after.height - before.height);

  return { time: time.toISOString(), height: Math.round(height * 100) / 100 };
}

export function getTideTrend(data: TideData, now?: Date): TideTrend {
  const time = now ?? new Date();
  const ms = time.getTime();
  const points = data.points;

  // Find surrounding points within ~30 min window
  const windowMs = 30 * 60 * 1000;
  let heightBefore: number | null = null;
  let heightAfter: number | null = null;

  for (const p of points) {
    const pt = new Date(p.time).getTime();
    if (pt <= ms && ms - pt <= windowMs) heightBefore = p.height;
    if (pt > ms && pt - ms <= windowMs) {
      heightAfter = p.height;
      break;
    }
  }

  if (heightBefore === null || heightAfter === null) {
    // Fallback: check extremes
    const nextExtreme = data.extremes.find(
      (e) => new Date(e.time).getTime() > ms
    );
    if (!nextExtreme) return "falling";
    return nextExtreme.type === "high" ? "rising" : "falling";
  }

  const diff = heightAfter - heightBefore;
  if (Math.abs(diff) < 0.02) {
    // Slack tide — determine if at high or low
    const avg = (heightBefore + heightAfter) / 2;
    const nextExtreme = data.extremes.find(
      (e) => new Date(e.time).getTime() > ms
    );
    if (nextExtreme) {
      return nextExtreme.type === "high" ? "low" : "high";
    }
    return avg > 1.0 ? "high" : "low";
  }

  return diff > 0 ? "rising" : "falling";
}

export function getUpcomingEvents(
  data: TideData,
  beach: Beach,
  now?: Date
): TideEvent[] {
  const time = now ?? new Date();
  const ms = time.getTime();
  const events: TideEvent[] = [];

  // Add upcoming extremes
  for (const ext of data.extremes) {
    if (new Date(ext.time).getTime() <= ms) continue;
    events.push({
      time: ext.time,
      type: ext.type,
      label:
        ext.type === "high"
          ? { cs: "P\u0159\u00edliv", en: "High tide" }
          : { cs: "Odliv", en: "Low tide" },
      height: ext.height,
    });
  }

  // Add upcoming status changes from hourly data
  const currentStatus = getBeachStatus(
    beach,
    getCurrentTidePoint(data, time).height
  ).status;
  let prevStatus = currentStatus;

  for (const p of data.points) {
    if (new Date(p.time).getTime() <= ms) continue;
    const s = getBeachStatus(beach, p.height).status;
    if (s !== prevStatus) {
      const labels: Record<string, { en: string; cs: string }> = {
        open: { cs: "Pl\u00e1\u017e se otev\u0159e", en: "Beach opens" },
        narrow: { cs: "\u00dazk\u00fd pr\u016fchod", en: "Narrow passage" },
        flooded: { cs: "Zaplaven\u00ed", en: "Flooding" },
      };
      events.push({
        time: p.time,
        type: "status-change",
        label: labels[s],
        newStatus: s,
      });
      prevStatus = s;
    }
  }

  // Sort by time and limit to 5
  events.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
  return events.slice(0, 5);
}

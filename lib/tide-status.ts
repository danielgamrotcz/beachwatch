import { Beach, BeachStatus, ForecastWindow, TideData, TideEvent, TidePoint, TideTrend } from "./types";

export function getBeachStatus(beach: Beach, height: number): BeachStatus {
  const { criticalHeight, narrowHeight, beachWidthMax } = beach.properties;

  if (height >= criticalHeight) {
    return {
      walkable: false, status: "flooded",
      labelKey: "status.flooded", sublabelKey: "status.flooded.sub",
      color: "#FF3B30", visibleWidth: 0, widthPercent: 0,
    };
  }

  if (height >= narrowHeight) {
    const ratio = (criticalHeight - height) / (criticalHeight - narrowHeight);
    const width = Math.round(ratio * beachWidthMax * 0.4);
    return {
      walkable: true, status: "narrow",
      labelKey: "status.narrow", sublabelKey: "status.narrow.sub",
      color: "#FF9500", visibleWidth: width,
      widthPercent: Math.round((width / beachWidthMax) * 100),
    };
  }

  const ratio = 1 - height / narrowHeight;
  const width = Math.round((0.4 + ratio * 0.6) * beachWidthMax);
  return {
    walkable: true, status: "open",
    labelKey: "status.open", sublabelKey: "status.open.sub",
    color: "#34C759", visibleWidth: width,
    widthPercent: Math.round((width / beachWidthMax) * 100),
  };
}

export function getCurrentTidePoint(data: TideData, now?: Date): TidePoint {
  const time = now ?? new Date();
  const ms = time.getTime();
  const points = data.points;

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
    const nextExtreme = data.extremes.find((e) => new Date(e.time).getTime() > ms);
    if (!nextExtreme) return "falling";
    return nextExtreme.type === "high" ? "rising" : "falling";
  }

  const diff = heightAfter - heightBefore;
  if (Math.abs(diff) < 0.02) {
    const nextExtreme = data.extremes.find((e) => new Date(e.time).getTime() > ms);
    if (nextExtreme) return nextExtreme.type === "high" ? "low" : "high";
    return (heightBefore + heightAfter) / 2 > 1.0 ? "high" : "low";
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

  for (const ext of data.extremes) {
    if (new Date(ext.time).getTime() <= ms) continue;
    events.push({
      time: ext.time,
      type: ext.type,
      labelKey: ext.type === "high" ? "event.high" : "event.low",
      height: ext.height,
    });
  }

  const currentStatus = getBeachStatus(beach, getCurrentTidePoint(data, time).height).status;
  let prevStatus = currentStatus;

  const eventKeys: Record<string, string> = {
    open: "event.opens",
    narrow: "event.narrow",
    flooded: "event.flooding",
  };

  for (const p of data.points) {
    if (new Date(p.time).getTime() <= ms) continue;
    const s = getBeachStatus(beach, p.height).status;
    if (s !== prevStatus) {
      events.push({
        time: p.time,
        type: "status-change",
        labelKey: eventKeys[s],
        newStatus: s,
      });
      prevStatus = s;
    }
  }

  events.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  return events.slice(0, 5);
}

export function getForecastWindows(data: TideData, beach: Beach): ForecastWindow[] {
  const entries = data.points.map((point) => {
    const ictHour = (new Date(point.time).getUTCHours() + 7) % 24;
    const s = getBeachStatus(beach, point.height);
    return { hour: ictHour, status: s.status, width: s.visibleWidth };
  });

  if (entries.length === 0) return [];

  const windows: ForecastWindow[] = [];
  let cur = {
    startHour: entries[0].hour,
    endHour: (entries[0].hour + 1) % 24,
    status: entries[0].status,
    minWidth: entries[0].width,
    maxWidth: entries[0].width,
  };

  for (let i = 1; i < entries.length; i++) {
    const e = entries[i];
    if (e.status === cur.status) {
      cur.endHour = (e.hour + 1) % 24;
      cur.minWidth = Math.min(cur.minWidth, e.width);
      cur.maxWidth = Math.max(cur.maxWidth, e.width);
    } else {
      windows.push({ ...cur });
      cur = {
        startHour: e.hour,
        endHour: (e.hour + 1) % 24,
        status: e.status,
        minWidth: e.width,
        maxWidth: e.width,
      };
    }
  }
  windows.push({ ...cur });
  return windows;
}

export interface Beach {
  id: string;
  name: string;
  nameTh: string;
  description: { en: string; cs: string };
  coordinates: { lat: number; lng: number };
  properties: {
    beachWidthMax: number;
    criticalHeight: number;
    narrowHeight: number;
    surface: "sand" | "mixed" | "rocky";
    difficulty: "easy" | "moderate" | "challenging";
  };
  icon: string;
  googleMapsUrl: string;
}

export interface TidePoint {
  time: string;
  height: number;
}

export interface TideExtreme {
  time: string;
  height: number;
  type: "high" | "low";
}

export interface TideData {
  points: TidePoint[];
  extremes: TideExtreme[];
  fetchedAt: string;
  source: "stormglass" | "harmonic";
}

export type BeachStatusType = "open" | "narrow" | "flooded";

export interface BeachStatus {
  walkable: boolean;
  status: BeachStatusType;
  label: { en: string; cs: string };
  sublabel: { en: string; cs: string };
  color: string;
  visibleWidth: number;
  widthPercent: number;
}

export type TideTrend = "rising" | "falling" | "high" | "low";

export interface TideEvent {
  time: string;
  type: "high" | "low" | "status-change";
  label: { en: string; cs: string };
  height?: number;
  newStatus?: BeachStatusType;
}

export interface BeachState {
  beach: Beach;
  status: BeachStatus;
  currentHeight: number;
  trend: TideTrend;
  tideData: TideData;
  events: TideEvent[];
}

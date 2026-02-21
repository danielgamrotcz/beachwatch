import { ImageResponse } from "next/og";
import { BEACHES } from "@/lib/beaches";
import { generateHarmonicTide } from "@/lib/tide-harmonic";
import {
  getBeachStatus,
  getCurrentTidePoint,
} from "@/lib/tide-status";

export const runtime = "edge";
export const alt = "Beach Watch \u2014 Hua Hin Tide Status";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const tideData = generateHarmonicTide();
  const now = new Date();
  const current = getCurrentTidePoint(tideData, now);

  const statuses = BEACHES.map((beach) => ({
    name: beach.name,
    icon: beach.icon,
    status: getBeachStatus(beach, current.height),
  }));

  const walkable = statuses.filter((s) => s.status.walkable).length;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#F5F5F7",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "48px" }}>🌊</span>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#1D1D1F",
              letterSpacing: "-0.04em",
            }}
          >
            Beach Watch
          </span>
        </div>
        <p
          style={{
            fontSize: "24px",
            color: "rgba(0,0,0,0.5)",
            marginTop: "8px",
          }}
        >
          Hua Hin Tide Monitor
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {statuses.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "white",
                padding: "12px 20px",
                borderRadius: "16px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: "20px" }}>{s.icon}</span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1D1D1F",
                }}
              >
                {s.name}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: s.status.color,
                }}
              >
                {s.status.status === "open" ? "Open" : s.status.status === "narrow" ? "Passable" : "Flooded"}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#34C759",
            marginTop: "32px",
          }}
        >
          {walkable}/{BEACHES.length} beaches walkable
        </p>
      </div>
    ),
    { ...size }
  );
}

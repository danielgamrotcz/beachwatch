"use client";

import { useEffect, useRef, useCallback } from "react";
import type { BeachState } from "@/lib/types";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type L from "leaflet";

interface BeachMapProps {
  states: BeachState[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  lang: Lang;
  userPosition?: { lat: number; lng: number } | null;
}

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';

export function BeachMap({ states, selectedId, onSelect, lang, userPosition }: BeachMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Map<string, L.CircleMarker>>(new Map());
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const isDark = useCallback(() => {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, []);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Inject Leaflet CSS from CDN
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    let cancelled = false;

    import("leaflet").then((leaflet) => {
      if (cancelled || !containerRef.current) return;
      const Lf = leaflet.default ?? leaflet;

      const isMobile = window.innerWidth < 768;
      const map = Lf.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        scrollWheelZoom: !isMobile,
        dragging: !isMobile,
      });
      mapRef.current = map;

      const tileUrl = isDark() ? DARK_TILES : LIGHT_TILES;
      tileLayerRef.current = Lf.tileLayer(tileUrl, { attribution: TILE_ATTR }).addTo(map);

      // Create markers
      const bounds: L.LatLngExpression[] = [];
      for (const s of states) {
        const { lat, lng } = s.beach.coordinates;
        bounds.push([lat, lng]);

        const isSelected = s.beach.id === selectedId;
        const marker = Lf.circleMarker([lat, lng], {
          radius: isSelected ? 10 : 7,
          fillColor: s.status.color,
          fillOpacity: 0.9,
          color: "#ffffff",
          weight: isSelected ? 3 : 2,
        }).addTo(map);

        const statusText = t(lang, s.status.labelKey);
        marker.bindTooltip(`${s.beach.name} — ${statusText}`, { direction: "top", offset: [0, -8] });
        marker.on("click", () => onSelectRef.current(s.beach.id));
        markersRef.current.set(s.beach.id, marker);
      }

      if (bounds.length > 0) {
        map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [30, 30] });
      }

      // Listen for dark mode changes
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        if (!tileLayerRef.current || !mapRef.current) return;
        tileLayerRef.current.setUrl(e.matches ? DARK_TILES : LIGHT_TILES);
      };
      mq.addEventListener("change", handleChange);

      // Store cleanup ref
      (map as unknown as Record<string, unknown>).__mqCleanup = () => mq.removeEventListener("change", handleChange);
    });

    const markers = markersRef.current;
    return () => {
      cancelled = true;
      if (mapRef.current) {
        const cleanup = (mapRef.current as unknown as Record<string, unknown>).__mqCleanup;
        if (typeof cleanup === "function") cleanup();
        mapRef.current.remove();
        mapRef.current = null;
      }
      markers.clear();
      tileLayerRef.current = null;
      userMarkerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker colors and selection state
  useEffect(() => {
    for (const s of states) {
      const marker = markersRef.current.get(s.beach.id);
      if (!marker) continue;

      const isSelected = s.beach.id === selectedId;
      marker.setStyle({
        fillColor: s.status.color,
        radius: isSelected ? 10 : 7,
        weight: isSelected ? 3 : 2,
      });

      const statusText = t(lang, s.status.labelKey);
      marker.setTooltipContent(`${s.beach.name} — ${statusText}`);
    }
  }, [states, selectedId, lang]);

  // Add/update user position marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !userPosition) return;

    import("leaflet").then((leaflet) => {
      const Lf = leaflet.default ?? leaflet;

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userPosition.lat, userPosition.lng]);
      } else {
        const marker = Lf.circleMarker([userPosition.lat, userPosition.lng], {
          radius: 6,
          fillColor: "#007AFF",
          fillOpacity: 0.85,
          color: "#ffffff",
          weight: 2,
          className: "user-marker-pulse",
        }).addTo(map);
        marker.bindTooltip("You are here", { direction: "top", offset: [0, -8] });
        userMarkerRef.current = marker;
      }

      // Refit bounds to include user position
      const bounds: L.LatLngExpression[] = [[userPosition.lat, userPosition.lng]];
      for (const s of states) {
        bounds.push([s.beach.coordinates.lat, s.beach.coordinates.lng]);
      }
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [30, 30] });
    });
  }, [userPosition, states]);

  return (
    <div
      ref={containerRef}
      className="h-[240px] md:h-[280px] w-full rounded-2xl"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        zIndex: 0,
      }}
    />
  );
}

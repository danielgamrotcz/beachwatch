import { useSyncExternalStore } from "react";

export type Lang = "cs" | "en";

const translations = {
  // Header
  "header.title": { cs: "Beach Watch", en: "Beach Watch" },
  "header.subtitle": { cs: "Hua Hin \u2022 \u017div\u011b", en: "Hua Hin \u2022 Live" },

  // Stats
  "stat.level": { cs: "Hladina", en: "Tide Level" },
  "stat.trend": { cs: "Trend", en: "Trend" },
  "stat.walkable": { cs: "Pr\u016fchodn\u00e9", en: "Walkable" },
  "stat.updated": { cs: "Aktualizace", en: "Updated" },

  // Trends
  "trend.rising": { cs: "Stoup\u00e1", en: "Rising" },
  "trend.falling": { cs: "Kles\u00e1", en: "Falling" },
  "trend.high": { cs: "P\u0159\u00edliv", en: "High tide" },
  "trend.low": { cs: "Odliv", en: "Low tide" },

  // Beach card
  "beach.width": { cs: "Pl\u00e1\u017e", en: "Beach" },
  "beach.tide": { cs: "P\u0159\u00edliv", en: "Tide" },

  // Detail
  "detail.upcoming": { cs: "Nadch\u00e1zej\u00edc\u00ed zm\u011bny", en: "Upcoming changes" },
  "detail.openMaps": { cs: "Otev\u0159\u00edt v Google Maps", en: "Open in Google Maps" },
  "detail.close": { cs: "Zav\u0159\u00edt", en: "Close" },

  // Chart
  "chart.title": { cs: "Pr\u016fb\u011bh p\u0159\u00edlivu \u2014 dnes", en: "Tide chart \u2014 today" },
  "chart.subtitle": { cs: "Siamsk\u00fd z\u00e1liv", en: "Gulf of Thailand" },

  // Footer
  "footer.disclaimer": {
    cs: "Data jsou aproximac\u00ed. Skute\u010dn\u00e9 podm\u00ednky ovliv\u0148uje v\u00edtr, tlak a monzuny.",
    en: "Data is approximate. Actual conditions affected by wind, pressure and monsoons.",
  },
  "footer.source": {
    cs: "Zdroj: harmonick\u00fd model",
    en: "Source: harmonic model",
  },
  "footer.sourceApi": {
    cs: "Zdroj: Storm Glass API",
    en: "Source: Storm Glass API",
  },

  // Beaches section
  "section.beaches": { cs: "Pl\u00e1\u017ee", en: "Beaches" },

  // Time
  "time.now": { cs: "Te\u010f", en: "Now" },
} as const;

type TranslationKey = keyof typeof translations;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[key]?.[lang] ?? key;
}

function detectLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("beachwatch-lang");
  if (stored === "cs" || stored === "en") return stored;
  return navigator.language.startsWith("cs") ? "cs" : "en";
}

export function setLanguage(lang: Lang): void {
  localStorage.setItem("beachwatch-lang", lang);
  // Trigger subscribers
  langListeners.forEach((fn) => fn());
}

// Tiny external store for language — avoids setState-in-effect lint error
const langListeners = new Set<() => void>();

function subscribeLang(callback: () => void) {
  langListeners.add(callback);
  return () => langListeners.delete(callback);
}

function getSnapshotLang(): Lang {
  return detectLanguage();
}

function getServerSnapshotLang(): Lang {
  return "en";
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(
    subscribeLang,
    getSnapshotLang,
    getServerSnapshotLang
  );
  return [lang, setLanguage];
}

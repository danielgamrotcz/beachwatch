import { useSyncExternalStore } from "react";

export type Lang = "en" | "cs" | "th" | "de" | "ru" | "uk" | "fr" | "es";

export const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "\ud83c\uddec\ud83c\udde7", label: "English" },
  { code: "cs", flag: "\ud83c\udde8\ud83c\uddff", label: "\u010ce\u0161tina" },
  { code: "th", flag: "\ud83c\uddf9\ud83c\udded", label: "\u0e44\u0e17\u0e22" },
  { code: "de", flag: "\ud83c\udde9\ud83c\uddea", label: "Deutsch" },
  { code: "ru", flag: "\ud83c\uddf7\ud83c\uddfa", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
  { code: "uk", flag: "\ud83c\uddfa\ud83c\udde6", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430" },
  { code: "fr", flag: "\ud83c\uddeb\ud83c\uddf7", label: "Fran\u00e7ais" },
  { code: "es", flag: "\ud83c\uddea\ud83c\uddf8", label: "Espa\u00f1ol" },
];

// All UI strings keyed by translation key, then by language
// en is always the fallback
const T: Record<string, Partial<Record<Lang, string>>> = {
  // Header
  "header.title": { en: "Beach Watch", cs: "Beach Watch", th: "Beach Watch", de: "Beach Watch", ru: "Beach Watch", uk: "Beach Watch", fr: "Beach Watch", es: "Beach Watch" },
  "header.subtitle": { en: "Hua Hin \u2022 Live", cs: "Hua Hin \u2022 \u017div\u011b", th: "Hua Hin \u2022 \u0e2a\u0e14", de: "Hua Hin \u2022 Live", ru: "\u0425\u0443\u0430 \u0425\u0438\u043d \u2022 Live", uk: "\u0425\u0443\u0430 \u0425\u0456\u043d \u2022 Live", fr: "Hua Hin \u2022 En direct", es: "Hua Hin \u2022 En vivo" },

  // Stats
  "stat.level": { en: "Tide Level", cs: "Hladina", th: "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e19\u0e49\u0e33", de: "Pegel", ru: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c", uk: "\u0420\u0456\u0432\u0435\u043d\u044c", fr: "Niveau", es: "Nivel" },
  "stat.trend": { en: "Trend", cs: "Trend", th: "\u0e41\u0e19\u0e27\u0e42\u0e19\u0e49\u0e21", de: "Trend", ru: "\u0422\u0440\u0435\u043d\u0434", uk: "\u0422\u0440\u0435\u043d\u0434", fr: "Tendance", es: "Tendencia" },
  "stat.walkable": { en: "Walkable", cs: "Pr\u016fchodn\u00e9", th: "\u0e40\u0e14\u0e34\u0e19\u0e44\u0e14\u0e49", de: "Begehbar", ru: "\u041f\u0440\u043e\u0445\u043e\u0434\u0438\u043c\u044b\u0445", uk: "\u041f\u0440\u043e\u0445\u0456\u0434\u043d\u0438\u0445", fr: "Praticables", es: "Transitables" },
  "stat.updated": { en: "Updated", cs: "Aktualizace", th: "\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e15", de: "Aktualisiert", ru: "\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e", uk: "\u041e\u043d\u043e\u0432\u043b\u0435\u043d\u043e", fr: "Mis \u00e0 jour", es: "Actualizado" },

  // Trends
  "trend.rising": { en: "Rising", cs: "Stoup\u00e1", th: "\u0e02\u0e36\u0e49\u0e19", de: "Steigend", ru: "\u0420\u0430\u0441\u0442\u0451\u0442", uk: "\u0417\u0440\u043e\u0441\u0442\u0430\u0454", fr: "Monte", es: "Subiendo" },
  "trend.falling": { en: "Falling", cs: "Kles\u00e1", th: "\u0e25\u0e07", de: "Fallend", ru: "\u041f\u0430\u0434\u0430\u0435\u0442", uk: "\u0421\u043f\u0430\u0434\u0430\u0454", fr: "Descend", es: "Bajando" },
  "trend.high": { en: "High tide", cs: "P\u0159\u00edliv", th: "\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19", de: "Flut", ru: "\u041f\u0440\u0438\u043b\u0438\u0432", uk: "\u041f\u0440\u0438\u043b\u0438\u0432", fr: "Mar\u00e9e haute", es: "Pleamar" },
  "trend.low": { en: "Low tide", cs: "Odliv", th: "\u0e19\u0e49\u0e33\u0e25\u0e07", de: "Ebbe", ru: "\u041e\u0442\u043b\u0438\u0432", uk: "\u0412\u0456\u0434\u043b\u0438\u0432", fr: "Mar\u00e9e basse", es: "Bajamar" },

  // Beach card
  "beach.width": { en: "Beach", cs: "Pl\u00e1\u017e", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14", de: "Strand", ru: "\u041f\u043b\u044f\u0436", uk: "\u041f\u043b\u044f\u0436", fr: "Plage", es: "Playa" },
  "beach.tide": { en: "Tide", cs: "P\u0159\u00edliv", th: "\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19\u0e19\u0e49\u0e33\u0e25\u0e07", de: "Gezeiten", ru: "\u041f\u0440\u0438\u043b\u0438\u0432", uk: "\u041f\u0440\u0438\u043b\u0438\u0432", fr: "Mar\u00e9e", es: "Marea" },

  // Status labels
  "status.open": { en: "Open", cs: "Voln\u00e1", th: "\u0e40\u0e1b\u0e34\u0e14", de: "Offen", ru: "\u041e\u0442\u043a\u0440\u044b\u0442", uk: "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u043e", fr: "Ouvert", es: "Abierta" },
  "status.open.sub": { en: "Beach is open", cs: "Pl\u00e1\u017e je otev\u0159en\u00e1", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e40\u0e1b\u0e34\u0e14", de: "Strand ist offen", ru: "\u041f\u043b\u044f\u0436 \u043e\u0442\u043a\u0440\u044b\u0442", uk: "\u041f\u043b\u044f\u0436 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u0439", fr: "Plage ouverte", es: "Playa abierta" },
  "status.narrow": { en: "Passable", cs: "Pr\u016fchodn\u00e1", th: "\u0e41\u0e04\u0e1a", de: "Eng", ru: "\u0423\u0437\u043a\u0438\u0439", uk: "\u0412\u0443\u0437\u044c\u043a\u0438\u0439", fr: "\u00c9troit", es: "Estrecha" },
  "status.narrow.sub": { en: "Narrow sand strip", cs: "\u00dazk\u00fd pruh p\u00edsku", th: "\u0e41\u0e16\u0e1a\u0e17\u0e23\u0e32\u0e22\u0e41\u0e04\u0e1a", de: "Schmaler Sandstreifen", ru: "\u0423\u0437\u043a\u0430\u044f \u043f\u043e\u043b\u043e\u0441\u0430 \u043f\u0435\u0441\u043a\u0430", uk: "\u0412\u0443\u0437\u044c\u043a\u0430 \u0441\u043c\u0443\u0433\u0430 \u043f\u0456\u0441\u043a\u0443", fr: "Bande de sable \u00e9troite", es: "Franja estrecha de arena" },
  "status.flooded": { en: "Flooded", cs: "Zaplaven\u00e1", th: "\u0e17\u0e48\u0e27\u0e21", de: "\u00dcberflutet", ru: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d", uk: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d\u043e", fr: "Inond\u00e9e", es: "Inundada" },
  "status.flooded.sub": { en: "Beach is underwater", cs: "Pl\u00e1\u017e je pod vodou", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e08\u0e21\u0e19\u0e49\u0e33", de: "Strand ist unter Wasser", ru: "\u041f\u043b\u044f\u0436 \u043f\u043e\u0434 \u0432\u043e\u0434\u043e\u0439", uk: "\u041f\u043b\u044f\u0436 \u043f\u0456\u0434 \u0432\u043e\u0434\u043e\u044e", fr: "Plage sous l'eau", es: "Playa bajo el agua" },

  // Event labels
  "event.high": { en: "High tide", cs: "P\u0159\u00edliv", th: "\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19", de: "Flut", ru: "\u041f\u0440\u0438\u043b\u0438\u0432", uk: "\u041f\u0440\u0438\u043b\u0438\u0432", fr: "Mar\u00e9e haute", es: "Pleamar" },
  "event.low": { en: "Low tide", cs: "Odliv", th: "\u0e19\u0e49\u0e33\u0e25\u0e07", de: "Ebbe", ru: "\u041e\u0442\u043b\u0438\u0432", uk: "\u0412\u0456\u0434\u043b\u0438\u0432", fr: "Mar\u00e9e basse", es: "Bajamar" },
  "event.opens": { en: "Beach opens", cs: "Pl\u00e1\u017e se otev\u0159e", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e40\u0e1b\u0e34\u0e14", de: "Strand \u00f6ffnet sich", ru: "\u041f\u043b\u044f\u0436 \u043e\u0442\u043a\u0440\u043e\u0435\u0442\u0441\u044f", uk: "\u041f\u043b\u044f\u0436 \u0432\u0456\u0434\u043a\u0440\u0438\u0454\u0442\u044c\u0441\u044f", fr: "Plage s'ouvre", es: "Playa se abre" },
  "event.narrow": { en: "Narrow passage", cs: "\u00dazk\u00fd pr\u016fchod", th: "\u0e17\u0e32\u0e07\u0e41\u0e04\u0e1a", de: "Enger Durchgang", ru: "\u0423\u0437\u043a\u0438\u0439 \u043f\u0440\u043e\u0445\u043e\u0434", uk: "\u0412\u0443\u0437\u044c\u043a\u0438\u0439 \u043f\u0440\u043e\u0445\u0456\u0434", fr: "Passage \u00e9troit", es: "Paso estrecho" },
  "event.flooding": { en: "Flooding", cs: "Zaplaven\u00ed", th: "\u0e17\u0e48\u0e27\u0e21", de: "\u00dcberflutung", ru: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u0435", uk: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d\u043d\u044f", fr: "Inondation", es: "Inundaci\u00f3n" },

  // Detail
  "detail.upcoming": { en: "Upcoming changes", cs: "Nadch\u00e1zej\u00edc\u00ed zm\u011bny", th: "\u0e01\u0e32\u0e23\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e41\u0e1b\u0e25\u0e07", de: "Kommende \u00c4nderungen", ru: "\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f", uk: "\u041d\u0430\u0439\u0431\u043b\u0438\u0436\u0447\u0456 \u0437\u043c\u0456\u043d\u0438", fr: "Changements \u00e0 venir", es: "Pr\u00f3ximos cambios" },
  "detail.openMaps": { en: "Open in Google Maps", cs: "Otev\u0159\u00edt v Google Maps", th: "\u0e40\u0e1b\u0e34\u0e14\u0e43\u0e19 Google Maps", de: "In Google Maps \u00f6ffnen", ru: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 Google Maps", uk: "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u0432 Google Maps", fr: "Ouvrir dans Google Maps", es: "Abrir en Google Maps" },
  "detail.close": { en: "Close", cs: "Zav\u0159\u00edt", th: "\u0e1b\u0e34\u0e14", de: "Schlie\u00dfen", ru: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c", uk: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438", fr: "Fermer", es: "Cerrar" },

  // Forecast
  "forecast.title": { en: "Today's forecast", cs: "Předpověď na dnes", th: "พยากรณ์วันนี้", de: "Vorhersage heute", ru: "Прогноз на сегодня", uk: "Прогноз на сьогодні", fr: "Prévision du jour", es: "Pronóstico de hoy" },
  "forecast.width": { en: "width", cs: "šířka", th: "ความกว้าง", de: "Breite", ru: "ширина", uk: "ширина", fr: "largeur", es: "ancho" },

  // Chart
  "chart.title": { en: "Tide chart \u2014 today", cs: "Pr\u016fb\u011bh p\u0159\u00edlivu \u2014 dnes", th: "\u0e01\u0e23\u0e32\u0e1f\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19\u0e19\u0e49\u0e33\u0e25\u0e07 \u2014 \u0e27\u0e31\u0e19\u0e19\u0e35\u0e49", de: "Gezeitendiagramm \u2014 heute", ru: "\u0413\u0440\u0430\u0444\u0438\u043a \u043f\u0440\u0438\u043b\u0438\u0432\u043e\u0432 \u2014 \u0441\u0435\u0433\u043e\u0434\u043d\u044f", uk: "\u0413\u0440\u0430\u0444\u0456\u043a \u043f\u0440\u0438\u043b\u0438\u0432\u0456\u0432 \u2014 \u0441\u044c\u043e\u0433\u043e\u0434\u043d\u0456", fr: "Mar\u00e9e du jour", es: "Marea de hoy" },
  "chart.subtitle": { en: "Gulf of Thailand", cs: "Siamsk\u00fd z\u00e1liv", th: "\u0e2d\u0e48\u0e32\u0e27\u0e44\u0e17\u0e22", de: "Golf von Thailand", ru: "\u0421\u0438\u0430\u043c\u0441\u043a\u0438\u0439 \u0437\u0430\u043b\u0438\u0432", uk: "\u0421\u0456\u0430\u043c\u0441\u044c\u043a\u0430 \u0437\u0430\u0442\u043e\u043a\u0430", fr: "Golfe de Tha\u00eflande", es: "Golfo de Tailandia" },

  // Footer
  "footer.disclaimer": {
    en: "Data is approximate. Actual conditions affected by wind, pressure and monsoons.",
    cs: "Data jsou aproximac\u00ed. Skute\u010dn\u00e9 podm\u00ednky ovliv\u0148uje v\u00edtr, tlak a monzuny.",
    th: "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e40\u0e1b\u0e47\u0e19\u0e04\u0e48\u0e32\u0e1b\u0e23\u0e30\u0e21\u0e32\u0e13 \u0e2a\u0e20\u0e32\u0e1e\u0e08\u0e23\u0e34\u0e07\u0e02\u0e36\u0e49\u0e19\u0e2d\u0e22\u0e39\u0e48\u0e01\u0e31\u0e1a\u0e25\u0e21 \u0e04\u0e27\u0e32\u0e21\u0e01\u0e14\u0e2d\u0e32\u0e01\u0e32\u0e28 \u0e41\u0e25\u0e30\u0e21\u0e23\u0e2a\u0e38\u0e21",
    de: "Daten sind Sch\u00e4tzungen. Tats\u00e4chliche Bedingungen h\u00e4ngen von Wind, Druck und Monsun ab.",
    ru: "\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u0431\u043b\u0438\u0437\u0438\u0442\u0435\u043b\u044c\u043d\u044b. \u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0443\u0441\u043b\u043e\u0432\u0438\u044f \u0437\u0430\u0432\u0438\u0441\u044f\u0442 \u043e\u0442 \u0432\u0435\u0442\u0440\u0430, \u0434\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0438 \u043c\u0443\u0441\u0441\u043e\u043d\u043e\u0432.",
    uk: "\u0414\u0430\u043d\u0456 \u043d\u0430\u0431\u043b\u0438\u0436\u0435\u043d\u0456. \u0420\u0435\u0430\u043b\u044c\u043d\u0456 \u0443\u043c\u043e\u0432\u0438 \u0437\u0430\u043b\u0435\u0436\u0430\u0442\u044c \u0432\u0456\u0434 \u0432\u0456\u0442\u0440\u0443, \u0442\u0438\u0441\u043a\u0443 \u0442\u0430 \u043c\u0443\u0441\u043e\u043d\u0456\u0432.",
    fr: "Donn\u00e9es approximatives. Conditions r\u00e9elles affect\u00e9es par le vent, la pression et les moussons.",
    es: "Datos aproximados. Condiciones reales afectadas por viento, presi\u00f3n y monzones.",
  },
  "footer.source": { en: "Source: harmonic model", cs: "Zdroj: harmonick\u00fd model", th: "\u0e41\u0e2b\u0e25\u0e48\u0e07: \u0e42\u0e21\u0e40\u0e14\u0e25\u0e2e\u0e32\u0e23\u0e4c\u0e21\u0e2d\u0e19\u0e34\u0e01", de: "Quelle: Harmonisches Modell", ru: "\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a: \u0433\u0430\u0440\u043c\u043e\u043d\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c", uk: "\u0414\u0436\u0435\u0440\u0435\u043b\u043e: \u0433\u0430\u0440\u043c\u043e\u043d\u0456\u0447\u043d\u0430 \u043c\u043e\u0434\u0435\u043b\u044c", fr: "Source : mod\u00e8le harmonique", es: "Fuente: modelo arm\u00f3nico" },
  "footer.sourceApi": { en: "Source: Storm Glass API", cs: "Zdroj: Storm Glass API", th: "\u0e41\u0e2b\u0e25\u0e48\u0e07: Storm Glass API", de: "Quelle: Storm Glass API", ru: "\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a: Storm Glass API", uk: "\u0414\u0436\u0435\u0440\u0435\u043b\u043e: Storm Glass API", fr: "Source : Storm Glass API", es: "Fuente: Storm Glass API" },

  // Beaches section
  "section.beaches": { en: "Beaches", cs: "Pl\u00e1\u017ee", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14", de: "Str\u00e4nde", ru: "\u041f\u043b\u044f\u0436\u0438", uk: "\u041f\u043b\u044f\u0436\u0456", fr: "Plages", es: "Playas" },

  // Beach descriptions
  "beach.hua-hin-main": { en: "Main city beach, 5km long promenade", cs: "Hlavn\u00ed m\u011bstsk\u00e1 pl\u00e1\u017e, 5 km promen\u00e1da", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e2b\u0e25\u0e31\u0e01\u0e02\u0e2d\u0e07\u0e40\u0e21\u0e37\u0e2d\u0e07 5 \u0e01\u0e21.", de: "Hauptstadtstrand, 5 km Promenade", ru: "\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434\u0441\u043a\u043e\u0439 \u043f\u043b\u044f\u0436, 5 \u043a\u043c", uk: "\u0413\u043e\u043b\u043e\u0432\u043d\u0438\u0439 \u043c\u0456\u0441\u044c\u043a\u0438\u0439 \u043f\u043b\u044f\u0436, 5 \u043a\u043c", fr: "Plage principale, promenade de 5 km", es: "Playa principal, paseo de 5 km" },
  "beach.khao-takiab": { en: "Quieter beach by Monkey Mountain", cs: "Klidn\u011bj\u0161\u00ed pl\u00e1\u017e u Monkey Mountain", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e40\u0e07\u0e35\u0e22\u0e1a\u0e43\u0e01\u0e25\u0e49\u0e40\u0e02\u0e32\u0e15\u0e30\u0e40\u0e01\u0e35\u0e22\u0e1a", de: "Ruhigerer Strand am Affenberg", ru: "\u0422\u0438\u0445\u0438\u0439 \u043f\u043b\u044f\u0436 \u0443 \u041e\u0431\u0435\u0437\u044c\u044f\u043d\u044c\u0435\u0439 \u0433\u043e\u0440\u044b", uk: "\u0422\u0438\u0445\u0438\u0439 \u043f\u043b\u044f\u0436 \u0431\u0456\u043b\u044f \u041c\u0430\u0432\u043f\u0027\u044f\u0447\u043e\u0457 \u0433\u043e\u0440\u0438", fr: "Plage calme pr\u00e8s de Monkey Mountain", es: "Playa tranquila junto a Monkey Mountain" },
  "beach.suan-son": { en: "Military beach with pine trees, few tourists", cs: "Vojensk\u00e1 pl\u00e1\u017e s borovicemi, m\u00e1lo turist\u016f", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e17\u0e2b\u0e32\u0e23 \u0e15\u0e49\u0e19\u0e2a\u0e19 \u0e19\u0e31\u0e01\u0e17\u0e48\u0e2d\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e27\u0e19\u0e49\u0e2d\u0e22", de: "Milit\u00e4rstrand mit Kiefern, wenige Touristen", ru: "\u0412\u043e\u0435\u043d\u043d\u044b\u0439 \u043f\u043b\u044f\u0436 \u0441 \u0441\u043e\u0441\u043d\u0430\u043c\u0438, \u043c\u0430\u043b\u043e \u0442\u0443\u0440\u0438\u0441\u0442\u043e\u0432", uk: "\u0412\u0456\u0439\u0441\u044c\u043a\u043e\u0432\u0438\u0439 \u043f\u043b\u044f\u0436 \u0437 \u0441\u043e\u0441\u043d\u0430\u043c\u0438, \u043c\u0430\u043b\u043e \u0442\u0443\u0440\u0438\u0441\u0442\u0456\u0432", fr: "Plage militaire avec pins, peu de touristes", es: "Playa militar con pinos, pocos turistas" },
  "beach.khao-tao": { en: "Hidden gem, perfect for walks", cs: "Skryt\u00fd klenot, ide\u00e1ln\u00ed na proch\u00e1zky", th: "\u0e2d\u0e31\u0e0d\u0e21\u0e13\u0e35\u0e0b\u0e48\u0e2d\u0e19\u0e40\u0e23\u0e49\u0e19 \u0e40\u0e2b\u0e21\u0e32\u0e30\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e14\u0e34\u0e19\u0e40\u0e25\u0e48\u0e19", de: "Geheimtipp, ideal zum Spazieren", ru: "\u0421\u043a\u0440\u044b\u0442\u0430\u044f \u0436\u0435\u043c\u0447\u0443\u0436\u0438\u043d\u0430, \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u043f\u0440\u043e\u0433\u0443\u043b\u043e\u043a", uk: "\u041f\u0440\u0438\u0445\u043e\u0432\u0430\u043d\u0430 \u043f\u0435\u0440\u043b\u0438\u043d\u0430, \u0456\u0434\u0435\u0430\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u043f\u0440\u043e\u0433\u0443\u043b\u044f\u043d\u043e\u043a", fr: "Perle cach\u00e9e, id\u00e9ale pour se promener", es: "Joya escondida, ideal para caminar" },
  "beach.cha-am": { en: "Wide beach 20 min north of Hua Hin", cs: "\u0160irok\u00e1 pl\u00e1\u017e 20 min severn\u011b od Hua Hinu", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e01\u0e27\u0e49\u0e32\u0e07 20 \u0e19\u0e32\u0e17\u0e35\u0e17\u0e32\u0e07\u0e40\u0e2b\u0e19\u0e37\u0e2d\u0e2b\u0e31\u0e27\u0e2b\u0e34\u0e19", de: "Breiter Strand, 20 Min. n\u00f6rdlich von Hua Hin", ru: "\u0428\u0438\u0440\u043e\u043a\u0438\u0439 \u043f\u043b\u044f\u0436 \u0432 20 \u043c\u0438\u043d. \u043a \u0441\u0435\u0432\u0435\u0440\u0443 \u043e\u0442 \u0425\u0443\u0430 \u0425\u0438\u043d\u0430", uk: "\u0428\u0438\u0440\u043e\u043a\u0438\u0439 \u043f\u043b\u044f\u0436 \u0437\u0430 20 \u0445\u0432. \u043d\u0430 \u043f\u0456\u0432\u043d\u0456\u0447 \u0432\u0456\u0434 \u0425\u0443\u0430 \u0425\u0456\u043d\u0430", fr: "Large plage \u00e0 20 min au nord de Hua Hin", es: "Playa amplia, 20 min al norte de Hua Hin" },
};

export function t(lang: Lang, key: string): string {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}

function detectLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("beachwatch-lang");
  if (stored && LANGUAGES.some((l) => l.code === stored)) return stored as Lang;
  const nav = navigator.language.slice(0, 2);
  const match = LANGUAGES.find((l) => l.code === nav);
  return match ? match.code : "en";
}

export function setLanguage(lang: Lang): void {
  localStorage.setItem("beachwatch-lang", lang);
  langListeners.forEach((fn) => fn());
}

const langListeners = new Set<() => void>();

function subscribeLang(callback: () => void) {
  langListeners.add(callback);
  return () => langListeners.delete(callback);
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(subscribeLang, detectLanguage, () => "en" as Lang);
  return [lang, setLanguage];
}

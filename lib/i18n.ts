import { useSyncExternalStore } from "react";

export type Lang = "en" | "cs" | "th" | "de" | "ru" | "uk" | "fr" | "es" | "zh" | "ja" | "ko" | "sv" | "nl" | "it";

export const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "\ud83c\uddec\ud83c\udde7", label: "English" },
  { code: "cs", flag: "\ud83c\udde8\ud83c\uddff", label: "\u010ce\u0161tina" },
  { code: "th", flag: "\ud83c\uddf9\ud83c\udded", label: "\u0e44\u0e17\u0e22" },
  { code: "zh", flag: "\ud83c\udde8\ud83c\uddf3", label: "\u4e2d\u6587" },
  { code: "ja", flag: "\ud83c\uddef\ud83c\uddf5", label: "\u65e5\u672c\u8a9e" },
  { code: "ko", flag: "\ud83c\uddf0\ud83c\uddf7", label: "\ud55c\uad6d\uc5b4" },
  { code: "de", flag: "\ud83c\udde9\ud83c\uddea", label: "Deutsch" },
  { code: "sv", flag: "\ud83c\uddf8\ud83c\uddea", label: "Svenska" },
  { code: "nl", flag: "\ud83c\uddf3\ud83c\uddf1", label: "Nederlands" },
  { code: "ru", flag: "\ud83c\uddf7\ud83c\uddfa", label: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
  { code: "uk", flag: "\ud83c\uddfa\ud83c\udde6", label: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430" },
  { code: "fr", flag: "\ud83c\uddeb\ud83c\uddf7", label: "Fran\u00e7ais" },
  { code: "es", flag: "\ud83c\uddea\ud83c\uddf8", label: "Espa\u00f1ol" },
  { code: "it", flag: "\ud83c\uddee\ud83c\uddf9", label: "Italiano" },
];

// All UI strings keyed by translation key, then by language
// en is always the fallback
const T: Record<string, Partial<Record<Lang, string>>> = {
  // Header
  "header.title": { en: "Beach Watch" },
  "header.subtitle": {
    en: "Hua Hin \u2022 Live", cs: "Hua Hin \u2022 \u017div\u011b", th: "Hua Hin \u2022 \u0e2a\u0e14",
    zh: "\u534e\u6b23 \u2022 \u5b9e\u65f6", ja: "\u30db\u30a2\u30d2\u30f3 \u2022 \u30e9\u30a4\u30d6", ko: "\ud6c4\uc544\ud78c \u2022 \uc2e4\uc2dc\uac04",
    de: "Hua Hin \u2022 Live", sv: "Hua Hin \u2022 Live", nl: "Hua Hin \u2022 Live",
    ru: "\u0425\u0443\u0430 \u0425\u0438\u043d \u2022 Live", uk: "\u0425\u0443\u0430 \u0425\u0456\u043d \u2022 Live",
    fr: "Hua Hin \u2022 En direct", es: "Hua Hin \u2022 En vivo", it: "Hua Hin \u2022 Live",
  },

  // Stats
  "stat.level": {
    en: "Tide Level", cs: "Hladina", th: "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e19\u0e49\u0e33",
    zh: "\u6f6e\u4f4d", ja: "\u6f6e\u4f4d", ko: "\uc870\uc704",
    de: "Pegel", sv: "Tidvatten", nl: "Getijde",
    ru: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c", uk: "\u0420\u0456\u0432\u0435\u043d\u044c",
    fr: "Niveau", es: "Nivel", it: "Livello",
  },
  "stat.trend": {
    en: "Trend", cs: "Trend", th: "\u0e41\u0e19\u0e27\u0e42\u0e19\u0e49\u0e21",
    zh: "\u8d8b\u52bf", ja: "\u30c8\u30ec\u30f3\u30c9", ko: "\ucd94\uc138",
    de: "Trend", sv: "Trend", nl: "Trend",
    ru: "\u0422\u0440\u0435\u043d\u0434", uk: "\u0422\u0440\u0435\u043d\u0434",
    fr: "Tendance", es: "Tendencia", it: "Tendenza",
  },
  "stat.walkable": {
    en: "Walkable", cs: "Pr\u016fchodn\u00e9", th: "\u0e40\u0e14\u0e34\u0e19\u0e44\u0e14\u0e49",
    zh: "\u53ef\u901a\u884c", ja: "\u901a\u884c\u53ef\u80fd", ko: "\ud1b5\ud589 \uac00\ub2a5",
    de: "Begehbar", sv: "G\u00e5ngbara", nl: "Begaanbaar",
    ru: "\u041f\u0440\u043e\u0445\u043e\u0434\u0438\u043c\u044b\u0445", uk: "\u041f\u0440\u043e\u0445\u0456\u0434\u043d\u0438\u0445",
    fr: "Praticables", es: "Transitables", it: "Percorribili",
  },
  "stat.updated": {
    en: "Updated", cs: "Aktualizace", th: "\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e15",
    zh: "\u66f4\u65b0", ja: "\u66f4\u65b0", ko: "\uc5c5\ub370\uc774\ud2b8",
    de: "Aktualisiert", sv: "Uppdaterad", nl: "Bijgewerkt",
    ru: "\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e", uk: "\u041e\u043d\u043e\u0432\u043b\u0435\u043d\u043e",
    fr: "Mis \u00e0 jour", es: "Actualizado", it: "Aggiornato",
  },

  // Trends
  "trend.rising": {
    en: "Rising", cs: "Stoup\u00e1", th: "\u0e02\u0e36\u0e49\u0e19",
    zh: "\u4e0a\u6da8", ja: "\u4e0a\u6607\u4e2d", ko: "\uc0c1\uc2b9 \uc911",
    de: "Steigend", sv: "Stigande", nl: "Stijgend",
    ru: "\u0420\u0430\u0441\u0442\u0451\u0442", uk: "\u0417\u0440\u043e\u0441\u0442\u0430\u0454",
    fr: "Monte", es: "Subiendo", it: "In salita",
  },
  "trend.falling": {
    en: "Falling", cs: "Kles\u00e1", th: "\u0e25\u0e07",
    zh: "\u4e0b\u964d", ja: "\u4e0b\u964d\u4e2d", ko: "\ud558\uac15 \uc911",
    de: "Fallend", sv: "Fallande", nl: "Dalend",
    ru: "\u041f\u0430\u0434\u0430\u0435\u0442", uk: "\u0421\u043f\u0430\u0434\u0430\u0454",
    fr: "Descend", es: "Bajando", it: "In discesa",
  },
  "trend.high": {
    en: "High tide", cs: "P\u0159\u00edliv", th: "\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19",
    zh: "\u9ad8\u6f6e", ja: "\u6e80\u6f6e", ko: "\ub9cc\uc870",
    de: "Flut", sv: "H\u00f6gvatten", nl: "Hoogwater",
    ru: "\u041f\u0440\u0438\u043b\u0438\u0432", uk: "\u041f\u0440\u0438\u043b\u0438\u0432",
    fr: "Mar\u00e9e haute", es: "Pleamar", it: "Alta marea",
  },
  "trend.low": {
    en: "Low tide", cs: "Odliv", th: "\u0e19\u0e49\u0e33\u0e25\u0e07",
    zh: "\u4f4e\u6f6e", ja: "\u5e72\u6f6e", ko: "\uac04\uc870",
    de: "Ebbe", sv: "L\u00e5gvatten", nl: "Laagwater",
    ru: "\u041e\u0442\u043b\u0438\u0432", uk: "\u0412\u0456\u0434\u043b\u0438\u0432",
    fr: "Mar\u00e9e basse", es: "Bajamar", it: "Bassa marea",
  },

  // Beach card
  "beach.width": {
    en: "Beach", cs: "Pl\u00e1\u017e", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14",
    zh: "\u6d77\u6ee9", ja: "\u30d3\u30fc\u30c1", ko: "\ud574\ubcc0",
    de: "Strand", sv: "Strand", nl: "Strand",
    ru: "\u041f\u043b\u044f\u0436", uk: "\u041f\u043b\u044f\u0436",
    fr: "Plage", es: "Playa", it: "Spiaggia",
  },
  "beach.tide": {
    en: "Tide", cs: "P\u0159\u00edliv", th: "\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19\u0e19\u0e49\u0e33\u0e25\u0e07",
    zh: "\u6f6e\u6c50", ja: "\u6f6e\u6c50", ko: "\uc870\uc218",
    de: "Gezeiten", sv: "Tidvatten", nl: "Getijde",
    ru: "\u041f\u0440\u0438\u043b\u0438\u0432", uk: "\u041f\u0440\u0438\u043b\u0438\u0432",
    fr: "Mar\u00e9e", es: "Marea", it: "Marea",
  },

  // Status labels
  "status.open": {
    en: "Open", cs: "Voln\u00e1", th: "\u0e40\u0e1b\u0e34\u0e14",
    zh: "\u5f00\u653e", ja: "\u958b\u653e", ko: "\uac1c\ubc29",
    de: "Offen", sv: "\u00d6ppen", nl: "Open",
    ru: "\u041e\u0442\u043a\u0440\u044b\u0442", uk: "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u043e",
    fr: "Ouvert", es: "Abierta", it: "Aperta",
  },
  "status.open.sub": {
    en: "Beach is open", cs: "Pl\u00e1\u017e je otev\u0159en\u00e1", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e40\u0e1b\u0e34\u0e14",
    zh: "\u6d77\u6ee9\u5f00\u653e", ja: "\u30d3\u30fc\u30c1\u306f\u958b\u653e\u4e2d", ko: "\ud574\ubcc0 \uac1c\ubc29",
    de: "Strand ist offen", sv: "Stranden \u00e4r \u00f6ppen", nl: "Strand is open",
    ru: "\u041f\u043b\u044f\u0436 \u043e\u0442\u043a\u0440\u044b\u0442", uk: "\u041f\u043b\u044f\u0436 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u0438\u0439",
    fr: "Plage ouverte", es: "Playa abierta", it: "Spiaggia aperta",
  },
  "status.narrow": {
    en: "Passable", cs: "Pr\u016fchodn\u00e1", th: "\u0e41\u0e04\u0e1a",
    zh: "\u72ed\u7a84", ja: "\u72ed\u3044", ko: "\uc88b\uc74c",
    de: "Eng", sv: "Smal", nl: "Smal",
    ru: "\u0423\u0437\u043a\u0438\u0439", uk: "\u0412\u0443\u0437\u044c\u043a\u0438\u0439",
    fr: "\u00c9troit", es: "Estrecha", it: "Stretto",
  },
  "status.narrow.sub": {
    en: "Narrow sand strip", cs: "\u00dazk\u00fd pruh p\u00edsku", th: "\u0e41\u0e16\u0e1a\u0e17\u0e23\u0e32\u0e22\u0e41\u0e04\u0e1a",
    zh: "\u6c99\u6ee9\u5e26\u72ed\u7a84", ja: "\u7802\u6d5c\u304c\u72ed\u3044", ko: "\uc88b\uc740 \ubaa8\ub798\uc0ac\uc7a5",
    de: "Schmaler Sandstreifen", sv: "Smal sandremsa", nl: "Smalle zandstrook",
    ru: "\u0423\u0437\u043a\u0430\u044f \u043f\u043e\u043b\u043e\u0441\u0430 \u043f\u0435\u0441\u043a\u0430", uk: "\u0412\u0443\u0437\u044c\u043a\u0430 \u0441\u043c\u0443\u0433\u0430 \u043f\u0456\u0441\u043a\u0443",
    fr: "Bande de sable \u00e9troite", es: "Franja estrecha de arena", it: "Striscia di sabbia stretta",
  },
  "status.flooded": {
    en: "Flooded", cs: "Zaplaven\u00e1", th: "\u0e17\u0e48\u0e27\u0e21",
    zh: "\u6dec\u6ca1", ja: "\u51a0\u6c34", ko: "\uce68\uc218",
    de: "\u00dcberflutet", sv: "\u00d6versv\u00e4mmad", nl: "Overstroomd",
    ru: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d", uk: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d\u043e",
    fr: "Inond\u00e9e", es: "Inundada", it: "Allagata",
  },
  "status.flooded.sub": {
    en: "Beach is underwater", cs: "Pl\u00e1\u017e je pod vodou", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e08\u0e21\u0e19\u0e49\u0e33",
    zh: "\u6d77\u6ee9\u88ab\u6dec\u6ca1", ja: "\u30d3\u30fc\u30c1\u306f\u6c34\u6ca1\u4e2d", ko: "\ud574\ubcc0\uc774 \uce68\uc218\ub428",
    de: "Strand ist unter Wasser", sv: "Stranden \u00e4r under vatten", nl: "Strand staat onder water",
    ru: "\u041f\u043b\u044f\u0436 \u043f\u043e\u0434 \u0432\u043e\u0434\u043e\u0439", uk: "\u041f\u043b\u044f\u0436 \u043f\u0456\u0434 \u0432\u043e\u0434\u043e\u044e",
    fr: "Plage sous l'eau", es: "Playa bajo el agua", it: "Spiaggia sott'acqua",
  },

  // Event labels
  "event.high": {
    en: "High tide", cs: "P\u0159\u00edliv", th: "\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19",
    zh: "\u9ad8\u6f6e", ja: "\u6e80\u6f6e", ko: "\ub9cc\uc870",
    de: "Flut", sv: "H\u00f6gvatten", nl: "Hoogwater",
    ru: "\u041f\u0440\u0438\u043b\u0438\u0432", uk: "\u041f\u0440\u0438\u043b\u0438\u0432",
    fr: "Mar\u00e9e haute", es: "Pleamar", it: "Alta marea",
  },
  "event.low": {
    en: "Low tide", cs: "Odliv", th: "\u0e19\u0e49\u0e33\u0e25\u0e07",
    zh: "\u4f4e\u6f6e", ja: "\u5e72\u6f6e", ko: "\uac04\uc870",
    de: "Ebbe", sv: "L\u00e5gvatten", nl: "Laagwater",
    ru: "\u041e\u0442\u043b\u0438\u0432", uk: "\u0412\u0456\u0434\u043b\u0438\u0432",
    fr: "Mar\u00e9e basse", es: "Bajamar", it: "Bassa marea",
  },
  "event.opens": {
    en: "Beach opens", cs: "Pl\u00e1\u017e se otev\u0159e", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e40\u0e1b\u0e34\u0e14",
    zh: "\u6d77\u6ee9\u5f00\u653e", ja: "\u30d3\u30fc\u30c1\u958b\u653e", ko: "\ud574\ubcc0 \uac1c\ubc29",
    de: "Strand \u00f6ffnet sich", sv: "Stranden \u00f6ppnar", nl: "Strand gaat open",
    ru: "\u041f\u043b\u044f\u0436 \u043e\u0442\u043a\u0440\u043e\u0435\u0442\u0441\u044f", uk: "\u041f\u043b\u044f\u0436 \u0432\u0456\u0434\u043a\u0440\u0438\u0454\u0442\u044c\u0441\u044f",
    fr: "Plage s'ouvre", es: "Playa se abre", it: "Spiaggia si apre",
  },
  "event.narrow": {
    en: "Narrow passage", cs: "\u00dazk\u00fd pr\u016fchod", th: "\u0e17\u0e32\u0e07\u0e41\u0e04\u0e1a",
    zh: "\u901a\u9053\u72ed\u7a84", ja: "\u72ed\u3044\u901a\u8def", ko: "\uc88b\uc740 \ud1b5\ub85c",
    de: "Enger Durchgang", sv: "Smal passage", nl: "Smalle doorgang",
    ru: "\u0423\u0437\u043a\u0438\u0439 \u043f\u0440\u043e\u0445\u043e\u0434", uk: "\u0412\u0443\u0437\u044c\u043a\u0438\u0439 \u043f\u0440\u043e\u0445\u0456\u0434",
    fr: "Passage \u00e9troit", es: "Paso estrecho", it: "Passaggio stretto",
  },
  "event.flooding": {
    en: "Flooding", cs: "Zaplaven\u00ed", th: "\u0e17\u0e48\u0e27\u0e21",
    zh: "\u6dec\u6c34", ja: "\u51a0\u6c34", ko: "\uce68\uc218",
    de: "\u00dcberflutung", sv: "\u00d6versv\u00e4mning", nl: "Overstroming",
    ru: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d\u0438\u0435", uk: "\u0417\u0430\u0442\u043e\u043f\u043b\u0435\u043d\u043d\u044f",
    fr: "Inondation", es: "Inundaci\u00f3n", it: "Allagamento",
  },

  // Detail
  "detail.upcoming": {
    en: "Upcoming changes", cs: "Nadch\u00e1zej\u00edc\u00ed zm\u011bny", th: "\u0e01\u0e32\u0e23\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e41\u0e1b\u0e25\u0e07",
    zh: "\u5373\u5c06\u53d8\u5316", ja: "\u4eca\u5f8c\u306e\u5909\u5316", ko: "\uc608\uc815\ub41c \ubcc0\ud654",
    de: "Kommende \u00c4nderungen", sv: "Kommande \u00e4ndringar", nl: "Komende veranderingen",
    ru: "\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f", uk: "\u041d\u0430\u0439\u0431\u043b\u0438\u0436\u0447\u0456 \u0437\u043c\u0456\u043d\u0438",
    fr: "Changements \u00e0 venir", es: "Pr\u00f3ximos cambios", it: "Prossimi cambiamenti",
  },
  "detail.openMaps": {
    en: "Open in Google Maps", cs: "Otev\u0159\u00edt v Google Maps", th: "\u0e40\u0e1b\u0e34\u0e14\u0e43\u0e19 Google Maps",
    zh: "\u5728\u8c37\u6b4c\u5730\u56fe\u4e2d\u6253\u5f00", ja: "Google \u30de\u30c3\u30d7\u3067\u958b\u304f", ko: "Google \uc9c0\ub3c4\uc5d0\uc11c \uc5f4\uae30",
    de: "In Google Maps \u00f6ffnen", sv: "\u00d6ppna i Google Maps", nl: "Openen in Google Maps",
    ru: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 Google Maps", uk: "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 \u0432 Google Maps",
    fr: "Ouvrir dans Google Maps", es: "Abrir en Google Maps", it: "Apri in Google Maps",
  },
  "detail.close": {
    en: "Close", cs: "Zav\u0159\u00edt", th: "\u0e1b\u0e34\u0e14",
    zh: "\u5173\u95ed", ja: "\u9589\u3058\u308b", ko: "\ub2eb\uae30",
    de: "Schlie\u00dfen", sv: "St\u00e4ng", nl: "Sluiten",
    ru: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c", uk: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438",
    fr: "Fermer", es: "Cerrar", it: "Chiudi",
  },

  // Forecast
  "forecast.title": {
    en: "Today's forecast", cs: "P\u0159edpov\u011b\u010f na dnes", th: "\u0e1e\u0e22\u0e32\u0e01\u0e23\u0e13\u0e4c\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49",
    zh: "\u4eca\u65e5\u9884\u62a5", ja: "\u4eca\u65e5\u306e\u4e88\u5831", ko: "\uc624\ub298\uc758 \uc608\ubcf4",
    de: "Vorhersage heute", sv: "Dagens prognos", nl: "Verwachting vandaag",
    ru: "\u041f\u0440\u043e\u0433\u043d\u043e\u0437 \u043d\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f", uk: "\u041f\u0440\u043e\u0433\u043d\u043e\u0437 \u043d\u0430 \u0441\u044c\u043e\u0433\u043e\u0434\u043d\u0456",
    fr: "Pr\u00e9vision du jour", es: "Pron\u00f3stico de hoy", it: "Previsioni di oggi",
  },

  // Chart
  "chart.title": {
    en: "Tide chart \u2014 today", cs: "Pr\u016fb\u011bh p\u0159\u00edlivu \u2014 dnes", th: "\u0e01\u0e23\u0e32\u0e1f\u0e19\u0e49\u0e33\u0e02\u0e36\u0e49\u0e19\u0e19\u0e49\u0e33\u0e25\u0e07 \u2014 \u0e27\u0e31\u0e19\u0e19\u0e35\u0e49",
    zh: "\u6f6e\u6c50\u56fe\u8868 \u2014 \u4eca\u65e5", ja: "\u6f6e\u6c50\u30c1\u30e3\u30fc\u30c8 \u2014 \u4eca\u65e5", ko: "\uc870\uc11d \ucc28\ud2b8 \u2014 \uc624\ub298",
    de: "Gezeitendiagramm \u2014 heute", sv: "Tidvattendiagram \u2014 idag", nl: "Getijdendiagram \u2014 vandaag",
    ru: "\u0413\u0440\u0430\u0444\u0438\u043a \u043f\u0440\u0438\u043b\u0438\u0432\u043e\u0432 \u2014 \u0441\u0435\u0433\u043e\u0434\u043d\u044f", uk: "\u0413\u0440\u0430\u0444\u0456\u043a \u043f\u0440\u0438\u043b\u0438\u0432\u0456\u0432 \u2014 \u0441\u044c\u043e\u0433\u043e\u0434\u043d\u0456",
    fr: "Mar\u00e9e du jour", es: "Marea de hoy", it: "Grafico maree \u2014 oggi",
  },
  "chart.subtitle": {
    en: "Gulf of Thailand", cs: "Siamsk\u00fd z\u00e1liv", th: "\u0e2d\u0e48\u0e32\u0e27\u0e44\u0e17\u0e22",
    zh: "\u6cf0\u56fd\u6e7e", ja: "\u30bf\u30a4\u6e7e", ko: "\ud0dc\uad6d\ub9cc",
    de: "Golf von Thailand", sv: "Thailandsbukten", nl: "Golf van Thailand",
    ru: "\u0421\u0438\u0430\u043c\u0441\u043a\u0438\u0439 \u0437\u0430\u043b\u0438\u0432", uk: "\u0421\u0456\u0430\u043c\u0441\u044c\u043a\u0430 \u0437\u0430\u0442\u043e\u043a\u0430",
    fr: "Golfe de Tha\u00eflande", es: "Golfo de Tailandia", it: "Golfo di Thailandia",
  },

  // Footer
  "footer.disclaimer": {
    en: "Data is approximate. Actual conditions affected by wind, pressure and monsoons.",
    cs: "Data jsou aproximac\u00ed. Skute\u010dn\u00e9 podm\u00ednky ovliv\u0148uje v\u00edtr, tlak a monzuny.",
    th: "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e40\u0e1b\u0e47\u0e19\u0e04\u0e48\u0e32\u0e1b\u0e23\u0e30\u0e21\u0e32\u0e13 \u0e2a\u0e20\u0e32\u0e1e\u0e08\u0e23\u0e34\u0e07\u0e02\u0e36\u0e49\u0e19\u0e2d\u0e22\u0e39\u0e48\u0e01\u0e31\u0e1a\u0e25\u0e21 \u0e04\u0e27\u0e32\u0e21\u0e01\u0e14\u0e2d\u0e32\u0e01\u0e32\u0e28 \u0e41\u0e25\u0e30\u0e21\u0e23\u0e2a\u0e38\u0e21",
    zh: "\u6570\u636e\u4e3a\u8fd1\u4f3c\u503c\u3002\u5b9e\u9645\u60c5\u51b5\u53d7\u98ce\u529b\u3001\u6c14\u538b\u548c\u5b63\u98ce\u5f71\u54cd\u3002",
    ja: "\u30c7\u30fc\u30bf\u306f\u6982\u7b97\u3067\u3059\u3002\u5b9f\u969b\u306e\u72b6\u6cc1\u306f\u98a8\u3001\u6c17\u5727\u3001\u30e2\u30f3\u30b9\u30fc\u30f3\u306e\u5f71\u97ff\u3092\u53d7\u3051\u307e\u3059\u3002",
    ko: "\ub370\uc774\ud130\ub294 \uadfc\uc0ac\uce58\uc785\ub2c8\ub2e4. \uc2e4\uc81c \uc0c1\ud669\uc740 \ubc14\ub78c, \uae30\uc555, \ubaac\uc21c\uc758 \uc601\ud5a5\uc744 \ubc1b\uc2b5\ub2c8\ub2e4.",
    de: "Daten sind Sch\u00e4tzungen. Tats\u00e4chliche Bedingungen h\u00e4ngen von Wind, Druck und Monsun ab.",
    sv: "Data \u00e4r ungef\u00e4rliga. Faktiska f\u00f6rh\u00e5llanden p\u00e5verkas av vind, tryck och monsun.",
    nl: "Gegevens zijn bij benadering. Werkelijke omstandigheden worden be\u00efnvloed door wind, druk en moessons.",
    ru: "\u0414\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u0431\u043b\u0438\u0437\u0438\u0442\u0435\u043b\u044c\u043d\u044b. \u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0435 \u0443\u0441\u043b\u043e\u0432\u0438\u044f \u0437\u0430\u0432\u0438\u0441\u044f\u0442 \u043e\u0442 \u0432\u0435\u0442\u0440\u0430, \u0434\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0438 \u043c\u0443\u0441\u0441\u043e\u043d\u043e\u0432.",
    uk: "\u0414\u0430\u043d\u0456 \u043d\u0430\u0431\u043b\u0438\u0436\u0435\u043d\u0456. \u0420\u0435\u0430\u043b\u044c\u043d\u0456 \u0443\u043c\u043e\u0432\u0438 \u0437\u0430\u043b\u0435\u0436\u0430\u0442\u044c \u0432\u0456\u0434 \u0432\u0456\u0442\u0440\u0443, \u0442\u0438\u0441\u043a\u0443 \u0442\u0430 \u043c\u0443\u0441\u043e\u043d\u0456\u0432.",
    fr: "Donn\u00e9es approximatives. Conditions r\u00e9elles affect\u00e9es par le vent, la pression et les moussons.",
    es: "Datos aproximados. Condiciones reales afectadas por viento, presi\u00f3n y monzones.",
    it: "Dati approssimativi. Condizioni reali influenzate da vento, pressione e monsoni.",
  },
  "footer.source": {
    en: "Source: harmonic model", cs: "Zdroj: harmonick\u00fd model", th: "\u0e41\u0e2b\u0e25\u0e48\u0e07: \u0e42\u0e21\u0e40\u0e14\u0e25\u0e2e\u0e32\u0e23\u0e4c\u0e21\u0e2d\u0e19\u0e34\u0e01",
    zh: "\u6765\u6e90\uff1a\u8c10\u6ce2\u6a21\u578b", ja: "\u30bd\u30fc\u30b9\uff1a\u8abf\u548c\u30e2\u30c7\u30eb", ko: "\ucd9c\ucc98: \uc870\ud654 \ubaa8\ub378",
    de: "Quelle: Harmonisches Modell", sv: "K\u00e4lla: harmonisk modell", nl: "Bron: harmonisch model",
    ru: "\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a: \u0433\u0430\u0440\u043c\u043e\u043d\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c", uk: "\u0414\u0436\u0435\u0440\u0435\u043b\u043e: \u0433\u0430\u0440\u043c\u043e\u043d\u0456\u0447\u043d\u0430 \u043c\u043e\u0434\u0435\u043b\u044c",
    fr: "Source : mod\u00e8le harmonique", es: "Fuente: modelo arm\u00f3nico", it: "Fonte: modello armonico",
  },
  "footer.sourceApi": {
    en: "Source: Storm Glass API", cs: "Zdroj: Storm Glass API", th: "\u0e41\u0e2b\u0e25\u0e48\u0e07: Storm Glass API",
    zh: "\u6765\u6e90\uff1aStorm Glass API", ja: "\u30bd\u30fc\u30b9\uff1aStorm Glass API", ko: "\ucd9c\ucc98: Storm Glass API",
    de: "Quelle: Storm Glass API", sv: "K\u00e4lla: Storm Glass API", nl: "Bron: Storm Glass API",
    ru: "\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a: Storm Glass API", uk: "\u0414\u0436\u0435\u0440\u0435\u043b\u043e: Storm Glass API",
    fr: "Source : Storm Glass API", es: "Fuente: Storm Glass API", it: "Fonte: Storm Glass API",
  },

  // Beaches section
  "section.beaches": {
    en: "Beaches", cs: "Pl\u00e1\u017ee", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14",
    zh: "\u6d77\u6ee9", ja: "\u30d3\u30fc\u30c1", ko: "\ud574\ubcc0",
    de: "Str\u00e4nde", sv: "Str\u00e4nder", nl: "Stranden",
    ru: "\u041f\u043b\u044f\u0436\u0438", uk: "\u041f\u043b\u044f\u0436\u0456",
    fr: "Plages", es: "Playas", it: "Spiagge",
  },

  // Beach descriptions
  "beach.hua-hin-main": {
    en: "Main city beach, 5km long promenade", cs: "Hlavn\u00ed m\u011bstsk\u00e1 pl\u00e1\u017e, 5 km promen\u00e1da", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e2b\u0e25\u0e31\u0e01\u0e02\u0e2d\u0e07\u0e40\u0e21\u0e37\u0e2d\u0e07 5 \u0e01\u0e21.",
    zh: "\u4e3b\u57ce\u5e02\u6d77\u6ee9\uff0c5\u516c\u91cc\u957f\u6d77\u6ee8\u5927\u9053", ja: "\u30e1\u30a4\u30f3\u30b7\u30c6\u30a3\u30d3\u30fc\u30c1\u30015km\u306e\u904a\u6b69\u9053", ko: "\uc8fc\uc694 \ub3c4\uc2dc \ud574\ubcc0, 5km \uc0b0\ucc45\ub85c",
    de: "Hauptstadtstrand, 5 km Promenade", sv: "Huvudstrand, 5 km strandpromenad", nl: "Belangrijkste stadsstrand, 5 km boulevard",
    ru: "\u0413\u043b\u0430\u0432\u043d\u044b\u0439 \u0433\u043e\u0440\u043e\u0434\u0441\u043a\u043e\u0439 \u043f\u043b\u044f\u0436, 5 \u043a\u043c", uk: "\u0413\u043e\u043b\u043e\u0432\u043d\u0438\u0439 \u043c\u0456\u0441\u044c\u043a\u0438\u0439 \u043f\u043b\u044f\u0436, 5 \u043a\u043c",
    fr: "Plage principale, promenade de 5 km", es: "Playa principal, paseo de 5 km", it: "Spiaggia principale, lungomare di 5 km",
  },
  "beach.khao-takiab": {
    en: "Quieter beach by Monkey Mountain", cs: "Klidn\u011bj\u0161\u00ed pl\u00e1\u017e u Monkey Mountain", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e40\u0e07\u0e35\u0e22\u0e1a\u0e43\u0e01\u0e25\u0e49\u0e40\u0e02\u0e32\u0e15\u0e30\u0e40\u0e01\u0e35\u0e22\u0e1a",
    zh: "\u7334\u5c71\u65c1\u7684\u5b89\u9759\u6d77\u6ee9", ja: "\u30e2\u30f3\u30ad\u30fc\u30de\u30a6\u30f3\u30c6\u30f3\u8fd1\u304f\u306e\u9759\u304b\u306a\u30d3\u30fc\u30c1", ko: "\uc6d0\uc22d\uc774 \uc0b0 \uc606 \uc870\uc6a9\ud55c \ud574\ubcc0",
    de: "Ruhigerer Strand am Affenberg", sv: "Lugnare strand vid Monkey Mountain", nl: "Rustig strand bij Monkey Mountain",
    ru: "\u0422\u0438\u0445\u0438\u0439 \u043f\u043b\u044f\u0436 \u0443 \u041e\u0431\u0435\u0437\u044c\u044f\u043d\u044c\u0435\u0439 \u0433\u043e\u0440\u044b", uk: "\u0422\u0438\u0445\u0438\u0439 \u043f\u043b\u044f\u0436 \u0431\u0456\u043b\u044f \u041c\u0430\u0432\u043f\u0027\u044f\u0447\u043e\u0457 \u0433\u043e\u0440\u0438",
    fr: "Plage calme pr\u00e8s de Monkey Mountain", es: "Playa tranquila junto a Monkey Mountain", it: "Spiaggia tranquilla vicino a Monkey Mountain",
  },
  "beach.suan-son": {
    en: "Military beach with pine trees, few tourists", cs: "Vojensk\u00e1 pl\u00e1\u017e s borovicemi, m\u00e1lo turist\u016f", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e17\u0e2b\u0e32\u0e23 \u0e15\u0e49\u0e19\u0e2a\u0e19 \u0e19\u0e31\u0e01\u0e17\u0e48\u0e2d\u0e07\u0e40\u0e17\u0e35\u0e48\u0e22\u0e27\u0e19\u0e49\u0e2d\u0e22",
    zh: "\u677e\u6811\u73af\u7ed5\u7684\u519b\u4e8b\u6d77\u6ee9\uff0c\u6e38\u5ba2\u7a00\u5c11", ja: "\u677e\u6797\u306e\u8ecd\u4e8b\u30d3\u30fc\u30c1\u3001\u89b3\u5149\u5ba2\u5c11\u306a\u3081", ko: "\uc18c\ub098\ubb34\uac00 \uc788\ub294 \uad70\uc0ac \ud574\ubcc0, \uad00\uad11\uac1d \uc801\uc74c",
    de: "Milit\u00e4rstrand mit Kiefern, wenige Touristen", sv: "Milit\u00e4rstrand med tallar, f\u00e5 turister", nl: "Militair strand met pijnbomen, weinig toeristen",
    ru: "\u0412\u043e\u0435\u043d\u043d\u044b\u0439 \u043f\u043b\u044f\u0436 \u0441 \u0441\u043e\u0441\u043d\u0430\u043c\u0438, \u043c\u0430\u043b\u043e \u0442\u0443\u0440\u0438\u0441\u0442\u043e\u0432", uk: "\u0412\u0456\u0439\u0441\u044c\u043a\u043e\u0432\u0438\u0439 \u043f\u043b\u044f\u0436 \u0437 \u0441\u043e\u0441\u043d\u0430\u043c\u0438, \u043c\u0430\u043b\u043e \u0442\u0443\u0440\u0438\u0441\u0442\u0456\u0432",
    fr: "Plage militaire avec pins, peu de touristes", es: "Playa militar con pinos, pocos turistas", it: "Spiaggia militare con pini, pochi turisti",
  },
  "beach.khao-tao": {
    en: "Hidden gem, perfect for walks", cs: "Skryt\u00fd klenot, ide\u00e1ln\u00ed na proch\u00e1zky", th: "\u0e2d\u0e31\u0e0d\u0e21\u0e13\u0e35\u0e0b\u0e48\u0e2d\u0e19\u0e40\u0e23\u0e49\u0e19 \u0e40\u0e2b\u0e21\u0e32\u0e30\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e14\u0e34\u0e19\u0e40\u0e25\u0e48\u0e19",
    zh: "\u9690\u85cf\u7684\u5b9d\u77f3\uff0c\u9002\u5408\u6563\u6b65", ja: "\u96a0\u308c\u305f\u540d\u6240\u3001\u6563\u6b69\u306b\u6700\u9069", ko: "\uc228\uc740 \ubcf4\uc11d, \uc0b0\ucc45\uc5d0 \uc644\ubcbd",
    de: "Geheimtipp, ideal zum Spazieren", sv: "Dold p\u00e4rla, perfekt f\u00f6r promenader", nl: "Verborgen parel, perfect om te wandelen",
    ru: "\u0421\u043a\u0440\u044b\u0442\u0430\u044f \u0436\u0435\u043c\u0447\u0443\u0436\u0438\u043d\u0430, \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u043f\u0440\u043e\u0433\u0443\u043b\u043e\u043a", uk: "\u041f\u0440\u0438\u0445\u043e\u0432\u0430\u043d\u0430 \u043f\u0435\u0440\u043b\u0438\u043d\u0430, \u0456\u0434\u0435\u0430\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u043f\u0440\u043e\u0433\u0443\u043b\u044f\u043d\u043e\u043a",
    fr: "Perle cach\u00e9e, id\u00e9ale pour se promener", es: "Joya escondida, ideal para caminar", it: "Gioiello nascosto, perfetto per passeggiate",
  },
  "beach.cha-am": {
    en: "Wide beach 20 min north of Hua Hin", cs: "\u0160irok\u00e1 pl\u00e1\u017e 20 min severn\u011b od Hua Hinu", th: "\u0e0a\u0e32\u0e22\u0e2b\u0e32\u0e14\u0e01\u0e27\u0e49\u0e32\u0e07 20 \u0e19\u0e32\u0e17\u0e35\u0e17\u0e32\u0e07\u0e40\u0e2b\u0e19\u0e37\u0e2d\u0e2b\u0e31\u0e27\u0e2b\u0e34\u0e19",
    zh: "\u534e\u6b23\u4ee5\u531720\u5206\u949f\u7684\u5bbd\u9614\u6d77\u6ee9", ja: "\u30db\u30a2\u30d2\u30f3\u306e\u531720\u5206\u3001\u5e83\u3044\u30d3\u30fc\u30c1", ko: "\ud6c4\uc544\ud78c \ubd81\ucabd 20\ubd84 \uac70\ub9ac\uc758 \ub113\uc740 \ud574\ubcc0",
    de: "Breiter Strand, 20 Min. n\u00f6rdlich von Hua Hin", sv: "Bred strand 20 min norr om Hua Hin", nl: "Breed strand 20 min ten noorden van Hua Hin",
    ru: "\u0428\u0438\u0440\u043e\u043a\u0438\u0439 \u043f\u043b\u044f\u0436 \u0432 20 \u043c\u0438\u043d. \u043a \u0441\u0435\u0432\u0435\u0440\u0443 \u043e\u0442 \u0425\u0443\u0430 \u0425\u0438\u043d\u0430", uk: "\u0428\u0438\u0440\u043e\u043a\u0438\u0439 \u043f\u043b\u044f\u0436 \u0437\u0430 20 \u0445\u0432. \u043d\u0430 \u043f\u0456\u0432\u043d\u0456\u0447 \u0432\u0456\u0434 \u0425\u0443\u0430 \u0425\u0456\u043d\u0430",
    fr: "Large plage \u00e0 20 min au nord de Hua Hin", es: "Playa amplia, 20 min al norte de Hua Hin", it: "Spiaggia ampia, 20 min a nord di Hua Hin",
  },
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
  return "en";
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

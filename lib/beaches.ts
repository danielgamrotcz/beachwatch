import { Beach } from "./types";

export const BEACHES: Beach[] = [
  {
    id: "hua-hin-main",
    name: "Hua Hin Beach",
    nameTh: "\u0e2b\u0e32\u0e14\u0e2b\u0e31\u0e27\u0e2b\u0e34\u0e19",
    description: {
      en: "Main city beach, 5km long promenade",
      cs: "Hlavn\u00ed m\u011bstsk\u00e1 pl\u00e1\u017e, 5 km dlouh\u00e1 promen\u00e1da",
    },
    coordinates: { lat: 12.5684, lng: 99.9577 },
    properties: {
      beachWidthMax: 45,
      criticalHeight: 1.7,
      narrowHeight: 1.3,
      surface: "sand",
      difficulty: "easy",
    },
    icon: "\ud83c\udfd6\ufe0f",
    googleMapsUrl: "https://maps.google.com/?q=12.5684,99.9577",
  },
  {
    id: "khao-takiab",
    name: "Khao Takiab Beach",
    nameTh: "\u0e2b\u0e32\u0e14\u0e40\u0e02\u0e32\u0e15\u0e30\u0e40\u0e01\u0e35\u0e22\u0e1a",
    description: {
      en: "Quieter beach by Monkey Mountain",
      cs: "Klidn\u011bj\u0161\u00ed pl\u00e1\u017e u Monkey Mountain",
    },
    coordinates: { lat: 12.5234, lng: 99.9667 },
    properties: {
      beachWidthMax: 35,
      criticalHeight: 1.6,
      narrowHeight: 1.2,
      surface: "sand",
      difficulty: "easy",
    },
    icon: "\ud83d\udc12",
    googleMapsUrl: "https://maps.google.com/?q=12.5234,99.9667",
  },
  {
    id: "suan-son",
    name: "Suan Son Pradipat",
    nameTh: "\u0e2a\u0e27\u0e19\u0e2a\u0e19\u0e1b\u0e23\u0e30\u0e14\u0e34\u0e1e\u0e31\u0e17\u0e18\u0e4c",
    description: {
      en: "Military beach with pine trees, few tourists",
      cs: "Vojensk\u00e1 pl\u00e1\u017e s borovicemi, m\u00e1lo turist\u016f",
    },
    coordinates: { lat: 12.6012, lng: 99.9734 },
    properties: {
      beachWidthMax: 55,
      criticalHeight: 1.8,
      narrowHeight: 1.4,
      surface: "sand",
      difficulty: "easy",
    },
    icon: "\ud83c\udf32",
    googleMapsUrl: "https://maps.google.com/?q=12.6012,99.9734",
  },
  {
    id: "khao-tao",
    name: "Khao Tao Beach",
    nameTh: "\u0e2b\u0e32\u0e14\u0e40\u0e02\u0e32\u0e40\u0e15\u0e48\u0e32",
    description: {
      en: "Hidden gem, perfect for walks",
      cs: "Skryt\u00fd klenot, ide\u00e1ln\u00ed na proch\u00e1zky",
    },
    coordinates: { lat: 12.4789, lng: 99.9712 },
    properties: {
      beachWidthMax: 60,
      criticalHeight: 1.9,
      narrowHeight: 1.5,
      surface: "sand",
      difficulty: "moderate",
    },
    icon: "\ud83d\udc22",
    googleMapsUrl: "https://maps.google.com/?q=12.4789,99.9712",
  },
  {
    id: "cha-am",
    name: "Cha-Am Beach",
    nameTh: "\u0e2b\u0e32\u0e14\u0e0a\u0e30\u0e2d\u0e33",
    description: {
      en: "Wide beach 20 min north of Hua Hin",
      cs: "\u0160irok\u00e1 pl\u00e1\u017e 20 min severn\u011b od Hua Hinu",
    },
    coordinates: { lat: 12.7967, lng: 99.9678 },
    properties: {
      beachWidthMax: 70,
      criticalHeight: 2.0,
      narrowHeight: 1.6,
      surface: "sand",
      difficulty: "easy",
    },
    icon: "\ud83c\udf0a",
    googleMapsUrl: "https://maps.google.com/?q=12.7967,99.9678",
  },
];

// Reference point for Storm Glass API — center of Hua Hin area
// All beaches are within 40km, same tidal station
export const TIDE_REFERENCE_POINT = { lat: 12.5684, lng: 99.9577 };

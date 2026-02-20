import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beach Watch \u2014 Hua Hin Tide Monitor",
    short_name: "Beach Watch",
    description: "Real-time beach walkability for Hua Hin, Thailand",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F7",
    theme_color: "#007AFF",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

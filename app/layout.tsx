import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beach Watch \u2014 Hua Hin Tide Monitor",
  description:
    "Real-time beach walkability for Hua Hin, Thailand. Check if the beach is open, flooded, or walkable right now.",
  openGraph: {
    title: "Beach Watch \u2014 Hua Hin",
    description:
      "Is the beach walkable right now? Check real-time tide status.",
    type: "website",
    siteName: "Beach Watch",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}

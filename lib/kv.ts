import { getCloudflareContext } from "@opennextjs/cloudflare";
import { TideData } from "./types";

const CACHE_KEY = "tide:hua-hin";
const TTL_SECONDS = 12 * 60 * 60; // 12h TTL (refresh happens every 6h)
const STALE_MS = 6 * 60 * 60 * 1000; // 6h — after this, data is refreshed

export async function getCachedTide(): Promise<TideData | null> {
  try {
    const { env } = getCloudflareContext();
    if (!env.TIDE_CACHE) return null;
    return await env.TIDE_CACHE.get<TideData>(CACHE_KEY, "json");
  } catch {
    return null;
  }
}

export async function setCachedTide(data: TideData): Promise<void> {
  try {
    const { env } = getCloudflareContext();
    if (!env.TIDE_CACHE) return;
    await env.TIDE_CACHE.put(CACHE_KEY, JSON.stringify(data), {
      expirationTtl: TTL_SECONDS,
    });
  } catch {
    // Silent fail — harmonic fallback handles it
  }
}

export function isTideDataStale(data: TideData): boolean {
  const age = Date.now() - new Date(data.fetchedAt).getTime();
  return age > STALE_MS;
}

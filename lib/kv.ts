import { getCloudflareContext } from "@opennextjs/cloudflare";
import { TideData } from "./types";

const CACHE_KEY = "tide:hua-hin";
const TTL_SECONDS = 7 * 60 * 60; // 7 hours (cron runs every 6h)

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

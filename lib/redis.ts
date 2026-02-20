import { Redis } from "@upstash/redis";
import { TideData } from "./types";

function getClient(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const CACHE_KEY = "tide:hua-hin";
const TTL_SECONDS = 7 * 60 * 60; // 7 hours (cron runs every 6h)

export async function getCachedTide(): Promise<TideData | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.get<TideData>(CACHE_KEY);
    return data;
  } catch {
    return null;
  }
}

export async function setCachedTide(data: TideData): Promise<void> {
  const client = getClient();
  if (!client) return;

  try {
    await client.set(CACHE_KEY, data, { ex: TTL_SECONDS });
  } catch {
    // Silent fail — harmonic fallback will handle it
  }
}

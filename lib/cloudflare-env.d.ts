declare global {
  interface CloudflareEnv {
    TIDE_CACHE: KVNamespace;
    STORMGLASS_API_KEY?: string;
    CRON_SECRET?: string;
  }
}

export {};

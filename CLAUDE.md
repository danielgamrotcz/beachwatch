# BeachWatch

Real-time tide monitoring for Hua Hin beaches. Answers: "Can I walk on the beach right now?"

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` + `@theme`)
- Cloudflare Workers via `@opennextjs/cloudflare`
- Cloudflare KV for tide data cache
- Storm Glass API for tide data
- Harmonic model as offline fallback

## Commands
```bash
npm run dev          # Next.js dev server (with CF bindings proxy)
npm run build        # Next.js production build
npm run build:cf     # OpenNext Cloudflare build
npm run preview      # Build + local Wrangler preview
npm run deploy       # Build + deploy to Cloudflare Workers
npm run lint         # ESLint
npx tsc --noEmit     # Explicit type check
```

## Environment Variables (Cloudflare secrets)
```
STORMGLASS_API_KEY    — Storm Glass API key
CRON_SECRET           — Secret for cron endpoint auth
```

## Cloudflare Bindings (wrangler.jsonc)
```
TIDE_CACHE            — KV namespace for tide data cache
```

## Architecture
- `lib/` — data layer (types, beaches, tide-status, stormglass, kv, harmonic model, i18n)
- `components/` — UI components (Header, BeachCard, TideChart, etc.)
- `app/api/` — API routes (tide data, cron refresh)
- `app/[beach]/` — per-beach detail pages

## Key Decisions
- Single Storm Glass fetch point for all 5 beaches (within 40km radius)
- Cron every 6h (wrangler.jsonc triggers) to stay within free tier
- Harmonic model fallback (M2, S2, K1, O1 constituents for Gulf of Thailand)
- No chart library — pure SVG tide chart
- No i18n library — simple key-value cs/en
- System dark mode only (prefers-color-scheme), no JS toggle
- CF KV instead of Upstash Redis — zero external dependencies

# BeachWatch

Real-time tide monitoring for Hua Hin beaches. Answers: "Can I walk on the beach right now?"

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` + `@theme`)
- @upstash/redis for caching (replaces deprecated Vercel KV)
- Storm Glass API for tide data
- Harmonic model as offline fallback
- Deploy target: Vercel

## Commands
```bash
npm run dev          # Dev server
npm run build        # Production build + type check
npm run lint         # ESLint
npx tsc --noEmit     # Explicit type check
```

## Environment Variables
```
STORMGLASS_API_KEY    — Storm Glass API key
UPSTASH_REDIS_REST_URL — Upstash Redis endpoint
UPSTASH_REDIS_REST_TOKEN — Upstash Redis token
CRON_SECRET           — Secret for cron endpoint auth
```

## Architecture
- `lib/` — data layer (types, beaches, tide-status, stormglass, redis, harmonic model, i18n)
- `components/` — UI components (Header, BeachCard, TideChart, etc.)
- `app/api/` — API routes (tide data, cron refresh)
- `app/[beach]/` — per-beach detail pages

## Key Decisions
- Single Storm Glass fetch point for all 5 beaches (within 40km radius)
- Cron every 6h (4 calls/day = 8 API calls) to stay within free tier
- Harmonic model fallback (M2, S2, K1, O1 constituents for Gulf of Thailand)
- No chart library — pure SVG tide chart
- No i18n library — simple key-value cs/en
- System dark mode only (prefers-color-scheme), no JS toggle

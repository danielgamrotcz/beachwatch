/**
 * Post-build script: injects a `scheduled` handler into the OpenNext worker
 * so Cloudflare cron triggers can call /api/cron/refresh via self-reference.
 */
const fs = require("fs");
const path = require("path");

const workerPath = path.resolve(__dirname, "../.open-next/worker.js");
const src = fs.readFileSync(workerPath, "utf8");

if (src.includes("async scheduled(")) {
  console.log("Worker already has scheduled handler, skipping patch.");
  process.exit(0);
}

// Insert scheduled handler before the closing `};` of the default export
const patched = src.replace(
  /,?\n};\s*$/,
  `,
    async scheduled(event, env, ctx) {
        const url = env.NEXT_PUBLIC_SITE_URL || "http://localhost";
        const secret = env.CRON_SECRET || "";
        const headers = secret ? { Authorization: "Bearer " + secret } : {};
        const res = await env.WORKER_SELF_REFERENCE.fetch(
            new Request(url + "/api/cron/refresh", { headers })
        );
        if (!res.ok) {
            console.error("Cron refresh failed:", res.status, await res.text());
        }
    },
};
`
);

fs.writeFileSync(workerPath, patched, "utf8");
console.log("Patched worker.js with scheduled handler.");

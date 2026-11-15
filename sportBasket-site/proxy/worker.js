// Optional Cloudflare Worker proxy for sportBasket.
// Keeps your API-Sports key off your phone and adds the CORS headers browsers need.
// Settings → Variables and Secrets: add a Secret named API_KEY (your key).
// Optional: add a variable ALLOW_ORIGIN set to your site, e.g. https://sportbasket.pages.dev
export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Expose-Headers": "x-ratelimit-requests-remaining, x-ratelimit-requests-limit",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const u = new URL(req.url);
    if (!/^\/(games|odds|status)$/.test(u.pathname)) return new Response("Not found", { status: 404, headers: cors });
    const r = await fetch("https://v1.basketball.api-sports.io" + u.pathname + u.search, {
      headers: { "x-apisports-key": env.API_KEY },
    });
    const h = new Headers(cors);
    h.set("content-type", "application/json");
    for (const k of ["x-ratelimit-requests-remaining", "x-ratelimit-requests-limit"]) {
      const v = r.headers.get(k); if (v) h.set(k, v);
    }
    return new Response(r.body, { status: r.status, headers: h });
  },
};

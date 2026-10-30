/* Kamei Game Console (web) — adds the "cross-origin isolation" headers GitHub Pages can't set,
   so PSP and DOS (which need several CPU threads) can run in the browser. Nothing is cached here. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.cache === "only-if-cached" && req.mode !== "same-origin") return;
  if (new URL(req.url).origin !== self.location.origin) return;   // other sites: untouched
  e.respondWith((async () => {
    const res = await fetch(req);
    if (res.status === 0 || res.type === "opaque") return res;
    const h = new Headers(res.headers);
    h.set("Cross-Origin-Opener-Policy", "same-origin");
    h.set("Cross-Origin-Embedder-Policy", "credentialless");
    h.set("Cross-Origin-Resource-Policy", "same-origin");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  })());
});

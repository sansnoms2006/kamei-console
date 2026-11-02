/* Kamei Game Console — "Kamei TV" tab: the Kamei Production lives (Twitch), with a "live now" notification */
(function () {
  Object.assign(I18N.fr, {
    navTV: "TV", tvTitle: "Kamei TV", tvLive: "🔴 EN DIRECT", tvOff: "⚫ Hors ligne", tvSoon: "Kamei TV arrive bientôt ! Les lives de Kamei Production seront ici, en direct dans l'appli.",
    tvNext: (x) => `📅 Prochain live : ${x}`, tvChat: "💬 Chat du live", tvOpen: "↗ Ouvrir sur Twitch", tvLiveNow: "Kamei est en live ! Viens regarder 🔴",
    tvAdmin: "🛠️ Réglages Kamei TV (toi seul)", tvChannel: "Nom de ta chaîne Twitch (ex. kameiprod)", tvNextPh: "Prochain live (ex. vendredi 20h)", tvTitlePh: "Titre du live (optionnel)",
    tvSave: "Enregistrer", tvGoLive: "🔴 Je lance mon live", tvStop: "⏹️ Fin du live", tvStyle: "Rendu de la TV", tvStyles: { crt: "📺 TV bombée (rétro)", flat: "🖥️ TV écran plat", none: "▭ Sans cadre" }, tvOffScreen: "Pas de live pour l'instant", tvSaved: "Kamei TV mis à jour", tvNotified: "C'est parti ! Tout le monde est prévenu 🔴",
  });
  Object.assign(I18N.nl, {
    navTV: "TV", tvTitle: "Kamei TV", tvLive: "🔴 LIVE", tvOff: "⚫ Offline", tvSoon: "Kamei TV komt eraan! De livestreams van Kamei Production komen hier, live in de app.",
    tvNext: (x) => `📅 Volgende live: ${x}`, tvChat: "💬 Livechat", tvOpen: "↗ Openen op Twitch", tvLiveNow: "Kamei is live! Kom kijken 🔴",
    tvAdmin: "🛠️ Kamei TV-instellingen (alleen jij)", tvChannel: "Naam van je Twitch-kanaal (bv. kameiprod)", tvNextPh: "Volgende live (bv. vrijdag 20u)", tvTitlePh: "Titel van de live (optioneel)",
    tvSave: "Opslaan", tvGoLive: "🔴 Ik ga live", tvStop: "⏹️ Live stoppen", tvStyle: "Weergave van de tv", tvStyles: { crt: "📺 Bolle tv (retro)", flat: "🖥️ Platte tv", none: "▭ Zonder kader" }, tvOffScreen: "Nu geen live", tvSaved: "Kamei TV bijgewerkt", tvNotified: "Daar gaan we! Iedereen is verwittigd 🔴",
  });
  Object.assign(I18N.en, {
    navTV: "TV", tvTitle: "Kamei TV", tvLive: "🔴 LIVE", tvOff: "⚫ Offline", tvSoon: "Kamei TV is coming soon! Kamei Production's lives will be here, live in the app.",
    tvNext: (x) => `📅 Next live: ${x}`, tvChat: "💬 Live chat", tvOpen: "↗ Open on Twitch", tvLiveNow: "Kamei is live! Come watch 🔴",
    tvAdmin: "🛠️ Kamei TV settings (only you)", tvChannel: "Your Twitch channel name (e.g. kameiprod)", tvNextPh: "Next live (e.g. Friday 8pm)", tvTitlePh: "Live title (optional)",
    tvSave: "Save", tvGoLive: "🔴 I'm going live", tvStop: "⏹️ End the live", tvStyle: "TV look", tvStyles: { crt: "📺 Curved CRT TV (retro)", flat: "🖥️ Flat-screen TV", none: "▭ No frame" }, tvOffScreen: "No live right now", tvSaved: "Kamei TV updated", tvNotified: "Here we go! Everyone has been told 🔴",
  });
  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const st = document.createElement("style");
  st.textContent = `.tvhead { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
    .tvchip { font: 800 12px Inter, sans-serif; padding: 5px 10px; border-radius: 10px; background: #23233a; color: var(--muted); }
    .tvchip.live { background: #dc2626; color: #fff; animation: tvpulse 1.6s infinite; }
    @keyframes tvpulse { 50% { box-shadow: 0 0 0 6px rgba(220,38,38,.25); } }
    .tvframe { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; background: #000; border: 1.5px solid color-mix(in srgb, var(--tacc, #8fc63f) 40%, transparent); }
    .tvframe iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
    .tvchat { width: 100%; height: 420px; border: 0; border-radius: 16px; margin-top: 10px; background: #18181b; }
    .tvsoon { text-align: center; padding: 18px 10px; border-radius: 18px; background: radial-gradient(100% 80% at 50% 0%, color-mix(in srgb, var(--tacc, #8fc63f) 25%, transparent), transparent 70%) rgba(255,255,255,.03); }
    .tvsoon svg { width: 150px; height: 230px; }
    .tvbtns { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
    .tvbtns button { flex: 1; min-width: 140px; border: 0; border-radius: 12px; padding: 11px; font: 700 13px Inter, sans-serif; background: #23233a; color: var(--text); }
    .tvadm { margin-top: 18px; padding: 12px; border-radius: 16px; background: rgba(255,255,255,.04); }
    .tvadm input { width: 100%; padding: 11px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg); color: var(--text); font: inherit; margin-bottom: 8px; }
    .tvadm select { width: 100%; padding: 11px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg); color: var(--text); font: inherit; margin-bottom: 8px; }
    /* ---------- the TV set ---------- */
    .tvset { position: relative; margin: 6px auto 0; }
    .tvset .scr { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; background: #000; }
    .tvset .scr iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
    .tvset .scr .off { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; padding: 10%; color: rgba(255,255,255,.28);
      background: radial-gradient(120% 90% at 50% 45%, #1a1e24 0%, #0b0d10 60%, #030405 100%); font: 700 13px Inter, sans-serif; line-height: 1.5; }
    .tvset .scr .off b { display: block; font: 400 11px "Press Start 2P", monospace; letter-spacing: 1px; margin-bottom: 8px; color: rgba(255,255,255,.22); }
    .tvset .glare { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(130deg, rgba(255,255,255,.13) 0%, rgba(255,255,255,.03) 28%, transparent 45%); }
    .tvset .led { width: 7px; height: 7px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .tvset.on .led { background: #4ade80; box-shadow: 0 0 8px #4ade80; }
    .tvset.on .scr .live { animation: tvOn .55s cubic-bezier(.2,.8,.3,1) both; }
    @keyframes tvOn { 0% { transform: scale(1, .004); filter: brightness(6); } 45% { transform: scale(1, .004); filter: brightness(6); } 75% { transform: scale(1, 1); filter: brightness(2); } 100% { transform: none; filter: none; } }
    /* curved CRT */
    .tvset.crt { isolation: isolate; max-width: 640px; padding: 16px 16px 0; border-radius: 30px; background: linear-gradient(160deg, #4a3526, #2d1f15 60%, #22170f); box-shadow: 0 18px 40px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.12), inset 0 -3px 0 rgba(0,0,0,.4); margin-top: 34px; }
    .tvset.crt::before, .tvset.crt::after { content: ""; position: absolute; top: -32px; left: 50%; width: 3px; height: 40px; background: linear-gradient(#cfd4da, #7a8089); border-radius: 2px; transform-origin: bottom; z-index: -1; box-shadow: 0 -2px 0 2px #9aa1aa; }
    .tvset.crt::before { transform: translateX(-12px) rotate(-28deg); } .tvset.crt::after { transform: translateX(10px) rotate(30deg); }
    .tvset.crt .bezel { padding: 12px; border-radius: 26px; background: linear-gradient(#1b1b1d, #0d0d0f); box-shadow: inset 0 0 0 2px #000, inset 0 6px 14px rgba(0,0,0,.7); }
    .tvset.crt .scr { border-radius: 9% / 13%; box-shadow: inset 0 0 40px rgba(0,0,0,.85); }
    .tvset.crt .scr::after { content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
      background: repeating-linear-gradient(0deg, rgba(0,0,0,.16) 0 1px, transparent 1px 3px), radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%); }
    .tvset.crt .glare { border-radius: 9% / 13%; }
    .tvset.crt .panel { display: flex; align-items: center; gap: 12px; padding: 10px 6px 12px; }
    .tvset.crt .brand { font: 400 10px "Press Start 2P", monospace; color: #d9c7a8; letter-spacing: 2px; text-shadow: 0 1px 0 #000; }
    .tvset.crt .grill { flex: 1; height: 18px; border-radius: 4px; background: repeating-linear-gradient(90deg, #1a120c 0 3px, #3a2a1d 3px 6px); }
    .tvset.crt .knob { width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #e7e1d6, #8a8378 70%, #4c463e); box-shadow: 0 2px 3px rgba(0,0,0,.6); position: relative; }
    .tvset.crt .knob::after { content: ""; position: absolute; left: 50%; top: 3px; width: 2px; height: 7px; margin-left: -1px; background: #3b352e; border-radius: 1px; }
    .tvset.crt .feet { display: flex; justify-content: space-between; padding: 0 40px; height: 10px; } .tvset.crt .feet i { width: 34px; height: 10px; background: #1a120c; border-radius: 0 0 6px 6px; }
    /* flat TV */
    .tvset.flat { max-width: 720px; }
    .tvset.flat .bezel { padding: 8px 8px 16px; border-radius: 12px; background: linear-gradient(#2a2d33, #121418); box-shadow: 0 14px 30px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08); position: relative; }
    .tvset.flat .scr { border-radius: 4px; }
    .tvset.flat .panel { position: absolute; left: 0; right: 0; bottom: 3px; display: flex; justify-content: center; align-items: center; gap: 8px; }
    .tvset.flat .brand { font: 400 6px "Press Start 2P", monospace; color: #7d8590; letter-spacing: 2px; }
    .tvset.flat .led { position: absolute; right: 14px; width: 5px; height: 5px; }
    .tvstand { width: 34%; height: 22px; margin: 0 auto; background: linear-gradient(#1c1f24, #0e1013); clip-path: polygon(38% 0, 62% 0, 100% 100%, 0 100%); }
    /* no frame */
    .tvset.none .scr { border-radius: 16px; border: 1.5px solid color-mix(in srgb, var(--tacc, #8fc63f) 40%, transparent); }
    .tvset.none .panel, .tvset.none .glare { display: none; }
    .tvadm .go { background: #dc2626 !important; color: #fff !important; }`;
  document.head.appendChild(st);

  let cfg = null, chatOn = false;
  async function fetchCfg() {
    if (!sb) return null;
    const r = await sb.from("app_config").select("twitch,tv_live,tv_live_at,tv_title,tv_next,features").eq("id", 1).maybeSingle();
    return r.error ? null : r.data;
  }
  const openUrl = (u) => { try { window.KameiNative ? window.KameiNative.openUrl(u) : window.open(u, "_blank"); } catch (e) {} };
  async function render(v) {
    const c = (await fetchCfg()) || cfg || {};
    cfg = c;
    const host = location.hostname || "localhost", tw = (c.twitch || "").trim().toLowerCase();
    const live = !!c.tv_live;
    let body;
    const style = ((c.features || {}).tv_style) || "crt";
    if (tw) {
      // no live = the TV is switched off (nothing is loaded); live = it switches on and the stream starts by itself
      const screen = live ? `<div class="live" style="position:absolute;inset:0"><iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(tw)}&parent=${encodeURIComponent(host)}&autoplay=true&muted=false"
          allow="autoplay; fullscreen; picture-in-picture" allowfullscreen credentialless></iframe></div>`
        : `<div class="off"><div><b>KAMEI TV</b>${esc(t("tvOffScreen"))}${c.tv_next ? `<br>${esc(t("tvNext", c.tv_next))}` : ""}</div></div>`;
      const panel = style === "crt" ? `<div class="panel"><span class="brand">KAMEI</span><span class="grill"></span><span class="led"></span><span class="knob"></span><span class="knob" style="transform:rotate(70deg)"></span></div>`
        : style === "flat" ? `<div class="panel"><span class="brand">KAMEI</span><span class="led"></span></div>` : "";
      body = `<div class="tvset ${style} ${live ? "on" : ""}"><div class="bezel"><div class="scr">${screen}${live ? "" : `<div class="glare"></div>`}</div>${style === "flat" ? panel : ""}</div>
          ${style === "crt" ? panel + `<div class="feet"><i></i><i></i></div>` : ""}</div>${style === "flat" ? `<div class="tvstand"></div>` : ""}
        <div class="tvbtns"><button id="tvChatB">${t("tvChat")}</button><button id="tvOpenB">${t("tvOpen")}</button></div>
        ${chatOn ? `<iframe class="tvchat" src="https://www.twitch.tv/embed/${encodeURIComponent(tw)}/chat?parent=${encodeURIComponent(host)}&darkpopout" credentialless></iframe>` : ""}`;
    } else {
      body = `<div class="tvsoon"><svg viewBox="0 -70 240 526"><use href="#kFull" x="0" y="0" width="240" height="456"/></svg><p>${t("tvSoon")}</p></div>`;
    }
    v.innerHTML = `<h2>${t("tvTitle")}</h2>
      <div class="tvhead"><span class="tvchip ${live ? "live" : ""}">${live ? t("tvLive") : t("tvOff")}</span>${live && c.tv_title ? `<b>${esc(c.tv_title)}</b>` : ""}</div>
      ${!live && c.tv_next ? `<p class="hint" style="font-size:14px">${esc(t("tvNext", c.tv_next))}</p>` : ""}
      ${body}
      ${me() && me().is_admin ? `<div class="tvadm"><h4 style="margin-top:0">${t("tvAdmin")}</h4>
        <input id="tvCh" placeholder="${t("tvChannel")}" value="${esc(c.twitch || "")}" autocapitalize="none">
        <input id="tvNx" placeholder="${t("tvNextPh")}" value="${esc(c.tv_next || "")}" maxlength="80">
        <input id="tvTi" placeholder="${t("tvTitlePh")}" value="${esc(c.tv_title || "")}" maxlength="100">
        <label class="hint" style="display:block;margin:2px 0 4px">${t("tvStyle")}</label><select id="tvSt">${Object.entries(t("tvStyles")).map(([k, lb]) => `<option value="${k}" ${k === style ? "selected" : ""}>${lb}</option>`).join("")}</select>
        <div class="tvbtns"><button id="tvSave">${t("tvSave")}</button>${live ? `<button id="tvStop">${t("tvStop")}</button>` : `<button class="go" id="tvGo">${t("tvGoLive")}</button>`}</div></div>` : ""}`;
    const $v = (id) => v.querySelector("#" + id);
    if ($v("tvChatB")) $v("tvChatB").onclick = () => { chatOn = !chatOn; render(v); };
    if ($v("tvOpenB")) $v("tvOpenB").onclick = () => openUrl("https://twitch.tv/" + tw);
    const save = async (extra) => {
      const patch = Object.assign({ twitch: $v("tvCh").value.trim().replace(/^https?:\/\/(www\.)?twitch\.tv\//i, "").replace(/\/.*$/, "") || null,
        tv_next: $v("tvNx").value.trim() || null, tv_title: $v("tvTi").value.trim() || null,
        features: Object.assign({}, c.features || {}, { tv_style: $v("tvSt").value }) }, extra || {});
      const r = await sb.from("app_config").update(patch).eq("id", 1);
      if (r.error) return toast(r.error.message, 4000);
      toast(extra && extra.tv_live ? t("tvNotified") : t("tvSaved"), 4000);
      render(v); poll();
    };
    if ($v("tvSave")) $v("tvSave").onclick = () => save();
    if ($v("tvSt")) $v("tvSt").onchange = () => save();
    if ($v("tvGo")) $v("tvGo").onclick = () => save({ tv_live: true, tv_live_at: new Date().toISOString() });
    if ($v("tvStop")) $v("tvStop").onclick = () => save({ tv_live: false });
  }

  /* "Kamei is live" notification while the app is open (closed app: Android check every ~15 min) */
  // the Twitch live is detected by itself (live started in OBS → Kamei TV goes live, the player starts on its own)
  let lastCheck = 0;
  async function detect(c) {
    if (!c || !c.twitch || Date.now() - lastCheck < 50000 || !me()) return false;
    lastCheck = Date.now();
    try {
      const r = await sb.functions.invoke("kamei-discord", { body: { action: "tv" } });
      return !!(r.data && r.data.auto && r.data.live !== !!c.tv_live);
    } catch (e) { return false; }
  }
  async function poll() {
    let c = await fetchCfg(); if (!c) return;
    const wasLive = !!(cfg && cfg.tv_live);
    if (await detect(c)) c = (await fetchCfg()) || c;
    if (!!c.tv_live !== wasLive && window.kameiNav && window.kameiNav.current && window.kameiNav.current() === "tv") { cfg = c; window.kameiNav.rerender(); }
    cfg = c;
    let seen = null; try { seen = localStorage.getItem("kamei-tv-seen"); } catch (e) {}
    const mark = (v) => { try { localStorage.setItem("kamei-tv-seen", v); } catch (e) {} };
    if (seen === null) mark(c.tv_live && c.tv_live_at ? c.tv_live_at : "none");          // first launch: no old news
    else if (c.tv_live && c.tv_live_at && c.tv_live_at !== seen) {
      mark(c.tv_live_at);
      if (!(me() && me().is_admin) && window.kameiNotify) window.kameiNotify("📺 Kamei TV", c.tv_title || t("tvLiveNow"), () => window.kameiNav && window.kameiNav.go("tv"));
    }
    if (window.kameiNav) window.kameiNav.refresh();
  }
  setTimeout(poll, 7000);
  setInterval(() => { if (document.visibilityState === "visible") poll(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") poll(); });

  window.kameiTV = { render, poll, badge: () => (cfg && cfg.tv_live ? "LIVE" : "") };
})();

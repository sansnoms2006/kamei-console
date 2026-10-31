/* Kamei Game Console — "Kamei TV" tab: the Kamei Production lives (Twitch), with a "live now" notification */
(function () {
  Object.assign(I18N.fr, {
    navTV: "TV", tvTitle: "Kamei TV", tvLive: "🔴 EN DIRECT", tvOff: "⚫ Hors ligne", tvSoon: "Kamei TV arrive bientôt ! Les lives de Kamei Production seront ici, en direct dans l'appli.",
    tvNext: (x) => `📅 Prochain live : ${x}`, tvChat: "💬 Chat du live", tvOpen: "↗ Ouvrir sur Twitch", tvLiveNow: "Kamei est en live ! Viens regarder 🔴",
    tvAdmin: "🛠️ Réglages Kamei TV (toi seul)", tvChannel: "Nom de ta chaîne Twitch (ex. kameiprod)", tvNextPh: "Prochain live (ex. vendredi 20h)", tvTitlePh: "Titre du live (optionnel)",
    tvSave: "Enregistrer", tvGoLive: "🔴 Je lance mon live", tvStop: "⏹️ Fin du live", tvSaved: "Kamei TV mis à jour", tvNotified: "C'est parti ! Tout le monde est prévenu 🔴",
  });
  Object.assign(I18N.nl, {
    navTV: "TV", tvTitle: "Kamei TV", tvLive: "🔴 LIVE", tvOff: "⚫ Offline", tvSoon: "Kamei TV komt eraan! De livestreams van Kamei Production komen hier, live in de app.",
    tvNext: (x) => `📅 Volgende live: ${x}`, tvChat: "💬 Livechat", tvOpen: "↗ Openen op Twitch", tvLiveNow: "Kamei is live! Kom kijken 🔴",
    tvAdmin: "🛠️ Kamei TV-instellingen (alleen jij)", tvChannel: "Naam van je Twitch-kanaal (bv. kameiprod)", tvNextPh: "Volgende live (bv. vrijdag 20u)", tvTitlePh: "Titel van de live (optioneel)",
    tvSave: "Opslaan", tvGoLive: "🔴 Ik ga live", tvStop: "⏹️ Live stoppen", tvSaved: "Kamei TV bijgewerkt", tvNotified: "Daar gaan we! Iedereen is verwittigd 🔴",
  });
  Object.assign(I18N.en, {
    navTV: "TV", tvTitle: "Kamei TV", tvLive: "🔴 LIVE", tvOff: "⚫ Offline", tvSoon: "Kamei TV is coming soon! Kamei Production's lives will be here, live in the app.",
    tvNext: (x) => `📅 Next live: ${x}`, tvChat: "💬 Live chat", tvOpen: "↗ Open on Twitch", tvLiveNow: "Kamei is live! Come watch 🔴",
    tvAdmin: "🛠️ Kamei TV settings (only you)", tvChannel: "Your Twitch channel name (e.g. kameiprod)", tvNextPh: "Next live (e.g. Friday 8pm)", tvTitlePh: "Live title (optional)",
    tvSave: "Save", tvGoLive: "🔴 I'm going live", tvStop: "⏹️ End the live", tvSaved: "Kamei TV updated", tvNotified: "Here we go! Everyone has been told 🔴",
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
    .tvadm .go { background: #dc2626 !important; color: #fff !important; }`;
  document.head.appendChild(st);

  let cfg = null, chatOn = false;
  async function fetchCfg() {
    if (!sb) return null;
    const r = await sb.from("app_config").select("twitch,tv_live,tv_live_at,tv_title,tv_next").eq("id", 1).maybeSingle();
    return r.error ? null : r.data;
  }
  const openUrl = (u) => { try { window.KameiNative ? window.KameiNative.openUrl(u) : window.open(u, "_blank"); } catch (e) {} };
  async function render(v) {
    const c = (await fetchCfg()) || cfg || {};
    cfg = c;
    const host = location.hostname || "localhost", tw = (c.twitch || "").trim().toLowerCase();
    const live = !!c.tv_live;
    let body;
    if (tw) {
      body = `<div class="tvframe"><iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(tw)}&parent=${encodeURIComponent(host)}&autoplay=${live}&muted=false"
          allow="autoplay; fullscreen; picture-in-picture" allowfullscreen credentialless></iframe></div>
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
        <div class="tvbtns"><button id="tvSave">${t("tvSave")}</button>${live ? `<button id="tvStop">${t("tvStop")}</button>` : `<button class="go" id="tvGo">${t("tvGoLive")}</button>`}</div></div>` : ""}`;
    const $v = (id) => v.querySelector("#" + id);
    if ($v("tvChatB")) $v("tvChatB").onclick = () => { chatOn = !chatOn; render(v); };
    if ($v("tvOpenB")) $v("tvOpenB").onclick = () => openUrl("https://twitch.tv/" + tw);
    const save = async (extra) => {
      const patch = Object.assign({ twitch: $v("tvCh").value.trim().replace(/^https?:\/\/(www\.)?twitch\.tv\//i, "").replace(/\/.*$/, "") || null,
        tv_next: $v("tvNx").value.trim() || null, tv_title: $v("tvTi").value.trim() || null }, extra || {});
      const r = await sb.from("app_config").update(patch).eq("id", 1);
      if (r.error) return toast(r.error.message, 4000);
      toast(extra && extra.tv_live ? t("tvNotified") : t("tvSaved"), 4000);
      render(v); poll();
    };
    if ($v("tvSave")) $v("tvSave").onclick = () => save();
    if ($v("tvGo")) $v("tvGo").onclick = () => save({ tv_live: true, tv_live_at: new Date().toISOString() });
    if ($v("tvStop")) $v("tvStop").onclick = () => save({ tv_live: false });
  }

  /* "Kamei is live" notification while the app is open (closed app: Android check every ~15 min) */
  async function poll() {
    const c = await fetchCfg(); if (!c) return;
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

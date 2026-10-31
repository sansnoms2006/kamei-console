/* Kamei Game Console — admin tools: features on/off, dashboard, announcement, reports */
(function () {
  const FEATS = ["tv", "chat", "general", "sessions", "requests", "catalogue", "trades", "netplay", "watch", "profile", "pet"];
  Object.assign(I18N.fr, {
    adFeatures: "🎛️ Fonctions", adStats: "📊 Tableau de bord", adAnnounce: "📢 Annonce", adReports: "🚩 Signalements",
    adFeatHint: "Une fonction désactivée disparaît pour tout le monde… sauf pour toi (tu peux la préparer tranquille).", adSaved: "Enregistré ✅",
    adF: { tv: "📺 Kamei TV", chat: "💬 Chat entre amis", general: "🌍 Salon Général", sessions: "🕹️ Sessions", requests: "📨 Demandes de jeux", catalogue: "📚 Catalogue",
           trades: "🔁 Échanges Pokémon", netplay: "👥 Jouer ensemble", watch: "📺 Regarder un ami", profile: "🏅 Profils & badges", pet: "🦎 Kamei Tamagotchi" },
    adS: { users: "Joueurs", new7: "Nouveaux (7 j)", online: "En ligne", today: "Actifs aujourd'hui", playing: "En train de jouer", sessions7: "Parties (7 j)", minutes7: "Temps de jeu (7 j)",
           messages7: "Messages (7 j)", trades7: "Échanges (7 j)", requests: "Demandes en attente", reports: "Signalements ouverts" },
    adTopGames: "🎮 Jeux les plus joués (30 j)", adTopSys: "🕹️ Consoles les plus jouées (30 j)",
    adAnnHint: "Ton message s'affiche en haut de l'appli chez tout le monde, avec une notification.", adAnnPh: "Ex. : Nouveau jeu au catalogue ! 🎉", adAnnPub: "📢 Publier l'annonce", adAnnDel: "Retirer l'annonce",
    adNoReports: "Aucun signalement 👍", adBan: "🚫 Bannir", adDelMsg: "🗑️ Effacer le message", adDone: "✅ Traité", adSeeUser: "👤 Voir le compte", adBy: (p) => `signalé par ${p}`,
    adKind: { message: "Message privé", general: "Salon Général", user: "Joueur" },
  });
  Object.assign(I18N.nl, {
    adFeatures: "🎛️ Functies", adStats: "📊 Dashboard", adAnnounce: "📢 Aankondiging", adReports: "🚩 Meldingen",
    adFeatHint: "Een uitgeschakelde functie verdwijnt voor iedereen… behalve voor jou.", adSaved: "Opgeslagen ✅",
    adF: { tv: "📺 Kamei TV", chat: "💬 Chat met vrienden", general: "🌍 Algemene chat", sessions: "🕹️ Sessies", requests: "📨 Spelaanvragen", catalogue: "📚 Catalogus",
           trades: "🔁 Pokémon ruilen", netplay: "👥 Samen spelen", watch: "📺 Meekijken", profile: "🏅 Profielen & badges", pet: "🦎 Kamei Tamagotchi" },
    adS: { users: "Spelers", new7: "Nieuw (7 d)", online: "Online", today: "Actief vandaag", playing: "Aan het spelen", sessions7: "Sessies (7 d)", minutes7: "Speeltijd (7 d)",
           messages7: "Berichten (7 d)", trades7: "Ruilen (7 d)", requests: "Open aanvragen", reports: "Open meldingen" },
    adTopGames: "🎮 Meest gespeelde spellen (30 d)", adTopSys: "🕹️ Meest gespeelde consoles (30 d)",
    adAnnHint: "Je bericht verschijnt bovenaan de app bij iedereen, met een melding.", adAnnPh: "Bv.: Nieuw spel in de catalogus! 🎉", adAnnPub: "📢 Aankondiging publiceren", adAnnDel: "Aankondiging verwijderen",
    adNoReports: "Geen meldingen 👍", adBan: "🚫 Blokkeren", adDelMsg: "🗑️ Bericht wissen", adDone: "✅ Afgehandeld", adSeeUser: "👤 Account bekijken", adBy: (p) => `gemeld door ${p}`,
    adKind: { message: "Privébericht", general: "Algemene chat", user: "Speler" },
  });
  Object.assign(I18N.en, {
    adFeatures: "🎛️ Features", adStats: "📊 Dashboard", adAnnounce: "📢 Announcement", adReports: "🚩 Reports",
    adFeatHint: "A disabled feature disappears for everyone… except you (so you can prepare it).", adSaved: "Saved ✅",
    adF: { tv: "📺 Kamei TV", chat: "💬 Chat with friends", general: "🌍 General room", sessions: "🕹️ Sessions", requests: "📨 Game requests", catalogue: "📚 Catalogue",
           trades: "🔁 Pokémon trades", netplay: "👥 Play together", watch: "📺 Watch a friend", profile: "🏅 Profiles & badges", pet: "🦎 Kamei Tamagotchi" },
    adS: { users: "Players", new7: "New (7 d)", online: "Online", today: "Active today", playing: "Playing now", sessions7: "Sessions (7 d)", minutes7: "Play time (7 d)",
           messages7: "Messages (7 d)", trades7: "Trades (7 d)", requests: "Pending requests", reports: "Open reports" },
    adTopGames: "🎮 Most played games (30 d)", adTopSys: "🕹️ Most played consoles (30 d)",
    adAnnHint: "Your message shows at the top of the app for everyone, with a notification.", adAnnPh: "E.g.: New game in the catalogue! 🎉", adAnnPub: "📢 Publish", adAnnDel: "Remove the announcement",
    adNoReports: "No reports 👍", adBan: "🚫 Ban", adDelMsg: "🗑️ Delete the message", adDone: "✅ Done", adSeeUser: "👤 See account", adBy: (p) => `reported by ${p}`,
    adKind: { message: "Private message", general: "General room", user: "Player" },
  });
  const sb = window.kameiSB;
  const back = () => window.kameiAdminSheet && window.kameiAdminSheet();
  const backBtn = `<div class="btns" style="margin-top:12px"><button id="aBack">←</button></div>`;
  const wireBack = () => { const b = document.getElementById("aBack"); if (b) b.onclick = back; };

  async function features() {
    const c = window.kameiConfig ? window.kameiConfig() : {};
    const f = Object.assign({}, c.features || {});
    const on = (k) => (k in f ? f[k] !== false : k !== "tv");
    openSheet(`<h3>${t("adFeatures")}</h3><p class="hint">${t("adFeatHint")}</p>` +
      FEATS.map((k) => `<label class="row" style="display:flex;gap:10px;align-items:center"><span style="flex:1">${t("adF")[k]}</span>
        <input type="checkbox" data-f="${k}" ${on(k) ? "checked" : ""} style="width:22px;height:22px;margin:0;accent-color:var(--tacc,#8fc63f)"></label>`).join("") + backBtn);
    wireBack();
    document.querySelectorAll("#sheet input[data-f]").forEach((x) => x.onchange = async () => {
      f[x.dataset.f] = x.checked;
      const r = await sb.from("app_config").update({ features: f }).eq("id", 1);
      if (r.error) return toast(r.error.message, 4000);
      toast(t("adSaved"), 1500); window.kameiConfigReload && window.kameiConfigReload();
    });
  }
  async function stats() {
    openSheet(`<h3>${t("adStats")}</h3><p class="hint">…</p>`);
    const r = await sb.rpc("admin_stats");
    if (r.error) { openSheet(`<h3>${t("adStats")}</h3><p class="hint err">${esc(r.error.message)}</p>${backBtn}`); wireBack(); return; }
    const d = r.data, S = t("adS");
    const cell = (k, v) => `<div><b>${v}</b><span>${S[k]}</span></div>`;
    const sysL = (s) => (SYSTEMS[s] ? SYSTEMS[s].label : s);
    openSheet(`<h3>${t("adStats")}</h3>
      <div class="stats">${cell("users", d.users)}${cell("online", d.online)}${cell("today", d.today)}</div>
      <div class="stats">${cell("new7", d.new7)}${cell("playing", d.playing)}${cell("sessions7", d.sessions7)}</div>
      <div class="stats">${cell("minutes7", t("minutes", d.minutes7))}${cell("messages7", d.messages7)}${cell("trades7", d.trades7)}</div>
      <div class="stats">${cell("requests", d.requests)}${cell("reports", d.reports)}<div></div></div>
      <h4>${t("adTopGames")}</h4>${(d.topGames || []).map((g, i) => `<div class="sess"><span class="ph">${i + 1}</span><span class="fi"><b>${esc(g.game)}</b><span>${g.n} · ${t("minutes", g.m)}</span></span></div>`).join("") || `<p class="hint">—</p>`}
      <h4>${t("adTopSys")}</h4>${(d.topSystems || []).map((g, i) => `<div class="sess"><span class="ph">${i + 1}</span><span class="fi"><b>${esc(sysL(g.system))}</b><span>${g.n}</span></span></div>`).join("") || `<p class="hint">—</p>`}
      ${backBtn}`);
    wireBack();
  }
  async function announce() {
    const c = window.kameiConfig ? window.kameiConfig() : {};
    openSheet(`<h3>${t("adAnnounce")}</h3><p class="hint">${t("adAnnHint")}</p>
      <textarea id="aTxt" maxlength="300" placeholder="${t("adAnnPh")}" style="width:100%;min-height:90px;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--bg);color:var(--text);font:inherit">${esc(c.announce || "")}</textarea>
      <button class="row ok-row" id="aPub">${t("adAnnPub")}</button>${c.announce ? `<button class="row danger" id="aDel">${t("adAnnDel")}</button>` : ""}${backBtn}`);
    wireBack();
    const save = async (txt) => {
      const r = await sb.from("app_config").update({ announce: txt, announce_at: txt ? new Date().toISOString() : null }).eq("id", 1);
      if (r.error) return toast(r.error.message, 4000);
      toast(t("adSaved")); window.kameiConfigReload && window.kameiConfigReload(); back();
    };
    document.getElementById("aPub").onclick = () => { const v = document.getElementById("aTxt").value.trim(); if (v) save(v); };
    if (document.getElementById("aDel")) document.getElementById("aDel").onclick = () => save(null);
  }
  async function reports() {
    openSheet(`<h3>${t("adReports")}</h3><p class="hint">…</p>`);
    const r = await sb.from("reports").select("*").eq("status", "open").order("created_at", { ascending: false }).limit(50);
    const list = r.data || [];
    const ids = [...new Set(list.flatMap((x) => [x.reporter, x.target]).filter(Boolean))];
    const p = ids.length ? await sb.from("profiles").select("id,pseudo").in("id", ids) : { data: [] };
    const name = (id) => ((p.data || []).find((x) => x.id === id) || {}).pseudo || "?";
    openSheet(`<h3>${t("adReports")}</h3>` + (list.length ? list.map((x) => `<div class="rq"><div class="top"><b>${esc(name(x.target))}</b><span class="chip">${t("adKind")[x.kind]}</span></div>
        <small>${t("adBy", esc(name(x.reporter)))} · ${ago(new Date(x.created_at).getTime())}${x.reason ? " · " + esc(x.reason) : ""}</small>
        ${x.body ? `<p>« ${esc(x.body)} »</p>` : ""}
        <div class="adm"><button data-see="${x.target}">${t("adSeeUser")}</button>${x.ref && x.kind !== "user" ? `<button data-del="${x.id}">${t("adDelMsg")}</button>` : ""}
          <button data-ban="${x.target}">${t("adBan")}</button><button data-ok="${x.id}">${t("adDone")}</button></div></div>`).join("") : `<p class="hint">${t("adNoReports")}</p>`) + backBtn);
    wireBack();
    const byId = (id) => list.find((x) => x.id === +id);
    document.querySelectorAll("#sheet [data-ok]").forEach((b) => b.onclick = async () => { await sb.rpc("report_resolve", { rid: +b.dataset.ok }); reports(); });
    document.querySelectorAll("#sheet [data-ban]").forEach((b) => b.onclick = async () => { const e = await sb.rpc("admin_set_banned", { uid: b.dataset.ban, value: true }); toast(e.error ? e.error.message : "🚫 OK", 3000); });
    document.querySelectorAll("#sheet [data-del]").forEach((b) => b.onclick = async () => {
      const x = byId(b.dataset.del);
      const e = x.kind === "general" ? await sb.rpc("general_delete", { msg_id: x.ref }) : await sb.rpc("chat_delete", { msg_id: x.ref });
      if (!e.error) await sb.rpc("report_resolve", { rid: x.id });
      toast(e.error ? e.error.message : t("adSaved"), 3000); reports();
    });
    document.querySelectorAll("#sheet [data-see]").forEach((b) => b.onclick = () => window.kameiAdminUser && window.kameiAdminUser(b.dataset.see));
  }
  function wire() {
    const on = (id, fn) => { const b = document.getElementById(id); if (b) b.onclick = fn; };
    on("adFeat", features); on("adStats", stats); on("adAnn", announce); on("adRep", reports);
    sb.from("reports").select("id", { count: "exact", head: true }).eq("status", "open").then((r) => { const el = document.getElementById("adRepN"); if (el && r.count) el.textContent = r.count; }, () => {});
  }
  window.kameiAdmin = { wire, features, stats, announce, reports };
})();

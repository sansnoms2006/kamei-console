/* Kamei Game Console — bottom navigation: Consoles · Chat · Sessions · Friends */
(function () {
  Object.assign(I18N.fr, {
    navConsoles: "Consoles", navChat: "Messages", navSessions: "Sessions", navFriends: "Amis", navPlay: "Jouer", navDiscover: "Découvrir", navSocial: "Social", navMe: "Moi", navCat: "Catalogue",
    chatList: "Discussions", chatStart: "Commencer une discussion", chatNone: "Ajoute des amis dans l'onglet Amis pour discuter avec eux.", chatYou: "Toi : ",
    sesMine: "Mes parties", sesFriends: "Mes amis", sesTime: "Temps de jeu", sesCount: "Parties", sesFav: "Jeu préféré", sesNone: "Aucune partie pour l'instant.",
    sesNoFriends: "Pas encore d'activité de tes amis.", needLogin: "Connecte-toi pour voir cette partie.", login: "Se connecter",
  });
  Object.assign(I18N.nl, {
    navConsoles: "Consoles", navChat: "Berichten", navSessions: "Sessies", navFriends: "Vrienden", navPlay: "Spelen", navDiscover: "Ontdekken", navSocial: "Sociaal", navMe: "Ik", navCat: "Catalogus",
    chatList: "Gesprekken", chatStart: "Een gesprek beginnen", chatNone: "Voeg vrienden toe in het tabblad Vrienden om met hen te chatten.", chatYou: "Jij: ",
    sesMine: "Mijn sessies", sesFriends: "Mijn vrienden", sesTime: "Speeltijd", sesCount: "Sessies", sesFav: "Favoriet spel", sesNone: "Nog geen sessies.",
    sesNoFriends: "Nog geen activiteit van je vrienden.", needLogin: "Log in om dit te zien.", login: "Inloggen",
  });
  Object.assign(I18N.en, {
    navConsoles: "Consoles", navChat: "Messages", navSessions: "Sessions", navFriends: "Friends", navPlay: "Play", navDiscover: "Discover", navSocial: "Social", navMe: "Me", navCat: "Catalogue",
    chatList: "Conversations", chatStart: "Start a conversation", chatNone: "Add friends in the Friends tab to chat with them.", chatYou: "You: ",
    sesMine: "My sessions", sesFriends: "My friends", sesTime: "Play time", sesCount: "Sessions", sesFav: "Favourite game", sesNone: "No sessions yet.",
    sesNoFriends: "No activity from your friends yet.", needLogin: "Log in to see this.", login: "Log in",
  });

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const st = document.createElement("style");
  st.textContent = `
    body { padding-bottom: calc(env(safe-area-inset-bottom) + 70px); }
    .bnav { position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; display: flex; justify-content: space-around;
            padding: 6px 6px calc(env(safe-area-inset-bottom) + 6px); background: rgba(14,14,22,.92); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            border-top: 1px solid color-mix(in srgb, var(--tacc, #8fc63f) 30%, transparent); }
    .bnav button { flex: 1; background: none; border: 0; color: var(--muted); display: flex; flex-direction: column; align-items: center; gap: 2px;
                   font: 600 11px Inter, sans-serif; padding: 4px 0; position: relative; border-radius: 14px; transition: color .2s; }
    .bnav button { font-size: 10.5px !important; min-width: 0; }
    .bnav button .ic { width: 44px; height: 28px; padding: 3px 0; border-radius: 14px; transition: background .25s; }
    .bnav button.on { color: var(--tacc, #8fc63f); }
    .bnav button.on .ic { background: color-mix(in srgb, var(--tacc, #8fc63f) 18%, transparent); }
    .bnav { background: rgba(18,20,24,.94) !important; border-top: 1px solid var(--line) !important; }
    .vtitle { margin: 6px 0 14px !important; }
    .subv { display: none; } .subv.on { display: block; }
    .subv > h2:first-child { display: none; }
    .seg .bdg { position: static; display: inline-block; margin-left: 6px; min-width: 16px; height: 16px; line-height: 16px; font-size: 10px; padding: 0 4px; vertical-align: 1px; }
    .bnav .bdg, .seg .bdg { position: absolute; top: 0; left: calc(50% + 10px); min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: #ff4757; color: #fff; font: 700 11px/18px Inter, sans-serif; }
    .bnav .bdg:empty, .seg .bdg:empty { display: none; }
    .fab { bottom: calc(env(safe-area-inset-bottom) + 84px) !important; }
    .toast { bottom: calc(env(safe-area-inset-bottom) + 150px) !important; }
    body.nv-other .wrap, body.nv-other .foot, body.nv-other .fab { display: none !important; }
    .view { display: none; padding: 4px 16px 24px; max-width: 720px; margin: 0 auto; }
    .view.on { display: block; }
    .view h2 { font-family: var(--tfont, Inter), Inter, sans-serif; font-size: 28px; font-weight: 400; margin: 6px 0 12px; color: var(--tacc, #8fc63f); }
    body:not(.themed) .view h2 { font-weight: 800; }
    .conv { width: 100%; display: flex; align-items: center; gap: 12px; padding: 10px; margin-bottom: 8px; border-radius: 16px; border: 0;
            background: rgba(255,255,255,.04); color: inherit; text-align: left; font: inherit; position: relative; }
    .conv .fi span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .conv .when { font-size: 11px; color: var(--muted); align-self: flex-start; margin-top: 4px; }
    .conv.unr .fi span { color: #fff; font-weight: 700; }
    .seg { display: flex; gap: 6px; background: rgba(255,255,255,.05); padding: 4px; border-radius: 14px; margin-bottom: 14px; }
    .seg button { flex: 1; border: 0; border-radius: 10px; padding: 9px; background: none; color: var(--muted); font: 700 13px Inter, sans-serif; }
    .seg button.on { background: #2A2F37; color: var(--text); }
    body.themed .seg button.on { background: var(--tacc, #8fc63f); color: #0b0b12; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
    .stats div { background: rgba(255,255,255,.05); border-radius: 14px; padding: 10px; text-align: center; border: 1px solid color-mix(in srgb, var(--tacc, #8fc63f) 25%, transparent); }
    .stats b { display: block; font-size: 18px; color: var(--tacc, #8fc63f); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .stats small { color: var(--muted); font-size: 11px; }
    .sesrow { display: flex; gap: 12px; align-items: center; padding: 8px; border-radius: 14px; background: rgba(255,255,255,.035); margin-bottom: 8px; }
    .sesrow .cv { width: 46px; height: 46px; border-radius: 10px; object-fit: cover; flex: 0 0 46px; background: #23233a; display: grid; place-items: center; font: 800 10px Inter, sans-serif; color: var(--muted); }
    .sesrow .av { flex: 0 0 auto; }
    .vlogin { text-align: center; padding: 40px 10px; color: var(--muted); }`;
  document.head.appendChild(st);

  /* ---------- Markup: 4 tabs, Découvrir and Social have sub-sections ---------- */
  const IC = {
    consoles: '<path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.2 2L15 14H9l-1.8 2A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4z"/><path d="M7 11.5v3M5.5 13h3"/>',
    discover: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    social: '<path d="M4 5h16v11H9l-5 4z"/>',
    events: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M10 17h4"/>',
    me: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  };
  const icon = (k) => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
  const tabs = [["consoles", "navPlay"], ["discover", "navDiscover"], ["events", "navEvents"], ["social", "navSocial"], ["me", "navMe"]];
  const SUBS = { discover: [["catalogue", "navCat"], ["requests", "navRequests"], ["tv", "navTV"]], social: [["chat", "navChat"], ["friends", "navFriends"], ["sessions", "navSessions"]] };
  const parentOf = (k) => Object.keys(SUBS).find((p) => SUBS[p].some(([s]) => s === k));
  const nav = document.createElement("nav"); nav.className = "bnav"; nav.setAttribute("aria-label", "Navigation");
  document.body.appendChild(nav);
  const tops = {}, views = {};
  const anchor = document.querySelector(".foot");
  for (const [k] of tabs.slice(1)) {
    const v = document.createElement("section"); v.className = "view"; v.id = "v-" + k;
    anchor.parentNode.insertBefore(v, anchor); tops[k] = v;
    if (SUBS[k]) {
      v.innerHTML = `<h2 class="vtitle"></h2><div class="seg" role="tablist"></div>`;
      for (const [s] of SUBS[k]) { const d = document.createElement("div"); d.className = "subv"; d.id = "v-" + s; v.appendChild(d); views[s] = d; }
    }
  }
  views.me = tops.me; views.events = tops.events;
  let cur = "consoles";
  const sub = { discover: "catalogue", social: "chat" };
  const F = (k) => !window.kameiFeature || window.kameiFeature(k);
  const subOk = (k) => (k === "friends" ? true : k === "chat" ? (F("chat") || F("general")) : F(k));
  const allowed = (k) => k === "consoles" || k === "me" || (SUBS[k] ? SUBS[k].some(([s]) => subOk(s)) : subOk(k));
  const isActive = (k) => (SUBS[cur] ? sub[cur] === k : cur === k);
  function paintNav() {
    if (!allowed(cur)) { cur = "consoles"; document.body.classList.remove("nv-other"); for (const v of Object.values(tops)) v.classList.remove("on"); }
    for (const p in SUBS) if (!subOk(sub[p])) { const f = SUBS[p].find(([s]) => subOk(s)); if (f) sub[p] = f[0]; }
    nav.innerHTML = tabs.filter(([k]) => allowed(k)).map(([k, lb]) => `<button data-nv="${k}" class="${k === cur ? "on" : ""}" ${k === cur ? 'aria-current="page"' : ""}>${icon(k)}<span>${t(lb)}</span><span class="bdg" data-bdg="${k}"></span></button>`).join("");
    nav.querySelectorAll("[data-nv]").forEach((b) => b.onclick = () => go(b.dataset.nv));
    for (const p in SUBS) {
      const v = tops[p];
      v.querySelector(".vtitle").textContent = t(p === "discover" ? "navDiscover" : "navSocial");
      const list = SUBS[p].filter(([s]) => subOk(s));
      const seg = v.querySelector(".seg");
      seg.style.display = list.length > 1 ? "" : "none";
      seg.innerHTML = list.map(([s, lb]) => `<button role="tab" data-sub="${s}" aria-selected="${sub[p] === s}" class="${sub[p] === s ? "on" : ""}">${t(lb)}<span class="bdg" data-bdg="${s}"></span></button>`).join("");
      seg.querySelectorAll("[data-sub]").forEach((b) => b.onclick = () => go(b.dataset.sub));
      for (const [s] of SUBS[p]) views[s].classList.toggle("on", sub[p] === s);
    }
    paintBadges();
  }
  function paintBadges() {
    const set = (k, n) => document.querySelectorAll(`[data-bdg="${k}"]`).forEach((el) => (el.textContent = n ? String(n) : ""));
    const n = (window.kameiChat && window.kameiChat.unreadCount) ? window.kameiChat.unreadCount() : 0;
    const rn = window.kameiRequests ? window.kameiRequests.badge() : 0;
    const tv = window.kameiTV ? window.kameiTV.badge() : "";
    set("chat", n); set("social", n); set("requests", rn); set("tv", tv);
    set("discover", (rn || 0) + (tv ? 1 : 0));
    if (window.kameiEvents) set("events", window.kameiEvents.badge());
  }
  function go(k, force) {
    let top = k, s = null;
    if (!tabs.some(([x]) => x === k)) { top = parentOf(k) || "consoles"; s = k; }
    if (s && !subOk(s)) s = null;
    if (!allowed(top)) top = "consoles";
    const same = top === cur && (!s || sub[top] === s);
    if (s) sub[top] = s;
    if (same && !force) { if (top === "consoles") window.scrollTo({ top: 0, behavior: "smooth" }); else render(SUBS[top] ? sub[top] : top); return; }
    cur = top;
    document.body.classList.toggle("nv-other", top !== "consoles");
    for (const [n, v] of Object.entries(tops)) v.classList.toggle("on", n === top);
    paintNav();
    window.scrollTo(0, 0);
    try { window.kameiVibe && window.kameiVibe(10); } catch (e) {}
    if (top !== "consoles") render(SUBS[top] ? sub[top] : top);
  }
  function loginBox(v) {
    v.innerHTML = `<div class="vlogin"><p>${t("needLogin")}</p><button class="row ok-row" id="vLogin">${t("login")}</button></div>`;
    document.getElementById("vLogin").onclick = () => window.kameiAccount && window.kameiAccount.open();
  }
  async function render(k) {
    const v = views[k]; if (!v) return;
    if (k === "catalogue" && window.kameiCatalogue) return window.kameiCatalogue.render(v);
    if (k === "events" && window.kameiEvents) return window.kameiEvents.render(v);
    if (!sb || !me()) return loginBox(v);
    if (k === "me" && window.kameiMeView) return window.kameiMeView.render(v);
    if (k === "friends") {
      if (!v.querySelector("#vfIn")) v.innerHTML = `<div id="vfIn"></div>`;
      return window.kameiFriendsSheet(v.querySelector("#vfIn"));
    }
    if (k === "chat") return renderChat(v);
    if (k === "sessions") return renderSessions(v);
    if (k === "requests" && window.kameiRequests) return window.kameiRequests.render(v);
    if (k === "tv" && window.kameiTV) return window.kameiTV.render(v);
  }

  /* ---------- Chat: list of conversations ---------- */
  async function friendsOf() {
    const f = await sb.from("friendships").select("friend_id").eq("user_id", me().id);
    const ids = (f.data || []).map((x) => x.friend_id);
    if (!ids.length) return [];
    const p = await sb.from("profiles").select("*").in("id", ids);
    return p.data || [];
  }
  async function renderChat(v) {
    if (!v.innerHTML) v.innerHTML = `<h2>${t("chatList")}</h2><p class="hint">…</p>`;
    let friends = [], msgs = [];
    try {
      friends = await friendsOf();
      const r = await sb.from("messages").select("id,from_user,to_user,body,created_at,read_at").or(`from_user.eq.${me().id},to_user.eq.${me().id}`).order("id", { ascending: false }).limit(300);
      msgs = r.data || [];
    } catch (e) {}
    if (!isActive("chat")) return;
    const last = {}, unr = {};
    for (const m of msgs) {
      const other = m.from_user === me().id ? m.to_user : m.from_user;
      if (!last[other]) last[other] = m;
      if (m.to_user === me().id && !m.read_at) unr[other] = (unr[other] || 0) + 1;
    }
    const withMsg = friends.filter((f) => last[f.id]).sort((a, b) => last[b.id].id - last[a.id].id);
    const without = friends.filter((f) => !last[f.id]);
    const row = (f) => {
      const m = last[f.id], on = window.kameiOnline && window.kameiOnline(f);
      const prev = m ? (m.from_user === me().id ? t("chatYou") : "") + (m.body.startsWith("§img:") ? "📸 Photo" : m.body) : (on && f.now_game ? "🎮 " + esc(f.now_game) : "");
      return `<button class="conv ${unr[f.id] ? "unr" : ""}" data-cv="${f.id}">${window.kameiAvatar(f, 46)}<span class="dot ${on ? "on" : ""}"></span>
        <span class="fi"><b>${esc(f.pseudo)}</b><span>${m ? esc(prev) : prev}</span></span>
        ${m ? `<span class="when">${ago(new Date(m.created_at).getTime())}</span>` : ""}${unr[f.id] ? `<span class="unread">${unr[f.id]}</span>` : ""}</button>`;
    };
    const F = (k) => !window.kameiFeature || window.kameiFeature(k);
    const gen = F("general") ? `<button class="conv" id="cvGeneral"><span style="font-size:34px;width:46px;text-align:center">🌍</span><span class="fi"><b>${t("generalRoom")}</b><span>${t("generalHint")}</span></span></button>` : "";
    if (!F("chat")) { v.innerHTML = `<h2>${t("chatList")}</h2>` + gen; const g = v.querySelector("#cvGeneral"); if (g) g.onclick = () => window.kameiChat.openGeneral(); return; }
    v.innerHTML = `<h2>${t("chatList")}</h2>` + gen +
      (friends.length ? withMsg.map(row).join("") + (without.length ? `<p class="hint" style="margin:14px 4px 8px">${t("chatStart")}</p>` + without.map(row).join("") : "")
        : `<p class="hint">${t("chatNone")}</p>`);
    v.querySelectorAll("[data-cv]").forEach((b) => b.onclick = () => window.kameiChat.open(friends.find((f) => f.id === b.dataset.cv)));
    const g = v.querySelector("#cvGeneral"); if (g) g.onclick = () => window.kameiChat.openGeneral();
  }

  /* ---------- Sessions ---------- */
  let sesTab = "mine";
  async function renderSessions(v) {
    if (!v.innerHTML) v.innerHTML = `<h2>${t("navSessions")}</h2><p class="hint">…</p>`;
    let list = [], friends = [];
    try {
      if (sesTab === "mine") {
        const r = await sb.from("sessions").select("*").eq("user_id", me().id).order("started_at", { ascending: false }).limit(200);
        list = r.data || [];
      } else {
        friends = await friendsOf();
        if (friends.length) {
          const r = await sb.from("sessions").select("*").in("user_id", friends.map((f) => f.id)).order("started_at", { ascending: false }).limit(60);
          list = r.data || [];
        }
      }
    } catch (e) {}
    if (!isActive("sessions")) return;
    const sysL = (s) => (SYSTEMS[s] ? SYSTEMS[s].short : s || "");
    let head = `<h2>${t("navSessions")}</h2><div class="seg"><button data-sg="mine" class="${sesTab === "mine" ? "on" : ""}">${t("sesMine")}</button><button data-sg="friends" class="${sesTab === "friends" ? "on" : ""}">${t("sesFriends")}</button></div>`;
    if (sesTab === "mine" && list.length) {
      const total = list.reduce((a, s) => a + (s.minutes || 0), 0);
      const per = {}; for (const s of list) per[s.game] = (per[s.game] || 0) + (s.minutes || 1);
      const fav = Object.entries(per).sort((a, b) => b[1] - a[1])[0];
      head += `<div class="stats"><div><b>${t("minutes", total)}</b><small>${t("sesTime")}</small></div><div><b>${list.length}</b><small>${t("sesCount")}</small></div><div><b>${esc(fav ? fav[0] : "—")}</b><small>${t("sesFav")}</small></div></div>`;
    }
    const byId = Object.fromEntries(friends.map((f) => [f.id, f]));
    const rows = list.slice(0, 60).map((s) => {
      const f = byId[s.user_id];
      return `<div class="sesrow">${s.cover ? `<img class="cv" src="${esc(s.cover)}" alt="" onerror="this.outerHTML='<span class=cv>${esc(sysL(s.system))}</span>'">` : `<span class="cv">${esc(sysL(s.system))}</span>`}
        <span class="fi"><b>${esc(s.game)}</b><span>${f ? esc(f.pseudo) + " · " : ""}${esc(sysL(s.system))} · ${ago(new Date(s.started_at).getTime())}${s.minutes ? " · " + t("minutes", s.minutes) : ""}</span></span>
        ${f ? `<span class="av">${window.kameiAvatar(f, 30)}</span>` : ""}</div>`;
    }).join("");
    v.innerHTML = head + (rows || `<p class="hint">${sesTab === "mine" ? t("sesNone") : t("sesNoFriends")}</p>`);
    v.querySelectorAll("[data-sg]").forEach((b) => b.onclick = () => { sesTab = b.dataset.sg; renderSessions(v); });
  }

  /* ---------- Hooks used by the other files ---------- */
  // the account button and "back" buttons open the Friends tab instead of a pop-up
  window.kameiNavFriends = () => { if (!me()) return false; closeSheet(); go("friends", true); return true; };
  window.kameiNav = { go, refresh: () => { paintBadges(); if (isActive("chat")) renderChat(views.chat); }, current: () => (SUBS[cur] ? sub[cur] : cur), relabel: () => paintNav(), rerender: () => { if (cur !== "consoles") render(SUBS[cur] ? sub[cur] : cur); } };
  setInterval(() => { paintBadges(); if (isActive("chat") && document.visibilityState === "visible" && !document.getElementById("sheetBg").classList.contains("on")) renderChat(views.chat); }, 15000);
  // the round account button opens "Moi"
  document.getElementById("accBtn").onclick = () => (me() ? go("me", true) : window.kameiAccount && window.kameiAccount.open());
  paintNav();
})();

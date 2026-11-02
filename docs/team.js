/* Kamei Game Console — 👥 the Kamei team: who does what (founder, music, requests, events, TV / régie).
   Custom job names are set by the admin; each member gets a team banner (the founder a holographic one). */
(function () {
  const L = {
    fr: { team: "👥 L'équipe Kamei", teamHint: "Les personnes qui font vivre Kamei. Appuie sur quelqu'un pour voir son profil.", founder: "Fondateur", crew: "ÉQUIPE KAMEI", prod: "Kamei Productions",
      std: { music: "Kamei Radio", requests: "Demandes de jeux", events: "Tournois", tv: "Kamei TV & régie" }, admin: "Admin",
      credit: { music: (n) => `🎧 Programmée par ${n}`, requests: (n) => `📨 Tes demandes sont traitées par ${n}`, events: (n) => `🏆 Tournois organisés par ${n}`, tv: (n) => `🎛️ Réalisation : ${n}` },
      and: " et ", none: "L'équipe arrive bientôt.", jobT: "Nom du poste (facultatif)", jobPh: "DJ officiel, Réal' en chef…", jobOk: "Nom du poste enregistré" },
    nl: { team: "👥 Het Kamei-team", teamHint: "De mensen achter Kamei. Tik op iemand om zijn profiel te zien.", founder: "Oprichter", crew: "KAMEI-TEAM", prod: "Kamei Productions",
      std: { music: "Kamei Radio", requests: "Spelaanvragen", events: "Toernooien", tv: "Kamei TV & regie" }, admin: "Admin",
      credit: { music: (n) => `🎧 Geprogrammeerd door ${n}`, requests: (n) => `📨 Je aanvragen worden behandeld door ${n}`, events: (n) => `🏆 Toernooien georganiseerd door ${n}`, tv: (n) => `🎛️ Regie: ${n}` },
      and: " en ", none: "Het team komt eraan.", jobT: "Naam van de functie (optioneel)", jobPh: "Officiële DJ, Hoofdregisseur…", jobOk: "Functienaam opgeslagen" },
    en: { team: "👥 The Kamei team", teamHint: "The people who make Kamei happen. Tap someone to see their profile.", founder: "Founder", crew: "KAMEI TEAM", prod: "Kamei Productions",
      std: { music: "Kamei Radio", requests: "Game requests", events: "Tournaments", tv: "Kamei TV & control room" }, admin: "Admin",
      credit: { music: (n) => `🎧 Programmed by ${n}`, requests: (n) => `📨 Your requests are handled by ${n}`, events: (n) => `🏆 Tournaments run by ${n}`, tv: (n) => `🎛️ Directed by ${n}` },
      and: " and ", none: "The team is coming soon.", jobT: "Job name (optional)", jobPh: "Official DJ, Head director…", jobOk: "Job name saved" },
  };
  for (const k in L) Object.assign(I18N[k], { teamRow: L[k].team, jobT: L[k].jobT, jobPh: L[k].jobPh, jobOk: L[k].jobOk });
  const X = () => L[lang] || L.fr;
  const sb = window.kameiSB;
  const ICON = { music: "🎵", requests: "📨", events: "🏆", tv: "🎛️" };
  const ORDER = ["tv", "events", "music", "requests"];

  const st = document.createElement("style");
  st.textContent = `
  .sban { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 14px 10px 10px; border-radius: 18px; margin: 4px 0 14px; overflow: hidden; text-align: left; font: inherit; color: #fff; border: 0; cursor: pointer; }
  .sban .ic { width: 62px; height: 62px; flex: none; border-radius: 16px; display: grid; place-items: center; font-size: 34px; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); }
  .sban b { display: block; font: 900 17px Inter, sans-serif; letter-spacing: .3px; }
  .sban small { display: block; font: 800 10.5px Inter, sans-serif; letter-spacing: 2px; opacity: .8; margin-top: 3px; }
  .sban.staff { background: linear-gradient(120deg, #1d3b12, #3c6e1d 40%, #4a2a78 100%); box-shadow: inset 0 0 0 1.5px rgba(155, 209, 75, .7), 0 0 18px rgba(155, 209, 75, .22); }
  .sban.staff::after, .sban.fnd::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,.18) 50%, transparent 62%); transform: translateX(-100%); animation: sbSheen 5s ease-in-out infinite; pointer-events: none; }
  @keyframes sbSheen { 60%, 100% { transform: translateX(100%); } }
  /* founder: black & royal purple, holographic border */
  .sban.fnd { background: linear-gradient(130deg, #07040c, #2b0f4a 55%, #0b0614); padding: 12px 14px 12px 10px; }
  .sban.fnd::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 2px; pointer-events: none;
    background: linear-gradient(90deg, #a855f7, #3b82f6, #22d3ee, #9bd14b, #f0abfc, #a855f7); background-size: 300% 100%; animation: sbHolo 6s linear infinite;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
  @keyframes sbHolo { to { background-position: 300% 0; } }
  .sban.fnd { box-shadow: 0 0 22px rgba(168, 85, 247, .35); }
  .sban.fnd .ic { background: radial-gradient(circle at 50% 35%, rgba(168, 85, 247, .45), rgba(0,0,0,.2)); position: relative; overflow: visible; }
  .sban.fnd .ic svg { width: 40px; height: 56px; }
  .sban.fnd .ic i { position: absolute; top: -12px; left: 50%; transform: translateX(-50%) rotate(-8deg); font-style: normal; font-size: 22px; filter: drop-shadow(0 2px 3px rgba(0,0,0,.5)); }
  .sban.fnd b { font-size: 19px; letter-spacing: 1.5px; text-transform: uppercase; background: linear-gradient(90deg, #f5d0fe, #c4b5fd, #a5f3fc, #d9f99d, #f5d0fe); background-size: 200% 100%;
    -webkit-background-clip: text; background-clip: text; color: transparent; animation: sbHolo 6s linear infinite; }
  .tmlist .tm { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px; border: 0; border-radius: 14px; background: rgba(255,255,255,.04); color: var(--text); font: inherit; text-align: left; margin-bottom: 8px; }
  .tmlist .tm > span:not(.av) { flex: 1; min-width: 0; } .tmlist .tm b { display: block; } .tmlist .tm small { color: var(--muted); }
  .tmlist .tm.fnd { box-shadow: inset 0 0 0 1.5px rgba(168, 85, 247, .7); } .tmlist .tm.staff { box-shadow: inset 0 0 0 1.5px rgba(155, 209, 75, .5); }
  .tcredit { font-size: 12.5px; color: var(--muted); margin: -4px 0 12px; }
  .tcredit b { color: var(--text); }`;
  document.head.appendChild(st);

  let list = [], map = {};
  try { list = JSON.parse(localStorage.getItem("kamei-team") || "[]"); for (const m of list) map[m.id] = m; } catch (e) {}
  async function refresh() {
    if (!sb) return;
    try {
      const r = await sb.rpc("kamei_team");
      if (r.error || !Array.isArray(r.data)) return;
      list = r.data; map = {}; for (const m of list) map[m.id] = m;
      try { localStorage.setItem("kamei-team", JSON.stringify(list)); } catch (e) {}
    } catch (e) {}
  }
  const get = (uid) => (uid && map[uid]) || null;
  const roles = (m) => ORDER.filter((r) => (m.roles || []).includes(r));
  const jobName = (m) => m.staff_title || (m.founder ? X().founder : roles(m).length ? roles(m).map((r) => X().std[r]).join(" · ") : X().admin);
  const icon = (m) => (roles(m)[0] ? ICON[roles(m)[0]] : "🛡️");
  const logo = `<svg viewBox="0 -70 240 526" aria-hidden="true"><use href="#kFull" x="0" y="0" width="240" height="456"/></svg>`;

  function banner(uid) {
    const m = get(uid); if (!m) return "";
    const x = X();
    if (m.founder) return `<button class="sban fnd" data-team="1"><span class="ic"><i>👑</i>${logo}</span><span><b>${esc(m.staff_title || x.founder)}</b><small>${esc(x.prod.toUpperCase())}</small></span></button>`;
    if (!roles(m).length && !m.staff_title) return "";
    return `<button class="sban staff" data-team="1"><span class="ic">${icon(m)}</span><span><b>${esc(jobName(m))}</b><small>${x.crew}${m.staff_title && roles(m).length ? " · " + esc(roles(m).map((r) => x.std[r]).join(" · ").toUpperCase()) : ""}</small></span></button>`;
  }
  // "🎧 Programmée par Abeka" at the top of a section
  function credit(role) {
    const who = list.filter((m) => (m.roles || []).includes(role)).map((m) => `<b>${esc(m.pseudo)}</b>`);
    if (!who.length) return "";
    const names = who.length > 1 ? who.slice(0, -1).join(", ") + X().and + who[who.length - 1] : who[0];
    return `<p class="tcredit">${X().credit[role](names)}</p>`;
  }
  async function page() {
    const x = X();
    const draw = () => openSheet(`<h3>${x.team}</h3><p class="hint">${x.teamHint}</p><div class="tmlist">${list.length ? list.map((m) =>
      `<button class="tm ${m.founder ? "fnd" : "staff"}" data-tm="${esc(m.id)}">${window.kameiAvatar ? window.kameiAvatar(m, 46) : ""}<span><b>${esc(m.pseudo)}</b><small>${m.founder ? "👑" : icon(m)} ${esc(jobName(m))}</small></span></button>`).join("") : `<p class="hint">${x.none}</p>`}</div>
      <div class="btns"><button onclick="closeSheet()">←</button></div>`);
    draw();
    const wire = () => document.querySelectorAll("#sheet [data-tm]").forEach((b) => b.onclick = () => {
      const m = get(b.dataset.tm), u = window.kameiMe && window.kameiMe();
      if (u && m && m.id === u.id && window.kameiProfile) return window.kameiProfile.mine();
      if (m) member(m);
    });
    wire();
    await refresh(); if (document.querySelector("#sheet .tmlist")) { draw(); wire(); }
  }
  // a team member's page: banners + public profile
  function member(m) {
    openSheet(`<div class="acc-head">${window.kameiAvatar ? window.kameiAvatar(m, 56) : ""}<div><h3>${esc(m.pseudo)}</h3><p class="hint" style="margin:0">${m.founder ? "👑" : icon(m)} ${esc(jobName(m))}</p></div></div>
      <div id="tmProfile">${window.kameiTitles ? window.kameiTitles.banner(m.id) : ""}${banner(m.id).replace("data-team", "data-x")}</div>
      ${window.kameiEvents ? `<button class="row" id="tmPalm">${esc(t("navPalm") || "🏆")}</button>` : ""}
      <div class="btns" style="margin-top:12px"><button id="tmBack">←</button></div>`);
    document.getElementById("tmBack").onclick = page;
    const pb = document.getElementById("tmPalm"); if (pb) pb.onclick = () => window.kameiEvents.palmares(m.id, m.pseudo, () => member(m));
    if (window.kameiProfile) window.kameiProfile.fill(m, document.getElementById("tmProfile"));
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("[data-team]");
    if (b) { e.preventDefault(); e.stopPropagation(); page(); }
  }, true);

  window.kameiTeam = { refresh, get, banner, credit, page, jobName, list: () => list };
  setTimeout(refresh, 1800);
  setInterval(refresh, 10 * 60000);
})();

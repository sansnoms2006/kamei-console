/* Kamei Game Console — Kamei titles: 🏆 Champion Kamei (gold trophy) and the 🥈 / 🥉 medals.
   Each tournament crowns a champion (1st) and two medallists (2nd, 3rd). A player keeps the title until
   they play another tournament: 1st → stays champion (×2, ×3…), 2nd/3rd → medal, further / quit → title lost. */
(function () {
  const L = {
    fr: { t1: "Champion Kamei", t2: "Médaille d'argent Kamei", t3: "Médaille de bronze Kamei", last: (g) => `Dernière victoire : ${g}`, won: (g) => `Gagnée sur ${g}`,
      hall: "🏆 Les champions Kamei", hallNone: "Pas encore de champion. Gagne un tournoi Kamei Events pour soulever le trophée !",
      rule: "Chaque tournoi fait un Champion Kamei 🏆 (le 1er) et deux médaillés 🥈 🥉. On garde son titre tant qu'on ne rejoue pas. Si on rejoue : 1er → on reste champion, 2e ou 3e → médaille, plus loin ou abandon → on perd son titre.",
      x: (n) => `×${n}`, since: (d) => `depuis le ${d}` },
    nl: { t1: "Kamei-kampioen", t2: "Zilveren Kamei-medaille", t3: "Bronzen Kamei-medaille", last: (g) => `Laatste overwinning: ${g}`, won: (g) => `Gewonnen op ${g}`,
      hall: "🏆 De Kamei-kampioenen", hallNone: "Nog geen kampioen. Win een Kamei Events-toernooi om de trofee te heffen!",
      rule: "Elk toernooi maakt een Kamei-kampioen 🏆 (de 1e) en twee medaillewinnaars 🥈 🥉. Je houdt je titel zolang je niet opnieuw speelt. Speel je opnieuw: 1e → je blijft kampioen, 2e of 3e → medaille, verder of opgeven → je verliest je titel.",
      x: (n) => `×${n}`, since: (d) => `sinds ${d}` },
    en: { t1: "Kamei Champion", t2: "Kamei silver medal", t3: "Kamei bronze medal", last: (g) => `Last win: ${g}`, won: (g) => `Won on ${g}`,
      hall: "🏆 The Kamei champions", hallNone: "No champion yet. Win a Kamei Events tournament to lift the trophy!",
      rule: "Every tournament crowns a Kamei Champion 🏆 (1st) and two medallists 🥈 🥉. You keep your title as long as you don't play again. If you do: 1st → you stay champion, 2nd or 3rd → medal, further or quitting → you lose your title.",
      x: (n) => `×${n}`, since: (d) => `since ${d}` },
  };
  const X = () => L[lang] || L.fr;
  const sb = window.kameiSB;
  const IMG = ["", "gold", "silver", "bronze"];
  const src = (r, big) => `img/kamei-${IMG[r]}-${big ? 512 : 192}.webp`;
  const COL = ["", "#ffc93c", "#dfe6ef", "#e0915a"];

  const st = document.createElement("style");
  st.textContent = `
  .av.tg1 { box-shadow: 0 0 0 2px #ffc93c, 0 0 12px 2px rgba(255, 201, 60, .75); }
  .av.tg2 { box-shadow: 0 0 0 2px #dfe6ef, 0 0 10px 1px rgba(223, 230, 239, .6); }
  .av.tg3 { box-shadow: 0 0 0 2px #e0915a, 0 0 10px 1px rgba(224, 145, 90, .6); }
  .av.tgp { animation: tgPulse 2.6s ease-in-out infinite; }
  @keyframes tgPulse { 50% { filter: brightness(1.12); box-shadow: 0 0 0 2px var(--tgc), 0 0 22px 6px var(--tgg); } }
  .av.tg1.tgp { --tgc: #ffc93c; --tgg: rgba(255, 201, 60, .85); } .av.tg2.tgp { --tgc: #dfe6ef; --tgg: rgba(223, 230, 239, .7); } .av.tg3.tgp { --tgc: #e0915a; --tgg: rgba(224, 145, 90, .7); }
  img.tic { display: inline-block; vertical-align: middle; object-fit: contain; margin: 0 2px; }
  .tban { position: relative; display: flex; align-items: center; gap: 12px; padding: 10px 14px 10px 6px; border-radius: 18px; margin: 4px 0 14px; overflow: hidden; border: 1px solid; cursor: pointer; text-align: left; width: 100%; font: inherit; color: var(--text); }
  .tban.t1 { background: linear-gradient(120deg, #4a3305, #8a6110 45%, #3d2a05); border-color: #ffc93c; box-shadow: 0 0 22px rgba(255, 201, 60, .35); }
  .tban.t2 { background: linear-gradient(120deg, #2b3038, #5d6673 45%, #262a31); border-color: #dfe6ef; box-shadow: 0 0 18px rgba(223, 230, 239, .25); }
  .tban.t3 { background: linear-gradient(120deg, #3b2214, #7a4524 45%, #33200f); border-color: #e0915a; box-shadow: 0 0 18px rgba(224, 145, 90, .3); }
  .tban::after { content: ""; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.22) 50%, transparent 65%); transform: translateX(-100%); animation: tbSheen 4.5s ease-in-out infinite; pointer-events: none; }
  @keyframes tbSheen { 60%, 100% { transform: translateX(100%); } }
  .tban img { width: 74px; height: 74px; flex: none; filter: drop-shadow(0 6px 10px rgba(0,0,0,.45)); }
  .tban b { display: block; font: 900 17px Inter, sans-serif; letter-spacing: .4px; text-transform: uppercase; }
  .tban.t1 b { color: #ffe08a; } .tban.t2 b { color: #f2f5f9; } .tban.t3 b { color: #ffc49a; }
  .tban small { display: block; color: rgba(255,255,255,.8); font-size: 12.5px; margin-top: 2px; }
  .tban em { font-style: normal; margin-left: 6px; padding: 1px 7px; border-radius: 999px; background: rgba(0,0,0,.35); font-size: 13px; }
  .thall { display: flex; gap: 10px; overflow-x: auto; padding: 4px 2px 10px; margin: 0 0 12px; scrollbar-width: none; }
  .thall::-webkit-scrollbar { display: none; }
  .thall button { flex: none; width: 108px; padding: 8px 6px 10px; border-radius: 16px; border: 1px solid; background: rgba(255,255,255,.04); color: var(--text); font: inherit; text-align: center; }
  .thall button.t1 { border-color: rgba(255, 201, 60, .7); background: radial-gradient(circle at 50% 30%, rgba(255, 201, 60, .22), transparent 70%); }
  .thall button.t2 { border-color: rgba(223, 230, 239, .5); } .thall button.t3 { border-color: rgba(224, 145, 90, .55); }
  .thall img.big { width: 76px; height: 76px; display: block; margin: 0 auto 2px; }
  .thall .who { display: flex; align-items: center; justify-content: center; gap: 5px; font-weight: 800; font-size: 13px; }
  .thall .who b { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 64px; }
  .thall small { display: block; color: var(--muted); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tbig { text-align: center; } .tbig img { width: min(78vw, 300px); height: min(78vw, 300px); filter: drop-shadow(0 14px 24px rgba(0,0,0,.5)); }`;
  document.head.appendChild(st);

  /* ---------- who holds what (small table, kept on the phone too) ---------- */
  let map = {}, rows = [];
  try { rows = JSON.parse(localStorage.getItem("kamei-titles") || "[]"); for (const r of rows) map[r.user_id] = r; } catch (e) {}
  async function refresh() {
    if (!sb) return;
    try {
      const r = await sb.from("titles").select("user_id,rank,streak,game,since,profiles(id,pseudo,color,avatar,avatar_url)").order("rank").order("streak", { ascending: false }).order("since");
      if (r.error) return;
      const rowsBefore = rows.map((x) => [x.user_id, x.rank, x.streak]);
      rows = r.data || []; map = {}; for (const x of rows) map[x.user_id] = x;
      try { localStorage.setItem("kamei-titles", JSON.stringify(rows)); } catch (e) {}
      const was = JSON.stringify(rowsBefore);
      document.dispatchEvent(new Event("kamei-titles"));
      // the Events and Moi pages show titles: repaint them if something changed
      const cur = window.kameiNav && window.kameiNav.current && window.kameiNav.current();
      if (was !== JSON.stringify(rows.map((x) => [x.user_id, x.rank, x.streak])) && (cur === "events" || cur === "me")) window.kameiNav.rerender();
    } catch (e) {}
  }
  const get = (uid) => (uid && map[uid]) || null;
  const icon = (r, px) => (r ? `<img class="tic" src="${src(r)}" width="${px || 22}" height="${px || 22}" alt="${["", "🏆", "🥈", "🥉"][r]}" title="${esc(X()["t" + r])}">` : "");
  const name = (t) => X()["t" + t.rank] + (t.rank === 1 && t.streak > 1 ? " " + X().x(t.streak) : "");
  // CSS classes for an avatar (glow of the place's colour)
  const avClass = (uid, size) => { const t = get(uid); return t ? ` tg${t.rank}${size >= 44 ? " tgp" : ""}` : ""; };

  function banner(uid) {
    const t = get(uid); if (!t) return "";
    const x = X();
    return `<button class="tban t${t.rank}" data-tview="${esc(uid)}"><img src="${src(t.rank, true)}" alt="">
      <span><b>${esc(x["t" + t.rank])}${t.rank === 1 && t.streak > 1 ? `<em>${x.x(t.streak)}</em>` : ""}</b>
      <small>${t.game ? esc(t.rank === 1 ? x.last(t.game) : x.won(t.game)) : ""}</small></span></button>`;
  }
  function hall() {
    const x = X();
    if (!rows.length) return `<h4 style="margin:4px 0 8px">${x.hall}</h4><p class="hint" style="margin:0 0 14px">${x.hallNone}</p>`;
    return `<h4 style="margin:4px 0 8px">${x.hall}</h4><div class="thall">${rows.map((t) => {
      const p = t.profiles || { id: t.user_id, pseudo: "?" };
      return `<button class="t${t.rank}" data-tview="${esc(t.user_id)}"><img class="big" src="${src(t.rank)}" alt="" loading="lazy">
        <div class="who">${window.kameiAvatar ? window.kameiAvatar(p, 20) : ""}<b>${esc(p.pseudo)}</b></div>
        <small>${t.rank === 1 && t.streak > 1 ? x.x(t.streak) + " · " : ""}${esc(t.game || "")}</small></button>`;
    }).join("")}</div>`;
  }
  // tap a trophy / banner: the trophy in big + the rule
  function view(uid) {
    const t = get(uid); if (!t) return;
    const p = t.profiles || {}, x = X();
    openSheet(`<div class="tbig"><img src="${src(t.rank, true)}" alt=""><h3 style="margin:4px 0 2px">${esc(name(t))}</h3>
      <p class="hint" style="margin:0">${esc(p.pseudo || "")}${t.game ? " · " + esc(t.rank === 1 ? x.last(t.game) : x.won(t.game)) : ""}${t.since ? " · " + esc(x.since(new Date(t.since).toLocaleDateString())) : ""}</p></div>
      <p class="hint" style="margin-top:14px">${x.rule}</p><div class="btns"><button onclick="closeSheet()">←</button></div>`);
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest && e.target.closest("[data-tview]");
    if (b) { e.preventDefault(); e.stopPropagation(); view(b.dataset.tview); }
  }, true);

  window.kameiTitles = { refresh, get, icon, banner, hall, avClass, view, name };
  setTimeout(refresh, 1500);
  setInterval(refresh, 5 * 60000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") refresh(); });
})();

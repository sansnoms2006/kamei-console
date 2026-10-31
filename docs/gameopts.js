/* Kamei Game Console — in-game options: screenshot, screen filter, rewind, touch controls, cheats */
(function () {
  Object.assign(I18N.fr, {
    goBtn: "⚙️", goTitle: "Options du jeu", goShot: "📸 Capture d'écran", goFilter: "🎨 Filtre d'écran", goRewind: "⏪ Rembobiner (bouton en haut à gauche)",
    goRewindNote: "Le changement s'applique au prochain lancement du jeu.", goPad: "🕹️ Manette tactile", goSize: "Taille", goOpacity: "Transparence", goLift: "Hauteur",
    goCheats: "🧪 Codes de triche", goCheatName: "Nom (ex. Argent infini)", goCheatCode: "Code (Action Replay, Game Genie…)", goAdd: "Ajouter", goFind: "🔎 Chercher des codes pour ce jeu",
    goNoCodes: "Aucun code trouvé pour ce jeu.", goSearching: "Recherche…", goPickGame: "Quel jeu ?", goAdded: "Code ajouté", goCheatHint: "Un code mal tapé peut faire planter le jeu : sauvegarde avant.",
    goShotTitle: "Capture d'écran", goSend: "💬 Envoyer à un ami", goDownload: "⬇️ Télécharger", goSent: "Capture envoyée !", goShotFail: "Capture impossible",
    goPickFriend: "Envoyer à qui ?", goNoFriends: "Ajoute d'abord des amis.",
    goF: { disabled: "Aucun", lcd: "Écran LCD", "crt-easymode.glslp": "Télé CRT douce", "crt-aperture.glslp": "Borne d'arcade", "crt-geom.glslp": "Télé bombée", "crt-lottes": "CRT rétro", "2xScaleHQ.glslp": "Lisse", sabr: "Net" },
  });
  Object.assign(I18N.nl, {
    goBtn: "⚙️", goTitle: "Spelopties", goShot: "📸 Schermafbeelding", goFilter: "🎨 Schermfilter", goRewind: "⏪ Terugspoelen (knop linksboven)",
    goRewindNote: "De wijziging geldt bij de volgende start van het spel.", goPad: "🕹️ Aanraakbediening", goSize: "Grootte", goOpacity: "Transparantie", goLift: "Hoogte",
    goCheats: "🧪 Cheatcodes", goCheatName: "Naam (bv. Oneindig geld)", goCheatCode: "Code (Action Replay, Game Genie…)", goAdd: "Toevoegen", goFind: "🔎 Codes zoeken voor dit spel",
    goNoCodes: "Geen codes gevonden voor dit spel.", goSearching: "Zoeken…", goPickGame: "Welk spel?", goAdded: "Code toegevoegd", goCheatHint: "Een verkeerde code kan het spel laten crashen: sla eerst op.",
    goShotTitle: "Schermafbeelding", goSend: "💬 Naar een vriend sturen", goDownload: "⬇️ Downloaden", goSent: "Afbeelding verstuurd!", goShotFail: "Schermafbeelding mislukt",
    goPickFriend: "Naar wie sturen?", goNoFriends: "Voeg eerst vrienden toe.",
    goF: { disabled: "Geen", lcd: "LCD-scherm", "crt-easymode.glslp": "Zachte CRT-tv", "crt-aperture.glslp": "Arcadekast", "crt-geom.glslp": "Bolle tv", "crt-lottes": "Retro CRT", "2xScaleHQ.glslp": "Glad", sabr: "Scherp" },
  });
  Object.assign(I18N.en, {
    goBtn: "⚙️", goTitle: "Game options", goShot: "📸 Screenshot", goFilter: "🎨 Screen filter", goRewind: "⏪ Rewind (button top left)",
    goRewindNote: "Applies the next time the game starts.", goPad: "🕹️ Touch controls", goSize: "Size", goOpacity: "Opacity", goLift: "Height",
    goCheats: "🧪 Cheat codes", goCheatName: "Name (e.g. Infinite money)", goCheatCode: "Code (Action Replay, Game Genie…)", goAdd: "Add", goFind: "🔎 Find codes for this game",
    goNoCodes: "No codes found for this game.", goSearching: "Searching…", goPickGame: "Which game?", goAdded: "Code added", goCheatHint: "A mistyped code can crash the game: save first.",
    goShotTitle: "Screenshot", goSend: "💬 Send to a friend", goDownload: "⬇️ Download", goSent: "Screenshot sent!", goShotFail: "Screenshot failed",
    goPickFriend: "Send to whom?", goNoFriends: "Add friends first.",
    goF: { disabled: "None", lcd: "LCD screen", "crt-easymode.glslp": "Soft CRT TV", "crt-aperture.glslp": "Arcade cabinet", "crt-geom.glslp": "Curved TV", "crt-lottes": "Retro CRT", "2xScaleHQ.glslp": "Smooth", sabr: "Sharp" },
  });

  const LIGHT = ["gb", "gbc", "gba", "nes", "snes", "sms", "md", "gg", "pce", "ngp", "ws", "a2600", "a7800", "a5200", "lynx", "coleco", "s32x", "vb"];
  const sysKey = (sys) => "kamei-gopt-" + sys;
  function sysOpts(sys) { let o = {}; try { o = JSON.parse(localStorage.getItem(sysKey(sys)) || "{}"); } catch (e) {} if (o.rewind === undefined) o.rewind = LIGHT.includes(sys); o.pad = o.pad || { size: 1, opacity: 1, lift: 0 }; return o; }
  function saveSys(sys, o) { try { localStorage.setItem(sysKey(sys), JSON.stringify(o)); } catch (e) {} }
  const cheatKey = (g) => "kamei-cheats-" + g.id;
  function cheats(g) { try { return JSON.parse(localStorage.getItem(cheatKey(g)) || "[]"); } catch (e) { return []; } }
  function saveCheats(g, list) { try { localStorage.setItem(cheatKey(g), JSON.stringify(list)); } catch (e) {} }
  function forGame(g) { const o = sysOpts(g.system); return { shader: o.shader || "disabled", pad: o.pad, rewind: !!o.rewind, cheats: cheats(g) }; }
  const cur = () => window.kameiCurrentGame && window.kameiCurrentGame();
  const frame = () => document.getElementById("frame").contentWindow;
  const push = () => { const g = cur(); if (g) frame().postMessage({ type: "opts", opts: forGame(g) }, "*"); };

  /* ---------- Options sheet ---------- */
  function sheet() {
    const g = cur(); if (!g) return;
    const o = sysOpts(g.system), F = t("goF");
    const cl = cheats(g);
    openSheet(`<h3>${t("goTitle")}</h3>
      <button class="row ok-row" id="goShot">${t("goShot")}</button>
      <h4>${t("goFilter")}</h4>
      <div class="gochips">${Object.keys(F).map((k) => `<button data-sh="${k}" class="${(o.shader || "disabled") === k ? "on" : ""}">${F[k]}</button>`).join("")}</div>
      <h4>${t("goPad")}</h4>
      <label class="gorange">${t("goSize")}<input type="range" id="goSize" min="0.7" max="1.4" step="0.05" value="${o.pad.size}"></label>
      <label class="gorange">${t("goOpacity")}<input type="range" id="goOp" min="0.2" max="1" step="0.05" value="${o.pad.opacity}"></label>
      <label class="gorange">${t("goLift")}<input type="range" id="goLift" min="0" max="160" step="5" value="${o.pad.lift}"></label>
      <h4>${t("goRewind").split(" (")[0]}</h4>
      <label class="row" style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="goRew" ${o.rewind ? "checked" : ""} style="width:auto;margin:0"> ${t("goRewind")}</label>
      <p class="hint">${t("goRewindNote")}</p>
      <h4>${t("goCheats")}</h4>
      <div id="goCl">${cl.map((c, i) => `<label class="row" style="display:flex;gap:10px;align-items:center"><input type="checkbox" data-ch="${i}" ${c.on ? "checked" : ""} style="width:auto;margin:0"><span style="flex:1">${esc(c.name || c.code)}</span><button class="mini" data-cd="${i}">✕</button></label>`).join("")}</div>
      <input id="goCn" placeholder="${t("goCheatName")}" maxlength="60"><input id="goCc" placeholder="${t("goCheatCode")}" maxlength="400" autocapitalize="characters">
      <div class="btns"><button id="goFind">${t("goFind")}</button><button class="ok" id="goAdd">${t("goAdd")}</button></div>
      <p class="hint" style="margin-top:8px">${t("goCheatHint")}</p>`);
    const $s = (id) => document.getElementById(id);
    $s("goShot").onclick = () => { closeSheet(); frame().postMessage({ type: "shot" }, "*"); };
    document.querySelectorAll("#sheet [data-sh]").forEach((b) => b.onclick = () => {
      o.shader = b.dataset.sh; saveSys(g.system, o); push();
      document.querySelectorAll("#sheet [data-sh]").forEach((x) => x.classList.toggle("on", x === b));
    });
    const pad = () => { o.pad = { size: +$s("goSize").value, opacity: +$s("goOp").value, lift: +$s("goLift").value }; saveSys(g.system, o); push(); };
    for (const id of ["goSize", "goOp", "goLift"]) $s(id).oninput = pad;
    $s("goRew").onchange = (e) => { o.rewind = e.target.checked; saveSys(g.system, o); };
    document.querySelectorAll("#sheet [data-ch]").forEach((x) => x.onchange = () => { const l = cheats(g); l[+x.dataset.ch].on = x.checked; saveCheats(g, l); push(); });
    document.querySelectorAll("#sheet [data-cd]").forEach((x) => x.onclick = (e) => { e.preventDefault(); const l = cheats(g); l.splice(+x.dataset.cd, 1); saveCheats(g, l); push(); sheet(); });
    $s("goAdd").onclick = () => {
      const code = $s("goCc").value.trim(); if (!code) return;
      const l = cheats(g); l.push({ name: $s("goCn").value.trim(), code, on: true }); saveCheats(g, l); push(); toast(t("goAdded")); sheet();
    };
    $s("goFind").onclick = () => findCodes(g);
  }

  /* ---------- Cheat codes from the libretro database (GitHub) ---------- */
  async function chtList(dir) {
    const key = "https://kamei.local/cht/" + encodeURIComponent(dir);
    let cache = null;
    try { cache = await caches.open("kamei-cht"); const hit = await cache.match(key); if (hit) { const j = await hit.json(); if (Date.now() - j.t < 7 * 864e5) return j.names; } } catch (e) {}
    const api = "https://api.github.com/repos/libretro/libretro-database/git/trees/";
    const root = await (await fetch(api + "master")).json();
    const cht = (root.tree || []).find((x) => x.path === "cht"); if (!cht) return [];
    const tc = await (await fetch(api + cht.sha)).json();
    const d = (tc.tree || []).find((x) => x.path === dir); if (!d) return [];
    const td = await (await fetch(api + d.sha)).json();
    const names = (td.tree || []).map((x) => x.path).filter((n) => n.endsWith(".cht")).map((n) => n.slice(0, -4));
    try { if (cache && names.length) await cache.put(key, new Response(JSON.stringify({ t: Date.now(), names }))); } catch (e) {}
    return names;
  }
  function parseCht(txt) {
    const out = [], get = (k) => { const m = new RegExp("^" + k + '\\s*=\\s*"?(.*?)"?\\s*$', "m").exec(txt); return m ? m[1] : null; };
    const n = +(get("cheats") || 0);
    for (let i = 0; i < Math.min(n, 300); i++) { const code = get(`cheat${i}_code`); if (code) out.push({ name: get(`cheat${i}_desc`) || code, code }); }
    return out;
  }
  async function findCodes(g) {
    const s = SYSTEMS[g.system];
    openSheet(`<h3>${t("goCheats")}</h3><p class="hint">${t("goSearching")}</p>`);
    let found = [];
    for (const dir of s.thumbs || []) {
      try {
        const names = await chtList(dir);
        const want = g.romName || g.title;
        found = names.map((n) => ({ n, sc: similarity(want, n) })).filter((x) => x.sc > 0.35).sort((a, b) => b.sc - a.sc).slice(0, 5).map((x) => ({ dir, n: x.n }));
        if (found.length) break;
      } catch (e) {}
    }
    if (!found.length) { openSheet(`<h3>${t("goCheats")}</h3><p class="hint">${t("goNoCodes")}</p><div class="btns"><button id="goBack">←</button></div>`); document.getElementById("goBack").onclick = sheet; return; }
    const show = async (f) => {
      openSheet(`<h3>${esc(f.n)}</h3><p class="hint">${t("goSearching")}</p>`);
      let list = [];
      try { list = parseCht(await (await fetch(`https://raw.githubusercontent.com/libretro/libretro-database/master/cht/${encodeURIComponent(f.dir)}/${encodeURIComponent(f.n)}.cht`)).text()); } catch (e) {}
      const have = new Set(cheats(g).map((c) => c.code));
      openSheet(`<h3>${esc(f.n)}</h3><p class="hint">${t("goCheatHint")}</p>` + (list.length ? list.map((c, i) =>
        `<button class="row" data-pick="${i}">${have.has(c.code) ? "✅" : "＋"} ${esc(c.name)}</button>`).join("") : `<p class="hint">${t("goNoCodes")}</p>`) +
        `<div class="btns"><button id="goBack">←</button></div>`);
      document.getElementById("goBack").onclick = sheet;
      document.querySelectorAll("#sheet [data-pick]").forEach((b) => b.onclick = () => {
        const c = list[+b.dataset.pick], l = cheats(g); if (l.some((x) => x.code === c.code)) return;
        l.push({ name: c.name, code: c.code, on: true }); saveCheats(g, l); push(); b.textContent = "✅ " + c.name; toast(t("goAdded"));
      });
    };
    if (found.length === 1) return show(found[0]);
    openSheet(`<h3>${t("goPickGame")}</h3>` + found.map((f, i) => `<button class="row" data-f="${i}">${esc(f.n)}</button>`).join("") + `<div class="btns"><button id="goBack">←</button></div>`);
    document.getElementById("goBack").onclick = sheet;
    document.querySelectorAll("#sheet button.row[data-f]").forEach((b) => b.onclick = () => show(found[+b.dataset.f]));
  }

  /* ---------- Screenshot: preview, download, send in the chat ---------- */
  async function toJpeg(png) {
    const img = await createImageBitmap(new Blob([png], { type: "image/png" }));
    const k = Math.max(1, Math.min(4, Math.floor(960 / Math.max(img.width, 1))));
    const c = document.createElement("canvas"); c.width = img.width * k; c.height = img.height * k;
    const x = c.getContext("2d"); x.imageSmoothingEnabled = false; x.drawImage(img, 0, 0, c.width, c.height);
    return await new Promise((res) => c.toBlob(res, "image/jpeg", 0.88));
  }
  let lastShot = null;
  window.addEventListener("message", async (e) => {
    if (!e.data || e.data.type !== "shot") return;
    try { if (e.source !== frame()) return; } catch (err) { return; }
    if (!e.data.png) return toast(t("goShotFail"));
    try { lastShot = await toJpeg(e.data.png); } catch (err) { return toast(t("goShotFail")); }
    try { window.kameiVibe && window.kameiVibe(30); } catch (err) {}
    const url = URL.createObjectURL(lastShot);
    openSheet(`<h3>${t("goShotTitle")}</h3><img src="${url}" alt="" style="width:100%;border-radius:12px;image-rendering:pixelated;margin-bottom:10px">
      <button class="row ok-row" id="goSend">${t("goSend")}</button>
      ${window.KAMEI_WEB ? `<a class="row" id="goDl" href="${url}" download="kamei-${Date.now()}.jpg" style="display:block;text-decoration:none;color:inherit">${t("goDownload")}</a>` : ""}`);
    document.getElementById("goSend").onclick = sendShot;
  });
  async function sendShot() {
    const sb = window.kameiSB, me = window.kameiMe && window.kameiMe();
    if (!sb || !me || !lastShot) return;
    const f = await sb.from("friendships").select("friend_id").eq("user_id", me.id);
    const ids = (f.data || []).map((x) => x.friend_id);
    const p = ids.length ? await sb.from("profiles").select("*").in("id", ids) : { data: [] };
    const fr = p.data || [];
    openSheet(`<h3>${t("goPickFriend")}</h3>` + (fr.length ? fr.map((x) => `<button class="friend" data-sf="${x.id}">${window.kameiAvatar(x, 40)}<span class="fi"><b>${esc(x.pseudo)}</b></span></button>`).join("") : `<p class="hint">${t("goNoFriends")}</p>`));
    document.querySelectorAll("#sheet [data-sf]").forEach((b) => b.onclick = async () => {
      b.disabled = true;
      const path = `${me.id}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}.jpg`;
      const up = await sb.storage.from("shots").upload(path, lastShot, { contentType: "image/jpeg" });
      if (up.error) { b.disabled = false; return toast(up.error.message || t("goShotFail"), 4000); }
      const r = await sb.rpc("chat_send", { to_id: b.dataset.sf, msg: "§img:" + path });
      if (!r.error) try { window.kameiPetEvent && window.kameiPetEvent("shot"); } catch (e) {} 
      if (r.error) { b.disabled = false; return toast(r.error.message, 4000); }
      closeSheet(); toast(t("goSent"));
    });
  }

  /* ---------- Button in the player bar + styles ---------- */
  const st = document.createElement("style");
  st.textContent = `.gochips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
    .gochips button { border: 0; border-radius: 12px; padding: 8px 12px; background: #23233a; color: var(--text); font: 600 13px Inter, sans-serif; }
    .gochips button.on { background: var(--tacc, #8fc63f); color: #0b0b12; }
    .gorange { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); margin: 6px 0; }
    .gorange input { flex: 1; margin: 0 !important; padding: 0 !important; accent-color: var(--tacc, #8fc63f); }`;
  document.head.appendChild(st);
  const bar = document.querySelector("#player .pbar");
  if (bar) { const b = document.createElement("button"); b.id = "goBtn"; b.textContent = "⚙️"; b.onclick = sheet; bar.insertBefore(b, document.getElementById("savesBtn")); }

  window.kameiGameOpts = { forGame, open: sheet };
})();

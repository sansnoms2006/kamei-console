/* Kamei Game Console — 🎵 Kamei Radio: music by Kamei's artist friends.
   The songs live on GitHub (the site's "music" folder): the admin adds them from the app with the GitHub key. */
(function () {
  const L = {
    fr: { navRadio: "Radio", title: "🎵 Kamei Radio", none: "Pas encore de musique. Bientôt les sons des artistes Kamei ici 🎧", add: "＋ Ajouter un morceau",
      shuffle: "Aléatoire", repeat: "Répéter", listen: "Écouter aussi sur", tracks: (n) => `${n} morceau${n > 1 ? "x" : ""}`, del: "Retirer", delQ: (t) => `Retirer « ${t} » de Kamei Radio ?`,
      fTitle: "Titre du morceau", fArtist: "Artiste", fMp3: "🎵 Fichier MP3", fCover: "🖼️ Pochette (carrée de préférence)", fLinks: "Liens de l'artiste (facultatif)",
      fOk: "L'artiste a composé ce morceau et m'a donné son accord pour le diffuser dans Kamei.", fGo: "Publier", fNeed: "Il faut le titre, l'artiste, le MP3 et l'accord de l'artiste.",
      fBig: "Le MP3 est trop gros (40 Mo maximum).", fSend: (p) => `Envoi sur GitHub… ${p}`, fDone: "Morceau publié 🎉 Il arrive pour tout le monde dans 1 à 2 minutes.", noKey: "Ajoute d'abord ta clé GitHub (📦 Publier → 🔑).",
      paused: "Musique en pause pendant le jeu ⏸️", autoAdm: "▶️ Lancer la musique à l'ouverture de l'appli (pour tout le monde)", autoMe: "🎶 Musique au démarrage", autoOn: "Musique au démarrage activée", autoOff: "Plus de musique au démarrage", soon: "Le morceau arrive (encore 1 à 2 minutes)…" },
    nl: { navRadio: "Radio", title: "🎵 Kamei Radio", none: "Nog geen muziek. Binnenkort de nummers van Kamei-artiesten hier 🎧", add: "＋ Nummer toevoegen",
      shuffle: "Shuffle", repeat: "Herhalen", listen: "Luister ook op", tracks: (n) => `${n} nummer${n > 1 ? "s" : ""}`, del: "Verwijderen", delQ: (t) => `« ${t} » uit Kamei Radio verwijderen?`,
      fTitle: "Titel van het nummer", fArtist: "Artiest", fMp3: "🎵 MP3-bestand", fCover: "🖼️ Hoes (liefst vierkant)", fLinks: "Links van de artiest (optioneel)",
      fOk: "De artiest heeft dit nummer gemaakt en geeft toestemming om het in Kamei te laten horen.", fGo: "Publiceren", fNeed: "Titel, artiest, MP3 en toestemming van de artiest zijn nodig.",
      fBig: "De MP3 is te groot (max. 40 MB).", fSend: (p) => `Naar GitHub sturen… ${p}`, fDone: "Nummer gepubliceerd 🎉 Over 1 à 2 minuten voor iedereen beschikbaar.", noKey: "Voeg eerst je GitHub-sleutel toe (📦 Publiceren → 🔑).",
      paused: "Muziek gepauzeerd tijdens het spel ⏸️", autoAdm: "▶️ Muziek starten bij het openen van de app (voor iedereen)", autoMe: "🎶 Muziek bij het opstarten", autoOn: "Muziek bij het opstarten aan", autoOff: "Geen muziek meer bij het opstarten", soon: "Het nummer komt eraan (nog 1 à 2 minuten)…" },
    en: { navRadio: "Radio", title: "🎵 Kamei Radio", none: "No music yet. Songs by Kamei artists coming soon 🎧", add: "＋ Add a song",
      shuffle: "Shuffle", repeat: "Repeat", listen: "Also listen on", tracks: (n) => `${n} song${n > 1 ? "s" : ""}`, del: "Remove", delQ: (t) => `Remove « ${t} » from Kamei Radio?`,
      fTitle: "Song title", fArtist: "Artist", fMp3: "🎵 MP3 file", fCover: "🖼️ Cover (square is best)", fLinks: "Artist links (optional)",
      fOk: "The artist made this song and agreed to have it played in Kamei.", fGo: "Publish", fNeed: "Title, artist, MP3 and the artist's agreement are needed.",
      fBig: "The MP3 is too big (40 MB max).", fSend: (p) => `Sending to GitHub… ${p}`, fDone: "Song published 🎉 Everyone gets it in 1 to 2 minutes.", noKey: "Add your GitHub key first (📦 Publish → 🔑).",
      paused: "Music paused while playing ⏸️", autoAdm: "▶️ Start the music when the app opens (for everyone)", autoMe: "🎶 Music on startup", autoOn: "Music on startup turned on", autoOff: "No more music on startup", soon: "The song is on its way (1 to 2 more minutes)…" },
  };
  for (const k in L) Object.assign(I18N[k], { navRadio: L[k].navRadio });
  const X = () => L[lang] || L.fr;
  const GH = window.KameiGH, me = () => window.kameiMe && window.kameiMe();
  const PL = "docs/music/playlist.json";
  const fileUrl = (f) => (GH ? GH.site : "") + "music/" + encodeURIComponent(f);
  const LINKS = [["spotify", "Spotify", "#1DB954"], ["deezer", "Deezer", "#A238FF"], ["youtube", "YouTube", "#FF0033"], ["soundcloud", "SoundCloud", "#FF5500"], ["instagram", "Instagram", "#E1306C"], ["tiktok", "TikTok", "#25F4EE"]];

  const st = document.createElement("style");
  st.textContent = `
  .rnow { display: grid; grid-template-columns: 112px 1fr; gap: 14px; align-items: center; padding: 14px; border-radius: 20px; margin-bottom: 14px;
    background: radial-gradient(120% 120% at 0 0, color-mix(in srgb, var(--tacc, #9BD14B) 28%, transparent), transparent 60%), var(--panel, #161a20); border: 1px solid var(--line); }
  .rnow .cv { width: 112px; height: 112px; border-radius: 14px; object-fit: cover; background: #23233a; display: grid; place-items: center; font-size: 44px; box-shadow: 0 10px 24px rgba(0,0,0,.45); }
  .rnow b { display: block; font-size: 18px; line-height: 1.25; } .rnow small { color: var(--muted); font-size: 13px; }
  .rbar { position: relative; height: 6px; border-radius: 4px; background: rgba(255,255,255,.12); margin: 12px 0 4px; cursor: pointer; touch-action: none; }
  .rbar i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 4px; background: var(--tacc, #9BD14B); }
  .rtime { display: flex; justify-content: space-between; font: 600 11px Inter, sans-serif; color: var(--muted); font-variant-numeric: tabular-nums; }
  .rctl { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 8px; grid-column: 1 / -1; }
  .rctl button { width: 46px; height: 46px; border-radius: 50%; border: 0; background: rgba(255,255,255,.08); color: var(--text); font-size: 18px; display: grid; place-items: center; }
  .rctl button.big { width: 62px; height: 62px; background: var(--tacc, #9BD14B); color: #0b0b12; font-size: 24px; }
  .rctl button.on { color: var(--tacc, #9BD14B); box-shadow: inset 0 0 0 2px var(--tacc, #9BD14B); }
  .rlinks { grid-column: 1 / -1; display: flex; gap: 6px; flex-wrap: wrap; align-items: center; font-size: 12px; color: var(--muted); }
  .rlinks a { padding: 6px 10px; border-radius: 999px; font: 700 12px Inter, sans-serif; color: #fff; text-decoration: none; }
  .rtrk { display: flex; gap: 12px; align-items: center; width: 100%; padding: 8px; border: 0; border-radius: 14px; background: rgba(255,255,255,.035); color: var(--text); text-align: left; font: inherit; margin-bottom: 6px; }
  .rtrk.cur { background: color-mix(in srgb, var(--tacc, #9BD14B) 16%, transparent); }
  .rtrk img, .rtrk .ph { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; flex: none; background: #23233a; display: grid; place-items: center; }
  .rtrk span { flex: 1; min-width: 0; } .rtrk b { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .rtrk small { color: var(--muted); }
  .rtrk em { font-style: normal; color: var(--muted); font-size: 12px; font-variant-numeric: tabular-nums; }
  #rMini { position: fixed; left: 8px; right: 8px; bottom: calc(env(safe-area-inset-bottom) + 72px); z-index: 29; display: none; align-items: center; gap: 10px; padding: 6px 8px 6px 6px;
    border-radius: 14px; background: rgba(24,26,32,.96); border: 1px solid var(--line); box-shadow: 0 8px 24px rgba(0,0,0,.4); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); overflow: hidden; }
  body.radio-on #rMini { display: flex; }
  body.radio-on { padding-bottom: 64px; }
  body.radio-on .fab { bottom: calc(env(safe-area-inset-bottom) + 140px) !important; }
  #rMini img, #rMini .ph { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; flex: none; background: #23233a; display: grid; place-items: center; }
  #rMini span { flex: 1; min-width: 0; font-size: 13px; } #rMini b { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #rMini small { color: var(--muted); white-space: nowrap; }
  #rMini button { width: 40px; height: 40px; border-radius: 50%; border: 0; background: none; color: var(--text); font-size: 18px; }
  #rMini i { position: absolute; left: 0; bottom: 0; height: 2px; background: var(--tacc, #9BD14B); }
  .rauto { display: flex; gap: 10px; align-items: center; padding: 10px 12px; border-radius: 14px; background: rgba(255,255,255,.035); margin: 10px 0; font-size: 13.5px; font-weight: 600; }
  .rauto span { flex: 1; } .rauto input { width: 22px; height: 22px; margin: 0; accent-color: var(--tacc, #9BD14B); }
  .rform label { display: block; font-size: 12.5px; font-weight: 700; color: var(--muted); margin: 10px 0 4px; }
  .rform input[type=text], .rform input:not([type]) { width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--line); background: #0f1115; color: var(--text); font: 500 15px Inter, sans-serif; }`;
  document.head.appendChild(st);

  /* ---------- playlist (GitHub) ---------- */
  let list = [], loaded = false;
  async function loadList() {
    let remote = null;
    try { remote = GH ? await GH.readJSON(PL) : null; } catch (e) {}
    let local = null; try { local = JSON.parse(localStorage.getItem("kamei-radio-pl") || "null"); } catch (e) {}
    // GitHub keeps old answers a few minutes: the copy saved right after publishing wins if it is newer
    const pick = local && (!remote || (local.updated || "") > (remote.updated || "")) ? local : remote;
    list = (pick && pick.tracks) || [];
    loaded = true;
    return list;
  }

  /* ---------- player ---------- */
  const audio = new Audio(); audio.preload = "none";
  let idx = -1, shuffle = false, repeat = false, view = null;
  try { shuffle = localStorage.getItem("kamei-radio-shuffle") === "1"; } catch (e) {}
  const cur = () => list[idx];
  const fmt = (s) => (isFinite(s) && s > 0 ? Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0") : "0:00");
  const cover = (t) => (t && t.cover ? fileUrl(t.cover) : "");
  function playAt(i) {
    if (!list.length) return;
    idx = (i + list.length) % list.length;
    const t = cur();
    audio.src = fileUrl(t.file);
    audio.play().catch(() => {});
    document.body.classList.add("radio-on");
    try {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: t.title, artist: t.artist, album: "Kamei Radio", artwork: t.cover ? [{ src: cover(t), sizes: "512x512", type: "image/jpeg" }] : [] });
        navigator.mediaSession.setActionHandler("nexttrack", next);
        navigator.mediaSession.setActionHandler("previoustrack", prev);
        navigator.mediaSession.setActionHandler("play", () => audio.play());
        navigator.mediaSession.setActionHandler("pause", () => audio.pause());
      }
    } catch (e) {}
    paint();
  }
  function next() {
    if (!list.length) return;
    if (shuffle && list.length > 1) { let n; do n = Math.floor(Math.random() * list.length); while (n === idx); playAt(n); }
    else playAt(idx + 1);
  }
  function prev() { if (audio.currentTime > 4) { audio.currentTime = 0; return; } playAt(idx - 1); }
  function toggle() { if (idx < 0) return playAt(shuffle ? Math.floor(Math.random() * list.length) : 0); audio.paused ? audio.play().catch(() => {}) : audio.pause(); }
  audio.addEventListener("ended", () => (repeat ? (audio.currentTime = 0, audio.play()) : next()));
  audio.addEventListener("play", paint); audio.addEventListener("pause", paint);
  audio.addEventListener("error", () => { if (idx >= 0 && audio.src) toast(X().soon, 3000); });
  audio.addEventListener("timeupdate", tick);
  function tick() {
    const p = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    document.querySelectorAll("[data-rprog]").forEach((el) => (el.style.width = p + "%"));
    const a = document.getElementById("rT1"), b = document.getElementById("rT2");
    if (a) a.textContent = fmt(audio.currentTime); if (b) b.textContent = fmt(audio.duration || (cur() && cur().dur));
  }

  /* ---------- mini player above the bottom bar ---------- */
  const mini = document.createElement("div"); mini.id = "rMini"; document.body.appendChild(mini);
  function paintMini() {
    const t = cur(); if (!t) return;
    mini.innerHTML = `${t.cover ? `<img src="${esc(cover(t))}" alt="">` : `<span class="ph">🎵</span>`}<span><b>${esc(t.title)}</b><small>${esc(t.artist)}</small></span>
      <button id="rmP" aria-label="play">${audio.paused ? "▶" : "⏸"}</button><button id="rmN" aria-label="next">⏭</button><button id="rmX" aria-label="close">✕</button><i data-rprog></i>`;
    mini.querySelector("#rmP").onclick = (e) => { e.stopPropagation(); toggle(); };
    mini.querySelector("#rmN").onclick = (e) => { e.stopPropagation(); next(); };
    mini.querySelector("#rmX").onclick = (e) => { e.stopPropagation(); audio.pause(); document.body.classList.remove("radio-on"); };
    mini.onclick = () => window.kameiNav && window.kameiNav.go("radio");
    tick();
  }

  /* ---------- the Radio tab ---------- */
  async function render(v) {
    view = v;
    if (!loaded || !v.querySelector(".rlist")) { v.innerHTML = `<p class="hint">…</p>`; await loadList(); }
    paint();
  }
  function paint() {
    paintMini();
    const v = view; if (!v || !v.isConnected) return;
    const x = X(), t = cur() || list[0], u = me();
    const links = t && t.links ? LINKS.filter(([k]) => t.links[k]).map(([k, n, c]) => `<a href="${esc(t.links[k])}" target="_blank" rel="noopener" data-ext="${esc(t.links[k])}" style="background:${c}">${n}</a>`).join("") : "";
    v.innerHTML = `${u && u.is_admin ? `<div style="text-align:right;margin:-4px 0 10px"><button class="mini" id="rAdd">${x.add}</button></div>` : ""}
      ${list.length ? `<div class="rnow ${!audio.paused ? "on" : ""}">${t && t.cover ? `<img class="cv" src="${esc(cover(t))}" alt="">` : `<div class="cv">🎵</div>`}
        <div><small>${x.title}</small><b>${esc(t.title)}</b><small>${esc(t.artist)}</small>
          <div class="rbar" id="rBar"><i data-rprog></i></div><div class="rtime"><span id="rT1">0:00</span><span id="rT2">${fmt(t.dur)}</span></div></div>
        <div class="rctl"><button id="rSh" class="${shuffle ? "on" : ""}" title="${x.shuffle}">🔀</button><button id="rPv">⏮</button>
          <button class="big" id="rPl">${audio.paused || idx < 0 ? "▶" : "⏸"}</button><button id="rNx">⏭</button><button id="rRp" class="${repeat ? "on" : ""}" title="${x.repeat}">🔁</button></div>
        ${links ? `<div class="rlinks">${x.listen} ${links}</div>` : ""}</div>
      <h4 style="margin:4px 0 8px;font-size:12px;color:var(--muted);letter-spacing:.5px">${x.tracks(list.length).toUpperCase()}</h4>
      <div class="rlist">${list.map((s, i) => `<button class="rtrk ${i === idx ? "cur" : ""}" data-i="${i}">${s.cover ? `<img src="${esc(cover(s))}" alt="" loading="lazy">` : `<span class="ph">🎵</span>`}
        <span><b>${i === idx && !audio.paused ? "🔊 " : ""}${esc(s.title)}</b><small>${esc(s.artist)}</small></span><em>${fmt(s.dur)}</em>
        ${u && u.is_admin ? `<em data-del="${i}" style="padding:6px">🗑️</em>` : ""}</button>`).join("")}</div>`
      : `<div class="vlogin"><p>${x.none}</p></div><div class="rlist"></div>`}
      ${autoAdmin() && list.length ? `<label class="rauto"><span>${x.autoMe}</span><input type="checkbox" id="rAutoMe" ${autoMine() ? "checked" : ""}></label>` : ""}
      ${u && u.is_admin ? `<label class="rauto"><span>${x.autoAdm}</span><input type="checkbox" id="rAutoAdm" ${autoAdmin() ? "checked" : ""}></label>` : ""}`;
    const on = (id, fn) => { const b = v.querySelector("#" + id); if (b) b.onclick = fn; };
    on("rAdd", addForm); on("rPl", toggle); on("rNx", next); on("rPv", prev);
    on("rSh", () => { shuffle = !shuffle; try { localStorage.setItem("kamei-radio-shuffle", shuffle ? "1" : "0"); } catch (e) {} paint(); });
    on("rRp", () => { repeat = !repeat; paint(); });
    v.querySelectorAll("[data-i]").forEach((b) => b.onclick = (e) => { if (e.target.dataset.del) return removeTrack(+e.target.dataset.del); +b.dataset.i === idx ? toggle() : playAt(+b.dataset.i); });
    v.querySelectorAll("[data-ext]").forEach((a) => a.onclick = (e) => { if (window.KameiNative && window.KameiNative.openUrl) { e.preventDefault(); window.KameiNative.openUrl(a.dataset.ext); } });
    const am = v.querySelector("#rAutoMe");
    if (am) am.onchange = () => { try { localStorage.setItem("kamei-radio-auto", am.checked ? "1" : "0"); } catch (e) {} toast(am.checked ? x.autoOn : x.autoOff); };
    const aa = v.querySelector("#rAutoAdm");
    if (aa) aa.onchange = async () => {
      const sb = window.kameiSB, c = (window.kameiConfig && window.kameiConfig()) || {};
      const f = Object.assign({}, c.features || {}, { radio_auto: aa.checked });
      const r = sb ? await sb.from("app_config").update({ features: f }).eq("id", 1) : { error: null };
      if (r.error) { aa.checked = !aa.checked; return toast(r.error.message, 4000); }
      c.features = f; try { localStorage.setItem("kamei-cfg", JSON.stringify(c)); } catch (e) {}
      toast(aa.checked ? x.autoOn : x.autoOff); paint();
    };
    const bar = v.querySelector("#rBar");
    if (bar) bar.onpointerdown = (e) => { if (idx < 0 || !audio.duration) return; const r = bar.getBoundingClientRect(); audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration; };
    tick();
  }

  /* ---------- admin: add / remove a song (stored on GitHub) ---------- */
  async function squareJpg(file, size) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const s = Math.min(img.naturalWidth, img.naturalHeight), c = document.createElement("canvas"); c.width = c.height = size;
      c.getContext("2d").drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, size, size);
      return await new Promise((res) => c.toBlob(res, "image/jpeg", 0.86));
    } finally { URL.revokeObjectURL(url); }
  }
  const duration = (file) => new Promise((res) => { const a = new Audio(), u = URL.createObjectURL(file); a.preload = "metadata"; a.onloadedmetadata = () => { res(Math.round(a.duration) || 0); URL.revokeObjectURL(u); }; a.onerror = () => res(0); a.src = u; });
  async function savePlaylist(tracks, files, deletes, msg, prog) {
    const pl = { updated: new Date().toISOString(), tracks };
    await GH.commit(files.concat([{ path: PL, text: JSON.stringify(pl, null, 2) }]), msg, deletes, prog);
    try { localStorage.setItem("kamei-radio-pl", JSON.stringify(pl)); } catch (e) {}
    list = tracks;
  }
  function addForm() {
    const x = X();
    if (!GH || !GH.token()) return toast(x.noKey, 4000);
    openSheet(`<h3>${x.add}</h3><div class="rform">
      <label>${x.fTitle}</label><input id="raT" maxlength="80"><label>${x.fArtist}</label><input id="raA" maxlength="60">
      <label>${x.fMp3}</label><input type="file" id="raF" accept="audio/mpeg,audio/mp3,.mp3,audio/*">
      <label>${x.fCover}</label><input type="file" id="raC" accept="image/*">
      <label>${x.fLinks}</label>${LINKS.map(([k, n]) => `<input id="raL-${k}" placeholder="${n} : https://…" inputmode="url" style="margin-bottom:6px">`).join("")}
      <label style="display:flex;gap:10px;align-items:flex-start;color:var(--text);font-weight:600"><input type="checkbox" id="raOk" style="width:auto;margin-top:3px"> ${x.fOk}</label>
      <p class="hint err" id="raE"></p><div class="btns"><button id="raB">←</button><button class="ok" id="raG">${x.fGo}</button></div></div>`);
    const $s = (id) => document.getElementById(id);
    $s("raB").onclick = closeSheet;
    $s("raF").onchange = () => { const f = $s("raF").files[0]; if (f && !$s("raT").value) $s("raT").value = f.name.replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ").trim().slice(0, 80); };
    $s("raG").onclick = async () => {
      const title = $s("raT").value.trim(), artist = $s("raA").value.trim(), f = $s("raF").files[0], c = $s("raC").files[0];
      if (!title || !artist || !f || !$s("raOk").checked) { $s("raE").textContent = x.fNeed; return; }
      if (f.size > 40 * 1048576) { $s("raE").textContent = x.fBig; return; }
      $s("raG").disabled = true;
      try {
        await loadList();
        const id = (artist + "-" + title).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) + "-" + Date.now().toString(36);
        const files = [{ path: `docs/music/${id}.mp3`, load: () => GH.toB64(f) }];
        let coverName = null;
        if (c) { const jb = await squareJpg(c, 600); coverName = id + ".jpg"; files.push({ path: `docs/music/${coverName}`, load: () => GH.toB64(jb) }); }
        const links = {}; for (const [k] of LINKS) { const u = $s("raL-" + k).value.trim(); if (/^https?:\/\//.test(u)) links[k] = u; }
        const track = { id, title, artist, file: id + ".mp3", cover: coverName, dur: await duration(f), links, added: new Date().toISOString() };
        await savePlaylist(list.concat([track]), files, [], `Kamei Radio : ${artist} – ${title}`, (a, n) => ($s("raE").textContent = x.fSend(`${a}/${n + 1}`)));
        closeSheet(); toast(x.fDone, 6000); paint();
      } catch (e) { $s("raE").textContent = (e && e.message) || "Erreur"; $s("raG").disabled = false; }
    };
  }
  async function removeTrack(i) {
    const x = X(), t = list[i];
    if (!t || !GH || !GH.token()) return toast(x.noKey, 4000);
    if (!confirm(x.delQ(t.title))) return;
    try {
      if (i === idx) { audio.pause(); idx = -1; document.body.classList.remove("radio-on"); }
      const rest = list.filter((_, k) => k !== i);
      await savePlaylist(rest, [], [`docs/music/${t.file}`].concat(t.cover ? [`docs/music/${t.cover}`] : []), `Kamei Radio : retrait de ${t.title}`);
      if (idx > i) idx--;
      paint();
    } catch (e) { toast((e && e.message) || "Erreur", 4000); }
  }

  /* ---------- music when the app opens ---------- */
  const autoAdmin = () => !!(((window.kameiConfig && window.kameiConfig()) || {}).features || {}).radio_auto;
  const autoMine = () => { try { return localStorage.getItem("kamei-radio-auto") !== "0"; } catch (e) { return true; } };
  let autoDone = false;
  async function autostart() {
    if (autoDone || !autoAdmin() || !autoMine() || (window.kameiFeature && !window.kameiFeature("radio"))) return;
    autoDone = true;
    await loadList();
    if (!list.length || idx >= 0) return;
    const pl = document.getElementById("player");
    if (pl && getComputedStyle(pl).display !== "none") return;      // a game is already open
    const start = () => {
      if (idx >= 0 || (pl && getComputedStyle(pl).display !== "none")) return;
      audio.volume = 0; playAt(shuffle || list.length > 1 ? Math.floor(Math.random() * list.length) : 0);
      let v = 0; const fade = setInterval(() => { v = Math.min(1, v + 0.08); audio.volume = v; if (v >= 1) clearInterval(fade); }, 120);
    };
    start();
    // browsers refuse sound before the first touch: try again at the first tap anywhere
    setTimeout(() => {
      if (!audio.paused) return;
      idx = -1; document.body.classList.remove("radio-on");
      const once = () => { document.removeEventListener("pointerdown", once, true); setTimeout(start, 350); };
      document.addEventListener("pointerdown", once, true);
    }, 700);
  }
  document.addEventListener("kamei-config", () => setTimeout(autostart, 400));
  setTimeout(autostart, 3000);

  // a game starts: the music pauses (it would cover the game's sound)
  function pause() { if (!audio.paused) { audio.pause(); toast(X().paused, 2500); } }

  // leaving the app (home button, other app, screen off): the music stops, even in the background
  const stopOut = () => { if (!audio.paused) audio.pause(); };
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") stopOut(); });
  window.addEventListener("pagehide", stopOut);
  // the APK calls window.kameiPause() as soon as the app goes to the background
  const wrapPause = () => {
    const old = window.kameiPause;
    if (old && old.kameiRadio) return;
    const fn = function () { stopOut(); return old ? old.apply(this, arguments) : undefined; };
    fn.kameiRadio = true; window.kameiPause = fn;
  };
  wrapPause(); setTimeout(wrapPause, 0); document.addEventListener("DOMContentLoaded", wrapPause);

  window.kameiRadio = { render, pause, playAt, toggle, next, list: () => list };
})();

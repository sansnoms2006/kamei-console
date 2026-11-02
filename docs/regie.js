/* Kamei Events — régie (PC) et sortie OBS.
   Régie : mosaïque de tous les joueurs (petite image), recherche par pseudo → À L'ANTENNE, aperçu, raccourcis,
           suivre le leader, duel, filtres, départ 3-2-1 synchronisé.
   OBS   : seulement le(s) joueur(s) à l'antenne, en grand, avec le bandeau pseudo / badge / chrono / place. */
(function () {
  const SUPABASE_URL = "https://nbhfagjmtmzpvxajgxga.supabase.co";
  const SUPABASE_KEY = "sb_publishable_9vA0LkKaCl_ofBtmOuJBDg_7jOGF-a0";
  const MODE = document.body.dataset.mode === "obs" ? "obs" : "regie";
  const P = new URLSearchParams(location.search);
  let EID = +P.get("e") || 0, KEY = P.get("k") || "";
  const lang = (() => { try { return localStorage.getItem("kamei-lang") || "fr"; } catch (e) { return "fr"; } })();
  const L = {
    fr: { title: "Régie", light: "⚡ Mode léger", lightT: "Moins de calcul pour ton PC : petites images dans la régie, l'image HD seulement dans OBS", search: "🔎 Pseudo → à l'antenne (Entrée)", all: "Tous", running: "En course", done: "Fini", top3: "Top 3", badges: "Badges", follow: "Suivre le leader", duel: "Duel",
      go: "▶ Départ 3-2-1", obs: "📺 Sortie OBS", preview: "APERÇU", air: "À L'ANTENNE", ranking: "Classement", noAdmin: "La régie est réservée à l'admin. Connecte-toi d'abord dans Kamei Console (version web), sur ce PC.",
      pick: "Choisis le tournoi", none: "Aucun tournoi en cours ou à venir.", offline: "pas en jeu", wait: "en attente", dnf: "abandon",
      goQ: (n, s) => `Départ dans 12 secondes pour ${n} joueur${n > 1 ? "s" : ""}${s ? " (série sélectionnée)" : " (tous les présents)"} ?`, goOk: "Départ lancé ! 3-2-1…",
      obsHint: "Dans OBS : Sources → + → Navigateur → colle ce lien (largeur 1920, hauteur 1080). Garde ce lien pour toi.", copy: "Copier", copied: "Copié ✅", close: "Fermer",
      reset: "↺ Relancer son chrono", resetQ: (p) => `Effacer le chrono de ${p} ? Il pourra repartir au prochain départ.`, help: "Clic : aperçu · Double-clic : antenne · 1-8 : aperçu · Espace : aperçu → antenne · Ctrl+clic : série · ←/→ : pages · Échap : vider l'antenne",
      standby: "Kamei Events", series: (n) => `Série : ${n}`, clearSel: "Vider", empty: "Personne d'inscrit pour l'instant.", romBad: "⚠️ version différente", screen: "🎥 écran partagé" },
    nl: { title: "Regie", light: "⚡ Lichte modus", lightT: "Minder werk voor je pc: kleine beelden in de regie, HD alleen in OBS", search: "🔎 Pseudo → in beeld (Enter)", all: "Alle", running: "Bezig", done: "Klaar", top3: "Top 3", badges: "Badges", follow: "Leider volgen", duel: "Duel",
      go: "▶ Start 3-2-1", obs: "📺 OBS-uitgang", preview: "VOORBEELD", air: "IN BEELD", ranking: "Klassement", noAdmin: "De regie is voor de admin. Log eerst in bij Kamei Console (webversie) op deze pc.",
      pick: "Kies het toernooi", none: "Geen lopend of komend toernooi.", offline: "niet in spel", wait: "wacht", dnf: "opgegeven",
      goQ: (n, s) => `Start over 12 seconden voor ${n} speler${n > 1 ? "s" : ""}${s ? " (gekozen reeks)" : " (alle aanwezigen)"}?`, goOk: "Start gegeven! 3-2-1…",
      obsHint: "In OBS: Bronnen → + → Browser → plak deze link (breedte 1920, hoogte 1080). Hou deze link voor jezelf.", copy: "Kopiëren", copied: "Gekopieerd ✅", close: "Sluiten",
      reset: "↺ Chrono herstarten", resetQ: (p) => `Chrono van ${p} wissen?`, help: "Klik: voorbeeld · Dubbelklik: in beeld · 1-8: voorbeeld · Spatie: voorbeeld → beeld · Ctrl+klik: reeks · ←/→: pagina's · Esc: beeld leegmaken",
      standby: "Kamei Events", series: (n) => `Reeks: ${n}`, clearSel: "Leegmaken", empty: "Nog niemand ingeschreven.", romBad: "⚠️ andere versie", screen: "🎥 scherm gedeeld" },
    en: { title: "Control room", light: "⚡ Light mode", lightT: "Less work for your PC: small pictures in the control room, HD only in OBS", search: "🔎 Player name → on air (Enter)", all: "All", running: "Running", done: "Done", top3: "Top 3", badges: "Badges", follow: "Follow the leader", duel: "Duel",
      go: "▶ Start 3-2-1", obs: "📺 OBS output", preview: "PREVIEW", air: "ON AIR", ranking: "Ranking", noAdmin: "The control room is for the admin. Log in to Kamei Console (web version) on this PC first.",
      pick: "Pick the tournament", none: "No live or upcoming tournament.", offline: "not in game", wait: "waiting", dnf: "gave up",
      goQ: (n, s) => `Start in 12 seconds for ${n} player${n > 1 ? "s" : ""}${s ? " (selected heat)" : " (everyone present)"}?`, goOk: "Start launched! 3-2-1…",
      obsHint: "In OBS: Sources → + → Browser → paste this link (width 1920, height 1080). Keep this link to yourself.", copy: "Copy", copied: "Copied ✅", close: "Close",
      reset: "↺ Restart their timer", resetQ: (p) => `Erase ${p}'s timer?`, help: "Click: preview · Double-click: on air · 1-8: preview · Space: preview → air · Ctrl+click: heat · ←/→: pages · Esc: clear air",
      standby: "Kamei Events", series: (n) => `Heat: ${n}`, clearSel: "Clear", empty: "Nobody signed up yet.", romBad: "⚠️ different version", screen: "🎥 screen shared" },
  };
  const X = L[lang] || L.fr;
  const MEDAL = ["", "🥇", "🥈", "🥉"];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmt = (ms) => {
    if (ms == null) return "—";
    const neg = ms < 0; ms = Math.abs(ms);
    const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, c = Math.floor(ms / 10) % 100;
    return (neg ? "-" : "") + (h ? h + ":" + String(m).padStart(2, "0") : String(m).padStart(2, "0")) + ":" + String(s).padStart(2, "0") + "." + String(c).padStart(2, "0");
  };
  const $ = (id) => document.getElementById(id);
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: MODE === "obs" ? { persistSession: false, autoRefreshToken: false } : { persistSession: true, autoRefreshToken: true } });
  const rid = MODE + "-" + Math.random().toString(36).slice(2, 10);

  /* ---------- state ---------- */
  let board = null, off = 0;                 // event_board + server clock offset
  const present = {};                         // uid -> { live, sid, seen, screen }
  const conns = {};                           // uid -> { pc, stream, q, sid, at }
  let preview = null, air = [], duel = false, follow = false, filter = "all", page = 0, sel = new Set();
  const PER = 16;
  let ch = null, ICE = [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }];

  function channel(eid, onMsg) {
    if (window.kameiEvTransport) return window.kameiEvTransport("ev-" + eid, onMsg);
    const c = sb.channel("kamei-play-ev-" + eid, { config: { broadcast: { self: false } } });
    c.on("broadcast", { event: "sig" }, (m) => onMsg(m.payload));
    const ready = new Promise((res) => c.subscribe((st) => { if (st === "SUBSCRIBED") res(); }));
    return { send: async (p) => { await ready; return c.send({ type: "broadcast", event: "sig", payload: p }); }, close: () => { try { sb.removeChannel(c); } catch (e) {} } };
  }
  const send = (p) => ch && ch.send(Object.assign({ from: "rx", rid, k: KEY }, p));

  /* ---------- players ---------- */
  const players = () => (board && board.players) || [];
  const byId = (id) => players().find((p) => p.id === id);
  const now = () => Date.now() + off;
  function rankOf(p) {
    if (!p || p.status !== "done") return null;
    return players().filter((x) => x.status === "done" && x.ms < p.ms).length + 1;
  }
  function chrono(p) {
    if (!p || !p.status) return null;
    if (p.status === "done") return fmt(p.ms);
    if (p.status === "dnf") return X.dnf;
    return fmt(now() - Date.parse(p.go_at));
  }
  const leader = () => players().filter((x) => x.status === "done").sort((a, b) => a.ms - b.ms)[0];

  /* ---------- WebRTC: one connection per player we want to see ---------- */
  // ⚡ light mode (default): the régie only receives small pictures — the big HD picture is decoded only by OBS,
  // and nothing is received while the régie tab is in the background (so your PC keeps its power for the game + the stream)
  let light = (() => { try { return localStorage.getItem("kamei-regie-light") !== "off"; } catch (e) { return true; } })();
  const wantQ = (uid) => (MODE === "obs" ? "high" : !light && (uid === preview || air.includes(uid)) ? "high" : "low");
  function desired() {
    if (MODE === "regie" && document.hidden) return [];
    const d = new Set(air);
    if (MODE === "regie") { if (preview) d.add(preview); for (const p of visible()) d.add(p.id); }
    return [...d].filter((u) => present[u] && present[u].live);
  }
  let helloBudget = 0;
  function reconcile() {
    const want = new Set(desired());
    for (const uid of Object.keys(conns)) if (!want.has(uid) || !present[uid] || !present[uid].live || conns[uid].sid !== present[uid].sid) drop(uid, true);
    helloBudget = 6;
    for (const uid of want) {
      const c = conns[uid];
      if (!c) { if (helloBudget-- > 0) hello(uid); continue; }
      if (!c.pc && Date.now() - c.at > 7000) { drop(uid, false); continue; }   // no answer: try again later
      const q = wantQ(uid);
      if (c.q !== q) { c.q = q; send({ kind: "q", to: uid, q }); }
    }
  }
  function hello(uid) {
    conns[uid] = { pc: null, stream: null, q: wantQ(uid), sid: present[uid].sid, at: Date.now() };
    send({ kind: "hello", to: uid, q: conns[uid].q });
  }
  function drop(uid, bye) {
    const c = conns[uid]; if (!c) return;
    delete conns[uid];
    if (bye) send({ kind: "bye", to: uid });
    try { c.pc && c.pc.close(); } catch (e) {}
    paintVideos();
  }
  async function onOffer(uid, data) {
    let c = conns[uid];
    if (!c) return;
    try { c.pc && c.pc.close(); } catch (e) {}
    const pc = c.pc = new RTCPeerConnection({ iceServers: ICE });
    pc.ontrack = (e) => { c.stream = e.streams[0] || new MediaStream([e.track]); paintVideos(); };
    pc.onicecandidate = (e) => { if (e.candidate) send({ kind: "ice", to: uid, data: e.candidate.toJSON() }); };
    pc.onconnectionstatechange = () => { if (["failed", "closed"].includes(pc.connectionState) && conns[uid] === c) { drop(uid, false); } };
    await pc.setRemoteDescription(data);
    await pc.setLocalDescription(await pc.createAnswer());
    send({ kind: "answer", to: uid, data: pc.localDescription.toJSON() });
  }
  async function onSig(m) {
    if (!m) return;
    if (m.from === "rg" && m.kind === "air" && MODE === "obs") { air = m.uids || []; reconcile(); paint(); return; }
    if (m.from !== "p" || !m.uid) return;
    if (!byId(m.uid)) { if (m.kind === "here") setTimeout(() => byId(m.uid) && onSig(m), 2500); return; }
    if (m.kind === "here") {
      const was = present[m.uid];
      present[m.uid] = { live: !!m.live, sid: m.sid, seen: Date.now(), screen: !!m.screen };
      if (!was || was.live !== !!m.live || was.sid !== m.sid) { reconcile(); paint(); }
      return;
    }
    if (m.kind === "gone") { delete present[m.uid]; drop(m.uid, false); paint(); return; }
    if (m.to !== rid) return;
    const c = conns[m.uid];
    if (m.kind === "offer") return onOffer(m.uid, m.data);
    if (m.kind === "ice" && c && c.pc && m.data) { try { await c.pc.addIceCandidate(m.data); } catch (e) {} }
  }

  /* ---------- data ---------- */
  async function loadBoard() {
    const t0 = Date.now();
    const r = await sb.rpc("event_board", { eid: EID });
    if (r.error || !r.data) return;
    board = r.data;
    off = Date.parse(board.now) - (t0 + Date.now()) / 2;
    if (MODE === "obs") { const a = (board.air && board.air.uids) || []; if (a.join() !== air.join()) { air = a; reconcile(); } }
    if (MODE === "regie" && follow) { const l = leader(); if (l && air[0] !== l.id) setAir([l.id]); }
    paint();
  }
  async function setAir(uids) {
    air = uids.filter(Boolean).slice(0, 2);
    reconcile(); paint();
    send({ kind: "noop" });
    if (ch) ch.send({ from: "rg", kind: "air", uids: air });
    await sb.rpc("event_set_air", { eid: EID, a: { uids: air } });
  }

  /* ======================= RÉGIE ======================= */
  function visibleAll() {
    let l = players().slice();
    if (filter === "running") l = l.filter((p) => p.status === "running");
    if (filter === "done") l = l.filter((p) => p.status === "done");
    if (filter === "top3") l = l.filter((p) => { const r = rankOf(p); return r && r <= 3; });
    if (filter === "badges") l = l.filter((p) => p.badge);
    // in game first, then by place, then by name
    return l.sort((a, b) => ((present[b.id] && present[b.id].live ? 1 : 0) - (present[a.id] && present[a.id].live ? 1 : 0)) || ((rankOf(a) || 999) - (rankOf(b) || 999)) || a.pseudo.localeCompare(b.pseudo));
  }
  function visible() { const l = visibleAll(); page = Math.max(0, Math.min(page, Math.ceil(l.length / PER) - 1)); return l.slice(page * PER, page * PER + PER); }
  const avatar = (p) => p.avatar_url ? `<img src="${SUPABASE_URL}/storage/v1/object/public/avatars/${esc(p.avatar_url)}" alt="">` : `<span style="background:${esc(p.color || "#8fc63f")}">${esc((p.pseudo || "?")[0].toUpperCase())}</span>`;

  function regieShell() {
    document.title = "Kamei — " + X.title;
    document.body.innerHTML = `
      <header><b class="logo">KAMEI<i>.</i>RÉGIE</b><span id="evName"></span>
        <div class="srch"><input id="q" list="qList" placeholder="${esc(X.search)}" autocomplete="off"><datalist id="qList"></datalist></div>
        <div class="chips" id="filters">${["all", "running", "done", "top3", "badges"].map((k) => `<button data-f="${k}">${X[k]}</button>`).join("")}</div>
        <label class="tg"><input type="checkbox" id="follow"> ${X.follow}</label><label class="tg"><input type="checkbox" id="duel"> ${X.duel}</label><label class="tg" title="${esc(X.lightT)}"><input type="checkbox" id="light"> ${X.light}</label>
        <span id="selBox"></span><button class="go" id="goBtn">${X.go}</button><button id="obsBtn">${X.obs}</button></header>
      <main><section id="mos"><div id="tiles"></div><div class="pager"><button id="pPrev">‹</button><span id="pNum"></span><button id="pNext">›</button><small>${esc(X.help)}</small></div></section>
        <aside><div class="mon pv"><div class="lab">${X.preview} <span id="pvName"></span><button id="pvReset" title="${esc(X.reset)}">↺</button></div><video id="pvVid" autoplay muted playsinline></video></div>
          <div class="mon air"><div class="lab">🔴 ${X.air} <span id="airName"></span></div><div class="airv" id="airVids"></div></div>
          <h3>${X.ranking}</h3><div id="rank"></div></aside></main><div id="modal"></div>`;
    document.querySelectorAll("#filters [data-f]").forEach((b) => b.onclick = () => { filter = b.dataset.f; page = 0; paint(); reconcile(); });
    $("light").checked = light;
    $("light").onchange = () => { light = $("light").checked; try { localStorage.setItem("kamei-regie-light", light ? "on" : "off"); } catch (e) {} reconcile(); };
    document.addEventListener("visibilitychange", () => setTimeout(reconcile, document.hidden ? 4000 : 0));
    $("follow").onchange = () => { follow = $("follow").checked; loadBoard(); };
    $("duel").onchange = () => { duel = $("duel").checked; if (!duel && air.length > 1) setAir([air[0]]); else if (duel && preview && !air.includes(preview)) setAir([air[0], preview]); };
    $("pPrev").onclick = () => { page--; paint(); reconcile(); };
    $("pNext").onclick = () => { page++; paint(); reconcile(); };
    $("goBtn").onclick = startRace;
    $("obsBtn").onclick = obsLink;
    $("pvReset").onclick = async () => {
      const p = byId(preview); if (!p || !confirm(X.resetQ(p.pseudo))) return;
      await sb.rpc("event_run_reset", { eid: EID, uid: p.id }); loadBoard();
    };
    const q = $("q");
    q.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); findAndAir(q.value); } if (e.key === "Escape") q.blur(); };
    q.onchange = () => { if (players().some((p) => p.pseudo === q.value)) findAndAir(q.value); };
    document.addEventListener("keydown", (e) => {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      const v = visible();
      if (/^[1-8]$/.test(e.key)) { const p = v[+e.key - 1]; if (p) { preview = p.id; reconcile(); paint(); } }
      else if (e.code === "Space") { e.preventDefault(); if (preview) setAir(duel ? [air[0] && air[0] !== preview ? air[0] : null, preview] : [preview]); }
      else if (e.key === "ArrowRight") { page++; paint(); reconcile(); }
      else if (e.key === "ArrowLeft") { page--; paint(); reconcile(); }
      else if (e.key === "Escape") setAir([]);
      else if (e.key === "/" ) { e.preventDefault(); q.focus(); q.select(); }
    });
  }
  function findAndAir(txt) {
    const s = String(txt || "").trim().toLowerCase(); if (!s) return;
    const l = players();
    const p = l.find((x) => x.pseudo.toLowerCase() === s) || l.find((x) => x.pseudo.toLowerCase().startsWith(s)) || l.find((x) => x.pseudo.toLowerCase().includes(s));
    if (!p) { $("q").classList.add("bad"); setTimeout(() => $("q").classList.remove("bad"), 600); return; }
    preview = p.id;
    const idx = visibleAll().findIndex((x) => x.id === p.id); if (idx >= 0) page = Math.floor(idx / PER);
    setAir(duel && air[0] && air[0] !== p.id ? [air[0], p.id] : [p.id]);
    $("q").value = ""; $("q").blur();
  }
  async function startRace() {
    const ids = sel.size ? [...sel] : players().filter((p) => p.checked_in || (board && board.kind)).filter((p) => p.status !== "done").map((p) => p.id);
    const n = sel.size ? sel.size : players().filter((p) => p.checked_in && p.status !== "done").length || players().length;
    if (!confirm(X.goQ(n, sel.size > 0))) return;
    const r = await sb.rpc("event_go", { eid: EID, uids: sel.size ? ids : null, delay_s: 12 });
    if (r.error) return alert(r.error.message);
    if (ch) ch.send({ from: "rg", kind: "go", at: r.data });
    sel.clear(); toastR(X.goOk); loadBoard();
  }
  async function obsLink() {
    const u = new URL("obs.html", location.href); u.searchParams.set("e", EID); u.searchParams.set("k", KEY);
    $("modal").innerHTML = `<div class="mbox"><b>${X.obs}</b><p>${esc(X.obsHint)}</p><input readonly value="${esc(u.href)}" id="obsUrl"><div><button id="obsCopy">${X.copy}</button><button id="obsClose">${X.close}</button></div></div>`;
    $("modal").classList.add("on");
    $("obsCopy").onclick = async () => { try { await navigator.clipboard.writeText(u.href); $("obsCopy").textContent = X.copied; } catch (e) { $("obsUrl").select(); } };
    $("obsClose").onclick = () => $("modal").classList.remove("on");
  }
  function toastR(t) { const d = document.createElement("div"); d.className = "rtoast"; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 3000); }

  function tileHTML(p, i) {
    const pr = present[p.id], live = pr && pr.live, r = rankOf(p);
    return `<div class="tile ${p.id === preview ? "pv" : ""} ${air.includes(p.id) ? "air" : ""} ${sel.has(p.id) ? "sel" : ""} ${live ? "" : "off"}" data-u="${p.id}">
      <video muted autoplay playsinline></video><div class="ph">${live ? "" : `📴 ${X.offline}`}</div>
      ${i < 8 ? `<kbd>${i + 1}</kbd>` : ""}${air.includes(p.id) ? `<em class="onair">${X.air}</em>` : ""}
      <div class="bar"><span class="av">${avatar(p)}</span><b>${esc(p.pseudo)}</b>${p.badge ? `<span>${MEDAL[p.badge]}</span>` : ""}${p.rom_ok === false ? `<span title="${esc(X.romBad)}">⚠️</span>` : ""}${pr && pr.screen ? "<span>🎥</span>" : ""}
        <i class="tm" data-t="${p.id}">${esc(chrono(p) || (p.checked_in ? "✅" : ""))}</i>${r ? `<u>${r <= 3 ? MEDAL[r] : "#" + r}</u>` : ""}</div></div>`;
  }
  let lastKey = "";
  function paint() {
    if (MODE === "obs") return paintObs();
    if (!board) return;
    $("evName").textContent = board.title + " · " + board.game;
    const v = visible(), all = visibleAll();
    const key = v.map((p) => [p.id, p.id === preview, air.includes(p.id), sel.has(p.id), present[p.id] && present[p.id].live, p.status, p.ms, p.badge, rankOf(p)].join(",")).join("|");
    if (key !== lastKey) {
      lastKey = key;
      $("tiles").innerHTML = v.length ? v.map(tileHTML).join("") : `<p class="empty">${X.empty}</p>`;
      $("tiles").querySelectorAll(".tile").forEach((el) => {
        const id = el.dataset.u;
        el.onclick = (e) => { if (e.ctrlKey || e.metaKey) { sel.has(id) ? sel.delete(id) : sel.add(id); } else preview = id; reconcile(); lastKey = ""; paint(); };
        el.ondblclick = () => { preview = id; setAir(duel && air[0] && air[0] !== id ? [air[0], id] : [id]); };
      });
    }
    $("pNum").textContent = `${page + 1} / ${Math.max(1, Math.ceil(all.length / PER))}`;
    document.querySelectorAll("#filters [data-f]").forEach((b) => b.classList.toggle("on", b.dataset.f === filter));
    $("qList").innerHTML = players().map((p) => `<option value="${esc(p.pseudo)}">`).join("");
    $("selBox").innerHTML = sel.size ? `<span class="selc">${X.series(sel.size)} <button id="selClr">${X.clearSel}</button></span>` : "";
    if ($("selClr")) $("selClr").onclick = () => { sel.clear(); lastKey = ""; paint(); };
    const pv = byId(preview);
    $("pvName").textContent = pv ? pv.pseudo : "—";
    $("airName").textContent = air.map((u) => (byId(u) || {}).pseudo || "?").join(" vs ");
    // ranking
    const done = players().filter((p) => p.status === "done").sort((a, b) => a.ms - b.ms), run = players().filter((p) => p.status === "running"), other = players().filter((p) => !p.status || p.status === "dnf");
    $("rank").innerHTML = done.map((p, i) => `<div class="rr" data-u="${p.id}"><b>${i < 3 ? MEDAL[i + 1] : i + 1}</b><span>${esc(p.pseudo)} ${p.badge ? MEDAL[p.badge] : ""}</span><i>${fmt(p.ms)}${p.rom_ok === false ? " ⚠️" : ""}</i></div>`).join("") +
      run.map((p) => `<div class="rr run" data-u="${p.id}"><b>⏱️</b><span>${esc(p.pseudo)} ${p.badge ? MEDAL[p.badge] : ""}</span><i data-t="${p.id}">${esc(chrono(p))}</i></div>`).join("") +
      other.map((p) => `<div class="rr dim" data-u="${p.id}"><b>·</b><span>${esc(p.pseudo)} ${p.badge ? MEDAL[p.badge] : ""}</span><i>${p.status === "dnf" ? X.dnf : p.checked_in ? "✅" : X.wait}</i></div>`).join("");
    $("rank").querySelectorAll(".rr").forEach((el) => { el.onclick = () => { preview = el.dataset.u; reconcile(); lastKey = ""; paint(); }; el.ondblclick = () => setAir([el.dataset.u]); });
    paintVideos();
  }
  function attach(v, stream) { if (v && v.srcObject !== stream) { v.srcObject = stream || null; if (stream) v.play().catch(() => {}); } }
  function paintVideos() {
    if (MODE === "obs") return paintObs();
    document.querySelectorAll("#tiles .tile").forEach((el) => { const c = conns[el.dataset.u]; attach(el.querySelector("video"), c && c.stream); el.classList.toggle("vid", !!(c && c.stream)); });
    attach($("pvVid"), conns[preview] && conns[preview].stream);
    const box = $("airVids");
    if (box.dataset.k !== air.join()) { box.dataset.k = air.join(); box.innerHTML = air.map((u) => `<video data-u="${u}" autoplay muted playsinline></video>`).join(""); box.classList.toggle("two", air.length > 1); }
    box.querySelectorAll("video").forEach((v) => attach(v, conns[v.dataset.u] && conns[v.dataset.u].stream));
  }

  /* ======================= OBS ======================= */
  function obsShell() {
    document.body.innerHTML = `<div id="stage"></div><div id="standby"></div>`;
  }
  function paintObs() {
    if (!board) return;
    const st = $("stage"), sbox = $("standby");
    const k = air.join() + "|" + air.map((u) => (byId(u) || {}).badge).join();
    if (st.dataset.k !== k) {
      st.dataset.k = k;
      st.className = air.length > 1 ? "two" : "";
      st.innerHTML = air.map((u) => { const p = byId(u) || { pseudo: "?" };
        return `<div class="cam" data-u="${u}"><video autoplay muted playsinline></video>
          <div class="lt"><span class="av">${avatar(p)}</span><div class="who"><b>${esc(p.pseudo)} ${p.badge ? MEDAL[p.badge] : ""}</b><small>${esc(board.title)}</small></div>
          <div class="clk"><i data-t="${u}"></i><u data-r="${u}"></u></div></div></div>`; }).join("");
    }
    st.querySelectorAll(".cam").forEach((el) => { const c = conns[el.dataset.u]; attach(el.querySelector("video"), c && c.stream); });
    st.querySelectorAll("[data-r]").forEach((el) => { const r = rankOf(byId(el.dataset.r)); el.textContent = r ? (r <= 3 ? MEDAL[r] : "#" + r) : ""; });
    sbox.style.display = air.length ? "none" : "";
    if (!air.length) {
      const done = players().filter((p) => p.status === "done").sort((a, b) => a.ms - b.ms).slice(0, 5);
      sbox.innerHTML = `<div class="sb"><b class="logo">KAMEI<i>.</i>EVENTS</b><h1>${esc(board.title)}</h1><p>${esc(board.game)}</p>
        ${done.map((p, i) => `<div class="rr"><b>${i < 3 ? MEDAL[i + 1] : i + 1}</b><span>${esc(p.pseudo)}</span><i>${fmt(p.ms)}</i></div>`).join("")}</div>`;
    }
  }

  /* ---------- live timers ---------- */
  function tick() {
    document.querySelectorAll("[data-t]").forEach((el) => { const p = byId(el.dataset.t); const c = chrono(p); if (c != null) el.textContent = c; });
    requestAnimationFrame(tick);
  }

  /* ---------- start ---------- */
  async function pickEvent() {
    const r = await sb.rpc("event_list", { from_ts: new Date(Date.now() - 3 * 86400000).toISOString(), to_ts: new Date(Date.now() + 60 * 86400000).toISOString() });
    const l = (r.data || []).filter((e) => ["open", "live"].includes(e.status));
    document.body.innerHTML = `<div class="pick"><b class="logo">KAMEI<i>.</i>RÉGIE</b><h2>${X.pick}</h2>${l.length ? l.map((e) => `<a href="?e=${e.id}">${esc(e.title)} <small>${esc(e.game)} · ${new Date(e.starts_at).toLocaleString()}</small></a>`).join("") : `<p>${X.none}</p>`}</div>`;
  }
  async function start() {
    if (MODE === "regie") {
      const s = await sb.auth.getSession();
      const uid = s.data && s.data.session && s.data.session.user && s.data.session.user.id;
      const prof = uid ? await sb.from("profiles").select("is_admin").eq("id", uid).maybeSingle() : null;
      if (!prof || !prof.data || !prof.data.is_admin) { document.body.innerHTML = `<div class="pick"><b class="logo">KAMEI<i>.</i>RÉGIE</b><p>${esc(X.noAdmin)}</p><a href="index.html">Kamei Console →</a></div>`; return; }
      if (!EID) return pickEvent();
      const k = await sb.rpc("event_rx_key", { eid: EID });
      if (k.error) { document.body.textContent = k.error.message; return; }
      KEY = k.data;
      regieShell();
    } else obsShell();
    try { const r = await sb.functions.invoke("kamei-discord", { body: { action: "ice" } }); if (r.data && Array.isArray(r.data.iceServers)) ICE = ICE.concat(r.data.iceServers); } catch (e) {}
    await loadBoard();
    if (MODE === "regie" && board && board.air && board.air.uids) air = board.air.uids;
    ch = channel(EID, onSig);
    send({ kind: "who" });
    setInterval(() => send({ kind: "who" }), 10000);
    setInterval(loadBoard, 2000);
    setInterval(() => { for (const u of Object.keys(present)) if (Date.now() - present[u].seen > 45000) { delete present[u]; drop(u, false); } reconcile(); }, 3000);
    requestAnimationFrame(tick);
    paint();
  }
  window.kameiRegie = { state: () => ({ board, present, conns, air, preview, page }), setAir, findAndAir };
  start();
})();

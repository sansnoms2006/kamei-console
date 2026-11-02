/* Kamei Game Console — Kamei Events, côté joueur :
   • salle de départ du speedrun (vérification du jeu, départ 3-2-1-GO synchronisé, chrono, 🏁 Fini) ;
   • l'image du jeu part vers la régie de l'admin (petite image dans la mosaïque, grande à l'antenne) ;
   • « 🎥 Partager mon jeu » pour les joueurs PC (Fortnite, CoD…) : partage d'écran vers la régie. */
(function () {
  const L = {
    fr: {
      lobby: "Salle de départ", lobbyGame: "Ton jeu", lobbyFound: "✅ Jeu trouvé sur ta console", lobbyNone: "❌ Ce jeu n'est pas sur ta console. Ajoute-le (même version) puis reviens ici.",
      lobbyBad: "⚠️ Ta version du jeu est différente de celle du tournoi. Prends la même version (catalogue ou admin), sinon ton temps ne compte pas.",
      lobbyCheck: "Vérification du jeu…", lobbyWait: "⏳ En attente du départ… Reste sur cet écran : le jeu se lance tout seul au moment du départ.",
      lobbyNotIn: "Tu n'es pas dans cette série. Attends la suivante 🙂", lobbyDone: (t) => `🏁 Ton temps : ${t}`, lobbyDnf: "Tu as abandonné cette course.",
      lobbyPlayers: (n) => `${n} joueur${n > 1 ? "s" : ""} au départ`, lobbyRules: "🔒 Pendant la course : pas de sauvegarde rapide, pas de retour arrière, pas d'accéléré, pas de codes de triche.",
      lobbyLeave: "Quitter la salle", go: "GO !", fin: "🏁 Fini", finQ: "Tu as fini le jeu ? Ton chrono s'arrête maintenant.", finOk: (t, p) => `🏁 Bravo ! Ton temps : ${t} (place provisoire : ${p})`,
      quitQ: "Abandonner la course ? Ton chrono sera perdu.", dnfOk: "Course abandonnée.", running: "Course en cours",
      share: "🎥 Partager mon jeu avec la régie", shareOn: "🔴 Ton écran est partagé avec la régie", shareStop: "Arrêter le partage", shareHint: "Choisis la fenêtre de ton jeu (ou PS Remote Play). Seul l'admin voit ton écran.",
      shareNo: "Le partage d'écran marche sur ordinateur (Chrome, Edge ou Firefox).", shareErr: "Le partage n'a pas pu démarrer.",
    },
    nl: {
      lobby: "Startruimte", lobbyGame: "Jouw spel", lobbyFound: "✅ Spel gevonden op je console", lobbyNone: "❌ Dit spel staat niet op je console. Voeg het toe (zelfde versie) en kom terug.",
      lobbyBad: "⚠️ Jouw versie van het spel verschilt van die van het toernooi. Neem dezelfde versie, anders telt je tijd niet.",
      lobbyCheck: "Spel controleren…", lobbyWait: "⏳ Wachten op de start… Blijf op dit scherm: het spel start vanzelf.",
      lobbyNotIn: "Je zit niet in deze reeks. Wacht op de volgende 🙂", lobbyDone: (t) => `🏁 Jouw tijd: ${t}`, lobbyDnf: "Je hebt deze race opgegeven.",
      lobbyPlayers: (n) => `${n} speler${n > 1 ? "s" : ""} aan de start`, lobbyRules: "🔒 Tijdens de race: geen snel opslaan, niet terugspoelen, niet versnellen, geen cheats.",
      lobbyLeave: "Startruimte verlaten", go: "GO!", fin: "🏁 Klaar", finQ: "Heb je het spel uitgespeeld? Je chrono stopt nu.", finOk: (t, p) => `🏁 Goed zo! Jouw tijd: ${t} (voorlopige plaats: ${p})`,
      quitQ: "De race opgeven? Je chrono gaat verloren.", dnfOk: "Race opgegeven.", running: "Race bezig",
      share: "🎥 Mijn spel delen met de regie", shareOn: "🔴 Je scherm wordt gedeeld met de regie", shareStop: "Delen stoppen", shareHint: "Kies het venster van je spel (of PS Remote Play). Alleen de admin ziet je scherm.",
      shareNo: "Scherm delen werkt op een computer (Chrome, Edge of Firefox).", shareErr: "Delen kon niet starten.",
    },
    en: {
      lobby: "Start room", lobbyGame: "Your game", lobbyFound: "✅ Game found on your console", lobbyNone: "❌ This game isn't on your console. Add it (same version) and come back.",
      lobbyBad: "⚠️ Your version of the game is different from the tournament's. Use the same version, otherwise your time doesn't count.",
      lobbyCheck: "Checking the game…", lobbyWait: "⏳ Waiting for the start… Stay on this screen: the game starts by itself.",
      lobbyNotIn: "You're not in this heat. Wait for the next one 🙂", lobbyDone: (t) => `🏁 Your time: ${t}`, lobbyDnf: "You gave up this race.",
      lobbyPlayers: (n) => `${n} player${n > 1 ? "s" : ""} at the start`, lobbyRules: "🔒 During the race: no save states, no rewind, no fast-forward, no cheats.",
      lobbyLeave: "Leave the room", go: "GO!", fin: "🏁 Done", finQ: "Did you finish the game? Your timer stops now.", finOk: (t, p) => `🏁 Well done! Your time: ${t} (provisional place: ${p})`,
      quitQ: "Give up the race? Your time will be lost.", dnfOk: "Race given up.", running: "Race in progress",
      share: "🎥 Share my game with the control room", shareOn: "🔴 Your screen is shared with the control room", shareStop: "Stop sharing", shareHint: "Pick your game window (or PS Remote Play). Only the admin sees your screen.",
      shareNo: "Screen sharing works on a computer (Chrome, Edge or Firefox).", shareErr: "Sharing couldn't start.",
    },
  };
  const T = () => L[lang] || L.fr;
  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  if (!sb) return;

  /* ---------- helpers shared with the régie ---------- */
  const fmt = (ms) => {
    if (ms == null) return "—";
    const neg = ms < 0; ms = Math.abs(ms);
    const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60, c = Math.floor(ms / 10) % 100;
    return (neg ? "-" : "") + (h ? h + ":" + String(m).padStart(2, "0") : String(m).padStart(2, "0")) + ":" + String(s).padStart(2, "0") + "." + String(c).padStart(2, "0");
  };
  window.kameiFmtTime = fmt;
  async function sha256(buf) {
    const d = await crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // the same ROM = the same fingerprint (big CD images: start + end + size, to stay fast)
  async function romHash(id) {
    const cacheKey = "kamei-romhash-" + id;
    try { const c = localStorage.getItem(cacheKey); if (c) return c; } catch (e) {}
    const g = await getGame(id); if (!g) return null;
    const buf = await romBytes(g);
    let h;
    if (buf.byteLength > 64 * 1048576) {
      const a = new Uint8Array(buf, 0, 4 * 1048576), b = new Uint8Array(buf, buf.byteLength - 4 * 1048576), n = new TextEncoder().encode(String(buf.byteLength));
      const all = new Uint8Array(a.length + b.length + n.length); all.set(a); all.set(b, a.length); all.set(n, a.length + b.length);
      h = await sha256(all);
    } else h = await sha256(buf);
    h = h.slice(0, 32) + ":" + buf.byteLength;
    try { localStorage.setItem(cacheKey, h); } catch (e) {}
    return h;
  }
  window.kameiRomHash = romHash;

  let ICE = [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }], iceAt = 0;
  async function ice() {
    if (Date.now() - iceAt < 3600000) return ICE;
    iceAt = Date.now();
    try { const r = await sb.functions.invoke("kamei-discord", { body: { action: "ice" } }); if (r.data && Array.isArray(r.data.iceServers)) ICE = ICE.slice(0, 1).concat(r.data.iceServers); } catch (e) {}
    return ICE;
  }

  /* ---------- signalling channel for one event (Supabase Realtime broadcast; replaceable in tests) ---------- */
  function evChannel(eid, onMsg) {
    if (window.kameiEvTransport) return window.kameiEvTransport("ev-" + eid, onMsg);
    const ch = sb.channel("kamei-play-ev-" + eid, { config: { broadcast: { self: false } } });
    ch.on("broadcast", { event: "sig" }, (m) => onMsg(m.payload));
    const ready = new Promise((res) => ch.subscribe((st) => { if (st === "SUBSCRIBED") res(); }));
    return { send: async (p) => { await ready; return ch.send({ type: "broadcast", event: "sig", payload: p }); }, close: () => { try { sb.removeChannel(ch); } catch (e) {} } };
  }
  window.kameiEvChannel = evChannel;

  const st = document.createElement("style");
  st.textContent = `
  #raceLobby { position: fixed; inset: 0; z-index: 44; background: radial-gradient(circle at 50% 0, color-mix(in srgb, var(--tacc, #9BD14B) 22%, #0b0b12), #0b0b12 60%); display: none; flex-direction: column; align-items: center; padding: calc(env(safe-area-inset-top) + 20px) 20px 30px; overflow: auto; color: var(--text); }
  #raceLobby.on { display: flex; }
  #raceLobby h2 { font-family: "Press Start 2P", monospace; font-size: 15px; line-height: 1.6; text-align: center; margin: 10px 0 4px; color: var(--tacc, #9BD14B); }
  #raceLobby .rt { font-size: 22px; font-weight: 800; text-align: center; margin: 0 0 18px; }
  #raceLobby .box { width: 100%; max-width: 460px; background: rgba(255,255,255,.05); border: 1px solid var(--line); border-radius: 18px; padding: 14px; margin-bottom: 12px; font-size: 14.5px; line-height: 1.5; }
  #raceLobby .big { font: 800 44px Inter, sans-serif; font-variant-numeric: tabular-nums; text-align: center; margin: 8px 0; }
  #raceLobby button.leave { margin-top: auto; background: none; border: 1px solid var(--line); color: var(--muted); border-radius: 12px; padding: 10px 16px; font: 600 14px Inter, sans-serif; }
  #raceCount { position: fixed; inset: 0; z-index: 60; display: none; place-items: center; pointer-events: none; }
  #raceCount.on { display: grid; }
  #raceCount b { font: 400 min(34vw, 220px) "Press Start 2P", monospace; color: #fff; text-shadow: 0 0 30px var(--tacc, #9BD14B), 6px 6px 0 rgba(0,0,0,.6); animation: rcPop .9s ease-out both; }
  #raceCount b.go { color: var(--tacc, #9BD14B); font-size: min(22vw, 160px); }
  @keyframes rcPop { from { transform: scale(1.8); opacity: 0; } 30% { transform: scale(1); opacity: 1; } to { transform: scale(.9); opacity: .85; } }
  #raceHud { position: fixed; top: calc(env(safe-area-inset-top) + 56px); left: 50%; transform: translateX(-50%); z-index: 59; display: none; align-items: center; gap: 8px; padding: 5px 6px 5px 12px; border-radius: 999px; background: rgba(0,0,0,.72); border: 1.5px solid var(--tacc, #9BD14B); color: #fff; }
  #raceHud.on { display: flex; }
  #raceHud span { font: 800 16px ui-monospace, Menlo, Consolas, monospace; font-variant-numeric: tabular-nums; min-width: 92px; }
  #raceHud button { border: 0; border-radius: 999px; padding: 7px 12px; background: var(--tacc, #9BD14B); color: #0b0b12; font: 800 13px Inter, sans-serif; }
  #raceHud.done button { display: none; }
  #shareBar { position: fixed; left: 50%; bottom: calc(env(safe-area-inset-bottom) + 84px); transform: translateX(-50%); z-index: 45; display: none; align-items: center; gap: 10px; padding: 8px 8px 8px 14px; border-radius: 16px; background: #1b0b10; border: 1.5px solid #e11d48; color: #fff; font: 700 13px Inter, sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,.4); }
  #shareBar.on { display: flex; }
  #shareBar video { width: 96px; height: 54px; border-radius: 8px; background: #000; object-fit: contain; }
  #shareBar button { border: 0; border-radius: 10px; padding: 8px 12px; background: #e11d48; color: #fff; font: 700 13px Inter, sans-serif; }`;
  document.head.appendChild(st);
  const mk = (id, html) => { const d = document.createElement("div"); d.id = id; d.innerHTML = html || ""; document.body.appendChild(d); return d; };
  const lobbyEl = mk("raceLobby"), countEl = mk("raceCount"), hud = mk("raceHud", `<span id="rhT">00:00.00</span><button id="rhFin"></button>`), shareEl = mk("shareBar");

  /* ---------- state ---------- */
  let R = null;          // { e, board, offset, gameId, hashOk, run, launched, goAt, finished }
  let ch = null, chEid = null, sid = Math.random().toString(36).slice(2, 10);
  const rxOk = {};       // valid régie keys
  const shared = { stream: null, peers: {} };   // screen sharing (PC)
  const frame = () => document.getElementById("frame").contentWindow;
  const nowS = () => Date.now() + (R ? R.offset : 0);

  /* ---------- connection with the régie ---------- */
  const hasVideo = () => !!shared.stream || !!(R && R.launched && window.kameiCurrentGame && window.kameiCurrentGame());
  function join(eid) {
    if (ch && chEid === eid) return;
    leaveChannel();
    chEid = eid;
    ch = evChannel(eid, onSig);
    announce();
  }
  function leaveChannel() {
    if (!ch) return;
    try { ch.send({ from: "p", uid: me().id, kind: "gone" }); } catch (e) {}
    const c = ch; ch = null; chEid = null; setTimeout(() => c.close(), 300);
    for (const rid of Object.keys(shared.peers)) stopNative(rid);
  }
  function announce() {
    if (!ch || !me()) return;
    ch.send({ from: "p", uid: me().id, pseudo: me().pseudo, kind: "here", live: hasVideo(), sid, screen: !!shared.stream });
  }
  setInterval(() => { if (ch) announce(); }, 15000);
  async function keyOk(eid, k) {
    if (!k) return false;
    if (rxOk[k] !== undefined) return rxOk[k];
    const r = await sb.rpc("event_rx_check", { eid, k });
    return (rxOk[k] = !r.error && r.data === true);
  }
  async function onSig(m) {
    if (!m || !me()) return;
    if (m.from === "rg" && m.kind === "go") { if (R && R.e.id === chEid) refresh(); return; }
    if (m.from !== "rx") return;
    if (m.kind === "who") { if (await keyOk(chEid, m.k)) announce(); return; }
    if (m.to !== me().id) return;
    if (!(await keyOk(chEid, m.k))) return;
    const peer = "rx-" + m.rid;
    if (m.kind === "hello") {
      if (shared.stream) return nativeHost(m.rid, m.q);
      if (R && R.launched && window.kameiCurrentGame && window.kameiCurrentGame()) frame().postMessage({ type: "netHost", ice: await ice(), peer, input: false, q: m.q || "low" }, "*");
    } else if (m.kind === "q") {
      if (shared.peers[m.rid]) applyQ(shared.peers[m.rid], m.q); else frame().postMessage({ type: "netQ", peer, q: m.q }, "*");
    } else if (m.kind === "bye") {
      if (shared.peers[m.rid]) stopNative(m.rid); else frame().postMessage({ type: "netStop", peer }, "*");
    } else if (m.kind === "answer" || m.kind === "ice") {
      const x = shared.peers[m.rid];
      if (x) { try { if (m.kind === "answer") await x.pc.setRemoteDescription(m.data); else if (m.data) await x.pc.addIceCandidate(m.data); } catch (e) {} }
      else frame().postMessage({ type: "netSig", peer, data: { kind: m.kind, data: m.data } }, "*");
    }
  }
  // the game window sends its offer / candidates: they go to the right receiver
  window.addEventListener("message", (e) => {
    const d = e.data;
    if (!d || !ch) return;
    try { if (e.source !== frame()) return; } catch (err) { return; }
    if (d.type === "started" && R && R.launched) { sid = Math.random().toString(36).slice(2, 10); announce(); }
    if (d.type === "netSig" && d.peer && String(d.peer).startsWith("rx-")) ch.send(Object.assign({ from: "p", uid: me().id, to: d.peer.slice(3) }, d.data));
  });

  /* ---------- screen sharing for PC players (Fortnite, CoD, PS Remote Play…) ---------- */
  function applyQ(x, q) {
    x.q = q || x.q;
    try {
      const prm = x.vs.getParameters(); prm.encodings = prm.encodings && prm.encodings.length ? prm.encodings : [{}];
      const h = (shared.stream && shared.stream.getVideoTracks()[0].getSettings().height) || 720;
      if (x.q === "low") Object.assign(prm.encodings[0], { maxBitrate: 250000, maxFramerate: 6, scaleResolutionDownBy: Math.max(1, h / 240) });
      else Object.assign(prm.encodings[0], { maxBitrate: 3000000, maxFramerate: 30, scaleResolutionDownBy: Math.max(1, h / 720) });
      x.vs.setParameters(prm).catch(() => {});
    } catch (e) {}
  }
  async function nativeHost(rid, q) {
    stopNative(rid);
    const pc = new RTCPeerConnection({ iceServers: await ice() });
    const tr = shared.stream.getVideoTracks()[0];
    const x = shared.peers[rid] = { pc, q: q || "low", vs: pc.addTrack(tr, shared.stream) };
    pc.onicecandidate = (e) => { if (e.candidate && ch) ch.send({ from: "p", uid: me().id, to: rid, kind: "ice", data: e.candidate.toJSON() }); };
    pc.onconnectionstatechange = () => { if (pc.connectionState === "connected") applyQ(x); if (["failed", "closed"].includes(pc.connectionState) && shared.peers[rid] === x) stopNative(rid); };
    applyQ(x);
    await pc.setLocalDescription(await pc.createOffer());
    ch.send({ from: "p", uid: me().id, to: rid, kind: "offer", data: pc.localDescription.toJSON() });
  }
  function stopNative(rid) { const x = shared.peers[rid]; if (!x) return; delete shared.peers[rid]; try { x.pc.close(); } catch (e) {} }
  async function share(e) {
    const X = T();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) return toast(X.shareNo, 4500);
    toast(X.shareHint, 4500);
    let stream;
    try { stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 30, max: 30 }, height: { ideal: 1080 } }, audio: false }); }
    catch (err) { if (err && err.name !== "NotAllowedError") toast(X.shareErr, 3500); return; }
    stopShare(true);
    shared.stream = stream;
    try { stream.getVideoTracks()[0].contentHint = "motion"; } catch (err) {}
    stream.getVideoTracks()[0].onended = () => stopShare();
    shareEl.innerHTML = `<video autoplay muted playsinline></video><span>${X.shareOn}</span><button>${X.shareStop}</button>`;
    shareEl.querySelector("video").srcObject = stream;
    shareEl.querySelector("button").onclick = () => stopShare();
    shareEl.classList.add("on");
    sid = Math.random().toString(36).slice(2, 10);
    join(e.id); announce();
  }
  function stopShare(quiet) {
    for (const rid of Object.keys(shared.peers)) stopNative(rid);
    if (shared.stream) { try { shared.stream.getTracks().forEach((t) => t.stop()); } catch (e) {} }
    shared.stream = null; shareEl.classList.remove("on"); shareEl.innerHTML = "";
    if (!quiet) { announce(); if (!R) leaveChannel(); }
  }

  /* ---------- speedrun start room ---------- */
  async function lobby(e) {
    if (!me()) return;
    R = { e, board: null, offset: 0, gameId: null, hashOk: null, run: null, launched: false, goAt: null, finished: false };
    lobbyEl.classList.add("on");
    join(e.id);
    paintLobby();
    await findGame();
    await refresh();
    clearInterval(lobby.iv); lobby.iv = setInterval(refresh, 2500);
  }
  async function findGame() {
    const ref = R.e.game_ref || {};
    const list = (typeof games !== "undefined" ? games : []).filter((g) => !ref.system || g.system === ref.system);
    const byTitle = list.filter((g) => ref.title && g.title.toLowerCase() === String(ref.title).toLowerCase());
    if (ref.hash) {
      for (const g of byTitle.concat(list.filter((x) => !byTitle.includes(x)))) {
        let h = null; try { h = await romHash(g.id); } catch (err) {}
        if (h === ref.hash) { R.gameId = g.id; R.hashOk = true; break; }
      }
      if (!R.gameId && byTitle[0]) { R.gameId = byTitle[0].id; R.hashOk = false; }
    } else if (byTitle[0]) { R.gameId = byTitle[0].id; R.hashOk = true; }
    paintLobby();
  }
  async function refresh() {
    if (!R) return;
    const t0 = Date.now();
    const r = await sb.rpc("event_board", { eid: R.e.id });
    if (!R || r.error || !r.data) return;
    R.board = r.data;
    R.offset = Date.parse(r.data.now) - (t0 + Date.now()) / 2;
    R.run = (r.data.players || []).find((p) => p.id === me().id) || null;
    if (R.run && R.run.go_at && R.run.status === "running") {
      const go = Date.parse(R.run.go_at);
      if (!R.launched || R.goAt !== go) armStart(go);
    }
    if (R.run && R.run.status !== "running" && !R.finished && R.launched && R.run.status) { R.finished = true; hud.classList.add("done"); }
    paintLobby();
  }
  function paintLobby() {
    if (!R) return;
    const X = T(), b = R.board, run = R.run;
    const n = b ? (b.players || []).filter((p) => p.status === "running").length : 0;
    const gameLine = R.gameId == null && R.hashOk == null ? X.lobbyCheck : !R.gameId ? X.lobbyNone : R.hashOk ? X.lobbyFound : X.lobbyBad;
    let state = X.lobbyWait;
    if (run && run.status === "done") state = X.lobbyDone(fmt(run.ms));
    else if (run && run.status === "dnf") state = X.lobbyDnf;
    else if (b && (b.players || []).some((p) => p.status === "running") && !(run && run.status === "running")) state = X.lobbyNotIn;
    const cd = R.goAt && nowS() < R.goAt ? `<div class="big">${Math.ceil((R.goAt - nowS()) / 1000)}</div>` : "";
    lobbyEl.innerHTML = `<h2>${X.lobby}</h2><p class="rt">${esc(R.e.title)}</p>
      <div class="box" style="display:flex;gap:12px;align-items:center">${window.kameiEvCover && window.kameiEvCover(R.e.game_ref) ? `<img src="${esc(window.kameiEvCover(R.e.game_ref))}" alt="" style="width:64px;height:64px;border-radius:10px;object-fit:cover;flex:none" onerror="this.remove()">` : ""}
        <div><b>${X.lobbyGame} :</b> ${esc((R.e.game_ref && R.e.game_ref.title) || R.e.game)}<br>${gameLine}</div></div>
      <div class="box">${cd}${state}${n ? `<br><small style="color:var(--muted)">${X.lobbyPlayers(n)}</small>` : ""}</div>
      <div class="box" style="font-size:13px;color:var(--muted)">${X.lobbyRules}</div>
      <button class="leave" id="rlLeave">${X.lobbyLeave}</button>`;
    lobbyEl.querySelector("#rlLeave").onclick = leaveLobby;
  }
  function leaveLobby() {
    clearInterval(lobby.iv);
    lobbyEl.classList.remove("on");
    if (!R || !R.launched) { R = null; if (!shared.stream) leaveChannel(); }
  }

  /* départ : on charge le jeu pendant le compte à rebours (il attend), puis 3-2-1-GO pour tout le monde en même temps */
  function armStart(go) {
    if (!R.gameId) return;
    R.goAt = go;
    const left = go - nowS();
    R.wait = left > 300;
    if (!R.launched) {
      R.launched = true; R.finished = false;
      hud.classList.remove("done");
      sb.rpc("event_rom", { eid: R.e.id, ok: !!R.hashOk }).then(() => {}, () => {});
      play(R.gameId, true, false);
    }
    clearTimeout(armStart.t1); clearInterval(armStart.iv);
    const steps = () => {
      const ms = R.goAt - nowS();
      if (ms > 3200) return;
      const n = Math.ceil(ms / 1000);
      if (n > 0 && n <= 3 && countEl.dataset.n !== String(n)) { countEl.dataset.n = String(n); countEl.innerHTML = `<b>${n}</b>`; countEl.classList.add("on"); try { window.kameiVibe && window.kameiVibe(40); } catch (e) {} }
      if (ms <= 0) {
        clearInterval(armStart.iv);
        countEl.dataset.n = "go"; countEl.innerHTML = `<b class="go">${T().go}</b>`; countEl.classList.add("on");
        try { frame().postMessage({ type: "raceGo" }, "*"); } catch (e) {}
        R.wait = false;
        try { window.kameiVibe && window.kameiVibe(120); } catch (e) {}
        setTimeout(() => countEl.classList.remove("on"), 1100);
      }
    };
    if (left <= 0) { R.wait = false; try { frame().postMessage({ type: "raceGo" }, "*"); } catch (e) {} }
    else armStart.iv = setInterval(steps, 50);
    lobbyEl.classList.remove("on");
    hud.classList.add("on");
    tickHud();
  }
  function tickHud() {
    cancelAnimationFrame(tickHud.raf);
    const f = () => {
      if (!R || !R.launched) return hud.classList.remove("on");
      const run = R.run;
      const ms = run && run.status === "done" ? run.ms : nowS() - R.goAt;
      document.getElementById("rhT").textContent = run && run.status === "dnf" ? "—" : fmt(Math.max(ms, -9999) < 0 ? ms : ms);
      tickHud.raf = requestAnimationFrame(f);
    };
    document.getElementById("rhFin").textContent = T().fin;
    f();
  }
  document.getElementById("rhFin").onclick = async () => {
    if (!R || R.finished || nowS() < R.goAt) return;
    if (!confirm(T().finQ)) return;
    const r = await sb.rpc("event_finish", { eid: R.e.id });
    if (r.error) return toast(r.error.message, 3500);
    R.finished = true; R.run = Object.assign({}, R.run, { status: "done", ms: r.data.ms });
    hud.classList.add("done");
    toast(T().finOk(fmt(r.data.ms), r.data.place), 6000);
    try { window.kameiVibe && window.kameiVibe(200); } catch (e) {}
  };
  // ✕ during the race = give up (after confirmation)
  function onQuit() {
    if (!R || !R.launched) return;
    if (!R.finished && R.run && R.run.status === "running") {
      if (!confirm(T().quitQ)) return "stay";
      sb.rpc("event_dnf", { eid: R.e.id }).then(() => toast(T().dnfOk), () => {});
    }
    clearInterval(lobby.iv); clearInterval(armStart.iv);
    hud.classList.remove("on"); countEl.classList.remove("on");
    R = null;
    if (!shared.stream) leaveChannel();
  }
  const frameFlag = () => (R && R.launched ? { wait: !!R.wait } : null);

  window.kameiRace = { lobby, share, stopShare, onQuit, frameFlag, sharing: () => !!shared.stream, active: () => !!(R && R.launched), fmt };
})();

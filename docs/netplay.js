/* Kamei Game Console — "Jouer ensemble": play a 2-player game online with a friend.
   The host runs the game and streams picture + sound straight to the friend (WebRTC, peer to peer);
   the friend's buttons control player 2. Supabase only introduces the two devices (Realtime). */
(function () {
  Object.assign(I18N.fr, {
    npInvite: "👥 Inviter", npTitle: "Jouer ensemble", npPick: "Choisis un ami : il verra ton jeu en direct et jouera en joueur 2.",
    npNoFriends: "Ajoute d'abord des amis (onglet Amis).", npWaiting: (p) => `En attente de ${p}…`, npJoined: (p) => `${p} a rejoint la partie 🎮 (joueur 2)`,
    npLeft: (p) => `${p} a quitté la partie`, npInvited: (p, g) => `${p} t'invite à jouer à ${g} !`, npJoin: "🎮 Rejoindre", npLater: "Plus tard",
    npConnecting: "Connexion à la partie…", npEnded: "La partie est terminée.", npFail: "Connexion impossible. Réessaie, ou essayez tous les deux en Wi-Fi.",
    npSound: "🔊 Activer le son", npStop: "Arrêter le jeu en ligne", npP2: (p) => `Joueur 2 · partie de ${p}`, npOff: "Le jeu en ligne n'est pas encore activé.",
    npHint: "Astuce : en Wi-Fi, c'est plus fluide.",
    lvWatch: "📺 Regarder", lvWatching: (p, g) => `Tu regardes ${p} · ${g}`, lvViewer: (p) => `👀 ${p} te regarde jouer`, lvNotLive: "Ton ami ne joue plus, ou ne partage pas son écran.",
    lvAllow: "📺 Mes amis peuvent me regarder jouer", lvFull: "Trop de spectateurs pour l'instant.",
  });
  Object.assign(I18N.nl, {
    npInvite: "👥 Uitnodigen", npTitle: "Samen spelen", npPick: "Kies een vriend: hij ziet je spel live en speelt als speler 2.",
    npNoFriends: "Voeg eerst vrienden toe (tabblad Vrienden).", npWaiting: (p) => `Wachten op ${p}…`, npJoined: (p) => `${p} doet mee 🎮 (speler 2)`,
    npLeft: (p) => `${p} heeft het spel verlaten`, npInvited: (p, g) => `${p} nodigt je uit om ${g} te spelen!`, npJoin: "🎮 Meedoen", npLater: "Later",
    npConnecting: "Verbinden met het spel…", npEnded: "Het spel is afgelopen.", npFail: "Verbinding mislukt. Probeer opnieuw, of allebei via wifi.",
    npSound: "🔊 Geluid aan", npStop: "Online spelen stoppen", npP2: (p) => `Speler 2 · spel van ${p}`, npOff: "Online spelen is nog niet actief.",
    npHint: "Tip: via wifi is het vlotter.",
    lvWatch: "📺 Kijken", lvWatching: (p, g) => `Je kijkt naar ${p} · ${g}`, lvViewer: (p) => `👀 ${p} kijkt mee`, lvNotLive: "Je vriend speelt niet meer, of deelt zijn scherm niet.",
    lvAllow: "📺 Mijn vrienden mogen meekijken", lvFull: "Te veel kijkers op dit moment.",
  });
  Object.assign(I18N.en, {
    npInvite: "👥 Invite", npTitle: "Play together", npPick: "Pick a friend: they'll see your game live and play as player 2.",
    npNoFriends: "Add friends first (Friends tab).", npWaiting: (p) => `Waiting for ${p}…`, npJoined: (p) => `${p} joined the game 🎮 (player 2)`,
    npLeft: (p) => `${p} left the game`, npInvited: (p, g) => `${p} invites you to play ${g}!`, npJoin: "🎮 Join", npLater: "Later",
    npConnecting: "Connecting to the game…", npEnded: "The game is over.", npFail: "Couldn't connect. Try again, or both use Wi-Fi.",
    npSound: "🔊 Turn sound on", npStop: "Stop playing online", npP2: (p) => `Player 2 · ${p}'s game`, npOff: "Online play isn't enabled yet.",
    npHint: "Tip: it's smoother on Wi-Fi.",
    lvWatch: "📺 Watch", lvWatching: (p, g) => `Watching ${p} · ${g}`, lvViewer: (p) => `👀 ${p} is watching you play`, lvNotLive: "Your friend isn't playing anymore, or isn't sharing.",
    lvAllow: "📺 My friends can watch me play", lvFull: "Too many viewers right now.",
  });

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  if (!sb) return;
  let ICE = [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }];
  // free relay (Cloudflare TURN through the "kamei-discord" function) for networks that block direct connections
  let iceAt = 0;
  async function refreshIce() {
    if (Date.now() - iceAt < 3600000 || !me()) return;
    iceAt = Date.now();
    try {
      const r = await sb.functions.invoke("kamei-discord", { body: { action: "ice" } });
      const extra = (r.data && Array.isArray(r.data.iceServers)) ? r.data.iceServers : [];
      ICE = [{ urls: ["stun:stun.l.google.com:19302", "stun:stun.cloudflare.com:3478"] }].concat(extra);
    } catch (e) {}
  }
  setTimeout(refreshIce, 10000);
  const frame = () => document.getElementById("frame").contentWindow;

  /* ---------- Signalling channel (Supabase Realtime; replaceable for tests) ---------- */
  function channel(room, onMsg) {
    if (window.kameiPlayTransport) return window.kameiPlayTransport(room, onMsg);
    const ch = sb.channel("kamei-play-" + room, { config: { broadcast: { self: false } } });
    ch.on("broadcast", { event: "sig" }, (m) => onMsg(m.payload));
    const ready = new Promise((res) => ch.subscribe((st) => { if (st === "SUBSCRIBED") res(); }));
    return {
      send: async (payload) => { await ready; return ch.send({ type: "broadcast", event: "sig", payload }); },
      close: () => { try { sb.removeChannel(ch); } catch (e) {} },
    };
  }

  const st = document.createElement("style");
  st.textContent = `
    #npBtn.live { background: #14532d; }
    #watch { position: fixed; inset: 0; z-index: 46; background: #000; display: none; flex-direction: column; touch-action: none; user-select: none; -webkit-user-select: none; }
    #watch.on { display: flex; }
    #watch .wbar { display: flex; align-items: center; gap: 8px; padding: calc(env(safe-area-inset-top) + 6px) 10px 6px; background: #0b0b12; }
    #watch .wbar span { flex: 1; color: var(--muted); font: 700 13px Inter, sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #watch .wbar button { background: #23233a; color: #fff; font: 700 13px Inter, sans-serif; padding: 8px 12px; border-radius: 10px; border: 0; }
    #watch video { flex: 1; min-height: 0; width: 100%; object-fit: contain; background: #000; }
    #watch .wmsg { position: absolute; left: 0; right: 0; top: 40%; text-align: center; color: #fff; font: 700 15px Inter, sans-serif; padding: 0 20px; pointer-events: none; }
    #watch .wsound { position: absolute; left: 50%; top: 70px; transform: translateX(-50%); background: var(--tacc, #8fc63f); color: #0b0b12; border: 0; border-radius: 12px; padding: 10px 16px; font: 800 14px Inter, sans-serif; display: none; }
    #watch .pad { position: absolute; left: 0; right: 0; bottom: calc(env(safe-area-inset-bottom) + 14px); height: 210px; pointer-events: none; }
    #watch .pad.hide { display: none; }
    #watch .dp { position: absolute; left: 18px; bottom: 30px; width: 150px; height: 150px; border-radius: 50%; background: rgba(255,255,255,.08); border: 2px solid rgba(255,255,255,.18); pointer-events: auto; }
    #watch .dp i { position: absolute; background: rgba(255,255,255,.25); border-radius: 6px; }
    #watch .dp .v { left: 55px; top: 18px; width: 40px; height: 114px; } #watch .dp .h { top: 55px; left: 18px; width: 114px; height: 40px; }
    #watch .fb { position: absolute; right: 14px; bottom: 26px; width: 200px; height: 140px; pointer-events: none; }
    #watch .fb b, #watch .mid b { position: absolute; display: grid; place-items: center; border-radius: 50%; width: 56px; height: 56px; background: rgba(255,255,255,.14);
             border: 2px solid rgba(255,255,255,.25); color: #fff; font: 800 15px Inter, sans-serif; pointer-events: auto; }
    #watch b.on { background: var(--tacc, #8fc63f); color: #0b0b12; }
    #watch .mid { position: absolute; left: 50%; bottom: 8px; transform: translateX(-50%); width: 150px; height: 40px; pointer-events: none; }
    #watch .mid b { width: 66px; height: 30px; border-radius: 15px; font-size: 11px; }`;
  document.head.appendChild(st);

  /* ======================= HOST ======================= */
  let host = null;   // { ch, friend, invite }
  function hostStop(silent) {
    if (!host) return;
    try { host.ch.send({ from: "host", kind: "bye" }); } catch (e) {}
    try { host.ch.close(); } catch (e) {}
    try { frame().postMessage({ type: "netStop", peer: "p2" }, "*"); } catch (e) {}
    if (host.invite) sb.rpc("play_invite_status", { inv_id: host.invite, st: "ended" }).then(() => {}, () => {});
    host = null; paintBtn();
    if (!silent) toast(t("npStop"));
  }
  function paintBtn() {
    const b = document.getElementById("npBtn"); if (!b) return;
    b.textContent = host ? (host.live ? "👥 " + host.friend.pseudo + " 🟢" : "👥 …") : (innerWidth < 600 ? "👥" : t("npInvite"));
    b.classList.toggle("live", !!(host && host.live));
  }
  async function startHosting(friend) {
    await refreshIce();
    const g = window.kameiCurrentGame && window.kameiCurrentGame(); if (!g) return;
    const r = await sb.rpc("play_invite", { to_id: friend.id, game_name: g.title, sys: g.system });
    if (r.error || !r.data) { toast(/too_many/.test((r.error || {}).message || "") ? "⏳" : t("npOff"), 3500); return; }
    hostStop(true);
    const room = r.data;
    const inv = await sb.from("play_invites").select("id").eq("room", room).maybeSingle();
    host = { friend, live: false, invite: inv.data && inv.data.id };
    host.ch = channel(room, (m) => {
      if (!host || m.from !== "guest") return;
      if (m.kind === "hello") frame().postMessage({ type: "netHost", ice: ICE, peer: "p2", input: true }, "*");
      else if (m.kind === "bye") { toast(t("npLeft", friend.pseudo), 3500); host.live = false; paintBtn(); frame().postMessage({ type: "netStop", peer: "p2" }, "*"); }
      else frame().postMessage({ type: "netSig", peer: "p2", data: m }, "*");
    });
    paintBtn();
    toast(t("npWaiting", friend.pseudo) + " " + t("npHint"), 5000);
  }
  window.addEventListener("message", (e) => {
    if (!e.data) return;
    try { if (e.source !== frame()) return; } catch (err) { return; }
    if (e.data.type === "started") liveStart();
    if ((e.data.type === "netSig" || e.data.type === "netState") && e.data.peer && e.data.peer !== "p2") return liveFromFrame(e.data);
    if (!host) return;
    if (e.data.type === "netSig") host.ch.send(Object.assign({ from: "host" }, e.data.data));
    if (e.data.type === "netState") {
      const was = host.live; host.live = e.data.state === "connected"; paintBtn();
      if (host.live && !was) { toast(t("npJoined", host.friend.pseudo), 4000); try { window.kameiVibe && window.kameiVibe(40); } catch (err) {} }
      if (e.data.state === "failed") toast(t("npFail"), 5000);
    }
  });
  /* ---------- Live: friends can watch me play (up to 3) ---------- */
  let live = null;   // { ch, viewers: { peer: pseudo } }
  const allowWatch = () => { try { return localStorage.getItem("kamei-live") !== "off"; } catch (e) { return true; } };
  function liveStart() {
    liveStop();
    if (!me() || !allowWatch() || (window.kameiFeature && !window.kameiFeature("watch"))) return;
    live = { viewers: {} };
    live.ch = channel("live-" + me().id, (m) => {
      if (!live || m.from !== "viewer" || !m.peer) return;
      if (m.kind === "hello") {
        if (!live.viewers[m.peer] && Object.keys(live.viewers).length >= 3) { live.ch.send({ from: "host", to: m.peer, kind: "full" }); return; }
        const isNew = !live.viewers[m.peer];
        live.viewers[m.peer] = m.pseudo || "?";
        const g = window.kameiCurrentGame && window.kameiCurrentGame();
        live.ch.send({ from: "host", to: m.peer, kind: "info", game: g ? g.title : "" });
        frame().postMessage({ type: "netHost", ice: ICE, peer: m.peer, input: false }, "*");
        if (isNew) toast(t("lvViewer", m.pseudo || "?"), 3500);
      } else if (m.kind === "bye") { delete live.viewers[m.peer]; frame().postMessage({ type: "netStop", peer: m.peer }, "*"); }
      else frame().postMessage({ type: "netSig", peer: m.peer, data: m }, "*");
    });
  }
  function liveStop() {
    if (!live) return;
    try { for (const p of Object.keys(live.viewers)) live.ch.send({ from: "host", to: p, kind: "bye" }); } catch (e) {}
    const ch = live.ch; live = null; setTimeout(() => { try { ch.close(); } catch (e) {} }, 300);
  }
  function liveFromFrame(d) {
    if (!live) return;
    if (d.type === "netSig") live.ch.send(Object.assign({ from: "host", to: d.peer }, d.data));
    if (d.type === "netState" && (d.state === "failed" || d.state === "closed")) delete live.viewers[d.peer];
  }

  async function inviteSheet() {
    if (host) {
      openSheet(`<h3>${t("npTitle")}</h3><p class="hint">${host.live ? t("npJoined", esc(host.friend.pseudo)) : t("npWaiting", esc(host.friend.pseudo))}</p>
        <button class="row danger" id="npEnd">${t("npStop")}</button>`);
      document.getElementById("npEnd").onclick = () => { closeSheet(); hostStop(); };
      return;
    }
    if (!me()) return toast(t("needLogin"));
    openSheet(`<h3>${t("npTitle")}</h3><p class="hint">…</p>`);
    const f = await sb.from("friendships").select("friend_id").eq("user_id", me().id);
    const ids = (f.data || []).map((x) => x.friend_id);
    const p = ids.length ? await sb.from("profiles").select("*").in("id", ids) : { data: [] };
    const fr = (p.data || []).sort((a, b) => ((window.kameiOnline && window.kameiOnline(b)) - (window.kameiOnline && window.kameiOnline(a))));
    openSheet(`<h3>${t("npTitle")}</h3><p class="hint">${t("npPick")}</p>` + (fr.length ? fr.map((x) =>
      `<button class="friend" data-np="${x.id}">${window.kameiAvatar(x, 40)}<span class="dot ${window.kameiOnline && window.kameiOnline(x) ? "on" : ""}"></span><span class="fi"><b>${esc(x.pseudo)}</b></span></button>`).join("")
      : `<p class="hint">${t("npNoFriends")}</p>`));
    document.querySelectorAll("#sheet [data-np]").forEach((b) => b.onclick = () => { closeSheet(); startHosting(fr.find((x) => x.id === b.dataset.np)); });
  }
  // button in the player bar
  const bar = document.querySelector("#player .pbar");
  if (bar) {
    const b = document.createElement("button"); b.id = "npBtn"; b.onclick = inviteSheet;
    bar.insertBefore(b, document.getElementById("savesBtn"));
    paintBtn();
  }
  // leaving the game ends the online session
  document.getElementById("quit").addEventListener("click", () => { hostStop(true); liveStop(); }, true);

  /* ======================= GUEST ======================= */
  let guest = null;  // { pc, dc, ch, invite, hostName, buttons, axis, timer }
  const W = document.createElement("div"); W.id = "watch";
  W.innerHTML = `<div class="wbar"><button id="wQuit"></button><span id="wTitle"></span></div><video id="wVid" playsinline autoplay></video>
    <div class="wmsg" id="wMsg"></div><button class="wsound" id="wSound"></button>
    <div class="pad" id="wPad"><div class="dp" id="wDp"><i class="v"></i><i class="h"></i></div>
      <div class="fb"><b data-k="1" style="left:0;top:0">Y</b><b data-k="9" style="left:68px;top:-14px">X</b><b data-k="10" style="left:136px;top:-28px">L</b>
        <b data-k="0" style="left:0;top:72px">B</b><b data-k="8" style="left:68px;top:58px">A</b><b data-k="11" style="left:136px;top:44px">R</b></div>
      <div class="mid"><b data-k="2" style="left:0;top:0">SELECT</b><b data-k="3" style="left:80px;top:0">START</b></div></div>`;
  document.body.appendChild(W);
  const $w = (id) => document.getElementById(id);

  function send() {
    if (!guest || !guest.dc || guest.dc.readyState !== "open") return;
    let b = 0; for (const [k, on] of Object.entries(guest.buttons)) if (on) b |= 1 << +k;
    guest.dc.send(JSON.stringify({ b, a: guest.axis }));
  }
  function setKey(k, on) { if (!guest || !guest.input) return; if (!!guest.buttons[k] === on) return; guest.buttons[k] = on; send(); if (on) { try { window.kameiVibe && window.kameiVibe(12); } catch (e) {} } }

  /* touch buttons (multi-touch) */
  const touchBtn = {};
  W.querySelectorAll("[data-k]").forEach((el) => {
    const k = +el.dataset.k;
    el.addEventListener("pointerdown", (e) => { e.preventDefault(); el.setPointerCapture(e.pointerId); touchBtn[e.pointerId] = k; el.classList.add("on"); setKey(k, true); });
    const up = (e) => { if (touchBtn[e.pointerId] === k) { delete touchBtn[e.pointerId]; el.classList.remove("on"); setKey(k, false); } };
    el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
  });
  /* d-pad with diagonals */
  const dp = $w("wDp");
  function dpad(e) {
    const r = dp.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2, dz = r.width * 0.16;
    setKey(4, y < -dz); setKey(5, y > dz); setKey(6, x < -dz); setKey(7, x > dz);
  }
  dp.addEventListener("pointerdown", (e) => { e.preventDefault(); dp.setPointerCapture(e.pointerId); dpad(e); });
  dp.addEventListener("pointermove", (e) => { if (e.buttons || e.pressure) dpad(e); });
  const dpUp = () => { setKey(4, false); setKey(5, false); setKey(6, false); setKey(7, false); };
  dp.addEventListener("pointerup", dpUp); dp.addEventListener("pointercancel", dpUp);

  /* keyboard (PC) */
  const KB = { ArrowUp: 4, ArrowDown: 5, ArrowLeft: 6, ArrowRight: 7, KeyZ: 0, KeyX: 8, KeyA: 1, KeyS: 9, KeyQ: 10, KeyW: 11, Enter: 3, ShiftRight: 2, ShiftLeft: 2 };
  window.addEventListener("keydown", (e) => { if (guest && KB[e.code] !== undefined) { e.preventDefault(); setKey(KB[e.code], true); } }, true);
  window.addEventListener("keyup", (e) => { if (guest && KB[e.code] !== undefined) { e.preventDefault(); setKey(KB[e.code], false); } }, true);
  /* USB / Bluetooth controller in a browser (Gamepad API) */
  const GP = { 0: 0, 1: 8, 2: 1, 3: 9, 4: 10, 5: 11, 6: 12, 7: 13, 8: 2, 9: 3, 10: 14, 11: 15, 12: 4, 13: 5, 14: 6, 15: 7 };
  const gpPrev = {};
  function gpLoop() {
    if (!guest) return;
    const pads = navigator.getGamepads ? [...navigator.getGamepads()].filter(Boolean) : [];
    if (pads.length) {
      const p = pads[0]; $w("wPad").classList.add("hide");
      for (const [i, k] of Object.entries(GP)) if (p.buttons[i]) { const on = !!p.buttons[i].pressed; if (gpPrev[i] !== on) { gpPrev[i] = on; setKey(k, on); } }
      const ax = [+(p.axes[0] || 0).toFixed(2), +(p.axes[1] || 0).toFixed(2)];
      if (Math.abs(ax[0]) < 0.2) ax[0] = 0; if (Math.abs(ax[1]) < 0.2) ax[1] = 0;
      if (ax[0] !== guest.axis[0] || ax[1] !== guest.axis[1]) { guest.axis = ax; send(); }
    }
    requestAnimationFrame(gpLoop);
  }
  /* Android app: controllers come through the app (kameiKey / kameiAxis) */
  const AK = { 96: 0, 97: 8, 99: 1, 100: 9, 102: 10, 103: 11, 104: 12, 105: 13, 106: 14, 107: 15, 108: 3, 109: 2, 19: 4, 20: 5, 21: 6, 22: 7, 23: 0, 66: 3, 62: 2 };
  const prevKey = window.kameiKey, prevAxis = window.kameiAxis;
  window.kameiKey = (code, down) => { if (guest) { if (AK[code] !== undefined) { $w("wPad").classList.add("hide"); setKey(AK[code], down); } return; } return prevKey && prevKey(code, down); };
  window.kameiAxis = (x, y, hx, hy, lt, rt) => {
    if (!guest) return prevAxis && prevAxis(x, y, hx, hy, lt, rt);
    setKey(4, hy < -0.5 || y < -0.5); setKey(5, hy > 0.5 || y > 0.5); setKey(6, hx < -0.5 || x < -0.5); setKey(7, hx > 0.5 || x > 0.5);
    setKey(12, lt > 0.5); setKey(13, rt > 0.5);
  };

  function guestMsg(txt) { $w("wMsg").textContent = txt || ""; }
  function guestStop(silent) {
    if (!guest) return;
    const g = guest; guest = null;
    clearInterval(g.timer);
    try { g.ch.send(Object.assign({ from: g.who, kind: "bye" }, g.peer ? { peer: g.peer } : {})); } catch (e) {}
    setTimeout(() => { try { g.ch.close(); } catch (e) {} }, 300);
    try { g.dc && g.dc.close(); } catch (e) {} try { g.pc && g.pc.close(); } catch (e) {}
    $w("wVid").srcObject = null; W.classList.remove("on");
    if (g.invite) sb.rpc("play_invite_status", { inv_id: g.invite, st: "ended" }).then(() => {}, () => {});
    if (!silent) toast(t("npEnded"));
  }
  async function join(inv) {
    sb.rpc("play_invite_status", { inv_id: inv.id, st: "joined" }).then(() => {}, () => {});
    connect({ room: inv.room, title: t("npP2", inv.pseudo || "?") + " · " + inv.game, input: true, peer: null, invite: inv.id });
  }
  /* watch a friend play (no controls) */
  function watch(friend) {
    const peer = "v" + Math.random().toString(36).slice(2, 10);
    connect({ room: "live-" + friend.id, title: t("lvWatching", friend.pseudo, friend.now_game || ""), input: false, peer, pseudo: me() && me().pseudo });
  }
  async function connect(o) {
    await refreshIce();
    if (guest) guestStop(true);
    closeSheet();
    $w("wQuit").textContent = t("quit"); $w("wTitle").textContent = o.title;
    $w("wSound").textContent = t("npSound"); $w("wSound").style.display = "none";
    $w("wPad").classList.toggle("hide", !o.input);
    W.classList.add("on"); guestMsg(t("npConnecting"));
    const pc = new RTCPeerConnection({ iceServers: ICE });
    const who = o.input ? "guest" : "viewer";
    guest = { pc, dc: null, invite: o.invite || null, buttons: {}, axis: [0, 0], input: o.input, peer: o.peer, who };
    const out = (m) => guest && guest.ch.send(Object.assign({ from: who }, o.peer ? { peer: o.peer, pseudo: o.pseudo } : {}, m));
    pc.ontrack = (e) => {
      try { e.receiver.playoutDelayHint = 0; e.receiver.jitterBufferTarget = 0; } catch (err) {}
      const v = $w("wVid");
      if (!v.srcObject) v.srcObject = new MediaStream();
      v.srcObject.addTrack(e.track);
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}); $w("wSound").style.display = "block"; });
    };
    pc.ondatachannel = (e) => { guest.dc = e.channel; guest.dc.onopen = () => { send(); guestMsg(""); }; };
    pc.onicecandidate = (e) => { if (e.candidate && guest) out({ kind: "ice", data: e.candidate.toJSON() }); };
    pc.onconnectionstatechange = () => {
      if (!guest || guest.pc !== pc) return;
      if (pc.connectionState === "connected") { guestMsg(""); clearInterval(guest.timer); try { window.kameiPetEvent && window.kameiPetEvent(o.input ? "netplay" : "watch"); } catch (e) {} }
      if (pc.connectionState === "failed") guestMsg(t("npFail"));
    };
    guest.ch = channel(o.room, async (m) => {
      if (!guest || m.from !== "host") return;
      if (o.peer && m.to !== o.peer) return;
      try {
        if (m.kind === "offer") { await pc.setRemoteDescription(m.data); const a = await pc.createAnswer(); await pc.setLocalDescription(a); out({ kind: "answer", data: pc.localDescription.toJSON() }); }
        if (m.kind === "ice" && m.data) await pc.addIceCandidate(m.data);
        if (m.kind === "info" && m.game) $w("wTitle").textContent = o.title.replace(/·\s*$/, "· " + m.game);
        if (m.kind === "full") { guestStop(true); toast(t("lvFull"), 4000); }
        if (m.kind === "bye") { guestStop(true); toast(t("npEnded"), 4000); }
      } catch (e) {}
    });
    // say hello until the host answers (he may still be loading the game)
    const hello = () => { if (guest && pc.signalingState === "stable" && !pc.remoteDescription) out({ kind: "hello" }); };
    hello(); guest.timer = setInterval(hello, 2500);
    setTimeout(() => { if (guest && guest.pc === pc && pc.connectionState !== "connected") guestMsg(o.input ? t("npFail") : t("lvNotLive")); }, o.input ? 30000 : 15000);
    requestAnimationFrame(gpLoop);
  }
  $w("wQuit").onclick = () => guestStop();
  $w("wSound").onclick = () => { const v = $w("wVid"); v.muted = false; v.play().catch(() => {}); $w("wSound").style.display = "none"; };

  /* ======================= Invitations ======================= */
  let seen = {}; try { seen = JSON.parse(sessionStorage.getItem("kamei-np-seen") || "{}"); } catch (e) {}
  async function poll() {
    if (!me() || guest || document.visibilityState !== "visible" || (window.kameiFeature && !window.kameiFeature("netplay"))) return;
    try {
      const since = new Date(Date.now() - 10 * 60000).toISOString();
      const r = await sb.from("play_invites").select("id,from_user,game,system,room,created_at,status").eq("to_user", me().id).eq("status", "pending").gt("created_at", since).order("created_at", { ascending: false }).limit(1);
      const inv = r.data && r.data[0];
      if (!inv || seen[inv.id]) return;
      seen[inv.id] = 1; try { sessionStorage.setItem("kamei-np-seen", JSON.stringify(seen)); } catch (e) {}
      const p = await sb.from("profiles").select("pseudo").eq("id", inv.from_user).maybeSingle();
      inv.pseudo = (p.data && p.data.pseudo) || "?";
      try { window.kameiVibe && window.kameiVibe(60); } catch (e) {}
      if (document.getElementById("player").classList.contains("on")) {   // already playing: just a card
        window.kameiNotify && window.kameiNotify("🎮 " + inv.pseudo, t("npInvited", inv.pseudo, inv.game), () => join(inv));
        return;
      }
      openSheet(`<h3>🎮 ${t("npTitle")}</h3><p class="hint" style="color:var(--text);font-size:15px">${esc(t("npInvited", inv.pseudo, inv.game))}</p>
        <div class="btns"><button id="npNo">${t("npLater")}</button><button class="ok" id="npYes">${t("npJoin")}</button></div>`);
      document.getElementById("npNo").onclick = () => { closeSheet(); sb.rpc("play_invite_status", { inv_id: inv.id, st: "declined" }).then(() => {}, () => {}); };
      document.getElementById("npYes").onclick = () => join(inv);
    } catch (e) {}
  }
  setTimeout(poll, 6000);
  setInterval(poll, 12000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") setTimeout(poll, 800); });

  window.kameiPlay = { invite: inviteSheet, join, watch, allowWatch, setAllowWatch: (v) => { try { localStorage.setItem("kamei-live", v ? "on" : "off"); } catch (e) {} if (!v) liveStop(); },
    stopHost: hostStop, stopGuest: guestStop, poll, state: () => ({ host: !!host, live: !!(host && host.live), guest: !!guest, viewers: live ? Object.keys(live.viewers).length : 0 }) };
})();

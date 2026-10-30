/* Kamei Game Console — chat between friends (Supabase table "messages", see kamei-chat.sql) */
(function () {
  Object.assign(I18N.fr, {
    chatWith: (p) => `💬 Écrire à ${p}`, chatPh: "Ton message…", chatEmpty: "Pas encore de message. Dis bonjour 👋", chatSend: "Envoyer",
    chatErr: "Message pas envoyé", chatSlow: "Doucement ! Trop de messages d'un coup.", chatBanned: "Ton compte est bloqué.", chatNotFriend: "Vous n'êtes plus amis.",
    chatSetup: "Le chat n'est pas encore activé (l'admin doit lancer kamei-chat.sql dans Supabase).", chatDel: "Effacer ce message ?", chatNew: (p) => `💬 ${p}`,
    chatToday: "Aujourd'hui", chatYesterday: "Hier",
  });
  Object.assign(I18N.nl, {
    chatWith: (p) => `💬 Stuur ${p} een bericht`, chatPh: "Je bericht…", chatEmpty: "Nog geen berichten. Zeg hallo 👋", chatSend: "Versturen",
    chatErr: "Bericht niet verstuurd", chatSlow: "Rustig aan! Te veel berichten tegelijk.", chatBanned: "Je account is geblokkeerd.", chatNotFriend: "Jullie zijn geen vrienden meer.",
    chatSetup: "De chat is nog niet actief (de admin moet kamei-chat.sql in Supabase uitvoeren).", chatDel: "Dit bericht wissen?", chatNew: (p) => `💬 ${p}`,
    chatToday: "Vandaag", chatYesterday: "Gisteren",
  });
  Object.assign(I18N.en, {
    chatWith: (p) => `💬 Message ${p}`, chatPh: "Your message…", chatEmpty: "No messages yet. Say hi 👋", chatSend: "Send",
    chatErr: "Message not sent", chatSlow: "Slow down! Too many messages at once.", chatBanned: "Your account is blocked.", chatNotFriend: "You are no longer friends.",
    chatSetup: "Chat isn't enabled yet (the admin must run kamei-chat.sql in Supabase).", chatDel: "Delete this message?", chatNew: (p) => `💬 ${p}`,
    chatToday: "Today", chatYesterday: "Yesterday",
  });

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  if (!sb) return;
  const st = document.createElement("style");
  st.textContent = `
    .unread:empty { display: none; }
    .unread { min-width: 22px; height: 22px; padding: 0 6px; border-radius: 11px; background: #ff4757; color: #fff; font: 700 12px/22px Inter, sans-serif; text-align: center; flex: 0 0 auto; }
    .chat-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .chat-head h3 { margin: 0; flex: 1; }
    #chatList { height: 46vh; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding: 8px 2px; background: rgba(0,0,0,.18); border-radius: 14px; }
    .msg { max-width: 78%; padding: 8px 12px; border-radius: 16px; font-size: 15px; line-height: 1.35; white-space: pre-wrap; overflow-wrap: anywhere; background: #2a2a3c; align-self: flex-start; border-bottom-left-radius: 4px; }
    .msg.me { align-self: flex-end; background: var(--theme, #8fc63f); color: #0b0b12; border-bottom-left-radius: 16px; border-bottom-right-radius: 4px; }
    .msg small { display: block; font-size: 10px; opacity: .6; margin-top: 2px; text-align: right; }
    .msg-day { align-self: center; font-size: 11px; color: var(--muted); padding: 4px 0; }
    .chat-in { display: flex; gap: 8px; margin-top: 10px; }
    .chat-in textarea { flex: 1; resize: none; height: 44px; max-height: 120px; margin: 0; font: inherit; }
    .chat-in button { flex: 0 0 52px; height: 44px; border: 0; border-radius: 12px; background: var(--theme, #8fc63f); color: #0b0b12; font-size: 20px; font-weight: 800; }`;
  document.head.appendChild(st);

  let unread = [];          // unread messages sent to me
  let lastSeenId = null;    // to notify only for new ones
  let openWith = null, openTimer = null, shown = [];

  const errText = (e) => {
    const m = String((e && (e.message || e.details)) || e || "");
    if (/slow_down/.test(m)) return t("chatSlow");
    if (/banned/.test(m)) return t("chatBanned");
    if (/not_friend/.test(m)) return t("chatNotFriend");
    if (/chat_send|messages|schema cache|does not exist/.test(m)) return t("chatSetup");
    return t("chatErr");
  };
  const hhmm = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  function dayLabel(d) {
    const a = new Date(); a.setHours(0, 0, 0, 0);
    const diff = Math.round((a - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 86400000);
    return diff === 0 ? t("chatToday") : diff === 1 ? t("chatYesterday") : d.toLocaleDateString();
  }

  /* ---------- Unread counter + notifications ---------- */
  async function poll() {
    const m = me(); if (!m) return;
    try {
      const r = await sb.from("messages").select("id,from_user,body,created_at").eq("to_user", m.id).is("read_at", null).order("id");
      if (r.error) return;
      unread = r.data || [];
      const newest = unread.reduce((a, x) => Math.max(a, x.id), 0);
      if (lastSeenId !== null) {
        const fresh = unread.filter((x) => x.id > lastSeenId && x.from_user !== openWith);
        if (fresh.length && window.kameiNotify) {
          const ids = [...new Set(fresh.map((x) => x.from_user))];
          const p = await sb.from("profiles").select("id,pseudo,color").in("id", ids);
          const who = (id) => (p.data || []).find((x) => x.id === id) || { id, pseudo: "?" };
          const last = fresh[fresh.length - 1];
          window.kameiNotify(t("chatNew", who(last.from_user).pseudo), last.body.slice(0, 120) + (fresh.length > 1 ? ` (+${fresh.length - 1})` : ""), () => open(who(last.from_user)));
        }
      }
      lastSeenId = Math.max(lastSeenId || 0, newest);
      if (window.kameiBadge) window.kameiBadge("chat", unread.length);
      paintFriends();
      if (window.kameiNav) window.kameiNav.refresh();
    } catch (e) {}
  }
  function paintFriends() {
    document.querySelectorAll("[data-un]").forEach((el) => { const n = unreadFrom(el.dataset.un); el.textContent = n ? String(n) : ""; });
  }
  const unreadFrom = (id) => unread.filter((x) => x.from_user === id).length;
  let hiddenTick = 0;
  setInterval(() => { if (document.visibilityState === "visible" || ++hiddenTick % 3 === 0) poll(); }, 30000);
  setTimeout(poll, 5000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") poll(); });

  /* ---------- Conversation ---------- */
  async function load(friend) {
    const m = me();
    const r = await sb.from("messages").select("id,from_user,to_user,body,created_at,read_at")
      .or(`and(from_user.eq.${m.id},to_user.eq.${friend.id}),and(from_user.eq.${friend.id},to_user.eq.${m.id})`)
      .order("id", { ascending: false }).limit(80);
    if (r.error) throw r.error;
    return (r.data || []).reverse();
  }
  function render(list, friend) {
    const box = document.getElementById("chatList"); if (!box) return;
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 60;
    let day = "", html = "";
    for (const x of list) {
      const d = new Date(x.created_at), dl = dayLabel(d);
      if (dl !== day) { day = dl; html += `<div class="msg-day">${esc(dl)}</div>`; }
      const mine = x.from_user === me().id;
      html += `<div class="msg ${mine ? "me" : ""}" data-mid="${x.id}" data-mine="${mine ? 1 : ""}">${esc(x.body)}<small>${hhmm(d)}${mine && x.read_at ? " ✓✓" : ""}</small></div>`;
    }
    box.innerHTML = html || `<p class="hint" style="margin:auto;text-align:center">${t("chatEmpty")}</p>`;
    if (atBottom || !shown.length) box.scrollTop = box.scrollHeight;
    shown = list;
    box.querySelectorAll('[data-mine="1"]').forEach((el) => {
      let tm = null;
      el.addEventListener("touchstart", () => { tm = setTimeout(() => del(+el.dataset.mid, friend), 650); }, { passive: true });
      el.addEventListener("touchend", () => clearTimeout(tm)); el.addEventListener("touchmove", () => clearTimeout(tm), { passive: true });
      el.addEventListener("contextmenu", (e) => { e.preventDefault(); del(+el.dataset.mid, friend); });
    });
  }
  async function del(id, friend) {
    if (!confirmBox(t("chatDel"))) return;
    await sb.rpc("chat_delete", { msg_id: id });
    refresh(friend);
  }
  function confirmBox(q) { try { return window.confirm(q); } catch (e) { return false; } }
  async function refresh(friend) {
    if (openWith !== friend.id || !document.getElementById("chatList")) return stop();
    try {
      const list = await load(friend);
      const sig = list.map((x) => x.id + (x.read_at ? "r" : "")).join(",");
      if (sig !== shown.map((x) => x.id + (x.read_at ? "r" : "")).join(",")) render(list, friend);
      if (list.some((x) => x.to_user === me().id && !x.read_at)) { await sb.rpc("chat_read", { other: friend.id }); poll(); }
    } catch (e) {
      const box = document.getElementById("chatList"); if (box && !shown.length) box.innerHTML = `<p class="hint err" style="margin:auto;text-align:center">${esc(errText(e))}</p>`;
    }
  }
  function stop() { clearInterval(openTimer); openTimer = null; openWith = null; shown = []; }
  function open(friend) {
    if (!me() || !friend) return;
    stop();
    openWith = friend.id;
    openSheet(`<div class="chat-head">${window.kameiAvatar ? window.kameiAvatar(friend, 40) : ""}<h3>${esc(friend.pseudo)}</h3><button class="mini" id="chBack">←</button></div>
      <div id="chatList"><p class="hint" style="margin:auto">…</p></div>
      <div class="chat-in"><textarea id="chIn" maxlength="500" placeholder="${t("chatPh")}" rows="1"></textarea><button class="ok" id="chSend">➤</button></div>`);
    const inp = document.getElementById("chIn");
    document.getElementById("chBack").onclick = () => { stop(); if (window.kameiNav) { closeSheet(); window.kameiNav.refresh(); } else if (window.kameiFriendsSheet) window.kameiFriendsSheet(); else closeSheet(); };
    const send = async () => {
      const v = inp.value.trim(); if (!v) return;
      const b = document.getElementById("chSend"); b.disabled = true;
      const r = await sb.rpc("chat_send", { to_id: friend.id, msg: v });
      b.disabled = false;
      if (r.error) return toast(errText(r.error), 3500);
      inp.value = ""; inp.style.height = "";
      try { window.kameiVibe && window.kameiVibe(12); } catch (e) {}
      refresh(friend);
    };
    document.getElementById("chSend").onclick = send;
    inp.addEventListener("input", () => { inp.style.height = "auto"; inp.style.height = Math.min(120, inp.scrollHeight) + "px"; });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });
    refresh(friend);
    openTimer = setInterval(() => { if (document.visibilityState === "visible") refresh(friend); }, 4000);
  }
  // closing the sheet stops the live refresh
  document.getElementById("sheetBg").addEventListener("click", (e) => { if (e.target.id === "sheetBg") { const was = openWith; stop(); if (was && window.kameiNav) window.kameiNav.refresh(); } });

  window.kameiChat = { open, poll, paintFriends, unreadFrom, unreadCount: () => unread.length };
})();

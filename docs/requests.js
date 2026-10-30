/* Kamei Game Console — game requests (sent to the Discord server, status buttons there) */
(function () {
  Object.assign(I18N.fr, {
    navRequests: "Demandes", rqTitle: "Demandes de jeux",
    rqHint: "Une idée de jeu que tu aimerais que Kamei Productions crée ? Envoie-la ici ! (Les jeux du commerce comme Pokémon ou Mario ne peuvent pas être envoyés.)",
    rqName: "Nom ou idée du jeu", rqSys: "Console : peu importe", rqDetails: "Décris ton idée (optionnel)", rqSend: "📨 Envoyer la demande",
    rqMine: "Mes demandes", rqAll: "Toutes les demandes", rqNone: "Aucune demande pour l'instant.", rqSent: "Demande envoyée ! Tu seras prévenu quand elle avance.",
    rqTooMany: "Maximum 5 demandes par jour.", rqOff: "Les demandes ne sont pas encore activées.", rqShort: "Écris au moins le nom du jeu.", rqDel: "Supprimer",
    rqSt: { new: "🆕 Envoyée", progress: "🛠️ En cours", accepted: "✅ Acceptée", refused: "❌ Refusée", done: "📦 Dispo !" },
    rqNotif: { progress: "Ta demande est en cours 🛠️", accepted: "Ta demande est acceptée ✅", refused: "Ta demande est refusée ❌", done: "Ton jeu est dispo dans le catalogue ! 📦" },
  });
  Object.assign(I18N.nl, {
    navRequests: "Aanvragen", rqTitle: "Spelaanvragen",
    rqHint: "Een idee voor een spel dat Kamei Productions moet maken? Stuur het hier! (Commerciële spellen zoals Pokémon of Mario kunnen niet verstuurd worden.)",
    rqName: "Naam of idee van het spel", rqSys: "Console: maakt niet uit", rqDetails: "Beschrijf je idee (optioneel)", rqSend: "📨 Aanvraag versturen",
    rqMine: "Mijn aanvragen", rqAll: "Alle aanvragen", rqNone: "Nog geen aanvragen.", rqSent: "Aanvraag verstuurd! Je krijgt een melding als ze vordert.",
    rqTooMany: "Maximum 5 aanvragen per dag.", rqOff: "Aanvragen zijn nog niet actief.", rqShort: "Schrijf minstens de naam van het spel.", rqDel: "Verwijderen",
    rqSt: { new: "🆕 Verstuurd", progress: "🛠️ Bezig", accepted: "✅ Aanvaard", refused: "❌ Geweigerd", done: "📦 Beschikbaar!" },
    rqNotif: { progress: "Je aanvraag is in behandeling 🛠️", accepted: "Je aanvraag is aanvaard ✅", refused: "Je aanvraag is geweigerd ❌", done: "Je spel is beschikbaar in de catalogus! 📦" },
  });
  Object.assign(I18N.en, {
    navRequests: "Requests", rqTitle: "Game requests",
    rqHint: "A game idea you'd like Kamei Productions to make? Send it here! (Commercial games like Pokémon or Mario can't be sent.)",
    rqName: "Game name or idea", rqSys: "Console: any", rqDetails: "Describe your idea (optional)", rqSend: "📨 Send the request",
    rqMine: "My requests", rqAll: "All requests", rqNone: "No requests yet.", rqSent: "Request sent! You'll be notified when it moves forward.",
    rqTooMany: "Maximum 5 requests per day.", rqOff: "Requests aren't enabled yet.", rqShort: "Write at least the game's name.", rqDel: "Delete",
    rqSt: { new: "🆕 Sent", progress: "🛠️ In progress", accepted: "✅ Accepted", refused: "❌ Declined", done: "📦 Available!" },
    rqNotif: { progress: "Your request is in progress 🛠️", accepted: "Your request was accepted ✅", refused: "Your request was declined ❌", done: "Your game is available in the catalogue! 📦" },
  });

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const st = document.createElement("style");
  st.textContent = `
    .rqform { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .rqform input, .rqform select, .rqform textarea { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid var(--line); background: var(--bg); color: var(--text); font: inherit; margin: 0; }
    .rqform textarea { min-height: 70px; resize: vertical; }
    .rqform .ok { padding: 13px; border-radius: 12px; border: 0; font-weight: 800; background: var(--tacc, #8fc63f); color: #0b0b12; }
    .rq { padding: 12px; border-radius: 16px; background: rgba(255,255,255,.04); margin-bottom: 8px; }
    .rq .top { display: flex; gap: 8px; align-items: flex-start; }
    .rq b { flex: 1; font-size: 15px; }
    .rq .chip { flex: 0 0 auto; font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: 10px; background: #2a2a3c; }
    .rq .chip.progress { background: #1e3a8a; } .rq .chip.accepted { background: #14532d; } .rq .chip.refused { background: #7f1d1d; } .rq .chip.done { background: #78350f; }
    .rq small { display: block; color: var(--muted); font-size: 12px; margin-top: 3px; }
    .rq p { margin: 6px 0 0; font-size: 13px; color: #d4d4e0; white-space: pre-wrap; }
    .rq .adm { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .rq .adm button { border: 0; border-radius: 10px; padding: 7px 10px; background: #23233a; color: var(--text); font: 600 12px Inter, sans-serif; }
    .rq .adm button.on { background: var(--tacc, #8fc63f); color: #0b0b12; }`;
  document.head.appendChild(st);

  async function errOf(r) {
    let m = (r.error && r.error.message) || "";
    try { if (r.error && r.error.context && r.error.context.json) { const j = await r.error.context.json(); m = (j && j.error) || m; } } catch (e) {}
    if (/too_many/.test(m)) return t("rqTooMany");
    if (/404|not found|Failed to send|FunctionsFetchError|relay/i.test(m) || /request_create/.test(m)) return t("rqOff");
    return m || t("rqOff");
  }

  async function render(v) {
    if (!sb || !me()) return;
    const admin = !!me().is_admin;
    if (!v.querySelector(".rqform")) {
      v.innerHTML = `<h2>${t("rqTitle")}</h2><p class="hint">${t("rqHint")}</p>
        <div class="rqform"><input id="rqT" maxlength="80" placeholder="${t("rqName")}">
          <select id="rqS"><option value="">${t("rqSys")}</option>${Object.values(SYSTEMS).map((s) => `<option>${esc(s.label)}</option>`).join("")}</select>
          <textarea id="rqD" maxlength="500" placeholder="${t("rqDetails")}"></textarea>
          <button class="ok" id="rqSend">${t("rqSend")}</button></div>
        <h3 id="rqH"></h3><div id="rqList"><p class="hint">…</p></div>`;
      v.querySelector("#rqSend").onclick = async () => {
        const title = v.querySelector("#rqT").value.trim();
        if (title.length < 2) return toast(t("rqShort"));
        const b = v.querySelector("#rqSend"); b.disabled = true;
        const r = await sb.functions.invoke("kamei-discord", { body: { action: "request", title, system: v.querySelector("#rqS").value, details: v.querySelector("#rqD").value.trim() } });
        b.disabled = false;
        if (r.error || !r.data || !r.data.ok) return toast(await errOf(r), 4000);
        v.querySelector("#rqT").value = ""; v.querySelector("#rqD").value = "";
        toast(t("rqSent"), 4000); try { window.kameiVibe && window.kameiVibe(20); } catch (e) {}
        list(v);
      };
    }
    v.querySelector("#rqH").textContent = admin ? t("rqAll") : t("rqMine");
    list(v);
  }
  async function list(v) {
    const admin = !!me().is_admin;
    const r = await sb.from("game_requests").select("*,profiles(pseudo)").order("created_at", { ascending: false }).limit(100);
    const box = v.querySelector("#rqList"); if (!box) return;
    if (r.error) { box.innerHTML = `<p class="hint">${t("rqOff")}</p>`; return; }
    const rows = r.data || [];
    remember(rows.filter((x) => x.user_id === me().id));
    newCount = admin ? rows.filter((x) => x.status === "new").length : 0;
    box.innerHTML = rows.length ? rows.map((x) => `<div class="rq"><div class="top"><b>${esc(x.title)}</b><span class="chip ${x.status}">${t("rqSt")[x.status] || x.status}</span></div>
        <small>${admin && x.profiles ? esc(x.profiles.pseudo) + " · " : ""}${x.system ? esc(x.system) + " · " : ""}${ago(new Date(x.created_at).getTime())}</small>
        ${x.details ? `<p>${esc(x.details)}</p>` : ""}
        ${admin ? `<div class="adm">${["progress", "accepted", "refused", "done"].map((k) => `<button data-rs="${x.id}:${k}" class="${x.status === k ? "on" : ""}">${t("rqSt")[k]}</button>`).join("")}<button data-rd="${x.id}">🗑️</button></div>` : ""}</div>`).join("")
      : `<p class="hint">${t("rqNone")}</p>`;
    box.querySelectorAll("[data-rs]").forEach((b) => b.onclick = async () => {
      const [id, stt] = b.dataset.rs.split(":");
      const e = await sb.rpc("request_set_status", { rid: +id, st: stt });
      if (e.error) return toast(e.error.message, 4000);
      sb.functions.invoke("kamei-discord", { body: { action: "sync", id: +id } }).catch(() => {});   // update the Discord message too
      list(v);
    });
    box.querySelectorAll("[data-rd]").forEach((b) => b.onclick = async () => { await sb.rpc("request_delete", { rid: +b.dataset.rd }); list(v); });
    if (window.kameiNav) window.kameiNav.refresh();
  }

  /* ---------- Notify the player when the status of his request changes (app open) ---------- */
  let known = null, newCount = 0;
  function remember(mine) {
    if (!known) { try { known = JSON.parse(localStorage.getItem("kamei-req-st") || "{}"); } catch (e) { known = {}; } }
    for (const x of mine) known[x.id] = x.status;
    try { localStorage.setItem("kamei-req-st", JSON.stringify(known)); } catch (e) {}
  }
  async function poll() {
    if (!sb || !me()) return;
    try {
      const r = await sb.from("game_requests").select("id,title,status,user_id").order("created_at", { ascending: false }).limit(100);
      if (r.error) return;
      const mine = r.data.filter((x) => x.user_id === me().id);
      if (!known) { try { known = JSON.parse(localStorage.getItem("kamei-req-st") || "null"); } catch (e) { known = null; } }
      if (known) for (const x of mine) if (known[x.id] && known[x.id] !== x.status && x.status !== "new" && window.kameiNotify) {
        window.kameiNotify("📨 " + x.title, t("rqNotif")[x.status], () => window.kameiNav && window.kameiNav.go("requests"));
      }
      known = known || {}; remember(mine);
      newCount = me().is_admin ? r.data.filter((x) => x.status === "new").length : 0;
      if (window.kameiNav) window.kameiNav.refresh();
    } catch (e) {}
  }
  setTimeout(poll, 9000);
  setInterval(() => { if (document.visibilityState === "visible") poll(); }, 120000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") poll(); });

  window.kameiRequests = { render, poll, badge: () => newCount };
})();

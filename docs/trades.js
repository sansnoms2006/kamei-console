/* Kamei Game Console — Pokémon trades between friends */
(function () {
  const sb = window.kameiSB;
  const STR = {
    fr: {
      trades: "🔁 Échanges Pokémon", tradesTitle: "Échanges Pokémon", newTrade: "Proposer un échange", received: "Propositions reçues", sent: "Mes propositions",
      noTrades: "Aucun échange en cours.", pickGame: "Avec quel jeu ?", pickMon: "Quel Pokémon ?", pickFriend: "À quel ami ?", noFriends: "Ajoute d'abord des amis.",
      emptyBoxes: "📦 Aucun Pokémon dans les boîtes du PC. Dans le jeu : va au PC d'un Centre Pokémon, dépose le Pokémon dans une boîte, sauvegarde, puis quitte le jeu et reviens ici.",
      noGames: "Aucun jeu Pokémon compatible trouvé. Il faut avoir joué et sauvegardé au moins une fois dans le jeu.",
      boxOnly: "Seuls les Pokémon rangés dans les boîtes du PC peuvent être échangés.", box: (n) => `Boîte ${n}`, lv: (n) => `N.${n}`,
      offers: (who) => `${who} te propose :`, youGive: "Tu donnes", youGet: "Tu reçois", confirmOffer: "Proposer", accept: "Accepter", decline: "Refuser", cancelT: "Annuler l'échange",
      waiting: "En attente de réponse", accepted: "Accepté ✅", declined: "Refusé", cancelled: "Annulé",
      evoTitle: "Quoi ? Ton Pokémon évolue !", evoText: (a, b) => `${a} a évolué en ${b} !`, evoBox: "Il t'attend dans ta boîte PC.",
      offered: "Proposition envoyée ! Ton Pokémon est mis de côté en attendant.", doneGet: (n) => `${n} est arrivé dans ta boîte ! 🎉`, doneBack: (n) => `${n} est revenu dans ta boîte.`,
      chooseAnswer: "Choisis ce que tu donnes en échange", sameFamily: (f) => `Il faut un jeu de la même génération : ${f}.`,
      gameRunning: "Ferme le jeu avant d'échanger.", saveBad: "Sauvegarde de ce jeu non reconnue.", boxesFull: "Tes boîtes sont pleines.", tooNew: "Ce Pokémon n'existe pas dans ce jeu.",
      errGeneric: "L'échange n'a pas pu se faire. Rien n'a été modifié.", unavailable: "Cet échange n'est plus disponible.",
      backups: "Sauvegardes de secours", backupsHint: "Une copie est faite avant chaque échange. Restaure-la si quelque chose s'est mal passé.", restore: "Restaurer", restored: "Sauvegarde restaurée",
      newOffer: (who) => `${who} te propose un échange Pokémon !`, pickGameFor: (n) => `Dans quel jeu mettre ${n} ?`, egg: "Œuf",
    },
    nl: {
      trades: "🔁 Pokémon ruilen", tradesTitle: "Pokémon ruilen", newTrade: "Ruil voorstellen", received: "Ontvangen voorstellen", sent: "Mijn voorstellen",
      noTrades: "Geen lopende ruilen.", pickGame: "Met welk spel?", pickMon: "Welke Pokémon?", pickFriend: "Met welke vriend?", noFriends: "Voeg eerst vrienden toe.",
      emptyBoxes: "📦 Geen Pokémon in de pc-boxen. In het spel: ga naar de pc in een Pokémon Center, zet de Pokémon in een box, sla op, sluit het spel en kom hier terug.",
      noGames: "Geen compatibel Pokémon-spel gevonden. Je moet minstens één keer in het spel hebben opgeslagen.",
      boxOnly: "Alleen Pokémon in de pc-boxen kunnen geruild worden.", box: (n) => `Box ${n}`, lv: (n) => `Lv.${n}`,
      offers: (who) => `${who} stelt voor:`, youGive: "Je geeft", youGet: "Je krijgt", confirmOffer: "Voorstellen", accept: "Aanvaarden", decline: "Weigeren", cancelT: "Ruil annuleren",
      waiting: "Wacht op antwoord", accepted: "Aanvaard ✅", declined: "Geweigerd", cancelled: "Geannuleerd",
      evoTitle: "Wat? Je Pokémon evolueert!", evoText: (a, b) => `${a} is geëvolueerd tot ${b}!`, evoBox: "Hij wacht op je in je pc-box.",
      offered: "Voorstel verstuurd! Je Pokémon wordt aan de kant gezet.", doneGet: (n) => `${n} is in je box aangekomen! 🎉`, doneBack: (n) => `${n} is terug in je box.`,
      chooseAnswer: "Kies wat je in ruil geeft", sameFamily: (f) => `Je hebt een spel van dezelfde generatie nodig: ${f}.`,
      gameRunning: "Sluit het spel voor je ruilt.", saveBad: "Opslag van dit spel niet herkend.", boxesFull: "Je boxen zijn vol.", tooNew: "Deze Pokémon bestaat niet in dit spel.",
      errGeneric: "De ruil is mislukt. Er is niets gewijzigd.", unavailable: "Deze ruil is niet meer beschikbaar.",
      backups: "Reservekopieën", backupsHint: "Voor elke ruil wordt een kopie gemaakt. Zet ze terug als er iets misliep.", restore: "Terugzetten", restored: "Opslag teruggezet",
      newOffer: (who) => `${who} stelt een Pokémon-ruil voor!`, pickGameFor: (n) => `In welk spel komt ${n}?`, egg: "Ei",
    },
    en: {
      trades: "🔁 Pokémon trades", tradesTitle: "Pokémon trades", newTrade: "Offer a trade", received: "Offers received", sent: "My offers",
      noTrades: "No trades in progress.", pickGame: "Which game?", pickMon: "Which Pokémon?", pickFriend: "Which friend?", noFriends: "Add some friends first.",
      emptyBoxes: "📦 No Pokémon in the PC boxes. In the game: use the PC in a Pokémon Center, deposit the Pokémon in a box, save, then close the game and come back here.",
      noGames: "No compatible Pokémon game found. You need to have saved in the game at least once.",
      boxOnly: "Only Pokémon stored in PC boxes can be traded.", box: (n) => `Box ${n}`, lv: (n) => `Lv.${n}`,
      offers: (who) => `${who} offers:`, youGive: "You give", youGet: "You get", confirmOffer: "Offer", accept: "Accept", decline: "Decline", cancelT: "Cancel trade",
      waiting: "Waiting for an answer", accepted: "Accepted ✅", declined: "Declined", cancelled: "Cancelled",
      evoTitle: "What? Your Pokémon is evolving!", evoText: (a, b) => `${a} evolved into ${b}!`, evoBox: "It's waiting for you in your PC box.",
      offered: "Offer sent! Your Pokémon is set aside meanwhile.", doneGet: (n) => `${n} arrived in your box! 🎉`, doneBack: (n) => `${n} is back in your box.`,
      chooseAnswer: "Choose what you give in exchange", sameFamily: (f) => `You need a game of the same generation: ${f}.`,
      gameRunning: "Close the game before trading.", saveBad: "This game's save wasn't recognized.", boxesFull: "Your boxes are full.", tooNew: "This Pokémon doesn't exist in that game.",
      errGeneric: "The trade couldn't happen. Nothing was changed.", unavailable: "This trade is no longer available.",
      backups: "Backup saves", backupsHint: "A copy is made before every trade. Restore it if something went wrong.", restore: "Restore", restored: "Save restored",
      newOffer: (who) => `${who} offers you a Pokémon trade!`, pickGameFor: (n) => `Which game should ${n} go to?`, egg: "Egg",
    },
  };
  for (const l of Object.keys(STR)) Object.assign(I18N[l], STR[l]);
  const FAM = { fr: { g12: "1re / 2e génération (Game Boy)", g3: "3e génération (GBA)", g4: "4e génération (DS)", g5: "5e génération (DS)" }, nl: { g12: "1e / 2e generatie (Game Boy)", g3: "3e generatie (GBA)", g4: "4e generatie (DS)", g5: "5e generatie (DS)" }, en: { g12: "Gen 1 / 2 (Game Boy)", g3: "Gen 3 (GBA)", g4: "Gen 4 (DS)", g5: "Gen 5 (DS)" } };
  const famLabel = (f) => (FAM[lang] || FAM.fr)[f] || f;
  const monName = (sp) => PKX.name(sp, lang === "fr" ? "fr" : "en");
  const monCard = (m, extra = "") => `<span class="mon"><img src="${PKX.sprite(m.species, m.shiny)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><b>${m.egg ? t("egg") : esc(monName(m.species))}${m.shiny ? " ✨" : ""}</b><small>${t("lv", m.level)}${extra}</small></span>`;

  /* ---------- Emulator save files (IndexedDB used by the emulator) ---------- */
  function idb(name, upgrade) {
    return new Promise((res, rej) => { const r = upgrade ? indexedDB.open(name, 1) : indexedDB.open(name); if (upgrade) r.onupgradeneeded = () => upgrade(r.result); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  }
  const req = (r) => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  async function findSave(game) {
    const db = await idb("/data/saves");
    if (!db.objectStoreNames.contains("FILE_DATA")) return null;
    const st = db.transaction("FILE_DATA").objectStore("FILE_DATA");
    const keys = await req(st.getAllKeys());
    const key = keys.find((k) => typeof k === "string" && (k.endsWith("/" + game.saveKey + ".sav") || k.endsWith("/" + game.saveKey + ".srm")));
    if (!key) return null;
    const rec = await req(db.transaction("FILE_DATA").objectStore("FILE_DATA").get(key));
    if (!rec || !rec.contents) return null;
    return { key, rec, bytes: new Uint8Array(rec.contents) };
  }
  async function writeSave(found, bytes) {
    const db = await idb("/data/saves");
    const rec = Object.assign({}, found.rec, { contents: new Uint8Array(bytes), timestamp: new Date() });
    const tx = db.transaction("FILE_DATA", "readwrite"); tx.objectStore("FILE_DATA").put(rec, found.key);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
  }
  const bdb = () => idb("kamei-backups", (d) => d.createObjectStore("b", { autoIncrement: true }));
  async function backup(game, bytes) {
    const db = await bdb();
    const tx = db.transaction("b", "readwrite"); const st = tx.objectStore("b");
    st.add({ saveKey: game.saveKey, title: game.title, time: Date.now(), bytes: new Uint8Array(bytes) });
    await new Promise((r) => (tx.oncomplete = r));
    // keep the 6 most recent per game
    const all = await req((await bdb()).transaction("b").objectStore("b").getAll());
    const keys = await req((await bdb()).transaction("b").objectStore("b").getAllKeys());
    const mine = keys.map((k, i) => [k, all[i]]).filter(([, v]) => v.saveKey === game.saveKey).sort((a, b) => b[1].time - a[1].time).slice(6);
    if (mine.length) { const tx2 = (await bdb()).transaction("b", "readwrite"); mine.forEach(([k]) => tx2.objectStore("b").delete(k)); }
  }

  async function pokemonGames() {
    const out = [];
    for (const g of games.filter((x) => ["gb", "gbc", "gba", "nds"].includes(x.system))) {
      try {
        const f = await findSave(g); if (!f) continue;
        const sv = PKX.open(f.bytes); if (!sv) continue;
        out.push({ game: g, save: sv, found: f });
      } catch (e) {}
    }
    return out;
  }
  async function reopen(g) { const f = await findSave(g); if (!f) throw new Error(t("saveBad")); const sv = PKX.open(f.bytes); if (!sv) throw new Error(t("saveBad")); return { game: g, save: sv, found: f }; }
  const me = () => window.kameiMe && window.kameiMe();
  async function friends() {
    const f = await sb.from("friendships").select("friend_id").eq("user_id", me().id);
    const ids = (f.data || []).map((x) => x.friend_id);
    if (!ids.length) return [];
    return (await sb.from("profiles").select("id,pseudo,color").in("id", ids)).data || [];
  }
  function errText(e) {
    const m = String((e && e.message) || e);
    if (/boxes full/.test(m)) return t("boxesFull");
    if (/species not/.test(m)) return t("tooNew");
    if (/trade_unavailable/.test(m)) return t("unavailable");
    if (/fetch|network/i.test(m)) return t("netErr");
    return m.length < 80 ? m : t("errGeneric");
  }

  /* ---------- Trade evolution: a little celebration ---------- */
  function evolved(evo) {
    try { window.kameiVibe && window.kameiVibe(80); } catch (e) {}
    openSheet(`<div style="text-align:center;padding:6px 0 4px">
        <p class="hint" style="margin:0 0 6px">${t("evoTitle")}</p>
        <div style="display:flex;align-items:center;justify-content:center;gap:10px">
          <img src="${PKX.sprite(evo.from)}" alt="" style="width:88px;image-rendering:pixelated;filter:brightness(1.6) saturate(0)">
          <span style="font-size:28px">✨➜</span>
          <img src="${PKX.sprite(evo.to)}" alt="" style="width:110px;image-rendering:pixelated;animation:kevo .9s ease">
        </div>
        <h3 style="margin:8px 0 4px">${esc(t("evoText", monName(evo.from), monName(evo.to)))}</h3>
        <p class="hint">${t("evoBox")}</p></div>
      <div class="btns"><button class="ok" id="evoOk">${t("ok")}</button></div>
      <style>@keyframes kevo { 0% { transform: scale(.3); filter: brightness(4); } 70% { transform: scale(1.15); } 100% { transform: scale(1); filter: none; } }</style>`);
    document.getElementById("evoOk").onclick = () => { closeSheet(); hub(); };
  }

  /* ---------- Finish my trades that got an answer ---------- */
  const doneKey = "kamei-trades-done";
  const localDone = () => { try { return JSON.parse(localStorage.getItem(doneKey) || "[]"); } catch (e) { return []; } };
  async function finishPending(silent) {
    if (!sb || !me()) return;
    const r = await sb.from("trades").select("*").eq("from_user", me().id).eq("from_done", false).neq("status", "offered");
    for (const tr of r.data || []) {
      const back = tr.status !== "accepted";
      const pk = back ? tr.from_pk : tr.to_pk, species = back ? tr.from_species : tr.to_species;
      if (!localDone().includes(tr.id)) {
        let g = games.find((x) => x.saveKey === tr.from_game);
        let target = null;
        try { if (g) { target = await reopen(g); if (target.save.family !== tr.family) target = null; } } catch (e) { target = null; }
        if (!target && silent) continue;   // ask the player when the Trades screen is opened
        if (!target) {
          const cands = (await pokemonGames()).filter((x) => x.save.family === tr.family);
          if (!cands.length) continue;
          if (cands.length === 1) target = cands[0];
          else target = await new Promise((res) => {
            openSheet(`<h3>${t("pickGameFor", esc(monName(species)))}</h3>` + cands.map((c, i) => `<button class="row" data-i="${i}">${esc(c.game.title)} · ${esc(c.save.label)}</button>`).join(""));
            document.querySelectorAll("#sheet [data-i]").forEach((b) => b.onclick = () => res(cands[+b.dataset.i]));
          });
        }
        await backup(target.game, target.found.bytes);
        let got = PKX.fromB64(pk), evo = null;
        // trade evolution (Kadabra → Alakazam…), only for a Pokémon really received from someone
        if (!back && PKX.evolve) { try { evo = PKX.evolve(got, tr.family, tr.from_species, target.save.maxSpecies); if (evo) got = evo.bytes; } catch (e) { evo = null; } }
        target.save.put(got);
        await writeSave(target.found, target.save.bytes());
        const list = localDone(); list.push(tr.id); localStorage.setItem(doneKey, JSON.stringify(list.slice(-200)));
        if (evo) evolved(evo); else toast(back ? t("doneBack", monName(species)) : t("doneGet", monName(species)), 4500);
      }
      await sb.rpc("trade_finish", { trade_id: tr.id }); try { window.kameiPetEvent && window.kameiPetEvent("trade"); } catch (e) {} 
    }
  }

  /* ---------- Screens ---------- */
  async function hub() {
    if (!sb || !me()) return window.kameiAccount && window.kameiAccount.open();
    openSheet(`<h3>${t("tradesTitle")}</h3><p class="hint">…</p>`);
    try { await finishPending(false); } catch (e) { toast(errText(e), 4000); }
    const r = await sb.from("trades").select("*").or(`from_user.eq.${me().id},to_user.eq.${me().id}`).order("created_at", { ascending: false }).limit(30);
    const list = r.data || [];
    const ids = [...new Set(list.flatMap((x) => [x.from_user, x.to_user]))];
    const names = {};
    if (ids.length) ((await sb.from("profiles").select("id,pseudo").in("id", ids)).data || []).forEach((p) => (names[p.id] = p.pseudo));
    const incoming = list.filter((x) => x.to_user === me().id && x.status === "offered");
    const mine = list.filter((x) => x.from_user === me().id);
    const mon = (sp, lv, sh) => ({ species: sp, level: lv || 1, shiny: sh });
    const statusTxt = (x) => x.status === "offered" ? t("waiting") : t(x.status);
    openSheet(`<h3>${t("tradesTitle")}</h3>
      <button class="row ok-row" id="trNew">＋ ${t("newTrade")}</button>
      ${incoming.length ? `<h4>${t("received")}</h4>` + incoming.map((x) => `<div class="trade">
          <div class="tline">${t("offers", esc(names[x.from_user] || "?"))}</div>${monCard(mon(x.from_species, x.from_level, x.from_shiny), " · " + famLabel(x.family))}
          <div class="btns"><button data-dec="${x.id}">${t("decline")}</button><button class="ok" data-acc="${x.id}">${t("accept")}</button></div></div>`).join("") : ""}
      ${mine.length ? `<h4>${t("sent")}</h4>` + mine.map((x) => `<div class="trade small">
          ${monCard(mon(x.from_species, x.from_level, x.from_shiny))}<span class="arrow">→ ${esc(names[x.to_user] || "?")}</span>
          ${x.status === "accepted" && x.to_species ? monCard(mon(x.to_species, x.to_level, x.to_shiny)) : ""}
          <span class="st ${x.status}">${statusTxt(x)}</span>${x.status === "offered" ? `<button class="mini" data-can="${x.id}">${t("cancelT")}</button>` : ""}</div>`).join("") : ""}
      ${!incoming.length && !mine.length ? `<p class="hint">${t("noTrades")}</p>` : ""}
      <button class="row" id="trBk">💾 ${t("backups")}</button>`);
    document.getElementById("trNew").onclick = newTrade;
    document.getElementById("trBk").onclick = backupsSheet;
    document.querySelectorAll("[data-acc]").forEach((b) => b.onclick = () => acceptFlow(list.find((x) => x.id == b.dataset.acc), names));
    document.querySelectorAll("[data-dec]").forEach((b) => b.onclick = async () => { const r2 = await sb.rpc("trade_decline", { trade_id: +b.dataset.dec }); if (r2.error) toast(errText(r2.error)); hub(); });
    document.querySelectorAll("[data-can]").forEach((b) => b.onclick = async () => {
      const r2 = await sb.rpc("trade_cancel", { trade_id: +b.dataset.can });
      if (r2.error) toast(errText(r2.error));
      hub();
    });
    refreshBadge();
  }

  async function pickGame(filterFamily) {
    const all = await pokemonGames();
    const cands = filterFamily ? all.filter((x) => x.save.family === filterFamily) : all;
    if (!cands.length) { openSheet(`<h3>${t("pickGame")}</h3><p class="hint">${filterFamily ? t("sameFamily", famLabel(filterFamily)) + " " : ""}${t("noGames")}</p><div class="btns"><button id="pgB">←</button></div>`); document.getElementById("pgB").onclick = hub; return null; }
    if (cands.length === 1) return cands[0];
    return new Promise((res) => {
      openSheet(`<h3>${t("pickGame")}</h3>` + cands.map((c, i) => `<button class="row" data-i="${i}">${esc(c.game.title)}<br><small style="color:var(--muted)">${esc(c.save.label)} · ${famLabel(c.save.family)}</small></button>`).join(""));
      document.querySelectorAll("#sheet [data-i]").forEach((b) => b.onclick = () => res(cands[+b.dataset.i]));
    });
  }
  function pickMon(entry, title) {
    const mons = entry.save.list();
    return new Promise((res) => {
      openSheet(`<h3>${title}</h3><p class="hint">${esc(entry.game.title)} · ${t("boxOnly")}</p>
        ${mons.length ? "" : `<p class="hint" style="color:var(--text)">${t("emptyBoxes")}</p>`}
        <div class="mongrid">${mons.map((m, i) => `<button data-i="${i}">${monCard(m, " · " + t("box", m.box + 1))}</button>`).join("")}</div>
        <div class="btns"><button id="pmB">←</button></div>`);
      document.querySelectorAll("#sheet .mongrid [data-i]").forEach((b) => b.onclick = () => res(mons[+b.dataset.i]));
      document.getElementById("pmB").onclick = () => { res(null); hub(); };
    });
  }

  async function newTrade() {
    const fr = await friends();
    if (!fr.length) { toast(t("noFriends")); return; }
    const entry = await pickGame(null); if (!entry) return;
    const m = await pickMon(entry, t("pickMon")); if (!m) return;
    const friend = await new Promise((res) => {
      openSheet(`<h3>${t("pickFriend")}</h3>` + fr.map((f, i) => `<button class="row" data-i="${i}">${esc(f.pseudo)}</button>`).join(""));
      document.querySelectorAll("#sheet [data-i]").forEach((b) => b.onclick = () => res(fr[+b.dataset.i]));
    });
    openSheet(`<h3>${t("newTrade")}</h3><div class="trade">${t("youGive")} :${monCard(m)} → <b>${esc(friend.pseudo)}</b></div>
      <div class="btns"><button id="noB">${t("cancel")}</button><button class="ok" id="okB">${t("confirmOffer")}</button></div>`);
    document.getElementById("noB").onclick = hub;
    document.getElementById("okB").onclick = async () => {
      document.getElementById("okB").disabled = true;
      try {
        const fresh = await reopen(entry.game);                   // re-read: the save may have changed
        const original = fresh.found.bytes.slice();
        const pk = fresh.save.take(m.box, m.slot);
        if (fresh.save.info(pk).species !== m.species) throw new Error(t("errGeneric"));
        const bytes = fresh.save.bytes();
        if (!PKX.open(bytes)) throw new Error(t("errGeneric"));    // sanity: result must still be a valid save
        const r = await sb.rpc("trade_offer", { friend: friend.id, fam: fresh.save.family, game: entry.game.saveKey, pk: PKX.toB64(pk), species: m.species, lvl: m.level, shiny: m.shiny });
        if (r.error) throw r.error;
        await backup(entry.game, original);
        await writeSave(fresh.found, bytes);
        toast(t("offered"), 4000); hub();
      } catch (e) { toast(errText(e), 4500); hub(); }
    };
  }

  async function acceptFlow(tr, names) {
    const entry = await pickGame(tr.family); if (!entry) return;
    const m = await pickMon(entry, t("chooseAnswer")); if (!m) return;
    const theirs = { species: tr.from_species, level: tr.from_level || 1, shiny: tr.from_shiny };
    openSheet(`<h3>${t("accept")}</h3><div class="trade">${t("youGive")} :${monCard(m)}</div><div class="trade">${t("youGet")} :${monCard(theirs)} <small>(${esc(names[tr.from_user] || "")})</small></div>
      <div class="btns"><button id="noB">${t("cancel")}</button><button class="ok" id="okB">${t("accept")}</button></div>`);
    document.getElementById("noB").onclick = hub;
    document.getElementById("okB").onclick = async () => {
      document.getElementById("okB").disabled = true;
      try {
        const fresh = await reopen(entry.game);
        const original = fresh.found.bytes.slice();
        const mine = fresh.save.take(m.box, m.slot);
        const incoming = PKX.fromB64(tr.from_pk);
        const inf = fresh.save.info(incoming);
        if (!inf) throw new Error(t("errGeneric"));
        if (inf.species > fresh.save.maxSpecies) throw new Error(t("tooNew"));
        let evo = null;
        if (PKX.evolve) { try { evo = PKX.evolve(incoming, fresh.save.family, m.species, fresh.save.maxSpecies); } catch (e) { evo = null; } }
        fresh.save.put(evo ? evo.bytes : incoming);
        const bytes = fresh.save.bytes();
        if (!PKX.open(bytes)) throw new Error(t("errGeneric"));
        const r = await sb.rpc("trade_accept", { trade_id: tr.id, game: entry.game.saveKey, pk: PKX.toB64(mine), species: m.species, lvl: m.level, shiny: m.shiny });
        if (r.error) throw r.error;
        await backup(entry.game, original);
        await writeSave(fresh.found, bytes);
        if (evo) evolved(evo); else toast(t("doneGet", monName(tr.from_species)), 4500);
        hub();
      } catch (e) { toast(errText(e), 4500); hub(); }
    };
  }

  async function backupsSheet() {
    const db = await bdb();
    const all = await req(db.transaction("b").objectStore("b").getAll());
    const keys = await req((await bdb()).transaction("b").objectStore("b").getAllKeys());
    const rows = keys.map((k, i) => [k, all[i]]).sort((a, b) => b[1].time - a[1].time).slice(0, 20);
    openSheet(`<h3>${t("backups")}</h3><p class="hint">${t("backupsHint")}</p>` +
      rows.map(([k, v]) => `<div class="slot"><div class="info"><b>${esc(v.title || v.saveKey)}</b><span>${ago(v.time)}</span></div><div class="acts"><button class="ok" data-k="${k}">${t("restore")}</button></div></div>`).join("") +
      `<div class="btns"><button id="bkB">←</button></div>`);
    document.getElementById("bkB").onclick = hub;
    document.querySelectorAll("#sheet [data-k]").forEach((b) => b.onclick = async () => {
      const v = rows.find(([k]) => String(k) === b.dataset.k)[1];
      const g = games.find((x) => x.saveKey === v.saveKey);
      const f = g && await findSave(g);
      if (!f) return toast(t("saveBad"));
      await writeSave(f, v.bytes); toast(t("restored"));
    });
  }

  /* ---------- Badge + notification for new offers ---------- */
  let lastSeen = 0;
  async function refreshBadge() {
    if (!sb || !me()) return;
    try {
      const r = await sb.from("trades").select("id,from_user,created_at").eq("to_user", me().id).eq("status", "offered");
      const r2 = await sb.from("trades").select("id").eq("from_user", me().id).eq("from_done", false).neq("status", "offered");
      const n = (r.data || []).length + (r2.data || []).length;
      if (window.kameiBadge) window.kameiBadge("trades", n); else document.getElementById("accBtn").classList.toggle("dot", n > 0);
      const newest = (r.data || []).reduce((a, x) => Math.max(a, x.id), 0);
      if (newest > lastSeen && lastSeen !== 0) {
        const p = await sb.from("profiles").select("pseudo").eq("id", r.data.find((x) => x.id === newest).from_user).maybeSingle();
        const msg = t("newOffer", (p.data && p.data.pseudo) || "?");
        if (window.kameiNotify) window.kameiNotify("🔁 " + t("tradesTitle"), msg, () => hub()); else toast(msg, 4500);
      }
      lastSeen = Math.max(lastSeen, newest, 1);
      if ((r2.data || []).length && !document.getElementById("player").classList.contains("on")) finishPending(true).catch(() => {});
    } catch (e) {}
  }
  window.kameiTrades = { open: hub, refresh: refreshBadge };
  setTimeout(refreshBadge, 3000);
  let hiddenTick = 0;
  setInterval(() => { if (document.visibilityState === "visible" || ++hiddenTick % 3 === 0) refreshBadge(); }, 45000);
})();

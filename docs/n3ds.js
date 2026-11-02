/* Kamei Game Console — 3DS games (Android app v10 only).
   The 3DS can't run inside Kamei: the game file stays where it is on the phone (no copy, they are huge)
   and Kamei opens it in a free 3DS emulator installed separately: Azahar or Citra MMJ. */
(function () {
  const N2 = window.KameiNative2;
  if (!N2 || !N2.emus3ds) return;
  const L = {
    fr: { addTitle: "Ajouter des jeux", addAll: "📁 Jeux (toutes les consoles)", addAllHint: "GB, GBA, DS, NES, SNES, PlayStation…", add3ds: "🎮 Jeu Nintendo 3DS", add3dsHint: "Il s'ouvre dans Azahar ou Citra MMJ (à installer à part).",
      added: (n) => `${n} ajouté ✅`, notGame: "Ce fichier ne ressemble pas à un jeu 3DS (.3ds, .cci, .cia, .cxi, .3dsx). Ajouté quand même.",
      need: "Il faut un émulateur 3DS", needHint: "La 3DS ne tourne pas dans Kamei : installe un de ces émulateurs gratuits (une seule fois), puis reviens et appuie sur Jouer.",
      azahar: "Azahar (recommandé)", azaharHint: "Officiel, sur le Play Store, toujours mis à jour.", mmj: "Citra MMJ", mmjHint: "Souvent plus fluide sur les téléphones moyens. Pas sur le Play Store : télécharge-le seulement depuis sa page GitHub officielle.",
      pick: "Avec quel émulateur ?", always: "Toujours utiliser celui-ci", emu: "🎮 Émulateur 3DS", emuNow: (n) => `Émulateur 3DS : ${n}`, refile: "📁 Choisir à nouveau le fichier du jeu",
      lost: "Kamei n'a plus accès au fichier de ce jeu (déplacé ou supprimé ?). Choisis-le à nouveau.", opened: (n) => `${n} est ouvert : choisis le jeu dans sa liste (Kamei n'a pas pu lui donner le jeu directement).`,
      fail: "L'émulateur n'a pas pu être ouvert.", note: "Le jeu se joue dans l'émulateur : pour revenir dans Kamei, quitte le jeu.", play: "▶ Jouer" },
    nl: { addTitle: "Spellen toevoegen", addAll: "📁 Spellen (alle consoles)", addAllHint: "GB, GBA, DS, NES, SNES, PlayStation…", add3ds: "🎮 Nintendo 3DS-spel", add3dsHint: "Het opent in Azahar of Citra MMJ (apart te installeren).",
      added: (n) => `${n} toegevoegd ✅`, notGame: "Dit bestand lijkt geen 3DS-spel (.3ds, .cci, .cia, .cxi, .3dsx). Toch toegevoegd.",
      need: "Je hebt een 3DS-emulator nodig", needHint: "De 3DS draait niet in Kamei: installeer één van deze gratis emulators (één keer) en tik dan op Spelen.",
      azahar: "Azahar (aangeraden)", azaharHint: "Officieel, in de Play Store, altijd bijgewerkt.", mmj: "Citra MMJ", mmjHint: "Vaak vlotter op middenklasse-telefoons. Niet in de Play Store: download hem alleen van zijn officiële GitHub-pagina.",
      pick: "Met welke emulator?", always: "Altijd deze gebruiken", emu: "🎮 3DS-emulator", emuNow: (n) => `3DS-emulator: ${n}`, refile: "📁 Spelbestand opnieuw kiezen",
      lost: "Kamei kan het bestand van dit spel niet meer openen (verplaatst of gewist?). Kies het opnieuw.", opened: (n) => `${n} is open: kies het spel in de lijst (Kamei kon het spel niet direct doorgeven).`,
      fail: "De emulator kon niet geopend worden.", note: "Je speelt in de emulator: verlaat het spel om terug te gaan naar Kamei.", play: "▶ Spelen" },
    en: { addTitle: "Add games", addAll: "📁 Games (every console)", addAllHint: "GB, GBA, DS, NES, SNES, PlayStation…", add3ds: "🎮 Nintendo 3DS game", add3dsHint: "It opens in Azahar or Citra MMJ (installed separately).",
      added: (n) => `${n} added ✅`, notGame: "This file doesn't look like a 3DS game (.3ds, .cci, .cia, .cxi, .3dsx). Added anyway.",
      need: "You need a 3DS emulator", needHint: "The 3DS doesn't run inside Kamei: install one of these free emulators (once), then come back and tap Play.",
      azahar: "Azahar (recommended)", azaharHint: "Official, on the Play Store, always up to date.", mmj: "Citra MMJ", mmjHint: "Often smoother on mid-range phones. Not on the Play Store: only download it from its official GitHub page.",
      pick: "Which emulator?", always: "Always use this one", emu: "🎮 3DS emulator", emuNow: (n) => `3DS emulator: ${n}`, refile: "📁 Pick the game file again",
      lost: "Kamei can't reach this game's file anymore (moved or deleted?). Pick it again.", opened: (n) => `${n} is open: pick the game in its list (Kamei couldn't hand the game over directly).`,
      fail: "The emulator couldn't be opened.", note: "You play inside the emulator: quit the game to come back to Kamei.", play: "▶ Play" },
  };
  const X = () => L[lang] || L.fr;
  const AZAHAR = "io.github.lime3ds.android", MMJ_URL = "https://github.com/weihuoya/citra/releases";
  const emus = () => { try { return JSON.parse(N2.emus3ds() || "[]"); } catch (e) { return []; } };
  const pref = () => { try { return localStorage.getItem("kamei-3ds-emu") || ""; } catch (e) { return ""; } };
  const setPref = (p) => { try { p ? localStorage.setItem("kamei-3ds-emu", p) : localStorage.removeItem("kamei-3ds-emu"); } catch (e) {} };
  const openUrl = (u) => { try { window.KameiNative.openUrl(u); } catch (e) { window.open(u, "_blank"); } };

  /* ---------- adding: + → normal games or a 3DS game ---------- */
  function addChoice() {
    const x = X();
    openSheet(`<h3>${x.addTitle}</h3>
      <button class="row ok-row" id="n3All" style="text-align:left">${x.addAll}<br><small style="opacity:.8;font-weight:500">${x.addAllHint}</small></button>
      <button class="row" id="n3Ds" style="text-align:left">${x.add3ds}<br><small style="color:var(--muted);font-weight:500">${x.add3dsHint}</small></button>`);
    document.getElementById("n3All").onclick = () => { closeSheet(); document.getElementById("file").click(); };
    document.getElementById("n3Ds").onclick = () => { closeSheet(); pickFile(null); };
  }
  let replacing = null;
  function pickFile(g) { replacing = g; N2.pick3ds(); }
  window.kameiPicked3ds = async (o) => {
    const g0 = replacing; replacing = null;
    if (!o || !o.uri) return;
    const x = X(), name = o.name || "3DS";
    if (!/\.(3ds|cci|cia|cxi|3dsx|app|z3ds|zcci|zcxi)$/i.test(name)) toast(x.notGame, 4500);
    if (g0) { await updateGame(g0.id, { uri: o.uri, size: o.size || g0.size }); toast(x.added(g0.title)); return load(); }
    const id = "3ds|" + baseName(name) + "|" + (o.size || 0);
    const old0 = await getGame(id), old = old0 && old0.id ? old0 : null;
    await putGame(Object.assign(old || { added: Date.now(), lastPlayed: 0, cover: null, coverTried: false }, {
      id, fileName: name, romName: name, title: (old && old.title) || cleanTitle(name), tags: tags(name), system: "3ds", size: o.size || 0,
      saveKey: baseName(name), uri: o.uri, external: true, blob: null }));
    await load();
    toast(x.added(cleanTitle(name)));
    try { scrapeMissing(); } catch (e) {}
  };

  /* ---------- playing ---------- */
  function needSheet() {
    const x = X();
    openSheet(`<h3>${x.need}</h3><p class="hint">${x.needHint}</p>
      <button class="row ok-row" id="n3Az" style="text-align:left">⬇️ ${x.azahar}<br><small style="opacity:.8;font-weight:500">${x.azaharHint}</small></button>
      <button class="row" id="n3Mmj" style="text-align:left">⬇️ ${x.mmj}<br><small style="color:var(--muted);font-weight:500">${x.mmjHint}</small></button>
      <div class="btns"><button id="n3Back">←</button></div>`);
    document.getElementById("n3Az").onclick = () => { N2.openStore(AZAHAR); closeSheet(); };
    document.getElementById("n3Mmj").onclick = () => { openUrl(MMJ_URL); closeSheet(); };
    document.getElementById("n3Back").onclick = closeSheet;
  }
  function chooseSheet(list, g, force) {
    const x = X();
    openSheet(`<h3>${x.pick}</h3>${list.map((e) => `<button class="row" data-pkg="${esc(e.pkg)}">${esc(e.label || e.name)}${e.pkg === pref() ? " ✅" : ""}</button>`).join("")}
      <label class="row" style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="n3Always" ${force ? "checked" : ""} style="width:auto;margin:0"> ${x.always}</label>
      <div class="btns"><button id="n3Back">←</button></div>`);
    document.getElementById("n3Back").onclick = closeSheet;
    document.querySelectorAll("#sheet [data-pkg]").forEach((b) => b.onclick = () => {
      if (document.getElementById("n3Always").checked) setPref(b.dataset.pkg);
      closeSheet();
      if (g) go(g, list.find((e) => e.pkg === b.dataset.pkg));
    });
  }
  async function launch(g) {
    const x = X();
    if (!g.uri || !N2.has3ds(g.uri)) { toast(x.lost, 5000); return pickFile(g); }
    const list = emus();
    if (!list.length) return needSheet();
    const p = list.find((e) => e.pkg === pref());
    if (p || list.length === 1) return go(g, p || list[0]);
    chooseSheet(list, g, true);
  }
  let playing = null;
  async function go(g, emu) {
    const x = X();
    const r = N2.launch3ds(emu.pkg, g.uri);
    if (r === "fail") return toast(x.fail, 4000);
    if (r === "opened") toast(x.opened(emu.label || emu.name), 7000);
    await updateGame(g.id, { lastPlayed: Date.now() });
    try { window.kameiAccount && window.kameiAccount.startPlaying(g); playing = g.id; } catch (e) {}
    try { window.kameiPetEvent && window.kameiPetEvent("game"); } catch (e) {}
    load();
  }
  // back in Kamei: the 3DS session is over
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && playing) { playing = null; try { window.kameiAccount && window.kameiAccount.stopPlaying(); } catch (e) {} }
  });

  /* ---------- the game page: no Kamei saves for 3DS, but the emulator choice ---------- */
  function decorate(g) {
    const x = X(), sheet = document.getElementById("sheet");
    ["mResume", "gfSlots", "mSys", "mBios"].forEach((id) => { const el = document.getElementById(id); if (el) el.remove(); });
    const pl = document.getElementById("mPlay"); if (pl) { pl.textContent = x.play; pl.className = "ok"; }
    const list = emus(), cur = list.find((e) => e.pkg === pref());
    const more = sheet.querySelector(".gf-list");
    if (more) {
      more.insertAdjacentHTML("afterbegin", `<button class="row" id="n3Emu">${cur ? esc(x.emuNow(cur.label || cur.name)) : x.emu}</button><button class="row" id="n3File">${x.refile}</button>`);
      document.getElementById("n3Emu").onclick = () => (list.length ? chooseSheet(list, null, true) : needSheet());
      document.getElementById("n3File").onclick = () => { closeSheet(); pickFile(g); };
    }
    const meta = sheet.querySelector(".gf-meta"); if (meta) meta.insertAdjacentHTML("afterend", `<p class="hint" style="margin:4px 0 8px">${x.note}</p>`);
  }

  window.kamei3ds = { addChoice, launch, decorate, emus };
})();

/* Kamei Game Console — catalogue of games made by Kamei Productions (and shared with permission), stored on GitHub */
(function () {
  const GH = window.KameiGH;
  const STR = {
    fr: { cat: "📚 Catalogue", catHint: "Les jeux créés par Kamei Productions. Installe-les en un clic !", catEmpty: "Le catalogue est vide pour l'instant.",
      only3ds: "📱 Les jeux 3DS s'installent seulement dans l'appli Android (ils s'ouvrent dans Azahar).", install: "Installer", installed: "Installé ✓", installing: "Téléchargement…", catAdded: (n) => `${n} est dans ta bibliothèque !`, by: (a) => `par ${a}`, authorPage: "Page de l'auteur",
      addCat: "＋ Ajouter un jeu au catalogue", catTitle: "Nom du jeu", catAuthor: "Auteur", catSource: "Lien (optionnel, https://…)", catCover: "Image de jaquette (optionnel)",
      catAllowed: "C'est un jeu que j'ai créé (ou j'ai le droit de le partager)", catPick: "Choisir le fichier du jeu", catSend: "Publier dans le catalogue", catSending: "Envoi sur GitHub…",
      catNeed: "Choisis le fichier (ou colle un lien), mets le nom et coche la case.", catTooBig: "Fichier trop gros pour l'envoi direct (95 Mo max) : mets-le dans une Release GitHub (jusqu'à 2 Go) et colle son lien.", catLink: "🔗 Gros fichier ? Colle son lien ici", catLinkHint: "Jusqu'à 2 Go : sur github.com → kamei-console → Releases → crée une release (ou modifie-en une) → glisse le fichier → publie, puis appui long sur le fichier → copier le lien.", catDone: "Ajouté au catalogue ✅", catRemove: "Retirer", catRemoved: "Retiré du catalogue", catOffline: "Catalogue indisponible (pas de connexion ?)" },
    nl: { cat: "📚 Catalogus", catHint: "De spellen gemaakt door Kamei Productions. Installeer ze met één klik!", catEmpty: "De catalogus is nog leeg.",
      only3ds: "📱 3DS-spellen installeer je alleen in de Android-app (ze openen in Azahar).", install: "Installeren", installed: "Geïnstalleerd ✓", installing: "Downloaden…", catAdded: (n) => `${n} staat in je bibliotheek!`, by: (a) => `door ${a}`, authorPage: "Pagina van de maker",
      addCat: "＋ Spel toevoegen aan catalogus", catTitle: "Naam van het spel", catAuthor: "Maker", catSource: "Link (optioneel, https://…)", catCover: "Hoesje (optioneel)",
      catAllowed: "Ik heb dit spel zelf gemaakt (of mag het delen)", catPick: "Spelbestand kiezen", catSend: "Publiceren in catalogus", catSending: "Bezig met uploaden naar GitHub…",
      catNeed: "Kies het bestand (of plak een link), vul de naam in en vink het vakje aan.", catTooBig: "Bestand te groot om direct te versturen (max. 95 MB): zet het in een GitHub-release (tot 2 GB) en plak de link.", catLink: "🔗 Groot bestand? Plak hier de link", catLinkHint: "Tot 2 GB: op github.com → kamei-console → Releases → maak (of wijzig) een release → sleep het bestand → publiceer, dan lang drukken op het bestand → link kopiëren.", catDone: "Toegevoegd aan catalogus ✅", catRemove: "Verwijderen", catRemoved: "Verwijderd uit catalogus", catOffline: "Catalogus niet beschikbaar (geen verbinding?)" },
    en: { cat: "📚 Catalogue", catHint: "Games made by Kamei Productions. Install them in one tap!", catEmpty: "The catalogue is empty for now.",
      only3ds: "📱 3DS games only install in the Android app (they open in Azahar).", install: "Install", installed: "Installed ✓", installing: "Downloading…", catAdded: (n) => `${n} is in your library!`, by: (a) => `by ${a}`, authorPage: "Author's page",
      addCat: "＋ Add a game to the catalogue", catTitle: "Game name", catAuthor: "Author", catSource: "Link (optional, https://…)", catCover: "Cover image (optional)",
      catAllowed: "I made this game (or I'm allowed to share it)", catPick: "Pick the game file", catSend: "Publish in the catalogue", catSending: "Uploading to GitHub…",
      catNeed: "Pick the file (or paste a link), enter the name and tick the box.", catTooBig: "File too big to send directly (95 MB max): put it in a GitHub Release (up to 2 GB) and paste its link.", catLink: "🔗 Big file? Paste its link here", catLinkHint: "Up to 2 GB: on github.com → kamei-console → Releases → create (or edit) a release → drop the file → publish, then long-press the file → copy link.", catDone: "Added to the catalogue ✅", catRemove: "Remove", catRemoved: "Removed from the catalogue", catOffline: "Catalogue unavailable (no connection?)" },
  };
  Object.assign(STR.fr, { dcHint: "Pour ajouter un jeu : poste-le dans le salon #catalogue de ton Discord, avec le fichier en pièce jointe et en texte : Titre | Console | Description (une image jointe sert de jaquette).",
    dcRemove: "Pour le retirer, supprime son message dans #catalogue sur Discord.", dlFail: "Téléchargement impossible. Réessaie plus tard.", dlWeb: "Ton navigateur ne peut pas télécharger ce jeu directement : il s'ouvre dans un nouvel onglet. Ajoute-le ensuite avec le bouton +.",
    ghAdd: "＋ Ajouter un jeu (jusqu'à 2 Go)", fromDiscord: "Discord" });
  Object.assign(STR.nl, { dcHint: "Een spel toevoegen: post het in het kanaal #catalogue van je Discord, met het bestand als bijlage en als tekst: Titel | Console | Beschrijving (een bijgevoegde afbeelding wordt de hoes).",
    dcRemove: "Om het te verwijderen: wis het bericht in #catalogue op Discord.", dlFail: "Downloaden mislukt. Probeer later opnieuw.", dlWeb: "Je browser kan dit spel niet rechtstreeks downloaden: het opent in een nieuw tabblad. Voeg het daarna toe met de +-knop.",
    ghAdd: "＋ Spel toevoegen (tot 2 GB)", fromDiscord: "Discord" });
  Object.assign(STR.en, { dcHint: "To add a game: post it in the #catalogue channel of your Discord, with the file attached and as text: Title | Console | Description (an attached image becomes the cover).",
    dcRemove: "To remove it, delete its message in #catalogue on Discord.", dlFail: "Download failed. Try again later.", dlWeb: "Your browser can't download this game directly: it opens in a new tab. Then add it with the + button.",
    ghAdd: "＋ Add a game (up to 2 GB)", fromDiscord: "Discord" });
  for (const l of Object.keys(STR)) Object.assign(I18N[l], STR[l]);
  const isAdmin = () => { const m = window.kameiMe && window.kameiMe(); return !!(m && m.is_admin); };
  const canEdit = () => isAdmin() && GH && GH.token();
  const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "jeu";
  const openLink = (url) => { try { window.KameiNative ? window.KameiNative.openUrl(url) : window.open(url, "_blank"); } catch (e) {} };

  /* games posted in the #catalogue channel of the Discord server (through the Supabase function "kamei-discord") */
  async function loadDiscord() {
    const sb = window.kameiSB; if (!sb || !(window.kameiMe && window.kameiMe())) return [];
    try {
      const r = await sb.functions.invoke("kamei-discord", { body: { action: "catalogue" } });
      if (r.error || !r.data || !Array.isArray(r.data.games)) return [];
      return r.data.games.map((g) => ({ ...g, discord: true, system: matchSys(g.sys, g.file), source: null, author: g.author || "Kamei Productions" }));
    } catch (e) { return []; }
  }
  const SYS3DS = { label: "Nintendo 3DS", short: "3DS", theme: "#ef4444" };
  const sysOf = (k) => SYSTEMS[k] || (k === "3ds" ? SYS3DS : { short: "?", label: "?", theme: "#888" });
  function matchSys(txt, file) {
    const v = String(txt || "").trim().toLowerCase();
    if (/^(nintendo )?3ds$/.test(v) || /\.(3ds|cci|cia|cxi|3dsx)$/i.test(file || "")) return "3ds";
    if (v) for (const [k, s] of Object.entries(SYSTEMS)) if (k === v || s.short.toLowerCase() === v || s.label.toLowerCase() === v || (s.label.toLowerCase().replace(/[^a-z0-9]/g, "") === v.replace(/[^a-z0-9]/g, ""))) return k;
    const e = (/\.([a-z0-9]+)$/i.exec(file || "") || [])[1];
    return (e && EXT[e.toLowerCase()]) || null;
  }
  /* download a file: browser first, then the Android app's own downloader (Discord links) */
  const dlWait = {};
  window.kameiDl = (cb, ok) => { const w = dlWait[cb]; if (w) { delete dlWait[cb]; w(ok); } };
  window.kameiDlProg = (cb, done, total) => { const w = dlWait[cb]; if (w && w.prog) w.prog(done, total); };
  async function download(url, name, onProg) {
    try { const r = await fetch(url, { cache: "no-store" }); if (r.ok) return new File([await r.blob()], name); } catch (e) {}
    const N = window.KameiNative;
    if (N && N.download) {
      const cb = "d" + Date.now(), fn = cb + "-" + name.replace(/[^A-Za-z0-9._-]/g, "_").slice(-80);
      const ok = await new Promise((res) => { dlWait[cb] = res; res.prog = onProg; if (!N.download(url, fn, cb)) res(false); });
      if (!ok) throw new Error(t("dlFail"));
      const r = await fetch("__dl/" + fn); if (!r.ok) throw new Error(t("dlFail"));
      const f = new File([await r.blob()], name);
      try { N.dlDelete(fn); } catch (e) {}
      return f;
    }
    openLink(url); throw new Error(t("dlWeb"));
  }
  async function load() { const j = await GH.readJSON("catalogue/catalogue.json"); return (j && Array.isArray(j.games)) ? j : { games: [] }; }

  let lastInto = null;
  async function sheet(into) {
    if (into && !(into instanceof Element)) into = null;
    lastInto = into || null;
    const show = (h) => { if (into) into.innerHTML = h; else openSheet(h); };
    const root = () => into || document.getElementById("sheet");
    show(`<h3>${t("cat")}</h3><p class="hint">…</p>`);
    let cat;
    const [gh, dc] = await Promise.all([load().catch(() => null), loadDiscord()]);
    if (!gh && !dc.length) { show(`<h3>${t("cat")}</h3><p class="hint">${t("catOffline")}</p>`); return; }
    cat = gh || { games: [] };
    const have = new Set(games.map((g) => g.catId).filter(Boolean));
    const list = [...dc, ...cat.games].sort((a, b) => (b.added || "").localeCompare(a.added || ""));
    show(`<h3>${t("cat")}</h3><p class="hint">${t("catHint")}</p>
      ${isAdmin() ? `<p class="hint">💬 ${t("dcHint")}</p>` : ""}
      ${canEdit() ? `<button class="row" id="catAdd">${t("ghAdd")}</button>` : ""}
      ${list.length ? list.map((x) => {
        const s = sysOf(x.system);
        return `<div class="catitem" style="--c:${s.theme}">
          <div class="cimg">${x.cover ? `<img src="${esc(x.discord ? x.cover : GH.raw(x.cover))}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(s.short)}</span></div>
          <div class="cinfo"><b>${esc(x.title)}</b><small>${esc(s.label || s.short)} · ${esc(t("by", x.author || "?"))}</small>
            ${x.source ? `<a href="#" data-src="${esc(x.source)}">${t("authorPage")} ↗</a>` : ""}</div>
          <div class="cact">${have.has(x.id) ? `<span class="done">${t("installed")}</span>` : `<button class="ok" data-inst="${esc(x.id)}">${t("install")}</button>`}
            ${x.discord ? (isAdmin() ? `<button class="mini" data-dcrm="1">${t("catRemove")}</button>` : "") : canEdit() ? `<button class="mini" data-rm="${esc(x.id)}">${t("catRemove")}</button>` : ""}</div></div>`;
      }).join("") : `<p class="hint">${t("catEmpty")}</p>`}`);
    root().querySelectorAll("[data-src]").forEach((a) => a.onclick = (e) => { e.preventDefault(); openLink(a.dataset.src); });
    root().querySelectorAll("[data-inst]").forEach((b) => b.onclick = () => install(list.find((x) => x.id === b.dataset.inst), b));
    root().querySelectorAll("[data-rm]").forEach((b) => b.onclick = () => remove(cat, b.dataset.rm));
    root().querySelectorAll("[data-dcrm]").forEach((b) => b.onclick = () => toast(t("dcRemove"), 5000));
    if (root().querySelector("#catAdd")) root().querySelector("#catAdd").onclick = () => addForm(cat);
  }

  async function install(x, btn) {
    // 3DS: the file is downloaded by the phone, then opened in Azahar / Citra (Android app only)
    if (x.system === "3ds") {
      if (window.kamei3ds && window.kamei3ds.fromCatalogue) return window.kamei3ds.fromCatalogue(x, x.discord || x.url ? x.url : GH.raw(x.file), x.cover ? (x.discord ? x.cover : GH.raw(x.cover)) : null);
      return toast(t("only3ds"), 5000);
    }
    btn.disabled = true; btn.textContent = t("installing");
    try {
      let file;
      if (x.discord || x.url) {
        file = await download(x.url, x.discord ? x.file : x.fileName || "game.bin", (d, n) => { btn.textContent = n > 0 ? Math.floor(d * 100 / n) + "%" : (d / 1048576).toFixed(1) + " Mo"; });
      } else {
        const res = await fetch(GH.raw(x.file), { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status);
        file = new File([await res.blob()], x.file.split("/").pop());
      }
      const d = await readRom(file);
      if (d.error) throw new Error(d.error);
      const blob = new Blob([await d.data.arrayBuffer()], { type: "application/octet-stream" });
      let sys = x.system || d.system;
      if (!sys) sys = await askSystem(x.title, d.prefer);
      if (!sys) { btn.disabled = false; btn.textContent = t("install"); return; }
      await putGame({ id: "cat|" + x.id, catId: x.id, fileName: file.name, romName: d.inner, title: x.title, tags: "", system: sys, whole: d.whole || null,
        size: blob.size, added: Date.now(), lastPlayed: 0, saveKey: "cat-" + x.id, blob: window.kameiRomStore ? await window.kameiRomStore(blob) : blob, cover: x.cover ? (x.discord ? null : GH.raw(x.cover)) : null, coverTried: !!x.cover && !x.discord });
      if (x.discord && x.cover) { try { const cr = await fetch(x.cover); if (cr.ok) await updateGame("cat|" + x.id, { coverBlob: await cr.blob(), coverTried: true }); } catch (e) {} }
      await window.kameiReload();
      toast(t("catAdded", x.title), 3500);
      sheet(lastInto);
    } catch (e) { btn.disabled = false; btn.textContent = t("install"); toast(String(e.message || e), 4000); }
  }

  function addForm(cat) {
    let romFile = null, coverFile = null;
    openSheet(`<h3>${t("addCat")}</h3>
      <button class="row ok-row" id="cfPick">${t("catPick")}</button><p class="hint" id="cfName"></p>
      <input id="cfLink" placeholder="${t("catLink")}" inputmode="url"><p class="hint" style="margin-top:-4px">${t("catLinkHint")}</p>
      <input id="cfTitle" placeholder="${t("catTitle")}" maxlength="60">
      <select id="cfSys" class="search" style="margin-bottom:12px">${Object.entries(SYSTEMS).map(([k, s]) => `<option value="${k}">${s.label}</option>`).join("")}${SYSTEMS["3ds"] ? "" : `<option value="3ds">Nintendo 3DS</option>`}</select>
      <input id="cfAuthor" placeholder="${t("catAuthor")}" maxlength="60" value="Kamei Productions">
      <input id="cfSrc" placeholder="${t("catSource")}" inputmode="url">
      <button class="row" id="cfCover">🖼️ ${t("catCover")}</button>
      <label class="row" style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="cfOk" style="width:auto;margin:0"> ${t("catAllowed")}</label>
      <div class="btns"><button id="cfBack">←</button><button class="ok" id="cfSend">${t("catSend")}</button></div>
      <input type="file" id="cfRom" class="hidden-input"><input type="file" id="cfImg" class="hidden-input" accept="image/*">`);
    const $$ = (id) => document.getElementById(id);
    $$("cfBack").onclick = sheet;
    $$("cfPick").onclick = () => $$("cfRom").click();
    $$("cfCover").onclick = () => $$("cfImg").click();
    $$("cfImg").onchange = (e) => { coverFile = e.target.files[0] || null; if (coverFile) $$("cfCover").textContent = "🖼️ " + coverFile.name; };
    $$("cfRom").onchange = async (e) => {
      romFile = e.target.files[0] || null; if (!romFile) return;
      $$("cfName").textContent = romFile.name + " · " + fmtSize(romFile.size);
      const d = await readRom(romFile);
      if (!d.error && d.system) $$("cfSys").value = d.system;
      if (/\.(3ds|cci|cia|cxi|3dsx)$/i.test(romFile.name)) $$("cfSys").value = "3ds";
      if (!$$("cfTitle").value) $$("cfTitle").value = cleanTitle(romFile.name);
    };
    $$("cfSend").onclick = async () => {
      const title = $$("cfTitle").value.trim(), author = $$("cfAuthor").value.trim(), source = $$("cfSrc").value.trim(), system = $$("cfSys").value;
      const link = $$("cfLink").value.trim(), linkOk = /^https:\/\/\S+\.\S+/.test(link);
      if ((!romFile && !linkOk) || !title || (source && !/^https?:\/\/\S+\.\S+/.test(source)) || !$$("cfOk").checked) return toast(t("catNeed"), 4000);
      if (romFile && romFile.size > 95 * 1048576 && !linkOk) return toast(t("catTooBig"), 7000);
      // a link (GitHub Release, up to 2 GB): only the catalogue entry goes to GitHub, the file stays where it is
      if (linkOk && (!romFile || romFile.size > 95 * 1048576)) {
        $$("cfSend").disabled = true; toast(t("catSending"), 60000);
        try {
          const fresh = await load();
          let id = slug(title); while (fresh.games.some((x) => x.id === id)) id += "-2";
          const fileName = romFile ? romFile.name : decodeURIComponent(link.split("?")[0].split("/").pop() || id);
          const files = [];
          let cover = null;
          if (coverFile) { const cext = (/\.(png|jpe?g|webp)$/i.exec(coverFile.name) || [".png"])[0].toLowerCase(); cover = `catalogue/covers/${id}${cext}`; files.push({ path: cover, b64: await GH.toB64(coverFile) }); }
          fresh.games.push({ id, title, system, file: null, url: link, fileName, size: romFile ? romFile.size : null, author: author || "Kamei Productions", source: source || null, cover, added: new Date().toISOString() });
          files.push({ path: "catalogue/catalogue.json", text: JSON.stringify(fresh, null, 2) });
          await GH.commit(files, `Catalogue : ajout de ${title} (lien)`);
          toast(t("catDone"), 4000); setTimeout(sheet, 1500);
        } catch (e) { $$("cfSend").disabled = false; toast(String(e.message || e), 6000); }
        return;
      }
      $$("cfSend").disabled = true; toast(t("catSending"), 120000);
      try {
        const fresh = await load();
        let id = slug(title); while (fresh.games.some((x) => x.id === id)) id += "-2";
        const ext = (/\.[a-z0-9]+$/i.exec(romFile.name) || [".bin"])[0].toLowerCase();
        const files = [{ path: `catalogue/files/${id}${ext}`, b64: await GH.toB64(romFile) }];
        let cover = null;
        if (coverFile) { const cext = (/\.(png|jpe?g|webp)$/i.exec(coverFile.name) || [".png"])[0].toLowerCase(); cover = `catalogue/covers/${id}${cext}`; files.push({ path: cover, b64: await GH.toB64(coverFile) }); }
        fresh.games.push({ id, title, system, file: `catalogue/files/${id}${ext}`, size: romFile.size, author: author || "Kamei Productions", source: source || null, cover, added: new Date().toISOString() });
        files.push({ path: "catalogue/catalogue.json", text: JSON.stringify(fresh, null, 2) });
        await GH.commit(files, `Catalogue : ajout de ${title}`);
        toast(t("catDone"), 4000); setTimeout(sheet, 1500);
      } catch (e) { $$("cfSend").disabled = false; toast(String(e.message || e), 6000); }
    };
  }

  async function remove(cat, id) {
    try {
      const fresh = await load();
      const x = fresh.games.find((g) => g.id === id); if (!x) return sheet();
      fresh.games = fresh.games.filter((g) => g.id !== id);
      await GH.commit([{ path: "catalogue/catalogue.json", text: JSON.stringify(fresh, null, 2) }], `Catalogue : retrait de ${x.title}`, [x.file, x.cover].filter(Boolean));
      toast(t("catRemoved")); setTimeout(sheet, 1200);
    } catch (e) { toast(String(e.message || e), 5000); }
  }

  window.kameiCatalogue = { open: () => sheet(), render: (el) => sheet(el) };
})();

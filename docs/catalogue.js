/* Kamei Game Console — catalogue of games made by Kamei Productions (and shared with permission), stored on GitHub */
(function () {
  const GH = window.KameiGH;
  const STR = {
    fr: { cat: "📚 Catalogue", catHint: "Les jeux créés par Kamei Productions. Installe-les en un clic !", catEmpty: "Le catalogue est vide pour l'instant.",
      install: "Installer", installed: "Installé ✓", installing: "Téléchargement…", catAdded: (n) => `${n} est dans ta bibliothèque !`, by: (a) => `par ${a}`, authorPage: "Page de l'auteur",
      addCat: "＋ Ajouter un jeu au catalogue", catTitle: "Nom du jeu", catAuthor: "Auteur", catSource: "Lien (optionnel, https://…)", catCover: "Image de jaquette (optionnel)",
      catAllowed: "C'est un jeu que j'ai créé (ou j'ai le droit de le partager)", catPick: "Choisir le fichier du jeu", catSend: "Publier dans le catalogue", catSending: "Envoi sur GitHub…",
      catNeed: "Choisis le fichier, mets le nom et coche la case.", catTooBig: "Fichier trop gros (95 Mo max — limite de GitHub).", catDone: "Ajouté au catalogue ✅", catRemove: "Retirer", catRemoved: "Retiré du catalogue", catOffline: "Catalogue indisponible (pas de connexion ?)" },
    nl: { cat: "📚 Catalogus", catHint: "De spellen gemaakt door Kamei Productions. Installeer ze met één klik!", catEmpty: "De catalogus is nog leeg.",
      install: "Installeren", installed: "Geïnstalleerd ✓", installing: "Downloaden…", catAdded: (n) => `${n} staat in je bibliotheek!`, by: (a) => `door ${a}`, authorPage: "Pagina van de maker",
      addCat: "＋ Spel toevoegen aan catalogus", catTitle: "Naam van het spel", catAuthor: "Maker", catSource: "Link (optioneel, https://…)", catCover: "Hoesje (optioneel)",
      catAllowed: "Ik heb dit spel zelf gemaakt (of mag het delen)", catPick: "Spelbestand kiezen", catSend: "Publiceren in catalogus", catSending: "Bezig met uploaden naar GitHub…",
      catNeed: "Kies het bestand, vul de naam in en vink het vakje aan.", catTooBig: "Bestand te groot (max. 95 MB — GitHub-limiet).", catDone: "Toegevoegd aan catalogus ✅", catRemove: "Verwijderen", catRemoved: "Verwijderd uit catalogus", catOffline: "Catalogus niet beschikbaar (geen verbinding?)" },
    en: { cat: "📚 Catalogue", catHint: "Games made by Kamei Productions. Install them in one tap!", catEmpty: "The catalogue is empty for now.",
      install: "Install", installed: "Installed ✓", installing: "Downloading…", catAdded: (n) => `${n} is in your library!`, by: (a) => `by ${a}`, authorPage: "Author's page",
      addCat: "＋ Add a game to the catalogue", catTitle: "Game name", catAuthor: "Author", catSource: "Link (optional, https://…)", catCover: "Cover image (optional)",
      catAllowed: "I made this game (or I'm allowed to share it)", catPick: "Pick the game file", catSend: "Publish in the catalogue", catSending: "Uploading to GitHub…",
      catNeed: "Pick the file, enter the name and tick the box.", catTooBig: "File too big (95 MB max — GitHub limit).", catDone: "Added to the catalogue ✅", catRemove: "Remove", catRemoved: "Removed from the catalogue", catOffline: "Catalogue unavailable (no connection?)" },
  };
  for (const l of Object.keys(STR)) Object.assign(I18N[l], STR[l]);
  const isAdmin = () => { const m = window.kameiMe && window.kameiMe(); return !!(m && m.is_admin); };
  const canEdit = () => isAdmin() && GH && GH.token();
  const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "jeu";
  const openLink = (url) => { try { window.KameiNative ? window.KameiNative.openUrl(url) : window.open(url, "_blank"); } catch (e) {} };

  async function load() { const j = await GH.readJSON("catalogue/catalogue.json"); return (j && Array.isArray(j.games)) ? j : { games: [] }; }

  async function sheet() {
    openSheet(`<h3>${t("cat")}</h3><p class="hint">…</p>`);
    let cat;
    try { cat = await load(); } catch (e) { openSheet(`<h3>${t("cat")}</h3><p class="hint">${t("catOffline")}</p>`); return; }
    const have = new Set(games.map((g) => g.catId).filter(Boolean));
    const list = cat.games.slice().sort((a, b) => (b.added || "").localeCompare(a.added || ""));
    openSheet(`<h3>${t("cat")}</h3><p class="hint">${t("catHint")}</p>
      ${canEdit() ? `<button class="row ok-row" id="catAdd">${t("addCat")}</button>` : ""}
      ${list.length ? list.map((x) => {
        const s = SYSTEMS[x.system] || { short: x.system, theme: "#888" };
        return `<div class="catitem" style="--c:${s.theme}">
          <div class="cimg">${x.cover ? `<img src="${esc(GH.raw(x.cover))}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(s.short)}</span></div>
          <div class="cinfo"><b>${esc(x.title)}</b><small>${esc(s.label || s.short)} · ${esc(t("by", x.author || "?"))}</small>
            ${x.source ? `<a href="#" data-src="${esc(x.source)}">${t("authorPage")} ↗</a>` : ""}</div>
          <div class="cact">${have.has(x.id) ? `<span class="done">${t("installed")}</span>` : `<button class="ok" data-inst="${esc(x.id)}">${t("install")}</button>`}
            ${canEdit() ? `<button class="mini" data-rm="${esc(x.id)}">${t("catRemove")}</button>` : ""}</div></div>`;
      }).join("") : `<p class="hint">${t("catEmpty")}</p>`}`);
    document.querySelectorAll("#sheet [data-src]").forEach((a) => a.onclick = (e) => { e.preventDefault(); openLink(a.dataset.src); });
    document.querySelectorAll("#sheet [data-inst]").forEach((b) => b.onclick = () => install(list.find((x) => x.id === b.dataset.inst), b));
    document.querySelectorAll("#sheet [data-rm]").forEach((b) => b.onclick = () => remove(cat, b.dataset.rm));
    if (document.getElementById("catAdd")) document.getElementById("catAdd").onclick = () => addForm(cat);
  }

  async function install(x, btn) {
    btn.disabled = true; btn.textContent = t("installing");
    try {
      const res = await fetch(GH.raw(x.file), { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const file = new File([await res.blob()], x.file.split("/").pop());
      const d = await readRom(file);
      if (d.error) throw new Error(d.error);
      const blob = new Blob([await d.data.arrayBuffer()], { type: "application/octet-stream" });
      await putGame({ id: "cat|" + x.id, catId: x.id, fileName: file.name, romName: d.inner, title: x.title, tags: "", system: x.system || d.system,
        size: blob.size, added: Date.now(), lastPlayed: 0, saveKey: "cat-" + x.id, blob, cover: x.cover ? GH.raw(x.cover) : null, coverTried: !!x.cover });
      await window.kameiReload();
      toast(t("catAdded", x.title), 3500);
      sheet();
    } catch (e) { btn.disabled = false; btn.textContent = t("install"); toast(String(e.message || e), 4000); }
  }

  function addForm(cat) {
    let romFile = null, coverFile = null;
    openSheet(`<h3>${t("addCat")}</h3>
      <button class="row ok-row" id="cfPick">${t("catPick")}</button><p class="hint" id="cfName"></p>
      <input id="cfTitle" placeholder="${t("catTitle")}" maxlength="60">
      <select id="cfSys" class="search" style="margin-bottom:12px">${Object.entries(SYSTEMS).map(([k, s]) => `<option value="${k}">${s.label}</option>`).join("")}</select>
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
      if (!$$("cfTitle").value) $$("cfTitle").value = cleanTitle(romFile.name);
    };
    $$("cfSend").onclick = async () => {
      const title = $$("cfTitle").value.trim(), author = $$("cfAuthor").value.trim(), source = $$("cfSrc").value.trim(), system = $$("cfSys").value;
      if (!romFile || !title || (source && !/^https?:\/\/\S+\.\S+/.test(source)) || !$$("cfOk").checked) return toast(t("catNeed"), 4000);
      if (romFile.size > 95 * 1048576) return toast(t("catTooBig"), 4000);
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
      await GH.commit([{ path: "catalogue/catalogue.json", text: JSON.stringify(fresh, null, 2) }], `Catalogue : retrait de ${x.title}`, [x.file, ...(x.cover ? [x.cover] : [])]);
      toast(t("catRemoved")); setTimeout(sheet, 1200);
    } catch (e) { toast(String(e.message || e), 5000); }
  }

  window.kameiCatalogue = { open: sheet };
})();

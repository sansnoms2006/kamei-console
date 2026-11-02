/* Kamei Game Console — automatic updates */
(function () {
  const APK_VERSION = 9;   // version of the Android app this file ships with
  const WEB_VERSION = 38;   // version of the interface files
  const N = window.KameiNative || null;
  const sb = window.kameiSB || null;

  Object.assign(I18N.fr, {
    webSite: "Site web (iPhone, PC…)", webSiteHint: "Met en ligne une version web identique à cette appli. Adresse :", webSiteBtn: "🌐 Mettre le site à jour",
    webSiteUp: "Le site est déjà à jour ✅", webSiteSending: (a, b) => `Envoi du site… ${a}/${b}`, webSiteDone: "Site mis à jour ✅ (en ligne dans 1-2 minutes)",
    webSitePages: "Première fois : sur GitHub → kamei-console → Settings → Pages → Branch « main », dossier « /docs » → Save.",
    ghKey: "Clé GitHub", ghKeyHint: "Colle ici la clé « Kamei app » créée sur GitHub. Elle reste uniquement sur ce téléphone.", ghOk: "Clé GitHub enregistrée et fonctionnelle",
    ghBad: "Cette clé ne fonctionne pas (vérifie qu'elle a accès à kamei-console en lecture et écriture)", ghMissing: "Ajoute d'abord ta clé GitHub", ghRemove: "Retirer la clé de ce téléphone",
    pubZip: "Mise à jour de l'interface (.zip)", apkAnnounce: "Nouvelle version de l'app (.apk)", apkAnnounceHint: "Poste l'APK sur Discord, puis colle ici le lien du message : tes amis verront « Nouvelle version disponible ».",
    apkLinkPh: "Lien du message Discord", announce: "Annoncer la nouvelle version",
    updTitle: "Nouvelle version de l'app", updApkHint: "Télécharge-la puis ouvre le fichier pour l'installer. Tes jeux et sauvegardes sont gardés.",
    updDownload: "Télécharger", later: "Plus tard", updInstalled: "Mise à jour installée ✨", updDownloading: "Mise à jour en cours…",
    publish: "📦 Publier une mise à jour", publishHint: "Choisis le fichier que Claude t'a donné : un .zip (mise à jour rapide) ou un .apk (nouvelle version de l'app).",
    pickFile: "Choisir le fichier", uploading: "Envoi en cours… ne ferme pas l'app", publishedWeb: (v) => `Mise à jour ${v} publiée : tes amis la reçoivent au prochain lancement`,
    publishedApk: (v) => `Version ${v} de l'app publiée`, badUpdate: "Ce fichier n'est pas une mise à jour Kamei", versionNow: (w, a) => `Interface v${w} · App v${a}`,
    apkNumber: "Numéro de version de cet APK", notesPh: "Ce qui change (optionnel)", rollback: "Revenir à la version d'origine",
  });
  Object.assign(I18N.nl, {
    webSite: "Website (iPhone, pc…)", webSiteHint: "Zet een webversie online die identiek is aan deze app. Adres:", webSiteBtn: "🌐 Website bijwerken",
    webSiteUp: "De website is al up-to-date ✅", webSiteSending: (a, b) => `Website uploaden… ${a}/${b}`, webSiteDone: "Website bijgewerkt ✅ (online binnen 1-2 minuten)",
    webSitePages: "Eerste keer: op GitHub → kamei-console → Settings → Pages → Branch « main », map « /docs » → Save.",
    ghKey: "GitHub-sleutel", ghKeyHint: "Plak hier de sleutel « Kamei app » van GitHub. Ze blijft alleen op deze telefoon.", ghOk: "GitHub-sleutel opgeslagen en werkt",
    ghBad: "Deze sleutel werkt niet (controleer lees- en schrijftoegang tot kamei-console)", ghMissing: "Voeg eerst je GitHub-sleutel toe", ghRemove: "Sleutel van deze telefoon verwijderen",
    pubZip: "Update van de interface (.zip)", apkAnnounce: "Nieuwe app-versie (.apk)", apkAnnounceHint: "Post de APK op Discord en plak hier de link van het bericht: je vrienden zien « Nieuwe versie beschikbaar ».",
    apkLinkPh: "Link van het Discord-bericht", announce: "Nieuwe versie aankondigen",
    updTitle: "Nieuwe versie van de app", updApkHint: "Download ze en open het bestand om te installeren. Je spellen en opslag blijven bewaard.",
    updDownload: "Downloaden", later: "Later", updInstalled: "Update geïnstalleerd ✨", updDownloading: "Bezig met updaten…",
    publish: "📦 Update publiceren", publishHint: "Kies het bestand dat Claude je gaf: een .zip (snelle update) of een .apk (nieuwe app-versie).",
    pickFile: "Bestand kiezen", uploading: "Bezig met uploaden… sluit de app niet", publishedWeb: (v) => `Update ${v} gepubliceerd: je vrienden krijgen ze bij de volgende start`,
    publishedApk: (v) => `Appversie ${v} gepubliceerd`, badUpdate: "Dit bestand is geen Kamei-update", versionNow: (w, a) => `Interface v${w} · App v${a}`,
    apkNumber: "Versienummer van deze APK", notesPh: "Wat er verandert (optioneel)", rollback: "Terug naar de originele versie",
  });
  Object.assign(I18N.en, {
    webSite: "Website (iPhone, PC…)", webSiteHint: "Puts online a web version identical to this app. Address:", webSiteBtn: "🌐 Update the website",
    webSiteUp: "The website is already up to date ✅", webSiteSending: (a, b) => `Uploading the website… ${a}/${b}`, webSiteDone: "Website updated ✅ (online in 1-2 minutes)",
    webSitePages: "First time: on GitHub → kamei-console → Settings → Pages → Branch \"main\", folder \"/docs\" → Save.",
    ghKey: "GitHub key", ghKeyHint: "Paste the « Kamei app » key created on GitHub. It stays on this phone only.", ghOk: "GitHub key saved and working",
    ghBad: "This key doesn't work (check it has read and write access to kamei-console)", ghMissing: "Add your GitHub key first", ghRemove: "Remove the key from this phone",
    pubZip: "Interface update (.zip)", apkAnnounce: "New app version (.apk)", apkAnnounceHint: "Post the APK on Discord, then paste the message link here: your friends will see « New version available ».",
    apkLinkPh: "Discord message link", announce: "Announce the new version",
    updTitle: "New version of the app", updApkHint: "Download it and open the file to install. Your games and saves are kept.",
    updDownload: "Download", later: "Later", updInstalled: "Update installed ✨", updDownloading: "Updating…",
    publish: "📦 Publish an update", publishHint: "Pick the file Claude gave you: a .zip (quick update) or an .apk (new app version).",
    pickFile: "Pick the file", uploading: "Uploading… don't close the app", publishedWeb: (v) => `Update ${v} published: your friends get it next time they open the app`,
    publishedApk: (v) => `App version ${v} published`, badUpdate: "This file isn't a Kamei update", versionNow: (w, a) => `Interface v${w} · App v${a}`,
    apkNumber: "Version number of this APK", notesPh: "What's new (optional)", rollback: "Go back to the original version",
  });

  function webVersion() {
    let o = 0;
    try { o = parseInt((N && N.getOta && N.getOta()) || "0", 10) || 0; } catch (e) {}
    return Math.max(WEB_VERSION, o);
  }
  window.kameiVersions = () => ({ web: webVersion(), apk: APK_VERSION });

  // The interface loaded fine: confirm it so the app doesn't roll back
  setTimeout(() => { try { N && N.markGood && N.markGood(); } catch (e) {} }, 4000);

  const blobToB64 = (blob) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1] || "");
    r.onerror = () => rej(r.error);
    r.readAsDataURL(blob);
  });

  async function readManifest(zip) {
    const entries = await zipEntries(zip);
    const m = entries.find((e) => e.name === "ota.json");
    if (!m) return null;
    const json = JSON.parse(await (await zipExtract(zip, m)).text());
    return { manifest: json, entries };
  }

  const GH = window.KameiGH || null;
  async function installWeb(v, fromGitHub) {
    const url = fromGitHub ? GH.raw(`updates/web-${v}.zip`) : sb.storage.from("updates").getPublicUrl(`web-${v}.zip`).data.publicUrl;
    const res = await fetch(url + "?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return;
    toast(t("updDownloading"), 30000);
    const zip = await res.blob();
    const got = await readManifest(zip);
    if (!got || got.manifest.web !== v) return;
    for (const e of got.entries) {
      const data = await zipExtract(zip, e);
      if (!N.writeFile(`${v}/${e.name}`, await blobToB64(data))) throw new Error("write " + e.name);
    }
    N.setOta(String(v));
    toast(t("updInstalled"));
    setTimeout(() => location.reload(), 1200);
  }

  function apkSheet(c) {
    openSheet(`<h3>${t("updTitle")} (v${c.apk_version})</h3>
      ${c.notes ? `<p class="hint" style="color:var(--text)">${esc(c.notes)}</p>` : ""}<p class="hint">${t("updApkHint")}</p>
      <div class="btns"><button id="uLater">${t("later")}</button><button class="ok" id="uGet">${t("updDownload")}</button></div>`);
    document.getElementById("uLater").onclick = closeSheet;
    document.getElementById("uGet").onclick = () => { try { N.openUrl(c.apk_url); } catch (e) { location.href = c.apk_url; } closeSheet(); };
  }

  /* Where is the latest version announced? GitHub first, then the old Supabase table */
  async function latest() {
    if (GH) { try { const j = await GH.readJSON("updates/latest.json"); if (j && j.web) return Object.assign({ fromGitHub: true }, j); } catch (e) {} }
    if (sb) { try { const r = await sb.from("app_config").select("*").eq("id", 1).maybeSingle(); if (r.data) return Object.assign({ fromGitHub: false }, r.data); } catch (e) {} }
    return null;
  }
  async function check() {
    if (!N || !navigator.onLine) return;
    try {
      const c = await latest(); if (!c) return;
      if (c.apk_version > APK_VERSION && c.apk_url) {
        if (sessionStorage.getItem("kamei-apk-asked") !== String(c.apk_version)) { sessionStorage.setItem("kamei-apk-asked", String(c.apk_version)); apkSheet(c); if (document.visibilityState !== "visible" && window.kameiNotify) window.kameiNotify("Kamei · ⬆️", t("nUpdate") + " (v" + c.apk_version + ")"); }
      } else if (c.web_version > webVersion() && (c.min_apk || 0) <= APK_VERSION) {
        await installWeb(c.web_version, c.fromGitHub);
      } else if (c.web > webVersion() && (c.min_apk || 0) <= APK_VERSION) {
        await installWeb(c.web, c.fromGitHub);
      }
    } catch (e) { /* offline or server unreachable: try next time */ }
  }

  /* ---------- Admin: publish an update (to GitHub) ---------- */
  async function ghLatest() { try { return (await GH.readJSON("updates/latest.json")) || {}; } catch (e) { return {}; } }
  window.kameiPublishSheet = async function () {
    const hasKey = GH && !!GH.token();
    const cur = GH ? await ghLatest() : {};
    openSheet(`<h3>${t("publish")}</h3>
      <p class="hint">${t("versionNow", Math.max(cur.web || 0, webVersion()), Math.max(cur.apk_version || 0, APK_VERSION))}</p>
      <h4>🔑 ${t("ghKey")}</h4>
      <p class="hint">${hasKey ? "✅ " + t("ghOk") : t("ghKeyHint")}</p>
      <div class="addf"><input id="ghK" type="password" placeholder="github_pat_…" autocomplete="off"><button class="ok" id="ghSave">OK</button></div>
      ${hasKey ? `<button class="mini" id="ghDel" style="margin:6px 0 4px">${t("ghRemove")}</button>` : ""}
      <h4>📦 ${t("pubZip")}</h4>
      <input id="pNotes" placeholder="${t("notesPh")}" maxlength="200">
      <button class="row ok-row" id="pPick">${t("pickFile")} (.zip)</button>
      <h4>📱 ${t("apkAnnounce")}</h4>
      <p class="hint">${t("apkAnnounceHint")}</p>
      <div class="addf"><input id="aV" type="number" inputmode="numeric" placeholder="${t("apkNumber")}" style="max-width:110px"><input id="aUrl" placeholder="${t("apkLinkPh")}"></div>
      <button class="row ok-row" id="aGoBtn">${t("announce")}</button>
      <h4>🌐 ${t("webSite")}</h4>
      <p class="hint">${t("webSiteHint")} <b>${esc(GH ? GH.site : "")}</b><br>${t("webSitePages")}</p>
      <button class="row ok-row" id="wSite">${t("webSiteBtn")}</button>
      ${N ? `<button class="row danger" id="pRoll" style="margin-top:10px">${t("rollback")}</button>` : ""}
      <div class="btns"><button id="pBack">←</button></div>
      <input type="file" id="pFile" class="hidden-input" accept=".zip,application/zip">`);
    const $$ = (id) => document.getElementById(id);
    $$("pBack").onclick = () => window.kameiAccount && window.kameiAccount.open();
    $$("ghSave").onclick = async () => {
      const v = $$("ghK").value.trim(); if (!v) return;
      GH.setToken(v);
      try { await GH.check(); toast("✅ " + t("ghOk")); window.kameiPublishSheet(); }
      catch (e) { GH.setToken(""); toast(t("ghBad"), 5000); }
    };
    if ($$("ghDel")) $$("ghDel").onclick = () => { GH.setToken(""); window.kameiPublishSheet(); };
    $$("wSite").onclick = async () => {
      if (!GH || !GH.token()) return toast(t("ghMissing"), 4000);
      const b = $$("wSite"); b.disabled = true;
      try {
        const list = (await (await fetch("web-files.json", { cache: "no-store" })).json()).files;
        const remote = await GH.tree();
        const todo = list.filter((f) => remote["docs/" + f.p] !== f.s).map((f) => ({
          path: "docs/" + f.p,
          load: async () => { const r = await fetch(f.p, { cache: "no-store" }); if (!r.ok) throw new Error(f.p + " " + r.status); return GH.toB64(await r.blob()); },
        }));
        if (!remote["docs/.nojekyll"]) todo.push({ path: "docs/.nojekyll", text: "" });
        if (todo.length) todo.push({ path: "docs/web-files.json", load: async () => GH.toB64(await (await fetch("web-files.json", { cache: "no-store" })).blob()) });
        if (!todo.length) { toast(t("webSiteUp"), 4000); b.disabled = false; return; }
        await GH.commit(todo, `Site web : mise à jour (v${webVersion()})`, [], (a, n) => toast(t("webSiteSending", a, n), 60000));
        toast(t("webSiteDone"), 6000);
      } catch (err) { toast((err && err.message) || t("netErr"), 6000); }
      b.disabled = false;
    };
    if (N) $$("pRoll").onclick = () => { N.resetOta(); location.reload(); };
    $$("pPick").onclick = () => { if (!GH || !GH.token()) return toast(t("ghMissing"), 4000); $$("pFile").click(); };
    $$("pFile").onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      const notes = $$("pNotes").value.trim() || null;
      try {
        const got = await readManifest(f);
        if (!got || !got.manifest.web) throw new Error(t("badUpdate"));
        const v = got.manifest.web;
        toast(t("uploading"), 120000);
        const now = await ghLatest();
        const next = Object.assign({}, now, { web: v, min_apk: got.manifest.min_apk || 0, notes, updated: new Date().toISOString() });
        await GH.commit([{ path: `updates/web-${v}.zip`, b64: await blobToB64(f) }, { path: "updates/latest.json", text: JSON.stringify(next, null, 2) }], `Mise à jour ${v}`);
        toast(t("publishedWeb", v), 6000); closeSheet();
      } catch (err) { toast((err && err.message) || t("netErr"), 6000); }
    };
    $$("aGoBtn").onclick = async () => {
      if (!GH || !GH.token()) return toast(t("ghMissing"), 4000);
      const v = parseInt($$("aV").value, 10), url = $$("aUrl").value.trim();
      if (!v || !/^https?:\/\//.test(url)) return toast(t("badUpdate"), 4000);
      try {
        const now = await ghLatest();
        const next = Object.assign({}, now, { apk_version: v, apk_url: url, notes: $$("pNotes").value.trim() || now.notes || null, updated: new Date().toISOString() });
        if (!next.web) next.web = webVersion();
        await GH.commit([{ path: "updates/latest.json", text: JSON.stringify(next, null, 2) }], `App v${v}`);
        toast(t("publishedApk", v), 5000); closeSheet();
      } catch (err) { toast((err && err.message) || t("netErr"), 6000); }
    };
  };

  setTimeout(check, 1500);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") check(); });
})();

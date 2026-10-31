/* Kamei Game Console — export / import everything (games, saves, save states, BIOS, settings) to change phone.
   One .zip file that stays with the user: nothing goes to the cloud. */
(function () {
  const L = {
    fr: { bkMenu: "📦 Changer de téléphone (sauvegarde)", bkTitle: "Changer de téléphone", bkHint: "Crée un fichier avec tout ce qui est sur ce téléphone : tes jeux, sauvegardes, états de jeu, BIOS et réglages. Mets-le sur ton nouveau téléphone (câble, Drive, WhatsApp…) puis importe-le ici. Rien n'est envoyé sur Internet.",
      bkGames: "Inclure mes fichiers de jeux (plus lourd)", bkExport: "📤 Exporter mes données", bkImport: "📥 Importer un fichier", bkWorking: "Préparation… ", bkDone: "Fichier enregistré ✅", bkFail: "Échec de l'enregistrement",
      bkSize: (m) => `Taille : ${m} Mo`, bkApk: "Mets à jour l'appli (v9) pour pouvoir enregistrer le fichier.", bkImpQ: "Importer ce fichier ? Les données actuelles de ce téléphone seront remplacées.",
      bkImpDone: "Import terminé ✅ L'appli redémarre…", bkBad: "Ce fichier n'est pas une sauvegarde Kamei.", bkReading: "Lecture… " },
    nl: { bkMenu: "📦 Van telefoon wisselen (back-up)", bkTitle: "Van telefoon wisselen", bkHint: "Maakt een bestand met alles op deze telefoon: je spellen, opslagbestanden, savestates, BIOS en instellingen. Zet het op je nieuwe telefoon (kabel, Drive, WhatsApp…) en importeer het hier. Niets gaat naar het internet.",
      bkGames: "Mijn spelbestanden meenemen (groter)", bkExport: "📤 Mijn gegevens exporteren", bkImport: "📥 Een bestand importeren", bkWorking: "Voorbereiden… ", bkDone: "Bestand opgeslagen ✅", bkFail: "Opslaan mislukt",
      bkSize: (m) => `Grootte: ${m} MB`, bkApk: "Werk de app bij (v9) om het bestand te kunnen opslaan.", bkImpQ: "Dit bestand importeren? De huidige gegevens op deze telefoon worden vervangen.",
      bkImpDone: "Import klaar ✅ De app herstart…", bkBad: "Dit is geen Kamei-back-up.", bkReading: "Lezen… " },
    en: { bkMenu: "📦 Switch phone (backup)", bkTitle: "Switch phone", bkHint: "Creates one file with everything on this phone: your games, saves, save states, BIOS and settings. Put it on your new phone (cable, Drive, WhatsApp…) and import it here. Nothing is sent to the Internet.",
      bkGames: "Include my game files (bigger)", bkExport: "📤 Export my data", bkImport: "📥 Import a file", bkWorking: "Preparing… ", bkDone: "File saved ✅", bkFail: "Saving failed",
      bkSize: (m) => `Size: ${m} MB`, bkApk: "Update the app (v9) to be able to save the file.", bkImpQ: "Import this file? The current data on this phone will be replaced.",
      bkImpDone: "Import done ✅ The app restarts…", bkBad: "This file is not a Kamei backup.", bkReading: "Reading… " },
  };
  for (const k in L) Object.assign(I18N[k], L[k]);

  const $ = (id) => document.getElementById(id);
  const SKIP_LS = /^(kamei-gh-token|kamei-push|sb-.*-auth-token)$/;           // secrets & login stay on the old phone
  const SKIP_DB = /^EmulatorJS-(core|roms|bios)$/;                           // download caches, they come back by themselves
  const N = window.KameiNative;

  /* ---------- IndexedDB helpers ---------- */
  const req = (r) => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const openDB = (name, version, upgrade) => new Promise((res, rej) => {
    const r = version ? indexedDB.open(name, version) : indexedDB.open(name);
    r.onupgradeneeded = (e) => upgrade && upgrade(r.result, e);
    r.onsuccess = () => { const d = r.result; d.onversionchange = () => d.close(); res(d); };
    r.onerror = () => rej(r.error);
    r.onblocked = () => rej(new Error("blocked"));
  });
  async function dbNames() {
    if (indexedDB.databases) { try { return (await indexedDB.databases()).filter((d) => d.name); } catch (e) {} }
    return [{ name: "retro-pocket" }, { name: "kamei-bios" }, { name: "kamei-states" }, { name: "kamei-backups" }, { name: "/data/saves" }, { name: "EmulatorJS-states" }];
  }

  /* ---------- turn values with Blobs / bytes into JSON + side files ---------- */
  function encoder(files) {
    const enc = (v) => {
      if (v === null || typeof v !== "object") return v;
      if (v instanceof Blob) { const id = "bin/" + files.length; files.push({ name: id, blob: v }); return { $b: id, t: "blob", m: v.type || "", n: v instanceof File ? v.name : undefined }; }
      if (v instanceof ArrayBuffer) { const id = "bin/" + files.length; files.push({ name: id, blob: new Blob([v]) }); return { $b: id, t: "ab" }; }
      if (ArrayBuffer.isView(v)) { const id = "bin/" + files.length; files.push({ name: id, blob: new Blob([new Uint8Array(v.buffer, v.byteOffset, v.byteLength)]) }); return { $b: id, t: v.constructor.name }; }
      if (v instanceof Date) return { $d: v.toISOString() };
      if (Array.isArray(v)) return v.map(enc);
      const o = {}; for (const k in v) o[k] = enc(v[k]); if ("$b" in o || "$d" in o) return { $o: o }; return o;
    };
    return enc;
  }
  async function decode(v, getFile) {
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) { const out = []; for (const x of v) out.push(await decode(x, getFile)); return out; }
    if (v.$d) return new Date(v.$d);
    if (v.$o) { const o = {}; for (const k in v.$o) o[k] = await decode(v.$o[k], getFile); return o; }
    if (v.$b) {
      const b = await getFile(v.$b);
      if (v.t === "blob") return v.n ? new File([b], v.n, { type: v.m }) : new Blob([b], { type: v.m });
      const ab = await b.arrayBuffer();
      if (v.t === "ab") return ab;
      const C = window[v.t] || Uint8Array;
      return new C(ab);
    }
    const o = {}; for (const k in v) o[k] = await decode(v[k], getFile); return o;
  }

  /* ---------- export ---------- */
  async function collect(withGames, status) {
    const files = [], enc = encoder(files);
    const man = { kamei: 1, date: new Date().toISOString(), ls: {}, dbs: [] };
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (!SKIP_LS.test(k)) man.ls[k] = localStorage.getItem(k); }
    for (const info of await dbNames()) {
      if (SKIP_DB.test(info.name)) continue;
      if (!withGames && info.name === "retro-pocket") continue;
      status(info.name);
      let d; try { d = await openDB(info.name); } catch (e) { continue; }
      const out = { name: info.name, version: d.version, stores: [] };
      for (const sn of Array.from(d.objectStoreNames)) {
        const tr = d.transaction(sn, "readonly"), s = tr.objectStore(sn);
        const st = { name: sn, keyPath: s.keyPath, autoIncrement: s.autoIncrement, indexes: [], records: [] };
        for (const ix of Array.from(s.indexNames)) { const x = s.index(ix); st.indexes.push({ name: ix, keyPath: x.keyPath, unique: x.unique, multiEntry: x.multiEntry }); }
        const keys = await req(s.getAllKeys()), vals = await req(s.getAll());
        keys.forEach((k, i) => st.records.push({ k: enc(k), v: enc(vals[i]) }));
        out.stores.push(st);
      }
      d.close();
      man.dbs.push(out);
    }
    files.unshift({ name: "kamei-backup.json", blob: new Blob([JSON.stringify(man)], { type: "application/json" }) });
    return files;
  }
  // stored (uncompressed) zip, CRC computed piece by piece so big games don't fill the memory
  async function crcBlob(b) {
    let c = 0xffffffff;
    for (let o = 0; o < b.size; o += 4 << 20) {
      const u = new Uint8Array(await b.slice(o, o + (4 << 20)).arrayBuffer());
      for (let i = 0; i < u.length; i++) c = CRC_T[(c ^ u[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }
  async function makeZip(files, status) {
    const parts = [], cen = []; let off = 0;
    for (let i = 0; i < files.length; i++) {
      const f = files[i]; status(`${i + 1}/${files.length}`);
      const name = new TextEncoder().encode(f.name), size = f.blob.size, crc = await crcBlob(f.blob);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 10, true); h.setUint16(6, 0x800, true); h.setUint32(14, crc, true); h.setUint32(18, size, true); h.setUint32(22, size, true); h.setUint16(26, name.length, true);
      parts.push(new Uint8Array(h.buffer), name, f.blob);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 10, true); c.setUint16(8, 0x800, true); c.setUint32(16, crc, true); c.setUint32(20, size, true); c.setUint32(24, size, true);
      c.setUint16(28, name.length, true); c.setUint32(42, off, true);
      cen.push(new Uint8Array(c.buffer), name);
      off += 30 + name.length + size;
    }
    const cenSize = cen.reduce((a, x) => a + x.length, 0);
    const e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cenSize, true); e.setUint32(16, off, true);
    return new Blob([...parts, ...cen, new Uint8Array(e.buffer)], { type: "application/zip" });
  }
  function b64(u8) { let s = ""; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
  async function saveFile(blob, name, status) {
    if (N && N.saveStart) {
      if (!N.saveStart()) throw new Error("start");
      const CH = 3 * 256 * 1024;   // multiple of 3 → clean base64 pieces
      for (let o = 0; o < blob.size; o += CH) {
        status(Math.round((o / blob.size) * 100) + "%");
        if (!N.saveChunk(b64(new Uint8Array(await blob.slice(o, o + CH).arrayBuffer())))) throw new Error("chunk");
      }
      return new Promise((res) => { window.kameiSaved = (ok) => { window.kameiSaved = null; res(!!ok); }; N.saveFinish(name, "application/zip"); });
    }
    if (N) { toast(t("bkApk"), 5000); return false; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 60000);
    return true;
  }
  async function doExport(withGames, status) {
    const files = await collect(withGames, (n) => status(t("bkWorking") + n));
    const zip = await makeZip(files, (n) => status(t("bkWorking") + n));
    status(t("bkSize", (zip.size / 1048576).toFixed(1)));
    const d = new Date(), p = (n) => String(n).padStart(2, "0");
    return saveFile(zip, `kamei-sauvegarde-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.zip`, (n) => status(t("bkWorking") + n));
  }

  /* ---------- import ---------- */
  async function doImport(file, status) {
    const entries = await zipEntries(file);
    const byName = {}; entries.forEach((e) => (byName[e.name] = e));
    if (!byName["kamei-backup.json"]) throw new Error("bad");
    const man = JSON.parse(await (await zipExtract(file, byName["kamei-backup.json"])).text());
    if (!man || man.kamei !== 1) throw new Error("bad");
    const getFile = (id) => zipExtract(file, byName[id]);
    const existing = new Set((await dbNames()).map((d) => d.name));
    for (const db of man.dbs) {
      status(t("bkReading") + db.name);
      const make = (d, e) => {
        for (const st of db.stores) {
          if (d.objectStoreNames.contains(st.name)) continue;
          const s = d.createObjectStore(st.name, Object.assign({ autoIncrement: !!st.autoIncrement }, st.keyPath != null ? { keyPath: st.keyPath } : {}));
          for (const ix of st.indexes) s.createIndex(ix.name, ix.keyPath, { unique: ix.unique, multiEntry: ix.multiEntry });
        }
      };
      let d = existing.has(db.name) ? await openDB(db.name) : await openDB(db.name, db.version, make);
      if (db.stores.some((st) => !d.objectStoreNames.contains(st.name))) { const v = Math.max(d.version + 1, db.version); d.close(); d = await openDB(db.name, v, make); }
      for (const st of db.stores) {
        const recs = [];
        for (const r of st.records) recs.push({ k: await decode(r.k, getFile), v: await decode(r.v, getFile) });
        await new Promise((res, rej) => {
          const tr = d.transaction(st.name, "readwrite"), s = tr.objectStore(st.name);
          s.clear();
          for (const r of recs) (st.keyPath != null ? s.put(r.v) : s.put(r.v, r.k));
          tr.oncomplete = res; tr.onerror = () => rej(tr.error); tr.onabort = () => rej(tr.error);
        });
      }
      d.close();
    }
    for (const k in man.ls) { if (!SKIP_LS.test(k)) try { localStorage.setItem(k, man.ls[k]); } catch (e) {} }
    try { localStorage.setItem("kamei-tour-done", "1"); } catch (e) {}
  }

  /* ---------- sheet ---------- */
  function open() {
    openSheet(`<h3>${t("bkTitle")}</h3><p class="hint">${t("bkHint")}</p>
      <label class="row" style="display:flex;gap:10px;align-items:center"><input type="checkbox" id="bkGames" checked style="width:auto;margin:0"> ${t("bkGames")}</label>
      <button class="row ok-row" id="bkExp">${t("bkExport")}</button>
      <button class="row" id="bkImp">${t("bkImport")}</button>
      <p class="hint" id="bkSt" style="min-height:18px"></p>
      <input type="file" id="bkFile" accept=".zip,application/zip" hidden>
      <div class="btns"><button id="bkBack">←</button></div>`);
    const status = (s) => { const e = $("bkSt"); if (e) e.textContent = s; };
    const busy = (on) => { ["bkExp", "bkImp"].forEach((id) => { if ($(id)) $(id).disabled = on; }); };
    $("bkBack").onclick = () => $("langBtn").click();
    $("bkExp").onclick = async () => {
      busy(true);
      try { const ok = await doExport($("bkGames").checked, status); status(ok ? t("bkDone") : ""); if (ok) toast(t("bkDone")); }
      catch (e) { status(t("bkFail") + " (" + (e.message || e) + ")"); }
      busy(false);
    };
    $("bkImp").onclick = () => $("bkFile").click();
    $("bkFile").onchange = async (e) => {
      const f = e.target.files && e.target.files[0]; e.target.value = "";
      if (!f || !window.confirm(t("bkImpQ"))) return;
      busy(true);
      try { await doImport(f, status); status(t("bkImpDone")); toast(t("bkImpDone"), 3000); setTimeout(() => location.reload(), 1500); }
      catch (err) { status(err.message === "bad" ? t("bkBad") : t("bkFail") + " (" + (err.message || err) + ")"); busy(false); }
    };
  }
  window.kameiBackup = { open, doExport, doImport, collect, makeZip };
})();

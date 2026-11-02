/* Kamei Game Console — "Moi" tab: profile photo, Kamei, settings and account, grouped */
(function () {
  const L = {
    fr: { meProfile: "MON PROFIL", meSettings: "RÉGLAGES", meData: "DONNÉES", meAccount: "COMPTE", mePhoto: "Changer la photo", mePhotoDel: "Retirer la photo",
      mePhotoQ: "Photo de profil", mePhotoHint: "Choisis une image : elle sera recadrée en carré. Tous les joueurs pourront la voir, alors reste correct 🙂",
      mePhotoPick: "🖼️ Choisir une image", mePhotoUp: "Envoi de la photo…", mePhotoOk: "Photo mise à jour ✅", mePhotoErr: "La photo n'a pas pu être envoyée",
      meLang: "Langue et thème", meApp: "Vibrations, notifications…", meTour: "Revoir la visite guidée", meBackup: "Changer de téléphone", meBios: "BIOS des consoles",
      meApkG: "APPLI", meApk: "📱 Installer l'appli (Android uniquement)", meIos: "📱 Mettre l'appli sur l'écran d'accueil",
      apkTitle: "L'appli Android Kamei Console", apkWhy: "Avec l'appli : notifications même quand elle est fermée, jeux plus fluides, manettes Bluetooth et ton icône sur l'écran d'accueil.",
      apkDl: "⬇️ Télécharger l'appli (APK)", apkSteps: ["Touche « Télécharger » et attends la fin du téléchargement.", "Ouvre le fichier téléchargé (notification ou dossier Téléchargements).", "Si Android demande : Paramètres → autorise « Installer des applis inconnues » pour ton navigateur, puis reviens.", "Touche « Installer », puis « Ouvrir »."],
      apkWarn: "⚠️ Avant d'installer : mets un mot de passe (Moi → 🔐 Mot de passe) pour retrouver ton compte dans l'appli avec ton pseudo.", apkSize: "Environ 100 Mo : mieux vaut être en Wi-Fi.", apkNone: "Le lien de l'appli n'est pas encore disponible, réessaie plus tard.",
      iosSteps: ["Ouvre ce site dans Safari.", "Touche le bouton Partager (le carré avec la flèche ↑).", "Choisis « Sur l'écran d'accueil », puis « Ajouter »."], apkOnly: "🤖 Uniquement pour les téléphones et tablettes Android (pas pour iPhone ni iPad).", iosHint: "⚠️ L'appli existe seulement pour Android : elle ne s'installe pas sur iPhone ou iPad. Par contre, tu peux mettre Kamei Console sur ton écran d'accueil comme une vraie appli.",
      meAdmin: "Administration", navPalm: "🏆 Palmarès des tournois", meLogout: "Se déconnecter", meKamei: "Mon Kamei", meCopy: "Copier" },
    nl: { meProfile: "MIJN PROFIEL", meSettings: "INSTELLINGEN", meData: "GEGEVENS", meAccount: "ACCOUNT", mePhoto: "Foto wijzigen", mePhotoDel: "Foto verwijderen",
      mePhotoQ: "Profielfoto", mePhotoHint: "Kies een afbeelding: ze wordt vierkant bijgesneden. Alle spelers kunnen ze zien, dus hou het netjes 🙂",
      mePhotoPick: "🖼️ Afbeelding kiezen", mePhotoUp: "Foto uploaden…", mePhotoOk: "Foto bijgewerkt ✅", mePhotoErr: "De foto kon niet worden verstuurd",
      meLang: "Taal en thema", meApp: "Trillen, meldingen…", meTour: "Rondleiding opnieuw bekijken", meBackup: "Van telefoon wisselen", meBios: "BIOS van consoles",
      meApkG: "APP", meApk: "📱 App installeren (alleen Android)", meIos: "📱 App op je beginscherm zetten",
      apkTitle: "De Android-app Kamei Console", apkWhy: "Met de app: meldingen ook als ze gesloten is, vlotter spelen, Bluetooth-controllers en je icoon op het beginscherm.",
      apkDl: "⬇️ App downloaden (APK)", apkSteps: ["Tik op « Downloaden » en wacht tot het klaar is.", "Open het gedownloade bestand (melding of map Downloads).", "Vraagt Android het: Instellingen → sta « Onbekende apps installeren » toe voor je browser en ga terug.", "Tik op « Installeren » en dan « Openen »."],
      apkWarn: "⚠️ Voor je installeert: kies een wachtwoord (Ik → 🔐 Wachtwoord) om je account in de app terug te vinden met je naam.", apkSize: "Ongeveer 100 MB: liefst via wifi.", apkNone: "De link van de app is nog niet beschikbaar, probeer later opnieuw.",
      iosSteps: ["Open deze site in Safari.", "Tik op de deelknop (vierkant met pijl ↑).", "Kies « Zet op beginscherm » en dan « Voeg toe »."], apkOnly: "🤖 Alleen voor Android-telefoons en -tablets (niet voor iPhone of iPad).", iosHint: "⚠️ De app bestaat alleen voor Android: ze werkt niet op iPhone of iPad. Wel kun je Kamei Console als een echte app op je beginscherm zetten.",
      meAdmin: "Beheer", navPalm: "🏆 Erelijst van toernooien", meLogout: "Uitloggen", meKamei: "Mijn Kamei", meCopy: "Kopiëren" },
    en: { meProfile: "MY PROFILE", meSettings: "SETTINGS", meData: "DATA", meAccount: "ACCOUNT", mePhoto: "Change photo", mePhotoDel: "Remove photo",
      mePhotoQ: "Profile photo", mePhotoHint: "Pick an image: it will be cropped to a square. Every player can see it, so keep it clean 🙂",
      mePhotoPick: "🖼️ Pick an image", mePhotoUp: "Uploading photo…", mePhotoOk: "Photo updated ✅", mePhotoErr: "The photo couldn't be uploaded",
      meLang: "Language and theme", meApp: "Vibration, notifications…", meTour: "Replay the guided tour", meBackup: "Switch phone", meBios: "Console BIOS files",
      meApkG: "APP", meApk: "📱 Install the app (Android only)", meIos: "📱 Add the app to your home screen",
      apkTitle: "The Kamei Console Android app", apkWhy: "With the app: notifications even when it's closed, smoother games, Bluetooth controllers and your icon on the home screen.",
      apkDl: "⬇️ Download the app (APK)", apkSteps: ["Tap « Download » and wait until it's done.", "Open the downloaded file (notification or Downloads folder).", "If Android asks: Settings → allow « Install unknown apps » for your browser, then come back.", "Tap « Install », then « Open »."],
      apkWarn: "⚠️ Before installing: set a password (Me → 🔐 Password) to find your account in the app with your username.", apkSize: "About 100 MB: Wi-Fi is better.", apkNone: "The app link isn't available yet, try again later.",
      iosSteps: ["Open this site in Safari.", "Tap the Share button (square with an ↑ arrow).", "Choose « Add to Home Screen », then « Add »."], apkOnly: "🤖 Only for Android phones and tablets (not iPhone or iPad).", iosHint: "⚠️ The app only exists for Android: it can't be installed on iPhone or iPad. However, you can put Kamei Console on your home screen like a real app.",
      meAdmin: "Administration", navPalm: "🏆 Tournament trophies", meLogout: "Log out", meKamei: "My Kamei", meCopy: "Copy" },
  };
  for (const k in L) Object.assign(I18N[k], L[k]);

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const F = (k) => !window.kameiFeature || window.kameiFeature(k);
  const chev = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;

  const st = document.createElement("style");
  st.textContent = `
  #v-me .mhead { display: flex; align-items: center; gap: 14px; margin: 6px 0 18px; }
  #v-me .mav { position: relative; flex: none; }
  #v-me .mav .cam { position: absolute; right: -4px; bottom: -4px; width: 32px; height: 32px; border-radius: 50%; border: 3px solid var(--bg); background: var(--tacc, #9BD14B); color: #0b0b12; display: grid; place-items: center; }
  #v-me .mname { font-size: 22px; font-weight: 800; margin: 0; }
  #v-me .mcode { color: var(--muted); font-size: 13px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  #v-me .mgrp { margin: 0 0 18px; }
  #v-me .mgrp h4 { margin: 0 0 8px 4px; font-size: 12px; font-weight: 700; color: var(--muted); letter-spacing: .6px; }
  #v-me .mlist { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
  #v-me .mlist button { width: 100%; min-height: 50px; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 16px; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--line) 80%, transparent); background: none; color: var(--text); font: 500 14px Inter, sans-serif; text-align: left; }
  #v-me .mlist button:last-child { border-bottom: 0; }
  #v-me .mlist button span.v { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 13px; }
  #v-me .mlist button.danger { color: #ff7b8d; }
  #v-me .mpet { width: 100%; display: flex; gap: 14px; align-items: center; padding: 12px; border-radius: 18px; background: var(--panel); border: 1px solid var(--line); margin-bottom: 18px; color: var(--text); text-align: left; font: inherit; }
  #v-me .mpet .pet-stage { width: 86px; height: 86px; margin: 0; border-radius: 14px; flex: none; }
  #v-me .mpet .pg { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 10px; margin-top: 8px; }
  #v-me .mpet .pg small { display: block; font-size: 11px; color: var(--muted); }
  #v-me .mpet .pg i { display: block; height: 6px; border-radius: 4px; background: #262B32; overflow: hidden; margin-top: 3px; }
  #v-me .mpet .pg i b { display: block; height: 100%; border-radius: 4px; }
  .phprev { display: grid; place-items: center; margin: 6px 0 14px; }`;
  document.head.appendChild(st);

  let el = null;
  function petHTML() {
    const P = window.kameiPet, p = P && P.get();
    if (!p || !F("pet")) return "";
    const g = (k) => `<div><small>${t("petG")[k]}</small><i><b style="width:${Math.round(p[k])}%;background:${p[k] < 25 ? "#ef4444" : p[k] < 50 ? "#f59e0b" : "var(--tacc, #9BD14B)"}"></b></i></div>`;
    return `<button class="mpet" id="mePet"><div class="pet-stage m-${P.moodOf(p)}"><div class="ground"></div>${P.svg(p, 86, 105)}</div>
      <div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><b style="font-size:16px">${esc(p.name || "Kamei")}</b>
      <small style="color:var(--muted)">${t("petLv", p.level)} · ${t("petStage")[P.stageOf(p)]}</small></div>
      <div class="pg">${g("food")}${g("fun")}${g("energy")}${g("clean")}</div></div></button>`;
  }
  function paintPet() {
    if (!el) return;
    const box = el.querySelector("#mePetBox");
    if (!box) return;
    box.innerHTML = petHTML();
    const b = box.querySelector("#mePet"); if (b) b.onclick = () => window.kameiPet.open();
  }
  function render(v) {
    el = v;
    const u = me();
    if (!u) return;
    const row = (id, label, value) => `<button id="${id}"><span>${label}</span><span class="v">${value || ""}${chev}</span></button>`;
    const grp = (title, rows) => (rows.filter(Boolean).length ? `<div class="mgrp"><h4>${title}</h4><div class="mlist">${rows.filter(Boolean).join("")}</div></div>` : "");
    v.innerHTML = `<div class="mhead"><div class="mav">${window.kameiAvatar(u, 72)}<button class="cam" id="mePhoto" aria-label="${t("mePhoto")}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></button></div>
        <div style="min-width:0"><p class="mname">${esc(u.pseudo)} ${u.is_admin ? `<span class="badge">Admin</span>` : ""}</p>
        <div class="mcode"><span>${esc(u.friend_code || "")}</span><button class="mini" id="meCopy">${t("meCopy")}</button></div></div></div>
      <div id="mePetBox"></div>
      ${grp(t("meProfile"), [
        window.kameiEvents && F("events") ? row("mePalm", t("navPalm")) : "",
        window.kameiProfile && F("profile") ? row("meBadges", t("pfMine").replace(/^\S+\s/, "")) : "",
        window.kameiTrades && F("trades") ? row("meTrades", t("trades").replace(/^\S+\s/, "")) : "",
      ])}
      ${grp(t("meSettings"), [row("meLang", t("meLang"), lang.toUpperCase()), row("meApp", t("meApp")), window.kameiTour ? row("meTour", t("meTour")) : ""])}
      ${grp(t("meData"), [row("meBios", t("meBios")), window.kameiBackup ? row("meBackup", t("meBackup")) : ""])}
      ${window.KameiNative ? "" : grp(t("meApkG"), [row("meApk", /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ? t("meApk") : t("meApk"))])}
      ${grp(t("meAccount"), [window.kameiSecure ? row("meSecure", t("secure")) : "", u.is_admin ? row("meAdmin", t("meAdmin")) : "", `<button id="meOut" class="danger"><span>${t("meLogout")}</span></button>`])}`;
    const on = (id, fn) => { const b = v.querySelector("#" + id); if (b) b.onclick = fn; };
    on("mePhoto", photoSheet);
    on("meCopy", async () => { try { await navigator.clipboard.writeText(u.friend_code); toast(t("copied")); } catch (e) { toast(u.friend_code); } });
    on("meBadges", () => window.kameiProfile.mine());
    on("mePalm", () => window.kameiEvents.palmares());
    on("meTrades", () => window.kameiTrades.open());
    on("meLang", () => document.getElementById("langBtn").click());
    on("meApp", () => document.getElementById("langBtn").click());
    on("meTour", () => window.kameiTour());
    on("meBios", () => biosList());
    on("meBackup", () => window.kameiBackup.open());
    on("meAdmin", () => window.kameiAdminSheet());
    on("meSecure", () => window.kameiSecure());
    on("meApk", apkSheet);
    if (window.kameiSecureInfo && v.querySelector("#meSecure")) window.kameiSecureInfo().then((i) => {
      const b = v.querySelector("#meSecure"); if (!b) return;
      const val = b.querySelector(".v");
      if (i.hasPass) val.insertAdjacentHTML("afterbegin", "✅");
      else { val.insertAdjacentHTML("afterbegin", "⚠️"); b.insertAdjacentHTML("afterend", `<p class="hint" style="margin:0;padding:8px 16px;color:#f59e0b">${t("secureWarn")}</p>`); }
    }, () => {});
    on("meOut", () => window.kameiLogout && window.kameiLogout());
    paintPet();
  }

  /* ---------- install the Android app (website only) ---------- */
  const APK_DEFAULT = "https://github.com/sansnoms2006/kamei-console/releases/latest/download/Kamei-Game-Console.apk";
  async function apkSheet() {
    const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const ol = (list) => `<ol style="margin:6px 0 12px;padding-left:20px;line-height:1.55;font-size:14px">${list.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`;
    if (ios) {
      openSheet(`<h3>${t("meApk")}</h3><p class="hint" style="color:#f59e0b">${t("iosHint")}</p><h4 style="margin:10px 0 0">${t("meIos")}</h4>${ol(t("iosSteps"))}<div class="btns"><button id="apBack">←</button></div>`);
      document.getElementById("apBack").onclick = closeSheet;
      return;
    }
    let url = APK_DEFAULT;
    try { const j = window.KameiGH && (await window.KameiGH.readJSON("updates/latest.json")); if (j && j.apk_url && /\.apk(\?|$)|releases\//i.test(j.apk_url)) url = j.apk_url; } catch (e) {}
    const anon = window.kameiSecureInfo ? (await window.kameiSecureInfo().catch(() => ({}))) : {};
    openSheet(`<h3>${t("apkTitle")}</h3><p class="hint" style="font-weight:700;color:var(--text)">${t("apkOnly")}</p><p class="hint">${t("apkWhy")}</p>
      ${anon && anon.anon ? `<p class="hint" style="color:#f59e0b">${t("apkWarn")}</p>${window.kameiSecure ? `<button class="row" id="apSec">${t("secure")}</button>` : ""}` : ""}
      <a class="row ok-row" id="apDl" href="${esc(url)}" rel="noopener" style="display:block;text-align:center;text-decoration:none">${t("apkDl")}</a>
      <p class="hint" style="text-align:center">${t("apkSize")}</p>${ol(t("apkSteps"))}<div class="btns"><button id="apBack">←</button></div>`);
    document.getElementById("apBack").onclick = closeSheet;
    if (document.getElementById("apSec")) document.getElementById("apSec").onclick = () => window.kameiSecure();
  }

  /* ---------- profile photo: crop to a 256 px square, upload to avatars/<uid>/ ---------- */
  function photoSheet() {
    const u = me(); if (!u) return;
    openSheet(`<h3>${t("mePhotoQ")}</h3><p class="hint">${t("mePhotoHint")}</p>
      <div class="phprev">${window.kameiAvatar(u, 120)}</div>
      <button class="row ok-row" id="phPick">${t("mePhotoPick")}</button>
      ${u.avatar_url ? `<button class="row danger" id="phDel">${t("mePhotoDel")}</button>` : ""}
      <p class="hint" id="phSt"></p><input type="file" id="phFile" accept="image/*" hidden>
      <div class="btns"><button id="phBack">←</button></div>`);
    const $s = (id) => document.getElementById(id);
    $s("phBack").onclick = closeSheet;
    $s("phPick").onclick = () => $s("phFile").click();
    $s("phFile").onchange = async (e) => {
      const f = e.target.files && e.target.files[0]; e.target.value = "";
      if (!f) return;
      $s("phSt").textContent = t("mePhotoUp");
      try { await upload(f); toast(t("mePhotoOk")); closeSheet(); }
      catch (err) { $s("phSt").textContent = t("mePhotoErr") + " (" + (err.message || err) + ")"; }
    };
    if ($s("phDel")) $s("phDel").onclick = async () => {
      const old = u.avatar_url;
      const r = await sb.from("profiles").update({ avatar_url: null }).eq("id", u.id);
      if (r.error) return toast(r.error.message, 3000);
      try { await sb.storage.from("avatars").remove([old]); } catch (err) {}
      window.kameiSetMe({ avatar_url: null }); closeSheet(); refreshAll();
    };
  }
  async function square(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error("image")); i.src = url; });
      const s = Math.min(img.naturalWidth, img.naturalHeight), c = document.createElement("canvas");
      c.width = c.height = 256;
      c.getContext("2d").drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, 256, 256);
      return await new Promise((res) => c.toBlob(res, "image/jpeg", 0.85));
    } finally { URL.revokeObjectURL(url); }
  }
  async function upload(file) {
    const u = me(), old = u.avatar_url;
    const blob = await square(file);
    if (!blob) throw new Error("image");
    const path = `${u.id}/avatar-${Date.now()}.jpg`;
    const up = await sb.storage.from("avatars").upload(path, blob, { contentType: "image/jpeg", upsert: true });
    if (up.error) throw up.error;
    const r = await sb.from("profiles").update({ avatar_url: path }).eq("id", u.id);
    if (r.error) throw r.error;
    if (old && old !== path) { try { await sb.storage.from("avatars").remove([old]); } catch (e) {} }
    window.kameiSetMe({ avatar_url: path });
    refreshAll();
  }
  function refreshAll() {
    try { if (window.kameiNav) window.kameiNav.rerender(); } catch (e) {}
  }

  window.kameiMeView = { render, paintPet, photo: photoSheet };
})();

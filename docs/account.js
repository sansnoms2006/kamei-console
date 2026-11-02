/* Kamei Game Console — accounts & friends (Supabase) */
(function () {
  const SUPABASE_URL = "https://nbhfagjmtmzpvxajgxga.supabase.co";
  const SUPABASE_KEY = "sb_publishable_9vA0LkKaCl_ofBtmOuJBDg_7jOGF-a0";
  const ONLINE_MS = 150000;
  const COLORS = ["#8fc63f", "#f87171", "#60a5fa", "#a855f7", "#f59e0b", "#14b8a6", "#ec4899", "#e5e7eb"];

  Object.assign(I18N.fr, {
    tabNew: "Créer mon joueur", tabLogin: "J'ai déjà un compte", pseudoFree: "✅ Ce pseudo est libre", pseudoUsed: "❌ Ce pseudo est déjà pris", pseudoShort: "2 caractères minimum",
    newHint: "Juste un pseudo et une couleur : pas besoin d'e-mail.", idLogin: "Ton pseudo (ou ton e-mail)", loginPass: "Mot de passe",
    noPass: "Ce pseudo n'existe pas, ou il n'a pas encore de mot de passe (Moi → 🔐 Mot de passe).", anonOff: "La création par pseudo n'est pas encore activée sur le serveur. Réessaie plus tard.",
    secure: "🔐 Mot de passe (pour changer de téléphone)", secureOn: "Mot de passe activé ✅", secureHint: "Ton compte est rangé sur ce téléphone. Choisis un mot de passe : tu pourras te connecter avec ton pseudo + ce mot de passe sur un autre téléphone ou sur le site.",
    secureHint2: "Tu as déjà un mot de passe. Tu peux le changer ici.", secureP1: "Nouveau mot de passe (6 caractères min.)", secureP2: "Répète le mot de passe", secureDiff: "Les 2 mots de passe sont différents", secureOk: "Mot de passe enregistré ✅ Connecte-toi avec ton pseudo sur ton autre téléphone.",
    secureWarn: "⚠️ Sans mot de passe, si tu effaces l'appli tu perds ton compte.",
    gateHello: "Bienvenue sur la console Kamei", gateSub: "Connecte-toi ou crée ton compte pour jouer avec tes amis.", gateOffline: "Pas de connexion internet : il en faut une pour la première connexion.",
    finishProfile: "Choisis ton pseudo", finishHint: "Il ne manque plus que ton pseudo et ta couleur.", go: "C'est parti !", retry: "Réessayer",
    admin: "🛡️ Admin", adminTitle: "Gestion des comptes", accounts: "comptes", onlineNow: "en ligne", playTime: "de jeu",
    clearPhoto: "🖼️ Retirer sa photo de profil", searchUser: "Rechercher un joueur…", banned: "Banni", isAdmin: "Admin", created: (a) => `Inscrit ${a}`,
    renameUser: "Renommer", ban: "Bannir", unban: "Débannir", makeAdmin: "Rendre admin", removeAdmin: "Retirer admin",
    newCode: "Nouveau code ami", deleteUser: "Supprimer le compte", deleteUserQ: (n) => `Supprimer définitivement le compte de ${n} ?`,
    deleteUserHint: "Son profil, ses amis et son historique seront effacés. Ça ne peut pas être annulé.", done: "C'est fait",
    youBanned: "Ce compte a été banni", notYourself: "Tu ne peux pas faire ça sur ton propre compte", friendsN: (n) => `${n} ami${n > 1 ? "s" : ""}`, gamesN: (n) => `${n} partie${n > 1 ? "s" : ""}`,
    account: "Compte", friends: "Amis", signup: "Créer un compte", login: "Se connecter", logout: "Se déconnecter",
    email: "E-mail", password: "Mot de passe (6 caractères min.)", pseudo: "Pseudo", haveAccount: "J'ai déjà un compte", noAccount: "Je n'ai pas de compte",
    accHint: "Un compte permet à tes amis de voir à quoi tu joues. Tes ROMs ne sont jamais envoyées.",
    pseudoTaken: "Ce pseudo est déjà pris", badLoginP: "Pseudo ou mot de passe incorrect", badLogin: "E-mail ou mot de passe incorrect", weakPass: "Mot de passe trop court (6 caractères min.)",
    emailTaken: "Cet e-mail a déjà un compte", netErr: "Pas de connexion au serveur", welcomeName: (n) => `Bienvenue ${n} !`,
    myCode: "Ton code ami", copy: "Copier", copied: "Copié !", addFriend: "Ajouter un ami", friendCode: "Code de ton ami (ex. KAMEI-4821)",
    friendAdded: (n) => `${n} est maintenant ton ami`, codeNotFound: "Ce code n'existe pas", ownCode: "C'est ton propre code 😄",
    noFriends: "Pas encore d'amis. Envoie ton code à tes potes !", online: "En ligne", playing: (g, s) => `Joue à ${g} · ${s}`,
    seen: (a) => `Vu ${a}`, recent: "Dernières parties", minutes: (n) => n < 60 ? `${n} min` : `${Math.floor(n / 60)} h ${n % 60}`,
    removeFriend: "Retirer de mes amis", color: "Couleur", hi: (n) => `SALUT ${n.toUpperCase()} !`, never: "jamais", nothingYet: "Aucune partie pour l'instant",
    offline: "Les comptes ne marchent qu'avec internet", accountsOff: "Les comptes ne sont disponibles que dans l'app Android",
  });
  Object.assign(I18N.nl, {
    tabNew: "Mijn speler maken", tabLogin: "Ik heb al een account", pseudoFree: "✅ Deze naam is vrij", pseudoUsed: "❌ Deze naam is al bezet", pseudoShort: "Minstens 2 tekens",
    newHint: "Alleen een naam en een kleur: geen e-mail nodig.", idLogin: "Je naam (of je e-mail)", loginPass: "Wachtwoord",
    noPass: "Deze naam bestaat niet, of heeft nog geen wachtwoord (Ik → 🔐 Wachtwoord).", anonOff: "Aanmaken met een naam is nog niet actief op de server. Probeer later opnieuw.",
    secure: "🔐 Wachtwoord (om van telefoon te wisselen)", secureOn: "Wachtwoord actief ✅", secureHint: "Je account staat op deze telefoon. Kies een wachtwoord: dan log je in met je naam + dit wachtwoord op een andere telefoon of op de site.",
    secureHint2: "Je hebt al een wachtwoord. Je kunt het hier wijzigen.", secureP1: "Nieuw wachtwoord (min. 6 tekens)", secureP2: "Herhaal het wachtwoord", secureDiff: "De 2 wachtwoorden verschillen", secureOk: "Wachtwoord opgeslagen ✅ Log in met je naam op je andere telefoon.",
    secureWarn: "⚠️ Zonder wachtwoord verlies je je account als je de app wist.",
    gateHello: "Welkom op de Kamei-console", gateSub: "Log in of maak een account om met je vrienden te spelen.", gateOffline: "Geen internetverbinding: die is nodig om de eerste keer in te loggen.",
    finishProfile: "Kies je gebruikersnaam", finishHint: "Alleen je naam en kleur ontbreken nog.", go: "Let's go!", retry: "Opnieuw proberen",
    admin: "🛡️ Admin", adminTitle: "Accounts beheren", accounts: "accounts", onlineNow: "online", playTime: "speeltijd",
    clearPhoto: "🖼️ Profielfoto verwijderen", searchUser: "Zoek een speler…", banned: "Verbannen", isAdmin: "Admin", created: (a) => `Ingeschreven ${a}`,
    renameUser: "Naam wijzigen", ban: "Verbannen", unban: "Verbanning opheffen", makeAdmin: "Admin maken", removeAdmin: "Admin afnemen",
    newCode: "Nieuwe vriendencode", deleteUser: "Account verwijderen", deleteUserQ: (n) => `Account van ${n} definitief verwijderen?`,
    deleteUserHint: "Profiel, vrienden en geschiedenis worden gewist. Dit kan niet ongedaan worden.", done: "Gedaan",
    youBanned: "Dit account is verbannen", notYourself: "Dat kan niet op je eigen account", friendsN: (n) => `${n} vriend${n > 1 ? "en" : ""}`, gamesN: (n) => `${n} spel${n > 1 ? "len" : ""}`,
    account: "Account", friends: "Vrienden", signup: "Account maken", login: "Inloggen", logout: "Uitloggen",
    email: "E-mail", password: "Wachtwoord (min. 6 tekens)", pseudo: "Gebruikersnaam", haveAccount: "Ik heb al een account", noAccount: "Ik heb nog geen account",
    accHint: "Met een account zien je vrienden wat je speelt. Je ROMs worden nooit verstuurd.",
    pseudoTaken: "Deze naam is al bezet", badLoginP: "Naam of wachtwoord fout", badLogin: "E-mail of wachtwoord fout", weakPass: "Wachtwoord te kort (min. 6 tekens)",
    emailTaken: "Dit e-mailadres heeft al een account", netErr: "Geen verbinding met de server", welcomeName: (n) => `Welkom ${n}!`,
    myCode: "Jouw vriendencode", copy: "Kopiëren", copied: "Gekopieerd!", addFriend: "Vriend toevoegen", friendCode: "Code van je vriend (bv. KAMEI-4821)",
    friendAdded: (n) => `${n} is nu je vriend`, codeNotFound: "Deze code bestaat niet", ownCode: "Dat is je eigen code 😄",
    noFriends: "Nog geen vrienden. Stuur je code naar je maten!", online: "Online", playing: (g, s) => `Speelt ${g} · ${s}`,
    seen: (a) => `Gezien ${a}`, recent: "Laatste spellen", minutes: (n) => n < 60 ? `${n} min` : `${Math.floor(n / 60)} u ${n % 60}`,
    removeFriend: "Verwijderen uit vrienden", color: "Kleur", hi: (n) => `HALLO ${n.toUpperCase()}!`, never: "nooit", nothingYet: "Nog geen spellen",
    offline: "Accounts werken alleen met internet", accountsOff: "Accounts zijn alleen beschikbaar in de Android-app",
  });
  Object.assign(I18N.en, {
    tabNew: "Create my player", tabLogin: "I already have an account", pseudoFree: "✅ This username is free", pseudoUsed: "❌ This username is taken", pseudoShort: "2 characters minimum",
    newHint: "Just a username and a color: no email needed.", idLogin: "Your username (or your email)", loginPass: "Password",
    noPass: "This username doesn't exist, or has no password yet (Me → 🔐 Password).", anonOff: "Creating a player with a username isn't enabled on the server yet. Try again later.",
    secure: "🔐 Password (to switch phones)", secureOn: "Password set ✅", secureHint: "Your account lives on this phone. Pick a password: you'll log in with your username + this password on another phone or on the website.",
    secureHint2: "You already have a password. You can change it here.", secureP1: "New password (6+ characters)", secureP2: "Repeat the password", secureDiff: "The 2 passwords are different", secureOk: "Password saved ✅ Log in with your username on your other phone.",
    secureWarn: "⚠️ Without a password, deleting the app means losing your account.",
    gateHello: "Welcome to the Kamei console", gateSub: "Log in or create your account to play with your friends.", gateOffline: "No internet connection: you need it to log in the first time.",
    finishProfile: "Pick your username", finishHint: "Only your username and color are missing.", go: "Let's go!", retry: "Retry",
    admin: "🛡️ Admin", adminTitle: "Manage accounts", accounts: "accounts", onlineNow: "online", playTime: "played",
    clearPhoto: "🖼️ Remove profile photo", searchUser: "Search a player…", banned: "Banned", isAdmin: "Admin", created: (a) => `Joined ${a}`,
    renameUser: "Rename", ban: "Ban", unban: "Unban", makeAdmin: "Make admin", removeAdmin: "Remove admin",
    newCode: "New friend code", deleteUser: "Delete account", deleteUserQ: (n) => `Permanently delete ${n}'s account?`,
    deleteUserHint: "Profile, friends and history will be erased. This can't be undone.", done: "Done",
    youBanned: "This account has been banned", notYourself: "You can't do that to your own account", friendsN: (n) => `${n} friend${n > 1 ? "s" : ""}`, gamesN: (n) => `${n} game${n > 1 ? "s" : ""}`,
    account: "Account", friends: "Friends", signup: "Create account", login: "Log in", logout: "Log out",
    email: "Email", password: "Password (6+ characters)", pseudo: "Username", haveAccount: "I already have an account", noAccount: "I don't have an account",
    accHint: "With an account your friends can see what you play. Your ROMs are never uploaded.",
    pseudoTaken: "This username is taken", badLoginP: "Wrong username or password", badLogin: "Wrong email or password", weakPass: "Password too short (6+ characters)",
    emailTaken: "This email already has an account", netErr: "Can't reach the server", welcomeName: (n) => `Welcome ${n}!`,
    myCode: "Your friend code", copy: "Copy", copied: "Copied!", addFriend: "Add a friend", friendCode: "Your friend's code (e.g. KAMEI-4821)",
    friendAdded: (n) => `${n} is now your friend`, codeNotFound: "This code doesn't exist", ownCode: "That's your own code 😄",
    noFriends: "No friends yet. Send your code to your mates!", online: "Online", playing: (g, s) => `Playing ${g} · ${s}`,
    seen: (a) => `Seen ${a}`, recent: "Recent games", minutes: (n) => n < 60 ? `${n} min` : `${Math.floor(n / 60)} h ${n % 60}`,
    removeFriend: "Remove friend", color: "Color", hi: (n) => `HI ${n.toUpperCase()}!`, never: "never", nothingYet: "No games yet",
    offline: "Accounts only work with internet", accountsOff: "Accounts are only available in the Android app",
  });

  let sb = null;
  try { if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } }); } catch (e) {}

  window.kameiSB = sb;
  let me = null;        // profile row
  let session = null;   // current play session { id, start }
  let beat = null;

  const btn = document.getElementById("accBtn");
  function avatarHTML(p, size) {
    const c = (p && p.color) || "#2a2a3d";
    const letter = p ? esc(p.pseudo.slice(0, 1).toUpperCase()) : "👤";
    const photo = p && p.avatar_url && /^[0-9a-f-]{36}\/[\w.-]+$/i.test(p.avatar_url) && sb ? sb.storage.from("avatars").getPublicUrl(p.avatar_url).data.publicUrl : "";
    return `<span class="av" style="--ac:${c};width:${size}px;height:${size}px;font-size:${Math.round(size * .45)}px">${letter}${photo ? `<img src="${esc(photo)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</span>`;
  }
  function paintBtn() { btn.innerHTML = avatarHTML(me, 34) + (me ? "" : ""); btn.title = me ? me.pseudo : t("account"); }

  function errMsg(e) {
    const m = String((e && (e.message || e.error_description || e.code)) || e || "");
    if (/code_not_found/.test(m)) return t("codeNotFound");
    if (/not_yourself/.test(m)) return t("notYourself");
    if (/own_code/.test(m)) return t("ownCode");
    if (/Invalid login/i.test(m)) return t("badLogin");
    if (/already registered|already been registered|user_already_exists/i.test(m)) return t("emailTaken");
    if (/at least 6|weak_password|Password should/i.test(m)) return t("weakPass");
    if (/fetch|network|Failed to fetch|NetworkError/i.test(m)) return t("netErr");
    return m || t("netErr");
  }
  const newCode = () => "KAMEI-" + String(Math.floor(1000 + Math.random() * 9000));

  async function loadMe() {
    if (!sb) return;
    let session = null;
    try { session = (await sb.auth.getSession()).data.session; } catch (e) {}
    if (!session) { me = null; localStorage.removeItem("kamei-me"); paintBtn(); refreshHero(); showGate(); return; }
    const uid = session.user.id;
    try {
      const r = await sb.from("profiles").select("*").eq("id", uid).maybeSingle();
      if (r.error) throw r.error;
      me = r.data || null;
      if (me && me.banned) { await sb.auth.signOut(); me = null; localStorage.removeItem("kamei-me"); paintBtn(); refreshHero(); showGate("login", t("youBanned")); return; }
      if (!me) {
        const pending = localStorage.getItem("kamei-pending-pseudo");
        if (pending) { try { await createProfile(uid, pending, localStorage.getItem("kamei-pending-color") || COLORS[0]); } catch (e) {} }
      }
      if (!me) { paintBtn(); showGate("profile"); return; }
      localStorage.setItem("kamei-me", JSON.stringify(me));
    } catch (e) {
      // offline: keep playing with the account remembered on this phone
      try { me = JSON.parse(localStorage.getItem("kamei-me") || "null"); } catch (err) { me = null; }
    }
    hideGate();
    paintBtn(); refreshHero(); heartbeat();
  }
  async function createProfile(uid, pseudo, color) {
    for (let i = 0; i < 5; i++) {
      const r = await sb.from("profiles").insert({ id: uid, pseudo, color, friend_code: newCode() }).select().single();
      if (!r.error) { me = r.data; localStorage.removeItem("kamei-pending-pseudo"); return; }
      if (/pseudo/.test(r.error.message)) throw new Error(t("pseudoTaken"));
      if (!/friend_code|duplicate/.test(r.error.message)) throw r.error;
    }
  }
  function refreshHero() {
    if (typeof heroShown !== "undefined") { heroShown = null; render(); }
  }
  window.kameiHello = () => me ? t("hi", me.pseudo) : null;

  /* ---------- Sign up / log in ---------- */
  const PSEUDO_MAIL = "@joueur.kamei.app";
  const mailLabel = (m) => (!m ? "👤 pseudo seul" : m.endsWith(PSEUDO_MAIL) ? "👤🔐 pseudo + mot de passe" : m);
  function authForm(box, mode, inGate) {
    let color = COLORS[0];
    const head = inGate ? "" : `<h3>${mode === "signup" ? t("tabNew") : mode === "profile" ? t("finishProfile") : t("tabLogin")}</h3><p class="hint">${mode === "profile" ? t("finishHint") : mode === "signup" ? t("newHint") : t("accHint")}</p>`;
    box.innerHTML = head + `
      ${mode !== "login" ? `<input id="aPseudo" placeholder="${t("pseudo")}" maxlength="20" autocomplete="nickname"><p class="hint" id="aAvail" style="margin:-4px 0 8px;min-height:18px"></p>
        <div class="colors" id="aColors">${COLORS.map((c, i) => `<button type="button" style="--ac:${c}" class="${i ? "" : "on"}" data-c="${c}"></button>`).join("")}</div>` : ""}
      ${mode === "login" ? `<input id="aId" placeholder="${t("idLogin")}" autocomplete="username" autocapitalize="none">
      <input id="aPass" type="password" placeholder="${t("loginPass")}" autocomplete="current-password">` : ""}
      <p class="hint err" id="aErr"></p>
      <div class="btns">${mode === "profile" || inGate ? "" : `<button id="aSwitch">${mode === "signup" ? t("tabLogin") : t("tabNew")}</button>`}
        <button class="ok" id="aGo">${mode === "login" ? t("login") : t("go")}</button></div>`;
    const colors = box.querySelector("#aColors");
    if (colors) colors.querySelectorAll("button").forEach((b) => b.onclick = () => { colors.querySelectorAll("button").forEach((x) => x.classList.remove("on")); b.classList.add("on"); color = b.dataset.c; });
    const sw = box.querySelector("#aSwitch"); if (sw) sw.onclick = () => authSheet(mode === "signup" ? "login" : "signup");
    // the app checks while you type that nobody already has this username
    const pin = box.querySelector("#aPseudo"), av = box.querySelector("#aAvail");
    let free = null, checkT = null, checkN = 0;
    async function check() {
      const p = pin.value.trim(), n = ++checkN;
      if (p.length < 2) { free = null; av.textContent = p ? t("pseudoShort") : ""; av.className = "hint"; return null; }
      const r = await sb.rpc("pseudo_available", { p });
      if (n !== checkN) return free;
      if (r.error) { free = null; av.textContent = ""; return null; }
      free = !!r.data;
      av.textContent = free ? t("pseudoFree") : t("pseudoUsed"); av.className = "hint " + (free ? "" : "err");
      av.style.color = free ? "var(--tacc, #8fc63f)" : "";
      return free;
    }
    if (pin) pin.oninput = () => { clearTimeout(checkT); free = null; box.querySelector("#aErr").textContent = ""; checkT = setTimeout(check, 350); };
    box.querySelector("#aGo").onclick = async () => {
      const go = box.querySelector("#aGo"), err = box.querySelector("#aErr");
      err.textContent = ""; go.disabled = true;
      try {
        if (mode === "profile" || mode === "signup") {
          const pseudo = pin.value.trim();
          if (pseudo.length < 2) throw new Error(t("pseudoShort"));
          if ((await check()) === false) throw new Error(t("pseudoTaken"));
          if (mode === "signup") {
            localStorage.setItem("kamei-pending-pseudo", pseudo); localStorage.setItem("kamei-pending-color", color);
            const r = await sb.auth.signInAnonymously();
            if (r.error) throw (/anonymous/i.test(r.error.message || "") ? new Error(t("anonOff")) : r.error);
            await createProfile(r.data.user.id, pseudo, color);
          } else {
            const { data } = await sb.auth.getSession();
            await createProfile(data.session.user.id, pseudo, color);
          }
        } else {
          let id = box.querySelector("#aId").value.trim();
          const pass = box.querySelector("#aPass").value;
          if (!id.includes("@")) {
            const r = await sb.rpc("login_email", { p: id });
            if (r.error) throw r.error;
            if (!r.data) throw new Error(t("noPass"));
            id = r.data;
          }
          const r = await sb.auth.signInWithPassword({ email: id, password: pass });
          if (r.error) throw (/Invalid login/i.test(r.error.message || "") && !box.querySelector("#aId").value.includes("@") ? new Error(t("badLoginP")) : r.error);
        }
        await loadMe(); setTimeout(pushSetup, 1500);
        if (!inGate) closeSheet();
        if (me) toast(t("welcomeName", me.pseudo));
      } catch (e) { err.textContent = errMsg(e); go.disabled = false; }
    };
  }
  // a player who only has a username sets a password → can log in on another phone (username + password)
  async function secureSheet() {
    const s0 = (await sb.auth.getSession()).data.session;
    const mail = (s0 && s0.user && s0.user.email) || "";
    const real = mail && !mail.endsWith(PSEUDO_MAIL);
    const has = mail.endsWith(PSEUDO_MAIL);
    openSheet(`<h3>${t("secure")}</h3><p class="hint">${has ? t("secureHint2") : t("secureHint")}</p>
      <input id="sP1" type="password" placeholder="${t("secureP1")}" autocomplete="new-password"><input id="sP2" type="password" placeholder="${t("secureP2")}" autocomplete="new-password">
      <p class="hint err" id="sErr"></p><div class="btns"><button id="sBack">←</button><button class="ok" id="sGo">${t("save") || "OK"}</button></div>`);
    document.getElementById("sBack").onclick = closeSheet;
    document.getElementById("sGo").onclick = async () => {
      const a = document.getElementById("sP1").value, b = document.getElementById("sP2").value, er = document.getElementById("sErr");
      er.textContent = "";
      if (a.length < 6) { er.textContent = t("weakPass"); return; }
      if (a !== b) { er.textContent = t("secureDiff"); return; }
      try {
        if (real) { const r = await sb.auth.updateUser({ password: a }); if (r.error) throw r.error; }
        else {
          const r = await sb.functions.invoke("kamei-discord", { body: { action: "secure", password: a } });
          if (r.error || !r.data || !r.data.ok) throw new Error((r.data && r.data.error) || (r.error && r.error.message) || "error");
          try { await sb.auth.refreshSession(); } catch (e) {}
        }
        closeSheet(); toast(t("secureOk"), 5000);
        if (window.kameiNav) window.kameiNav.rerender();
      } catch (e) { er.textContent = errMsg(e); }
    };
  }
  window.kameiSecureInfo = async () => { const se = sb && (await sb.auth.getSession()).data.session; const m = (se && se.user && se.user.email) || ""; return { anon: !m, hasPass: !!m }; };
  window.kameiSecure = secureSheet;
  function authSheet(mode) {
    if (!sb) { toast(t("accountsOff"), 3500); return; }
    openSheet(""); authForm(document.getElementById("sheet"), mode, false);
  }

  /* ---------- Welcome screen: an account is required ---------- */
  let gateMode = "signup";
  function showGate(mode, msg) {
    if (mode) gateMode = mode;
    let g = document.getElementById("gate");
    if (!g) { g = document.createElement("div"); g.id = "gate"; document.body.appendChild(g); }
    document.body.classList.add("gated");
    const th = window.kameiTheme;
    const tabs = gateMode === "profile" ? "" : `<div class="gtabs"><button data-gm="signup" class="${gateMode === "signup" ? "on" : ""}">${t("tabNew")}</button><button data-gm="login" class="${gateMode === "login" ? "on" : ""}">${t("tabLogin")}</button></div>`;
    g.innerHTML = `<div class="gwrap">
      <div class="glang">${["fr", "nl", "en"].map((l) => `<button data-gl="${l}" class="${l === lang ? "on" : ""}">${l.toUpperCase()}</button>`).join("")}</div>
      <svg class="gart" viewBox="0 -70 240 526" aria-hidden="true"><use href="#kFull" width="240" height="456"/>${th ? `<use href="#${th.hat}" x="40" y="-78" width="170" height="136"/>` : ""}</svg>
      <div class="logo">KAMEI<span>.</span>PRODUCTIONS<small>GAME CONSOLE</small></div>
      <h2>${gateMode === "profile" ? t("finishProfile") : t("gateHello")}</h2>
      <p class="hint">${msg ? esc(msg) : gateMode === "profile" ? t("finishHint") : (navigator.onLine ? (gateMode === "signup" ? t("newHint") : t("gateSub")) : t("gateOffline"))}</p>
      ${tabs}<div id="gateForm"></div></div>`;
    g.querySelectorAll("[data-gm]").forEach((b) => b.onclick = () => showGate(b.dataset.gm));
    g.querySelectorAll("[data-gl]").forEach((b) => b.onclick = () => { lang = b.dataset.gl; try { localStorage.setItem("kamei-lang", lang); } catch (e) {} applyLang(); showGate(); });
    authForm(document.getElementById("gateForm"), gateMode, true);
  }
  function hideGate() { const g = document.getElementById("gate"); if (g) g.remove(); document.body.classList.remove("gated"); }
  window.kameiShowGate = showGate;

  const feat = (k) => (window.kameiFeature ? window.kameiFeature(k) : true);
  /* ---------- Friends ---------- */
  const isOnline = (p) => p.last_seen && Date.now() - new Date(p.last_seen).getTime() < ONLINE_MS;
  const sysLabel = (s) => (SYSTEMS[s] ? SYSTEMS[s].short : s || "");
  async function logout() { await stopPlaying(); await pushOff(); await sb.auth.signOut(); if (window.kameiNav) window.kameiNav.go("consoles"); me = null; localStorage.removeItem("kamei-me"); paintBtn(); closeSheet(); refreshHero(); showGate("login"); }
  async function friendsSheet(into) {
    if (into && !(into instanceof Element)) into = undefined;
    if (into === undefined && window.kameiNavFriends && window.kameiNavFriends()) return;
    const show = (h) => { if (into) into.innerHTML = h; else openSheet(h); };
    if (!sb) { toast(t("accountsOff"), 3500); return; }
    if (!me) return authSheet("signup");
    show(`<h3>${t("friends")}</h3><p class="hint">…</p>`);
    let friends = [];
    try {
      const f = await sb.from("friendships").select("friend_id").eq("user_id", me.id);
      if (f.error) throw f.error;
      const ids = f.data.map((x) => x.friend_id);
      if (ids.length) {
        const p = await sb.from("profiles").select("*").in("id", ids);
        if (p.error) throw p.error;
        friends = p.data.sort((a, b) => (isOnline(b) - isOnline(a)) || new Date(b.last_seen || 0) - new Date(a.last_seen || 0));
      }
    } catch (e) { show(`<h3>${t("friends")}</h3><p class="hint err">${esc(errMsg(e))}</p>`); return; }
    if (!into && !document.getElementById("sheetBg").classList.contains("on")) return;
    const row = (p) => {
      const on = isOnline(p);
      const status = on && p.now_game ? t("playing", esc(p.now_game), sysLabel(p.now_system)) : on ? t("online") : t("seen", p.last_seen ? ago(new Date(p.last_seen).getTime()) : t("never"));
      return `<button class="friend" data-f="${p.id}">${avatarHTML(p, 42)}<span class="dot ${on ? "on" : ""}"></span>
        <span class="fi"><b>${esc(p.pseudo)}</b><span class="${on && p.now_game ? "playing" : ""}">${status}</span></span>
        ${on && p.now_cover ? `<img src="${esc(p.now_cover)}" alt="" onerror="this.remove()">` : ""}<span class="unread" data-un="${p.id}"></span></button>`;
    };
    show(`<div class="acc-head">${avatarHTML(me, 48)}<div><h3>${esc(me.pseudo)}</h3><p class="hint" style="margin:0">${t("myCode")} : <b class="code">${esc(me.friend_code)}</b>
        <button class="mini" id="fCopy">${t("copy")}</button></p></div></div>
      <div class="addf"><input id="fCode" placeholder="${t("friendCode")}" autocapitalize="characters"><button class="ok" id="fAdd">+</button></div>
      <h3 style="margin-top:6px">${t("friends")}</h3>
      ${friends.length ? friends.map(row).join("") : `<p class="hint">${t("noFriends")}</p>`}
      ${!into && window.kameiProfile && feat("profile") ? `<button class="row" id="fProfile">${t("pfMine")}</button>` : ""}
      ${!into && feat("trades") ? `<button class="row" id="fTrades">${t("trades")}</button>` : ""}
      ${!into && me.is_admin ? `<button class="row" id="fAdmin">${t("admin")}</button>` : ""}
      ${into ? "" : `<button class="row danger" id="fOut">${t("logout")}</button>`}`);
    if (document.getElementById("fAdmin")) document.getElementById("fAdmin").onclick = () => adminSheet();
    if (document.getElementById("fTrades")) document.getElementById("fTrades").onclick = () => window.kameiTrades && window.kameiTrades.open();
    if (document.getElementById("fProfile")) document.getElementById("fProfile").onclick = () => window.kameiProfile.mine();
    document.getElementById("fCopy").onclick = async () => { try { await navigator.clipboard.writeText(me.friend_code); toast(t("copied")); } catch (e) { toast(me.friend_code); } };
    document.getElementById("fAdd").onclick = async () => {
      const code = document.getElementById("fCode").value.trim();
      if (!code) return;
      const r = await sb.rpc("add_friend", { code });
      if (r.error) return toast(errMsg(r.error), 3000);
      toast(t("friendAdded", r.data)); friendsSheet(into);
    };
    if (document.getElementById("fOut")) document.getElementById("fOut").onclick = logout;
    (into || document.getElementById("sheet")).querySelectorAll("button.friend[data-f]").forEach((b) => b.onclick = () => {
      const fr = friends.find((p) => p.id === b.dataset.f);
      if (window.kameiChat && window.kameiChat.unreadFrom(fr.id)) window.kameiChat.open(fr); else friendDetail(fr);
    });
    if (window.kameiChat) window.kameiChat.paintFriends();
  }
  async function friendDetail(p) {
    const r = await sb.from("sessions").select("*").eq("user_id", p.id).order("started_at", { ascending: false }).limit(15);
    const list = r.data || [];
    openSheet(`<div class="acc-head">${avatarHTML(p, 48)}<div><h3>${esc(p.pseudo)}</h3><p class="hint" style="margin:0">${isOnline(p) ? t("online") : t("seen", p.last_seen ? ago(new Date(p.last_seen).getTime()) : t("never"))}</p></div></div>
      <h3>${t("recent")}</h3>
      ${list.length ? list.map((s) => `<div class="sess">${s.cover ? `<img src="${esc(s.cover)}" alt="" onerror="this.remove()">` : `<span class="ph">${esc(sysLabel(s.system))}</span>`}
        <span class="fi"><b>${esc(s.game)}</b><span>${esc(sysLabel(s.system))} · ${ago(new Date(s.started_at).getTime())}${s.minutes ? " · " + t("minutes", s.minutes) : ""}</span></span></div>`).join("")
        : `<p class="hint">${t("nothingYet")}</p>`}
      ${window.kameiPlay && feat("watch") && isOnline(p) && p.now_game ? `<button class="row ok-row" id="dWatch" style="margin-top:12px">${t("lvWatch")} · ${esc(p.now_game)}</button>` : ""}
      ${window.kameiChat && feat("chat") ? `<button class="row ok-row" id="dChat" style="margin-top:12px">${t("chatWith", esc(p.pseudo))}</button>` : ""}
      ${window.kameiEvents && feat("events") ? `<button class="row" id="dPalm" style="margin-top:12px">${t("navPalm") || "🏆"}</button>` : ""}
      <div id="dPlay"></div>
      <div id="dPet"></div>
      <div id="dProfile"></div>
      <button class="row" id="dReport" style="color:var(--muted)">${t("reportUser")}</button>
      <div class="btns" style="margin-top:12px"><button id="dBack">←</button><button id="dRm" class="danger">${t("removeFriend")}</button></div>`);
    document.getElementById("dBack").onclick = friendsSheet;
    document.getElementById("dReport").onclick = async () => {
      if (!window.confirm(t("reportUserQ"))) return;
      const r = await sb.rpc("report_create", { target_id: p.id, k: "user", ref_id: null, why: "" });
      toast(r.error ? errMsg(r.error) : t("chatReported"), 3500);
    };
    if (document.getElementById("dChat")) document.getElementById("dChat").onclick = () => window.kameiChat.open(p);
    if (document.getElementById("dPalm")) document.getElementById("dPalm").onclick = () => window.kameiEvents.palmares(p.id, p.pseudo, () => friendDetail(p));
    if (document.getElementById("dWatch")) document.getElementById("dWatch").onclick = () => window.kameiPlay.watch(p);
    if (window.kameiProfile && feat("profile")) window.kameiProfile.fill(p, document.getElementById("dProfile"));
    if (window.kameiPet && feat("pet")) window.kameiPet.friend(p, document.getElementById("dPet"));
    if (window.kameiPlay && window.kameiPlay.friendGames && feat("netplay")) window.kameiPlay.friendGames(p, document.getElementById("dPlay"));
    document.getElementById("dRm").onclick = async () => { await sb.rpc("remove_friend", { other: p.id }); friendsSheet(); };
  }


  /* ---------- Admin ---------- */
  let adminQuery = "";
  async function adminSheet() {
    openSheet(`<h3>${t("adminTitle")}</h3><p class="hint">…</p>`);
    const r = await sb.rpc("admin_users");
    if (r.error) { openSheet(`<h3>${t("adminTitle")}</h3><p class="hint err">${esc(errMsg(r.error))}</p>`); return; }
    const users = r.data || [];
    const online = users.filter(isOnline).length;
    const mins = users.reduce((a, u) => a + Number(u.minutes || 0), 0);
    const draw = () => {
      const q = adminQuery.toLowerCase();
      const list = users.filter((u) => !q || (u.pseudo || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q) || (u.friend_code || "").toLowerCase().includes(q));
      document.getElementById("adList").innerHTML = list.map((u) => {
        const on = isOnline(u);
        const status = u.banned ? `<span class="badge ban">${t("banned")}</span>` : on && u.now_game ? `<span class="playing">${t("playing", esc(u.now_game), sysLabel(u.now_system))}</span>`
          : `<span>${on ? t("online") : t("seen", u.last_seen ? ago(new Date(u.last_seen).getTime()) : t("never"))}</span>`;
        return `<button class="friend" data-u="${u.id}">${avatarHTML(u, 42)}<span class="dot ${on ? "on" : ""}"></span>
          <span class="fi"><b>${esc(u.pseudo)} ${u.is_admin ? `<span class="badge">${t("isAdmin")}</span>` : ""}</b><span>${esc(mailLabel(u.email))}</span>${status}</span></button>`;
      }).join("") || `<p class="hint">${t("noResult")}</p>`;
      document.querySelectorAll("[data-u]").forEach((b) => b.onclick = () => adminUser(users.find((u) => u.id === b.dataset.u)));
    };
    openSheet(`<h3>${t("adminTitle")}</h3>
      <div class="stats"><div><b>${users.length}</b><span>${t("accounts")}</span></div><div><b>${online}</b><span>${t("onlineNow")}</span></div><div><b>${t("minutes", mins)}</b><span>${t("playTime")}</span></div></div>
      ${window.kameiAdmin ? `<div class="adgrid"><button id="adFeat">${t("adFeatures")}</button><button id="adStats">${t("adStats")}</button>
        <button id="adAnn">${t("adAnnounce")}</button><button id="adRep">${t("adReports")}<span class="unread" id="adRepN"></span></button></div>` : ""}
      <button class="row" id="adPub">${t("publish")}</button>
      <input id="adQ" placeholder="${t("searchUser")}" value="${esc(adminQuery)}"><div id="adList"></div>
      <div class="btns"><button id="adBack">←</button></div>`);
    document.getElementById("adQ").oninput = (e) => { adminQuery = e.target.value.trim(); draw(); };
    document.getElementById("adBack").onclick = friendsSheet;
    document.getElementById("adPub").onclick = () => window.kameiPublishSheet && window.kameiPublishSheet();
    if (window.kameiAdmin) window.kameiAdmin.wire();
    draw();
  }
  async function adminUser(u) {
    const r = await sb.rpc("admin_sessions", { uid: u.id });
    const list = r.data || [];
    const self = u.id === me.id;
    openSheet(`<div class="acc-head">${avatarHTML(u, 48)}<div><h3>${esc(u.pseudo)} ${u.is_admin ? `<span class="badge">${t("isAdmin")}</span>` : ""} ${u.banned ? `<span class="badge ban">${t("banned")}</span>` : ""}</h3>
        <p class="hint" style="margin:0">${esc(mailLabel(u.email))}</p></div></div>
      <p class="hint">${t("created", ago(new Date(u.created_at).getTime()))} · ${t("friendsN", Number(u.friends))} · ${t("gamesN", Number(u.games))} · ${t("minutes", Number(u.minutes || 0))}<br>
        ${t("myCode").replace(/^Ton |^Jouw |^Your /, "")} : <b class="code">${esc(u.friend_code)}</b></p>
      <button class="row" id="uRename">${t("renameUser")}</button>
      <button class="row" id="uCode">${t("newCode")}</button>
      ${self ? "" : `<button class="row" id="uAdmin">${u.is_admin ? t("removeAdmin") : t("makeAdmin")}</button>
      <button class="row" id="uPhoto">${t("clearPhoto")}</button>
      <button class="row danger" id="uBan">${u.banned ? t("unban") : t("ban")}</button>
      <button class="row danger" id="uDel">${t("deleteUser")}</button>`}
      <h3>${t("recent")}</h3>
      ${list.length ? list.map((s) => `<div class="sess">${s.cover ? `<img src="${esc(s.cover)}" alt="" onerror="this.remove()">` : `<span class="ph">${esc(sysLabel(s.system))}</span>`}
        <span class="fi"><b>${esc(s.game)}</b><span>${esc(sysLabel(s.system))} · ${ago(new Date(s.started_at).getTime())}${s.minutes ? " · " + t("minutes", s.minutes) : ""}</span></span></div>`).join("") : `<p class="hint">${t("nothingYet")}</p>`}
      <div class="btns" style="margin-top:12px"><button id="uBack">←</button></div>`);
    const act = async (fn, args) => { const res = await sb.rpc(fn, args); if (res.error) { toast(errMsg(res.error), 3000); return false; } toast(t("done")); return true; };
    if (document.getElementById("uPhoto")) document.getElementById("uPhoto").onclick = () => act("admin_clear_avatar", { uid: u.id });
    document.getElementById("uBack").onclick = adminSheet;
    document.getElementById("uRename").onclick = () => {
      openSheet(`<h3>${t("renameUser")}</h3><input id="uNew" value="${esc(u.pseudo)}" maxlength="20">
        <div class="btns"><button id="uNo">${t("cancel")}</button><button class="ok" id="uOk">${t("ok")}</button></div>`);
      document.getElementById("uNo").onclick = () => adminUser(u);
      document.getElementById("uOk").onclick = async () => {
        const v = document.getElementById("uNew").value.trim(); if (v.length < 2) return;
        if (await act("admin_rename", { uid: u.id, new_pseudo: v })) { u.pseudo = v; if (self) { me.pseudo = v; paintBtn(); refreshHero(); } adminUser(u); }
      };
    };
    document.getElementById("uCode").onclick = async () => { const res = await sb.rpc("admin_new_code", { uid: u.id }); if (res.error) return toast(errMsg(res.error)); u.friend_code = res.data; if (self) me.friend_code = res.data; toast(t("done")); adminUser(u); };
    if (!self) {
      document.getElementById("uAdmin").onclick = async () => { if (await act("admin_set_admin", { uid: u.id, value: !u.is_admin })) { u.is_admin = !u.is_admin; adminUser(u); } };
      document.getElementById("uBan").onclick = async () => { if (await act("admin_set_banned", { uid: u.id, value: !u.banned })) { u.banned = !u.banned; adminUser(u); } };
      document.getElementById("uDel").onclick = () => {
        openSheet(`<h3>${esc(t("deleteUserQ", u.pseudo))}</h3><p class="hint">${t("deleteUserHint")}</p>
          <div class="btns"><button id="dNo">${t("cancel")}</button><button class="ok" id="dOk" style="background:#ff6b81">${t("deleteUser")}</button></div>`);
        document.getElementById("dNo").onclick = () => adminUser(u);
        document.getElementById("dOk").onclick = async () => { if (await act("admin_delete_user", { uid: u.id })) adminSheet(); };
      };
    }
  }

  /* ---------- Presence ---------- */
  async function heartbeat() {
    clearTimeout(beat);
    if (!sb || !me) return;
    const patch = { last_seen: new Date().toISOString() };
    try {
      await sb.from("profiles").update(patch).eq("id", me.id);
      if (session && session.id) {
        await sb.from("sessions").update({ minutes: Math.round((Date.now() - session.start) / 60000) }).eq("id", session.id);
      }
    } catch (e) {}
    beat = setTimeout(heartbeat, 60000);
  }
  async function startPlaying(g) {
    if (!sb || !me) return;
    const cover = g.cover || null;
    session = { id: null, start: Date.now() };
    try {
      await sb.from("profiles").update({ now_game: g.title, now_system: g.system, now_cover: cover, last_seen: new Date().toISOString() }).eq("id", me.id);
      const r = await sb.from("sessions").insert({ user_id: me.id, game: g.title, system: g.system, cover }).select("id").single();
      if (!r.error && session) session.id = r.data.id;
    } catch (e) {}
  }
  async function stopPlaying() {
    if (!sb || !me) return;
    const s = session; session = null;
    try {
      await sb.from("profiles").update({ now_game: null, now_system: null, now_cover: null, last_seen: new Date().toISOString() }).eq("id", me.id);
      if (s && s.id) await sb.from("sessions").update({ minutes: Math.max(1, Math.round((Date.now() - s.start) / 60000)) }).eq("id", s.id);
    } catch (e) {}
  }

  /* ---------- Notify when a friend starts a game ---------- */
  let friendState = null;
  async function watchFriends() {
    setTimeout(watchFriends, document.visibilityState === "visible" ? 60000 : 120000);
    if (!sb || !me) return;
    try {
      const f = await sb.from("friendships").select("friend_id").eq("user_id", me.id);
      const ids = (f.data || []).map((x) => x.friend_id);
      if (!ids.length) { friendState = {}; return; }
      const p = await sb.from("profiles").select("id,pseudo,now_game,now_system,last_seen").in("id", ids);
      if (p.error) return;
      const next = {};
      for (const x of p.data) {
        const game = isOnline(x) && x.now_game ? x.now_game + "|" + (x.now_system || "") : "";
        next[x.id] = game;
        if (friendState && game && friendState[x.id] !== game && window.kameiNotify) {
          window.kameiNotify("🎮 " + x.pseudo, t("nFriendPlay", x.pseudo, x.now_game + (x.now_system ? " (" + sysLabel(x.now_system) + ")" : "")), () => (window.kameiPlay ? window.kameiPlay.watch(x) : friendsSheet()));
        }
      }
      friendState = next;
    } catch (e) {}
  }
  setTimeout(watchFriends, 8000);

  /* ---------- Notifications while the app is closed (Android checks every ~15 min, APK v7+) ---------- */
  const NP = window.KameiNative;
  const pushKey = () => { try { return JSON.parse(localStorage.getItem("kamei-push") || "null"); } catch (e) { return null; } };
  async function pushSetup() {
    if (!sb || !me || !NP || !NP.setPush) return;
    try {
      if (!notifOn()) { NP.setPush(""); return; }
      let k = pushKey();
      if (!k || k.uid !== me.id) {
        const r = await sb.rpc("notif_register", { lg: lang });
        if (r.error || !r.data) return;             // SQL v7 not installed yet
        k = { uid: me.id, key: r.data }; localStorage.setItem("kamei-push", JSON.stringify(k));
      }
      NP.setPush(JSON.stringify({ key: k.key, url: SUPABASE_URL, anon: SUPABASE_KEY }));
    } catch (e) {}
  }
  async function pushOff() {
    const k = pushKey();
    try { if (NP && NP.setPush) NP.setPush(""); } catch (e) {}
    try { if (k && sb) await sb.rpc("notif_unregister", { dkey: k.key }); } catch (e) {}
    try { localStorage.removeItem("kamei-push"); } catch (e) {}
  }
  // leaving the app: what was seen in the app won't be notified again
  document.addEventListener("visibilitychange", () => {
    const k = pushKey();
    if (document.visibilityState === "hidden" && k && sb) sb.rpc("notif_touch", { dkey: k.key, lg: lang }).then(() => {}, () => {});
  });
  setTimeout(pushSetup, 7000);
  window.kameiPush = { setup: pushSetup, off: pushOff };

  window.kameiAdminSheet = () => adminSheet();
  window.kameiAdminUser = async (uid) => { const r = await sb.rpc("admin_users"); const u = (r.data || []).find((x) => x.id === uid); if (u) adminUser(u); };
  window.kameiMe = () => me;
  window.kameiAvatar = avatarHTML;
  window.kameiSetMe = (patch) => { if (!me) return; Object.assign(me, patch); try { localStorage.setItem("kamei-me", JSON.stringify(me)); } catch (e) {} paintBtn(); };
  window.kameiLogout = logout;
  window.kameiFriendsSheet = (into) => friendsSheet(into);
  window.kameiOnline = (p) => isOnline(p);
  window.kameiFriendDetail = (p) => friendDetail(p);
  /* red dot on the account button: trades + unread messages */
  const badges = {};
  window.kameiBadge = (key, n) => { badges[key] = n; btn.classList.toggle("dot", Object.values(badges).some((v) => v > 0)); };
  window.kameiAccount = { startPlaying, stopPlaying, open: () => (me ? friendsSheet() : authSheet("signup")) };
  btn.onclick = () => window.kameiAccount.open();
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") heartbeat(); });
  paintBtn();
  if (sb) {
    let hasSession = false;
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/^sb-.*-auth-token$/.test(k)) hasSession = true; } } catch (e) {}
    if (!hasSession) showGate("signup");
  }
  loadMe();
})();

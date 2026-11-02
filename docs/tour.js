/* Kamei Game Console — first-launch guided tour, presented by Kamei */
(function () {
  const L = {
    fr: { tourNext: "Suivant ➜", tourPrev: "‹", tourSkip: "Passer", tourEnd: "C'est parti ! 🎮", tourAgain: "🦎 Revoir la visite guidée",
      tourS: {
        hello: ["Salut, moi c'est Kamei ! 🦎", "Je te fais visiter TOUTE l'appli en 2 minutes. Tu peux revenir en arrière avec ‹ ou passer quand tu veux."],
        hero: ["Reprendre ta partie", "Ici, ta dernière partie : touche ▶ et tu reprends exactement là où tu t'étais arrêté (l'appli sauvegarde toute seule quand tu quittes)."],
        tabs: ["Tes consoles", "Choisis une console pour ne voir que ses jeux. « Tous » montre toute ta collection."],
        search: ["Chercher un jeu", "Tape quelques lettres pour retrouver un jeu dans ta collection."],
        grid: ["Tes jeux", "Touche un jeu pour ouvrir sa fiche : ▶ Jouer, Continuer, tes 3 emplacements de sauvegarde, changer la jaquette, renommer ou supprimer."],
        add: ["Ajouter un jeu", "Touche + pour ajouter des fichiers de jeux depuis ton téléphone (même en .zip). L'appli reconnaît la console et trouve la jaquette toute seule."],
        ingame: ["Pendant une partie", "En haut : ✕ Quitter (ça sauvegarde), 💾 sauvegardes, ⚙️ options (filtre écran, taille de la manette tactile, codes de triche, retour arrière), 👥 jouer en ligne avec un ami. Une manette Bluetooth ? La manette tactile disparaît toute seule."],
        nav: ["La barre du bas", "Tout l'appli est rangée en 5 onglets : Jouer, Découvrir, Events, Social et Moi. On va les visiter !"],
        catalogue: ["📚 Catalogue", "Les jeux Kamei Productions et des jeux libres : touche « Installer » et le jeu arrive directement dans ta console."],
        requests: ["📨 Demandes", "Tu veux un jeu ? Demande-le ici. Tu suis où en est ta demande (en cours, acceptée, dispo) et tu es prévenu."],
        tv: ["📺 Kamei TV", "Les lives de Kamei Production, en direct dans l'appli. Quand un live commence, la TV s'allume toute seule et tu reçois une notification."],
        events: ["🏆 Kamei Events", "Les tournois du mois : affiches, compte à rebours des inscriptions et calendrier. Touche une affiche pour t'inscrire."],
        events2: ["Badges 🥇🥈🥉", "Le podium gagne un badge sur le jeu du tournoi. Si tu rejoues, ton badge est remis en jeu : « Lucas 🥇 défend son titre » ! Ton palmarès est dans Moi."],
        chat: ["💬 Messages", "Discute avec tes amis (texte et photos) et rejoins le salon Général 🌍 avec tous les joueurs."],
        friends: ["👥 Amis", "Ajoute un ami avec son code ami. Sur sa fiche : lui écrire, jouer en ligne ensemble, le regarder jouer en direct, échanger des Pokémon et voir son Kamei."],
        sessions: ["🕹️ Sessions", "Ton temps de jeu, tes parties et à quoi jouent tes amis."],
        me: ["Moi", "Ta photo de profil (touche l'appareil photo) et ton code ami à envoyer à tes potes."],
        pet: ["Ton Kamei 🥚", "C'est moi, ton Tamagotchi ! Nourris-moi, lave-moi, joue avec moi : je grandis quand tu joues et que tu discutes avec tes amis."],
        palm: ["🏆 Palmarès", "Tes badges et ton historique de tournois, jeu par jeu."],
        secure: ["🔐 Mot de passe", "Important : ton compte est rangé sur ce téléphone. Mets un mot de passe pour pouvoir te connecter avec ton pseudo sur un autre téléphone."],
        lang: ["Langue et thèmes", "Change la langue (FR, NL, EN) et le thème de l'appli : Halloween, Noël… et plein d'autres."],
        backup: ["Changer de téléphone", "Emporte tes jeux et tes sauvegardes vers un nouveau téléphone."],
        bye: ["À toi de jouer !", "Tu peux revoir cette visite quand tu veux : Moi → Revoir la visite guidée. Amuse-toi bien ! 💚"],
      } },
    nl: { tourNext: "Volgende ➜", tourPrev: "‹", tourSkip: "Overslaan", tourEnd: "Let's go! 🎮", tourAgain: "🦎 Rondleiding opnieuw bekijken",
      tourS: {
        hello: ["Hoi, ik ben Kamei! 🦎", "Ik toon je de HELE app in 2 minuten. Met ‹ ga je terug, overslaan kan altijd."],
        hero: ["Verder spelen", "Hier staat je laatste spel: tik op ▶ en je gaat verder waar je stopte (de app slaat vanzelf op als je stopt)."],
        tabs: ["Je consoles", "Kies een console om alleen die spellen te zien. « Alle » toont je hele collectie."],
        search: ["Een spel zoeken", "Typ een paar letters om een spel terug te vinden."],
        grid: ["Je spellen", "Tik op een spel voor de fiche: ▶ Spelen, Verder, je 3 opslagplaatsen, hoes wijzigen, naam wijzigen of verwijderen."],
        add: ["Spel toevoegen", "Tik op + om spelbestanden van je telefoon toe te voegen (ook .zip). De app herkent de console en zoekt de hoes."],
        ingame: ["Tijdens het spelen", "Bovenaan: ✕ Stoppen (slaat op), 💾 opslaan, ⚙️ opties (scherm-filter, grootte van de touch-controller, cheats, terugspoelen), 👥 online spelen met een vriend. Een Bluetooth-controller? De touch-controller verdwijnt vanzelf."],
        nav: ["De balk onderaan", "De app heeft 5 tabbladen: Spelen, Ontdekken, Events, Sociaal en Ik. We bekijken ze!"],
        catalogue: ["📚 Catalogus", "Spellen van Kamei Productions en vrije spellen: tik op « Installeren » en het spel staat op je console."],
        requests: ["📨 Aanvragen", "Wil je een spel? Vraag het hier aan en volg je aanvraag (bezig, aanvaard, beschikbaar)."],
        tv: ["📺 Kamei TV", "De livestreams van Kamei Production in de app. Als een live start, gaat de tv vanzelf aan en krijg je een melding."],
        events: ["🏆 Kamei Events", "De toernooien van de maand: affiches, aftellen voor de inschrijvingen en kalender. Tik op een affiche om je in te schrijven."],
        events2: ["Badges 🥇🥈🥉", "Het podium wint een badge voor het spel. Speel je opnieuw, dan staat je badge op het spel: « Lucas 🥇 verdedigt zijn titel »! Je erelijst staat bij Ik."],
        chat: ["💬 Berichten", "Chat met je vrienden (tekst en foto's) en ga naar de algemene chat 🌍 met alle spelers."],
        friends: ["👥 Vrienden", "Voeg een vriend toe met zijn vriendencode. Op zijn fiche: berichten, samen online spelen, live meekijken, Pokémon ruilen en zijn Kamei zien."],
        sessions: ["🕹️ Sessies", "Je speeltijd, je sessies en wat je vrienden spelen."],
        me: ["Ik", "Je profielfoto (tik op het fototoestel) en je vriendencode voor je vrienden."],
        pet: ["Je Kamei 🥚", "Dat ben ik, je Tamagotchi! Voer me, was me, speel met me: ik groei als je speelt en chat."],
        palm: ["🏆 Erelijst", "Je badges en toernooien, spel per spel."],
        secure: ["🔐 Wachtwoord", "Belangrijk: je account staat op deze telefoon. Kies een wachtwoord om met je naam op een andere telefoon in te loggen."],
        lang: ["Taal en thema's", "Kies de taal (FR, NL, EN) en het thema: Halloween, Kerstmis… en nog veel meer."],
        backup: ["Van telefoon wisselen", "Neem je spellen en opslagen mee naar een nieuwe telefoon."],
        bye: ["Aan jou!", "Deze rondleiding opnieuw zien? Ik → Rondleiding opnieuw bekijken. Veel plezier! 💚"],
      } },
    en: { tourNext: "Next ➜", tourPrev: "‹", tourSkip: "Skip", tourEnd: "Let's go! 🎮", tourAgain: "🦎 Replay the guided tour",
      tourS: {
        hello: ["Hi, I'm Kamei! 🦎", "I'll show you the WHOLE app in 2 minutes. Go back with ‹ or skip any time."],
        hero: ["Resume your game", "Your last game is here: tap ▶ and you continue exactly where you stopped (the app saves by itself when you quit)."],
        tabs: ["Your consoles", "Pick a console to only see its games. « All » shows your whole collection."],
        search: ["Find a game", "Type a few letters to find a game in your collection."],
        grid: ["Your games", "Tap a game to open its page: ▶ Play, Continue, your 3 save slots, change the cover, rename or delete."],
        add: ["Add a game", "Tap + to add game files from your phone (even .zip). The app recognises the console and finds the cover."],
        ingame: ["While playing", "At the top: ✕ Quit (it saves), 💾 saves, ⚙️ options (screen filter, touch pad size, cheats, rewind), 👥 play online with a friend. A Bluetooth controller? The touch pad hides by itself."],
        nav: ["The bottom bar", "The app has 5 tabs: Play, Discover, Events, Social and Me. Let's visit them!"],
        catalogue: ["📚 Catalogue", "Kamei Productions games and free games: tap « Install » and the game lands in your console."],
        requests: ["📨 Requests", "Want a game? Ask for it here and follow your request (in progress, accepted, available)."],
        tv: ["📺 Kamei TV", "Kamei Production's lives, inside the app. When a live starts, the TV switches on by itself and you get a notification."],
        events: ["🏆 Kamei Events", "This month's tournaments: posters, sign-up countdowns and a calendar. Tap a poster to sign up."],
        events2: ["Badges 🥇🥈🥉", "The podium wins a badge for the game. Play again and your badge is at stake: « Lucas 🥇 is defending the title »! Your trophies are in Me."],
        chat: ["💬 Messages", "Chat with your friends (text and photos) and join the General room 🌍 with every player."],
        friends: ["👥 Friends", "Add a friend with their friend code. On their page: message them, play online together, watch them live, trade Pokémon and see their Kamei."],
        sessions: ["🕹️ Sessions", "Your play time, your sessions and what your friends are playing."],
        me: ["Me", "Your profile photo (tap the camera) and your friend code to send to your mates."],
        pet: ["Your Kamei 🥚", "That's me, your Tamagotchi! Feed me, wash me, play with me: I grow when you play and chat."],
        palm: ["🏆 Trophies", "Your badges and tournament history, game by game."],
        secure: ["🔐 Password", "Important: your account lives on this phone. Set a password to log in with your username on another phone."],
        lang: ["Language and themes", "Change the language (FR, NL, EN) and the app theme: Halloween, Christmas… and many more."],
        backup: ["Switch phone", "Take your games and saves to a new phone."],
        bye: ["Your turn!", "To see this tour again: Me → Replay the guided tour. Have fun! 💚"],
      } },
  };
  for (const k in L) Object.assign(I18N[k], L[k]);

  const me = () => window.kameiMe && window.kameiMe();
  const vis = (el) => !!el && el.getClientRects().length > 0 && el.getBoundingClientRect().width > 0 && getComputedStyle(el).visibility !== "hidden";
  // each step: [text key, tab to open first (or null), element(s) to light up]
  const STEPS = [
    ["hello", "consoles", null],
    ["hero", "consoles", "#deck .sh-res, #deck .shero"],
    ["tabs", "consoles", "#tabs"],
    ["search", "consoles", "#search"],
    ["grid", "consoles", "#grid .card, #grid"],
    ["add", "consoles", "#add"],
    ["ingame", "consoles", null],
    ["nav", "consoles", ".bnav"],
    ["catalogue", "catalogue", "#v-catalogue"],
    ["requests", "requests", "#v-requests"],
    ["tv", "tv", "#v-tv .tvset, #v-tv"],
    ["events", "events", "#v-events .evcal, #v-events"],
    ["events2", "events", '#v-events .evc, [data-nv="events"]'],
    ["chat", "chat", "#v-chat"],
    ["friends", "friends", "#v-friends"],
    ["sessions", "sessions", "#v-sessions"],
    ["me", "me", "#v-me .mhead"],
    ["pet", "me", "#mePet"],
    ["palm", "me", "#mePalm"],
    ["secure", "me", "#meSecure"],
    ["lang", "me", "#meLang"],
    ["backup", "me", "#meBackup"],
    ["bye", "consoles", null],
  ];

  const st = document.createElement("style");
  st.textContent = `
  #kTour { position: fixed; inset: 0; z-index: 10000; }
  #kTour .hole { position: fixed; border-radius: 18px; box-shadow: 0 0 0 9999px rgba(4,4,10,.78); transition: all .35s ease; pointer-events: none; outline: 3px solid var(--tacc, #8fc63f); outline-offset: 3px; }
  #kTour .hole.none { left: 50% !important; top: 40% !important; width: 0 !important; height: 0 !important; outline: none; }
  #kTour .bub { position: fixed; left: 14px; right: 14px; max-width: 420px; margin: 0 auto; background: #17172a; color: var(--text); border-radius: 20px; padding: 14px 14px 12px 92px;
    box-shadow: 0 16px 40px rgba(0,0,0,.6); transition: top .35s ease; min-height: 96px; }
  #kTour .bub svg { position: absolute; left: 6px; bottom: 6px; width: 82px; height: 100px; animation: tourHop 1.4s ease-in-out infinite; }
  @keyframes tourHop { 0%, 100% { transform: translateY(0); } 45% { transform: translateY(-6px); } }
  #kTour .bub b { display: block; font: 800 16px Inter, sans-serif; margin-bottom: 4px; }
  #kTour .bub p { margin: 0 0 10px; font: 500 13px/1.4 Inter, sans-serif; color: var(--muted); }
  #kTour .bub .tb { display: flex; gap: 8px; justify-content: flex-end; align-items: center; }
  #kTour .bub .tb span { margin-right: auto; font: 600 11px Inter, sans-serif; color: var(--muted); }
  #kTour .bub button { border: 0; border-radius: 12px; padding: 8px 12px; font: 700 13px Inter, sans-serif; background: #23233a; color: var(--text); }
  #kTour .bub button.go { background: linear-gradient(135deg, var(--tacc, #8fc63f), var(--tacc2, #22c55e)); color: #0b0b12; }`;
  document.head.appendChild(st);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const firstVis = (sel) => { for (const part of sel.split(",")) { const el = [...document.querySelectorAll(part.trim())].find(vis); if (el) return el; } return null; };
  async function openTab(k) {
    const N = window.kameiNav; if (!N) return;
    const cur = N.current && N.current();
    if (cur === k) return;
    try { N.go(k); } catch (e) {}
    await wait(k === "consoles" ? 250 : 650);
  }
  function start() {
    if (document.getElementById("kTour")) return;
    try { if (window.closeSheet) closeSheet(); } catch (e) {}
    const box = document.createElement("div");
    box.id = "kTour";
    box.innerHTML = `<div class="hole none"></div><div class="bub"><svg viewBox="0 -70 300 400"><use href="#kHead" x="20" y="0" width="260" height="320"/><use href="#hat-party" x="78" y="-74" width="200" height="160"/></svg>
      <b></b><p></p><div class="tb"><span></span><button class="pv">${t("tourPrev")}</button><button class="sk">${t("tourSkip")}</button><button class="go"></button></div></div>`;
    document.body.appendChild(box);
    const hole = box.querySelector(".hole"), bub = box.querySelector(".bub");
    let i = 0, busy = false;
    const done = async () => { try { localStorage.setItem("kamei-tour-done", "2"); } catch (e) {} box.remove(); await openTab("consoles"); window.scrollTo(0, 0); };
    // a step whose element doesn't exist (feature off, no game yet…) is skipped
    async function show(dir) {
      if (busy) return; busy = true;
      try {
        for (;;) {
          if (i < 0) i = 0;
          if (i >= STEPS.length) { busy = false; return done(); }
          const [k, tab, sel] = STEPS[i];
          await openTab(tab);
          const el = sel ? firstVis(sel) : null;
          if (sel && !el) { i += dir || 1; continue; }
          const [title, text] = t("tourS")[k];
          bub.querySelector("b").textContent = title;
          bub.querySelector("p").textContent = text;
          bub.querySelector("span").textContent = `${i + 1} / ${STEPS.length}`;
          const last = i === STEPS.length - 1;
          bub.querySelector(".go").textContent = last ? t("tourEnd") : t("tourNext");
          bub.querySelector(".sk").style.display = last ? "none" : "";
          bub.querySelector(".pv").style.display = i === 0 ? "none" : "";
          if (el) {
            if (el.closest(".bnav") !== el && !el.classList.contains("fab") && el.id !== "add" && !el.classList.contains("bnav")) {
              const r0 = el.getBoundingClientRect();
              if (r0.top < 70 || r0.bottom > window.innerHeight - 260) { el.scrollIntoView({ block: "center" }); await wait(250); }
            }
            const r = el.getBoundingClientRect(), pad = 6;
            const top = Math.max(4, r.top - pad), h = Math.min(window.innerHeight * 0.5, r.height + pad * 2, window.innerHeight - top - 8);
            hole.classList.remove("none");
            Object.assign(hole.style, { left: Math.max(4, r.left - pad) + "px", top: top + "px", width: Math.min(window.innerWidth - 8, r.width + pad * 2) + "px", height: h + "px" });
            const below = top + h + 14, bh = bub.offsetHeight || 150;
            bub.style.top = (below + bh < window.innerHeight - 10 ? below : Math.max(10, top - bh - 14)) + "px";
          } else {
            hole.classList.add("none");
            bub.style.top = Math.round(window.innerHeight * 0.34) + "px";
          }
          break;
        }
      } finally { busy = false; }
    }
    bub.querySelector(".go").onclick = () => { if (i >= STEPS.length - 1) done(); else { i++; show(1); } };
    bub.querySelector(".pv").onclick = () => { i--; show(-1); };
    bub.querySelector(".sk").onclick = done;
    window.scrollTo(0, 0);
    show(1);
  }
  window.kameiTour = start;

  // first launch: once logged in and the screen is ready
  const iv = setInterval(() => {
    let seen = false; try { seen = localStorage.getItem("kamei-tour-done") === "2"; } catch (e) {}
    if (seen) return clearInterval(iv);
    if (!me() || !vis(document.querySelector("#deck"))) return;
    if (document.querySelector("#sheetBg.on") || document.querySelector("#playerWrap.on, .player.on")) return;
    clearInterval(iv); setTimeout(start, 1200);
  }, 1500);
})();

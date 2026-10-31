/* Kamei Game Console — first-launch guided tour, presented by Kamei */
(function () {
  const L = {
    fr: { tourNext: "Suivant ➜", tourSkip: "Passer", tourEnd: "C'est parti ! 🎮", tourAgain: "🦎 Revoir la visite guidée",
      tourS: {
        hello: ["Salut, moi c'est Kamei ! 🦎", "Je vais te faire visiter l'appli en 1 minute."],
        deck: ["Tes jeux", "Toutes tes consoles sont ici. Glisse pour changer de console et touche un jeu pour jouer. ▶️ Continuer reprend ta dernière partie là où tu l'as laissée."],
        add: ["Ajouter un jeu", "Touche le + pour ajouter tes propres fichiers de jeux depuis ton téléphone."],
        cat: ["📚 Le catalogue", "Les jeux créés par Kamei Productions, à télécharger en un geste."],
        nav: ["Les onglets", "Chat avec tes amis, salon Général 🌍, sessions, demandes de jeux, amis… tout est en bas."],
        pet: ["Moi ! 🥚", "Je suis ton Tamagotchi. Nourris-moi, joue avec moi… et je grandis quand tu utilises l'appli !"],
        acc: ["Ton compte", "Ton profil, tes amis, et la sauvegarde de tes données pour changer de téléphone."],
        set: ["Réglages", "Langue, thème (même un thème perso 🎨), vibrations, notifications…"],
        bye: ["À toi de jouer !", "Si tu veux revoir cette visite, c'est dans les Réglages. Amuse-toi bien ! 💚"],
      } },
    nl: { tourNext: "Volgende ➜", tourSkip: "Overslaan", tourEnd: "Let's go! 🎮", tourAgain: "🦎 Rondleiding opnieuw bekijken",
      tourS: {
        hello: ["Hoi, ik ben Kamei! 🦎", "Ik geef je in 1 minuut een rondleiding."],
        deck: ["Je spellen", "Al je consoles staan hier. Swipe om van console te wisselen en tik op een spel om te spelen. ▶️ Verder spelen gaat verder waar je stopte."],
        add: ["Spel toevoegen", "Tik op + om je eigen spelbestanden van je telefoon toe te voegen."],
        cat: ["📚 De catalogus", "Spellen gemaakt door Kamei Productions, in één tik te downloaden."],
        nav: ["De tabbladen", "Chat met vrienden, algemene chat 🌍, sessies, spelaanvragen, vrienden… alles staat onderaan."],
        pet: ["Ik! 🥚", "Ik ben je Tamagotchi. Voer me, speel met me… en ik groei als je de app gebruikt!"],
        acc: ["Je account", "Je profiel, je vrienden en de back-up van je gegevens om van telefoon te wisselen."],
        set: ["Instellingen", "Taal, thema (zelfs een eigen thema 🎨), trillen, meldingen…"],
        bye: ["Aan jou!", "Wil je deze rondleiding opnieuw zien? Dat kan in de Instellingen. Veel plezier! 💚"],
      } },
    en: { tourNext: "Next ➜", tourSkip: "Skip", tourEnd: "Let's go! 🎮", tourAgain: "🦎 Replay the guided tour",
      tourS: {
        hello: ["Hi, I'm Kamei! 🦎", "Let me show you around the app in 1 minute."],
        deck: ["Your games", "All your consoles are here. Swipe to change console and tap a game to play. ▶️ Continue resumes your last game where you left it."],
        add: ["Add a game", "Tap + to add your own game files from your phone."],
        cat: ["📚 The catalogue", "Games made by Kamei Productions, one tap to download."],
        nav: ["The tabs", "Chat with friends, the General room 🌍, sessions, game requests, friends… it's all at the bottom."],
        pet: ["Me! 🥚", "I'm your Tamagotchi. Feed me, play with me… and I grow when you use the app!"],
        acc: ["Your account", "Your profile, your friends, and backing up your data to switch phones."],
        set: ["Settings", "Language, theme (even a custom theme 🎨), vibration, notifications…"],
        bye: ["Your turn!", "To see this tour again, go to Settings. Have fun! 💚"],
      } },
  };
  for (const k in L) Object.assign(I18N[k], L[k]);

  const me = () => window.kameiMe && window.kameiMe();
  const vis = (el) => el && el.offsetParent !== null && el.getBoundingClientRect().width > 0;
  const STEPS = [
    ["hello", null], ["deck", "#deck"], ["add", "#add"], ["cat", "#catBtn"], ["nav", ".bnav"], ["pet", "#petBtn"], ["acc", "#accBtn"], ["set", "#langBtn"], ["bye", null],
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

  function start() {
    if (document.getElementById("kTour")) return;
    try { if (window.closeSheet) closeSheet(); } catch (e) {}
    const steps = STEPS.filter(([, sel]) => !sel || vis(document.querySelector(sel)));
    const box = document.createElement("div");
    box.id = "kTour";
    box.innerHTML = `<div class="hole none"></div><div class="bub"><svg viewBox="0 -70 300 400"><use href="#kHead" x="20" y="0" width="260" height="320"/><use href="#hat-party" x="78" y="-74" width="200" height="160"/></svg>
      <b></b><p></p><div class="tb"><span></span><button class="sk">${t("tourSkip")}</button><button class="go"></button></div></div>`;
    document.body.appendChild(box);
    const hole = box.querySelector(".hole"), bub = box.querySelector(".bub");
    let i = 0;
    const done = () => { try { localStorage.setItem("kamei-tour-done", "1"); } catch (e) {} box.remove(); };
    function show() {
      const [k, sel] = steps[i];
      const [title, text] = t("tourS")[k];
      bub.querySelector("b").textContent = title;
      bub.querySelector("p").textContent = text;
      bub.querySelector("span").textContent = `${i + 1} / ${steps.length}`;
      bub.querySelector(".go").textContent = i === steps.length - 1 ? t("tourEnd") : t("tourNext");
      bub.querySelector(".sk").style.display = i === steps.length - 1 ? "none" : "";
      const el = sel && document.querySelector(sel);
      if (el) {
        const r = el.getBoundingClientRect(), pad = 6;
        const top = Math.max(4, r.top - pad), h = Math.min(window.innerHeight - 8, r.height + pad * 2);
        hole.classList.remove("none");
        Object.assign(hole.style, { left: Math.max(4, r.left - pad) + "px", top: top + "px", width: Math.min(window.innerWidth - 8, r.width + pad * 2) + "px", height: h + "px" });
        // bubble below the target if there's room, otherwise above
        const below = top + h + 14, bh = bub.offsetHeight || 140;
        bub.style.top = (below + bh < window.innerHeight - 10 ? below : Math.max(10, top - bh - 14)) + "px";
      } else {
        hole.classList.add("none");
        bub.style.top = Math.round(window.innerHeight * 0.36) + "px";
      }
    }
    bub.querySelector(".go").onclick = () => { if (++i >= steps.length) done(); else show(); };
    bub.querySelector(".sk").onclick = done;
    show();
  }
  window.kameiTour = start;

  // first launch: once logged in and the screen is ready
  const iv = setInterval(() => {
    let seen = false; try { seen = localStorage.getItem("kamei-tour-done") === "1"; } catch (e) {}
    if (seen) return clearInterval(iv);
    if (!me() || !vis(document.querySelector("#deck"))) return;
    if (document.querySelector("#sheetBg.on") || document.querySelector("#playerWrap.on, .player.on")) return;
    clearInterval(iv); setTimeout(start, 1200);
  }, 1500);
})();

/* Kamei Game Console — Kamei Tamagotchi: gauges, actions, fly-catching game, stages, hats, XP from the app */
(function () {
  const L = {
    fr: { petTitle: "Mon Kamei", petLv: (n) => `Niveau ${n}`, petXp: (a, b) => `${a} / ${b} XP`,
      petG: { food: "🍔 Faim", fun: "🎈 Moral", energy: "⚡ Énergie", clean: "🫧 Propreté" },
      petA: { feed: "🍔 Nourrir", play: "🪰 Jouer", wash: "🛁 Laver", sleep: "😴 Dodo", wake: "☀️ Réveiller", cure: "💊 Soigner" },
      petStage: { egg: "Œuf", baby: "Bébé", child: "Enfant", teen: "Ado", adult: "Adulte" },
      petMood: { sick: "est malade 🤒", sleep: "dort 💤", sad: "est triste 😢", ok: "va bien 🙂", happy: "est super content ✨" },
      petErr: { sleeping: "Il dort… réveille-le d'abord ☀️", full: "Il n'a plus faim 😋", tired: "Il est trop fatigué pour jouer 😴", locked: "Pas encore débloqué 🔒" },
      petHats: "🎩 Chapeaux", petLock: (n) => `🔒 Niv. ${n}`, petRename: "✏️ Renommer", petRenameQ: "Nouveau nom pour ton Kamei :",
      petHint: "Kamei gagne de l'XP quand tu joues, échanges, discutes, envoies des demandes… Il ne meurt jamais, mais s'il est négligé il devient triste ou malade.",
      petEggHint: (n) => `L'œuf bouge… encore ${n} XP avant l'éclosion !`,
      petGame: "Attrape les mouches !", petGameGo: "Touche les 🪰 avant qu'elles s'envolent", petScore: (n) => `${n} mouche${n > 1 ? "s" : ""} attrapée${n > 1 ? "s" : ""} !`,
      petUp: (n) => `🎉 Kamei passe au niveau ${n} !`, petUnlocked: "Débloqué : ", petHatched: "🐣 L'œuf a éclos ! Kamei est né !",
      petNeed: (n) => `${n} a besoin de toi 🥺`, petNeedTxt: "Viens t'occuper de lui", petFriend: "🦎 Son Kamei", petXpGot: (n) => `+${n} XP pour Kamei 🦎`,
      petUnlockTheme: (n) => `Monte ton Kamei au niveau ${n} pour débloquer ça 🦎` },
    nl: { petTitle: "Mijn Kamei", petLv: (n) => `Level ${n}`, petXp: (a, b) => `${a} / ${b} XP`,
      petG: { food: "🍔 Honger", fun: "🎈 Humeur", energy: "⚡ Energie", clean: "🫧 Netheid" },
      petA: { feed: "🍔 Voeren", play: "🪰 Spelen", wash: "🛁 Wassen", sleep: "😴 Slapen", wake: "☀️ Wakker maken", cure: "💊 Verzorgen" },
      petStage: { egg: "Ei", baby: "Baby", child: "Kind", teen: "Tiener", adult: "Volwassen" },
      petMood: { sick: "is ziek 🤒", sleep: "slaapt 💤", sad: "is verdrietig 😢", ok: "maakt het goed 🙂", happy: "is superblij ✨" },
      petErr: { sleeping: "Hij slaapt… maak hem eerst wakker ☀️", full: "Hij heeft geen honger meer 😋", tired: "Hij is te moe om te spelen 😴", locked: "Nog niet ontgrendeld 🔒" },
      petHats: "🎩 Hoeden", petLock: (n) => `🔒 Lvl ${n}`, petRename: "✏️ Hernoemen", petRenameQ: "Nieuwe naam voor je Kamei:",
      petHint: "Kamei krijgt XP als je speelt, ruilt, chat, aanvragen stuurt… Hij gaat nooit dood, maar als je hem verwaarloost wordt hij verdrietig of ziek.",
      petEggHint: (n) => `Het ei beweegt… nog ${n} XP tot het uitkomt!`,
      petGame: "Vang de vliegen!", petGameGo: "Tik op de 🪰 voor ze wegvliegen", petScore: (n) => `${n} vlieg${n > 1 ? "en" : ""} gevangen!`,
      petUp: (n) => `🎉 Kamei is nu level ${n}!`, petUnlocked: "Ontgrendeld: ", petHatched: "🐣 Het ei is uitgekomen! Kamei is geboren!",
      petNeed: (n) => `${n} heeft je nodig 🥺`, petNeedTxt: "Kom voor hem zorgen", petFriend: "🦎 Zijn Kamei", petXpGot: (n) => `+${n} XP voor Kamei 🦎`,
      petUnlockTheme: (n) => `Breng je Kamei naar level ${n} om dit te ontgrendelen 🦎` },
    en: { petTitle: "My Kamei", petLv: (n) => `Level ${n}`, petXp: (a, b) => `${a} / ${b} XP`,
      petG: { food: "🍔 Hunger", fun: "🎈 Mood", energy: "⚡ Energy", clean: "🫧 Clean" },
      petA: { feed: "🍔 Feed", play: "🪰 Play", wash: "🛁 Wash", sleep: "😴 Sleep", wake: "☀️ Wake up", cure: "💊 Heal" },
      petStage: { egg: "Egg", baby: "Baby", child: "Child", teen: "Teen", adult: "Adult" },
      petMood: { sick: "is sick 🤒", sleep: "is sleeping 💤", sad: "is sad 😢", ok: "is fine 🙂", happy: "is super happy ✨" },
      petErr: { sleeping: "He's asleep… wake him up first ☀️", full: "He's not hungry 😋", tired: "He's too tired to play 😴", locked: "Not unlocked yet 🔒" },
      petHats: "🎩 Hats", petLock: (n) => `🔒 Lv ${n}`, petRename: "✏️ Rename", petRenameQ: "New name for your Kamei:",
      petHint: "Kamei earns XP when you play, trade, chat, send requests… He never dies, but if you neglect him he gets sad or sick.",
      petEggHint: (n) => `The egg is moving… ${n} XP until it hatches!`,
      petGame: "Catch the flies!", petGameGo: "Tap the 🪰 before they fly away", petScore: (n) => `${n} fl${n > 1 ? "ies" : "y"} caught!`,
      petUp: (n) => `🎉 Kamei reached level ${n}!`, petUnlocked: "Unlocked: ", petHatched: "🐣 The egg hatched! Kamei is born!",
      petNeed: (n) => `${n} needs you 🥺`, petNeedTxt: "Come take care of him", petFriend: "🦎 Their Kamei", petXpGot: (n) => `+${n} XP for Kamei 🦎`,
      petUnlockTheme: (n) => `Get your Kamei to level ${n} to unlock this 🦎` },
  };
  for (const k in L) Object.assign(I18N[k], L[k]);

  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const feat = () => !window.kameiFeature || window.kameiFeature("pet");
  const $ = (id) => document.getElementById(id);

  // what each level unlocks (hats on the pet + items in the custom theme)
  const UNLOCK = {
    hat: { "hat-party": 3, "hat-straw": 5, "hat-bunny": 8, "hat-hearts": 11, "hat-santa": 14, "hat-witch": 17 },
    prop: { "prop-gift": 2, "prop-heart": 4, "prop-egg": 6, "prop-fries": 7, "prop-icecream": 10, "prop-pumpkin": 13 },
    particle: { "p-spark": 1, "p-confetti": 4, "p-heart": 6, "p-flower": 9, "p-snow": 12, "p-bat": 16 },
  };
  const HATS = ["none", "hat-party", "hat-straw", "hat-bunny", "hat-hearts", "hat-santa", "hat-witch"];
  const xpFor = (lv) => 40 * (lv - 1) * (lv - 1);
  const stageOf = (p) => (p.xp < 20 ? "egg" : p.level < 4 ? "baby" : p.level < 8 ? "child" : p.level < 14 ? "teen" : "adult");
  const moodOf = (p) => {
    if (p.sick) return "sick";
    if (p.sleeping) return "sleep";
    const avg = (p.food + p.fun + p.energy + p.clean) / 4;
    return avg < 35 ? "sad" : avg < 65 ? "ok" : "happy";
  };
  const needy = (p) => p && !p.sleeping && (p.sick || p.food < 30 || p.fun < 25 || p.clean < 25 || p.energy < 15);

  let pet = null;
  try { pet = JSON.parse(localStorage.getItem("kamei-pet") || "null"); } catch (e) {}
  const cachedLevel = () => (pet ? pet.level : 1);

  /* ---------- level gates, also used by the theme editor ---------- */
  window.kameiPetUnlock = {
    need: (kind, v) => (UNLOCK[kind] && UNLOCK[kind][v]) || 0,
    ok(kind, v) {
      if (!feat() || !me()) return true;               // no pet → nothing locked
      if (me() && me().is_admin) return true;
      return cachedLevel() >= this.need(kind, v);
    },
  };

  /* ---------- styles ---------- */
  const st = document.createElement("style");
  st.textContent = `
  #petBtn { position: relative; }
  #petBtn i { position: absolute; top: 2px; right: 2px; width: 9px; height: 9px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 0 2px var(--bg); display: none; }
  #petBtn.need i { display: block; }
  #petBtn.need { animation: petNudge 2.4s ease-in-out infinite; }
  @keyframes petNudge { 0%, 85%, 100% { transform: none; } 90% { transform: rotate(-12deg); } 95% { transform: rotate(12deg); } }
  .pet-stage { position: relative; height: 210px; border-radius: 22px; overflow: hidden; margin: 6px 0 10px;
    background: radial-gradient(120% 90% at 30% 0%, color-mix(in srgb, var(--tacc, #8fc63f) 40%, transparent), transparent 70%), linear-gradient(#141428, #0b0b12); }
  .pet-stage .ground { position: absolute; left: -10%; right: -10%; bottom: -40px; height: 80px; border-radius: 50%; background: color-mix(in srgb, var(--tacc, #8fc63f) 25%, #10101c); }
  .pet-stage svg.k { position: absolute; left: 50%; bottom: 18px; transform-origin: 50% 100%; }
  .pet-stage.m-happy svg.k { animation: petHop 1.2s ease-in-out infinite; }
  .pet-stage.m-ok svg.k { animation: petBreath 3s ease-in-out infinite; }
  .pet-stage.m-sad svg.k { filter: saturate(.45) brightness(.85); animation: petDroop 4s ease-in-out infinite; }
  .pet-stage.m-sick svg.k { filter: hue-rotate(50deg) saturate(.6); animation: petShiver .25s linear infinite; }
  .pet-stage.m-sleep { background: linear-gradient(#070712, #0b0b1a); }
  .pet-stage.m-sleep svg.k { filter: brightness(.6); animation: petBreath 4s ease-in-out infinite; }
  .pet-stage .egg { animation: petWobble 2.2s ease-in-out infinite; }
  @keyframes petHop { 0%, 100% { transform: translateX(-50%) translateY(0) scaleY(1); } 40% { transform: translateX(-50%) translateY(-16px) scaleY(1.03); } 55% { transform: translateX(-50%) translateY(0) scaleY(.94); } }
  @keyframes petBreath { 0%, 100% { transform: translateX(-50%) scaleY(1); } 50% { transform: translateX(-50%) scaleY(1.03); } }
  @keyframes petDroop { 0%, 100% { transform: translateX(-50%) rotate(-3deg); } 50% { transform: translateX(-50%) rotate(3deg) translateY(4px); } }
  @keyframes petShiver { 0% { transform: translateX(calc(-50% - 1px)); } 50% { transform: translateX(calc(-50% + 1px)); } 100% { transform: translateX(calc(-50% - 1px)); } }
  @keyframes petWobble { 0%, 70%, 100% { transform: translateX(-50%) rotate(0); } 78% { transform: translateX(-50%) rotate(-8deg); } 86% { transform: translateX(-50%) rotate(8deg); } 94% { transform: translateX(-50%) rotate(-4deg); } }
  .pet-fx { position: absolute; font-size: 26px; pointer-events: none; animation: petFloat 2.6s ease-in infinite; }
  @keyframes petFloat { 0% { opacity: 0; transform: translateY(10px) scale(.7); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-50px) scale(1.15); } }
  .pet-pop { position: absolute; left: 50%; top: 30%; transform: translateX(-50%); font-size: 40px; animation: petPop 1s ease-out forwards; pointer-events: none; }
  @keyframes petPop { 0% { opacity: 0; transform: translate(-50%, 20px) scale(.5); } 30% { opacity: 1; transform: translate(-50%, 0) scale(1.2); } 100% { opacity: 0; transform: translate(-50%, -40px) scale(1); } }
  .pet-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .pet-head h3 { margin: 0; }
  .pet-head .chip { font-size: 12px; }
  .pet-xp { height: 8px; border-radius: 6px; background: #23233a; overflow: hidden; margin: 4px 0 2px; }
  .pet-xp b { display: block; height: 100%; background: linear-gradient(90deg, var(--tacc, #8fc63f), var(--tacc2, #22c55e)); border-radius: 6px; transition: width .6s; }
  .pet-g { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 14px; margin: 10px 0; }
  .pet-g div { font: 600 12px Inter, sans-serif; }
  .pet-g span { display: block; height: 9px; border-radius: 6px; background: #23233a; overflow: hidden; margin-top: 4px; }
  .pet-g span b { display: block; height: 100%; border-radius: 6px; transition: width .6s; }
  .pet-acts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .pet-acts button { border: 0; border-radius: 14px; padding: 12px 4px; background: #23233a; color: var(--text); font: 700 13px Inter, sans-serif; }
  .pet-acts button.hot { background: linear-gradient(135deg, var(--tacc, #8fc63f), var(--tacc2, #22c55e)); color: #0b0b12; }
  .pet-hats { display: flex; gap: 8px; overflow-x: auto; padding: 4px 0 8px; }
  .pet-hats button { flex: none; width: 64px; height: 64px; border-radius: 14px; border: 2px solid transparent; background: #23233a; color: var(--muted); font: 700 10px Inter, sans-serif; display: grid; place-items: center; padding: 4px; }
  .pet-hats button.on { border-color: var(--tacc, #8fc63f); }
  .pet-hats button.lock { opacity: .55; }
  .pet-hats svg { width: 46px; height: 36px; }
  .pet-mini { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 16px; background: #1a1a2e; margin-top: 10px; }
  .pet-mini svg { width: 56px; height: 64px; flex: none; }
  #flyGame { position: fixed; inset: 0; z-index: 9999; background: radial-gradient(100% 70% at 50% 100%, #1d3a1a, #0b0b12); touch-action: none; user-select: none; overflow: hidden; }
  #flyGame .hud { position: absolute; top: 14px; left: 0; right: 0; text-align: center; color: #fff; font: 800 18px Inter, sans-serif; text-shadow: 0 2px 8px #000; }
  #flyGame .hud small { display: block; font-weight: 600; font-size: 13px; opacity: .8; }
  #flyGame .fly { position: absolute; font-size: 38px; width: 56px; height: 56px; display: grid; place-items: center; transition: left 1.4s linear, top 1.4s linear; }
  #flyGame .splat { position: absolute; font-size: 34px; animation: petPop .6s ease-out forwards; pointer-events: none; }
  #flyGame svg.k { position: absolute; left: 50%; bottom: -10px; width: 150px; height: 190px; transform: translateX(-50%); }
  #petTour { position: fixed; z-index: 9998; }`;
  document.head.appendChild(st);

  /* ---------- drawing ---------- */
  function svg(p, w, h) {
    const stage = stageOf(p);
    if (stage === "egg") {
      return `<svg class="k egg" viewBox="0 0 120 150" width="${w * 0.5}" height="${h * 0.62}">
        <ellipse cx="60" cy="84" rx="48" ry="62" fill="#f4f1e6"/><ellipse cx="44" cy="58" rx="9" ry="7" fill="#8fc63f"/><ellipse cx="76" cy="92" rx="12" ry="9" fill="#8fc63f"/>
        <ellipse cx="46" cy="114" rx="7" ry="6" fill="#8fc63f"/><ellipse cx="80" cy="52" rx="5" ry="4" fill="#8fc63f"/><ellipse cx="40" cy="70" rx="14" ry="22" fill="#fff" opacity=".35"/></svg>`;
    }
    const scale = { baby: 0.55, child: 0.7, teen: 0.85, adult: 1 }[stage];
    const hat = p.hat ? `<use href="#${p.hat}" x="78" y="-74" width="200" height="160"/>` : "";
    return `<svg class="k" viewBox="0 -70 300 400" width="${w * scale}" height="${h * scale}"><use href="#kHead" x="20" y="0" width="260" height="320"/>${hat}</svg>`;
  }
  function fx(p) {
    const m = moodOf(p), out = [];
    const add = (e, x, y, d) => out.push(`<span class="pet-fx" style="left:${x}%;top:${y}%;animation-delay:${d}s">${e}</span>`);
    if (m === "sleep") { add("💤", 62, 28, 0); add("💤", 70, 18, 1.3); }
    else if (m === "sick") { add("🤒", 64, 26, 0); add("🦠", 28, 40, 1); }
    else if (m === "sad") { add("💧", 60, 34, 0); add("🌧️", 30, 16, 1.2); }
    else if (m === "happy") { add("✨", 26, 30, 0); add("💚", 70, 24, 0.9); add("✨", 64, 50, 1.7); }
    if (!p.sleeping && p.clean < 30) add("🪰", 76, 56, 0.4);
    if (!p.sleeping && p.food < 30) add("🍔?", 22, 22, 0.6);
    return out.join("");
  }
  const gaugeColor = (v) => (v < 25 ? "#ef4444" : v < 50 ? "#f59e0b" : "var(--tacc, #8fc63f)");

  /* ---------- header button ---------- */
  function paintBtn() {
    let b = $("petBtn");
    const show = !!me() && feat();
    if (!show) { if (b) b.remove(); return; }
    if (!b) {
      const bar = document.querySelector("header .hbtns");
      if (!bar) return;
      b = document.createElement("button");
      b.className = "lang"; b.id = "petBtn"; b.setAttribute("aria-label", "Kamei");
      b.onclick = () => open();
      bar.insertBefore(b, bar.firstChild);
    }
    const m = pet ? moodOf(pet) : "ok";
    b.innerHTML = (pet && stageOf(pet) === "egg" ? "🥚" : { sick: "🤒", sleep: "😴", sad: "🥺", ok: "🦎", happy: "🦎" }[m]) + "<i></i>";
    b.classList.toggle("need", needy(pet));
  }

  /* ---------- server ---------- */
  function store(p, quiet) {
    if (!p) return;
    const before = pet;
    pet = p;
    try { localStorage.setItem("kamei-pet", JSON.stringify(p)); } catch (e) {}
    if (before && !quiet) {
      if (stageOf(before) === "egg" && stageOf(p) !== "egg") celebrate(t("petHatched"), []);
      else if (p.level > before.level) {
        const got = [];
        for (const kind in UNLOCK) for (const v in UNLOCK[kind]) if (UNLOCK[kind][v] > before.level && UNLOCK[kind][v] <= p.level) got.push([kind, v]);
        celebrate(t("petUp", p.level), got);
      }
    }
    paintBtn();
    if ($("petSheet")) draw();
    try { if (window.kameiNav && window.kameiNav.current() === "me") window.kameiMeView.paintPet(); } catch (e) {}
    nag();
  }
  async function refresh() {
    if (!me() || !feat()) { paintBtn(); return; }
    try { const r = await sb.rpc("pet_get"); if (!r.error && r.data) store(r.data); } catch (e) {}
  }
  function nag() {
    if (!needy(pet)) return;
    let last = 0; try { last = +localStorage.getItem("kamei-pet-nag") || 0; } catch (e) {}
    if (Date.now() - last < 6 * 3600e3) return;
    try { localStorage.setItem("kamei-pet-nag", String(Date.now())); } catch (e) {}
    try { window.kameiNotify && window.kameiNotify(t("petNeed", pet.name || "Kamei"), t("petNeedTxt"), open); } catch (e) {}
  }
  function celebrate(title, items) {
    const names = items.map(([k, v]) => (k === "hat" ? "🎩 " : k === "prop" ? "🎁 " : "✨ ") + v.replace(/^(hat|prop|p)-/, "")).join(", ");
    try { window.kameiNotify && window.kameiNotify(title, names ? t("petUnlocked") + names : "", open); } catch (e) {}
    try { window.kameiVibe && window.kameiVibe([40, 60, 40]); } catch (e) {}
  }
  async function act(a, score, val) {
    const r = await sb.rpc("pet_act", { a, score: score || 0, val: val || null });
    if (r.error) {
      const k = (r.error.message || "").match(/sleeping|full|tired|locked/);
      toast(k ? t("petErr")[k[0]] : r.error.message, 3000);
      return null;
    }
    store(r.data.pet);
    return r.data;
  }

  /* ---------- the sheet ---------- */
  function pop(e) {
    const s = document.querySelector(".pet-stage");
    if (!s) return;
    const el = document.createElement("span"); el.className = "pet-pop"; el.textContent = e;
    s.appendChild(el); setTimeout(() => el.remove(), 1100);
  }
  function draw() {
    const p = pet;
    if (!p) { openSheet(`<div id="petSheet"><h3>${t("petTitle")}</h3><p class="hint">…</p></div>`); return; }
    const sheet = $("sheet"), y = sheet ? sheet.scrollTop : 0;
    const stage = stageOf(p), m = moodOf(p);
    const lo = xpFor(p.level), hi = xpFor(p.level + 1);
    const pct = Math.max(0, Math.min(100, ((p.xp - lo) / (hi - lo)) * 100));
    const g = (k) => `<div>${t("petG")[k]}<span><b style="width:${Math.round(p[k])}%;background:${gaugeColor(p[k])}"></b></span></div>`;
    const acts = p.sleeping ? ["wake"] : ["feed", "play", "wash", "sleep"];
    if (p.sick) acts.unshift("cure");
    const hot = (a) => (a === "cure" || (a === "feed" && p.food < 40) || (a === "play" && p.fun < 40) || (a === "wash" && p.clean < 40) || (a === "sleep" && p.energy < 30) || a === "wake");
    const hatCell = (h) => {
      const need = UNLOCK.hat[h] || 0, locked = p.level < need;
      return `<button data-hat="${h}" class="${(p.hat || "none") === h ? "on" : ""} ${locked ? "lock" : ""}">${h === "none" ? "—" : `<svg viewBox="0 0 200 160"><use href="#${h}"/></svg>`}${locked ? `<span>${t("petLock", need)}</span>` : ""}</button>`;
    };
    openSheet(`<div id="petSheet">
      <div class="pet-head"><h3>${esc(p.name || "Kamei")}</h3><span class="chip">${t("petStage")[stage]}</span><span class="chip">${t("petLv", p.level)}</span></div>
      <div class="pet-xp"><b style="width:${pct}%"></b></div><p class="hint" style="margin:0">${t("petXp", p.xp, hi)} · ${esc(p.name || "Kamei")} ${t("petMood")[m]}</p>
      <div class="pet-stage m-${m}"><div class="ground"></div>${svg(p, 200, 250)}${fx(p)}</div>
      ${stage === "egg" ? `<p class="hint">${t("petEggHint", Math.max(1, 20 - p.xp))}</p>` : ""}
      <div class="pet-g">${g("food")}${g("fun")}${g("energy")}${g("clean")}</div>
      <div class="pet-acts">${acts.map((a) => `<button data-act="${a}" class="${hot(a) ? "hot" : ""}">${t("petA")[a]}</button>`).join("")}</div>
      ${stage === "egg" ? "" : `<h4 style="margin:14px 0 4px">${t("petHats")}</h4><div class="pet-hats">${HATS.map(hatCell).join("")}</div>`}
      <p class="hint" style="margin-top:10px">${t("petHint")}</p>
      <div class="btns"><button id="petRn">${t("petRename")}</button><button id="petClose">✕</button></div></div>`);
    if (sheet) sheet.scrollTop = y;
    $("petClose").onclick = closeSheet;
    $("petRn").onclick = async () => {
      const v = window.prompt(t("petRenameQ"), p.name || "Kamei");
      if (v && v.trim()) await act("rename", 0, v.trim().slice(0, 16));
    };
    document.querySelectorAll("#petSheet [data-act]").forEach((b) => b.onclick = async () => {
      const a = b.dataset.act;
      if (a === "play") return flyGame();
      b.disabled = true;
      const r = await act(a);
      if (r) { pop({ feed: "😋", wash: "🫧", sleep: "💤", wake: "☀️", cure: "💊" }[a] || "✨"); try { window.kameiVibe && window.kameiVibe(30); } catch (e) {} }
      b.disabled = false;
    });
    document.querySelectorAll("#petSheet [data-hat]").forEach((b) => b.onclick = async () => {
      const h = b.dataset.hat;
      if (p.level < (UNLOCK.hat[h] || 0)) return toast(t("petUnlockTheme", UNLOCK.hat[h]), 3000);
      await act("hat", 0, h);
    });
  }
  async function open() {
    if (!me()) { if (window.kameiAccount) window.kameiAccount.open(); return; }
    draw();
    await refresh();
    draw();
  }

  /* ---------- mini-game: catch the flies (20 s) ---------- */
  function flyGame() {
    closeSheet();
    const box = document.createElement("div");
    box.id = "flyGame";
    box.innerHTML = `<div class="hud"><span id="fgScore">0</span> 🪰 · <span id="fgTime">20</span>s<small>${t("petGameGo")}</small></div>${pet ? svg(Object.assign({}, pet, { xp: Math.max(pet.xp, 20), level: Math.max(pet.level, 8) }), 150, 190) : ""}`;
    document.body.appendChild(box);
    let score = 0, left = 20, over = false;
    const W = () => box.clientWidth, H = () => box.clientHeight;
    const rnd = (a, b) => a + Math.random() * (b - a);
    function spawn() {
      if (over) return;
      const f = document.createElement("div");
      f.className = "fly"; f.textContent = Math.random() < 0.12 ? "🦋" : "🪰";
      const gold = f.textContent === "🦋";
      f.style.left = rnd(10, W() - 66) + "px"; f.style.top = rnd(70, H() - 240) + "px";
      box.appendChild(f);
      let hops = 0;
      const move = () => { if (!f.isConnected) return; f.style.left = rnd(10, W() - 66) + "px"; f.style.top = rnd(70, H() - 240) + "px"; if (++hops > 1) setTimeout(() => f.remove(), 1400); else setTimeout(move, 1400); };
      setTimeout(move, 60);
      f.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (over || !f.isConnected) return;
        const r = f.getBoundingClientRect();
        f.remove(); score += gold ? 3 : 1;
        $("fgScore").textContent = score;
        const s = document.createElement("span"); s.className = "splat"; s.textContent = gold ? "🌟" : "💥";
        s.style.left = r.left + "px"; s.style.top = r.top + "px"; box.appendChild(s); setTimeout(() => s.remove(), 700);
        try { window.kameiVibe && window.kameiVibe(15); } catch (err) {}
      });
    }
    const sp = setInterval(spawn, 650); spawn(); spawn();
    const tm = setInterval(async () => {
      left--; $("fgTime").textContent = left;
      if (left > 0) return;
      over = true; clearInterval(sp); clearInterval(tm);
      box.querySelector(".hud").innerHTML = `${t("petScore", score)}<small>…</small>`;
      const r = await act("play", score);
      setTimeout(() => { box.remove(); open(); if (r && r.xp) toast(t("petXpGot", r.xp), 2500); }, 1400);
    }, 1000);
  }

  /* ---------- friends' pets ---------- */
  async function friend(p, el) {
    if (!el || !feat()) return;
    try {
      const r = await sb.rpc("pet_of", { uid: p.id });
      const fp = r.data;
      if (r.error || !fp || typeof fp.level !== "number") return;
      el.innerHTML = `<h3>${t("petFriend")}</h3><div class="pet-mini"><div class="pet-stage m-${moodOf(fp)}" style="width:70px;height:80px;margin:0;border-radius:14px;flex:none">${svg(fp, 70, 85)}</div>
        <div><b>${esc(fp.name || "Kamei")}</b> · ${t("petLv", fp.level)}<br><span class="hint">${t("petStage")[stageOf(fp)]} · ${t("petMood")[moodOf(fp)]}</span></div></div>`;
    } catch (e) {}
  }

  /* ---------- XP from the rest of the app ---------- */
  window.kameiPetEvent = async (what) => {
    if (!me() || !feat()) return;
    try {
      const r = await sb.rpc("pet_event", { what });
      if (r.error || !r.data) return;
      if (r.data.pet) store(r.data.pet);
      if (r.data.xp >= 10) toast(t("petXpGot", r.data.xp), 2200);
    } catch (e) {}
  };
  window.kameiPet = { open, refresh, friend, get: () => pet, level: cachedLevel, svg, moodOf, stageOf };

  // start: wait for the account, then refresh every 5 min and when the app comes back
  let wasIn = false;
  setInterval(() => { const now = !!me(); if (now !== wasIn) { wasIn = now; refresh(); } else paintBtn(); }, 3000);
  setInterval(refresh, 5 * 60000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") refresh(); });
  setTimeout(refresh, 1500);
})();

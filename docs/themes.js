/* Kamei Game Console — seasonal themes (switch automatically with the date) */
(function () {
  const INK = "#1d1d1d";
  function easter(y) { // Meeus/Jones/Butcher
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }
  const md = (d) => (d.getMonth() + 1) * 100 + d.getDate(); // e.g. Oct 30 -> 1030
  const between = (d, a, b) => { const v = md(d); return a <= b ? v >= a && v <= b : v >= a || v <= b; };

  const THEMES = {
    halloween: {
      when: (d) => between(d, 1015, 1103), acc: "#ff7a1a", acc2: "#ff4d00", font: "Creepster", size: 38, emoji: "🎃",
      bg: "radial-gradient(120% 45% at 50% -5%, rgba(255,122,26,.22), transparent 65%), radial-gradient(80% 40% at 100% 30%, rgba(124,58,237,.18), transparent 70%) #0c0812",
      greet: { fr: "JOYEUX HALLOWEEN 🎃", nl: "FIJNE HALLOWEEN 🎃", en: "HAPPY HALLOWEEN 🎃" },
      hat: "hat-witch", prop: "prop-pumpkin", particle: "p-bat", motion: "fly", corner: "web", icon: "Halloween", iconBg: ["#2b1442", "#ff7a1a"],
    },
    christmas: {
      when: (d) => between(d, 1201, 106), acc: "#ef4444", acc2: "#16a34a", font: "Mountains of Christmas", size: 38, emoji: "🎄",
      bg: "radial-gradient(120% 45% at 50% -5%, rgba(239,68,68,.20), transparent 65%), radial-gradient(80% 40% at 0% 40%, rgba(22,163,74,.16), transparent 70%) #08101a",
      greet: { fr: "JOYEUX NOËL 🎄", nl: "VROLIJK KERSTFEEST 🎄", en: "MERRY CHRISTMAS 🎄" },
      greetLate: { fr: "BONNE ANNÉE 🎆", nl: "GELUKKIG NIEUWJAAR 🎆", en: "HAPPY NEW YEAR 🎆" },
      hat: "hat-santa", prop: "prop-gift", particle: "p-snow", motion: "fall", corner: "holly", icon: "Christmas", iconBg: ["#0f2a1c", "#ef4444"],
    },
    valentine: {
      when: (d) => between(d, 207, 214), acc: "#ec4899", acc2: "#f43f5e", font: "Pacifico", size: 32, emoji: "💘",
      bg: "radial-gradient(120% 45% at 50% -5%, rgba(236,72,153,.25), transparent 65%) #140810",
      greet: { fr: "JOYEUSE SAINT-VALENTIN ❤️", nl: "FIJNE VALENTIJN ❤️", en: "HAPPY VALENTINE'S ❤️" },
      hat: "hat-hearts", prop: "prop-heart", particle: "p-heart", motion: "rise", corner: null, icon: "Valentine", iconBg: ["#3b0a24", "#ec4899"],
    },
    easter: {
      when: (d) => { const e = easter(d.getFullYear()); const diff = (d - e) / 86400000; return diff >= -7 && diff <= 1.99; },
      acc: "#facc15", acc2: "#a3e635", font: "Lilita One", size: 34, emoji: "🐣",
      bg: "radial-gradient(120% 45% at 50% -5%, rgba(250,204,21,.18), transparent 65%), radial-gradient(80% 40% at 100% 30%, rgba(163,230,53,.14), transparent 70%) #0d1110",
      greet: { fr: "JOYEUSES PÂQUES 🐣", nl: "VROLIJK PASEN 🐣", en: "HAPPY EASTER 🐣" },
      hat: "hat-bunny", prop: "prop-egg", particle: "p-flower", motion: "fall", corner: null, icon: "Easter", iconBg: ["#1f3a14", "#facc15"],
    },
    national: {
      when: (d) => between(d, 718, 722), acc: "#facc15", acc2: "#ef4444", font: "Lilita One", size: 34, emoji: "🇧🇪",
      bg: "linear-gradient(90deg, rgba(0,0,0,.25), rgba(250,204,21,.10), rgba(239,68,68,.12)) #0c0c0e",
      greet: { fr: "BONNE FÊTE NATIONALE 🇧🇪", nl: "FIJNE NATIONALE FEESTDAG 🇧🇪", en: "HAPPY BELGIAN NATIONAL DAY 🇧🇪" },
      hat: "hat-party", prop: "prop-fries", particle: "p-confetti", motion: "fall", corner: null, icon: "National", iconBg: ["#111111", "#facc15"],
    },
    summer: {
      when: (d) => between(d, 621, 831), acc: "#f97316", acc2: "#06b6d4", font: "Lilita One", size: 34, emoji: "☀️",
      bg: "radial-gradient(120% 45% at 50% -5%, rgba(249,115,22,.20), transparent 65%), radial-gradient(80% 40% at 100% 40%, rgba(6,182,212,.18), transparent 70%) #07121a",
      greet: { fr: "BONNES VACANCES ☀️", nl: "FIJNE VAKANTIE ☀️", en: "HAPPY HOLIDAYS ☀️" },
      hat: "hat-straw", prop: "prop-icecream", particle: "p-spark", motion: "fall", corner: null, icon: "Summer", iconBg: ["#0e3a4a", "#f97316"],
    },
  };

  /* ---------- Artwork (all drawn here, shared through <use>) ---------- */
  const ART = `
  <symbol id="hat-witch" viewBox="0 0 200 160"><g transform="rotate(-10 100 110)" stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <ellipse cx="100" cy="128" rx="96" ry="22" fill="#2b1442"/>
    <path d="M52 124 C 66 86 74 46 112 12 C 122 4 138 8 136 20 C 128 46 138 86 150 124 Z" fill="#3d1b63"/>
    <path d="M56 108 C 88 118 122 118 146 108 L 150 124 C 120 134 86 134 52 124 Z" fill="#ff7a1a"/>
    <rect x="88" y="110" width="22" height="16" rx="3" fill="#ffd166"/></g></symbol>
  <symbol id="hat-santa" viewBox="0 0 200 160"><g transform="rotate(-8 100 110)" stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <path d="M40 118 C 52 60 96 22 150 34 C 176 40 190 70 186 96 C 172 70 152 60 136 62 C 150 84 156 104 158 118 Z" fill="#dc2626"/>
    <circle cx="186" cy="100" r="15" fill="#f8fafc"/>
    <rect x="30" y="110" width="140" height="28" rx="14" fill="#f8fafc"/></g></symbol>
  <symbol id="hat-hearts" viewBox="0 0 200 160"><g stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <path d="M20 140 C 40 96 160 96 180 140" fill="none" stroke="#ec4899" stroke-width="10"/>
    <path d="M62 112 C 58 80 56 60 62 46 M138 112 C 142 80 144 60 138 46" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M62 50 C 40 30 30 58 62 72 C 94 58 84 30 62 50 Z" fill="#f43f5e"/>
    <path d="M138 50 C 116 30 106 58 138 72 C 170 58 160 30 138 50 Z" fill="#f43f5e"/></g></symbol>
  <symbol id="hat-bunny" viewBox="0 0 200 160"><g stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <path d="M70 128 C 52 80 46 20 66 10 C 86 4 92 70 92 126 Z" fill="#f8fafc"/><path d="M72 112 C 62 80 60 36 68 26 C 78 26 82 70 84 112 Z" fill="#f9a8d4" stroke="none"/>
    <path d="M130 128 C 148 80 160 24 140 12 C 118 6 108 70 108 126 Z" fill="#f8fafc"/><path d="M128 112 C 138 80 146 40 138 28 C 126 28 120 70 116 112 Z" fill="#f9a8d4" stroke="none"/>
    <path d="M24 140 C 50 112 150 112 176 140" fill="none" stroke="#a3e635" stroke-width="10"/></g></symbol>
  <symbol id="hat-party" viewBox="0 0 200 160"><g transform="rotate(8 100 120)" stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <path d="M60 132 L 104 10 L 148 132 Z" fill="#facc15"/>
    <path d="M74 94 L 134 94 L 141 113 L 67 113 Z" fill="#111111" stroke="none"/><path d="M81 74 L 127 74 L 134 94 L 74 94 Z" fill="#ef4444" stroke="none"/>
    <path d="M60 132 L 104 10 L 148 132 Z" fill="none"/><circle cx="104" cy="10" r="10" fill="#ef4444"/></g></symbol>
  <symbol id="hat-straw" viewBox="0 0 200 160"><g transform="rotate(-8 100 120)" stroke="${INK}" stroke-width="4" stroke-linejoin="round">
    <ellipse cx="100" cy="126" rx="98" ry="26" fill="#f5d38a"/>
    <path d="M56 122 C 56 70 144 70 144 122 Z" fill="#fbe3a6"/>
    <path d="M58 104 C 86 112 116 112 142 104 L 144 120 C 116 128 86 128 56 120 Z" fill="#06b6d4"/>
    <path d="M76 140 C 70 132 92 128 96 138" fill="none" stroke="#111" stroke-width="5"/>
    <g transform="translate(70 128)"><rect x="-26" y="-8" width="40" height="22" rx="10" fill="#111"/><rect x="20" y="-8" width="40" height="22" rx="10" fill="#111"/><path d="M14 0 h6" stroke="#111"/></g></g></symbol>

  <symbol id="prop-pumpkin" viewBox="0 0 100 92"><g stroke="${INK}" stroke-width="3">
    <path d="M48 20 C 46 10 52 4 58 2" fill="none" stroke="#3f6212" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="50" cy="56" rx="46" ry="34" fill="#ff7a1a"/><ellipse cx="50" cy="56" rx="26" ry="34" fill="#ff8c2e"/><ellipse cx="50" cy="56" rx="10" ry="34" fill="#ff9a3c"/>
    <path d="M28 46 l10 -10 l10 10 Z M52 46 l10 -10 l10 10 Z" fill="#ffd166"/>
    <path d="M26 64 C 36 78 64 78 74 64 L 66 68 L 60 62 L 54 70 L 46 62 L 40 70 L 34 62 Z" fill="#ffd166"/></g></symbol>
  <symbol id="prop-gift" viewBox="0 0 100 92"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
    <rect x="10" y="34" width="80" height="54" rx="6" fill="#16a34a"/><rect x="4" y="22" width="92" height="18" rx="5" fill="#22c55e"/>
    <rect x="44" y="22" width="12" height="66" fill="#facc15"/><path d="M50 22 C 30 0 14 14 32 22 Z M50 22 C 70 0 86 14 68 22 Z" fill="#facc15"/></g></symbol>
  <symbol id="prop-heart" viewBox="0 0 100 92"><path d="M50 84 C 10 58 0 34 14 18 C 28 4 46 10 50 24 C 54 10 72 4 86 18 C 100 34 90 58 50 84 Z" fill="#f43f5e" stroke="${INK}" stroke-width="3"/>
    <path d="M26 30 C 30 22 38 20 42 24" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/></symbol>
  <symbol id="prop-egg" viewBox="0 0 100 92"><g stroke="${INK}" stroke-width="3"><path d="M50 4 C 76 4 90 50 86 66 C 82 82 66 90 50 90 C 34 90 18 82 14 66 C 10 50 24 4 50 4 Z" fill="#a78bfa"/>
    <path d="M17 50 C 30 42 40 58 50 50 C 60 42 70 58 84 50" fill="none" stroke="#facc15" stroke-width="6"/><circle cx="36" cy="30" r="5" fill="#f9a8d4"/><circle cx="62" cy="26" r="5" fill="#a3e635"/><circle cx="50" cy="72" r="6" fill="#f9a8d4"/></g></symbol>
  <symbol id="prop-icecream" viewBox="0 0 100 92"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
    <path d="M32 46 L 50 90 L 68 46 Z" fill="#f5d38a"/><circle cx="40" cy="38" r="16" fill="#f9a8d4"/><circle cx="60" cy="38" r="16" fill="#86efac"/><circle cx="50" cy="22" r="16" fill="#fde68a"/>
    <circle cx="50" cy="6" r="5" fill="#ef4444"/></g></symbol>
  <symbol id="prop-fries" viewBox="0 0 100 92"><g stroke="${INK}" stroke-width="3" stroke-linejoin="round">
    <path d="M34 8 l4 40 M44 4 l2 44 M54 6 l0 42 M64 4 l-2 44 M72 10 l-6 40" stroke="#facc15" stroke-width="8" stroke-linecap="round"/>
    <path d="M22 40 L 78 40 L 68 90 L 32 90 Z" fill="#ef4444"/><path d="M30 52 L 70 52" stroke="#111" stroke-width="6"/><path d="M28 64 L 72 64" stroke="#facc15" stroke-width="6"/></g></symbol>

  <symbol id="p-bat" viewBox="0 0 100 50"><path class="w" d="M50 18 C 44 10 36 6 26 8 C 30 14 28 20 22 22 C 16 18 8 20 2 26 C 14 28 22 34 26 42 C 32 36 40 34 46 36 L 50 30 L 54 36 C 60 34 68 36 74 42 C 78 34 86 28 98 26 C 92 20 84 18 78 22 C 72 20 70 14 74 8 C 64 6 56 10 50 18 Z" fill="#050308"/></symbol>
  <symbol id="p-snow" viewBox="0 0 40 40"><g stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M20 2 V38 M2 20 H38 M7 7 L33 33 M33 7 L7 33"/></g></symbol>
  <symbol id="p-heart" viewBox="0 0 40 36"><path d="M20 34 C 4 24 0 14 6 7 C 12 1 19 4 20 10 C 21 4 28 1 34 7 C 40 14 36 24 20 34 Z" fill="#f472b6"/></symbol>
  <symbol id="p-flower" viewBox="0 0 40 40"><g fill="#fde68a"><circle cx="20" cy="9" r="8"/><circle cx="31" cy="20" r="8"/><circle cx="20" cy="31" r="8"/><circle cx="9" cy="20" r="8"/></g><circle cx="20" cy="20" r="6" fill="#f97316"/></symbol>
  <symbol id="p-confetti" viewBox="0 0 30 12"><rect width="10" height="12" fill="#111"/><rect x="10" width="10" height="12" fill="#facc15"/><rect x="20" width="10" height="12" fill="#ef4444"/></symbol>
  <symbol id="p-spark" viewBox="0 0 40 40"><path d="M20 0 C 22 14 26 18 40 20 C 26 22 22 26 20 40 C 18 26 14 22 0 20 C 14 18 18 14 20 0 Z" fill="#fde68a"/></symbol>`;

  const CSS = `
  body.themed { --bg: #0c0812; background: var(--tbg) no-repeat; }
  body.themed .slide h2, body.themed .empty .big { font-family: var(--tfont), "Press Start 2P", cursive; font-weight: 400; letter-spacing: .5px; font-size: var(--tsize); }
  body.themed .logo span { color: var(--tacc); }
  body.themed .fab { background: linear-gradient(135deg, var(--tacc), var(--tacc2)); color: #120a04; box-shadow: 0 10px 30px color-mix(in srgb, var(--tacc) 45%, transparent); }
  body.themed .mark { border-color: var(--tacc); }
  .particles { position: fixed; inset: 0; pointer-events: none; z-index: 3; overflow: hidden; }
  .particles svg { position: absolute; top: -40px; width: 18px; height: 18px; opacity: .85; }
  .particles.fly svg { width: 36px; height: 18px; top: 0; animation: tfly 16s linear infinite; }
  .particles.fly svg .w { animation: flap .35s ease-in-out infinite alternate; transform-origin: 50% 40%; }
  .particles.fall svg { animation: tfall linear infinite; }
  .particles.rise svg { top: auto; bottom: -40px; animation: trise linear infinite; }
  @keyframes tfly { 0% { transform: translate(-60px, 120px); } 25% { transform: translate(25vw, 60px); } 50% { transform: translate(55vw, 140px); } 75% { transform: translate(80vw, 70px); } 100% { transform: translate(110vw, 110px); } }
  @keyframes flap { from { transform: scaleY(1); } to { transform: scaleY(.35); } }
  @keyframes tfall { from { transform: translate(0, 0) rotate(0); } to { transform: translate(40px, 110vh) rotate(360deg); } }
  @keyframes trise { from { transform: translate(0, 0) scale(.8); opacity: .9; } to { transform: translate(-30px, -110vh) scale(1.1); opacity: 0; } }
  .tcorner { position: fixed; top: 0; right: 0; width: 120px; height: 120px; pointer-events: none; z-index: 2; opacity: .2; }`;

  // Manual choice (Settings) or automatic by date
  let choice = "auto";
  try { choice = localStorage.getItem("kamei-theme") || "auto"; } catch (e) {}
  const now = new Date();
  let id = null;
  if (choice === "auto") { for (const [k, th] of Object.entries(THEMES)) if (th.when(now)) { id = k; break; } }
  else if (THEMES[choice]) id = choice;

  window.KAMEI_THEMES = THEMES;
  window.kameiThemeChoice = choice;
  window.kameiTheme = id ? Object.assign({ id }, THEMES[id]) : null;
  window.kameiGreeting = (lang) => {
    const th = window.kameiTheme; if (!th) return null;
    const late = th.greetLate && now.getMonth() === 0;
    return (late ? th.greetLate : th.greet)[lang] || th.greet.fr;
  };
  window.kameiSetThemeChoice = (v) => { try { localStorage.setItem("kamei-theme", v); } catch (e) {} location.reload(); };

  function install() {
    const defs = document.querySelector("svg defs");
    if (defs) defs.insertAdjacentHTML("beforeend", ART);
    const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
    // Android launcher icon follows the theme (only inside the app)
    try {
      const N = window.KameiNative;
      let iconOn = true; try { iconOn = localStorage.getItem("kamei-theme-icon") !== "off"; } catch (e) {}
      if (N && N.setIcon) N.setIcon(iconOn && window.kameiTheme ? window.kameiTheme.icon : "Default");
    } catch (e) {}
    // web version: the tab / home-screen icon follows the theme too
    try {
      if (!window.KameiNative) {
        let iconOn = true; try { iconOn = localStorage.getItem("kamei-theme-icon") !== "off"; } catch (e) {}
        const ic = (iconOn && window.kameiTheme ? window.kameiTheme.icon : "Default").toLowerCase();
        const f = document.getElementById("favIcon"), a = document.getElementById("appleIcon");
        if (f) f.href = `icons/${ic}-192.png`; if (a) a.href = `icons/${ic}-180.png`;
      }
    } catch (e) {}
    const th = window.kameiTheme; if (!th) return;
    const b = document.body;
    b.classList.add("themed", "theme-" + th.id);
    if (th.id === "halloween") b.classList.add("halloween");
    b.style.setProperty("--tbg", th.bg); b.style.setProperty("--tacc", th.acc); b.style.setProperty("--tacc2", th.acc2);
    b.style.setProperty("--tfont", `"${th.font}"`); b.style.setProperty("--tsize", th.size + "px");
    const layer = document.createElement("div"); layer.className = "particles " + th.motion;
    const n = th.motion === "fly" ? 3 : 14;
    let html = "";
    for (let i = 0; i < n; i++) {
      const left = Math.round(Math.random() * 100), dur = (th.motion === "fly" ? 14 + i * 5 : 9 + Math.random() * 10).toFixed(1), delay = (-Math.random() * 18).toFixed(1);
      const size = th.motion === "fly" ? "" : `width:${10 + Math.round(Math.random() * 12)}px;height:${10 + Math.round(Math.random() * 12)}px;`;
      const pos = th.motion === "fly" ? `top:${10 + i * 14}%;` : `left:${left}%;`;
      html += `<svg viewBox="0 0 40 40" style="${pos}${size}animation-duration:${dur}s;animation-delay:${delay}s"><use href="#${th.particle}"/></svg>`;
    }
    layer.innerHTML = html; b.appendChild(layer);
    if (th.corner === "web") b.insertAdjacentHTML("beforeend", `<svg class="tcorner" viewBox="0 0 120 120" fill="none" stroke="#fff" stroke-width="1.2"><path d="M120 0 L0 0 M120 0 L20 60 M120 0 L60 110 M120 0 L120 120"/><path d="M90 0 Q 98 14 105 22 Q 112 30 120 34 M60 0 Q 76 28 90 46 Q 104 62 120 68 M30 0 Q 52 42 74 72 Q 96 98 120 102"/></svg>`);
    if (th.corner === "holly") b.insertAdjacentHTML("beforeend", `<svg class="tcorner" style="opacity:.9;width:84px;height:84px" viewBox="0 0 100 100"><g stroke="#1d1d1d" stroke-width="3"><path d="M100 10 C 80 4 66 18 60 34 C 74 30 86 36 92 46 C 96 34 100 22 100 10 Z" fill="#16a34a"/><path d="M96 0 C 84 16 70 20 56 16 C 62 28 58 40 50 46 C 64 46 80 36 96 0 Z" fill="#15803d"/><circle cx="62" cy="38" r="7" fill="#ef4444"/><circle cx="72" cy="46" r="7" fill="#ef4444"/></g></svg>`);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install); else install();
})();

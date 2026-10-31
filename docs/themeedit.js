/* Kamei Game Console — "Perso" theme editor: colours, Kamei's hat, decoration, particles, font, emoji */
(function () {
  Object.assign(I18N.fr, { themeCustom: "🎨 Perso…", teTitle: "Mon thème perso", teColor: "Couleur principale", teColor2: "Couleur 2", teHat: "Chapeau de Kamei",
    teProp: "Décoration", teParticle: "Particules", teFont: "Police des titres", teEmoji: "Emoji", teApply: "Appliquer", teNone: "Aucun" });
  Object.assign(I18N.nl, { themeCustom: "🎨 Eigen…", teTitle: "Mijn eigen thema", teColor: "Hoofdkleur", teColor2: "Kleur 2", teHat: "Hoed van Kamei",
    teProp: "Decoratie", teParticle: "Deeltjes", teFont: "Lettertype titels", teEmoji: "Emoji", teApply: "Toepassen", teNone: "Geen" });
  Object.assign(I18N.en, { themeCustom: "🎨 Custom…", teTitle: "My custom theme", teColor: "Main colour", teColor2: "Colour 2", teHat: "Kamei's hat",
    teProp: "Decoration", teParticle: "Particles", teFont: "Title font", teEmoji: "Emoji", teApply: "Apply", teNone: "None" });

  const COLORS = ["#8fc63f", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#ef4444", "#ff7a1a", "#facc15", "#e5e7eb"];
  const HATS = ["none", "hat-witch", "hat-santa", "hat-hearts", "hat-bunny", "hat-party", "hat-straw"];
  const PROPS = ["none", "prop-pumpkin", "prop-gift", "prop-heart", "prop-egg", "prop-fries", "prop-icecream"];
  const PARTS = ["none", "p-bat", "p-snow", "p-heart", "p-flower", "p-confetti", "p-spark"];
  const FONTS = ["Lilita One", "Press Start 2P", "Creepster", "Pacifico", "Mountains of Christmas"];
  const EMOJIS = ["🦎", "🎮", "🔥", "⭐", "👾", "🐉", "⚡", "🌙", "🍀", "💎", "🍕", "🎧"];

  const st = document.createElement("style");
  st.textContent = `.te-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 4px 0 10px; }
    .te-row button { border: 2px solid transparent; border-radius: 12px; background: #23233a; color: var(--text); padding: 6px; min-width: 44px; height: 44px; display: grid; place-items: center; font: 600 13px Inter, sans-serif; }
    .te-row button.on { border-color: var(--text); box-shadow: 0 0 0 2px var(--bg) inset; }
    .te-row button.sw { width: 40px; min-width: 40px; height: 40px; border-radius: 50%; }
    .te-row svg { width: 34px; height: 30px; }
    .te-row button.font { padding: 6px 10px; font-size: 15px; font-weight: 400; }
    .te-prev { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 16px; margin-bottom: 12px; }
    .te-prev svg { width: 70px; height: 70px; }
    .te-prev b { font-size: 24px; font-weight: 400; }`;
  document.head.appendChild(st);

  function load() { try { return JSON.parse(localStorage.getItem("kamei-theme-custom") || "{}"); } catch (e) { return {}; } }
  function open() {
    const c = Object.assign({ acc: "#8fc63f", acc2: "#22c55e", hat: "hat-party", prop: "none", particle: "p-spark", font: "Lilita One", emoji: "🦎" }, load());
    const U0 = window.kameiPetUnlock;
    if (U0) for (const k of ["hat", "prop", "particle"]) if (c[k] !== "none" && !U0.ok(k, c[k])) c[k] = k === "particle" ? "p-spark" : "none";
    const draw = () => {
      const U = window.kameiPetUnlock, kind = (key) => (key === "particle" ? "particle" : key);
      const locked = (key, v) => U && v !== "none" && !U.ok(kind(key), v);
      const row = (key, list, cell) => `<div class="te-row">${list.map((v) => `<button data-k="${key}" data-v="${esc(v)}" ${locked(key, v) ? `data-lock="${U.need(kind(key), v)}" style="opacity:.4"` : ""} class="${c[key] === v ? "on" : ""} ${key.startsWith("acc") ? "sw" : ""} ${key === "font" ? "font" : ""}" ${key.startsWith("acc") ? `style="background:${v}"` : ""} ${key === "font" ? `style="font-family:'${v}'"` : ""}>${cell(v)}</button>`).join("")}</div>`;
      const sym = (v, vb) => (v === "none" ? `<span style="font-size:12px">${t("teNone")}</span>` : `<svg viewBox="${vb}"><use href="#${v}"/></svg>`);
      openSheet(`<h3>${t("teTitle")}</h3>
        <div class="te-prev" style="background:radial-gradient(120% 90% at 30% 0%, ${c.acc}55, transparent 70%), radial-gradient(80% 80% at 100% 100%, ${c.acc2}44, transparent 70%) #0b0b12">
          <svg viewBox="0 -70 300 400"><use href="#kHead" x="20" y="0" width="260" height="320"/>${c.hat !== "none" ? `<use href="#${c.hat}" x="78" y="-74" width="200" height="160"/>` : ""}</svg>
          <b style="font-family:'${c.font}';color:${c.acc}">KAMEI ${c.emoji}</b></div>
        <h4>${t("teColor")}</h4>${row("acc", COLORS, () => "")}
        <h4>${t("teColor2")}</h4>${row("acc2", COLORS, () => "")}
        <h4>${t("teHat")}</h4>${row("hat", HATS, (v) => sym(v, "0 0 200 160"))}
        <h4>${t("teProp")}</h4>${row("prop", PROPS, (v) => sym(v, "0 0 100 92"))}
        <h4>${t("teParticle")}</h4>${row("particle", PARTS, (v) => sym(v, v === "p-bat" ? "0 0 100 50" : v === "p-confetti" ? "0 0 30 12" : v === "p-heart" ? "0 0 40 36" : "0 0 40 40"))}
        <h4>${t("teFont")}</h4>${row("font", FONTS, (v) => "Kamei")}
        <h4>${t("teEmoji")}</h4>${row("emoji", EMOJIS, (v) => `<span style="font-size:20px">${v}</span>`)}
        <div class="btns"><button id="teNo">${t("cancel")}</button><button class="ok" id="teOk" style="background:${c.acc}">${t("teApply")}</button></div>`);
      document.querySelectorAll("#sheet [data-k]").forEach((b) => b.onclick = () => { if (b.dataset.lock) return toast(t("petUnlockTheme", b.dataset.lock), 3000); c[b.dataset.k] = b.dataset.v; const y = document.getElementById("sheet").scrollTop; draw(); document.getElementById("sheet").scrollTop = y; });
      document.getElementById("teNo").onclick = closeSheet;
      document.getElementById("teOk").onclick = () => { try { localStorage.setItem("kamei-theme-custom", JSON.stringify(c)); } catch (e) {} window.kameiSetThemeChoice("custom"); };
    };
    draw();
  }
  window.kameiThemeEditor = open;
})();

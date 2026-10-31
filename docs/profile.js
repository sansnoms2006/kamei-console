/* Kamei Game Console — player profile: bio, favourite game, play stats and badges */
(function () {
  Object.assign(I18N.fr, {
    pfMine: "👤 Mon profil & badges", pfTitle: "Profil", pfBio: "Ta bio (150 caractères)", pfFav: "Ton jeu préféré", pfSave: "Enregistrer", pfSaved: "Profil enregistré",
    pfTime: "Temps de jeu", pfSessions: "Parties", pfConsoles: "Consoles", pfBadges: "Badges", pfNone: "Pas encore de badge… joue un peu 😉", pfFavL: "Jeu préféré",
    pfB: { first: "Première partie", h1: "1 h de jeu", h10: "10 h de jeu", h50: "50 h de jeu", c5: "5 consoles", c10: "10 consoles", d7: "7 jours de jeu", night: "Oiseau de nuit",
           g20: "20 jeux différents", marathon: "Marathon (2 h d'affilée)", trade: "Échangeur Pokémon", friends: "5 amis", weekend: "Gamer du dimanche", retro: "Vétéran (Atari, NES…)" },
  });
  Object.assign(I18N.nl, {
    pfMine: "👤 Mijn profiel & badges", pfTitle: "Profiel", pfBio: "Je bio (150 tekens)", pfFav: "Je favoriete spel", pfSave: "Opslaan", pfSaved: "Profiel opgeslagen",
    pfTime: "Speeltijd", pfSessions: "Sessies", pfConsoles: "Consoles", pfBadges: "Badges", pfNone: "Nog geen badge… speel wat 😉", pfFavL: "Favoriete spel",
    pfB: { first: "Eerste sessie", h1: "1 u gespeeld", h10: "10 u gespeeld", h50: "50 u gespeeld", c5: "5 consoles", c10: "10 consoles", d7: "7 speeldagen", night: "Nachtuil",
           g20: "20 verschillende spellen", marathon: "Marathon (2 u aan één stuk)", trade: "Pokémon-ruiler", friends: "5 vrienden", weekend: "Zondagsgamer", retro: "Veteraan (Atari, NES…)" },
  });
  Object.assign(I18N.en, {
    pfMine: "👤 My profile & badges", pfTitle: "Profile", pfBio: "Your bio (150 characters)", pfFav: "Your favourite game", pfSave: "Save", pfSaved: "Profile saved",
    pfTime: "Play time", pfSessions: "Sessions", pfConsoles: "Consoles", pfBadges: "Badges", pfNone: "No badge yet… go play 😉", pfFavL: "Favourite game",
    pfB: { first: "First session", h1: "1 h played", h10: "10 h played", h50: "50 h played", c5: "5 consoles", c10: "10 consoles", d7: "7 days of play", night: "Night owl",
           g20: "20 different games", marathon: "Marathon (2 h in a row)", trade: "Pokémon trader", friends: "5 friends", weekend: "Sunday gamer", retro: "Veteran (Atari, NES…)" },
  });
  const ICONS = { first: "🎮", h1: "⏱️", h10: "🔥", h50: "🏆", c5: "🌍", c10: "🧭", d7: "📅", night: "🦉", g20: "📚", marathon: "⚡", trade: "🔁", friends: "👥", weekend: "🛋️", retro: "👾" };
  const RETRO = ["nes", "a2600", "a7800", "a5200", "coleco", "c64", "zx", "zx81", "vic20", "pet"];
  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  const st = document.createElement("style");
  st.textContent = `.pfstats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 10px 0; }
    .pfstats div { background: rgba(255,255,255,.05); border-radius: 12px; padding: 8px; text-align: center; }
    .pfstats b { display: block; font-size: 16px; color: var(--tacc, #8fc63f); } .pfstats small { color: var(--muted); font-size: 11px; }
    .pfbadges { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 8px; margin: 8px 0 12px; }
    .pfbadges div { text-align: center; padding: 10px 4px; border-radius: 14px; background: color-mix(in srgb, var(--tacc, #8fc63f) 16%, #1b1b2b); font-size: 11px; line-height: 1.25; }
    .pfbadges div i { display: block; font-style: normal; font-size: 26px; margin-bottom: 4px; }
    .pfbadges div.off { background: rgba(255,255,255,.03); color: var(--muted); filter: grayscale(1); opacity: .5; }
    .pfbio { font-size: 14px; color: var(--text); margin: 4px 0 2px; white-space: pre-wrap; }`;
  document.head.appendChild(st);

  async function stats(uid, self) {
    const r = await sb.from("sessions").select("game,system,minutes,started_at").eq("user_id", uid).order("started_at", { ascending: false }).limit(500);
    const list = r.data || [];
    const s = { count: list.length, min: 0, sys: 0, games: 0, days: 0, night: false, maxSession: 0, weekend: 0, retro: false, trades: 0, friends: 0, top: null };
    const sys = new Set(), games = {}, days = new Set();
    for (const x of list) {
      const m = x.minutes || 0, d = new Date(x.started_at);
      s.min += m; s.maxSession = Math.max(s.maxSession, m); sys.add(x.system); games[x.game] = (games[x.game] || 0) + (m || 1);
      days.add(d.toDateString()); if (d.getHours() < 5) s.night = true; if (d.getDay() === 0) s.weekend++;
      if (RETRO.includes(x.system)) s.retro = true;
    }
    s.sys = sys.size; s.games = Object.keys(games).length; s.days = days.size;
    s.top = Object.entries(games).sort((a, b) => b[1] - a[1])[0];
    if (self) {
      try { const t1 = await sb.from("trades").select("id", { count: "exact", head: true }).or(`from_user.eq.${uid},to_user.eq.${uid}`).eq("status", "accepted"); s.trades = t1.count || 0; } catch (e) {}
      try { const f = await sb.from("friendships").select("friend_id", { count: "exact", head: true }).eq("user_id", uid); s.friends = f.count || 0; } catch (e) {}
    }
    return s;
  }
  function badges(s, self) {
    const rules = { first: s.count >= 1, h1: s.min >= 60, h10: s.min >= 600, h50: s.min >= 3000, c5: s.sys >= 5, c10: s.sys >= 10, d7: s.days >= 7, night: s.night,
                    g20: s.games >= 20, marathon: s.maxSession >= 120, weekend: s.weekend >= 5, retro: s.retro, trade: s.trades >= 1, friends: s.friends >= 5 };
    if (!self) { delete rules.trade; delete rules.friends; }
    return Object.entries(rules).map(([k, on]) => ({ k, on }));
  }
  function html(p, s, self) {
    const B = t("pfB"), list = badges(s, self).filter((b) => self || b.on);
    const fav = p.fav_game || (s.top ? s.top[0] : null);
    return `${p.bio ? `<p class="pfbio">${esc(p.bio)}</p>` : ""}
      ${fav ? `<p class="hint" style="margin:2px 0 0">⭐ ${t("pfFavL")} : <b style="color:var(--text)">${esc(fav)}</b></p>` : ""}
      <div class="pfstats"><div><b>${t("minutes", s.min)}</b><small>${t("pfTime")}</small></div><div><b>${s.count}</b><small>${t("pfSessions")}</small></div><div><b>${s.sys}</b><small>${t("pfConsoles")}</small></div></div>
      <h4>🏅 ${t("pfBadges")} · ${list.filter((b) => b.on).length}</h4>
      ${list.length ? `<div class="pfbadges">${list.map((b) => `<div class="${b.on ? "" : "off"}"><i>${ICONS[b.k]}</i>${B[b.k]}</div>`).join("")}</div>` : `<p class="hint">${t("pfNone")}</p>`}`;
  }
  /* inside a friend's page */
  async function fill(p, el) {
    if (!el || !sb) return;
    try { el.innerHTML = html(p, await stats(p.id, false), false); } catch (e) {}
  }
  /* my own profile (editable) */
  async function mine() {
    const m = me(); if (!m || !sb) return;
    openSheet(`<div class="acc-head">${window.kameiAvatar(m, 48)}<div><h3>${esc(m.pseudo)}</h3><p class="hint" style="margin:0">${t("pfTitle")}</p></div></div><p class="hint">…</p>`);
    const s = await stats(m.id, true);
    openSheet(`<div class="acc-head">${window.kameiAvatar(m, 48)}<div><h3>${esc(m.pseudo)}</h3><p class="hint" style="margin:0">${t("pfTitle")}</p></div></div>
      <input id="pfBio" maxlength="150" placeholder="${t("pfBio")}" value="${esc(m.bio || "")}">
      <input id="pfFav" maxlength="60" placeholder="${t("pfFav")}" value="${esc(m.fav_game || "")}">
      <div class="btns" style="margin-bottom:8px"><button id="pfBack">←</button><button class="ok" id="pfOk">${t("pfSave")}</button></div>
      ${html(m, s, true)}`);
    document.getElementById("pfBack").onclick = () => window.kameiFriendsSheet ? window.kameiFriendsSheet() : closeSheet();
    document.getElementById("pfOk").onclick = async () => {
      const bio = document.getElementById("pfBio").value.trim() || null, fav = document.getElementById("pfFav").value.trim() || null;
      const r = await sb.from("profiles").update({ bio, fav_game: fav }).eq("id", m.id);
      if (r.error) return toast(r.error.message, 4000);
      m.bio = bio; m.fav_game = fav; try { localStorage.setItem("kamei-me", JSON.stringify(m)); } catch (e) {}
      toast(t("pfSaved")); mine();
    };
  }
  window.kameiProfile = { fill, mine };
})();

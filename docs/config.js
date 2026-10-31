/* Kamei Game Console — live app settings from Supabase (app_config):
   which features the public can see (the admin always sees everything) + the announcement banner */
(function () {
  Object.assign(I18N.fr, { annClose: "Fermer" });
  Object.assign(I18N.nl, { annClose: "Sluiten" });
  Object.assign(I18N.en, { annClose: "Close" });
  const sb = window.kameiSB, me = () => window.kameiMe && window.kameiMe();
  let cfg = {}; try { cfg = JSON.parse(localStorage.getItem("kamei-cfg") || "{}"); } catch (e) {}
  const DEFAULT_OFF = ["tv"];   // features hidden until the admin turns them on

  window.kameiFeature = (k) => {
    if (me() && me().is_admin) return true;
    const f = cfg.features || {};
    if (k in f) return f[k] !== false;
    return !DEFAULT_OFF.includes(k);
  };
  window.kameiConfig = () => cfg;

  const st = document.createElement("style");
  st.textContent = `#annBar { display: flex; gap: 10px; align-items: flex-start; margin: 4px 16px 10px; padding: 12px 14px; border-radius: 16px;
      background: linear-gradient(135deg, color-mix(in srgb, var(--tacc, #8fc63f) 25%, #1b1b2b), #15151f); border: 1.5px solid color-mix(in srgb, var(--tacc, #8fc63f) 55%, transparent); }
    #annBar b { flex: 1; font-weight: 600; font-size: 14px; white-space: pre-wrap; }
    #annBar button { background: none; border: 0; color: var(--muted); font-size: 18px; padding: 0 2px; }
    .adgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 6px 0 10px; }
    .adgrid button { position: relative; border: 0; border-radius: 12px; padding: 12px 8px; background: #23233a; color: var(--text); font: 700 13px Inter, sans-serif; }
    .adgrid .unread { position: absolute; top: -6px; right: -6px; }`;
  document.head.appendChild(st);

  function apply() {
    const show = (id, on) => { const el = document.getElementById(id); if (el) el.style.display = on ? "" : "none"; };
    show("catBtn", window.kameiFeature("catalogue"));
    show("npBtn", window.kameiFeature("netplay"));
    // announcement banner (top of the Consoles tab)
    let seen = ""; try { seen = localStorage.getItem("kamei-ann-closed") || ""; } catch (e) {}
    let bar = document.getElementById("annBar");
    if (cfg.announce && cfg.announce_at !== seen) {
      if (!bar) { bar = document.createElement("div"); bar.id = "annBar"; const w = document.querySelector(".wrap"); w.parentNode.insertBefore(bar, w); }
      bar.innerHTML = `<span>📢</span><b>${esc(cfg.announce)}</b><button aria-label="${t("annClose")}">✕</button>`;
      bar.querySelector("button").onclick = () => { try { localStorage.setItem("kamei-ann-closed", cfg.announce_at); } catch (e) {} bar.remove(); };
    } else if (bar) bar.remove();
    try { window.kameiNav && window.kameiNav.relabel(); } catch (e) {}
    document.dispatchEvent(new Event("kamei-config"));
  }
  async function load() {
    if (!sb) return apply();
    try {
      const r = await sb.from("app_config").select("features,announce,announce_at").eq("id", 1).maybeSingle();
      if (!r.error && r.data) {
        const before = cfg.announce_at;
        cfg = Object.assign({}, cfg, r.data);
        try { localStorage.setItem("kamei-cfg", JSON.stringify(cfg)); } catch (e) {}
        // new announcement while the app is open: a notification card too
        let known = null; try { known = localStorage.getItem("kamei-ann-known"); } catch (e) {}
        if (cfg.announce && cfg.announce_at && cfg.announce_at !== known) {
          try { localStorage.setItem("kamei-ann-known", cfg.announce_at); } catch (e) {}
          if (known !== null && before !== undefined && !(me() && me().is_admin) && window.kameiNotify) window.kameiNotify("📢 Kamei", cfg.announce);
        }
      }
    } catch (e) {}
    apply();
  }
  window.kameiConfigReload = load;
  apply();
  setTimeout(load, 1500);
  setInterval(() => { if (document.visibilityState === "visible") load(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") load(); });
})();

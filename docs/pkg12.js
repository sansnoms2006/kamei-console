/* Kamei Game Console — Pokémon trades for Game Boy games (gen 1: Red/Blue/Yellow, gen 2: Gold/Silver/Crystal).
   Both generations trade together like the real Time Capsule. International (non-Japanese) saves only.
   Offsets and rules follow PKHeX (SAV1 / SAV2 / PK1.ConvertToPK2 / PK2.ConvertToPK1). */
(function (root) {
  const P = root.PKX; if (!P) return;
  const D = root.PKDATA;
  const G1INT = D.g1Index;                                   // national -> gen 1 internal index
  const g1Nat = {}; G1INT.forEach((int, nat) => { if (nat) g1Nat[int] = nat; });
  const HP1 = [0, 45, 60, 80, 39, 58, 78, 44, 59, 79, 45, 50, 60, 40, 45, 65, 40, 63, 83, 30, 55, 40, 65, 35, 60, 35, 60, 50, 75, 55, 70, 90, 46, 61, 81, 70, 95, 38, 73, 115, 140, 40, 75, 45, 60, 75, 35, 60, 60, 70, 10, 35, 40, 65, 50, 80, 40, 65, 55, 90, 40, 65, 90, 25, 40, 55, 70, 80, 90, 50, 65, 80, 40, 80, 40, 55, 80, 50, 65, 90, 95, 25, 50, 52, 35, 60, 65, 90, 80, 105, 30, 50, 30, 45, 60, 35, 60, 85, 30, 55, 40, 60, 60, 95, 50, 60, 50, 50, 90, 40, 65, 80, 105, 250, 65, 105, 30, 55, 45, 80, 30, 60, 40, 70, 65, 65, 65, 65, 75, 20, 95, 130, 48, 55, 130, 65, 65, 65, 35, 70, 30, 60, 80, 160, 90, 90, 90, 41, 61, 91, 106, 100];                                         // gen 1 base HP (for the HP of Pokémon sent back to gen 1)
  const NAMES = {"2":{"64":"8A80838081918050","65":"808B808A8099808C50","67":"8C8082878E8A8450","68":"8C808287808C8F50","75":"86918095848B849150","76":"868E8B848C50","93":"8780948D93849150","94":"86848D86809150","61":"8F8E8B88968788918B50","186":"8F8E8B88938E848350","79":"928B8E968F8E8A8450","199":"928B8E968A888D8650","95":"8E8D889750","208":"929384848B889750","123":"9282989387849150","212":"928288998E9150","117":"92848083918050","230":"8A888D8683918050","137":"8F8E9198868E8D50","233":"8F8E9198868E8DF850"},"3":{"64":"8A80838081918050","65":"808B808A8099808C50","67":"8C8082878E8F84949150","68":"8C80828A8E868D84949150","75":"86918095808B808D828750","76":"86918E8B848C50","93":"928F84829391948C50","94":"8482938E8F8B80928C8050","61":"9384938091938450","186":"9380918F80948350","79":"91808C8E8B8E929250","199":"918E888680838050","95":"8E8D889750","208":"929384848B889750","123":"888D928482809384949150","212":"82889980988E9750","117":"87988F8E8284808D50","230":"87988F8E918E8850","137":"8F8E9198868E8D50","233":"8F8E9198868E8DF850"},"4":{"64":"8A80838081918050","65":"808B808A8099808C50","67":"8C8082878E8A8450","68":"8C808287808C8F50","75":"86918095848B849150","76":"868E8B848C50","93":"8780948D93849150","94":"86848D86809150","61":"8F8E8B88968788918B50","186":"8F8E8B88938E848350","79":"928B8E968F8E8A8450","199":"928B8E968A888D8650","95":"8E8D889750","208":"929384848B889750","123":"9282989387849150","212":"928288998E9150","117":"92848083918050","230":"8A888D8683918050","137":"8F8E9198868E8D50","233":"8F8E9198868E8DF850"},"5":{"64":"8A80838081918050","65":"92888C92808B8050","67":"8C809282878E828A50","68":"8C8082878E8C848850","75":"86848E918E8A50","76":"86848E96809950","93":"808B8F8E8B8B8E50","94":"86848D86809150","61":"9094808F9493998850","186":"909480978E50","79":"858B84868C8E8D50","199":"8B809282878E8A888D8650","95":"8E8D889750","208":"929380878B8E9250","123":"928882878B8E9150","212":"92828784918E9750","117":"9284848C8E8D50","230":"9284848391808A888D8650","137":"8F8E9198868E8D50","233":"8F8E9198868E8DF850"},"7":{"64":"8A80838081918050","65":"808B808A8099808C50","67":"8C8082878E8A8450","68":"8C808287808C8F50","75":"86918095848B849150","76":"868E8B848C50","93":"8780948D93849150","94":"86848D86809150","61":"8F8E8B88968788918B50","186":"8F8E8B88938E848350","79":"928B8E968F8E8A8450","199":"928B8E968A888D8650","95":"8E8D889750","208":"929384848B889750","123":"9282989387849150","212":"928288998E9150","117":"92848083918050","230":"8A888D8683918050","137":"8F8E9198868E8D50","233":"8F8E9198868E8DF850"}};                                    // species names in the game Boy charset, per language
  const IT2 = { kingsrock: 82, everstone: 112, metalcoat: 143, dragonscale: 151, upgrade: 172 };
  const NL = 11, CAP = 20;
  const E = { 1: 33, 2: 32 };

  /* ---------- items <-> gen 1 catch rate (Time Capsule) ---------- */
  const HELD = [0x3F, 0xFF, 0xFF, 0xFD, 0xFF, 0xDF, 0x3B, 0xD2, 0x03, 0xFF, 0xFF, 0xFB, 0xEF, 0xFF, 0xE7, 0x7E,
                0x18, 0x9C, 0xC5, 0xF1, 0xFB, 0x77, 0xF0, 0xBF, 0xF7, 0xFF, 0xFF, 0xEF, 0xFF, 0xFF, 0x07, 0x00];
  const isHeld = (v) => ((HELD[v >> 3] >> (v & 7)) & 1) === 1;
  const teru = (v) => (v === 0x19 ? 0x92 : v === 0x2D ? 0x53 : v === 0x32 ? 0xAE : [0x5A, 0x64, 0x78, 0x87, 0xBE, 0xC3, 0xDC, 0xFA, 0xFF].includes(v) ? 0xAD : v);
  const itemFuture1 = (rate) => (isHeld(rate) ? rate : teru(rate));

  /* ---------- Pokémon lists (box = count, species list, entries, OT names, nicknames) ---------- */
  const listOk = (d, o, cap) => d[o] <= cap && d[o + 1 + d[o]] === 0xFF;
  function readList(d, o, gen) {
    const n = d[o], e = E[gen], out = [];
    const ent = o + CAP + 2, ots = ent + CAP * e, nks = ots + CAP * NL;
    for (let i = 0; i < n; i++) out.push({ sp: d[o + 1 + i], entry: d.slice(ent + i * e, ent + (i + 1) * e), ot: d.slice(ots + i * NL, ots + (i + 1) * NL), nick: d.slice(nks + i * NL, nks + (i + 1) * NL) });
    return out;
  }
  function writeList(d, o, gen, arr, oldCount) {
    const e = E[gen], ent = o + CAP + 2, ots = ent + CAP * e, nks = ots + CAP * NL;
    d[o] = arr.length;
    arr.forEach((m, i) => { d[o + 1 + i] = m.sp; d.set(m.entry, ent + i * e); d.set(m.ot, ots + i * NL); d.set(m.nick, nks + i * NL); });
    d[o + 1 + arr.length] = 0xFF;
    for (let i = arr.length; i < Math.min(oldCount, CAP); i++) {   // clear the slot that was freed
      d.fill(0, ent + i * e, ent + (i + 1) * e); d.fill(0x50, ots + i * NL, ots + (i + 1) * NL); d.fill(0x50, nks + i * NL, nks + (i + 1) * NL);
      if (i > arr.length) d[o + 1 + i] = 0;
    }
  }

  /* ---------- the payload sent between players: [gen, flags, entry, OT name, nickname] ---------- */
  function pack(gen, m) {
    const b = new Uint8Array(2 + E[gen] + NL * 2);
    b[0] = gen; b[1] = gen === 2 && m.sp === 0xFD ? 1 : 0;
    b.set(m.entry, 2); b.set(m.ot, 2 + E[gen]); b.set(m.nick, 2 + E[gen] + NL);
    return b;
  }
  function unpack(b) {
    const gen = b[0];
    if ((gen !== 1 && gen !== 2) || b.length !== 2 + E[gen] + NL * 2) return null;
    return { gen, egg: !!(b[1] & 1), entry: b.slice(2, 2 + E[gen]), ot: b.slice(2 + E[gen], 2 + E[gen] + NL), nick: b.slice(2 + E[gen] + NL) };
  }
  function info(b) {
    const u = b && unpack(b); if (!u) return null;
    const e = u.entry;
    const species = u.gen === 1 ? g1Nat[e[0]] : e[0];
    if (!species || species > 251) return null;
    const level = u.gen === 1 ? e[3] : e[31];
    const dv = u.gen === 1 ? [e[27], e[28]] : [e[21], e[22]];
    const atk = dv[0] >> 4, def = dv[0] & 15, spe = dv[1] >> 4, spc = dv[1] & 15;
    const shiny = u.gen === 2 && def === 10 && spe === 10 && spc === 10 && [2, 3, 6, 7, 10, 11, 14, 15].includes(atk);
    return { species, level: level || 1, shiny, egg: u.egg, gen: u.gen, item: u.gen === 2 ? e[1] : itemFuture1(e[7]) };
  }

  /* ---------- gen 1 <-> gen 2 conversion ---------- */
  function hpStat(nat, e1, level) {
    const hpDv = ((e1[27] >> 4) & 1) << 3 | ((e1[27] & 1) << 2) | (((e1[28] >> 4) & 1) << 1) | (e1[28] & 1);
    const sx = (e1[17] << 8) | e1[18];
    return Math.floor((((HP1[nat] + hpDv) * 2 + Math.floor(Math.ceil(Math.sqrt(sx)) / 4)) * level) / 100) + level + 10;
  }
  function convert(b, gen) {
    const u = unpack(b); if (!u) throw new Error("bad pokemon");
    if (u.gen === gen) return u;
    if (gen === 2) {                                              // gen 1 -> gen 2
      const e1 = u.entry, e2 = new Uint8Array(32), nat = g1Nat[e1[0]];
      e2[0] = nat; e2.set(e1.slice(7, 33), 1);
      e2[1] = itemFuture1(e1[7]); e2[27] = 70; e2[31] = e1[3];
      return { gen: 2, egg: false, entry: e2, ot: u.ot, nick: u.nick };
    }
    const e2 = u.entry, nat = e2[0];                              // gen 2 -> gen 1
    if (u.egg || nat < 1 || nat > 151) throw new Error("species not in this game");
    const e1 = new Uint8Array(33);
    e1.set(e2.slice(1, 27), 7);
    e1[0] = G1INT[nat];
    const ty = D.g1Types[nat] || [0, 0]; e1[5] = ty[0]; e1[6] = ty[1];
    const item = e2[1]; e1[7] = isHeld(item) || item === D.g1Catch[nat] ? item : D.g1Catch[nat];
    e1[3] = e2[31] || 1;
    // moves that don't exist in gen 1 (> 165) are forgotten
    const moves = [], pps = [];
    for (let i = 0; i < 4; i++) if (e1[8 + i] && e1[8 + i] <= 165) { moves.push(e1[8 + i]); pps.push(e1[29 + i]); }
    if (!moves.length) throw new Error("species not in this game");
    for (let i = 0; i < 4; i++) { e1[8 + i] = moves[i] || 0; e1[29 + i] = pps[i] || 0; }
    const hp = hpStat(nat, e1, e1[3]); e1[1] = hp >> 8; e1[2] = hp & 255;
    return { gen: 1, egg: false, entry: e1, ot: u.ot, nick: u.nick };
  }

  /* ---------- save files ---------- */
  const sum8 = (d, a, n) => { let s = 0; for (let i = 0; i < n; i++) s = (s + d[a + i]) & 255; return (~s) & 255; };
  const sum16 = (d, a, end) => { let s = 0; for (let i = a; i <= end; i++) s = (s + d[i]) & 0xffff; return s; };
  const u16 = (d, o) => d[o] | (d[o + 1] << 8);
  function detect(d) {
    if (d.length < 0x8000 || d.length > 0x8100) return null;
    if (listOk(d, 0x2F2C, 6) && listOk(d, 0x30C0, CAP) && d[0x3523] === sum8(d, 0x2598, 0x3523 - 0x2598))
      return { gen: 1, key: "RBY", label: "Rouge / Bleu / Jaune", dex: [0x25A3, 0x25B6], cur: 0x30C0, idx: 0x284C, boxes: 12 };
    if (listOk(d, 0x288A, 6) && listOk(d, 0x2D6C, CAP) && sum16(d, 0x2009, 0x2D68) === u16(d, 0x2D69))
      return { gen: 2, key: "GS", label: "Or / Argent", dex: [0x2A4C, 0x2A6C], cur: 0x2D6C, idx: 0x2724, boxes: 14, end: 0x2D68, pos: [0x2D69, 0x7E6D] };
    if (listOk(d, 0x2865, 6) && listOk(d, 0x2D10, CAP) && sum16(d, 0x2009, 0x2B82) === u16(d, 0x2D0D))
      return { gen: 2, key: "C", label: "Cristal", dex: [0x2A27, 0x2A47], cur: 0x2D10, idx: 0x2700, boxes: 14, end: 0x2B82, pos: [0x2D0D, 0x1F0D] };
    return null;
  }
  function open(raw) {
    const data = new Uint8Array(raw);
    const t = detect(data); if (!t) return null;
    const gen = t.gen, size = gen === 1 ? 0x462 : 0x450, half = gen === 1 ? 6 : 7;
    const bank = (b) => (b < half ? 0x4000 + b * size : 0x6000 + (b - half) * size);
    const curBox = () => (gen === 1 ? data[t.idx] & 0x7F : data[t.idx]);
    const inited = () => (gen === 1 ? (data[t.idx] & 0x80) !== 0 : true);
    const touchedBanks = new Set(); let mainChanged = false;
    // where a box really lives: the current box is played from its own copy
    function where(b) {
      if (b === curBox()) return listOk(data, t.cur, CAP) ? t.cur : null;
      if (!inited()) return null;
      return listOk(data, bank(b), CAP) ? bank(b) : null;
    }
    function save(b, arr, oldCount) {
      const o = where(b);
      writeList(data, o, gen, arr, oldCount);
      if (o === t.cur) {
        if (gen === 1) mainChanged = true;
        if (inited() && listOk(data, bank(b), CAP)) { writeList(data, bank(b), gen, arr, data[bank(b)]); touchedBanks.add(b < half ? 0x4000 : 0x6000); }
      } else touchedBanks.add(b < half ? 0x4000 : 0x6000);
    }
    const order = () => { const c = curBox(), l = [c]; for (let b = 0; b < t.boxes; b++) if (b !== c) l.push(b); return l; };
    const s = {
      family: "g12", game: t.key, label: t.label, data, maxSpecies: gen === 1 ? 151 : 251, gen,
      info,
      list() {
        const out = [];
        for (let b = 0; b < t.boxes; b++) {
          const o = where(b); if (o === null) continue;
          readList(data, o, gen).forEach((m, i) => { const inf = info(pack(gen, m)); if (inf) out.push(Object.assign({ box: b, slot: i }, inf)); });
        }
        return out;
      },
      take(b, sl) {
        const o = where(b); if (o === null) throw new Error("empty slot");
        const arr = readList(data, o, gen);
        if (!arr[sl]) throw new Error("empty slot");
        const out = pack(gen, arr[sl]);
        arr.splice(sl, 1); save(b, arr, arr.length + 1);
        return out;
      },
      put(bytes) {
        const inf = info(bytes); if (!inf) throw new Error("bad pokemon");
        if (inf.species > s.maxSpecies) throw new Error("species not in this game");
        const m = convert(bytes, gen);
        const sp = gen === 1 ? m.entry[0] : (m.egg ? 0xFD : m.entry[0]);
        for (const b of order()) {
          const o = where(b); if (o === null) continue;
          const arr = readList(data, o, gen);
          if (arr.length >= CAP) continue;
          arr.push({ sp, entry: m.entry, ot: m.ot, nick: m.nick }); save(b, arr, arr.length - 1);
          if (!m.egg) {                                        // the Pokédex registers it, like a real trade
            const nat = inf.species, by = (nat - 1) >> 3, bit = 1 << ((nat - 1) & 7);
            for (const o2 of t.dex) if (!(data[o2 + by] & bit)) { data[o2 + by] |= bit; mainChanged = true; }
          }
          return { box: b, slot: arr.length - 1 };
        }
        throw new Error("boxes full");
      },
      bytes() {
        if (gen === 1) {
          for (const bk of touchedBanks) {
            data[bk + 0x1A4C] = sum8(data, bk, 0x1A4C);
            for (let i = 0; i < 6; i++) data[bk + 0x1A4D + i] = sum8(data, bk + i * size, size);
          }
          data[0x3523] = sum8(data, 0x2598, 0x3523 - 0x2598);
        } else if (mainChanged) {
          const c = sum16(data, 0x2009, t.end);
          for (const p of t.pos) { data[p] = c & 255; data[p + 1] = c >> 8; }
          if (t.key === "C") data.copyWithin(0x1209, 0x2009, 0x2009 + 0xB7A);
          else {
            data.copyWithin(0x15C7, 0x2009, 0x222F); data.copyWithin(0x3D69, 0x222F, 0x23D9); data.copyWithin(0x0C6B, 0x23D9, 0x2856);
            data.copyWithin(0x7E39, 0x2856, 0x288A); data.copyWithin(0x10E8, 0x288A, 0x2D69);
          }
        }
        return data;
      },
    };
    return s;
  }

  /* ---------- trade evolutions (Kadabra, Machoke, Graveler, Haunter; gen 2 items) ---------- */
  const EVO = { 64: [65], 67: [68], 75: [76], 93: [94],
    61: [186, "kingsrock"], 79: [199, "kingsrock"], 95: [208, "metalcoat"], 123: [212, "metalcoat"], 117: [230, "dragonscale"], 137: [233, "upgrade"] };
  const hex = (h) => new Uint8Array((h.match(/.{2}/g) || []).map((x) => parseInt(x, 16)));
  function evolve12(bytes, partner, maxSpecies) {
    const tgen = maxSpecies <= 151 ? 1 : 2;
    let m; try { m = convert(bytes, tgen); } catch (e) { return null; }
    if (m.egg) return null;
    const e = m.entry, species = tgen === 1 ? g1Nat[e[0]] : e[0];
    const rule = EVO[species]; if (!rule) return null;
    const [to, need] = rule;
    const item = tgen === 2 ? e[1] : 0;
    if (tgen === 2 && item === IT2.everstone) return null;
    if (need && (tgen === 1 || item !== IT2[need])) return null;
    if (to > maxSpecies) return null;
    if (tgen === 1) { e[0] = G1INT[to]; const ty = D.g1Types[to]; if (ty) { e[5] = ty[0]; e[6] = ty[1]; } }
    else { e[0] = to; if (need) e[1] = 0; }
    // rename only if it still carries its species name
    for (const lang of Object.keys(NAMES)) {
      const old = NAMES[lang][species], nw = NAMES[lang][to];
      if (!old || !nw) continue;
      const ob = hex(old);
      if (ob.every((x, i) => m.nick[i] === x)) { const n = new Uint8Array(NL).fill(0x50); n.set(hex(nw).slice(0, NL)); m.nick = n; break; }
    }
    return { bytes: pack(tgen, { sp: tgen === 1 ? e[0] : to, entry: e, ot: m.ot, nick: m.nick }), from: species, to };
  }

  const baseOpen = P.open, baseEvolve = P.evolve;
  P.open = (raw) => baseOpen(raw) || open(raw);
  P.evolve = (bytes, family, partner, maxSpecies) => (family === "g12" ? evolve12(bytes, partner, maxSpecies) : baseEvolve ? baseEvolve(bytes, family, partner, maxSpecies) : null);
  P.FAMILY_LABEL.g12 = "1re / 2e génération (Game Boy)";
  P.g12 = { open, info, convert, pack, unpack, evolve: evolve12 };
})(typeof window !== "undefined" ? window : globalThis);

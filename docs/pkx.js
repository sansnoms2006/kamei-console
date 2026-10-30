/* Kamei Game Console — Pokémon save reader/writer for trades (Gen 3, 4, 5).
   Works on the raw battery save (.sav) of the emulators. Every change is validated by
   re-reading the result before it is accepted. Format knowledge from the PKHeX project (GPLv3). */
(function (root) {
  const D = (typeof PKDATA !== "undefined" ? PKDATA : root.PKDATA);
  const u16 = (b, o) => b[o] | (b[o + 1] << 8);
  const u32 = (b, o) => (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;
  const w16 = (b, o, v) => { b[o] = v & 255; b[o + 1] = (v >>> 8) & 255; };
  const w32 = (b, o, v) => { b[o] = v & 255; b[o + 1] = (v >>> 8) & 255; b[o + 2] = (v >>> 16) & 255; b[o + 3] = (v >>> 24) & 255; };

  function crc16ccitt(b, start, end) {
    let top = 0xff, bot = 0xff;
    for (let i = start; i < end; i++) {
      let x = b[i] ^ top; x ^= x >> 4;
      top = (bot ^ (x >> 3) ^ (x << 4)) & 0xff;
      bot = (x ^ (x << 5)) & 0xff;
    }
    return (top << 8) | bot;
  }
  function levelFromExp(species, exp) {
    const g = D.growth[species] ?? 0, tbl = D.exp[g];
    let lv = 1; while (lv < 100 && tbl[lv + 1] <= exp) lv++;
    return lv;
  }
  const shiny = (tid, sid, pid) => ((tid ^ sid ^ (pid >>> 16) ^ (pid & 0xffff)) >>> 0) < 8;

  /* ---------------- Gen 4 / 5 entity (136 bytes stored) ---------------- */
  const BLOCK_POS = [0,1,2,3, 0,1,3,2, 0,2,1,3, 0,3,1,2, 0,2,3,1, 0,3,2,1, 1,0,2,3, 1,0,3,2, 2,0,1,3, 3,0,1,2, 2,0,3,1, 3,0,2,1,
    1,2,0,3, 1,3,0,2, 2,1,0,3, 3,1,0,2, 2,3,0,1, 3,2,0,1, 1,2,3,0, 1,3,2,0, 2,1,3,0, 3,1,2,0, 2,3,1,0, 3,2,1,0,
    0,1,2,3, 0,1,3,2, 0,2,1,3, 0,3,1,2, 0,2,3,1, 0,3,2,1, 1,0,2,3, 1,0,3,2];
  const BLOCK_INV = [0,1,2,4, 3,5,6,7, 12,18,13,19, 8,10,14,20, 16,22,9,11, 15,21,17,23, 0,1,2,4, 3,5,6,7];
  function cryptArray(b, start, end, seed) {
    for (let i = start; i < end; i += 2) {
      seed = (Math.imul(0x41c64e6d, seed) + 0x6073) >>> 0;
      const x = seed >>> 16;
      b[i] ^= x & 255; b[i + 1] ^= x >>> 8;
    }
  }
  function shuffle(b, start, blockSize, sv) {
    const blocks = []; for (let i = 0; i < 4; i++) blocks.push(b.slice(start + i * blockSize, start + (i + 1) * blockSize));
    for (let i = 0; i < 4; i++) b.set(blocks[BLOCK_POS[sv * 4 + i]], start + i * blockSize);
  }
  function decrypt45(enc) {
    const b = enc.slice(0, 136);
    const pv = u32(b, 0), chk = u16(b, 6);
    cryptArray(b, 8, 136, chk);
    shuffle(b, 8, 32, (pv >>> 13) & 31);
    return b;
  }
  function encrypt45(dec) {
    const b = dec.slice(0, 136);
    const pv = u32(b, 0), chk = u16(b, 6);
    shuffle(b, 8, 32, BLOCK_INV[(pv >>> 13) & 31]);
    cryptArray(b, 8, 136, chk);
    return b;
  }
  const chk45 = (d) => { let s = 0; for (let i = 8; i < 136; i += 2) s = (s + u16(d, i)) & 0xffff; return s; };
  function info45(enc) {
    if (enc.every((x) => x === 0)) return null;
    const d = decrypt45(enc);
    const species = u16(d, 8);
    if (!species || chk45(d) !== u16(d, 6)) return null;
    const pid = u32(d, 0), iv = u32(d, 0x38);
    return { species, level: levelFromExp(species, u32(d, 0x10)), shiny: shiny(u16(d, 0x0c), u16(d, 0x0e), pid), egg: !!((iv >>> 30) & 1), item: u16(d, 0x0a) };
  }
  const blank45 = () => encrypt45(new Uint8Array(136));

  /* ---------------- Gen 3 entity (80 bytes stored) ---------------- */
  const G3_ORDER = ["GAEM","GAME","GEAM","GEMA","GMAE","GMEA","AGEM","AGME","AEGM","AEMG","AMGE","AMEG",
                    "EGAM","EGMA","EAGM","EAMG","EMGA","EMAG","MGAE","MGEA","MAGE","MAEG","MEGA","MEAG"];
  const g3Natl = {}; D.g3Index.forEach((internal, natl) => { if (natl) g3Natl[internal] = natl; });
  function decrypt3(enc) {
    const b = enc.slice(0, 80);
    const key = (u32(b, 0) ^ u32(b, 4)) >>> 0;
    for (let i = 32; i < 80; i += 4) w32(b, i, (u32(b, i) ^ key) >>> 0);
    // reorder to G A E M
    const order = G3_ORDER[u32(b, 0) % 24], subs = {};
    for (let i = 0; i < 4; i++) subs[order[i]] = b.slice(32 + i * 12, 44 + i * 12);
    ["G", "A", "E", "M"].forEach((k, i) => b.set(subs[k], 32 + i * 12));
    return b;
  }
  const chk3 = (d) => { let s = 0; for (let i = 32; i < 80; i += 2) s = (s + u16(d, i)) & 0xffff; return s; };
  function info3(enc) {
    if (enc.every((x) => x === 0)) return null;
    const d = decrypt3(enc);
    const internal = u16(d, 32);
    if (!internal || chk3(d) !== u16(d, 28)) return null;
    const species = g3Natl[internal] || internal;
    const pid = u32(d, 0), iv = u32(d, 32 + 36 + 4);
    return { species, level: levelFromExp(species, u32(d, 36)), shiny: shiny(u16(d, 4), u16(d, 6), pid), egg: !!((iv >>> 30) & 1) || (d[19] & 4) !== 0, item: u16(d, 34) };
  }

  /* ---------------- Save formats ---------------- */
  // Gen 4: two partitions of 0x40000, general + storage blocks with CRC footers.
  const G4 = {
    DP:   { name: "Diamant / Perle", gSize: 0xC100, sStart: 0xC100, sSize: 0x121E0, footer: 0x14, box: (b) => 4 + b * 0xFF0 },
    Pt:   { name: "Platine", gSize: 0xCF2C, sStart: 0xCF2C, sSize: 0x121E4, footer: 0x14, box: (b) => 4 + b * 0xFF0 },
    HGSS: { name: "HeartGold / SoulSilver", gSize: 0xF628, sStart: 0xF700, sSize: 0x12310, footer: 0x10, box: (b) => b * 0x1000, flags: 18 * 0x1000 + 4 },
  };
  function g4Valid(data, t, part) {
    const g = part * 0x40000;
    return u32(data, g + t.gSize - 0xc) === t.gSize && [0x20060623, 0x20070903].includes(u32(data, g + t.gSize - 0x8));
  }
  function cmpCounters(a, b) {
    if (a === 0xffffffff && b !== 0xfffffffe) return 1;
    if (b === 0xffffffff && a !== 0xfffffffe) return 0;
    if (a > b) return 0; if (a < b) return 1; return 2;
  }
  function g4Active(data, begin, length) {
    const o1 = begin + length - 0x14, o2 = o1 + 0x40000;
    const r = cmpCounters(u32(data, o1), u32(data, o2));
    if (r !== 2) return r;
    return cmpCounters(u32(data, o1 + 4), u32(data, o2 + 4)) === 1 ? 1 : 0;
  }

  function open(raw) {
    const data = new Uint8Array(raw);
    // ---- Gen 4
    if (data.length >= 0x80000) {
      for (const [key, t] of Object.entries(G4)) {
        if (!(g4Valid(data, t, 1) || g4Valid(data, t, 0))) continue;
        const sOff = (g4Active(data, t.sStart, t.sSize) ? 0x40000 : 0) + t.sStart;
        const st = data.subarray(sOff, sOff + t.sSize);
        if (crc16ccitt(st, 0, t.sSize - t.footer) !== u16(st, t.sSize - 2)) continue;
        return makeSave({ family: "g4", game: key, label: t.name, data, boxes: 18, slots: 30, size: 136,
          slotOffset: (b, s) => sOff + t.box(b) + s * 136, info: info45, blank: blank45,
          maxSpecies: 493,
          finalize() {
            if (t.flags) w32(data, sOff + t.flags, 0x3ffff); // HGSS: tell the game every box changed
            w16(data, sOff + t.sSize - 2, crc16ccitt(data, sOff, sOff + t.sSize - t.footer));
          } });
      }
      // ---- Gen 5
      const G5 = [{ key: "BW", name: "Noir / Blanc", table: 0x23F00, tlen: 0x8C, tchk: 0x23F9A },
                  { key: "B2W2", name: "Noir 2 / Blanc 2", table: 0x25F00, tlen: 0x94, tchk: 0x25FA2 }];
      for (const t of G5) {
        if (crc16ccitt(data, t.table, t.table + t.tlen) !== u16(data, t.tchk)) continue;
        if (crc16ccitt(data, 0x400, 0x400 + 0xff0) !== u16(data, 0x13f2)) continue;
        const touched = new Set();
        return makeSave({ family: "g5", game: t.key, label: t.name, data, boxes: 24, slots: 30, size: 136,
          slotOffset: (b, s) => { touched.add(b); return 0x400 + b * 0x1000 + s * 136; }, info: info45, blank: blank45,
          maxSpecies: 649,
          finalize() {
            for (const b of touched) {
              const off = 0x400 + b * 0x1000, c = crc16ccitt(data, off, off + 0xff0);
              w16(data, off + 0xff2, c); w16(data, t.table + 2 + b * 2, c);
            }
            w16(data, t.tchk, crc16ccitt(data, t.table, t.table + t.tlen));
          } });
      }
    }
    // ---- Gen 3
    if (data.length >= 0x20000 || data.length === 0x10000) {
      const slots = data.length >= 0x20000 ? 2 : 1;
      const info = [];
      for (let sl = 0; sl < slots; sl++) {
        const ids = {}; let ok = true, idx = 0;
        for (let i = 0; i < 14; i++) {
          const o = sl * 0xe000 + i * 0x1000, id = u16(data, o + 0xff4);
          if (id >= 14 || u32(data, o + 0xff8) !== 0x08012025) { ok = false; break; }
          ids[id] = o; if (id === 0) idx = u32(data, o + 0xffc);
        }
        if (ok && Object.keys(ids).length === 14) info.push({ sl, ids, idx });
      }
      if (info.length) {
        info.sort((a, b) => (b.idx - a.idx) >>> 0 > 0x7fffffff ? 1 : b.idx - a.idx); // highest save index wins
        const act = info.length === 2 ? (cmpCounters(info[0].idx, info[1].idx) === 1 ? info[1] : info[0]) : info[0];
        const ids = act.ids;
        const sector0 = data.subarray(ids[0], ids[0] + 0xf80);
        const code = u32(sector0, 0xac);
        const game = code === 1 ? "FRLG" : (code === 0 || sector0.subarray(0x890, 0xf2c).every((x) => x === 0)) ? "RS" : "E";
        const label = { FRLG: "Rouge Feu / Vert Feuille", RS: "Rubis / Saphir", E: "Émeraude" }[game];
        // PC storage = sectors 5..13 (0xF80 bytes used each), first u32 is the current box
        const pcOffset = (pos) => { const sec = 5 + Math.floor(pos / 0xf80); return ids[sec] + (pos % 0xf80); };
        const touched = new Set();
        const save = makeSave({ family: "g3", game, label, data, boxes: 14, slots: 30, size: 80,
          slotOffset: null, info: info3, blank: () => new Uint8Array(80), maxSpecies: 386,
          finalize() {
            for (const sec of touched) {
              const o = ids[sec]; let sum = 0;
              for (let i = 0; i < 0xf80; i += 4) sum = (sum + u32(data, o + i)) >>> 0;
              w16(data, o + 0xff6, ((sum >>> 16) + (sum & 0xffff)) & 0xffff);
            }
          } });
        // Gen 3 slots can straddle two sectors: read/write byte by byte
        save._read = (b, s) => { const out = new Uint8Array(80), p = 4 + (b * 30 + s) * 80; for (let i = 0; i < 80; i++) out[i] = data[pcOffset(p + i)]; return out; };
        save._write = (b, s, bytes) => { const p = 4 + (b * 30 + s) * 80; for (let i = 0; i < 80; i++) { const o = pcOffset(p + i); data[o] = bytes[i]; touched.add(5 + Math.floor((p + i) / 0xf80)); } };
        return save;
      }
    }
    return null;
  }

  function makeSave(o) {
    const s = {
      family: o.family, game: o.game, label: o.label, data: o.data, maxSpecies: o.maxSpecies,
      _read: (b, sl) => o.data.slice(o.slotOffset(b, sl), o.slotOffset(b, sl) + o.size),
      _write: (b, sl, bytes) => o.data.set(bytes, o.slotOffset(b, sl)),
      list() {
        const out = [];
        for (let b = 0; b < o.boxes; b++) for (let sl = 0; sl < o.slots; sl++) {
          const inf = o.info(s._read(b, sl));
          if (inf) out.push(Object.assign({ box: b, slot: sl }, inf));
        }
        return out;
      },
      take(b, sl) { const bytes = s._read(b, sl); if (!o.info(bytes)) throw new Error("empty slot"); s._write(b, sl, o.blank()); return bytes; },
      put(bytes) {
        const inf = o.info(bytes);
        if (!inf) throw new Error("bad pokemon");
        if (inf.species > o.maxSpecies) throw new Error("species not in this game");
        for (let b = 0; b < o.boxes; b++) for (let sl = 0; sl < o.slots; sl++) {
          if (!o.info(s._read(b, sl)) && isEmpty(s._read(b, sl), o)) { s._write(b, sl, bytes); return { box: b, slot: sl }; }
        }
        throw new Error("boxes full");
      },
      info: o.info,
      bytes() { o.finalize(); return o.data; },
    };
    return s;
  }
  // A slot is free only if it is really empty (never overwrite unreadable data)
  function isEmpty(bytes, o) {
    if (bytes.every((x) => x === 0)) return true;
    if (o.size === 136) { const d = decrypt45(bytes); return u16(d, 8) === 0 && chk45(d) === u16(d, 6); }
    return false;
  }

  const api = { open, crc16ccitt, levelFromExp,
    name: (species, lang) => (lang === "fr" ? D.namesFr : D.namesEn)[species - 1] || "#" + species,
    sprite: (species, isShiny) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${isShiny ? "shiny/" : ""}${species}.png`,
    toB64: (u8) => { let s = ""; for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); },
    fromB64: (b64) => { const s = atob(b64), u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; },
    FAMILY_LABEL: { g3: "3e génération (GBA)", g4: "4e génération (DS)", g5: "5e génération (DS)" },
  };
  root.PKX = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);

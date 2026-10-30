/* Kamei Game Console — GitHub storage (updates + free games catalogue) */
(function () {
  const OWNER = "sansnoms2006", REPO = "kamei-console", BRANCH = "main";
  const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
  const raw = (path) => `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path.split("/").map(encodeURIComponent).join("/")}`;
  const token = () => { try { return localStorage.getItem("kamei-gh-token") || ""; } catch (e) { return ""; } };
  const setToken = (v) => { try { v ? localStorage.setItem("kamei-gh-token", v.trim()) : localStorage.removeItem("kamei-gh-token"); } catch (e) {} };

  async function api(path, opts = {}) {
    const r = await fetch(API + path, Object.assign({ cache: "no-store" }, opts, { headers: Object.assign({ Accept: "application/vnd.github+json", Authorization: "Bearer " + token(), "X-GitHub-Api-Version": "2022-11-28" }, opts.body ? { "Content-Type": "application/json" } : {}) }));
    if (!r.ok) {
      let msg = r.status + ""; try { msg = (await r.json()).message || msg; } catch (e) {}
      throw new Error("GitHub: " + msg);
    }
    return r.status === 204 ? null : r.json();
  }
  /* Read a JSON file from the repo (public, no key needed) */
  async function readJSON(path) {
    const r = await fetch(raw(path) + "?t=" + Date.now(), { cache: "no-store" });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error("GitHub " + r.status);
    return r.json();
  }
  /* Write several files (and delete some) in a single commit. files: [{ path, b64 } | { path, text }] */
  // GitHub answers can be cached for 60 s: always ask fresh, and retry if the branch moved meanwhile
  async function commit(files, message, deletes = [], onProgress) {
    if (!token()) throw new Error("no_token");
    const blobs = [];
    for (const f of files) {
      if (onProgress) onProgress(blobs.length, files.length);
      const content = f.load ? await f.load() : f.b64 != null ? f.b64 : btoa(unescape(encodeURIComponent(f.text)));
      blobs.push({ path: f.path, sha: (await api("/git/blobs", { method: "POST", body: JSON.stringify({ content, encoding: "base64" }) })).sha });
    }
    for (let tries = 0; ; tries++) {
      try { return await commitOnce(blobs, message, deletes); }
      catch (e) { if (tries < 3 && /fast forward|409|422/i.test(String(e.message))) { await new Promise((r) => setTimeout(r, 1500 * (tries + 1))); continue; } throw e; }
    }
  }
  async function commitOnce(blobs, message, deletes) {
    const ref = await api(`/git/ref/heads/${BRANCH}?t=${Date.now()}`);
    const head = await api(`/git/commits/${ref.object.sha}`);
    const tree = blobs.map((b) => ({ path: b.path, mode: "100644", type: "blob", sha: b.sha }));
    for (const p of deletes) tree.push({ path: p, mode: "100644", type: "blob", sha: null });
    const newTree = await api("/git/trees", { method: "POST", body: JSON.stringify({ base_tree: head.tree.sha, tree }) });
    const c = await api("/git/commits", { method: "POST", body: JSON.stringify({ message, tree: newTree.sha, parents: [ref.object.sha] }) });
    await api(`/git/refs/heads/${BRANCH}`, { method: "PATCH", body: JSON.stringify({ sha: c.sha }) });
    return c.sha;
  }
  /* path -> sha of every file in the repo (to upload only what changed) */
  async function tree() {
    const ref = await api(`/git/ref/heads/${BRANCH}?t=${Date.now()}`);
    const c = await api(`/git/commits/${ref.object.sha}`);
    const tr = await api(`/git/trees/${c.tree.sha}?recursive=1`);
    const map = {}; for (const e of tr.tree || []) if (e.type === "blob") map[e.path] = e.sha;
    return map;
  }
  async function check() { if (!token()) return false; await api(""); return true; }
  const toB64 = (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(",")[1] || ""); r.onerror = () => rej(r.error); r.readAsDataURL(blob); });

  window.KameiGH = { OWNER, REPO, raw, token, setToken, readJSON, commit, check, toB64, tree, site: `https://${OWNER}.github.io/${REPO}/` };
})();

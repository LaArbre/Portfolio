/* =========================================================
   ÉTAT COMMUN
   La sélection du visiteur, partagée entre toutes les pages
   (sauvegardée dans le navigateur avec localStorage).
   Expose l'objet global window.CV.
   ========================================================= */
(() => {
  "use strict";

  const D = window.CV_DATA;
  const CV = (window.CV = window.CV || {});

  /* Chemin vers la racine du site, défini sur <body data-racine="../"> */
  CV.racine = document.body.dataset.racine || "./";

  /* Les étapes de la barre de progression (= les dossiers du site) */
  CV.ETAPES = [
    { key: "profil", label: "Profil" },
    { key: "competences", label: "Compétences" },
    { key: "parcours", label: "Parcours" },
    { key: "projets", label: "Projets" },
    { key: "cv", label: "Votre CV" }
  ];
  CV.ETAPES_CONTENU = CV.ETAPES.filter(e => e.key !== "cv");
  CV.urlEtape = key => `${CV.racine}${key}/index.html`;
  CV.urlAccueil = `${CV.racine}index.html`;

  /* Éléments que le visiteur peut ajouter ou retirer du CV, par étape.
     Le profil (coordonnées, langues…) n'est pas au choix : il est toujours sur le CV. */
  const choisissables = {
    profil: [],
    competences: D.competences.flatMap(g => g.items),
    parcours: [...D.experiences, ...D.formations],
    projets: D.projets
  };
  CV.IDS = Object.fromEntries(Object.entries(choisissables).map(([k, list]) => [k, list.map(x => x.id)]));
  const ALL_IDS = Object.values(CV.IDS).flat();
  const DEFAULT_ON = new Set(Object.values(choisissables).flat().filter(x => x.on).map(x => x.id));

  /* Retrouver une expérience, une formation ou un projet par son id (pour les liens "Utilisé dans") */
  const index = {};
  D.experiences.forEach(x => (index[x.id] = { label: x.company.split(" — ")[0], date: x.date, page: "parcours" }));
  D.formations.forEach(x => (index[x.id] = { label: x.title.split(" — ")[0], date: x.date, page: "parcours" }));
  D.projets.forEach(x => (index[x.id] = { label: x.title, date: x.year || "", page: "projets" }));
  CV.trouver = id => index[id];

  /* ---------- Stockage navigateur (peut être indisponible) ---------- */
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem("cvb:" + k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem("cvb:" + k, JSON.stringify(v)); } catch { /* navigation privée */ } }
  };

  const state = (CV.state = {
    sel: new Set(DEFAULT_ON),
    accroche: D.profil.accroches[0].id,
    details: true,
    visited: new Set()
  });

  (function charger() {
    const s = store.get("state");
    if (!s) return;
    const known = new Set(s.known || []);
    const saved = new Set(s.sel || []);
    // Un élément ajouté au site depuis la dernière visite prend sa valeur par défaut
    state.sel = new Set(ALL_IDS.filter(id => (known.has(id) ? saved.has(id) : DEFAULT_ON.has(id))));
    if (D.profil.accroches.some(a => a.id === s.accroche)) state.accroche = s.accroche;
    if (typeof s.details === "boolean") state.details = s.details;
    state.visited = new Set((s.visited || []).filter(k => CV.IDS[k]));
    state.celebre = s.celebre === true; // animation de complétion déjà jouée ?
  })();

  CV.save = () => store.set("state", {
    sel: [...state.sel], known: ALL_IDS, accroche: state.accroche,
    details: state.details, visited: [...state.visited], celebre: state.celebre === true
  });

  CV.reset = () => {
    state.sel = new Set(DEFAULT_ON);
    state.accroche = D.profil.accroches[0].id;
    state.details = true;
    CV.save();
  };

  /* ---------- Abonnements : prévenir l'aperçu, la barre… d'un changement ---------- */
  const listeners = [];
  CV.onChange = fn => listeners.push(fn);
  CV.notify = (added = []) => listeners.forEach(fn => fn(added));

  /* Coche / décoche une liste d'éléments */
  CV.setMany = (ids, value) => {
    const added = [];
    ids.forEach(id => {
      if (value && !state.sel.has(id)) added.push(id);
      value ? state.sel.add(id) : state.sel.delete(id);
      const input = document.querySelector(`input[data-id="${id}"]`);
      if (input) input.checked = value;
    });
    CV.save();
    CV.notify(added);
  };

  /* ---------- Lien partageable : sélection encodée dans l'URL ---------- */
  CV.encoder = () => {
    let bits = ALL_IDS.map(id => (state.sel.has(id) ? "1" : "0")).join("");
    while (bits.length % 4) bits += "0";
    let hex = "";
    for (let i = 0; i < bits.length; i += 4) hex += parseInt(bits.slice(i, i + 4), 2).toString(16);
    const acc = D.profil.accroches.findIndex(a => a.id === state.accroche);
    return `${acc}${state.details ? 1 : 0}${hex}`;
  };
  CV.decoder = code => {
    if (!/^\d[01][0-9a-f]+$/i.test(code)) return false;
    const acc = D.profil.accroches[+code[0]];
    const bits = [...code.slice(2)].map(c => parseInt(c, 16).toString(2).padStart(4, "0")).join("");
    state.sel = new Set(ALL_IDS.filter((id, i) => bits[i] === "1"));
    if (acc) state.accroche = acc.id;
    state.details = code[1] === "1";
    CV.save();
    return true;
  };

  /* ---------- Petits utilitaires ---------- */
  CV.$ = (s, el = document) => el.querySelector(s);
  CV.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  CV.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  CV.on = item => state.sel.has(item.id);
  CV.countIn = key => CV.IDS[key].filter(id => state.sel.has(id)).length;
  CV.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  CV.CHECK = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
})();

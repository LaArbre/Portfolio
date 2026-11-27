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

  /* ---------- Lien partageable : sélection encodée dans l'URL ----------
     On écrit les id cochés eux-mêmes (et non leur position dans la liste) :
     ajouter, retirer ou réordonner des éléments dans commun/data/ ne change
     pas le sens des liens déjà envoyés. Un id disparu est simplement ignoré.
     Format : ?s=s-sql.p-orm…&a=<id accroche>&d=1 */
  CV.lienPartage = base => {
    const q = new URLSearchParams();
    q.set("s", ALL_IDS.filter(id => state.sel.has(id)).join("."));
    q.set("a", state.accroche);
    q.set("d", state.details ? "1" : "0");
    return `${base}?${q.toString()}`;
  };

  /* Ancien format (?c=…, position des éléments en binaire) : encore lu
     pour que les liens envoyés avant le changement de format restent valables */
  function decoderAncien(code) {
    if (!/^\d[01][0-9a-f]+$/i.test(code)) return false;
    const acc = D.profil.accroches[+code[0]];
    const bits = [...code.slice(2)].map(c => parseInt(c, 16).toString(2).padStart(4, "0")).join("");
    state.sel = new Set(ALL_IDS.filter((id, i) => bits[i] === "1"));
    if (acc) state.accroche = acc.id;
    state.details = code[1] === "1";
    return true;
  }

  /* Lit la sélection dans l'adresse ; renvoie true si un CV partagé a été chargé */
  CV.lireLienPartage = params => {
    let ok = false;
    if (params.has("s")) {
      const ids = new Set(params.get("s").split(".").filter(Boolean));
      state.sel = new Set(ALL_IDS.filter(id => ids.has(id)));
      const acc = params.get("a");
      if (D.profil.accroches.some(a => a.id === acc)) state.accroche = acc;
      state.details = params.get("d") !== "0";
      ok = true;
    } else if (params.has("c")) {
      ok = decoderAncien(params.get("c"));
    }
    if (ok) CV.save();
    return ok;
  };

  /* ---------- Petits utilitaires ---------- */
  CV.$ = (s, el = document) => el.querySelector(s);
  CV.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  CV.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  CV.on = item => state.sel.has(item.id);
  CV.countIn = key => CV.IDS[key].filter(id => state.sel.has(id)).length;
  CV.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Centrage optique ----------
     Le navigateur centre la "boîte" d'un caractère, pas son dessin :
     un "1" paraît décalé à droite, un "×" trop haut, etc.
     Pour chaque <span class="optique">, on dessine le texte en grand dans un
     canvas et on calcule le centre de masse de ses pixels (là où l'œil voit
     le "poids" du caractère), puis on le décale pour centrer ce point.
     - horizontal : centre de masse (le "1" a son poids sur le trait, à droite)
     - vertical   : milieu de l'encre (tous les chiffres restent alignés entre eux) */
  const ECH = 100; // taille de dessin pour la mesure
  const toile = document.createElement("canvas");
  toile.width = ECH * 4;
  toile.height = ECH * 2;
  const ctx = toile.getContext("2d", { willReadFrequently: true });
  const cache = new Map();

  function mesurer(txt, police) {
    const cle = police + "|" + txt;
    if (cache.has(cle)) return cache.get(cle);
    ctx.font = police.replace(/\d+(\.\d+)?px/, ECH + "px");
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(txt);
    const base = ECH * 1.4; // ligne de base dans la toile
    ctx.clearRect(0, 0, toile.width, toile.height);
    ctx.fillText(txt, ECH, base);
    const { data, width, height } = ctx.getImageData(0, 0, toile.width, toile.height);
    let masse = 0, sx = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const a = data[(y * width + x) * 4 + 3];
        if (a) { masse += a; sx += a * x; }
      }
    }
    // Tout est exprimé en fraction de la taille de police
    const r = {
      dx: masse ? (m.width / 2 - (sx / masse - ECH)) / ECH : 0,
      milieuEncre: (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2 / ECH,
      asc: m.fontBoundingBoxAscent / ECH,
      desc: m.fontBoundingBoxDescent / ECH
    };
    cache.set(cle, r);
    return r;
  }

  /* Textes centrés dans une forme (bouton, pastille, étiquette) sur toutes les pages :
     leur contenu est entouré automatiquement d'un <span class="optique">. */
  const A_CENTRER = [
    // (pas les boutons des barres : leur hauteur ne doit jamais bouger)
    ".btn:not(.step-nav .btn):not(.topbar-contact)", ".cv-toggle-on", ".cv-toggle-off", ".tags span", ".skill-usages li span",
    ".certifs li", ".info-tags li", ".badge-bientot", ".pastille-lien",
    ".intro-visual-link > span", ".step-dot", ".niveau", ".dot-warn", ".contact-close"
  ].join(",");

  function envelopper(racine) {
    racine.querySelectorAll(A_CENTRER).forEach(el => {
      if (el.querySelector(":scope > .optique") || el.closest(".optique")) return;
      // On n'enveloppe que le texte (et les petits <span> de texte), jamais les icônes
      const noeuds = [...el.childNodes].filter(n =>
        (n.nodeType === 3 && n.textContent.trim()) ||
        (n.nodeType === 1 && n.tagName === "SPAN" && !n.querySelector("svg") && !n.classList.contains("dot-oeil")));
      if (!noeuds.length) return;
      const span = document.createElement("span");
      span.className = "optique";
      noeuds[0].before(span);
      noeuds.forEach(n => span.appendChild(n));
    });
  }

  CV.optique = (racine = document) => {
    envelopper(racine);
    racine.querySelectorAll(".optique").forEach(el => {
      const txt = el.textContent;
      if (!txt.trim()) return;
      // Élément masqué (display: none, onglet caché…) : aucune mesure possible, on ne touche à rien
      const parent = el.parentElement;
      if (!el.getClientRects().length || !parent.offsetWidth) return;
      const cs = getComputedStyle(el);
      const taille = parseFloat(cs.fontSize);
      // Texte sur plusieurs lignes : pas de recentrage, interligne normal
      el.classList.remove("optique-multi");
      if (el.getBoundingClientRect().height > taille * 1.6) {
        el.classList.add("optique-multi");
        el.style.transform = "";
        return;
      }
      const r = mesurer(txt, `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`);
      // On mesure sans le décalage précédent
      el.style.transform = "";
      // Boîte du texte telle que le navigateur la dessine : sa hauteur = ascendante + descendante
      // de la police (les mêmes métriques que le canvas), d'où la position exacte de la ligne de base.
      const plage = document.createRange();
      plage.selectNodeContents(el);
      const t = plage.getBoundingClientRect();
      // On centre l'encre dans la FORME qui contient le texte (rond, pastille, bouton)
      const forme = el.parentElement.getBoundingClientRect();
      // Si la forme est agrandie (bulle sélectionnée, survol), toutes les mesures écran le sont aussi
      const echelle = el.parentElement.offsetWidth ? forme.width / el.parentElement.offsetWidth : 1;
      const px = taille * echelle;
      const ligneDeBase = t.top + r.asc * px;
      const encreY = ligneDeBase - r.milieuEncre * px;
      const encreX = t.left + t.width / 2 - r.dx * px;
      const dy = forme.top + forme.height / 2 - encreY;
      // Horizontal : seulement pour les textes très courts (chiffres, symboles),
      // sur un mot entier la répartition des lettres n'a pas de sens visuel
      const seul = el.parentElement.children.length === 1 || el.parentElement.matches(".step-dot");
      const dx = txt.trim().length <= 3 && seul ? forme.left + forme.width / 2 - encreX : 0;
      // Décalage ramené à l'échelle normale (le transform s'applique avant l'agrandissement)
      el.style.transform = `translate(${(dx / echelle).toFixed(2)}px, ${(dy / echelle).toFixed(2)}px)`;
    });
    racine.querySelectorAll(SVG_A_CENTRER).forEach(centrerSvg);
  };

  /* Icônes SVG dans un rond : on recale aussi leur centre de masse
     (une coche ✓ penche à droite, un œil, une enveloppe…) */
  const SVG_A_CENTRER = ".step-dot > svg, .dot-oeil > svg, .contact-ic > svg, .cv-toggle-on > svg, .page-info > svg";
  const cacheSvg = new Map();
  function centrerSvg(svg) {
    const source = svg.outerHTML.replace(/currentColor/g, "#000").replace(/style="[^"]*"/, "");
    const appliquer = c => {
      const b = svg.getBoundingClientRect();
      if (!b.width) return;
      svg.style.transform = `translate(${(-c.x * b.width).toFixed(2)}px, ${(-c.y * b.height).toFixed(2)}px)`;
    };
    if (cacheSvg.has(source)) {
      const c = cacheSvg.get(source);
      if (c) appliquer(c);
      return;
    }
    cacheSvg.set(source, null); // mesure en cours
    const T = 200;
    const img = new Image();
    img.onload = () => {
      const t = document.createElement("canvas");
      t.width = t.height = T;
      const c2 = t.getContext("2d", { willReadFrequently: true });
      c2.drawImage(img, 0, 0, T, T);
      const { data } = c2.getImageData(0, 0, T, T);
      let masse = 0, sx = 0, sy = 0;
      for (let i = 3; i < data.length; i += 4) {
        const a = data[i];
        if (!a) continue;
        const p = (i - 3) / 4;
        masse += a; sx += a * (p % T); sy += a * Math.floor(p / T);
      }
      const c = masse ? { x: sx / masse / T - 0.5, y: sy / masse / T - 0.5 } : { x: 0, y: 0 };
      cacheSvg.set(source, c);
      document.querySelectorAll(SVG_A_CENTRER).forEach(s => {
        if (s.outerHTML.replace(/currentColor/g, "#000").replace(/style="[^"]*"/, "") === source) appliquer(c);
      });
    };
    const xml = source.includes("xmlns") ? source : source.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml.replace(/<svg([^>]*)>/, `<svg$1 width="${T}" height="${T}">`));
  }
  /* ---------- Fin du chargement ----------
     On attend que la page soit construite ET que les polices soient là
     (au plus 0,4 s : elles sont hébergées sur le site et préchargées,
     et au-delà la police de secours s'affiche), puis on révèle le contenu. */
  document.addEventListener("DOMContentLoaded", () => {
    const polices = document.fonts ? document.fonts.ready : Promise.resolve();
    const delai = new Promise(r => setTimeout(r, 400));
    Promise.race([polices, delai]).then(() => requestAnimationFrame(() => {
      CV.optique();
      const html = document.documentElement;
      html.classList.remove("chargement");
      html.classList.add("revele");
    }));
  });

  // Les polices web changent les mesures : on recalcule une fois chargées,
  // et après chaque redimensionnement de la fenêtre (éléments masqués / affichés)
  if (document.fonts) document.fonts.ready.then(() => CV.optique());
  // (seulement si la LARGEUR change : sur mobile, la barre d'adresse qui se replie
  // en défilant déclenche "resize" sans rien changer à la mise en page)
  let minuteurOptique;
  let largeur = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === largeur) return;
    largeur = window.innerWidth;
    clearTimeout(minuteurOptique);
    minuteurOptique = setTimeout(() => CV.optique(), 150);
  });

  CV.CHECK = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
})();

/* =========================================================
   RENDU DU CV
   Une seule fonction pour l'aperçu en direct, la page finale,
   l'intro et l'impression PDF.
   ========================================================= */
(() => {
  "use strict";

  const D = window.CV_DATA;
  const { state, esc, on, $, $$ } = window.CV;
  const CV = window.CV;
  const A4_W = 794;   // 210 mm à 96 dpi
  CV.A4_H = 1123;     // 297 mm à 96 dpi

  /* ---------- QR code du site (bibliothèque qrcode-generator) ---------- */
  let qrCache = null;
  function qrSite() {
    if (qrCache !== null) return qrCache;
    const url = D.profil.site;
    if (!url || typeof window.qrcode !== "function") return ""; // bibliothèque indisponible : pas de QR
    const qr = window.qrcode(0, "M");
    qr.addData(url);
    qr.make();
    const n = qr.getModuleCount();
    let path = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
    qrCache = `
      <a class="cv-qr" href="${esc(url)}" aria-label="Site : ${esc(url)}">
        <svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img"><title>${esc(url)}</title><path d="${path}"/></svg>
      </a>`;
    return qrCache;
  }

  CV.renderCV = () => {
    const p = D.profil;
    const acc = p.accroches.find(a => a.id === state.accroche);
    // Le profil est toujours complet ; seuls compétences, parcours et projets sont au choix
    const contacts = p.contacts.filter(c => c.cv);
    const groups = D.competences.map(g => ({ ...g, items: g.items.filter(on) })).filter(g => g.items.length);
    const langues = p.langues;
    const loisirs = p.loisirs;
    const certifs = D.certifications || [];
    const xps = D.experiences.filter(on);
    const forms = D.formations.filter(on);
    const projs = D.projets.filter(on);

    const side = [
      ...groups.map(g => `
        <section class="cv-sec" data-cv="${g.id}">
          <h3>${esc(g.label)}</h3>
          <ul class="cv-tags">${g.items.map(i => `<li data-cv="${i.id}">${esc(i.name)}</li>`).join("")}</ul>
        </section>`),
      certifs.length ? `
        <section class="cv-sec">
          <h3>Certifications</h3>
          <ul class="cv-tags">${certifs.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
        </section>` : "",
      langues.length ? `
        <section class="cv-sec">
          <h3>Langues</h3>
          <ul class="cv-list">${langues.map(l => `<li data-cv="${l.id}"><span>${esc(l.name)}</span><em>${esc(l.level)}</em></li>`).join("")}</ul>
        </section>` : "",
      loisirs.length ? `
        <section class="cv-sec">
          <h3>Centres d'intérêt</h3>
          <ul class="cv-list">${loisirs.map(l => `<li data-cv="${l.id}">${esc(l.name)}</li>`).join("")}</ul>
        </section>` : ""
    ].join("");

    const main = [
      `<section class="cv-sec">
          <h2>Profil</h2>
          <p class="cv-resume">${esc(p.resume)}</p>
        </section>`,
      xps.length ? `
        <section class="cv-sec">
          <h2>Expériences</h2>
          ${xps.map(x => `
            <div class="cv-entry" data-cv="${x.id}">
              <div class="cv-entry-top"><strong>${esc(x.role)}</strong><span>${esc(x.date)}</span></div>
              <div class="cv-entry-sub">${esc(x.company)}</div>
              ${state.details ? `<ul class="cv-bullets">${x.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
            </div>`).join("")}
        </section>` : "",
      forms.length ? `
        <section class="cv-sec">
          <h2>Formation</h2>
          ${forms.map(f => `
            <div class="cv-entry" data-cv="${f.id}">
              <div class="cv-entry-top"><strong>${esc(f.title)}</strong><span>${esc(f.date)}</span></div>
              <div class="cv-entry-sub">${esc(f.school)}</div>
            </div>`).join("")}
        </section>` : "",
      projs.length ? `
        <section class="cv-sec">
          <h2>Projets</h2>
          <div class="cv-projects">
          ${projs.map(pr => `
            <div class="cv-project" data-cv="${pr.id}">
              <strong>${esc(pr.title)}</strong> <span class="cv-stack">${esc(pr.stack)}</span>
              ${state.details ? `<p>${esc(pr.desc)}</p>` : ""}
            </div>`).join("")}
          </div>
        </section>` : ""
    ].join("");

    const empty = !side.trim() && !main.trim();

    return `
      <article class="cv-sheet">
        <header class="cv-head">
          <div class="cv-ident">
            <div class="cv-name">${esc(p.prenom)} <b>${esc(p.nom)}</b></div>
            <div class="cv-title">${esc(acc ? acc.text : "")}</div>
            ${p.disponibilite ? `<div class="cv-dispo">${esc(p.disponibilite)}</div>` : ""}
          </div>
          <ul class="cv-contacts">${contacts.map(c => `<li>${c.href ? `<a href="${esc(c.href)}">${esc(c.value)}</a>` : esc(c.value)}</li>`).join("")}</ul>
          ${qrSite()}
        </header>
        ${empty
          ? `<div class="cv-empty">Ce CV est vide pour l'instant.<br>Cochez des éléments dans les étapes pour le remplir.</div>`
          : `<div class="cv-body"><aside class="cv-side">${side}</aside><div class="cv-main">${main}</div></div>`}
      </article>`;
  };

  /* ---------- Aperçus : la feuille A4 réduite à la largeur du cadre ---------- */
  const resizeObs = new ResizeObserver(entries => entries.forEach(e => fit(e.target)));
  function fit(frame) {
    const scaler = frame.firstElementChild;
    if (!scaler) return;
    const scale = Math.min(1, frame.clientWidth / A4_W);
    scaler.style.transform = `scale(${scale})`;
    frame.style.height = `${scaler.firstElementChild.offsetHeight * scale}px`;
  }

  /* Remplit tous les éléments .js-preview de la page */
  CV.updatePreviews = (flashIds = []) => {
    const html = CV.renderCV();
    $$(".js-preview").forEach(frame => {
      frame.innerHTML = `<div class="cv-scaler">${html}</div>`;
      fit(frame);
      if (!frame.dataset.observed) { resizeObs.observe(frame); frame.dataset.observed = "1"; }
      if (!CV.reduceMotion) flashIds.forEach(id => $$(`[data-cv="${id}"]`, frame).forEach(el => el.classList.add("flash")));
    });
  };
  CV.onChange(added => CV.updatePreviews(added));

  /* ---------- Impression / export PDF ---------- */
  const printRoot = document.createElement("div");
  printRoot.id = "print-root";
  printRoot.setAttribute("aria-hidden", "true");
  document.body.appendChild(printRoot);

  const fillPrintRoot = () => { printRoot.innerHTML = CV.renderCV(); };
  window.addEventListener("beforeprint", fillPrintRoot);

  CV.imprimer = () => {
    fillPrintRoot();
    const title = document.title;
    document.title = `CV_${D.profil.prenom}_${D.profil.nom}`;
    window.print();
    setTimeout(() => { document.title = title; }, 500);
  };
})();

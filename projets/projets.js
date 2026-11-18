/* =========================================================
   PAGE PROJETS : grille de projets cochables
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const projets = window.CV_DATA.projets;
  const { esc } = CV;

  document.getElementById("contenu-etape").innerHTML =
    `<div class="cards projets-grid">${projets.map(pr => CV.carte(pr.id, `
      <div class="card-top"><strong>${esc(pr.title)}</strong>${pr.year ? `<span class="date">${esc(pr.year)}</span>` : ""}</div>
      <div class="card-sub mono">${esc(pr.stack)}</div>
      <p>${esc(pr.desc)}</p>
      ${pr.link ? `<a class="card-link" href="${esc(pr.link)}" target="_blank" rel="noopener">Voir le dépôt GitHub ↗</a>` : ""}`)).join("")}</div>`;

  CV.demarrerEtape();
})();

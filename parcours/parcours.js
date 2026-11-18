/* =========================================================
   PAGE PARCOURS : expériences (stages) et formation
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const { experiences, formations } = window.CV_DATA;
  const { esc } = CV;

  document.getElementById("contenu-etape").innerHTML = [
    CV.bloc("Expériences", "Stages en entreprise, du plus récent au plus ancien.",
      `<div class="cards">${experiences.map(x => CV.carte(x.id, `
        <div class="card-top"><strong>${esc(x.role)}</strong><span class="date">${esc(x.date)}</span></div>
        <div class="card-sub">${esc(x.company)}</div>
        <ul class="card-bullets">${x.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
        <div class="tags">${x.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>`)).join("")}</div>`),

    CV.bloc("Formation", "",
      `<div class="cards">${formations.map(f => CV.carte(f.id, `
        <div class="card-top"><strong>${esc(f.title)}</strong><span class="date">${esc(f.date)}</span></div>
        <div class="card-sub">${esc(f.school)}</div>`)).join("")}</div>`)
  ].join("");

  CV.demarrerEtape();
})();

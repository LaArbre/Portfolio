/* =========================================================
   PAGE COMPÉTENCES
   Chaque compétence est expliquée, avec les expériences et
   projets où elle a servi (et leur date). L'ajout au CV est
   un simple interrupteur discret sur chaque carte.
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const D = window.CV_DATA;
  const { esc } = CV;

  const usage = id => {
    const u = CV.trouver(id);
    if (!u) return "";
    return `<li><a href="${CV.urlEtape(u.page)}#${id}">${esc(u.label)}</a>${u.date ? `<span>${esc(u.date)}</span>` : ""}</li>`;
  };

  const carte = s => `
    <article class="skill">
      <div class="skill-head">
        <h3>${esc(s.name)}</h3>
        ${CV.interrupteur(s.id)}
      </div>
      <p class="skill-desc">${esc(s.desc)}</p>
      ${s.usages.length ? `
        <div class="skill-usages">
          <span class="skill-usages-label">Mis en pratique</span>
          <ul>${s.usages.map(usage).join("")}</ul>
        </div>` : ""}
    </article>`;

  document.getElementById("contenu-etape").innerHTML =
    D.competences.map(g => `
      <section class="block skill-group">
        <h2 class="skill-group-title">${esc(g.label)}</h2>
        <div class="skill-grid">${g.items.map(carte).join("")}</div>
      </section>`).join("") +
    `<section class="block skill-group">
      <h2 class="skill-group-title">Certifications</h2>
      <ul class="certifs">${(D.certifications || []).map(c => `<li>${esc(c)}</li>`).join("")}</ul>
    </section>`;

  CV.demarrerEtape();
})();

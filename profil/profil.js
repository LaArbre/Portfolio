/* =========================================================
   PAGE PROFIL : présentation (rien à cocher ici)
   Le visiteur indique seulement ce qu'il cherche,
   ce qui devient le titre du CV.
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const p = window.CV_DATA.profil;
  const { esc, state } = CV;

  const lien = c => (c.href
    ? `<a href="${esc(c.href)}"${c.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(c.value)}</a>`
    : esc(c.value));

  document.getElementById("contenu-etape").innerHTML = `
    <section class="presentation">
      ${p.disponibilite ? `<p class="dispo">${esc(p.disponibilite)}</p>` : ""}
      <p class="quote">${esc(p.resume)}</p>
    </section>

    <section class="block">
      <div class="block-head"><div>
        <h2>Vous cherchez plutôt…</h2>
        <p>Votre réponse devient le titre de votre CV.</p>
      </div></div>
      <div class="radio-list" role="radiogroup">${p.accroches.map(a => `
        <label class="pick radio">
          <input type="radio" name="accroche" value="${a.id}" ${a.id === state.accroche ? "checked" : ""}>
          <span class="pick-dot"></span>
          <span><strong>${esc(a.label)}</strong><small>${esc(a.text)}</small></span>
        </label>`).join("")}</div>
    </section>

    <div class="infos">
      <section class="info">
        <h2>Me joindre</h2>
        <dl class="info-list">${p.contacts.map(c => `<div><dt>${esc(c.label)}</dt><dd>${lien(c)}</dd></div>`).join("")}</dl>
      </section>

      <section class="info">
        <h2>Langues</h2>
        <dl class="info-list">${p.langues.map(l => `<div><dt>${esc(l.name)}</dt><dd><span class="niveau"><span class="optique">${esc(l.level)}</span></span></dd></div>`).join("")}</dl>
      </section>

      <section class="info">
        <h2>En dehors du code</h2>
        <ul class="info-tags">${p.loisirs.map(l => `<li>${esc(l.name)}</li>`).join("")}</ul>
      </section>

      <section class="info">
        <h2>Objectifs</h2>
        <div class="objectifs">
          <div><h3>Court terme</h3><ul>${p.objectifs.court.map(o => `<li>${esc(o)}</li>`).join("")}</ul></div>
          <div><h3>Long terme</h3><ul>${p.objectifs.long.map(o => `<li>${esc(o)}</li>`).join("")}</ul></div>
        </div>
      </section>
    </div>`;

  document.addEventListener("change", e => {
    if (e.target.name !== "accroche") return;
    state.accroche = e.target.value;
    CV.save();
    CV.notify();
  });

  CV.demarrerEtape();
  CV.optique();
})();

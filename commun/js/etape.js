/* =========================================================
   OUTILS DES PAGES D'ÉTAPE (profil, compétences, parcours, projets)
   - carte avec interrupteur discret "Sur le CV"
   (l'aperçu du CV est dans la barre du haut)
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const { state, $ } = CV;

  /* ---------- Composants HTML ---------- */

  /* Petit interrupteur "✓ Sur le CV / + Ajouter au CV" */
  CV.interrupteur = id => `
    <label class="cv-toggle">
      <input type="checkbox" data-id="${id}" ${state.sel.has(id) ? "checked" : ""}>
      <span class="cv-toggle-on">${CV.CHECK} Sur le CV</span>
      <span class="cv-toggle-off">+ Ajouter au CV</span>
    </label>`;

  /* Carte de contenu (expérience, formation, projet) avec son interrupteur */
  CV.carte = (id, inner) => `
    <article class="card" id="${id}">
      <div class="card-body">${inner}</div>
      ${CV.interrupteur(id)}
    </article>`;

  CV.bloc = (title, hint, inner) => `
    <section class="block">
      <div class="block-head"><div><h2>${title}</h2>${hint ? `<p>${hint}</p>` : ""}</div></div>
      ${inner}
    </section>`;

  /* ---------- Événements ---------- */
  document.addEventListener("change", e => {
    if (!e.target.matches("input[data-id]")) return;
    CV.setMany([e.target.dataset.id], e.target.checked);
    // Seule la pastille cliquée change de texte : on ne recentre qu'elle
    CV.optique(e.target.closest(".cv-toggle"));
  });

  /* À appeler par chaque page, une fois son contenu affiché */
  CV.demarrerEtape = () => {
    CV.updatePreviews();
    // (le centrage optique de toute la page est fait une seule fois, juste avant l'affichage : voir etat.js)
    // Lien vers un élément précis (ex. parcours/index.html#x-jgsi) : le contenu
    // est créé en JS, on fait donc défiler jusqu'à lui une fois affiché
    if (location.hash.length > 1) {
      const cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (cible) requestAnimationFrame(() => cible.scrollIntoView({ block: "center" }));
    }
  };
})();

/* =========================================================
   PAGE CV : résultat final, export PDF, lien partageable
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const { state, esc, $ } = CV;

  /* Arrivée par un lien partagé : cv/?c=... */
  const code = new URLSearchParams(location.search).get("c");
  if (code && CV.decoder(code)) {
    history.replaceState(null, "", location.pathname);
    CV.dessinerBarre();
  }

  /* ---------- Résumé de la sélection ---------- */
  function resume() {
    $("#resume-selection").innerHTML = CV.ETAPES_CONTENU.filter(e => CV.IDS[e.key].length).map(e => `
      <li>
        <span>${esc(e.label)}</span>
        <span class="sum-n">${CV.countIn(e.key)}<small>/${CV.IDS[e.key].length}</small></span>
        <a href="${CV.urlEtape(e.key)}">Modifier</a>
      </li>`).join("");
  }

  /* ---------- Le CV tient-il sur une page ? ---------- */
  function infoPages() {
    const sheet = $(".final-stage .cv-sheet");
    if (!sheet) return;
    const pages = Math.max(1, Math.ceil((sheet.offsetHeight - 4) / CV.A4_H));
    const box = $("#page-info");
    box.className = "page-info " + (pages === 1 ? "is-ok" : "is-warn");
    box.innerHTML = pages === 1
      ? `${CV.CHECK}<span>Tient sur <strong>une page</strong> A4</span>`
      : `<span class="dot-warn" aria-hidden="true">!</span><span>Environ <strong>${pages} pages</strong> : décochez quelques éléments ou masquez les détails pour revenir à une page.</span>`;
  }

  function rafraichir() {
    CV.updatePreviews();
    resume();
    infoPages();
  }

  /* ---------- Actions ---------- */
  const details = $("#toggle-details");
  details.checked = state.details;
  details.addEventListener("change", () => {
    state.details = details.checked;
    CV.save();
    rafraichir();
  });

  $("#btn-print").addEventListener("click", CV.imprimer);

  $("#btn-reset").addEventListener("click", () => {
    CV.reset();
    details.checked = state.details;
    CV.dessinerBarre();
    rafraichir();
  });

  $("#btn-share").addEventListener("click", async () => {
    const url = `${location.origin}${location.pathname}?c=${CV.encoder()}`;
    const fb = $("#share-feedback");
    try {
      await navigator.clipboard.writeText(url);
      fb.textContent = "Lien copié. Il ouvre exactement cette version du CV.";
    } catch {
      fb.innerHTML = `Copiez ce lien : <input class="share-input" readonly value="${esc(url)}">`;
      const input = $(".share-input", fb);
      input.focus();
      input.select();
    }
  });

  /* "Ce n'est pas fini !" : la suite (fiches de travail) arrive plus tard */
  const suite = $("#btn-suite");
  suite.addEventListener("click", () => {
    const msg = $("#suite-message");
    const ouvert = suite.getAttribute("aria-expanded") === "true";
    suite.setAttribute("aria-expanded", String(!ouvert));
    msg.hidden = ouvert;
    if (!ouvert && !CV.reduceMotion) {
      suite.classList.remove("wiggle");
      void suite.offsetWidth; // relance l'animation
      suite.classList.add("wiggle");
    }
  });

  // Les polices changent la hauteur du CV : on recalcule une fois chargées
  if (document.fonts) document.fonts.ready.then(infoPages);

  rafraichir();
})();

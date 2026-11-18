/* =========================================================
   BARRE DE PROGRESSION (le menu du haut)
   Se dessine dans <header id="topbar"> à partir de
   <body data-etape="...">. Les étapes visitées se cochent.
   Avant "Votre CV", une bulle ronde montre l'aperçu du CV
   (en grand au survol).
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const { state, esc, $ } = CV;
  const courante = document.body.dataset.etape;

  // La page ouverte compte comme visitée
  if (CV.IDS[courante] && !state.visited.has(courante)) {
    state.visited.add(courante);
    CV.save();
  }

  const topbar = $("#topbar");
  if (!topbar) return;

  topbar.classList.add("topbar");
  topbar.innerHTML = `
    <a class="brand" href="${CV.urlAccueil}" aria-label="Retour à l'accueil">ES</a>
    <nav class="stepper" aria-label="Étapes du CV">
      <div class="stepper-track" aria-hidden="true"><div class="stepper-fill"></div></div>
      <ol></ol>
    </nav>
    <button type="button" class="btn btn-ghost topbar-contact" data-contact aria-label="Me contacter">${CV.iconeContact || ""}<span>Me contacter</span></button>
    <div class="progress-text"></div>`;

  /* ---------- Les cases : 4 étapes, la bulle d'aperçu, puis "Votre CV" ---------- */
  const liste = $(".stepper ol", topbar);
  CV.ETAPES.forEach(e => {
    if (e.key === "cv") liste.insertAdjacentHTML("beforeend", bulleApercu());
    liste.insertAdjacentHTML("beforeend", `<li data-key="${e.key}"></li>`);
  });

  function bulleApercu() {
    return `
      <li class="step step-apercu">
        <button type="button" class="apercu-btn" aria-label="Aperçu du CV" aria-controls="apercu-pop">
          <span class="step-dot apercu-dot"><span class="apercu-mini" aria-hidden="true"></span></span>
          <span class="step-label">Aperçu<span class="step-count"></span></span>
        </button>
        <div class="apercu-pop" id="apercu-pop" role="dialog" aria-label="Aperçu du CV">
          <div class="apercu-pop-head">
            <span><span class="live-dot"></span>Aperçu en direct</span>
            <a href="${CV.urlEtape("cv")}">Ouvrir le CV →</a>
          </div>
          <div class="cv-frame js-preview"></div>
        </div>
      </li>`;
  }

  /* Miniature ronde : le haut de la feuille du CV, en tout petit */
  function miniature(added = []) {
    $(".apercu-mini", topbar).innerHTML = `<div class="cv-scaler">${CV.renderCV()}</div>`;
    $(".step-apercu .step-count", topbar).textContent = state.sel.size;
    if (added.length && !CV.reduceMotion) {
      const dot = $(".apercu-dot", topbar);
      dot.classList.remove("ping");
      void dot.offsetWidth;
      dot.classList.add("ping");
    }
  }

  /* Survol : grand aperçu. Écran tactile : un toucher l'ouvre / le ferme */
  const tactile = window.matchMedia("(hover: none)").matches;
  const bulle = $(".step-apercu", topbar);
  $(".apercu-btn", topbar).addEventListener("click", () => {
    if (tactile) bulle.classList.toggle("is-open");
    else if (courante !== "cv") location.href = CV.urlEtape("cv");
  });
  document.addEventListener("click", e => {
    if (!bulle.contains(e.target)) bulle.classList.remove("is-open");
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") bulle.classList.remove("is-open");
  });

  function dessiner() {
    CV.ETAPES.forEach((e, i) => {
      const li = $(`li[data-key="${e.key}"]`, liste);
      const visited = state.visited.has(e.key);
      const current = e.key === courante;
      const ids = CV.IDS[e.key];
      const count = !ids ? state.sel.size : ids.length ? CV.countIn(e.key) : "";
      li.className = ["step", current && "is-current", visited && "is-visited", e.key === "cv" && "is-final"].filter(Boolean).join(" ");
      li.innerHTML = `
          <a href="${CV.urlEtape(e.key)}" ${current ? 'aria-current="step"' : ""}>
            <span class="step-dot">${visited && !current ? CV.CHECK : i + 1}</span>
            <span class="step-label">${esc(e.label)}<span class="step-count">${count}</span></span>
          </a>`;
    });

    const done = CV.ETAPES_CONTENU.filter(e => state.visited.has(e.key)).length;
    const pct = Math.round((done / CV.ETAPES_CONTENU.length) * 100);
    $(".progress-text", topbar).innerHTML = `<strong>${pct}&nbsp;%</strong><span>parcouru</span>`;

    // La ligne reste grise tant que tout n'est pas parcouru
    const fill = $(".stepper-fill", topbar);
    if (pct < 100) {
      fill.style.width = "0%";
    } else if (!enAnimation) {
      fill.style.width = "100%";
    }
    return pct === 100;
  }

  /* ---------- Animation de complétion : la ligne va de bulle en bulle ---------- */
  let enAnimation = false;
  function animerCompletion() {
    const fill = $(".stepper-fill", topbar);
    const dots = [...topbar.querySelectorAll(".step-dot")];
    const segments = dots.length - 1;
    const DUREE = 320; // ms par segment

    enAnimation = true;
    fill.style.transition = "none";
    fill.style.width = "0%";
    void fill.offsetWidth;
    fill.style.transition = `width ${DUREE}ms linear`;

    const pop = i => {
      dots[i].classList.remove("pop");
      void dots[i].offsetWidth;
      dots[i].classList.add("pop");
    };

    pop(0);
    for (let i = 1; i <= segments; i++) {
      setTimeout(() => { fill.style.width = `${(i / segments) * 100}%`; }, (i - 1) * DUREE);
      setTimeout(() => pop(i), i * DUREE);
    }
    setTimeout(() => {
      enAnimation = false;
      fill.style.transition = "";
      topbar.classList.add("is-complete");
    }, segments * DUREE + 400);
  }

  CV.dessinerBarre = dessiner;
  CV.onChange(dessiner);
  CV.onChange(miniature);
  miniature();

  const doitAnimer = !state.celebre && CV.ETAPES_CONTENU.every(e => state.visited.has(e.key));
  enAnimation = doitAnimer && !CV.reduceMotion; // la ligne attend l'animation au lieu d'apparaître pleine
  const complet = dessiner();
  if (doitAnimer) {
    // Première fois que tout est parcouru : on joue l'animation une seule fois
    state.celebre = true;
    CV.save();
    if (CV.reduceMotion) topbar.classList.add("is-complete");
    else setTimeout(animerCompletion, 350);
  } else if (complet) {
    topbar.classList.add("is-complete");
  }
})();

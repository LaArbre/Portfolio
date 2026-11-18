/* =========================================================
   BARRE DE PROGRESSION (le menu du haut)
   Se dessine dans <header id="topbar"> à partir de
   <body data-etape="...">. Les étapes visitées se cochent.
   Au survol de la bulle "Votre CV" (repérée par un petit œil),
   l'aperçu du CV s'affiche en grand.
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const { state, esc, $ } = CV;
  const courante = document.body.dataset.etape;
  const indexCourant = CV.ETAPES.findIndex(e => e.key === courante);
  const dernierIndex = CV.ETAPES.length - 1;

  // La page ouverte compte comme visitée
  if (CV.IDS[courante] && !state.visited.has(courante)) {
    state.visited.add(courante);
    CV.save();
  }

  const topbar = $("#topbar");
  if (!topbar) return;

  topbar.classList.add("topbar");
  topbar.innerHTML = `
    <a class="brand" href="${CV.urlAccueil}" aria-label="Retour à l'accueil"><span class="optique">ES</span></a>
    <nav class="stepper" aria-label="Étapes du CV">
      <div class="stepper-track" aria-hidden="true"><div class="stepper-fill"></div></div>
      <ol></ol>
    </nav>
    <button type="button" class="btn btn-ghost topbar-contact" data-contact aria-label="Me contacter">${CV.iconeContact || ""}<span>Me contacter</span></button>
    <div class="progress-text"></div>`;

  /* ---------- Les cases : une par étape ---------- */
  const liste = $(".stepper ol", topbar);
  CV.ETAPES.forEach(e => liste.insertAdjacentHTML("beforeend", `<li data-key="${e.key}"></li>`));

  /* ---------- Aperçu du CV au survol de la bulle "Votre CV" ----------
     Un petit œil sur la bulle signale qu'on peut y jeter un œil.
     Pas d'aperçu sur la page CV elle-même (le CV y est déjà affiché). */
  const avecApercu = courante !== "cv";
  const OEIL = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>`;
  const liCV = $('li[data-key="cv"]', liste);
  if (avecApercu) {
    liCV.insertAdjacentHTML("beforeend", `
      <div class="apercu-pop" id="apercu-pop" role="dialog" aria-label="Aperçu du CV">
        <div class="apercu-pop-head">
          <span><span class="live-dot"></span>Aperçu en direct</span>
          <a href="${CV.urlEtape("cv")}">Ouvrir le CV →</a>
        </div>
        <div class="cv-frame js-preview"></div>
      </div>`);
  }

  /* L'œil "respire" quand le CV change */
  function signalerChangement(added = []) {
    if (!avecApercu || !added.length || CV.reduceMotion) return;
    const oeil = $(".dot-oeil", liCV);
    if (!oeil) return;
    oeil.classList.remove("ping");
    void oeil.offsetWidth;
    oeil.classList.add("ping");
  }

  /* Écran tactile (pas de survol) : 1er toucher = aperçu, le lien "Ouvrir le CV" mène à la page */
  const tactile = window.matchMedia("(hover: none)").matches;
  if (avecApercu) {
    liCV.addEventListener("click", e => {
      const lien = e.target.closest("li > a");
      if (tactile && lien && !liCV.classList.contains("is-open")) {
        e.preventDefault();
        liCV.classList.add("is-open");
      }
    });
    document.addEventListener("click", e => { if (!liCV.contains(e.target)) liCV.classList.remove("is-open"); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") liCV.classList.remove("is-open"); });
  }

  /* Une seule fois par visite : l'aperçu "sort" un instant de la bulle puis s'y range,
     pour montrer qu'il est là sans rien avoir à expliquer */
  function teaser() {
    if (!avecApercu || CV.reduceMotion) return;
    try {
      if (sessionStorage.getItem("cvb:teaser")) return;
      sessionStorage.setItem("cvb:teaser", "1");
    } catch { /* pas de stockage : on montre quand même */ }
    setTimeout(() => {
      liCV.classList.add("is-teaser");
      setTimeout(() => liCV.classList.remove("is-teaser"), 1800);
    }, 1200);
  }

  function dessiner() {
    CV.ETAPES.forEach((e, i) => {
      const li = $(`li[data-key="${e.key}"]`, liste);
      // Une bulle n'est "complète" (cochée) que si elle a été visitée ET qu'elle est avant la page en cours
      const visited = i < indexCourant && state.visited.has(e.key);
      const current = e.key === courante;
      const ouvert = li.classList.contains("is-open");
      li.className = ["step", current && "is-current", visited && "is-visited", e.key === "cv" && "is-final",
        e.key === "cv" && avecApercu && "has-apercu", ouvert && "is-open"].filter(Boolean).join(" ");
      const lien = `
          <a href="${CV.urlEtape(e.key)}" ${current ? 'aria-current="step"' : ""}>
            <span class="step-dot">${visited && !current ? CV.CHECK : `<span class="optique">${i + 1}</span>`}${e.key === "cv" && avecApercu ? `<span class="dot-oeil">${OEIL}</span>` : ""}</span>
            <span class="step-label">${esc(e.label)}</span>
          </a>`;
      // On ne remplace que le lien : l'aperçu (s'il y en a un) reste en place
      const ancien = li.querySelector(":scope > a");
      if (ancien) ancien.outerHTML = lien;
      else li.insertAdjacentHTML("afterbegin", lien);
    });

    CV.optique(topbar);

    const done = CV.ETAPES_CONTENU.filter(e => state.visited.has(e.key)).length;
    const pct = Math.round((done / CV.ETAPES_CONTENU.length) * 100);
    $(".progress-text", topbar).innerHTML = `<strong>${pct}&nbsp;%</strong><span>parcouru</span>`;

    // La ligne reste grise tant que tout n'est pas parcouru
    const fill = $(".stepper-fill", topbar);
    if (pct < 100) {
      fill.style.width = "0%";
    } else if (!enAnimation) {
      fill.style.width = `${(indexCourant / dernierIndex) * 100}%`;
    }
    return pct === 100;
  }

  /* ---------- Animation de complétion : la ligne va de bulle en bulle ---------- */
  let enAnimation = false;
  function animerCompletion() {
    const fill = $(".stepper-fill", topbar);
    const dots = [...topbar.querySelectorAll(".step-dot")];
    // La ligne va de bulle en bulle jusqu'à la page en cours (pas au-delà)
    const segments = Math.max(indexCourant, 0);
    const total = dots.length - 1;
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
      setTimeout(() => { fill.style.width = `${(i / total) * 100}%`; }, (i - 1) * DUREE);
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
  CV.onChange(signalerChangement);
  CV.onChange(() => CV.optique());
  teaser();

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

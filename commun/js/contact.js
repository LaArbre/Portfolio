/* =========================================================
   ME CONTACTER
   Un panneau (pas une page) qui s'ouvre depuis n'importe quel
   élément portant l'attribut data-contact :
   - écrire un email / copier l'adresse
   - appeler / copier le numéro
   - voir le GitHub
   - ajouter à ses contacts (fichier .vcf)
   ========================================================= */
(() => {
  "use strict";

  const CV = window.CV;
  const p = window.CV_DATA.profil;
  const { esc } = CV;
  const trouver = id => p.contacts.find(c => c.id === id);

  const mail = trouver("c-mail");
  const tel = trouver("c-tel");
  const github = trouver("c-github");
  const ville = trouver("c-ville");

  const ICONES = {
    mail: '<path d="M3 6.5h18v11H3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.5 7l8.5 6.5L20.5 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    tel: '<path d="M7 3.5h3l1.5 4-2 1.3a11 11 0 0 0 5.7 5.7l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    lieu: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/>'
  };
  const icone = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONES[n]}</svg>`;
  CV.iconeContact = icone("mail");

  const sujet = encodeURIComponent("Prise de contact depuis votre portfolio");

  const ligne = (ic, label, valeur, actions) => `
    <li class="contact-ligne">
      <span class="contact-ic">${icone(ic)}</span>
      <span class="contact-txt"><small>${label}</small><strong>${esc(valeur)}</strong></span>
      <span class="contact-actions">${actions}</span>
    </li>`;
  const copier = v => `<button type="button" class="btn btn-ghost btn-sm" data-copier="${esc(v)}">Copier</button>`;

  /* ---------- Le panneau ---------- */
  const dlg = document.createElement("dialog");
  dlg.className = "contact-dialog";
  dlg.setAttribute("aria-labelledby", "contact-titre");
  dlg.innerHTML = `
    <div class="contact-head">
      <div>
        <h2 id="contact-titre">Me contacter</h2>
        ${p.disponibilite ? `<p class="contact-dispo">${esc(p.disponibilite)}</p>` : ""}
      </div>
      <button type="button" class="contact-close" aria-label="Fermer"><span class="optique">×</span></button>
    </div>
    <ul class="contact-liste">
      ${mail ? ligne("mail", "Email", mail.value,
        `<a class="btn btn-primary btn-sm" href="mailto:${esc(mail.value)}?subject=${sujet}">Écrire</a>${copier(mail.value)}`) : ""}
      ${tel ? ligne("tel", "Téléphone", tel.value,
        `<a class="btn btn-ghost btn-sm" href="${esc(tel.href)}">Appeler</a>${copier(tel.value)}`) : ""}
      ${github ? ligne("code", "GitHub", github.value,
        `<a class="btn btn-ghost btn-sm" href="${esc(github.href)}" target="_blank" rel="noopener">Voir ↗</a>`) : ""}
      ${ville ? ligne("lieu", "Basé à", ville.value, "") : ""}
    </ul>
    <div class="contact-pied">
      <button type="button" class="link-btn" id="contact-vcard">Ajouter à mes contacts (.vcf)</button>
      <span class="contact-retour" role="status"></span>
    </div>`;
  document.body.appendChild(dlg);
  if (document.fonts) document.fonts.ready.then(() => CV.optique(dlg));

  const retour = dlg.querySelector(".contact-retour");
  let minuteur;
  const annoncer = txt => {
    retour.textContent = txt;
    clearTimeout(minuteur);
    minuteur = setTimeout(() => (retour.textContent = ""), 2500);
  };

  /* ---------- Ouverture / fermeture ---------- */
  document.addEventListener("click", e => {
    if (e.target.closest("[data-contact]")) {
      e.preventDefault();
      dlg.showModal();
      CV.optique(dlg);
    }
  });
  dlg.querySelector(".contact-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  /* ---------- Copier ---------- */
  dlg.addEventListener("click", async e => {
    const b = e.target.closest("[data-copier]");
    if (!b) return;
    try {
      await navigator.clipboard.writeText(b.dataset.copier);
      annoncer(`Copié : ${b.dataset.copier}`);
    } catch {
      annoncer(b.dataset.copier); // presse-papiers indisponible : on affiche la valeur
    }
  });

  /* ---------- Fiche contact .vcf ---------- */
  dlg.querySelector("#contact-vcard").addEventListener("click", () => {
    const vcf = [
      "BEGIN:VCARD", "VERSION:3.0",
      `N:${p.nom};${p.prenom};;;`, `FN:${p.prenom} ${p.nom}`,
      mail && `EMAIL;TYPE=INTERNET:${mail.value}`,
      tel && `TEL;TYPE=CELL:${tel.href.replace("tel:", "")}`,
      p.site && `URL:${p.site}`,
      ville && `ADR;TYPE=HOME:;;;${ville.value.replace(/\s*\(.*\)/, "")};;;France`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
    const url = URL.createObjectURL(new Blob([vcf], { type: "text/vcard" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${p.prenom}_${p.nom}.vcf` });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    annoncer("Fiche contact téléchargée");
  });
})();

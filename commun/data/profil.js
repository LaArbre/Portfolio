/* =========================================================
   CONTENU — Profil
   Ces informations sont toujours sur le CV : le visiteur
   ne les choisit pas. Seule l'accroche est à choisir.
   ========================================================= */
window.CV_DATA = window.CV_DATA || {};

CV_DATA.profil = {
  prenom: "Elio",
  nom: "Spaeth",

  // Le visiteur indique ce qu'il cherche : ça devient le titre du CV
  // (la première est celle affichée par défaut)
  accroches: [
    { id: "acc-poly", label: "Un profil back-end & sécurité", text: "Back-end, bases de données & cybersécurité" },
    { id: "acc-dev", label: "Un développeur back-end", text: "Développeur back-end & bases de données" },
    { id: "acc-cyber", label: "Un profil cybersécurité", text: "Profil junior en cybersécurité" }
  ],

  // Affiché dans le bandeau du CV et sur la page Profil
  disponibilite: "Disponible immédiatement",

  resume:
    "Titulaire d'un BTS SIO option SLAM (2026), je me suis spécialisé dans le développement back-end, les bases de données et la cybersécurité. Polyvalent entre développement et infrastructure réseau, je suis ouvert aux opportunités : premier emploi, alternance ou mission.",

  // Adresse du site : encodée dans le QR code du bandeau du CV
  site: "https://laarbre.github.io/Portfolio/",

  // Ordre = ordre d'affichage. "cv: true" -> dans le bandeau du CV
  contacts: [
    { id: "c-ville", label: "Ville", value: "Strasbourg (67)", cv: true },
    { id: "c-tel", label: "Téléphone", value: "07 67 02 38 19", href: "tel:+33767023819", cv: true },
    { id: "c-mail", label: "Email", value: "eliospaeth.contact@gmail.com", href: "mailto:eliospaeth.contact@gmail.com", cv: true },
    { id: "c-github", label: "GitHub", value: "github.com/laarbre", href: "https://github.com/laarbre" }
  ],

  langues: [
    { id: "l-fr", name: "Français", level: "C2" },
    { id: "l-en", name: "Anglais", level: "C1" },
    { id: "l-de", name: "Allemand", level: "B1" }
  ],

  loisirs: [
    { id: "h-dev", name: "Développement perso" },
    { id: "h-esc", name: "Escalade" },
    { id: "h-flute", name: "Flûte traversière" }
  ],

  // Affiché sur la page Profil uniquement (pas sur le CV)
  objectifs: {
    court: ["Trouver ma première expérience après le BTS : emploi ou alternance", "Approfondir le back-end et les bases de données", "Approfondir la cybersécurité"],
    long: ["Me spécialiser en back-end et bases de données", "Évoluer vers la cybersécurité", "Me former en continu"]
  }
};

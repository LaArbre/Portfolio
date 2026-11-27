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
    { id: "acc-poly", label: "Un profil back-end et sécurité", text: "Développeur back-end, bases de données et cybersécurité" },
    { id: "acc-dev", label: "Un développeur back-end", text: "Développeur back-end et bases de données" },
    { id: "acc-cyber", label: "Un profil cybersécurité", text: "Profil junior en cybersécurité" }
  ],

  // Affiché dans le bandeau du CV et sur la page Profil
  disponibilite: "Disponible immédiatement",

  resume:
    "Diplômé d'un BTS SIO option SLAM en 2026, je développe principalement en Python et je travaille sur des bases de données relationnelles. Mes stages m'ont aussi amené à intervenir sur des réseaux et des serveurs Linux et Windows. Je recherche un premier emploi, une alternance ou une mission en développement back-end ou en cybersécurité.",

  // Adresse du site : encodée dans le QR code du bandeau du CV
  site: "https://laarbre.github.io/Portfolio/",

  // Ordre = ordre d'affichage. "cv: true" -> dans le bandeau du CV
  contacts: [
    { id: "c-ville", label: "Ville", value: "Strasbourg (67)", cv: true },
    { id: "c-tel", label: "Téléphone", value: "07 67 02 38 19", href: "tel:+33767023819", cv: true },
    { id: "c-mail", label: "Email", value: "eliospaeth.contact@gmail.com", href: "mailto:eliospaeth.contact@gmail.com", cv: true },
    { id: "c-permis", label: "Permis", value: "Permis B, véhiculé" },
    { id: "c-github", label: "GitHub", value: "github.com/laarbre", href: "https://github.com/laarbre" }
  ],

  langues: [
    { id: "l-fr", name: "Français", level: "C2" },
    { id: "l-en", name: "Anglais", level: "C1" },
    { id: "l-de", name: "Allemand", level: "B1" }
  ],

  loisirs: [
    { id: "h-dev", name: "Projets de développement personnels" },
    { id: "h-esc", name: "Escalade" },
    { id: "h-flute", name: "Flûte traversière" }
  ],

  // Affiché sur la page Profil uniquement (pas sur le CV)
  objectifs: {
    court: ["Obtenir un premier poste ou une alternance après le BTS", "Progresser en développement back-end et en bases de données", "Renforcer mes compétences en cybersécurité"],
    long: ["Me spécialiser en back-end et en bases de données", "Évoluer vers un poste en cybersécurité", "Continuer à me former"]
  }
};

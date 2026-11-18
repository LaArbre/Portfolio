/* =========================================================
   CONTENU — Parcours
   Chaque élément a un "id" unique.
   on: true  -> coché par défaut dans le CV
   on: false -> proposé, mais décoché par défaut
   ========================================================= */
window.CV_DATA = window.CV_DATA || {};

CV_DATA.experiences = [
  {
    id: "x-tech",
    role: "Stage Développeur",
    company: "TechAlchemy",
    date: "Janv. – févr. 2026",
    tags: ["Python", "IA"],
    bullets: ["Conception et réalisation de plusieurs projets, dont des outils d'IA"],
    on: true
  },
  {
    id: "x-jgsi",
    role: "Stage Développeur & Réseau",
    company: "JGSI — Strasbourg",
    date: "Juin – juillet 2025",
    tags: ["Python", "Bash", "Réseau", "Sécurité"],
    bullets: [
      "Déploiement et optimisation de scripts d'automatisation",
      "Mise en place de solutions de sécurisation réseau",
      "Support technique et maintenance de l'infrastructure",
      "Documentation technique des procédures"
    ],
    on: true
  },
  {
    id: "x-md6",
    role: "Stage Développement",
    company: "MD6 — Entzheim",
    date: "Août 2024",
    tags: ["JavaScript", "Bash", "Excel / VBA"],
    bullets: [
      "Développement d'interfaces utilisateur en JavaScript",
      "Automatisation de processus avec des scripts Bash",
      "Macros Excel pour l'analyse de données",
      "Maintenance corrective et évolutive d'applications"
    ],
    on: true
  },
  {
    id: "x-alstom",
    role: "Stage Test & Validation",
    company: "Alstom — Reichshoffen",
    date: "2020",
    tags: ["Tests", "Systèmes embarqués"],
    bullets: [
      "Tests des systèmes informatiques embarqués",
      "Participation aux campagnes d'essais et rédaction de rapports"
    ],
    on: false
  }
];

CV_DATA.formations = [
  { id: "f-bts", title: "BTS SIO — option SLAM", school: "Développement d'applications", date: "Obtenu en 2026", on: true },
  { id: "f-mc", title: "MC Services Numériques aux Organisations", school: "Bureautique et e-réputation", date: "Obtenue en 2026", on: false },
  { id: "f-bac", title: "Bac STI2D — option SIN", school: "Systèmes d'information et numérique", date: "2024", on: true }
];

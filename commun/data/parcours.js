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
    bullets: [
      "Conception et réalisation de plusieurs projets, dont des outils d'IA",
      "Prise en compte des enjeux de sécurité propres aux technologies d'IA"
    ],
    on: true
  },
  {
    id: "x-jgsi",
    role: "Stage Développeur & Réseau",
    company: "JGSI — Strasbourg",
    date: "Juin – juillet 2025",
    tags: ["Python", "Bash", "Réseau", "Sécurité", "Linux / Windows"],
    bullets: [
      "Gestion de projet : déploiement et optimisation de scripts d'automatisation",
      "Administration réseau et de postes Linux et Windows",
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
      "Maintenance corrective et évolutive d'applications",
      "Prise en main d'une base de code existante et contribution à son évolution"
    ],
    on: true
  },
  {
    id: "x-aldi",
    role: "Employé polyvalent",
    company: "Aldi — Soultz-sous-Forêts",
    date: "2025",
    tags: ["Relation client", "Travail en équipe"],
    bullets: [
      "Encaissement et accueil de la clientèle",
      "Mise en rayon et réassort, à un rythme soutenu"
    ],
    on: false
  },
  {
    id: "x-didiland",
    role: "Opérateur de manège",
    company: "DidiLand",
    date: "Saisons 2023 et 2024",
    tags: ["Sécurité", "Accueil du public"],
    bullets: [
      "Exploitation seul de la Bûche et en binôme du Didi-Raft",
      "Sécurité des visiteurs, contrôle des accès et gestion des files d'attente"
    ],
    on: false
  },
  {
    id: "x-mairie",
    role: "Agent polyvalent",
    company: "Commune de Mertzwiller",
    date: "2022",
    tags: ["Travaux", "Administratif"],
    bullets: [
      "Travaux électriques et travaux de terrain",
      "Entretien des espaces verts et des espaces publics",
      "Tâches administratives"
    ],
    on: false
  },
  {
    id: "x-alstom",
    role: "Stage d'observation — Test & Validation",
    company: "Alstom — Reichshoffen",
    date: "2020",
    tags: ["Tests", "Systèmes embarqués"],
    bullets: [
      "Tests des systèmes informatiques et numériques embarqués d'un train",
      "Participation aux campagnes d'essais et rédaction de rapports"
    ],
    on: false
  }
];

CV_DATA.formations = [
  { id: "f-bts", title: "BTS SIO — option SLAM", school: "Lycée René Cassin, Strasbourg · Développement d'applications", date: "2024 – 2026", on: true },
  { id: "f-mc", title: "MC Services Numériques aux Organisations", school: "Bureautique et e-réputation", date: "2023 – 2024", on: false },
  { id: "f-bac", title: "Bac STI2D — option SIN", school: "Systèmes d'information et numérique", date: "2020 – 2023", on: true }
];

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
    role: "Stage développeur",
    company: "TechAlchemy",
    date: "Janv. – févr. 2026",
    tags: ["Python", "IA"],
    bullets: [
      "Développement de plusieurs projets, dont des outils utilisant l'IA",
      "Prise en compte des risques de sécurité liés à ces outils"
    ],
    on: true
  },
  {
    id: "x-jgsi",
    role: "Stage développeur et réseau",
    company: "JGSI — Strasbourg",
    date: "Juin – juillet 2025",
    tags: ["Python", "Bash", "Réseau", "Sécurité", "Linux / Windows"],
    bullets: [
      "Suivi du déploiement de scripts d'automatisation et de leur optimisation",
      "Administration du réseau et de postes Linux et Windows",
      "Mise en place de mesures de sécurisation du réseau",
      "Support technique et maintenance de l'infrastructure",
      "Rédaction de la documentation des procédures"
    ],
    on: true
  },
  {
    id: "x-md6",
    role: "Stage développeur",
    company: "MD6 — Entzheim",
    date: "Août 2024",
    tags: ["JavaScript", "Bash", "Excel / VBA"],
    bullets: [
      "Développement d'interfaces utilisateur en JavaScript",
      "Automatisation de tâches par scripts Bash",
      "Création de macros Excel pour l'analyse de données",
      "Maintenance corrective et évolutive sur une base de code existante"
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
      "Encaissement et accueil des clients",
      "Mise en rayon et réassort"
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
      "Conduite de la Bûche en autonomie et du Didi-Raft en binôme",
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
      "Petits travaux électriques et travaux d'entretien",
      "Entretien des espaces verts et des espaces publics",
      "Tâches administratives"
    ],
    on: false
  },
  {
    id: "x-alstom",
    role: "Stage d'observation",
    company: "Alstom — Reichshoffen",
    date: "2020",
    tags: ["Tests", "Systèmes embarqués"],
    bullets: [
      "Découverte des tests des systèmes informatiques embarqués d'un train",
      "Participation aux campagnes d'essais et à la rédaction des rapports"
    ],
    on: false
  }
];

CV_DATA.formations = [
  { id: "f-bts", title: "BTS SIO — option SLAM", school: "Lycée René Cassin, Strasbourg · Développement d'applications", date: "2024 – 2026", on: true },
  { id: "f-mc", title: "MC Services Numériques aux Organisations", school: "Bureautique et e-réputation", date: "2023 – 2024", on: false },
  { id: "f-bac", title: "Bac STI2D — option SIN", school: "Systèmes d'information et numérique", date: "2020 – 2023", on: true }
];

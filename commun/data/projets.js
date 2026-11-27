/* =========================================================
   CONTENU — Projets
   Chaque élément a un "id" unique.
   on: true  -> coché par défaut dans le CV
   on: false -> proposé, mais décoché par défaut
   ========================================================= */
window.CV_DATA = window.CV_DATA || {};

CV_DATA.projets = [
  {
    id: "p-pwd",
    title: "Gestionnaire de mots de passe",
    stack: "Python · SQLite",
    desc: "Stockage chiffré des identifiants, mot de passe maître haché et salé.",
    on: true
  },
  {
    id: "p-agent",
    title: "AgentNLU",
    stack: "Python · NLP",
    desc: "Prototype d'agent conversationnel qui interprète des demandes en langage naturel.",
    link: "https://github.com/laarbre/AgentNLU",
    on: true
  },
  {
    id: "p-orm",
    title: "UniPyORM",
    stack: "Python · ORM",
    desc: "ORM léger en Python pour manipuler des bases de données relationnelles.",
    link: "https://github.com/laarbre/UniPyORM",
    on: true
  },
  {
    id: "p-music",
    title: "Application de musique",
    year: "2024",
    stack: "JavaScript · VM serveur",
    desc: "Application web d'écoute et de téléchargement de musique, hébergée sur une machine virtuelle. Réalisée seul, de la conception à la mise en ligne.",
    on: true
  },
  {
    id: "p-comm",
    title: "Traitement communication",
    year: "2025",
    stack: "Python · SQLite",
    desc: "Script de collecte et d'archivage de données dans une base SQLite.",
    on: false
  },
  {
    id: "p-notes",
    title: "Notes sécurisées",
    stack: "Python · Tkinter · SQLite",
    desc: "Application de prise de notes protégée par authentification.",
    on: false
  },
  {
    id: "p-bot",
    title: "Bot Discord",
    year: "2023",
    stack: "Python",
    desc: "Gestion des rôles, automatisation de tâches et animations sur un serveur Discord.",
    on: false
  },
  {
    id: "p-bklight",
    title: "BkLightToolkit",
    stack: "Python · Matériel",
    desc: "Bibliothèque pour piloter les matrices LED BK-Light ACT1026.",
    link: "https://github.com/laarbre/BkLightToolkit",
    on: false
  }
];

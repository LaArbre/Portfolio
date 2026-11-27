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
    desc: "Prototype d'agent conversationnel avec compréhension du langage naturel.",
    link: "https://github.com/laarbre/AgentNLU",
    on: true
  },
  {
    id: "p-orm",
    title: "UniPyORM",
    stack: "Python · ORM",
    desc: "ORM Python léger pour gérer simplement des bases relationnelles.",
    link: "https://github.com/laarbre/UniPyORM",
    on: true
  },
  {
    id: "p-music",
    title: "Application de musique",
    year: "2024",
    stack: "JavaScript · VM serveur",
    desc: "Application de streaming musical hébergée sur une VM serveur, menée seul de l'architecture à la mise en production.",
    on: true
  },
  {
    id: "p-comm",
    title: "Traitement communication",
    year: "2025",
    stack: "Python · SQLite",
    desc: "Collecte et archivage de données dans une base SQLite.",
    on: false
  },
  {
    id: "p-notes",
    title: "Notes sécurisées",
    stack: "Python · Tkinter · SQLite",
    desc: "Application de prise de notes avec authentification sécurisée.",
    on: false
  },
  {
    id: "p-bot",
    title: "Bot Discord",
    year: "2023",
    stack: "Python",
    desc: "Robot qui gère les rôles, automatise des tâches et propose des activités sur un serveur.",
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

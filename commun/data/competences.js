/* =========================================================
   CONTENU — Compétences
   Pour chaque compétence :
     desc    : ce qu'elle recouvre pour moi, en une phrase
     usages  : où je l'ai utilisée (id d'une expérience, d'une
               formation ou d'un projet) -> la date s'affiche seule
     on      : sur le CV par défaut ?
   ⚠ Les descriptions sont un premier jet à relire.
   ========================================================= */
window.CV_DATA = window.CV_DATA || {};

CV_DATA.competences = [
  {
    id: "g-db",
    label: "Données",
    items: [
      {
        id: "s-sql", name: "SQL — MySQL, SQLite", on: true,
        desc: "Conception de bases relationnelles et écriture de requêtes.",
        usages: ["p-comm", "p-pwd", "p-notes", "f-bts"]
      },
      {
        id: "s-mvc", name: "MVC & ORM", on: true,
        desc: "Organiser une application en couches ; j'ai écrit mon propre ORM en Python.",
        usages: ["p-orm", "f-bts"]
      }
    ]
  },
  {
    id: "g-lang",
    label: "Langages",
    items: [
      {
        id: "s-py", name: "Python", on: true,
        desc: "Mon langage principal : automatisation, bases de données SQLite, bots et outils d'IA.",
        usages: ["x-tech", "x-jgsi", "p-agent", "p-orm", "p-pwd", "p-bot"]
      },
      {
        id: "s-js", name: "JavaScript", on: true,
        desc: "Interfaces web dynamiques, en entreprise comme en projet personnel.",
        usages: ["x-md6", "p-music"]
      },
      {
        id: "s-php", name: "PHP", on: true,
        desc: "Développement web côté serveur, structuré en modèle MVC.",
        usages: ["f-bts"]
      },
      {
        id: "s-html", name: "HTML / CSS", on: true,
        desc: "Structure et mise en page d'interfaces web, dont ce portfolio.",
        usages: ["p-music", "f-bts"]
      },
      {
        id: "s-bash", name: "Bash", on: true,
        desc: "Scripts d'automatisation et administration de machines Linux.",
        usages: ["x-jgsi", "x-md6"]
      },
      {
        id: "s-autres", name: "Java, C++, Windev, PowerShell", on: false,
        desc: "Langages déjà pratiqués en formation, que je peux reprendre rapidement.",
        usages: ["f-bts"]
      }
    ]
  },
  {
    id: "g-sec",
    label: "Cybersécurité",
    items: [
      {
        id: "s-crypto", name: "Hachage, salage, chiffrement", on: true,
        desc: "Protéger des mots de passe et des données stockées.",
        usages: ["p-pwd", "p-notes"]
      },
      {
        id: "s-rgpd", name: "RGPD", on: true,
        desc: "Obligations d'une application qui traite des données personnelles, référentiels ANSSI et CNIL.",
        usages: ["f-bts"]
      },
      {
        id: "s-osint", name: "OSINT", on: true,
        desc: "Recherche d'informations en sources ouvertes.",
        usages: []
      }
    ]
  },
  {
    id: "g-net",
    label: "Système & réseau",
    items: [
      {
        id: "s-linux", name: "Linux, Windows & virtualisation", on: true,
        desc: "Mise en place et administration de serveurs, de postes et de machines virtuelles.",
        usages: ["x-jgsi", "p-music"]
      },
      {
        id: "s-reseau", name: "Réseau — IP, SSH, FTP, Nmap", on: true,
        desc: "Adressage, accès distants et analyse d'un réseau, sécurisation d'infrastructure.",
        usages: ["x-jgsi"]
      },
      {
        id: "s-git", name: "Git & GitHub", on: true,
        desc: "Versionner mon code et publier mes projets.",
        usages: ["p-orm", "p-agent", "p-bklight"]
      }
    ]
  },
  {
    id: "g-office",
    label: "Bureautique",
    items: [
      {
        id: "s-vba", name: "Excel & macros VBA", on: false,
        desc: "Automatiser l'analyse de données dans des tableurs.",
        usages: ["x-md6"]
      },
      {
        id: "s-libre", name: "LibreOffice / OpenOffice", on: false,
        desc: "Suites bureautiques libres, pratiquées notamment en MC SNO.",
        usages: ["f-mc"]
      }
    ]
  }
];

/* Certifications : toujours sur le CV */
CV_DATA.certifications = ["Cisco", "Pix", "ANSSI", "CNIL"];

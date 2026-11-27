/* =========================================================
   CONTENU — Compétences
   Pour chaque compétence :
     desc    : ce qu'elle recouvre pour moi, en une phrase
     usages  : où je l'ai utilisée (id d'une expérience, d'une
               formation ou d'un projet) -> la date s'affiche seule
     on      : sur le CV par défaut ?
   ========================================================= */
window.CV_DATA = window.CV_DATA || {};

CV_DATA.competences = [
  {
    id: "g-db",
    label: "Données",
    items: [
      {
        id: "s-sql", name: "SQL — MySQL, SQLite", on: true,
        desc: "Modélisation de bases relationnelles et écriture de requêtes.",
        usages: ["p-comm", "p-pwd", "p-notes", "f-bts"]
      },
      {
        id: "s-mvc", name: "MVC & ORM", on: true,
        desc: "Architecture d'application en couches ; développement d'un ORM en Python.",
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
        desc: "Langage principal : scripts d'automatisation, bases SQLite, bots, outils d'IA.",
        usages: ["x-tech", "x-jgsi", "p-agent", "p-orm", "p-pwd", "p-bot"]
      },
      {
        id: "s-js", name: "JavaScript", on: true,
        desc: "Interfaces web, en stage et en projet personnel.",
        usages: ["x-md6", "p-music"]
      },
      {
        id: "s-php", name: "PHP", on: true,
        desc: "Développement côté serveur selon le modèle MVC.",
        usages: ["f-bts"]
      },
      {
        id: "s-html", name: "HTML / CSS", on: true,
        desc: "Intégration d'interfaces web, dont ce portfolio.",
        usages: ["p-music", "f-bts"]
      },
      {
        id: "s-bash", name: "Bash", on: true,
        desc: "Scripts d'automatisation et administration de serveurs Linux.",
        usages: ["x-jgsi", "x-md6"]
      },
      {
        id: "s-autres", name: "Java, C++, Windev, PowerShell", on: false,
        desc: "Langages étudiés en formation.",
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
        desc: "Protection des mots de passe et des données stockées.",
        usages: ["p-pwd", "p-notes"]
      },
      {
        id: "s-rgpd", name: "RGPD", on: true,
        desc: "Obligations liées aux données personnelles ; recommandations de l'ANSSI et de la CNIL.",
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
        desc: "Installation et administration de serveurs, de postes et de machines virtuelles.",
        usages: ["x-jgsi", "p-music"]
      },
      {
        id: "s-reseau", name: "Réseau — IP, SSH, FTP, Nmap", on: true,
        desc: "Adressage IP, accès à distance, analyse et sécurisation d'un réseau.",
        usages: ["x-jgsi"]
      },
      {
        id: "s-git", name: "Git & GitHub", on: true,
        desc: "Gestion de versions et publication de mes projets.",
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
        desc: "Automatisation de l'analyse de données dans Excel.",
        usages: ["x-md6"]
      },
      {
        id: "s-libre", name: "LibreOffice / OpenOffice", on: false,
        desc: "Utilisées pendant la MC SNO.",
        usages: ["f-mc"]
      }
    ]
  }
];

/* Certifications : toujours sur le CV */
CV_DATA.certifications = ["Cisco", "Pix", "ANSSI", "CNIL"];

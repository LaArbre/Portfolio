# Portfolio — Elio Spaeth

Un portfolio qui fonctionne comme un **générateur de CV à la carte** :
le visiteur parcourt 4 étapes (Profil, Compétences, Parcours, Projets),
coche ce qui l'intéresse, et télécharge un CV d'une page en PDF.

[Voir le site](https://laarbre.github.io/Portfolio/)

## Organisation

Une page = un dossier, avec son HTML, son CSS et son JS.
Ce qui sert à plusieurs pages est dans `commun/`.

```
index.html              Accueil (doit rester à la racine pour GitHub Pages)
accueil/                CSS + JS de l'accueil
profil/                 index.html · profil.css · profil.js
competences/            index.html · competences.css · competences.js
parcours/               index.html · parcours.css · parcours.js
projets/                index.html · projets.css · projets.js
cv/                     index.html · cv.css · cv.js   (CV final, PDF, lien partageable)

commun/
  data/                 LE CONTENU : profil.js, competences.js, parcours.js, projets.js
  css/
    base.css            couleurs, typo, boutons, mise en page générale
    barre-progression.css
    etape.css           cases à cocher, cartes, aperçu en direct
    feuille-cv.css      la feuille A4 du CV + règles d'impression
  js/
    etat.js             sélection du visiteur (sauvegardée dans le navigateur), lien partageable
    rendu-cv.js         fabrique le CV, aperçus, export PDF
    barre-progression.js
    etape.js            composants et comportements communs aux 4 étapes
  favicon.svg

```

Ordre de chargement des scripts dans chaque page :
contenu (`commun/data/*`) → `etat.js` → `rendu-cv.js` → `barre-progression.js` → `etape.js` → script de la page.

## Modifier le contenu

Tout se passe dans `commun/data/`. Chaque élément a un `id` unique et
`on: true/false` pour dire s'il est coché par défaut.

## Ajouter une étape

1. Créer un dossier `ma-page/` avec `index.html`, `ma-page.css`, `ma-page.js` (copier `projets/`).
2. Ajouter l'étape dans `CV.ETAPES` (`commun/js/etat.js`).

## Tester en local

Les liens pointent directement vers les fichiers (`profil/index.html`…) : on peut ouvrir `index.html` en double-cliquant.
Pour être au plus près de GitHub Pages, on peut aussi lancer un petit serveur :

```
python -m http.server 8123
```
puis ouvrir http://localhost:8123

## Technologies

HTML, CSS, JavaScript, sans framework ni étape de build. Compatible GitHub Pages.

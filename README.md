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
    base.css            polices, couleurs, typo, boutons, mise en page générale
    contact.css         le panneau « Me contacter »
    barre-progression.css
    etape.css           cases à cocher, cartes, aperçu en direct
    feuille-cv.css      la feuille A4 du CV + règles d'impression
  js/
    etat.js             sélection du visiteur (sauvegardée dans le navigateur), lien partageable
    rendu-cv.js         fabrique le CV, aperçus, export PDF
    barre-progression.js
    etape.js            composants et comportements communs aux 4 étapes
    contact.js          le panneau « Me contacter »
    qrcode.min.js       bibliothèque qrcode-generator 1.4.4 (MIT), copie locale
  polices/              Fraunces et Inter en woff2 (licence SIL OFL), hébergées ici
  og.png                image d'aperçu quand le lien du site est partagé (1200×630)
  favicon.svg

```

Ordre de chargement des scripts dans chaque page (tous en `defer`, dans le `<head>`) :
contenu (`commun/data/*`) → `qrcode.min.js` → `etat.js` → `rendu-cv.js` → `contact.js` → `barre-progression.js` → `etape.js` → script de la page.

## Sécurité

Le site ne charge plus rien depuis l'extérieur (polices et bibliothèque QR sont dans `commun/`).
Chaque page déclare une politique de sécurité (`Content-Security-Policy`) dans une balise `<meta>`,
puisque GitHub Pages ne permet pas d'ajouter des en-têtes HTTP. Elle n'autorise que les fichiers du site.

⚠ Si tu modifies le petit script en ligne du `<head>` (`document.documentElement.classList.add("chargement")`),
il faut recalculer son empreinte `sha256-…` dans la balise CSP de chaque page, sinon il sera bloqué :

```
printf '%s' 'document.documentElement.classList.add("chargement")' | openssl dgst -sha256 -binary | base64
```

## Lien partageable

Le bouton « Copier le lien de cette version » produit une adresse du type
`cv/index.html?s=s-sql.p-orm…&a=<accroche>&d=1` : ce sont les `id` des éléments cochés.
On peut donc ajouter, retirer ou réordonner des éléments dans `commun/data/` sans casser
les liens déjà envoyés (un `id` disparu est simplement ignoré). Ne renomme pas un `id` existant.
Les anciens liens `?c=…` restent lus.

## Modifier le contenu

Tout se passe dans `commun/data/`. Chaque élément a un `id` unique et
`on: true/false` pour dire s'il est coché par défaut.

## Ajouter une étape

1. Créer un dossier `ma-page/` avec `index.html`, `ma-page.css`, `ma-page.js` (copier `projets/`).
2. Ajouter l'étape dans `CV.ETAPES` (`commun/js/etat.js`).

## Tester en local

Les liens pointent directement vers les fichiers (`profil/index.html`…) : on peut ouvrir `index.html` en double-cliquant.
(Firefox refuse alors les polices des sous-pages, qui s'affichent avec la police de secours ; en ligne, tout est normal.)
Pour être au plus près de GitHub Pages, on peut aussi lancer un petit serveur :

```
python -m http.server 8123
```
puis ouvrir http://localhost:8123

## Technologies

HTML, CSS, JavaScript, sans framework ni étape de build. Compatible GitHub Pages.

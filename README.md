# ERPI Paranormal

Version navigable de travail : univers chambre noire, catalogues, signalement progressif, réservation, panier, espace commun et administration de démonstration.

## Fonctionnement

Les données de test sont conservées dans la mémoire de l’onglet. Aucun paiement, email, upload réel ou authentification applicative n’est actif. La diffusion Sites reste privée.

- `npm run dev` : aperçu local.
- `npm run build` : construction du Worker.
- `npm run start -- --port 5173` : vérification de la version compilée.
- `npx tsc --noEmit` : contrôle TypeScript.

## Organisation

`lib/erpi/data.ts` : contenus, catalogues de démonstration et périmètre des 45 rubriques.
`lib/erpi/site.tsx` : composants des pages et parcours.
`lib/erpi/navigation.tsx` : navigation client et historique, conservant le contexte des essais.
`lib/erpi/motion.tsx` : révélation, parallaxe et préférences d’animation.
`app/globals.css` : thème et adaptations aux écrans.

Le plan des phases et les dépendances sont consultables sur `/admin/architecture`.
Le décor `public/darkroom.png` est une illustration originale générée avec image_gen : chambre noire et cabinet d’archives sous lumière rouge, appareil photo, enregistreur et tirage dans un bac. Ce décor ne représente pas un lieu réel ERPI.

Les sources historiques sont liées dans les pages ERPI et Médias. Les offres, lieux, tarifs, biographies actuelles et conditions légales doivent être validés avant activation des services réels.

## Edition chambre noire — septembre 2026
- Expérience d’entrée à tirette, rejouable en pied de page ; animations limitées par prefers-reduced-motion et le réglage du site.
- Deux cours originaux de cinq modules, cinq articles, exercices et corrigés. Progression et notes de cours uniquement locales au navigateur, clé versionnée erpi-course-v1-*. Contenu proposé à la validation éditoriale ERPI, aucun certificat professionnel.
- Les réglages et coordonnées fictives du checkout sont conservés dans le contexte React pendant la session.
- Pictogrammes YouTube/TikTok : Simple Icons v16 (CC0), https://simpleicons.org/ ; marques utilisées uniquement pour identifier leurs liens.
- Compte TikTok référencé publiquement : @erpi_paranormal (source TikBuddy). YouTube : https://www.youtube.com/@erpiparanormal9160, identifiant fourni par le propriétaire.

## Refonte éditoriale
La couverture et l’index des dossiers remplacent les cartes promotionnelles uniformes. Les pages partagent Barlow Condensed et Libre Franklin, distribuées localement avec leurs licences OFL. Le curseur suiveur et les animations de flou sont retirés. La lampe et le néon sont conservés.
Repères consultés : Creative Bloq, « Everything looks the same. Now what? » (6 juin 2026) ; InterfaceKit, « What makes a website look AI-generated? ». Ce sont des analyses de conventions visuelles, pas des moyens de prouver qu’un site a été produit par IA.


## Parcours et audit responsive — septembre 2026
Navigation regroupée en Découvrir ERPI, Les enquêtes, Participer et Boutique ; les rubriques secondaires restent dans les menus et le plan du site. Nouvelle page /participer, entrée unique /interventions pour signalement ou rendez-vous. Accueil photographique organisé en découverte, expérience, puis équipement ; réseaux sociaux et presse servent de références. Réutilisation des illustrations existantes avec mention explicite. Les styles cinema.css corrigent les colonnes, titres longs, champs, menus et petits écrans ; mouvements désactivables. Audit navigateur des 38 routes publiques à 320 px et 1055 px, et des principales pages à 390 px et 768 px ; menus mobile/ordinateur et FAQ ouverte contrôlés.

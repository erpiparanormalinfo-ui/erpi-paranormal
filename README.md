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

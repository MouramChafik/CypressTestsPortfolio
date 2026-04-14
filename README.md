<div align="center">

# 🧪 Cypress Test Suite — mouram.netlify.app

[![Cypress](https://img.shields.io/badge/Cypress-v15.11.0-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Tests](https://img.shields.io/badge/Tests-160%2B-00B16A?style=for-the-badge&logo=checkmarx&logoColor=white)]()
[![E2E](https://img.shields.io/badge/Type-E2E-5C4EE5?style=for-the-badge)]()
[![Node](https://img.shields.io/badge/Node.js-v16%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
[![Status](https://img.shields.io/badge/CI%2FCD-Cypress%20Cloud-1B1E2E?style=for-the-badge&logo=cypress&logoColor=04C38E)]()

**Suite d'automatisation E2E pour le portfolio de [Chafik Mouram](https://mouram.netlify.app) — QA Testeur & Développeur React**

</div>

---

## 📸 Aperçu du projet

### 🎥 Demo du projet

https://github.com/user-attachments/assets/f0effb19-7929-4bec-bc29-451d75861b38

https://github.com/user-attachments/assets/14af932d-42ee-41d2-9dae-85f9e4ef3a87



...uploading

### Tableau de bord des runs — Cypress App

 <img width="1920" height="969" alt="Capture d’écran 2026-04-14 à 13 41 29" src="https://github.com/user-attachments/assets/6f7e0bbf-870a-4977-9a36-1675aa07e390" />


> *Vue des runs récents dans l'interface Cypress locale. Le run #4 présente 5 échecs suite à l'ajout des tests de la page Contact.*

---

### Détail des échecs — Mode Debug

<img width="1920" height="969" alt="Capture d’écran 2026-04-14 à 13 41 19" src="https://github.com/user-attachments/assets/73c823c6-b357-4b81-983e-6770dfecbbc1" />


> *Analyse des specs en échec : `03_contact.cy.js` (1 échec) et `10_timeline.cy.js` (4 échecs) — identification rapide des cas de test à corriger.*

---

### Suivi des runs — Cypress Cloud

<img width="1920" height="969" alt="Capture d’écran 2026-04-14 à 13 41 03" src="https://github.com/user-attachments/assets/20a03856-2cb2-43a1-8a5a-2100e343bfd7" />


> *Vue consolidée sur Cypress Cloud : historique des 4 runs, statuts (✅ / ❌), durée, branche `main` et auteur du commit.*

---

### Analytics & Run Status

<img width="1920" height="969" alt="Capture d’écran 2026-04-14 à 13 40 29" src="https://github.com/user-attachments/assets/e648bf7b-2119-4e2b-9362-815238953b40" />


> *Dashboard analytique sur 3 mois : 4 runs au total, 2 passed / 2 failed, taux d'échec à 100% sur la semaine du 13 avril (run en cours de stabilisation).*

---

## 📁 Structure du projet

```
cypress-mouram/
├── cypress.config.js              # Configuration Cypress
├── package.json                   # Dépendances & scripts npm
└── cypress/
    ├── support/
    │   └── e2e.js                 # Commandes personnalisées & hooks globaux
    └── e2e/
        ├── 01_navigation.cy.js    # Navigation & chargement
        ├── 02_hero.cy.js          # Section Hero / Bannière
        ├── 03_about.cy.js         # Section À propos
        ├── 04_skills.cy.js        # Section Compétences
        ├── 05_projects.cy.js      # Section Projets / Portfolio
        ├── 06_contact.cy.js       # Formulaire de contact
        ├── 07_responsive.cy.js    # Responsivité multi-breakpoints
        ├── 08_accessibility.cy.js # Accessibilité & performances
        ├── 09_certificates.cy.js  # Page Certificats et qualifications
        ├── 10_timeline.cy.js      # Page Timeline / Parcours professionnel
        ├── 11_istqb.cy.js         # Page ISTQB Foundation Level
        └── 12_roadmap.cy.js       # Page Roadmap / Feuille de route
```

---

## 🚀 Installation

### Prérequis

| Outil | Version minimale |
|-------|-----------------|
| Node.js | v16+ |
| npm | v8+ |

### Étapes

```bash
# 1. Se placer dans le dossier
cd cypress-mouram

# 2. Installer les dépendances
npm install

# 3. Lancer Cypress en mode interactif (interface graphique)
npm run cy:open

# OU en mode headless (CI/CD)
npm run cy:run
```

---

## 🧩 Couverture des specs

| # | Fichier | Scénarios couverts | Statut |
|---|---------|-------------------|--------|
| 01 | `01_navigation.cy.js` | Titre de page, barre de navigation, liens ancres, scroll | ✅ |
| 02 | `02_hero.cy.js` | Nom affiché, titre pro, CTA, above the fold, photo | ✅ |
| 03 | `03_about.cy.js` | Présence section, texte, mention des compétences clés, image | ✅ |
| 04 | `04_skills.cy.js` | Technologies QA (Cypress, Selenium…) et frontend (React, JS…) | ✅ |
| 05 | `05_projects.cy.js` | Cartes projets, titres, descriptions, liens GitHub/démo, images | ✅ |
| 06 | `06_contact.cy.js` | Formulaire (champs, validation, email invalide), réseaux sociaux | 🔄 |
| 07 | `07_responsive.cy.js` | 5 breakpoints (320→1920px), overflow, hamburger menu | ✅ |
| 08 | `08_accessibility.cy.js` | Alt images, H1 unique, hiérarchie titres, labels, meta SEO | ✅ |
| 09 | `09_certificates.cy.js` | Catégories certificats, dates, téléchargements, formations en cours | ✅ |
| 10 | `10_timeline.cy.js` | Parcours professionnel, dates, réalisations, technologies, images | 🔄 |
| 11 | `11_istqb.cy.js` | Certification ISTQB, domaines couverts, préparation, étapes | ✅ |
| 12 | `12_roadmap.cy.js` | Feuille de route, formations, domaines d'apprentissage, catégories | ✅ |

> 🔄 = en cours de stabilisation suite aux derniers ajouts

---

## 🎯 Scripts disponibles

```bash
npm run cy:open              # Mode interactif (Cypress App)
npm run cy:run               # Tous les tests, headless
npm run cy:run:headed        # Tous les tests, avec navigateur visible

# Specs individuelles
npm run cy:run:navigation    # Navigation
npm run cy:run:hero          # Hero
npm run cy:run:about         # À propos
npm run cy:run:skills        # Compétences
npm run cy:run:projects      # Projets
npm run cy:run:contact       # Contact
npm run cy:run:responsive    # Responsive
npm run cy:run:accessibility # Accessibilité & perf
npm run cy:run:certificates  # Certificats
npm run cy:run:timeline      # Timeline
npm run cy:run:istqb         # ISTQB
npm run cy:run:roadmap       # Roadmap
```

---

## ⚙️ Configuration (`cypress.config.js`)

| Paramètre | Valeur |
|-----------|--------|
| `baseUrl` | `https://mouram.netlify.app` |
| `defaultCommandTimeout` | `10 000 ms` |
| `pageLoadTimeout` | `30 000 ms` |
| `viewportWidth` | `1280 px` |
| `viewportHeight` | `800 px` |
| `screenshotOnRunFailure` | `true` |

---

## 💡 Bonnes pratiques

- **Débogage** : utiliser `cy:open` pour inspecter un test en échec étape par étape.
- **Sélecteurs robustes** : les sélecteurs utilisent des classes CSS partielles (`[class*="hero"]`) pour résister aux refactorings.
- **Extensibilité** : pour chaque nouvelle section du site, créer un fichier `13_xxx.cy.js` en suivant la convention de nommage.
- **CI/CD** : intégration Cypress Cloud active — les runs sont trackés sur la branche `main`.

---

<div align="center">

Made with 🧪 by **Chafik Mouram** — QA Testeur & Développeur React

[![Portfolio](https://img.shields.io/badge/Portfolio-mouram.netlify.app-04C38E?style=flat-square&logo=netlify&logoColor=white)](https://mouram.netlify.app)

</div>

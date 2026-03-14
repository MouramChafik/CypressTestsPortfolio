# 🧪 Cypress Test Suite — mouram.netlify.app

Suite d'automatisation de tests E2E (End-to-End) pour le portfolio de **Chafik Mouram**, QA Testeur & Développeur React.

---

## 📁 Structure du projet

```
cypress-mouram/
├── cypress.config.js              # Configuration Cypress
├── package.json                   # Dépendances & scripts npm
├── cypress/
│   ├── support/
│   │   └── e2e.js                 # Commandes personnalisées & hooks globaux
│   └── e2e/
│       ├── 01_navigation.cy.js    # Navigation & chargement
│       ├── 02_hero.cy.js          # Section Hero / Bannière
│       ├── 03_about.cy.js         # Section À propos
│       ├── 04_skills.cy.js        # Section Compétences
│       ├── 05_projects.cy.js      # Section Projets / Portfolio
│       ├── 06_contact.cy.js       # Formulaire de contact
│       ├── 07_responsive.cy.js    # Responsivité multi-breakpoints
│       └── 08_accessibility.cy.js # Accessibilité & performances
```

---

## 🚀 Installation

### Prérequis
- **Node.js** v16+ 
- **npm** v8+

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

## 🧩 Description des specs

| Fichier | Scénarios couverts |
|---|---|
| `01_navigation.cy.js` | Titre de page, barre de navigation, liens ancres, scroll |
| `02_hero.cy.js` | Nom affiché, titre pro, CTA, above the fold, photo |
| `03_about.cy.js` | Présence section, texte, mention des compétences clés, image |
| `04_skills.cy.js` | Technologies QA (Cypress, Selenium…) et frontend (React, JS…) |
| `05_projects.cy.js` | Cartes projets, titres, descriptions, liens GitHub/démo, images |
| `06_contact.cy.js` | Formulaire (champs, validation, email invalide), réseaux sociaux |
| `07_responsive.cy.js` | 5 breakpoints (320→1920px), overflow, hamburger menu |
| `08_accessibility.cy.js` | Alt images, H1 unique, hiérarchie titres, labels, meta SEO |

---

## 🎯 Scripts disponibles

```bash
npm run cy:open             # Mode interactif (Cypress App)
npm run cy:run              # Tous les tests, headless
npm run cy:run:headed       # Tous les tests, avec navigateur visible
npm run cy:run:navigation   # Spec navigation uniquement
npm run cy:run:hero         # Spec hero uniquement
npm run cy:run:about        # Spec about uniquement
npm run cy:run:skills       # Spec compétences uniquement
npm run cy:run:projects     # Spec projets uniquement
npm run cy:run:contact      # Spec contact uniquement
npm run cy:run:responsive   # Spec responsive uniquement
npm run cy:run:accessibility # Spec a11y & perf uniquement
```

---

## ⚙️ Configuration

La config dans `cypress.config.js` :
- **baseUrl** : `https://mouram.netlify.app`
- **timeout** : 10s par commande, 30s chargement de page
- **viewport** par défaut : 1280×800
- **screenshotOnRunFailure** : `true` (captures en cas d'échec)

---

## 💡 Conseils

- Pour déboguer un test en échec, utiliser `cy:open` et sélectionner la spec manuellement.
- Les sélecteurs utilisent des classes CSS partielles (`[class*="hero"]`) pour être robustes aux changements de nommage.
- En cas d'ajout d'une section sur le site, créer un nouveau fichier `09_xxx.cy.js`.

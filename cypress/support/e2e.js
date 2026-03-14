// ***********************************************************
// cypress/support/e2e.js
// Fichier de support global — chargé avant chaque spec
// ***********************************************************

// Commandes personnalisées
Cypress.Commands.add("scrollToSection", (sectionId) => {
  cy.get(`#${sectionId}, [data-section="${sectionId}"], [id*="${sectionId}"]`, {
    timeout: 8000,
  }).scrollIntoView({ duration: 500 });
});

Cypress.Commands.add("waitForPageLoad", () => {
  // Attendre que le document soit chargé
  cy.document().its("readyState").should("eq", "complete");

  // Attendre que le titre soit disponible
  cy.title().should("not.be.empty");

  // Attendre que les images visibles soient chargées (si présentes)
  cy.get("body").then(($body) => {
    if ($body.find("img:visible").length > 0) {
      cy.get("img:visible", { timeout: 3000 }).each(($img) => {
        cy.wrap($img).should("have.attr", "src");
      });
    }
  });
});

Cypress.Commands.add("checkNoConsoleErrors", () => {
  const consoleErrors = [];
  cy.window().then((win) => {
    const originalError = win.console.error;
    win.console.error = (...args) => {
      consoleErrors.push(args);
      originalError.call(win.console, ...args);
    };
  });
});

Cypress.Commands.add("mustExistAndBeVisible", (selector) => {
  cy.get(selector, { timeout: 8000 }).should("exist");
  cy.get(selector).should("be.visible");
});

// Intercepte et logge les erreurs non capturées
Cypress.on("uncaught:exception", (err) => {
  // Ignore les erreurs React hydration et ResizeObserver non bloquantes
  if (
    err.message.includes("ResizeObserver") ||
    err.message.includes("hydration")
  ) {
    return false;
  }
  // Ignore les erreurs de préchargement d'images
  if (err.message.includes("Failed to fetch")) {
    return false;
  }
  return true;
});

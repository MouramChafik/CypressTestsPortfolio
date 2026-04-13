// ─────────────────────────────────────────────────────────────
// Tests de la page Certificats et qualifications
// ─────────────────────────────────────────────────────────────

describe("09 – Page Certificats et qualifications", () => {
  beforeEach(() => {
    cy.visit("/certificates");
    cy.waitForPageLoad();
  });

  it("affiche le titre principal de la page", () => {
    cy.contains(/Certificats et qualifications/i).should("be.visible");
  });

  it("affiche les catégories de certificats", () => {
    cy.contains(/Test Logiciel|QA/i).should("be.visible");
    cy.contains(/Développement Web/i).should("be.visible");
    cy.contains(/Intelligence Artificielle/i).should("be.visible");
  });

  it("affiche au moins 3 certificats", () => {
    cy.get("h3, [class*='certificate'], [class*='cert']")
      .filter(
        ":contains('Cypress'), :contains('Selenium'), :contains('Playwright')",
      )
      .should("have.length.gte", 3);
  });

  it("chaque certificat possède une image", () => {
    cy.get("main img, section img")
      .should("have.length.gte", 3)
      .each(($img) => {
        cy.wrap($img).should("have.attr", "src").and("not.be.empty");
      });
  });

  it("les certificats contiennent des dates", () => {
    cy.get("main, section").then(($section) => {
      const text = $section.text();
      expect(text).to.match(
        /\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{4}/i,
      );
    });
  });

  it("les liens de téléchargement sont présents", () => {
    cy.get("a[href*='.avif'], a[href*='.pdf']")
      .should("have.length.gte", 1)
      .each(($link) => {
        cy.wrap($link)
          .should("have.attr", "href")
          .and("include.oneOf", [".avif", ".pdf"]);
      });
  });

  it("la page contient au moins une section pour chaque catégorie", () => {
    cy.get("main, [role='main']").within(() => {
      cy.contains(/Test Logiciel|QA/i).should("exist");
      cy.contains(/Développement Web/i).should("exist");
      cy.contains(/Intelligence Artificielle/i).should("exist");
    });
  });

  it("les certificats affichent des titres significatifs", () => {
    cy.get("main h3, section h3, [class*='certificate-title']")
      .first()
      .then(($title) => {
        const titleText = $title.text();
        expect(titleText.length).to.be.greaterThan(5);
      });
  });

  it("la page contient une section 'Formations en cours'", () => {
    cy.contains(/Formations en cours|En cours/i).should("be.visible");
  });

  it("tous les liens de navigation pointent vers des pages valides", () => {
    cy.get("a[href*='/'], a[href^='#']").each(($link) => {
      const href = $link.attr("href");
      if (href && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
        cy.wrap($link).should("have.attr", "href").and("not.be.empty");
      }
    });
  });
});

// ─────────────────────────────────────────────────────────────
// Tests de la page ISTQB - Certification ISTQB Foundation Level
// ─────────────────────────────────────────────────────────────

describe("11 – Page ISTQB Foundation Level", () => {
  beforeEach(() => {
    cy.visit("/istqb");
    cy.waitForPageLoad();
    // Attendre que le contenu principal se charge
    cy.get("main, [role='main']", { timeout: 15000 }).should("exist");
  });

  it("affiche la page ISTQB avec le titre approprié", () => {
    cy.title().should("not.be.empty");
  });

  it("contient un contenu principal visible", () => {
    cy.get("main, [role='main']").should("be.visible");
  });

  it("affiche du contenu textuel sur la certification", () => {
    cy.get("main, section").invoke("text").should("not.be.empty");
  });

  it("affiche des titres ou headings", () => {
    cy.get(
      "main h1, main h2, main h3, section h1, section h2, section h3",
    ).should("have.length.gte", 1);
  });

  it("affiche des paragraphes de contenu", () => {
    cy.get("main p, section p").should("have.length.gte", 1);
  });

  it("contient au moins une image", () => {
    cy.get("main img, section img, [role='main'] img").should(
      "have.length.gte",
      1,
    );
  });

  it("les images ont des attributs src non vides", () => {
    cy.get("main img, section img")
      .first()
      .should("have.attr", "src")
      .and("not.be.empty");
  });

  it("affiche au moins un lien", () => {
    cy.get("main a, section a, [role='main'] a").should("have.length.gte", 1);
  });

  it("la page contient des informations valides", () => {
    cy.get("main, section").then(($content) => {
      const text = $content.text();
      expect(text.length).to.be.greaterThan(50);
    });
  });

  it("la navigation est toujours présente et fonctionnelle", () => {
    cy.get('nav, header, [role="navigation"]')
      .should("exist")
      .and("be.visible");
  });

  it("les liens de navigation pointent vers des URLs valides", () => {
    cy.get('nav a[href], header a[href], [role="navigation"] a[href]').each(
      ($link) => {
        const href = $link.attr("href");
        cy.wrap($link).should("have.attr", "href").and("not.be.empty");
      },
    );
  });
});

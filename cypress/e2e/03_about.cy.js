// ─────────────────────────────────────────────────────────────
// Tests de la section À propos / About
// ─────────────────────────────────────────────────────────────

describe("03 – Section À propos / About", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForPageLoad();
  });

  it("contient une section avec du texte de présentation personnelle", () => {
    cy.contains(/Je ne me contente pas|Testeur QA|garantis la qualité/i).should(
      "exist",
    );
  });

  it("affiche une description professionnelle", () => {
    cy.contains(/automatisation|Cypress|Selenium|Playwright|Postman/i).should(
      "exist",
    );
  });

  it("mentionne les technologies clés", () => {
    cy.get("main, section").then(($section) => {
      const text = $section.text();
      const hasTech =
        text.includes("JavaScript") ||
        text.includes("React") ||
        text.includes("Node.js") ||
        text.includes("Cypress");
      expect(hasTech).to.be.true;
    });
  });

  it("affiche une photo ou avatar du profil", () => {
    cy.get(
      "main img[alt*='headshot'], main img[alt*='photo'], main img[alt*='avatar']",
    ).should("have.length.gte", 1);
  });

  it("contient une mention de la double compétence (QA + Développeur)", () => {
    cy.contains(/double compétence|développeur|QA/i).should("exist");
  });

  it("décrit les valeurs ou l'approche professionnelle", () => {
    cy.get("main, section")
      .invoke("text")
      .should("match", /qualité|anomalies|production/i);
  });

  it("affiche les réseaux sociaux ou liens de contact", () => {
    cy.get("a[href*='linkedin'], a[href*='github'], a[href*='mailto']").should(
      "have.length.gte",
      1,
    );
  });

  it("mentionne les domaines de travail (Web, Mobile, API)", () => {
    cy.contains(/Web|Mobile|API|applications/i).should("exist");
  });

  it("la section est bien formatée et lisible", () => {
    cy.get("main, section").first().should("be.visible");
  });

  it("contient du texte significatif (minimum 80 caractères)", () => {
    cy.get("main p, section p")
      .first()
      .then(($p) => {
        const text = $p.text();
        expect(text.length).to.be.greaterThan(80);
      });
  });
});

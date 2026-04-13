// ─────────────────────────────────────────────────────────────
// Tests de la page Roadmap - Feuille de route en Mindmap
// ─────────────────────────────────────────────────────────────

describe("12 – Page Roadmap / Feuille de route", () => {
  beforeEach(() => {
    cy.visit("https://roadmaptester.netlify.app");
    cy.waitForPageLoad();
    cy.get("svg", { timeout: 15000 }).should("exist");
  });

  it("affiche le SVG de la mindmap", () => {
    cy.get("svg").should("be.visible");
  });

  it("affiche le titre principal de la roadmap", () => {
    cy.contains(/Roadmap|roadmap/i).should("exist");
  });

  it("affiche les 7 étapes de la roadmap", () => {
    cy.get("circle").should("have.length.gte", 7);
  });

  it("chaque étape a un numéro visible", () => {
    cy.get("circle").parent().find("text").should("have.length.gte", 7);
  });

  it("affiche le texte Les Fondations QA", () => {
    cy.contains("Les Fondations QA").should("exist");
  });

  it("affiche Le Code (Le Cœur)", () => {
    cy.contains("Le Code").should("exist");
  });

  it("affiche l'automatisation Web", () => {
    cy.contains(/Automatisation Web/i).should("exist");
  });

  it("affiche l'automatisation API", () => {
    cy.contains(/Automatisation API/i).should("exist");
  });

  it("affiche les Outils & Environnement", () => {
    cy.contains(/Outils/i).should("exist");
  });

  it("affiche les Soft Skills", () => {
    cy.contains(/Soft Skills/i).should("exist");
  });

  it("affiche l'étape finale du parcours", () => {
    cy.contains(/Pas de fin/i).should("exist");
  });

  it("affiche les boutons de navigation", () => {
    cy.contains("Commencer").should("exist");
  });

  it("contient les icônes start et end", () => {
    cy.get("image").should("have.length.gte", 1);
  });

  it("affiche le chemin connectant les étapes", () => {
    cy.get("path").should("have.length.gte", 1);
  });

  it("les étapes ont des couleurs", () => {
    cy.get("circle").first().should("have.attr", "fill");
  });

  it("affiche la mention du créateur", () => {
    cy.contains(/Chafik Mouram/i).should("exist");
  });

  it("la page est responsive avec le SVG visible", () => {
    cy.get("svg").should("be.visible");
  });
});

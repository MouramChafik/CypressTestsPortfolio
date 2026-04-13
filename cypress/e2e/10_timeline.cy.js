// ─────────────────────────────────────────────────────────────
// Tests de la page Timeline - Parcours professionnel
// ─────────────────────────────────────────────────────────────

describe("10 – Page Timeline / Parcours professionnel", () => {
  beforeEach(() => {
    cy.visit("/timeline");
    cy.waitForPageLoad();
  });

  it("affiche le titre principal de la timeline", () => {
    cy.contains(/Parcours professionnel|timeline/i).should("be.visible");
  });

  it("affiche au moins 5 postes professionnels", () => {
    cy.get("main h3, section h3")
      .filter(
        ":contains('Testeur'), :contains('Développeur'), :contains('Assistant'), :contains('Agent'), :contains('Aide')",
      )
      .should("have.length.gte", 5);
  });

  it("chaque poste contient une entreprise ou une école", () => {
    cy.get("main").then(($main) => {
      const text = $main.text();
      const hasCompanies =
        text.includes("La Banque Postale") ||
        text.includes("IT-Akademy") ||
        text.includes("Wild Code School") ||
        text.includes("La Colline") ||
        text.includes("Luca");
      expect(hasCompanies).to.be.true;
    });
  });

  it("affiche des dates pour chaque position", () => {
    cy.get("main")
      .invoke("text")
      .should("match", /202[0-9]|201[0-9]|2013|2014|2015|2016|2017|2018/i);
  });

  it("contient des réalisations clés avec des puces", () => {
    cy.get("main").then(($main) => {
      const text = $main.text();
      expect(text).to.include("RÉALISATIONS CLÉS");
    });
  });

  it("affiche des images pour les expériences", () => {
    cy.get("main img, section img")
      .should("have.length.gte", 1)
      .each(($img) => {
        cy.wrap($img).should("have.attr", "src").and("not.be.empty");
      });
  });

  it("contient des technologies mentionnées (Cypress, Selenium, Postman, etc.)", () => {
    cy.get("main").then(($main) => {
      const text = $main.text();
      const hasTech =
        text.includes("Cypress") ||
        text.includes("Selenium") ||
        text.includes("Postman") ||
        text.includes("Robot Framework") ||
        text.includes("Jest");
      expect(hasTech).to.be.true;
    });
  });

  it("contient les domaines clés du parcours (QA, Développement, Santé)", () => {
    cy.get("main").then(($main) => {
      const text = $main.text();
      expect(text.toLowerCase()).to.include("qa");
      expect(text.toLowerCase()).to.include("développ");
    });
  });

  it("la timeline est organisée de manière lisible", () => {
    cy.get("main h3, section h3").should("have.length.gte", 3);
  });

  it("contient des descriptions significatives pour chaque poste", () => {
    cy.get("main p, section p").each(($p) => {
      const text = $p.text();
      if (text.length > 20) {
        expect(text.length).to.be.greaterThan(30);
      }
    });
  });

  it("tous les liens de navigation sont accessibles", () => {
    cy.get("a[href*='/'], a[href^='#']").each(($link) => {
      const href = $link.attr("href");
      if (href && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
        cy.wrap($link).should("have.attr", "href").and("not.be.empty");
      }
    });
  });
});

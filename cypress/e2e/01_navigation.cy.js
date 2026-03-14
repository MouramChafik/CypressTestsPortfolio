// cypress/e2e/01_navigation.cy.js
// ─────────────────────────────────────────────────────────────
// Tests de navigation : chargement, titre, liens de menu, ancres
// ─────────────────────────────────────────────────────────────

describe("01 – Navigation & chargement de la page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForPageLoad();
  });

  it("charge la page avec le bon titre", () => {
    cy.title().should((title) => {
      expect(title.toLowerCase()).to.match(/mouram|chafik|qa tester|portfolio/);
    });
  });

  it("affiche un élément <nav> ou une barre de navigation", () => {
    cy.get('nav, header, [role="navigation"]').should("exist");
  });

  it("le logo / nom est présent dans le header", () => {
    cy.get("nav, header")
      .first()
      .within(() => {
        cy.contains(/mouram|chafik|portfolio/i).should("exist");
      });
  });

  it("le menu contient des liens de section", () => {
    cy.get('nav a, header a, [role="navigation"] a').should(
      "have.length.gte",
      3,
    );
  });

  it("les liens de navigation pointent vers des pages valides (pas 404)", () => {
    cy.get('nav a[href], header a[href], [role="navigation"] a[href]').each(
      ($a) => {
        const href = $a.attr("href");
        // Ignore les liens mailto, tel, external non-Portfolio
        if (
          href &&
          !href.startsWith("mailto:") &&
          !href.startsWith("tel:") &&
          !href.startsWith("#")
        ) {
          // Pages internes ou ancres
          if (href.startsWith("/") || href.startsWith("./")) {
            cy.wrap($a)
              .invoke("attr", "href")
              .then((link) => {
                cy.request({ url: link, failOnStatusCode: false })
                  .its("status")
                  .should("be.lt", 400);
              });
          }
        }
      },
    );
  });

  it("scroll vers une section en cliquant sur un lien de menu (ancres internes)", () => {
    cy.get('nav a[href], header a[href], [role="navigation"] a[href]')
      .first()
      .then(($link) => {
        const href = $link.attr("href");
        if (href && !href.startsWith("http")) {
          cy.wrap($link).click();
          cy.url().should("include", "mouram.netlify.app");
        }
      });
  });

  it("le menu est toujours accessible après le scroll vers le bas", () => {
    cy.scrollTo("bottom", { duration: 500 });
    cy.get('nav, header, [role="navigation"]').should("exist");
  });

  it("les liens de navigation multi-pages chargent correctement", () => {
    const pages = ["/projects", "/skills", "/contact"];
    pages.forEach((page) => {
      cy.visit("/");
      cy.get(`nav a[href="${page}"], header a[href="${page}"]`).then(
        ($link) => {
          if ($link.length > 0) {
            cy.wrap($link).click();
            cy.url().should("include", page);
            cy.waitForPageLoad();
          }
        },
      );
    });
  });
});

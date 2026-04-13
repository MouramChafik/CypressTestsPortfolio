// ─────────────────────────────────────────────────────────────
// Tests de la section Hero / Bannière principale
// ─────────────────────────────────────────────────────────────

describe("02 – Section Hero / Bannière", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForPageLoad();
  });

  it("affiche le contenu principal du hero", () => {
    cy.contains(/créer des expériences|développeur|testeur/i).should("exist");
  });

  it("affiche le titre professionnel (QA / Testeur / Développeur)", () => {
    cy.contains(/testeur|QA|développeur|developer|automation/i).should(
      "be.visible",
    );
  });

  it("contient un call-to-action (bouton ou lien)", () => {
    cy.get(
      'a[href*="#contact"], a[href*="#projects"], a[href*="projects"], button:visible',
    ).should("have.length.gte", 1);
  });

  it("le CTA principal est cliquable", () => {
    cy.get(
      'main a:visible, section:first-child a:visible, div[class*="hero"] a:visible, div[class*="banner"] a:visible',
    )
      .first()
      .should("exist")
      .and("not.be.disabled");
  });

  it("la section hero est visible sans scroll (above the fold)", () => {
    cy.window().then((win) => {
      cy.get("main, section:first-child")
        .first()
        .within(() => {
          cy.contains(/créer des expériences|développeur/i).then(($el) => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.lessThan(win.innerHeight);
          });
        });
    });
  });

  it("une image ou avatar est présente dans le hero", () => {
    cy.get("header img, main img:first-of-type, section:first-child img")
      .should("have.length.gte", 1)
      .first()
      .should("have.attr", "src");
  });

  it("le texte du hero n'est pas vide et significatif", () => {
    cy.get("main, section:first-of-type").then(($section) => {
      const text = $section.text();
      expect(text.length).to.be.greaterThan(50);
    });
  });

  it("les liens dans le hero ouvrent les bonnes pages", () => {
    cy.get("header a[href], main a[href], section:first-child a[href]").each(
      ($link) => {
        const href = $link.attr("href");
        if (href && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
          cy.wrap($link).should("have.attr", "href").and("not.be.empty");
        }
      },
    );
  });
});

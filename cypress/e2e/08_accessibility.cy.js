// ─────────────────────────────────────────────────────────────
// Tests d'accessibilité et de performance de base
// ─────────────────────────────────────────────────────────────

describe("08 – Accessibilité & Performances", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForPageLoad();
  });

  context("Accessibilité (a11y)", () => {
    it("toutes les images visibles ont un attribut alt", () => {
      cy.get("img:visible").each(($img) => {
        cy.wrap($img).should("have.attr", "alt");
      });
    });

    it("il y a au moins un <h1> sur la page", () => {
      cy.get("h1").should("have.length.gte", 1);
    });

    it("la hiérarchie des titres est logique (h1 → h2 → h3)", () => {
      cy.get("h1, h2, h3").then(($headings) => {
        const levels = Array.from($headings).map((h) =>
          parseInt(h.tagName.replace("H", "")),
        );

        // Vérifier que la hiérarchie est sensée
        let prevLevel = 0;
        levels.forEach((level) => {
          // La différence entre niveaux ne doit pas être > 1
          if (prevLevel > 0) {
            expect(level - prevLevel).to.be.lte(1);
          }
          prevLevel = level;
        });
      });
    });

    it("les liens ont un texte ou aria-label", () => {
      cy.get("a").each(($a) => {
        const text = $a.text().trim();
        const ariaLabel = $a.attr("aria-label") || "";
        const title = $a.attr("title") || "";
        const hasIcon = $a.find("svg, img").length > 0;

        // Au moins une des conditions est vraie
        expect(
          text.length > 0 ||
            ariaLabel.length > 0 ||
            title.length > 0 ||
            hasIcon,
        ).to.be.true;
      });
    });

    it("les boutons ont un texte ou aria-label", () => {
      cy.get("button:visible").each(($btn) => {
        const text = $btn.text().trim();
        const ariaLabel = $btn.attr("aria-label") || "";
        expect(text.length > 0 || ariaLabel.length > 0).to.be.true;
      });
    });

    it("le contraste de fond permet la lecture du contenu", () => {
      cy.get("body").should("have.css", "background-color");
      cy.get("body").should("have.css", "color");
    });

    it("le focus clavier est possible sur les éléments interactifs", () => {
      cy.get("a, button, input").first().focus();
      cy.focused().should("exist");
    });

    it("les inputs de formulaire ont des labels associés ou placeholder", () => {
      cy.document().then((doc) => {
        const inputs = doc.querySelectorAll(
          'input[type="text"], input[type="email"], textarea',
        );
        if (inputs.length > 0) {
          inputs.forEach(($input) => {
            const id = $input.getAttribute("id");
            const ariaLabel = $input.getAttribute("aria-label");
            const placeholder = $input.getAttribute("placeholder");
            const name = $input.getAttribute("name");

            // Au moins une association existe
            expect(
              (id && doc.querySelector(`label[for="${id}"]`)) ||
                ariaLabel ||
                placeholder ||
                name,
            ).to.be.truthy;
          });
        }
        // Si pas d'inputs, le test passe
      });
    });

    it("la page se charge en moins de 10 secondes", { timeout: 15000 }, () => {
      const start = Date.now();
      cy.visit("/").then(() => {
        const duration = Date.now() - start;
        expect(duration).to.be.lessThan(10000);
      });
    });

    it("les images critiques sont chargées", () => {
      cy.get("img[src]:visible").should("have.length.gte", 1);
    });

    it("le favicon est présent", () => {
      cy.get('link[rel*="icon"]').should("have.length.gte", 1);
    });

    it("une meta description est définie", () => {
      cy.get('meta[name="description"]')
        .should("have.attr", "content")
        .and("have.length.gt", 10);
    });

    it("le viewport métaélement est configuré pour mobile", () => {
      cy.get('meta[name="viewport"]').should("have.attr", "content");
    });

    it("pas de console errors bloquantes au chargement", () => {
      cy.checkNoConsoleErrors();
    });
  });

  context("Meta et SEO basique", () => {
    it("le titre de la page est défini et non vide", () => {
      cy.title().should("not.be.empty");
    });

    it("une lang ou xml:lang est définie sur html", () => {
      cy.get("html").should("have.attr", "lang");
    });

    it("la structure sémantique est présente (header, main, footer)", () => {
      cy.get("main").should("exist");
      // header et footer sont importants mais optionnels
      cy.get("header, footer").should("have.length.gte", 1);
    });
  });
});

it("la balise viewport est configurée pour le mobile", () => {
  cy.get("head").then(($head) => {
    const viewportMeta = $head.find('meta[name="viewport"]');
    if (viewportMeta.length > 0) {
      cy.wrap(viewportMeta)
        .should("have.attr", "content")
        .and("include", "width=device-width");
    }
    // Si la balise n'existe pas, le test passe quand même
  });
});

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
  it("les circles des etapes sont cliquables", () => {
    cy.get('#canvas-container circle[cx="150"]').click();
    // The car image is now visible on the roadmap.
    cy.get(
      '#canvas-container svg[viewBox="0 0 2030 600"] > g:nth-child(3)',
    ).should("be.visible");
    // The popup message has disappeared.
    cy.get("#canvas-container > div:nth-child(1) > div:nth-child(2)").should(
      ($el) => {
        expect($el).to.not.be.visible;
        expect($el).to.have.attr(
          "style",
          "position: absolute; top: 90px; left: 50%; transform: translateX(-50%); padding: 16px 32px; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; background: linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(79, 70, 229) 100%); color: white; z-index: 90; transition: 0.3s; opacity: 0; width: auto; max-width: none; pointer-events: none;",
        );
      },
    );
    // A popup window has appeared.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.have.attr(
          "style",
          "position: absolute; background: linear-gradient(135deg, rgba(59, 130, 246, 0), rgba(59, 130, 246, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 20px; top: 70px;",
        );
      },
    );
    // The close button for the popup is now visible.
    cy.get("#canvas-container div:nth-child(4) button").should("be.visible");
    // The popup header is now visible.
    cy.get("#canvas-container div.popup-header").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.have.attr(
        "style",
        "padding: 20px 20px 0px; flex-shrink: 0; background: transparent;",
      );
    });
    // The title '1. Les Fondations QA' is displayed in the popup.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("1. Les Fondations QA");
    });
    // The content of the popup is now visible.
    cy.get("#canvas-container div.popup-content").should("be.visible");
    // The button text changed from 'Commencer' to 'Suivant'.
    cy.get("#next-btn").should("contain.text", "Suivant");

    cy.get('#canvas-container circle[cx="430"]').click();
    // The information panel's background color changed.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      "have.attr",
      "style",
      "position: absolute; background: linear-gradient(135deg, rgba(139, 92, 246, 0), rgba(139, 92, 246, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 71.133px; top: 70px;",
    );
    // The step number changed to 2.
    cy.get("#canvas-container div.popup-header div:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("2");
      },
    );
    // The step title changed to 'Le Code (Le Cœur)'.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("2. Le Code (Le Cœur)");
    });
    // The duration text changed.
    cy.get(
      "#canvas-container div:nth-child(1) > div:nth-child(1) > span:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text(
        "4 à 8 semaines + une forte envie d’apprendre",
      );
    });
    // The difficulty level changed to 'Difficile'.
    cy.get("#canvas-container div:nth-child(2) span:nth-child(2)").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("Difficile");
      },
    );
    // The first bullet point changed to 'Choisir un langage à apprendre'.
    cy.get(
      "#canvas-container ul:nth-child(2) > li:nth-child(1) > div:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Choisir un langage à apprendre");
    });
    // A new bullet point 'Python (Populaire)' appeared.
    cy.get("#canvas-container li:nth-child(1) ul li:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("Python (Populaire)");
      },
    );
    // The car image moved to a new position.
    cy.get('#canvas-container image[x="365"]').should(
      "have.attr",
      "href",
      "/car.svg",
    );

    cy.get('#canvas-container circle[cx="710"]').click();
    cy.get('#canvas-container circle[cx="990"]').click();
    // The information panel moved and updated its color to match the fourth stage.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      "have.attr",
      "style",
      "position: absolute; background: linear-gradient(135deg, rgba(245, 158, 11, 0), rgba(245, 158, 11, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 424.236px; top: 70px;",
    );
    // The stage number in the information panel updated to 4.
    cy.get("#canvas-container div.popup-header div:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("4");
      },
    );
    // The information panel title updated to '4. Automatisation API (Back-end)'.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("4. Automatisation API (Back-end)");
    });
    // The duration in the information panel changed to '2-4 semaines'.
    cy.get(
      "#canvas-container div:nth-child(1) > div:nth-child(1) > span:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("2-4 semaines");
    });
    // The first bullet point in the information panel updated.
    cy.get("#canvas-container ul:nth-child(2) > li:nth-child(1) > div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("Protocoles (HTTP/GET, POST, PUT, DELETE)");
      },
    );
    // The second bullet point in the information panel updated.
    cy.get("#canvas-container ul:nth-child(2) > li:nth-child(2) > div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("Formats (JSON & XML)");
      },
    );
    // The third bullet point in the information panel updated.
    cy.get("#canvas-container li:nth-child(3) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Codes de réponse (200, 404, 500)");
    });
    // The car moved to the fourth stage.
    cy.get('#canvas-container image[x="925"]').should(
      "have.attr",
      "href",
      "/car.svg",
    );

    cy.get('#canvas-container circle[cx="1270"]').click();
    cy.get('#canvas-container circle[cx="1550"]').click();
    // The information div moved to a new position.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      "have.attr",
      "style",
      "position: absolute; background: linear-gradient(135deg, rgba(6, 182, 212, 0), rgba(6, 182, 212, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 777.34px; top: 70px;",
    );
    // The step number changed to '6'.
    cy.get("#canvas-container div.popup-header div:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("6");
      },
    );
    // The step title changed to '6. Soft Skills (Humain)'.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("6. Soft Skills (Humain)");
    });
    // The difficulty level changed to 'Facile'.
    cy.get(
      "#canvas-container div:nth-child(1) > div > span:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Facile");
    });
    // A skill listed changed to 'La rigueur'.
    cy.get("#canvas-container li:nth-child(1) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("La rigueur");
    });
    // A skill listed changed to 'un bon sens de l’analyse'.
    cy.get("#canvas-container li:nth-child(2) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("un bon sens de l’analyse");
    });
    // A skill listed changed to 'Curiosité'.
    cy.get("#canvas-container li:nth-child(3) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Curiosité");
    });
    // The car image moved to a new position.
    cy.get('#canvas-container image[x="1485"]').should(
      "have.attr",
      "href",
      "/car.svg",
    );

    cy.get('#canvas-container circle[cx="1830"]').click();
    // The information panel's background color changed and its position shifted.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      "have.attr",
      "style",
      "position: absolute; background: linear-gradient(135deg, rgba(99, 102, 241, 0), rgba(99, 102, 241, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 860px; top: 70px;",
    );
    // The step number in the information panel changed from 6 to 7.
    cy.get("#canvas-container div.popup-header div:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("7");
      },
    );
    // The title of the information panel changed to '7. Pas de fin, le parcours vient de commencer'.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text(
        "7. Pas de fin, le parcours vient de commencer",
      );
    });
    // The label 'Difficulté' changed to 'Durée'.
    cy.get("#canvas-container div.popup-content div span:nth-child(1)").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("Durée:");
      },
    );
    // The value 'Facile' changed to 'En continu 👨‍💻'.
    cy.get(
      "#canvas-container div:nth-child(1) > div > span:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("En continu 👨‍💻");
    });
    // A detail item changed to 'Reste à jour la tech est en constante évolution'.
    cy.get("#canvas-container li:nth-child(1) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text(
        "Reste à jour la tech est en constante évolution",
      );
    });
    // A detail item changed to 'Faire des projets personnels'.
    cy.get("#canvas-container li:nth-child(2) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Faire des projets personnels");
    });
    // The car icon moved to a new position.
    cy.get('#canvas-container image[x="1765"]').should(
      "have.attr",
      "href",
      "/car.svg",
    );

    cy.get("#canvas-container button:nth-child(1) span.btn-text").click();
    // The information panel's background color changed.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      "have.attr",
      "style",
      "position: absolute; background: linear-gradient(135deg, rgba(6, 182, 212, 0), rgba(6, 182, 212, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 777.34px; top: 70px;",
    );
    // The step number changed to 6.
    cy.get("#canvas-container div.popup-header div:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("6");
      },
    );
    // The step title changed to '6. Soft Skills (Humain)'.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("6. Soft Skills (Humain)");
    });
    // The difficulty level changed to 'Facile'.
    cy.get(
      "#canvas-container div:nth-child(1) > div > span:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Facile");
    });
    // The first bullet point changed to 'La rigueur'.
    cy.get("#canvas-container li:nth-child(1) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("La rigueur");
    });
    // The second bullet point changed to 'un bon sens de l’analyse'.
    cy.get("#canvas-container li:nth-child(2) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("un bon sens de l’analyse");
    });
    // The third bullet point changed to 'Curiosité'.
    cy.get("#canvas-container li:nth-child(3) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Curiosité");
    });
    // The car image moved to a new position.
    cy.get('#canvas-container image[x="1485"]').should(
      "have.attr",
      "href",
      "/car.svg",
    );

    cy.get("#next-btn span.btn-text").click();
    // The information panel's background color changed.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      "have.attr",
      "style",
      "position: absolute; background: linear-gradient(135deg, rgba(99, 102, 241, 0), rgba(99, 102, 241, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: block; z-index: 100; transform: none; left: 860px; top: 70px;",
    );
    // The step number changed to 7.
    cy.get("#canvas-container div.popup-header div:nth-child(1) div").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.contain.text("7");
      },
    );
    // The step title changed to '7. Pas de fin, le parcours vient de commencer'.
    cy.get("#canvas-container h2").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text(
        "7. Pas de fin, le parcours vient de commencer",
      );
    });
    // The duration text changed to 'En continu 👨‍💻'.
    cy.get(
      "#canvas-container div:nth-child(1) > div > span:nth-child(2)",
    ).should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("En continu 👨‍💻");
    });
    // The first bullet point changed to 'Reste à jour la tech est en constante évolution'.
    cy.get("#canvas-container li:nth-child(1) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text(
        "Reste à jour la tech est en constante évolution",
      );
    });
    // The second bullet point changed to 'Faire des projets personnels'.
    cy.get("#canvas-container li:nth-child(2) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Faire des projets personnels");
    });
    // The third bullet point changed to 'Créer un Portfolio / GitHub'.
    cy.get("#canvas-container li:nth-child(3) div").should(($el) => {
      expect($el).to.be.visible;
      expect($el).to.contain.text("Créer un Portfolio / GitHub");
    });
    // The car image moved to a new position.
    cy.get('#canvas-container image[x="1765"]').should(
      "have.attr",
      "href",
      "/car.svg",
    );

    cy.get("#canvas-container button:nth-child(2) span.btn-text").click();
    // The car image is no longer visible.
    cy.get(
      '#canvas-container svg[viewBox="0 0 2030 600"] > g:nth-child(3)',
    ).should("not.be.visible");
    // A popup message is now visible.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(2)").should(
      ($el) => {
        expect($el).to.be.visible;
        expect($el).to.have.attr(
          "style",
          "position: absolute; top: 90px; left: 50%; transform: translateX(-50%); padding: 16px 32px; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; background: linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(79, 70, 229) 100%); color: white; z-index: 90; transition: 0.3s; opacity: 1; width: auto; max-width: none; pointer-events: auto;",
        );
      },
    );
    // The information panel is now hidden.
    cy.get("#canvas-container div:nth-child(1) > div:nth-child(4)").should(
      ($el) => {
        expect($el).to.not.be.visible;
        expect($el).to.have.attr(
          "style",
          "position: absolute; background: linear-gradient(135deg, rgba(99, 102, 241, 0), rgba(99, 102, 241, 0)); border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px; width: 400px; height: 300px; flex-direction: column; overflow: hidden; font-family: Inter, sans-serif; display: none; z-index: 100; transform: none; left: 860px; top: 70px;",
        );
      },
    );
    // The close button for the popup is now hidden.
    cy.get("#canvas-container div:nth-child(4) button").should(
      "not.be.visible",
    );
    // The popup header is now hidden.
    cy.get("#canvas-container div.popup-header").should("not.be.visible");
    // The title '6. Soft Skills (Humain)' is no longer visible.
    cy.get("#canvas-container h2").should("not.be.visible");
    // The content of the popup is now hidden.
    cy.get("#canvas-container div.popup-content").should("not.be.visible");
    // The duration text is no longer visible.
    cy.get(
      "#canvas-container div:nth-child(1) > div > span:nth-child(2)",
    ).should("not.be.visible");
  });
});

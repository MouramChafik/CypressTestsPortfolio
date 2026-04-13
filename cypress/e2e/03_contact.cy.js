// ─────────────────────────────────────────────────────────────
// Tests de la section Contact
// ─────────────────────────────────────────────────────────────

describe("03 – Page Contact", () => {
  beforeEach(() => {
    cy.visit("/contact");
    cy.waitForPageLoad();
  });

  // ─── Affichage de la page ───────────────────────────────────

  describe("Affichage", () => {
    it("affiche le titre principal 'Restons en contact'", () => {
      cy.get("h1").should("contain.text", "Restons en contact");
    });

    it("affiche le texte de présentation", () => {
      cy.get("p")
        .first()
        .should("contain.text", "Vous avez un projet en tête");
    });

    it("affiche les informations de contact (email et lieu)", () => {
      cy.contains("mouram.chafik@gmail.com").should("be.visible");
      cy.contains("Lyon, FRANCE").should("be.visible");
    });

    it("affiche les liens vers les réseaux sociaux", () => {
      cy.get('a[href*="github.com/MouramChafik"]').should("be.visible");
      cy.get('a[href*="linkedin.com/in/chafik-mouram"]').should("be.visible");
      cy.get('a[href*="huggy-recrutement.com"]').should("be.visible");
    });

    it("affiche la section 'Disponible pour des opportunités'", () => {
      cy.contains("Disponible pour des opportunités").should("be.visible");
      cy.contains("Parlons de votre projet")
        .should("be.visible")
        .and("have.attr", "href", "mailto:mrmouramito@gmail.com");
    });

    it("affiche le formulaire de contact avec tous ses champs", () => {
      cy.get('[name="name"]').should("be.visible");
      cy.get('[name="email"]').should("be.visible");
      cy.get('[name="subject"]').should("be.visible");
      cy.get('[name="message"]').should("be.visible");
      cy.get('button[type="submit"]').should("contain.text", "Envoyer");
    });
  });

  // ─── Formulaire – saisie valide ────────────────────────────

  describe("Formulaire – saisie valide", () => {
    it("permet de remplir tous les champs correctement", () => {
      cy.get('[name="name"]').type("Chafik Mouram");
      cy.get('[name="name"]').should("have.value", "Chafik Mouram");

      cy.get('[name="email"]').type("mouram.chafik@gmail.com");
      cy.get('[name="email"]').should("have.value", "mouram.chafik@gmail.com");

      cy.get('[name="subject"]').type("Opportunité QA Automation");
      cy.get('[name="subject"]').should("have.value", "Opportunité QA Automation");

      cy.get('[name="message"]').type("Bonjour, je souhaite discuter d'une opportunité.");
      cy.get('[name="message"]').should("have.value", "Bonjour, je souhaite discuter d'une opportunité.");
    });

    it("soumet le formulaire avec des données valides", () => {
      cy.get('[name="name"]').type("Chafik Mouram");
      cy.get('[name="email"]').type("mouram.chafik@gmail.com");
      cy.get('[name="subject"]').type("Opportunité QA Automation");
      cy.get('[name="message"]').type("Bonjour, je souhaite discuter d'une opportunité.");

      cy.get('button[type="submit"]').click();

      // Adapter selon le comportement réel après soumission :
      // succès, redirection, ou message de confirmation
      cy.contains("Message envoyé", { timeout: 6000 }).should("be.visible");
    });
  });

  // ─── Formulaire – validation des champs requis ─────────────

  describe("Formulaire – validation", () => {
    it("ne soumet pas si le champ Nom est vide", () => {
      cy.get('[name="email"]').type("mouram.chafik@gmail.com");
      cy.get('[name="message"]').type("Test message");
      cy.get('button[type="submit"]').click();
      cy.get('[name="name"]').should("be.visible"); // formulaire toujours affiché
    });

    it("ne soumet pas si le champ Email est vide", () => {
      cy.get('[name="name"]').type("Chafik Mouram");
      cy.get('[name="message"]').type("Test message");
      cy.get('button[type="submit"]').click();
      cy.get('[name="email"]').should("be.visible");
    });

    it("ne soumet pas si le champ Message est vide", () => {
      cy.get('[name="name"]').type("Chafik Mouram");
      cy.get('[name="email"]').type("mouram.chafik@gmail.com");
      cy.get('button[type="submit"]').click();
      cy.get('[name="message"]').should("be.visible");
    });

    it("ne soumet pas avec un email invalide", () => {
      cy.get('[name="name"]').type("Chafik Mouram");
      cy.get('[name="email"]').type("email-invalide");
      cy.get('[name="message"]').type("Test message");
      cy.get('button[type="submit"]').click();
      cy.get('[name="email"]').should("be.visible");
    });
  });

  // ─── Liens réseaux sociaux ─────────────────────────────────

  describe("Liens réseaux sociaux", () => {
    it("le lien GitHub pointe vers le bon profil", () => {
      cy.get('a[href*="github.com/MouramChafik"]')
        .should("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer");
    });

    it("le lien LinkedIn pointe vers le bon profil", () => {
      cy.get('a[href*="linkedin.com/in/chafik-mouram"]')
        .should("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer");
    });

    it("le lien Huggy pointe vers le bon profil", () => {
      cy.get('a[href*="huggy-recrutement.com"]')
        .should("have.attr", "target", "_blank")
        .and("have.attr", "rel", "noopener noreferrer");
    });
  });
});
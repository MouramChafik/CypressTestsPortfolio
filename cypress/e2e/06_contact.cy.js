// cypress/e2e/06_contact.cy.js
// ─────────────────────────────────────────────────────────────
// Tests de la section Contact (formulaire & liens sociaux)
// ─────────────────────────────────────────────────────────────

describe('06 – Section Contact', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  context('Présence de la section contact', () => {
    it('la section contact est accessible (lien dans le menu ou sur la page)', () => {
      cy.get('a[href*="contact"], a:contains("Contact"), a:contains("contact")')
        .should('have.length.gte', 1)
    })

    it('affiche au minimum un lien email ou un formulaire', () => {
      cy.get('a[href^="mailto:"], form, input[type="email"]')
        .should('have.length.gte', 1)
    })

    it('affiche des liens vers les réseaux sociaux (LinkedIn, GitHub, Email)', () => {
      cy.get('footer a, main a').filter(($a) => {
        const href = $a.attr('href')
        return href.includes('linkedin') || href.includes('github') || href.includes('mailto')
      }).should('have.length.gte', 1)
    })

    it('le lien email est fonctionnel', () => {
      cy.get('a[href^="mailto:"]').first().then(($link) => {
        const href = $link.attr('href')
        expect(href).to.match(/mailto:.+@.+/)
      })
    })
  })

  context('Formulaire de contact (si présent)', () => {
    it('si un formulaire existe, il a les champs de base', () => {
      cy.get('form').then(($form) => {
        if ($form.length > 0) {
          // Vérifier au moins des inputs de base
          cy.get('form input, form textarea').should('have.length.gte', 1)
        } else {
          cy.log('Pas de formulaire trouvé sur la page, test ignoré')
        }
      })
    })

    it('le formulaire (si présent) a des champs pour nom et message', () => {
      cy.get('form').then(($form) => {
        if ($form.length > 0) {
          cy.get('form').within(() => {
            cy.get('input, textarea').should('have.length.gte', 2)
          })
        } else {
          cy.log('Tout contact se fait par email, test ignoré')
        }
      })
    })

    it('affiche un lien email visible dans le footer ou header', () => {
      cy.get('footer a[href^="mailto:"], a[href^="mailto:"]:visible')
        .should('have.length.gte', 1)
    })
  })

  context('Accessibilité des contacts', () => {
    it('tous les liens sociaux/contact sont visibles et accessibles', () => {
      cy.get('footer').within(() => {
        cy.get('a').each(($a) => {
          const text = $a.text()
          const ariaLabel = $a.attr('aria-label')
          expect(text.length > 0 || ariaLabel).to.be.true
        })
      })
    })

    it('l\'email du contact est clairement affiché', () => {
      cy.get('a[href^="mailto:"]').first().should('contain', '@')
    })
  })
})

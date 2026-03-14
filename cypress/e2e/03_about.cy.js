// cypress/e2e/03_about.cy.js
// ─────────────────────────────────────────────────────────────
// Tests de la section "À propos"
// ─────────────────────────────────────────────────────────────

describe('03 – Section À propos', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('la section À propos existe sur la page', () => {
    cy.contains(/à propos|about|qui suis-je|developer|tester/i).should('exist')
  })

  it('le titre de la section est visible après scroll', () => {
    cy.contains(/à propos|about|qui suis-je/i)
      .scrollIntoView()
      .should('exist')
  })

  it('contient un texte de présentation significatif', () => {
    cy.get('main section').then(($sections) => {
      let foundAbout = false
      Array.from($sections).forEach((section) => {
        const text = Cypress.$(section).text()
        if (text.includes('développeur') || text.includes('developer') || text.includes('testeur') || text.includes('tester')) {
          foundAbout = true
        }
      })
      expect(foundAbout).to.be.true
    })
  })

  it('mentionne les compétences principales (test, QA, ou automation)', () => {
    cy.contains(/test|qa|qualité|automation|cypress|selenium/i).should('exist')
  })

  it('contient une image (photo de profil ou illustration)', () => {
    cy.get('img').each(($img) => {
      const alt = $img.attr('alt') || ''
      if (alt.toLowerCase().includes('chafik') || alt.toLowerCase().includes('profil') || alt.toLowerCase().includes('photo')) {
        cy.wrap($img).should('be.visible')
      }
    })
  })

  it('la section a une structure HTML cohérente', () => {
    cy.get('main').within(() => {
      cy.get('h2, h3').should('have.length.gte', 1)
      cy.get('p').should('have.length.gte', 1)
    })
  })
})

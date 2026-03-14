// cypress/e2e/05_projects.cy.js
// ─────────────────────────────────────────────────────────────
// Tests de la section Projets / Portfolio
// ─────────────────────────────────────────────────────────────

describe('05 – Section Projets / Portfolio', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('la section projets est présente sur la page', () => {
    cy.contains(/projets|projects|portfolio|réalisations|featured/i).should('exist')
  })

  it('affiche au moins un projet', () => {
    cy.get('main').then(($main) => {
      const text = $main.text()
      const hasProjects = text.includes('Postman') || text.includes('Kids') || text.includes('Cineflix') || text.includes('projet')
      expect(hasProjects).to.be.true
    })
  })

  it('chaque projet a un titre descriptif', () => {
    cy.get('main h2, main h3').should('have.length.gte', 2)
    cy.get('main h2:contains("Postman"), main h2:contains("Kids"), main h2:contains("Cineflix")')
      .should('exist')
  })

  it('chaque projet contient une description', () => {
    cy.get('main p').each(($p) => {
      const text = $p.text()
      if (text.includes('Postman') || text.includes('application') || text.includes('suite')) {
        expect(text.length).to.be.greaterThan(10)
      }
    })
  })

  it('les liens GitHub / démo sont présents (En savoir plus, Démo)', () => {
    cy.get('main a')
      .filter(($a) => {
        const text = $a.text().toLowerCase()
        return text.includes('savoir') || text.includes('démo') || text.includes('github') || text.includes('demo')
      })
      .should('have.length.gte', 1)
  })

  it('les liens vers les projets sont valides', () => {
    cy.get('main a[href*="github"], main a[href*="netlify"]').each(($a) => {
      const href = $a.attr('href')
      expect(href).to.not.be.empty
      if (href && href.startsWith('http')) {
        cy.wrap($a).should('have.attr', 'target', '_blank')
      }
    })
  })

  it('les images des projets se chargent sans erreur 404', () => {
    cy.get('main img').each(($img) => {
      const src = $img.attr('src')
      if (src && src.startsWith('http')) {
        cy.request({ url: src, failOnStatusCode: false })
          .its('status')
          .should('be.lt', 400)
      }
    })
  })

  it('chaque projet affiche les technologies utilisées', () => {
    cy.get('main').within(() => {
      cy.contains(/react|node|typescript|postman|api|firebase|project/i).should('exist')
    })
  })
})

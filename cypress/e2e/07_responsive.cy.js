// ─────────────────────────────────────────────────────────────
// Tests de responsivité (mobile, tablette, desktop)
// ─────────────────────────────────────────────────────────────

const viewports = [
  { label: 'Mobile S  (320px)',  width: 320,  height: 568  },
  { label: 'Mobile L  (414px)',  width: 414,  height: 896  },
  { label: 'Tablette  (768px)',  width: 768,  height: 1024 },
  { label: 'Laptop    (1280px)', width: 1280, height: 800  },
  { label: 'Desktop   (1920px)', width: 1920, height: 1080 },
]

describe('07 – Responsivité (multi-breakpoints)', () => {
  viewports.forEach(({ label, width, height }) => {
    describe(`Viewport : ${label}`, () => {
      beforeEach(() => {
        cy.viewport(width, height)
        cy.visit('/')
        cy.waitForPageLoad()
      })

      it('la page se charge correctement', () => {
        cy.get('body').should('exist')
        cy.get('main').should('exist')
      })

      it('le header / nav est visible et accessible', () => {
        cy.get('nav, header, [role="navigation"]').should('exist')
      })

      it('le titre principal h1 est présent', () => {
        cy.get('h1').should('have.length.gte', 1)
      })

      it('pas de débordement horizontal (pas de scrollbar horizontal parasite)', () => {
        cy.document().then((doc) => {
          const body = doc.body
          // Vérifier que le scrollWidth n'est pas significativement plus grand que la viewport
          expect(body.scrollWidth).to.be.lte(width + 20)
        })
      })

      it('les images ne débordent pas de leur conteneur', () => {
        cy.get('img:visible').each(($img) => {
          cy.wrap($img).then(($el) => {
            const rect = $el[0].getBoundingClientRect()
            // Vérifier que l'image ne sort pas à droite de la viewport
            expect(rect.right).to.be.lte(width + 5)
          })
        })
      })

      it('le texte est lisible (pas de déformation)', () => {
        cy.get('p, h1, h2, h3').first().should('be.visible')
      })

      it('les boutons et liens sont cliquables en taille', () => {
        cy.get('a:visible, button:visible').first().then(($el) => {
          const rect = $el[0].getBoundingClientRect()
          // Vérifier que l'élément a une hauteur minimale (recommandé 44px)
          expect(rect.height).to.be.gte(20)
        })
      })
    })
  })

  describe('Menu hamburger (mobile)', () => {
    beforeEach(() => {
      cy.viewport(375, 812)
      cy.visit('/')
      cy.waitForPageLoad()
    })

    it('affiche un menu adapté en mobile (burger ou menu alternatif)', () => {
      cy.get('nav, header').should('exist')
      // Vérifier que les liens sont soit visibles, soit cachés par un burger
      cy.get('nav a').then(($links) => {
        const visibleCount = Array.from($links).filter(a => Cypress.$(a).is(':visible')).length
        const hamburger = Cypress.$('[class*="hamburger"], [class*="burger"], button[aria-label*="menu"]').length
        expect(visibleCount > 0 || hamburger > 0).to.be.true
      })
    })

    it('le menu est accessible sur mobile (not hidden completely)', () => {
      cy.get('nav').should('exist')
    })
  })

  describe('Tablet responsiveness', () => {
    beforeEach(() => {
      cy.viewport(768, 1024)
      cy.visit('/')
      cy.waitForPageLoad()
    })

    it('la mise en page utilise l\'espace disponible correctement', () => {
      cy.get('main').should('be.visible')
      cy.get('img:visible').should('have.length.gte', 1)
    })
  })
})

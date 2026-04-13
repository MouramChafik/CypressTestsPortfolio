// ─────────────────────────────────────────────────────────────
// Tests de la section Compétences / Skills
// ─────────────────────────────────────────────────────────────

describe('04 – Section Compétences / Skills', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.waitForPageLoad()
  })

  it('la section compétences est présente', () => {
    cy.contains(/compétences|skills|technologies|développement/i).should('exist')
  })

  it('le titre de la section est visible après scroll', () => {
    cy.contains(/compétences|skills|technologies/i)
      .scrollIntoView()
      .should('be.visible')
  })

  it('affiche plusieurs compétences ou catégories', () => {
    cy.get('main').then(($main) => {
      const text = $main.text()
      const skillCount = (text.match(/react|javascript|typescript|node|express|cypress|selenium|api|postman|mongodb|mysql/gi) || []).length
      expect(skillCount).to.be.greaterThan(2)
    })
  })

  it('contient des technologies liées au QA', () => {
    cy.contains(/cypress|selenium|jest|playwright|postman|jira|xray|automation/i).should('exist')
  })

  it('contient des technologies frontend', () => {
    cy.contains(/react|javascript|typescript|html|css|tailwind|vue/i).should('exist')
  })

  it('contient des technologies backend/services', () => {
    cy.contains(/node|express|mongodb|mysql|api|rest|cloud/i).should('exist')
  })

  it('les icônes ou logos de compétences se chargent correctement', () => {
    cy.get('main img').each(($img) => {
      cy.wrap($img)
        .should('have.attr', 'src')
        .and('not.be.empty')
    })
  })

  it('les compétences sont organisées de manière logique', () => {
    cy.get('main h2, main h3').should('have.length.gte', 2)
  })
})

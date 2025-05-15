describe('Basic Tests', () => {
  it('should load the homepage', () => {
    cy.visit('/')
    cy.get('body').should('exist')
    cy.title().should('include', 'CarbonCalC')
  })

  it('should display calculator page', () => {
    cy.visit('/calculator')
    // Verify something on the calculator page using case-insensitive regex
    cy.contains(/carbon/i, { timeout: 10000 }).should('be.visible')
  })
}) 
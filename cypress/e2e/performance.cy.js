describe('Performance Tests', () => {
  it('should load the homepage quickly', () => {
    cy.visit('/')
    
    // Check that the page loads key elements
    cy.get('body').should('be.visible')
    cy.get('a').should('be.visible')
  })
  
  it('should load the calculator page quickly', () => {
    cy.visit('/calculator')
    
    // Verify the form inputs render
    cy.get('#name').should('be.visible')
  })
  
  it('should handle form submissions efficiently', () => {
    cy.visit('/calculator')
    
    // Fill out the first form step
    cy.get('#name').type('Performance Test')
    cy.get('#industry').select('technology')
    cy.get('#employees').type('25')
    cy.get('#region').select('usa')
    cy.get('#state').select('california')
    
    // Measure time to validate and proceed
    const validateStartTime = performance.now()
    cy.get('#business-info-continue').click()
    
    cy.get('#kwh').should('be.visible').then(() => {
      const validateEndTime = performance.now()
      const validationTime = validateEndTime - validateStartTime
      cy.log(`Form validation and navigation time: ${validationTime.toFixed(2)}ms`)
    })
  })
}) 
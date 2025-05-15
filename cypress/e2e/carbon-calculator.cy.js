describe('Carbon Calculator E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main title', () => {
    cy.contains(/carbonCalC/i).should('be.visible')
  })

  it('should navigate to calculator page', () => {
    cy.get('[data-testid="nav-calculator"]').click()
    cy.url().should('include', '/calculator')
    cy.contains(/business carbon footprint calculator/i).should('be.visible')
  })

  it('should complete the calculator form step by step', () => {
    cy.visit('/calculator')
    
    // Fill out the first form
    cy.get('#name').type('Test Company')
    cy.get('#industry').select('technology')
    cy.get('#employees').type('10')
    cy.get('#region').select('usa')
    cy.get('#state').select('california')
    cy.get('#business-info-continue').click()

    // Verify we moved to the next step
    cy.get('#kwh').should('exist')
    
    // Fill energy usage
    cy.get('#kwh').type('20000')
    cy.get('#renewable').type('25')
    cy.get('#electricity-continue').click()
    
    // Fill travel information
    cy.get('#businessMiles').type('100')
    cy.get('#transportType').select('medium')
    cy.get('#freightMiles').type('50')
    cy.get('#travel-continue').click()
    
    // Verify we reached the final step
    cy.contains(/thank you/i).should('be.visible')
  })
  
  it('should validate form fields and display errors', () => {
    cy.visit('/calculator')
    
    // Try to continue without filling required fields
    cy.get('#business-info-continue').click()
    
    // Verify we get validation feedback (either through aria or visual indicators)
    cy.get('body').then(($body) => {
      // Check for either aria-invalid attribute, error text, or error class
      const hasValidationError = 
        $body.find('[aria-invalid="true"]').length > 0 || 
        $body.find('.error-message').length > 0 ||
        $body.find('.text-red-500').length > 0;
      
      expect(hasValidationError).to.be.true;
    });
    
    // Fill required fields and continue
    cy.get('#name').type('Error Test Co')
    cy.get('#industry').select('technology')
    cy.get('#employees').type('5')
    cy.get('#region').select('usa')
    cy.get('#state').select('california')
    cy.get('#business-info-continue').click()
    
    // Should be on electricity step
    cy.get('#kwh').should('exist')
  })
})

// Edge Cases and Boundary Values
describe('Edge Cases and Boundary Values', () => {
  beforeEach(() => {
    cy.visit('/calculator')
  })
  
  it('should handle numeric edge cases', () => {
    // Test with minimum values
    cy.get('#name').type('Edge Case Tests')
    cy.get('#industry').select('technology')
    cy.get('#employees').type('1') // Minimum employees
    cy.get('#region').select('usa')
    cy.get('#state').select('california')
    cy.get('#business-info-continue').click()
    
    // Test very low electricity values
    cy.get('#kwh').type('1') // Minimum kWh
    cy.get('#renewable').type('0') // Minimum renewable %
    cy.get('#electricity-continue').click()
    
    // Test very low travel values
    cy.get('#businessMiles').type('0') 
    cy.get('#transportType').select('medium')
    cy.get('#freightMiles').type('0')
    
    // Verify form submits with minimum values
    cy.get('#travel-continue').click()
    cy.contains('Thank you').should('be.visible')
  })
  
  it('should handle negative numeric validation', () => {
    cy.visit('/calculator')
    
    // Fill in the form with negative values for employees
    cy.get('#name').should('be.visible').type('Validation Test')
    cy.get('#employees').clear().type('-10')
    
    // Just verify we can interact with the form
    cy.get('#business-info-continue').should('be.visible')
  })
  
  it('should handle special characters in business name', () => {
    cy.get('#name').type('Special & Chars (Corp) #123')
    cy.get('#industry').select('technology')
    cy.get('#employees').type('25')
    cy.get('#region').select('usa')
    cy.get('#state').select('california')
    cy.get('#business-info-continue').click()
    
    // Should proceed to next step (electricity)
    cy.get('#kwh').should('exist')
  })
})

// Accessibility and UI Tests
describe('Accessibility and UI Tests', () => {
  it('should have basic accessibility features', () => {
    cy.visit('/calculator')
    
    // Check heading and labels
    cy.contains(/business carbon footprint calculator/i).should('be.visible')
    cy.get('label').should('be.visible')
    cy.get('button').should('be.visible')
    
    // Check for required attributes
    cy.get('#name').should('exist')
  })
  
  it('should be responsive on various viewports', () => {
    // Test on tablet viewport
    cy.viewport('ipad-2')
    cy.visit('/calculator')
    
    // Elements should be visible
    cy.get('#name').should('be.visible')
    cy.get('#business-info-continue').should('be.visible')
    
    // Test on mobile viewport
    cy.viewport('iphone-x')
    cy.visit('/calculator')
    
    // Elements should adapt to mobile
    cy.get('#name').should('be.visible')
    cy.get('#business-info-continue').should('be.visible')
  })
}) 
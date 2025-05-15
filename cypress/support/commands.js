// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }) 

// Custom command to complete the calculator form
Cypress.Commands.add('completeCalculatorForm', (options = {}) => {
  const defaults = {
    businessName: 'Test Company',
    industry: 'technology',
    employees: 25,
    region: 'usa',
    state: 'california',
    kwh: 50000,
    renewable: 20,
    businessMiles: 5000,
    transportType: 'medium',
    freightMiles: 2000,
    averageMiles: 15
  };

  const settings = { ...defaults, ...options };

  // Step 1: Basic Information - fill in what elements we can find
  cy.visit('/calculator')
  
  // Wait for form to load
  cy.contains('Carbon', { timeout: 10000 }).should('be.visible')
  
  // Try to fill out basic info
  cy.get('body').then($body => {
    if ($body.find('#name').length > 0) {
      cy.get('#name').type(settings.businessName)
    }
    
    if ($body.find('#industry').length > 0) {
      cy.get('#industry').select(settings.industry)
    }
    
    if ($body.find('#employees').length > 0) {
      cy.get('#employees').type(settings.employees)
    }
    
    if ($body.find('#region').length > 0) {
      cy.get('#region').select(settings.region)
    }
    
    if ($body.find('#state').length > 0) {
      cy.get('#state').select(settings.state)
    }
    
    // Look for a continue button
    if ($body.find('#business-info-continue').length > 0) {
      cy.get('#business-info-continue').click()
    } else if ($body.find('button:contains("Continue")').length > 0) {
      cy.contains('button', 'Continue').click()
    }
  })
}); 
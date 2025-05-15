// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES modules syntax:
import './commands.js'

// Import Cypress plugins conditionally to prevent errors if modules aren't installed
try {
  // For accessibility testing
  require('cypress-axe')
} catch (e) {
  console.warn('cypress-axe not installed, skipping import')
}

try {
  // For more realistic user interactions
  require('cypress-real-events')
} catch (e) {
  console.warn('cypress-real-events not installed, skipping import')
}

try {
  // For keyboard navigation testing
  require('cypress-plugin-tab')
} catch (e) {
  console.warn('cypress-plugin-tab not installed, skipping import')
}

// Add console logging for a11y violations
function terminalLog(violations) {
  cy.task('log', `${violations.length} accessibility violation(s) detected`)
  
  // Format violations for console
  const violationData = violations.map(({ id, impact, description, nodes }) => ({
    id,
    impact,
    description,
    nodes: nodes.length
  }))
  
  cy.task('table', violationData)
}

// Register custom commands for accessibility testing
Cypress.Commands.add('checkA11y', (context, options) => {
  if (typeof cy.injectAxe === 'function') {
    cy.injectAxe()
    cy.checkA11y(context, options, terminalLog)
  } else {
    cy.log('cypress-axe not loaded, skipping accessibility check')
  }
})

// Add performance timing measurements
Cypress.Commands.add('measurePageLoad', (pageName) => {
  cy.window().then((win) => {
    const performanceEntries = win.performance.getEntriesByType('navigation')
    if (performanceEntries && performanceEntries.length > 0) {
      const loadTime = performanceEntries[0].loadEventEnd
      cy.log(`📊 ${pageName} page load time: ${loadTime.toFixed(2)}ms`)
      // Add custom metric to Cypress report
      Cypress.perf = Cypress.perf || {}
      Cypress.perf[pageName] = loadTime
    } else {
      cy.log('Performance entries not available')
    }
  })
})

// Alternatively you can use CommonJS syntax:
// require('./commands') 
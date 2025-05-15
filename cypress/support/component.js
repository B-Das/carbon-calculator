// ***********************************************************
// This example support/component.js is processed and
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

// Import commands.js using ES2015 syntax:
import './commands';
import { mount } from 'cypress/react';

// For newer versions of React (17+)
Cypress.Commands.add('mount', (component, options = {}) => {
  // Use standard Cypress mount
  return mount(component, options);
});

// Example use:
// cy.mount(<MyComponent />)
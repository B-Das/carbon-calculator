import React from 'react'
import { CalculatorProvider } from './CalculatorContext'

describe('<CalculatorProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CalculatorProvider />)
  })
})
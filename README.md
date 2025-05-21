# CarbonCalC: Business Carbon Footprint Calculator

CarbonCalC is a comprehensive web application designed to help businesses measure, understand, and reduce their carbon footprint. By leveraging international standards and privacy-focused tools, CarbonCalC empowers businesses to take meaningful action against climate change.

[Live Demo](https://carboncalce.netlify.app/)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

### Purpose

CarbonCalC aims to provide businesses of all sizes with the tools they need to measure and manage their carbon emissions effectively. It uses internationally recognized greenhouse gas (GHG) accounting standards, including data from the EPA, GHG Protocol, and IEA.

### Privacy Focus

All calculations are performed in the user's browser, ensuring that no sensitive business data is stored on external servers.

---

## Features

- **Quick Carbon Assessment**: Perform quick and actionable assessments based on business size, industry, and location.
- **User-Friendly Interface**: A React-powered interface for seamless interaction.
- **Accessibility Testing**: Ensures accessibility compliance using Cypress and cypress-axe.
- **Performance Optimization**: Includes performance benchmarks for key workflows.
- **Local Storage Integration**: Saves user data locally using the `useLocalStorage` hook, guaranteeing privacy.

---

## Getting Started

### Prerequisites

To get started, ensure you have the following installed:

- **Node.js**: >= 14.x
- **npm** or **yarn**
- **Cypress**: For end-to-end testing

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/B-Das/carbon-calculator.git
   cd carbon-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

---

## Running Tests

### Cypress End-to-End Tests

1. Run the Cypress test suite:
   ```bash
   npm run cypress
   ```

2. Tests include:
   - Accessibility validation
   - Performance benchmarks
   - Component tests for React

### Example Test Cases

```javascript
// Example Cypress Test
describe('Basic Tests', () => {
  it('should load the homepage', () => {
    cy.visit('/')
    cy.get('body').should('exist')
  })
})
```

---

## Technologies Used

- **React + Vite**: Front-end framework with fast refresh
- **Cypress**: End-to-end testing framework
- **ESLint**: Ensures code quality
- **JavaScript**: Core programming language
- **Greenhouse Gas Protocol Standards**: Basis for carbon calculations

---

## Contributing

We welcome contributions! To get started:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them to GitHub.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Get in Touch

Have questions or feedback? Fill out the contact form on the [About Page](https://carboncalce.netlify.app/#/about) or open an issue on GitHub.
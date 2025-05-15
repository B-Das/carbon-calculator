import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    // baseUrl: "http://localhost:5174",
    // baseUrl: "http://localhost:5175",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        table(data) {
          console.table(data);
          return null;
        },
      });
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 10000, // Increase timeout for slower operations
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true, // Record videos of test runs
    screenshotOnRunFailure: true,
    experimentalStudio: true,
  },

  retries: {
    runMode: 2, // Retry failed tests in CI
    openMode: 0, // Don't retry in open mode
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      baseUrl: "http://localhost:5175",
    },
    supportFile: "cypress/support/component.js",
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: "cypress/support/component-index.html",
    setupNodeEvents(on, config) {
      // Component testing-specific node events setup
    },
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ybu8oe",
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://mouram.netlify.app",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
  },
});

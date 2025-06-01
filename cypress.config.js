const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app-hom.cocobambu.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    modifyObstructiveCode: false
  }
}); 
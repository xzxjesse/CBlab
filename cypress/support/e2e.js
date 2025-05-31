// ***********************************************************
// Este arquivo de suporte é carregado automaticamente antes dos seus testes.
// ***********************************************************

// Importar comandos personalizados
import './commands'

// Ocultar erros de fetch/XHR no console
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

// Configurações globais
beforeEach(() => {
  // Limpar cookies e localStorage antes de cada teste
  cy.clearCookies()
  cy.clearLocalStorage()
})
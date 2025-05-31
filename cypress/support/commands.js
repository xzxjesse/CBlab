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

// ***********************************************************
// Comandos personalizados do Cypress
// ***********************************************************

// Comando para login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=email]').type(email)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=submit]').click()
})

// Comando para preencher endereço
Cypress.Commands.add('preencherEndereco', (endereco) => {
  cy.get('[data-cy=cep]').type(endereco.cep)
  cy.get('[data-cy=logradouro]').type(endereco.logradouro)
  cy.get('[data-cy=numero]').type(endereco.numero)
  cy.get('[data-cy=bairro]').type(endereco.bairro)
  cy.get('[data-cy=cidade]').type(endereco.cidade)
  cy.get('[data-cy=estado]').select(endereco.estado)
})

// Comando para validar mensagem de sucesso
Cypress.Commands.add('validarMensagemSucesso', (mensagem) => {
  cy.get('[data-cy=success-message]')
    .should('be.visible')
    .and('contain', mensagem)
})
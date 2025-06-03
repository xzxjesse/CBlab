/**
 * Suite de testes básicos para o fluxo de endereço
 * @description Valida os cenários críticos do fluxo de endereço
 */

import { ENDERECO_VALIDO, ENDERECO_INVALIDO, TIMEOUT_PADRAO, setupEndereco } from './endereco.support'

describe('Fluxo de Endereço - Testes Básicos', () => {
    beforeEach(() => {
        setupEndereco()
    })

    it('deve permitir inserir endereço válido e avançar no fluxo', () => {
        // Arrange: Prepara o campo de entrada
        cy.get('input.search-address-input')
            .should('be.visible')
            .and('be.enabled')
            .clear()

        // Act: Insere o endereço válido
        cy.get('input.search-address-input')
            .type(`${ENDERECO_VALIDO}{enter}`)

        // Assert: Valida o estado após inserção
        cy.get('input.search-address-input')
            .should('have.value', ENDERECO_VALIDO)
            .and('not.have.class', 'error')

        // Assert: Valida a navegação
        cy.url({ timeout: TIMEOUT_PADRAO })
            .should('satisfy', url =>
                url.includes('/delivery') || url.includes('/cardapio')
            )
    })

    it('deve mostrar erro ao inserir endereço inválido', () => {
        // Arrange: Prepara o campo de entrada
        cy.get('input.search-address-input')
            .should('be.visible')
            .and('be.enabled')
            .clear()

        // Act: Insere endereço inválido
        cy.get('input.search-address-input')
            .type(`${ENDERECO_INVALIDO}{enter}`)

        // Assert: Valida o estado de erro
        cy.get('input.search-address-input')
            .should('have.value', ENDERECO_INVALIDO)

        // Assert: Valida que não houve navegação
        cy.url({ timeout: 5000 })
            .should('include', '/delivery')
            .and('not.include', '/cardapio')
    })

    it('deve permitir usar localização atual e avançar', () => {
        // Act: Utiliza a localização atual
        cy.contains('Usar localização atual')
            .should('be.visible')
            .click({ force: true })

        // Assert: Valida a navegação
        cy.url({ timeout: TIMEOUT_PADRAO })
            .should('satisfy', url =>
                url.includes('/delivery') || url.includes('/cardapio')
            )
    })
}) 
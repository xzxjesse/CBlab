/**
 * Suite de testes de validação para o fluxo de endereço
 * @description Valida comportamentos específicos do campo de endereço
 */

import { ENDERECO_CURTO, ENDERECO_ESPECIAL, setupEndereco } from './endereco.support'

describe('Fluxo de Endereço - Validações', () => {
    beforeEach(() => {
        setupEndereco()
    })

    it('deve lidar com entradas curtas sem avançar', () => {
        // Arrange & Act: Insere endereço curto
        cy.get('input.search-address-input')
            .clear()
            .type(`${ENDERECO_CURTO}{enter}`)

        // Assert: Valida o estado e navegação
        cy.get('input.search-address-input')
            .should('have.value', ENDERECO_CURTO)

        cy.url({ timeout: 5000 })
            .should('include', '/delivery')
            .and('not.include', '/cardapio')
    })

    it('deve aceitar caracteres especiais no endereço', () => {
        // Arrange & Act: Insere endereço com caracteres especiais
        cy.get('input.search-address-input')
            .clear()
            .type(`${ENDERECO_ESPECIAL}{enter}`)

        // Assert: Valida o estado
        cy.get('input.search-address-input')
            .should('have.value', ENDERECO_ESPECIAL)
    })

    it('deve ter campo de busca de endereço', () => {
        // Arrange: Prepara o campo
        cy.get('input.search-address-input')
            .should('be.visible')
            .and('be.enabled')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder')
            .clear()

        // Act: Digita parte do endereço
        cy.get('input.search-address-input')
            .type('Avenida')

        // Assert: Valida que o campo está funcionando
        cy.get('input.search-address-input')
            .should('have.value', 'Avenida')
    })

    it('deve permitir limpar o campo de endereço', () => {
        // Arrange: Preenche o campo
        cy.get('input.search-address-input')
            .clear()
            .type(ENDERECO_ESPECIAL)

        // Act: Limpa o campo
        cy.get('input.search-address-input')
            .clear()

        // Assert: Valida o estado após limpeza
        cy.get('input.search-address-input')
            .should('have.value', '')
    })
}) 
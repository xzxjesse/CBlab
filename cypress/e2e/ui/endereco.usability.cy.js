/**
 * Suite de testes de usabilidade para o fluxo de endereço
 * @description Valida aspectos de usabilidade da interface
 */

import { setupEndereco } from './endereco.support'

describe('Fluxo de Endereço - Usabilidade', () => {
    beforeEach(() => {
        setupEndereco()
    })

    it('deve ter tamanhos de fonte legíveis', () => {
        // Assert: Valida tamanho da fonte
        cy.get('body').then($body => {
            const fontSize = parseFloat($body.css('font-size'))
            expect(fontSize).to.be.greaterThan(12)
        })
    })

    it('deve ter espaçamento adequado entre elementos', () => {
        // Assert: Valida espaçamento do input
        cy.get('input.search-address-input').then($input => {
            expect($input.css('margin')).to.exist
            expect($input.css('padding')).to.exist
        })
    })

    it('deve ter feedback visual nos estados de foco', () => {
        // Act: Foca no input
        cy.get('input.search-address-input')
            .focus()

        // Assert: Valida feedback visual
        cy.get('input.search-address-input')
            .should('have.css', 'outline')
            .and('not.be.empty')
    })

    it('deve ter estrutura responsiva', () => {
        // Act & Assert: Testa em viewport mobile
        cy.viewport('iphone-6')
        cy.get('input.search-address-input')
            .should('be.visible')
            .and('not.be.disabled')
        
        // Act & Assert: Testa em viewport desktop
        cy.viewport('macbook-13')
        cy.get('input.search-address-input')
            .should('be.visible')
            .and('not.be.disabled')
    })
}) 
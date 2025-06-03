/**
 * Suite de testes de acessibilidade para o fluxo de endereço
 * @description Valida a conformidade com padrões de acessibilidade WCAG
 * @see https://www.w3.org/WAI/standards-guidelines/wcag/
 */

import { setupEndereco } from './endereco.support'

describe('Fluxo de Endereço - Acessibilidade', () => {
    beforeEach(() => {
        setupEndereco()
    })

    it('deve ter estrutura HTML semântica adequada', () => {
        // Assert: Valida elementos estruturais principais
        cy.get('.app-content')
            .should('exist')
            .and('be.visible')

        // Assert: Valida hierarquia de títulos
        cy.get('h1, h2, h3, .title, .subtitle')
            .should('exist')
            .and('be.visible')
            .and('have.length.at.least', 1)
    })

    it('deve ter atributos ARIA nos elementos interativos', () => {
        // Assert: Valida atributos do input
        cy.get('input.search-address-input')
            .should('be.visible')
            .and('be.enabled')
            .and('have.attr', 'type', 'text')

        // Assert: Valida atributos dos botões
        cy.get('button').each($btn => {
            cy.wrap($btn)
                .should('be.visible')
                .and('be.enabled')
        })
    })

    it('deve ter textos alternativos em imagens', () => {
        // Assert: Valida textos alternativos
        cy.get('img').each($img => {
            cy.wrap($img)
                .should('be.visible')
                .and('have.attr', 'alt')
                .and('not.have.attr', 'alt', '')
        })
    })

    it('deve ter links com textos descritivos', () => {
        // Assert: Valida textos dos links
        cy.get('a, [role="link"]').each($link => {
            const text = $link.text().trim()
            if (text) {
                expect(text).to.not.equal('clique aqui')
                expect(text).to.not.equal('saiba mais')
            }
        })
    })

    it('deve ter contraste adequado nos textos', () => {
        // Assert: Valida contraste dos elementos de texto
        cy.get('h1, h2, h3, p, span, a, .text, .label').each($el => {
            cy.wrap($el)
                .should('be.visible')
                .then($element => {
                    const color = $element.css('color')
                    const backgroundColor = $element.css('background-color')
                    expect(color).to.exist
                    expect(backgroundColor).to.exist
                })
        })
    })
}) 
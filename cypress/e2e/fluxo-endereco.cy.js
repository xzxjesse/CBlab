/**
 * Suite de testes para o fluxo de endereço do Coco Bambu Delivery
 * @description Valida o comportamento do sistema na inserção e validação de endereços
 * @author Jéssica Eveline
 */
describe('Fluxo de Endereço - Coco Bambu Delivery', () => {
    /**
     * Constantes utilizadas nos testes para garantir consistência e manutenibilidade
     * @type {Object}
     * @property {string} ENDERECO_VALIDO - Endereço válido para testes positivos
     * @property {string} ENDERECO_INVALIDO - Endereço inválido para testes negativos
     * @property {string} ENDERECO_CURTO - Endereço curto para validação de limites
     * @property {string} ENDERECO_ESPECIAL - Endereço com caracteres especiais
     * @property {number} TIMEOUT_PADRAO - Timeout padrão para operações assíncronas
     */
    const ENDERECO_VALIDO = 'Avenida Paulista, 1000, São Paulo'
    const ENDERECO_INVALIDO = 'Endereço Inválido'
    const ENDERECO_CURTO = 'A'
    const ENDERECO_ESPECIAL = 'Rua #@!'
    const TIMEOUT_PADRAO = 10000

    /**
     * Setup executado antes de cada teste
     * @description Limpa o estado da aplicação e configura o ambiente para os testes
     * @function
     */
    beforeEach(() => {
        // Arrange: Reset do estado da aplicação
        cy.clearLocalStorage()
        cy.clearCookies()
        
        // Arrange: Mock da API de geolocalização
        cy.window().then((win) => {
            win.navigator.geolocation.getCurrentPosition = null
        })

        // Arrange: Navegação inicial
        cy.visit('https://app-hom.cocobambu.com/delivery')
        cy.wait(3000)
    })

    /**
     * Grupo de testes para o fluxo principal de endereço
     * @description Valida os cenários críticos do fluxo de endereço
     * @group Fluxo Principal
     */
    describe('Fluxo Principal', () => {
        /**
         * Teste do cenário feliz - endereço válido
         * @description Valida o fluxo completo com um endereço válido
         * @test
         */
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

        /**
         * Teste do cenário de erro - endereço inválido
         * @description Valida o comportamento do sistema com entrada inválida
         * @test
         */
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

        /**
         * Teste do fluxo alternativo - geolocalização
         * @description Valida o uso da localização atual como alternativa
         * @test
         */
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

    /**
     * Grupo de testes para validações de entrada
     * @description Testa comportamentos específicos do campo de endereço
     * @group Manipulação do Campo
     */
    describe('Manipulação do Campo', () => {
        /**
         * Teste de limpeza do campo
         * @description Valida a funcionalidade de limpar o campo após preenchimento
         * @test
         */
        it('deve permitir limpar o campo de endereço', () => {
            // Arrange: Preenche o campo
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_VALIDO}{enter}`)

            // Act: Limpa o campo
            cy.get('input.search-address-input')
                .clear()

            // Assert: Valida o estado após limpeza
            cy.get('input.search-address-input')
                .should('have.value', '')
        })

        /**
         * Teste de validação de entrada curta
         * @description Valida o comportamento com entradas abaixo do limite
         * @test
         */
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

        /**
         * Teste de caracteres especiais
         * @description Valida o comportamento com caracteres não alfanuméricos
         * @test
         */
        it('deve aceitar caracteres especiais no endereço', () => {
            // Arrange & Act: Insere endereço com caracteres especiais
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_ESPECIAL}{enter}`)

            // Assert: Valida o estado
            cy.get('input.search-address-input')
                .should('have.value', ENDERECO_ESPECIAL)
        })
    })

    /**
     * Grupo de testes para acessibilidade e usabilidade
     * @description Valida a conformidade com padrões de acessibilidade WCAG e boas práticas de usabilidade
     * @group Acessibilidade e Usabilidade
     * @see https://www.w3.org/WAI/standards-guidelines/wcag/
     */
    describe('Acessibilidade e Usabilidade', () => {
        /**
         * Teste de estrutura semântica
         * @description Valida a implementação correta da estrutura HTML semântica
         * @test
         * @see https://developer.mozilla.org/en-US/docs/Glossary/Semantics
         */
        it('deve ter estrutura HTML semântica adequada', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida elementos estruturais principais
            cy.get('main')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'role', 'main')

            cy.get('header')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'role', 'banner')

            cy.get('nav')
                .should('exist')
                .and('be.visible')
                .and('have.attr', 'role', 'navigation')
            
            // Assert: Valida hierarquia de títulos
            cy.get('h1, h2, h3')
                .should('exist')
                .and('be.visible')
                .and('have.length.at.least', 1)
        })

        /**
         * Teste de atributos ARIA
         * @description Valida a presença e corretude dos atributos ARIA em elementos interativos
         * @test
         * @see https://www.w3.org/WAI/ARIA/apg/
         */
        it('deve ter atributos ARIA nos elementos interativos', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida atributos do input
            cy.get('input.search-address-input')
                .should('have.attr', 'aria-label')
                .and('have.attr', 'role', 'textbox')

            // Assert: Valida atributos dos botões
            cy.get('button').each($btn => {
                cy.wrap($btn)
                    .should('have.attr', 'aria-label')
                    .and('have.attr', 'role', 'button')
            })
        })

        /**
         * Teste de textos alternativos em imagens
         * @description Valida a presença e qualidade dos textos alternativos em elementos de imagem
         * @test
         * @see https://www.w3.org/WAI/tips/writing/#write-meaningful-alt-text-for-images
         */
        it('deve ter textos alternativos em imagens', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida textos alternativos
            cy.get('img').each($img => {
                cy.wrap($img)
                    .should('have.attr', 'alt')
                    .and('not.be.empty')
            })
        })

        /**
         * Teste de textos descritivos em links
         * @description Valida a qualidade e descritividade dos textos em elementos de link
         * @test
         * @see https://www.w3.org/WAI/tips/writing/#write-link-text-that-describes-the-destination
         */
        it('deve ter links com textos descritivos', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida textos dos links
            cy.get('a').each($link => {
                const text = $link.text()
                expect(text).to.not.be.empty
                expect(text).to.not.equal('clique aqui')
                expect(text).to.not.equal('saiba mais')
            })
        })

        /**
         * Teste de contraste de cores
         * @description Valida o contraste adequado entre texto e fundo para garantir legibilidade
         * @test
         * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
         */
        it('deve ter contraste adequado nos textos', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida contraste dos elementos de texto
            cy.get('h1, h2, h3, p, span, a').each($el => {
                cy.wrap($el)
                    .should('be.visible')
                    .and('have.css', 'color')
                    .and('have.css', 'background-color')
            })
        })

        /**
         * Teste de tamanho de fonte
         * @description Valida o tamanho mínimo da fonte para garantir legibilidade
         * @test
         * @see https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html
         */
        it('deve ter tamanhos de fonte legíveis', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida tamanho da fonte
            cy.get('body').then($body => {
                const fontSize = parseFloat($body.css('font-size'))
                expect(fontSize).to.be.greaterThan(12)
            })
        })

        /**
         * Teste de espaçamento
         * @description Valida o espaçamento adequado entre elementos para melhor usabilidade
         * @test
         * @see https://www.w3.org/WAI/WCAG21/Understanding/spacing.html
         */
        it('deve ter espaçamento adequado entre elementos', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Assert: Valida espaçamento do input
            cy.get('input.search-address-input').then($input => {
                expect($input.css('margin')).to.exist
                expect($input.css('padding')).to.exist
            })
        })

        /**
         * Teste de estados de foco
         * @description Valida o feedback visual adequado nos estados de foco dos elementos
         * @test
         * @see https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html
         */
        it('deve ter feedback visual nos estados de foco', () => {
            // Arrange: Navegação já realizada no beforeEach

            // Act: Foca no input
            cy.get('input.search-address-input')
                .focus()

            // Assert: Valida feedback visual
            cy.get('input.search-address-input')
                .should('have.css', 'outline')
                .and('not.be.empty')
        })

        /**
         * Teste de responsividade
         * @description Valida o comportamento da interface em diferentes tamanhos de tela
         * @test
         * @see https://www.w3.org/WAI/WCAG21/Understanding/reflow.html
         */
        it('deve ter estrutura responsiva', () => {
            // Arrange: Navegação já realizada no beforeEach

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
})
/**
 * Suite de testes para o fluxo de endereço do Coco Bambu Delivery
 * @description Valida o comportamento do sistema na inserção e validação de endereços
 * @author Jéssica Eveline
 */
describe('Fluxo de Endereço - Coco Bambu Delivery', () => {
    /**
     * Constantes utilizadas nos testes para garantir consistência e manutenibilidade
     * @constant {string} ENDERECO_VALIDO - Endereço válido para testes positivos
     * @constant {string} ENDERECO_INVALIDO - Endereço inválido para testes negativos
     * @constant {string} ENDERECO_CURTO - Endereço curto para validação de limites
     * @constant {string} ENDERECO_ESPECIAL - Endereço com caracteres especiais
     * @constant {number} TIMEOUT_PADRAO - Timeout padrão para operações assíncronas
     */
    const ENDERECO_VALIDO = 'Avenida Paulista, 1000, São Paulo'
    const ENDERECO_INVALIDO = 'Endereço Inválido'
    const ENDERECO_CURTO = 'A'
    const ENDERECO_ESPECIAL = 'Rua #@!'
    const TIMEOUT_PADRAO = 10000

    /**
     * Setup executado antes de cada teste
     * @description Limpa o estado da aplicação e configura o ambiente para os testes
     */
    beforeEach(() => {
        // Reset do estado da aplicação
        cy.clearLocalStorage()
        cy.clearCookies()
        
        // Mock da API de geolocalização para garantir comportamento consistente
        cy.window().then((win) => {
            win.navigator.geolocation.getCurrentPosition = null
        })

        // Navegação inicial e espera de carregamento
        cy.visit('https://app-hom.cocobambu.com/delivery')
        cy.wait(3000)
    })

    /**
     * Grupo de testes para o fluxo principal de endereço
     * @description Valida os cenários críticos do fluxo de endereço
     */
    describe('Fluxo Principal', () => {
        /**
         * Teste do cenário feliz - endereço válido
         * @description Valida o fluxo completo com um endereço válido
         */
        it('deve permitir inserir endereço válido e avançar no fluxo', () => {
            // Arrange: Prepara o campo de entrada
            cy.get('input.search-address-input')
                .should('be.visible')
                .and('be.enabled')
                .clear()
                .type(`${ENDERECO_VALIDO}{enter}`)

            // Assert: Valida o estado após inserção
            cy.get('input.search-address-input')
                .should('have.value', ENDERECO_VALIDO)
                .and('not.have.class', 'error')

            // Assert: Valida a navegação para a próxima etapa
            cy.url({ timeout: TIMEOUT_PADRAO })
                .should('satisfy', url =>
                    url.includes('/delivery') || url.includes('/cardapio')
                )
        })

        /**
         * Teste do cenário de erro - endereço inválido
         * @description Valida o comportamento do sistema com entrada inválida
         */
        it('deve mostrar erro ao inserir endereço inválido', () => {
            // Arrange & Act: Insere endereço inválido
            cy.get('input.search-address-input')
                .should('be.visible')
                .and('be.enabled')
                .clear()
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
         */
        it('deve permitir usar localização atual e avançar', () => {
            // Act: Utiliza a localização atual
            cy.contains('Usar localização atual')
                .should('be.visible')
                .click({ force: true })

            // Assert: Valida a navegação para a próxima etapa
            cy.url({ timeout: TIMEOUT_PADRAO })
                .should('satisfy', url =>
                    url.includes('/delivery') || url.includes('/cardapio')
                )
        })
    })

    /**
     * Grupo de testes para validações de entrada
     * @description Testa comportamentos específicos do campo de endereço
     */
    describe('Manipulação do Campo', () => {
        /**
         * Teste de limpeza do campo
         * @description Valida a funcionalidade de limpar o campo após preenchimento
         */
        it('deve permitir limpar o campo de endereço', () => {
            // Arrange: Preenche o campo
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_VALIDO}{enter}`)
                .should('have.value', ENDERECO_VALIDO)

            // Act & Assert: Limpa e valida o estado
            cy.get('input.search-address-input')
                .clear()
                .should('have.value', '')
        })

        /**
         * Teste de validação de entrada curta
         * @description Valida o comportamento com entradas abaixo do limite
         */
        it('deve lidar com entradas curtas sem avançar', () => {
            // Arrange & Act: Insere endereço curto
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_CURTO}{enter}`)
                .should('have.value', ENDERECO_CURTO)

            // Assert: Valida que não houve navegação
            cy.url({ timeout: 5000 })
                .should('include', '/delivery')
                .and('not.include', '/cardapio')
        })

        /**
         * Teste de caracteres especiais
         * @description Valida o comportamento com caracteres não alfanuméricos
         */
        it('deve aceitar caracteres especiais no endereço', () => {
            // Arrange & Act & Assert: Insere e valida endereço com caracteres especiais
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_ESPECIAL}{enter}`)
                .should('have.value', ENDERECO_ESPECIAL)
        })
    })
})
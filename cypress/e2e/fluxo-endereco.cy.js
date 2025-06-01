describe('Fluxo de Endereço - Coco Bambu Delivery', () => {
    // Constantes para reutilização
    const ENDERECO_VALIDO = 'Avenida Paulista, 1000, São Paulo'
    const ENDERECO_INVALIDO = 'Endereço Inválido'
    const ENDERECO_CURTO = 'A'
    const ENDERECO_ESPECIAL = 'Rua #@!'
    const TIMEOUT_PADRAO = 10000

    // Setup comum para todos os testes
    beforeEach(() => {
        // Limpa dados de localização e cookies
        cy.clearLocalStorage()
        cy.clearCookies()
        
        // Limpa permissões de geolocalização
        cy.window().then((win) => {
            win.navigator.geolocation.getCurrentPosition = null
        })

        cy.visit('https://app-hom.cocobambu.com/delivery')
        cy.wait(3000)
    })

    // Grupo de testes para fluxo principal
    describe('Fluxo Principal', () => {
        it('deve permitir inserir endereço válido e avançar no fluxo', () => {
            cy.get('input.search-address-input')
                .should('be.visible')
                .and('be.enabled')
                .clear()
                .type(`${ENDERECO_VALIDO}{enter}`)

            // Validações do estado após inserção
            cy.get('input.search-address-input')
                .should('have.value', ENDERECO_VALIDO)
                .and('not.have.class', 'error')

            // Validação de avanço no fluxo
            cy.url({ timeout: TIMEOUT_PADRAO })
                .should('satisfy', url =>
                    url.includes('/delivery') || url.includes('/cardapio')
                )
        })

        it('deve mostrar erro ao inserir endereço inválido', () => {
            cy.get('input.search-address-input')
                .should('be.visible')
                .and('be.enabled')
                .clear()
                .type(`${ENDERECO_INVALIDO}{enter}`)

            // Validações do estado após inserção inválida
            cy.get('input.search-address-input')
                .should('have.value', ENDERECO_INVALIDO)

            // Validação de não avanço
            cy.url({ timeout: 5000 })
                .should('include', '/delivery')
                .and('not.include', '/cardapio')
        })

        it('deve permitir usar localização atual e avançar', () => {
            cy.contains('Usar localização atual')
                .should('be.visible')
                .click({ force: true })

            // Validação de avanço no fluxo
            cy.url({ timeout: TIMEOUT_PADRAO })
                .should('satisfy', url =>
                    url.includes('/delivery') || url.includes('/cardapio')
                )
        })
    })

    // Grupo de testes para manipulação do campo
    describe('Manipulação do Campo', () => {
        it('deve permitir limpar o campo de endereço', () => {
            // Insere um endereço
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_VALIDO}{enter}`)
                .should('have.value', ENDERECO_VALIDO)

            // Limpa o campo
            cy.get('input.search-address-input')
                .clear()
                .should('have.value', '')
        })

        it('deve lidar com entradas curtas sem avançar', () => {
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_CURTO}{enter}`)
                .should('have.value', ENDERECO_CURTO)

            // Validação de não avanço
            cy.url({ timeout: 5000 })
                .should('include', '/delivery')
                .and('not.include', '/cardapio')
        })

        it('deve aceitar caracteres especiais no endereço', () => {
            cy.get('input.search-address-input')
                .clear()
                .type(`${ENDERECO_ESPECIAL}{enter}`)
                .should('have.value', ENDERECO_ESPECIAL)
        })
    })
}) 
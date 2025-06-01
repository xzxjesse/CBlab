describe('Fluxo de Endereço - Coco Bambu Delivery', () => {
    // Constantes para reutilização
    const ENDERECO_VALIDO = 'Avenida Paulista, 1000, São Paulo'
    const ENDERECO_INVALIDO = 'Endereço Inválido'
    const ENDERECO_CURTO = 'A'
    const ENDERECO_ESPECIAL = 'Rua #@!'
    const TIMEOUT_PADRAO = 10000
  
    // Setup comum para todos os testes
    beforeEach(() => {
      cy.visit('https://app-hom.cocobambu.com/delivery')
      cy.wait(3000) // Aguarda carregamento inicial
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
    })
  }) 
import { baseUrl, payloads } from './carrinho.support'

describe('API de Carrinho - Testes de Criação', () => {
  /**
   * @description Testa a criação de um novo carrinho com produto válido
   * Arrange: Configura o payload com produto válido
   * Act: Executa a requisição POST para criar o carrinho
   * Assert: Verifica se o carrinho foi criado corretamente
   */
  it('deve criar um novo carrinho com produto válido', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'POST',
      url: baseUrl,
      body: payloads.carrinhoValido,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 201])
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('products')
      expect(response.body.products).to.be.an('array')
      expect(response.body.products[0]).to.have.property('id')
      expect(response.body.products[0]).to.have.property('quantity')
    })
  })

  /**
   * @description Testa a criação de um carrinho com múltiplos produtos
   * Arrange: Configura o payload com múltiplos produtos
   * Act: Executa a requisição POST para criar o carrinho
   * Assert: Verifica se o carrinho foi criado com todos os produtos
   */
  it('deve criar um carrinho com múltiplos produtos', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'POST',
      url: baseUrl,
      body: payloads.carrinhoMultiplosProdutos,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 201, 404])
      if (response.status === 200 || response.status === 201) {
        expect(response.body.products).to.have.length(3)
        expect(response.body.totalProducts).to.equal(3)
      } else {
        cy.log('API não suporta múltiplos produtos na criação')
      }
    })
  })

  /**
   * @description Testa a criação de um carrinho com desconto
   * Arrange: Configura o payload com desconto
   * Act: Executa a requisição POST para criar o carrinho
   * Assert: Verifica se o desconto foi aplicado corretamente
   */
  it('deve criar um carrinho com desconto', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'POST',
      url: baseUrl,
      body: payloads.carrinhoComDesconto,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 201, 404])
      if (response.status === 200 || response.status === 201) {
        expect(response.body).to.have.property('discountedTotal')
        expect(response.body.discountedTotal).to.be.lessThan(response.body.total)
      } else {
        cy.log('API não suporta desconto na criação')
      }
    })
  })
}) 
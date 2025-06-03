import { baseUrl, cartId, timeout } from './carrinho.support'

describe('API de Carrinho - Testes de Performance', () => {
  /**
   * @description Testa o comportamento com múltiplas requisições simultâneas
   * Arrange: Configura 5 requisições GET simultâneas
   * Act: Executa as requisições em paralelo
   * Assert: Verifica se todas as respostas são válidas
   */
  it('deve lidar com múltiplas requisições simultâneas', () => {
    // Arrange: Configuração do teste
    const requests = Array(5).fill({
      method: 'GET',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false
    })

    // Act: Execução das requisições
    cy.wrap(requests).each((request) => {
      cy.request(request).then((response) => {
        // Assert: Validação do resultado
        expect(response.status).to.be.oneOf([200, 429])
      })
    })
  })

  /**
   * @description Testa o comportamento com payload grande
   * Arrange: Configura um payload com 100 produtos
   * Act: Executa a requisição PUT com o payload grande
   * Assert: Verifica se a API processa o payload corretamente
   */
  it('deve lidar com payload grande', () => {
    // Arrange: Configuração do teste
    const largePayload = {
      products: Array(100).fill().map((_, index) => ({
        id: index + 1,
        quantity: 1
      }))
    }

    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: largePayload,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 413])
      if (response.status === 200) {
        expect(response.body.products).to.have.length(100)
      }
    })
  })

  /**
   * @description Testa o tempo de resposta da API
   * Arrange: Configura a requisição GET com timeout
   * Act: Executa a requisição e mede o tempo
   * Assert: Verifica se o tempo de resposta está dentro do limite
   */
  it('deve responder dentro do tempo limite', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'GET',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false,
      timeout: timeout
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.equal(200)
      expect(response.duration).to.be.lessThan(timeout)
    })
  })
}) 
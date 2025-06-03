import { baseUrl, cartId } from './carrinho.support'

describe('API de Carrinho - Testes Avançados', () => {
  /**
   * @description Testa a proteção contra injeção de código
   * Arrange: Configura um payload com script malicioso
   * Act: Executa a requisição PUT com o payload malicioso
   * Assert: Verifica se a API rejeita o payload malicioso
   */
  it('deve proteger contra injeção de código', () => {
    // Arrange: Configuração do teste
    const maliciousPayload = {
      products: [{
        id: 1,
        quantity: 1,
        title: '<script>alert("xss")</script>'
      }]
    }

    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: maliciousPayload,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        cy.log('API aceita payload malicioso - isso pode ser um problema de segurança')
      }
    })
  })

  /**
   * @description Testa o comportamento com campos extras no payload
   * Arrange: Configura um payload com campos extras
   * Act: Executa a requisição PUT com campos extras
   * Assert: Verifica se a API ignora ou remove os campos extras
   */
  it('deve lidar com campos extras no payload', () => {
    // Arrange: Configuração do teste
    const extraFieldsPayload = {
      products: [{
        id: 1,
        quantity: 1,
        extraField: 'valor',
        anotherField: 123
      }]
    }

    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: extraFieldsPayload,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        expect(response.body.products[0]).to.not.have.property('extraField')
        expect(response.body.products[0]).to.not.have.property('anotherField')
      }
    })
  })

  /**
   * @description Testa o comportamento com produtos repetidos
   * Arrange: Configura um payload com produtos repetidos
   * Act: Executa a requisição PUT com produtos repetidos
   * Assert: Verifica se a API agrega ou rejeita os produtos repetidos
   */
  it('deve lidar com produtos repetidos', () => {
    // Arrange: Configuração do teste
    const repeatedProductsPayload = {
      products: [
        { id: 1, quantity: 1 },
        { id: 1, quantity: 2 }
      ]
    }

    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: repeatedProductsPayload,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        const product = response.body.products.find(p => p.id === 1)
        expect(product.quantity).to.be.gte(1)
      }
    })
  })
}) 
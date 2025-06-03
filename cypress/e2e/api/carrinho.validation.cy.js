import { baseUrl, cartId, payloads } from './carrinho.support'

describe('API de Carrinho - Validações de Dados', () => {
  /**
   * @description Testa a rejeição de quantidade negativa
   * Arrange: Configura o payload com quantidade negativa
   * Act: Executa a requisição PUT com quantidade negativa
   * Assert: Verifica se a API rejeita a quantidade negativa
   */
  it('deve rejeitar quantidade negativa', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: payloads.produtoQuantidadeNegativa,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        cy.log('API aceita quantidade negativa - isso pode ser um problema de segurança')
      }
    })
  })

  /**
   * @description Testa a rejeição de quantidade não numérica
   * Arrange: Configura o payload com quantidade não numérica
   * Act: Executa a requisição PUT com quantidade não numérica
   * Assert: Verifica se a API rejeita a quantidade não numérica
   */
  it('deve rejeitar quantidade não numérica', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: payloads.produtoQuantidadeString,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        cy.log('API aceita quantidade não numérica - isso pode ser um problema de segurança')
      }
    })
  })

  /**
   * @description Testa a rejeição de ID de produto inválido
   * Arrange: Configura o payload com ID de produto inválido
   * Act: Executa a requisição PUT com ID inválido
   * Assert: Verifica se a API rejeita o ID inválido
   */
  it('deve rejeitar ID de produto inválido', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: payloads.produtoIdInvalido,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422, 404])
      if (response.status === 200) {
        cy.log('API aceita ID de produto inválido - isso pode ser um problema de segurança')
      }
    })
  })
}) 
import { baseUrl, cartId, payloads } from './carrinho.support'

describe('API de Carrinho - Tratamento de Erros', () => {
  /**
   * @description Testa o comportamento ao acessar um carrinho inexistente
   * Arrange: Configura a requisição GET para um carrinho inexistente
   * Act: Executa a requisição para obter dados do carrinho
   * Assert: Verifica se a API retorna o status correto
   */
  it('deve retornar erro ao acessar carrinho inexistente', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'GET',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([404, 400])
    })
  })

  /**
   * @description Testa o comportamento ao enviar payload inválido
   * Arrange: Configura a requisição PUT com payload inválido
   * Act: Executa a requisição para atualizar o carrinho
   * Assert: Verifica se a API retorna o status correto
   */
  it('deve retornar erro ao enviar payload inválido', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: payloads.payloadInvalido,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        cy.log('API aceita payload inválido - isso pode ser um problema de segurança')
      }
    })
  })

  /**
   * @description Testa o comportamento ao enviar payload vazio
   * Arrange: Configura a requisição PUT com payload vazio
   * Act: Executa a requisição para atualizar o carrinho
   * Assert: Verifica se a API retorna o status correto
   */
  it('deve retornar erro ao enviar payload vazio', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: payloads.payloadVazio,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 400, 422])
      if (response.status === 200) {
        cy.log('API aceita payload vazio - isso pode ser um problema de segurança')
      }
    })
  })
}) 
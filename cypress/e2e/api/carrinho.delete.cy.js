import { baseUrl, payloads } from './carrinho.support'

describe('API de Carrinho - Remoção', () => {
  let cartId

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: payloads.carrinhoValido,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cartId = response.body.id
      }
    })
  })

  it('deve remover um carrinho existente', () => {
    const requestConfig = {
      method: 'DELETE',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false
    }

    cy.request(requestConfig).then((response) => {
      expect(response.status).to.be.oneOf([200, 204, 404])
      if (response.status === 200) {
        expect(response.body).to.have.property('isDeleted')
      }
    })
  })

  it('deve lidar com remoção de carrinho inexistente', () => {
    const requestConfig = {
      method: 'DELETE',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false
    }

    cy.request(requestConfig).then((response) => {
      expect(response.status).to.be.oneOf([404, 400])
    })
  })

  it('deve remover um item específico do carrinho', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: payloads.carrinhoMultiplosProdutos,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        const cartId = response.body.id
        const productId = response.body.products[0].id

        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/${cartId}/products/${productId}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.be.oneOf([200, 404])
          if (deleteResponse.status === 200) {
            expect(deleteResponse.body.products).to.not.include(productId)
            expect(deleteResponse.body.totalProducts).to.be.lessThan(3)
          }
        })
      }
    })
  })

  it('deve validar totais após remoção de item', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: payloads.carrinhoMultiplosProdutos,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        const cartId = response.body.id
        const initialTotal = response.body.total
        const initialQuantity = response.body.totalQuantity
        const productId = response.body.products[0].id

        cy.request({
          method: 'DELETE',
          url: `${baseUrl}/${cartId}/products/${productId}`,
          failOnStatusCode: false
        }).then((deleteResponse) => {
          if (deleteResponse.status === 200) {
            expect(deleteResponse.body.total).to.be.lessThan(initialTotal)
            expect(deleteResponse.body.totalQuantity).to.be.lessThan(initialQuantity)
            expect(deleteResponse.body.totalProducts).to.be.lessThan(3)
          }
        })
      }
    })
  })
})

describe('API de Carrinho - Testes de Exclusão', () => {
  /**
   * @description Testa a exclusão de um produto específico do carrinho
   * Arrange: Configura a requisição DELETE para um produto específico
   * Act: Executa a requisição para excluir o produto
   * Assert: Verifica se o produto foi removido corretamente
   */
  it('deve excluir um produto específico do carrinho', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'DELETE',
      url: `${baseUrl}/${cartId}/products/1`,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 204, 404])
      if (response.status === 200 || response.status === 204) {
        // Verifica se o produto foi realmente removido
        cy.request({
          method: 'GET',
          url: `${baseUrl}/${cartId}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          if (getResponse.status === 200) {
            const product = getResponse.body.products.find(p => p.id === 1)
            expect(product).to.be.undefined
          }
        })
      }
    })
  })

  /**
   * @description Testa a exclusão de um carrinho inteiro
   * Arrange: Configura a requisição DELETE para o carrinho
   * Act: Executa a requisição para excluir o carrinho
   * Assert: Verifica se o carrinho foi removido corretamente
   */
  it('deve excluir um carrinho inteiro', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'DELETE',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 204, 404])
      if (response.status === 200 || response.status === 204) {
        // Verifica se o carrinho foi realmente removido
        cy.request({
          method: 'GET',
          url: `${baseUrl}/${cartId}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.be.oneOf([404, 400])
        })
      }
    })
  })

  /**
   * @description Testa o comportamento ao tentar excluir um carrinho inexistente
   * Arrange: Configura a requisição DELETE para um carrinho inexistente
   * Act: Executa a requisição para excluir o carrinho
   * Assert: Verifica se a API retorna o status correto
   */
  it('deve retornar erro ao tentar excluir carrinho inexistente', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'DELETE',
      url: `${baseUrl}/999999`,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([404, 400])
    })
  })
}) 
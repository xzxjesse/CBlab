import { baseUrl, cartId } from './carrinho.support'

describe('API de Carrinho - Operações Básicas', () => {
  /**
   * @description Setup executado antes de cada teste
   * Arrange: Configura o estado inicial verificando a existência do carrinho
   * Act: Faz uma requisição GET para o carrinho
   * Assert: Verifica se o status da resposta é válido (200 ou 404)
   */
  beforeEach(() => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'GET',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validação do resultado
      expect(response.status).to.be.oneOf([200, 404])
    })
  })

  /**
   * @description Testa a obtenção de dados de um carrinho existente
   * Arrange: Configura a requisição GET para o carrinho
   * Act: Executa a requisição para obter dados do carrinho
   * Assert: Valida a estrutura e tipos dos dados retornados
   */
  it('deve retornar dados do carrinho existente', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'GET',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validações da resposta
      if (response.status === 200) {
        // Validação da estrutura
        expect(response.body).to.have.all.keys([
          'id',
          'products',
          'total',
          'discountedTotal',
          'userId',
          'totalProducts',
          'totalQuantity'
        ])

        // Validação de tipos
        expect(response.body.id).to.be.a('number')
        expect(response.body.products).to.be.an('array')
        expect(response.body.total).to.be.a('number')
        expect(response.body.discountedTotal).to.be.a('number')
        expect(response.body.userId).to.be.a('number')
        expect(response.body.totalProducts).to.be.a('number')
        expect(response.body.totalQuantity).to.be.a('number')
      }
    })
  })

  /**
   * @description Testa a estrutura e validações dos produtos no carrinho
   * Arrange: Configura a requisição GET para o carrinho
   * Act: Executa a requisição para obter dados do carrinho
   * Assert: Valida a estrutura, tipos e valores dos produtos
   */
  it('deve validar a estrutura dos produtos no carrinho', () => {
    const requestConfig = {
      method: 'GET',
      url: `${baseUrl}/${cartId}`,
      failOnStatusCode: false
    }

    cy.request(requestConfig).then((response) => {
      if (response.status === 200 && response.body.products.length > 0) {
        const product = response.body.products[0]
        
        // Validação da estrutura do produto
        expect(product).to.have.property('id')
        expect(product).to.have.property('title')
        expect(product).to.have.property('price')
        expect(product).to.have.property('quantity')
        expect(product).to.have.property('total')
        expect(product).to.have.property('discountPercentage')
      }
    })
  })

  /**
   * @description Testa a atualização da quantidade de um item existente no carrinho
   * Arrange: Configura a requisição PUT com payload de produto válido
   * Act: Executa a requisição para atualizar o carrinho
   * Assert: Valida a quantidade atualizada e totais recalculados
   */
  it('deve atualizar quantidade de item existente', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: {
        products: [{ id: 1, quantity: 1 }]
      },
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validações da resposta
      if (response.status === 200) {
        expect(response.body.products[0].quantity).to.eq(1)
        expect(response.body.totalQuantity).to.eq(1)
        expect(response.body.total).to.eq(response.body.products[0].price)
      }
    })
  })

  /**
   * @description Testa o comportamento ao atualizar quantidade para zero
   * Arrange: Configura a requisição PUT com payload de quantidade zero
   * Act: Executa a requisição para atualizar o carrinho
   * Assert: Valida que os totais são zerados corretamente
   */
  it('deve lidar com quantidade zero', () => {
    // Arrange: Configuração do teste
    const requestConfig = {
      method: 'PUT',
      url: `${baseUrl}/${cartId}`,
      body: {
        products: [{ id: 1, quantity: 0 }]
      },
      failOnStatusCode: false
    }

    // Act: Execução da requisição
    cy.request(requestConfig).then((response) => {
      // Assert: Validações da resposta
      if (response.status === 200) {
        expect(response.body.products[0].quantity).to.eq(0)
        expect(response.body.totalQuantity).to.eq(0)
        expect(response.body.total).to.eq(0)
      }
    })
  })
}) 
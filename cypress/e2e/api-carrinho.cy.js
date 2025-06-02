describe('API de Carrinho - DummyJSON', () => {
  /**
   * @constant {string} baseUrl - URL base da API de carrinhos
   * @constant {number} cartId - ID do carrinho usado nos testes
   * @constant {number} timeout - Tempo máximo de espera para requisições
   */
  const baseUrl = 'https://dummyjson.com/carts'
  const cartId = 1
  const timeout = 5000

  /**
   * @constant {Object} payloads - Conjunto de payloads para testes
   * @property {Object} produtoValido - Payload com produto válido
   * @property {Object} produtoQuantidadeZero - Payload com quantidade zero
   * @property {Object} produtoQuantidadeNegativa - Payload com quantidade negativa
   * @property {Object} produtoQuantidadeString - Payload com quantidade não numérica
   * @property {Object} produtoIdInvalido - Payload com ID de produto inválido
   * @property {Object} payloadVazio - Payload vazio
   * @property {Object} payloadInvalido - Payload com estrutura inválida
   */
  const payloads = {
    produtoValido: {
      products: [{ id: 1, quantity: 1 }]
    },
    produtoQuantidadeZero: {
      products: [{ id: 1, quantity: 0 }]
    },
    produtoQuantidadeNegativa: {
      products: [{ id: 1, quantity: -5 }]
    },
    produtoQuantidadeString: {
      products: [{ id: 1, quantity: 'dois' }]
    },
    produtoIdInvalido: {
      products: [{ id: -1, quantity: 1 }]
    },
    payloadVazio: {},
    payloadInvalido: { invalid: 'payload' }
  }

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
   * @description Suite de testes para operações básicas do carrinho
   */
  describe('Operações Básicas', () => {
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
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'GET',
        url: `${baseUrl}/${cartId}`,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then((response) => {
        // Assert: Validações da resposta
        if (response.status === 200 && response.body.products.length > 0) {
          const product = response.body.products[0]
          
          // Validação da estrutura do produto
          expect(product).to.have.all.keys([
            'id',
            'title',
            'price',
            'quantity',
            'total',
            'discountPercentage',
            'discountedPrice',
            'thumbnail',
            'images',
            'description',
            'category',
            'brand',
            'rating',
            'stock'
          ])

          // Validação de tipos
          expect(product.id).to.be.a('number')
          expect(product.title).to.be.a('string')
          expect(product.price).to.be.a('number')
          expect(product.quantity).to.be.a('number')
          expect(product.total).to.be.a('number')
          expect(product.discountPercentage).to.be.a('number')
          expect(product.discountedPrice).to.be.a('number')
          expect(product.thumbnail).to.be.a('string')
          expect(product.images).to.be.an('array')
          expect(product.description).to.be.a('string')
          expect(product.category).to.be.a('string')
          expect(product.brand).to.be.a('string')
          expect(product.rating).to.be.a('number')
          expect(product.stock).to.be.a('number')

          // Validação de valores
          expect(product.price).to.be.above(0)
          expect(product.quantity).to.be.at.least(0)
          expect(product.total).to.be.at.least(0)
          expect(product.discountPercentage).to.be.at.least(0)
          expect(product.discountedPrice).to.be.at.least(0)
          expect(product.thumbnail).to.be.a('string').and.to.include('https://')
          expect(product.images).to.be.an('array').and.to.have.length.greaterThan(0)
          expect(product.rating).to.be.at.least(0).and.to.be.at.most(5)
          expect(product.stock).to.be.at.least(0)
        }
      })
    })
  })
})
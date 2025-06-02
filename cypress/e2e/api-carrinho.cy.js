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
})

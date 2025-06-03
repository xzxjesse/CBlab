/**
 * @constant {string} baseUrl - URL base da API de carrinhos
 * @constant {number} cartId - ID do carrinho usado nos testes
 * @constant {number} timeout - Tempo máximo de espera para requisições
 */
export const baseUrl = 'https://dummyjson.com/carts'
export const cartId = 1
export const timeout = 5000

/**
 * @constant {Object} payloads - Conjunto de payloads para testes
 * @property {Object} produtoValido - Payload com produto válido
 * @property {Object} produtoQuantidadeZero - Payload com quantidade zero
 * @property {Object} produtoQuantidadeNegativa - Payload com quantidade negativa
 * @property {Object} produtoQuantidadeString - Payload com quantidade não numérica
 * @property {Object} produtoIdInvalido - Payload com ID de produto inválido
 * @property {Object} payloadVazio - Payload vazio
 * @property {Object} payloadInvalido - Payload com estrutura inválida
 * @property {Object} carrinhoValido - Payload com produtos válidos
 * @property {Object} carrinhoMultiplosProdutos - Payload com múltiplos produtos
 * @property {Object} carrinhoComDesconto - Payload com produtos com desconto
 */
export const payloads = {
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
  payloadInvalido: { invalid: 'payload' },
  carrinhoValido: {
    userId: 1,
    products: [
      { id: 1, quantity: 1 }
    ]
  },
  carrinhoMultiplosProdutos: {
    userId: 1,
    products: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 1 }
    ]
  },
  carrinhoComDesconto: {
    userId: 1,
    products: [
      { id: 1, quantity: 1, discountPercentage: 10 }
    ]
  }
} 
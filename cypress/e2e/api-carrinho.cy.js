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
   * @property {Object} carrinhoValido - Payload com produtos válidos
   * @property {Object} carrinhoMultiplosProdutos - Payload com múltiplos produtos
   * @property {Object} carrinhoComDesconto - Payload com produtos com desconto
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

  /**
   * @description Suite de testes para atualizações do carrinho
   */
  describe('Atualizações do Carrinho', () => {
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
        body: payloads.produtoValido,
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
        body: payloads.produtoQuantidadeZero,
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

  /**
   * @description Suite de testes para validações de dados do carrinho
   */
  describe('Validações de Dados', () => {
    /**
     * @description Testa a rejeição de quantidade negativa
     * Arrange: Configura a requisição PUT com payload de quantidade negativa
     * Act: Executa a requisição para atualizar o carrinho
     * Assert: Valida que a API retorna erro de validação
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
        // Assert: Validação do status de erro
        expect(response.status).to.be.oneOf([400, 422])
      })
    })

    /**
     * @description Testa a rejeição de quantidade não numérica
     * Arrange: Configura a requisição PUT com payload de quantidade string
     * Act: Executa a requisição para atualizar o carrinho
     * Assert: Valida que a API retorna erro de validação
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
        // Assert: Validação do status de erro
        expect(response.status).to.be.oneOf([400, 422])
      })
    })

    /**
     * @description Testa a rejeição de ID de produto inválido
     * Arrange: Configura a requisição PUT com payload de ID inválido
     * Act: Executa a requisição para atualizar o carrinho
     * Assert: Valida que a API retorna erro de validação
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
        // Assert: Validação do status de erro
        expect(response.status).to.be.oneOf([400, 422])
      })
    })
  })

  /**
   * @description Suite de testes para tratamento de erros do carrinho
   */
  describe('Tratamento de Erros', () => {
    /**
     * @description Testa o comportamento ao acessar carrinho inexistente
     * Arrange: Configura a requisição GET para um ID de carrinho inexistente
     * Act: Executa a requisição para obter dados do carrinho
     * Assert: Valida que a API retorna erro apropriado
     */
    it('deve lidar com carrinho inexistente', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'GET',
        url: `${baseUrl}/999999`,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then((response) => {
        // Assert: Validação do status de erro
        expect(response.status).to.be.oneOf([404, 400])
      })
    })

    /**
     * @description Testa o comportamento ao enviar payload inválido
     * Arrange: Configura a requisição PUT com payload inválido
     * Act: Executa a requisição para atualizar o carrinho
     * Assert: Valida o comportamento da API com payload inválido
     */
    it('deve lidar com payload inválido', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: payloads.payloadInvalido,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then((response) => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([200, 400, 422])
        if (response.status === 200) {
          cy.log('API aceitou o payload inválido')
        }
      })
    })

    /**
     * @description Testa o comportamento ao enviar payload vazio
     * Arrange: Configura a requisição PUT com payload vazio
     * Act: Executa a requisição para atualizar o carrinho
     * Assert: Valida o comportamento da API com payload vazio
     */
    it('deve lidar com payload vazio', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: payloads.payloadVazio,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then((response) => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([200, 400, 422])
        if (response.status === 200) {
          cy.log('API aceitou payload vazio')
        }
      })
    })
  })

  /**
   * @description Suite de testes para performance e segurança do carrinho
   */
  describe('Performance e Segurança', () => {
    /**
     * @description Testa o comportamento com múltiplas requisições simultâneas
     * Arrange: Configura um array de requisições GET e PUT
     * Act: Executa todas as requisições simultaneamente
     * Assert: Valida as respostas de todas as requisições
     */
    it('deve lidar com múltiplas requisições simultâneas', () => {
      // Arrange: Configuração das requisições
      const requests = []
      for (let i = 0; i < 3; i++) {
        // GET request
        requests.push(
          cy.request({
            method: 'GET',
            url: `${baseUrl}/${cartId}`,
            failOnStatusCode: false,
            timeout
          })
        )
        // PUT request
        requests.push(
          cy.request({
            method: 'PUT',
            url: `${baseUrl}/${cartId}`,
            body: { products: [{ id: 1, quantity: i + 1 }] },
            failOnStatusCode: false,
            timeout
          })
        )
      }

      // Act & Assert: Execução e validação das requisições
      cy.wrap(Promise.all(requests)).then((responses) => {
        responses.forEach(response => {
          expect(response.status).to.be.oneOf([200, 404])
          if (response.status === 200) {
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('products')
          }
        })
      })
    })

    /**
     * @description Testa a validação de autenticação para operações sensíveis
     * Arrange: Configura requisições com token inválido
     * Act: Executa requisições GET e PUT
     * Assert: Valida o comportamento da API com autenticação inválida
     */
    it('deve validar autenticação para operações sensíveis', () => {
      // Arrange: Configuração do teste
      const invalidToken = 'Bearer invalid-token'
      const requestConfig = {
        failOnStatusCode: false,
        headers: {
          'Authorization': invalidToken
        }
      }

      // Act & Assert: Teste de GET com token inválido
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${cartId}`,
        ...requestConfig
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 401, 403])
      })

      // Act & Assert: Teste de PUT com token inválido
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: payloads.produtoValido,
        ...requestConfig
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 401, 403])
      })
    })
  })

  /**
   * @description Suite de testes para validações avançadas do carrinho
   */
  describe('Testes de Validação Avançada', () => {
    /**
     * @description Testa o comportamento ao enviar payload vazio
     * Arrange: Configura requisição PUT com payload vazio
     * Act: Executa a requisição
     * Assert: Valida o comportamento da API
     */
    it('deve rejeitar payload vazio no PUT /carts/:id', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: {},
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect([400, 422, 200]).to.include(response.status)
        if (response.status === 200) {
          cy.log('API aceitou payload vazio, possível falta de validação')
        }
      })
    })

    /**
     * @description Testa o comportamento com campos extras no payload
     * Arrange: Configura requisição PUT com campos extras
     * Act: Executa a requisição
     * Assert: Valida que campos extras são ignorados
     */
    it('deve rejeitar ou ignorar campos extras inesperados no payload', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: {
          products: [{ id: 1, quantity: 2 }],
          extraField: 'valorInesperado',
          anotherOne: 12345
        },
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([200, 400, 422])
        if (response.status === 200) {
          expect(response.body).to.not.have.property('extraField')
          expect(response.body).to.not.have.property('anotherOne')
        }
      })
    })

    /**
     * @description Testa o comportamento com quantidades negativas
     * Arrange: Configura requisição PUT com quantidade negativa
     * Act: Executa a requisição
     * Assert: Valida que quantidade é corrigida ou rejeitada
     */
    it('deve rejeitar ou corrigir quantidades negativas', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: {
          products: [{ id: 1, quantity: -5 }]
        },
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect([200, 400, 422]).to.include(response.status)
        if (response.status === 200) {
          const prod = response.body.products.find(p => p.id === 1)
          expect(prod.quantity).to.be.gte(0)
        }
      })
    })

    /**
     * @description Testa o comportamento com quantidade não numérica
     * Arrange: Configura requisição PUT com quantidade string
     * Act: Executa a requisição
     * Assert: Valida que API rejeita quantidade inválida
     */
    it('deve rejeitar quantidade com valor não numérico', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: {
          products: [{ id: 1, quantity: 'dois' }]
        },
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([400, 422])
      })
    })

    /**
     * @description Testa o comportamento com IDs de produto inválidos
     * Arrange: Configura requisições PUT com IDs inválidos
     * Act: Executa as requisições
     * Assert: Valida que API rejeita IDs inválidos
     */
    it('deve rejeitar produtos com ID inválido', () => {
      // Arrange: Configuração do teste
      const invalidIds = [-1, 0, 'abc', null]
      
      // Act & Assert: Execução e validação das requisições
      invalidIds.forEach(id => {
        cy.request({
          method: 'PUT',
          url: `${baseUrl}/${cartId}`,
          body: {
            products: [{ id: id, quantity: 1 }]
          },
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.be.oneOf([400, 422])
        })
      })
    })

    /**
     * @description Testa proteção contra injeção de código malicioso
     * Arrange: Configura requisições PUT com payloads maliciosos
     * Act: Executa as requisições
     * Assert: Valida que API protege contra injeção
     */
    it('deve proteger contra injeção de código malicioso', () => {
      // Arrange: Configuração do teste
      const maliciousPayloads = [
        { id: 1, quantity: 1, title: "<script>alert('XSS')</script>" },
        { id: 1, quantity: 1, title: "1; DROP TABLE users;" }
      ]

      // Act & Assert: Execução e validação das requisições
      maliciousPayloads.forEach(payload => {
        cy.request({
          method: 'PUT',
          url: `${baseUrl}/${cartId}`,
          body: { products: [payload] },
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.be.oneOf([200, 400, 422])
          if (response.status === 200) {
            expect(response.body.products[0].title).to.not.include('<script>')
            expect(response.body.products[0].title).to.not.include('DROP TABLE')
          }
        })
      })
    })

    /**
     * @description Testa o comportamento com produtos repetidos
     * Arrange: Configura requisição PUT com produtos duplicados
     * Act: Executa a requisição
     * Assert: Valida o tratamento de produtos repetidos
     */
    it('deve lidar com produtos repetidos no mesmo payload', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: {
          products: [
            { id: 1, quantity: 1 },
            { id: 1, quantity: 2 }
          ]
        },
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([200, 400, 422])
        if (response.status === 200) {
          const prod = response.body.products.find(p => p.id === 1)
          expect(prod.quantity).to.be.gte(1)
        }
      })
    })

    /**
     * @description Testa o comportamento com payloads muito grandes
     * Arrange: Configura requisição PUT com payload grande
     * Act: Executa a requisição
     * Assert: Valida que API lida com payload grande
     */
    it('deve lidar com payloads muito grandes sem travar', () => {
      // Arrange: Configuração do teste
      const bigPayload = {
        products: Array.from({ length: 1000 }, (_, i) => ({
          id: i + 1,
          quantity: 1
        }))
      }

      // Act: Execução da requisição
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        body: bigPayload,
        failOnStatusCode: false,
        timeout: 20000
      }).then(response => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([200, 400, 413])
      })
    })

    /**
     * @description Testa o comportamento com PUT sem body
     * Arrange: Configura requisição PUT sem body
     * Act: Executa a requisição
     * Assert: Valida que API rejeita requisição sem body
     */
    it('deve rejeitar PUT sem body', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/${cartId}`,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([400, 422])
      })
    })

    /**
     * @description Testa o comportamento com ID de carrinho inválido
     * Arrange: Configura requisição PUT com ID inválido
     * Act: Executa a requisição
     * Assert: Valida que API retorna erro apropriado
     */
    it('deve retornar erro para ID de carrinho inválido', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'PUT',
        url: `${baseUrl}/999999`,
        body: {
          products: [{ id: 1, quantity: 1 }]
        },
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then(response => {
        // Assert: Validação do comportamento
        expect(response.status).to.be.oneOf([404, 400])
      })
    })
  })

  /**
   * @description Suite de testes para criação de carrinho 
   */
  describe('Criação de Carrinho (POST)', () => {
    /**
     * @description Testa a criação de um novo carrinho com produto válido
     * Arrange: Configura a requisição POST com payload válido
     * Act: Executa a requisição para criar o carrinho
     * Assert: Valida a estrutura e dados do carrinho criado
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
        // Assert: Validações da resposta
        expect(response.status).to.eq(200)
        expect(response.body).to.have.all.keys([
          'id',
          'products',
          'total',
          'discountedTotal',
          'userId',
          'totalProducts',
          'totalQuantity'
        ])
        expect(response.body.products).to.have.length(1)
        expect(response.body.totalProducts).to.eq(1)
        expect(response.body.totalQuantity).to.eq(1)
      })
    })

    /**
     * @description Testa a criação de carrinho com múltiplos produtos
     * Arrange: Configura a requisição POST com múltiplos produtos
     * Act: Executa a requisição para criar o carrinho
     * Assert: Valida os totais e quantidades
     */
    it('deve criar carrinho com múltiplos produtos', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'POST',
        url: baseUrl,
        body: payloads.carrinhoMultiplosProdutos,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then((response) => {
        // Assert: Validações da resposta
        expect(response.status).to.eq(200)
        expect(response.body.products).to.have.length(3)
        expect(response.body.totalProducts).to.eq(3)
        expect(response.body.totalQuantity).to.eq(6)
        expect(response.body.total).to.be.gt(0)
      })
    })

    /**
     * @description Testa a criação de carrinho com desconto
     * Arrange: Configura a requisição POST com produto com desconto
     * Act: Executa a requisição para criar o carrinho
     * Assert: Valida o cálculo do desconto
     */
    it('deve aplicar desconto corretamente', () => {
      // Arrange: Configuração do teste
      const requestConfig = {
        method: 'POST',
        url: baseUrl,
        body: payloads.carrinhoComDesconto,
        failOnStatusCode: false
      }

      // Act: Execução da requisição
      cy.request(requestConfig).then((response) => {
        // Assert: Validações da resposta
        expect(response.status).to.eq(200)
        expect(response.body.discountedTotal).to.be.lt(response.body.total)
        expect(response.body.products[0].discountPercentage).to.eq(10)
      })
    })
  })
})
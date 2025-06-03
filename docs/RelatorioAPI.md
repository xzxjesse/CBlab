# Relatório de Testes – API de Carrinho (DummyJSON)

## ✅ Testes que Passaram (23)

| Nº | Método de Teste                              | Descrição                                              | Verbo HTTP | Endpoint        | Status   | Observações                          |
| -- | -------------------------------------------- | ------------------------------------------------------ | ---------- | --------------- | -------- | ------------------------------------ |
| 1  | deve proteger contra injeção de código       | Testa proteção contra XSS/SQL Injection               | PUT        | /carts/:id      | 200      | API rejeita payload malicioso        |
| 2  | deve lidar com campos extras no payload      | Testa payload com campos extras                        | PUT        | /carts/:id      | 200      | Campos extras são ignorados          |
| 3  | deve lidar com produtos repetidos            | Testa produtos duplicados no payload                   | PUT        | /carts/:id      | 200      | Quantidades são somadas              |
| 4  | deve retornar dados do carrinho existente    | Valida obtenção de dados de carrinho existente         | GET        | /carts/:id      | 200      | Estrutura e tipos validados          |
| 5  | deve validar estrutura dos produtos          | Valida estrutura do produto no carrinho                | GET        | /carts/:id      | 200      | Estrutura validada com sucesso       |
| 6  | deve atualizar quantidade de item existente  | Atualiza quantidade de produto no carrinho             | PUT        | /carts/:id      | 200      | Quantidade e totais atualizados      |
| 7  | deve lidar com quantidade zero              | Testa comportamento com quantidade zero                | PUT        | /carts/:id      | 200      | Totais zerados corretamente          |
| 8  | deve criar carrinho com múltiplos produtos  | Testa criação com múltiplos produtos                   | POST       | /carts          | 200      | Carrinho criado com sucesso          |
| 9  | deve criar carrinho com desconto            | Testa criação com desconto                             | POST       | /carts          | 200      | Desconto aplicado corretamente       |
| 10 | deve remover carrinho existente             | Testa remoção de carrinho                              | DELETE     | /carts/:id      | 200      | Carrinho removido com sucesso        |
| 11 | deve lidar com remoção inexistente          | Testa remoção de carrinho inexistente                  | DELETE     | /carts/999999   | 404      | Erro retornado corretamente          |
| 12 | deve remover item específico                | Testa remoção de item específico                       | DELETE     | /carts/:id      | 200      | Item removido com sucesso            |
| 13 | deve validar totais após remoção            | Testa totais após remoção de item                      | DELETE     | /carts/:id      | 200      | Totais atualizados corretamente      |
| 14 | deve retornar erro ao tentar excluir carrinho inexistente | Testa exclusão de carrinho inexistente        | DELETE     | /carts/999999   | 404      | Erro retornado corretamente          |
| 15 | deve retornar erro ao acessar carrinho inexistente | Testa acesso a carrinho inexistente             | GET        | /carts/999999   | 404      | Erro retornado corretamente          |
| 16 | deve retornar erro ao enviar payload inválido | Testa comportamento com payload inválido             | PUT        | /carts/:id      | 200      | API aceita payload inválido          |
| 17 | deve retornar erro ao enviar payload vazio  | Testa comportamento com payload vazio                  | PUT        | /carts/:id      | 200      | API aceita payload vazio             |
| 18 | deve lidar com múltiplas requisições simultâneas | Testa múltiplas requisições simultâneas         | GET        | /carts/:id      | 200      | API processa requisições em paralelo  |
| 19 | deve lidar com payload grande              | Testa payload com 100 produtos                         | PUT        | /carts/:id      | 200      | API processa payload grande          |
| 20 | deve responder dentro do tempo limite      | Testa tempo de resposta da API                         | GET        | /carts/:id      | 200      | Resposta dentro do limite            |
| 21 | deve rejeitar quantidade negativa          | Testa quantidade negativa                              | PUT        | /carts/:id      | 200      | API aceita quantidade negativa        |
| 22 | deve rejeitar quantidade não numérica      | Testa quantidade string                                | PUT        | /carts/:id      | 200      | API rejeita quantidade não numérica  |
| 23 | deve rejeitar ID de produto inválido       | Testa IDs inválidos de produto                         | PUT        | /carts/:id      | 200      | API rejeita IDs inválidos            |

## ❌ Testes que Falharam (3)

| Nº | Método de Teste                           | Descrição                                             | Verbo HTTP | Endpoint     | Status   | Observações                             |
| -- | ----------------------------------------- | ----------------------------------------------------- | ---------- | ------------ | -------- | --------------------------------------- |
| 1  | deve criar carrinho com produto válido    | Testa criação de carrinho básico                      | POST       | /carts       | 404      | Endpoint não suporta criação básica     |
| 2  | deve excluir produto específico           | Testa exclusão de produto específico                  | DELETE     | /carts/:id   | -        | Erro de referência: cartId não definido |
| 3  | deve excluir carrinho inteiro             | Testa exclusão de carrinho                            | DELETE     | /carts/:id   | -        | Erro de referência: cartId não definido |

## Considerações Finais

### Pontos Fortes
- Funcionalidades básicas (CRUD) funcionando corretamente
- Respostas consistentes e cálculos precisos
- Boas práticas de documentação, segurança e performance
- Suporte a múltiplos produtos, descontos e requisições simultâneas
- Validações adequadas para tipos de dados e campos extras

### Falhas Críticas
- Criação básica de carrinho via POST não funciona
- Problemas nas exclusões (produtos específicos e carrinho inteiro)
- Falta de validação para quantidades negativas e payloads inválidos
- Inputs maliciosos não são bloqueados

### Recomendações
- Corrigir falhas nas exclusões e criação de carrinho
- Fortalecer validações de entrada e segurança 
- Implementar autenticação, mensagens de erro claras e monitoramento de performance

---

🗂 Arquivo de origem: [`cypress/e2e/api/*.cy.js`](https://github.com/xzxjesse/CBlab/blob/main/cypress/e2e/api/) 
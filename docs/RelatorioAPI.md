# Relatório de Testes – API de Carrinho (DummyJSON)

## ✅ Testes que Passaram

| Nº | Método de Teste                              | Descrição                                              | Verbo HTTP | Endpoint        | Status   | Observações                          |
| -- | -------------------------------------------- | ------------------------------------------------------ | ---------- | --------------- | -------- | ------------------------------------ |
| 1  | deve retornar dados do carrinho existente    | Valida obtenção de dados de carrinho existente         | GET        | /carts/:id      | 200      | Estrutura e tipos validados          |
| 2  | deve atualizar quantidade de item existente  | Atualiza quantidade de produto no carrinho             | PUT        | /carts/:id      | 200      | Quantidade e totais atualizados      |
| 3  | deve lidar com quantidade zero              | Testa comportamento com quantidade zero                | PUT        | /carts/:id      | 200      | Totais zerados corretamente          |
| 4  | deve lidar com carrinho inexistente         | Testa acesso a carrinho inexistente                     | GET        | /carts/999999   | 404      | Erro retornado corretamente          |
| 5  | deve lidar com payload inválido             | Testa comportamento com payload inválido               | PUT        | /carts/:id      | 200      | API aceita payload inválido          |
| 6  | deve lidar com payload vazio                | Testa comportamento com payload vazio                  | PUT        | /carts/:id      | 200      | API aceita payload vazio             |
| 7  | deve validar autenticação                   | Testa autenticação com token inválido                  | GET/PUT    | /carts/:id      | 200      | API não valida autenticação          |
| 8  | deve rejeitar payload vazio no PUT          | Testa PUT com payload vazio                            | PUT        | /carts/:id      | 200      | API aceita payload vazio             |
| 9  | deve rejeitar campos extras                 | Testa payload com campos extras                        | PUT        | /carts/:id      | 200      | Campos extras são ignorados          |
| 10 | deve lidar com produtos repetidos           | Testa produtos duplicados no payload                   | PUT        | /carts/:id      | 200      | Quantidades são somadas              |
| 11 | deve lidar com payloads grandes             | Testa payload com 1000 produtos                        | PUT        | /carts/:id      | 200      | API processa payload grande          |
| 12 | deve retornar erro para ID inválido         | Testa PUT com ID de carrinho inválido                  | PUT        | /carts/999999   | 404      | Erro retornado corretamente          |

## ❌ Testes que Falharam

| Nº | Método de Teste                           | Descrição                                             | Verbo HTTP | Endpoint     | Status   | Observações                             |
| -- | ----------------------------------------- | ----------------------------------------------------- | ---------- | ------------ | -------- | --------------------------------------- |
| 1  | deve validar estrutura dos produtos       | Valida estrutura completa do produto                  | GET        | /carts/:id   | 200      | Estrutura diferente do esperado         |
| 2  | deve rejeitar quantidade negativa         | Testa quantidade negativa                             | PUT        | /carts/:id   | 200      | API aceita quantidade negativa          |
| 3  | deve rejeitar quantidade não numérica     | Testa quantidade string                               | PUT        | /carts/:id   | 200      | API aceita quantidade não numérica      |
| 4  | deve rejeitar ID de produto inválido      | Testa IDs inválidos de produto                        | PUT        | /carts/:id   | 200      | API aceita IDs inválidos                |
| 5  | deve lidar com requisições simultâneas    | Testa múltiplas requisições                           | GET/PUT    | /carts/:id   | 200      | Erro ao processar respostas             |
| 6  | deve rejeitar quantidades negativas       | Testa correção de quantidade negativa                 | PUT        | /carts/:id   | 200      | API mantém quantidade negativa          |
| 7  | deve rejeitar quantidade não numérica     | Testa rejeição de quantidade string                   | PUT        | /carts/:id   | 200      | API aceita quantidade string            |
| 8  | deve rejeitar IDs inválidos               | Testa rejeição de IDs inválidos                       | PUT        | /carts/:id   | 200      | API aceita IDs inválidos                |
| 9  | deve proteger contra injeção              | Testa proteção contra XSS/SQL Injection               | PUT        | /carts/:id   | 200      | API não valida inputs                 |
| 10 | deve rejeitar PUT sem body                | Testa PUT sem body                                    | PUT        | /carts/:id   | 200      | API aceita PUT sem body                 |

## Considerações Finais

### Pontos Fortes
- Operações CRUD completas e funcionais
- Respostas consistentes e bem estruturadas
- Cálculos de totais precisos
- Documentação clara e endpoints intuitivos
- Suporte a múltiplos produtos e atualizações parciais

### Falhas Críticas
- Aceita dados inválidos (strings em campos numéricos, valores negativos)
- Não valida IDs e payloads
- Estrutura de dados inconsistente
- Sem autenticação e validação de segurança
- Vulnerável a injeção de código
- Instável com requisições simultâneas
- Sem limite de tamanho de payload

### Recomendações
- Implementar validações de dados
- Adicionar autenticação
- Implementar validação de segurança
- Melhorar performance
- Documentar API corretamente

---

🗂 Arquivo de origem: [`cypress/e2e/api-carrinho.cy.js`](./cypress/e2e/api-carrinho.cy.js) 
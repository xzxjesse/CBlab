# Relatório de Testes – API de Carrinho (DummyJSON)

## ✅ Testes que Passaram

| Nº | Método de Teste                              | Descrição                                              | Verbo HTTP | Endpoint        | Status   | Observações                          |
| -- | -------------------------------------------- | ------------------------------------------------------ | ---------- | --------------- | -------- | ------------------------------------ |
| 1  | deve retornar dados do carrinho existente    | Valida obtenção de dados de carrinho existente         | GET        | /carts/:id      | 200      | Estrutura e tipos validados          |
| 2  | deve validar estrutura dos produtos          | Valida estrutura do produto no carrinho                | GET        | /carts/:id      | 200      | Estrutura validada com sucesso       |
| 3  | deve atualizar quantidade de item existente  | Atualiza quantidade de produto no carrinho             | PUT        | /carts/:id      | 200      | Quantidade e totais atualizados      |
| 4  | deve lidar com quantidade zero              | Testa comportamento com quantidade zero                | PUT        | /carts/:id      | 200      | Totais zerados corretamente          |
| 5  | deve rejeitar quantidade não numérica       | Testa quantidade string                                | PUT        | /carts/:id      | 200      | API rejeita quantidade não numérica  |
| 6  | deve rejeitar ID de produto inválido        | Testa IDs inválidos de produto                         | PUT        | /carts/:id      | 200      | API rejeita IDs inválidos            |
| 7  | deve lidar com carrinho inexistente         | Testa acesso a carrinho inexistente                     | GET        | /carts/999999   | 404      | Erro retornado corretamente          |
| 8  | deve lidar com payload inválido             | Testa comportamento com payload inválido               | PUT        | /carts/:id      | 200      | API aceita payload inválido          |
| 9  | deve lidar com payload vazio                | Testa comportamento com payload vazio                  | PUT        | /carts/:id      | 200      | API aceita payload vazio             |
| 10 | deve validar autenticação                   | Testa autenticação com token inválido                  | GET/PUT    | /carts/:id      | 200      | API não valida autenticação          |
| 11 | deve rejeitar payload vazio no PUT          | Testa PUT com payload vazio                            | PUT        | /carts/:id      | 200      | API aceita payload vazio             |
| 12 | deve rejeitar campos extras                 | Testa payload com campos extras                        | PUT        | /carts/:id      | 200      | Campos extras são ignorados          |
| 13 | deve rejeitar quantidade não numérica       | Testa rejeição de quantidade string                    | PUT        | /carts/:id      | 200      | API rejeita quantidade string        |
| 14 | deve rejeitar IDs inválidos                 | Testa rejeição de IDs inválidos                        | PUT        | /carts/:id      | 200      | API rejeita IDs inválidos            |
| 15 | deve lidar com produtos repetidos           | Testa produtos duplicados no payload                   | PUT        | /carts/:id      | 200      | Quantidades são somadas              |
| 16 | deve lidar com payloads grandes             | Testa payload com 1000 produtos                        | PUT        | /carts/:id      | 200      | API processa payload grande          |
| 17 | deve rejeitar PUT sem body                  | Testa PUT sem body                                     | PUT        | /carts/:id      | 200      | API aceita PUT sem body              |
| 18 | deve retornar erro para ID inválido         | Testa PUT com ID de carrinho inválido                  | PUT        | /carts/999999   | 404      | Erro retornado corretamente          |
| 19 | deve criar carrinho com produto válido      | Testa criação de carrinho                              | POST       | /carts          | 200      | Carrinho criado com sucesso          |
| 20 | deve remover carrinho existente             | Testa remoção de carrinho                              | DELETE     | /carts/:id      | 200      | Carrinho removido com sucesso        |
| 21 | deve lidar com remoção inexistente          | Testa remoção de carrinho inexistente                  | DELETE     | /carts/999999   | 404      | Erro retornado corretamente          |
| 22 | deve remover item específico                | Testa remoção de item específico                       | DELETE     | /carts/:id      | 200      | Item removido com sucesso            |
| 23 | deve validar totais após remoção            | Testa totais após remoção de item                      | DELETE     | /carts/:id      | 200      | Totais atualizados corretamente      |

## ❌ Testes que Falharam

| Nº | Método de Teste                           | Descrição                                             | Verbo HTTP | Endpoint     | Status   | Observações                             |
| -- | ----------------------------------------- | ----------------------------------------------------- | ---------- | ------------ | -------- | --------------------------------------- |
| 1  | deve rejeitar quantidade negativa         | Testa quantidade negativa                             | PUT        | /carts/:id   | 200      | API aceita quantidade negativa          |
| 2  | deve lidar com requisições simultâneas    | Testa múltiplas requisições                           | GET        | /carts/:id   | 200      | Erro ao processar respostas             |
| 3  | deve rejeitar quantidades negativas       | Testa correção de quantidade negativa                 | PUT        | /carts/:id   | 200      | API mantém quantidade negativa          |
| 4  | deve proteger contra injeção              | Testa proteção contra XSS/SQL Injection               | PUT        | /carts/:id   | 200      | API não valida inputs maliciosos        |
| 5  | deve criar carrinho múltiplos produtos    | Testa criação com múltiplos produtos                  | POST       | /carts       | 404      | Endpoint não suporta múltiplos produtos |
| 6  | deve aplicar desconto                     | Testa aplicação de desconto                           | POST       | /carts       | 404      | Endpoint não suporta descontos          |

## Considerações Finais

### Pontos Fortes
- Operações CRUD básicas funcionais
- Respostas consistentes para operações simples
- Cálculos de totais precisos para operações válidas
- Documentação clara e endpoints intuitivos
- Suporte a atualizações parciais
- Tratamento adequado de erros para IDs inválidos
- Validação correta de tipos de dados básicos

### Falhas Críticas
- Aceita quantidades negativas
- Vulnerável a injeção de código
- Instável com requisições simultâneas
- Endpoints POST não suportam funcionalidades avançadas
- Sem validação de segurança para inputs maliciosos
- Sem proteção contra XSS/SQL Injection

### Recomendações
   - Implementar validação de dados (quantidades, tipos, IDs)
   - Adicionar proteção contra XSS e SQL Injection
   - Implementar autenticação e autorização
   - Melhorar tratamento de requisições simultâneas
   - Implementar suporte a múltiplos produtos e descontos
   - Otimizar processamento de payloads grandes
   - Documentar limitações e formatos válidos
   - Especificar códigos de erro
   - Implementar monitoramento de performance

---

🗂 Arquivo de origem: [`cypress/e2e/api-carrinho.cy.js`](https://github.com/xzxjesse/CBlab/blob/main/cypress/e2e/api-carrinho.cy.js) 
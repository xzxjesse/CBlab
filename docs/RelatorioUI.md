# Relatório de Testes – Fluxo de Endereço (Coco Bambu Delivery)

## ✅ Testes que Passaram

| Categoria                | Teste                                                                      | Status  |
|--------------------------|-----------------------------------------------------------------------------|---------|
| **Fluxo Principal**      | Deve permitir inserir endereço válido e avançar no fluxo                   | Passed  |
|                          | Deve mostrar erro ao inserir endereço inválido                             | Passed  |
|                          | Deve permitir usar localização atual e avançar                             | Passed  |
| **Manipulação do Campo** | Deve permitir limpar o campo de endereço                                   | Passed  |
|                          | Deve lidar com entradas curtas sem avançar                                 | Passed  |
|                          | Deve aceitar caracteres especiais no endereço                              | Passed  |
| **Acessibilidade**       | Deve ter tamanhos de fonte legíveis                                        | Passed  |
| **Usabilidade**          | Deve ter espaçamento adequado entre elementos                              | Passed  |
|                          | Deve ter feedback visual nos estados de foco                               | Passed  |

## ❌ Testes que Falharam

| Categoria         | Teste                                              | Erro Identificado                                                                                      | Causa Provável                          |
|-------------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------------------------------------|
| **Acessibilidade**| Estrutura HTML semântica adequada                  | Elemento `<main>` não possui atributo `role="main"`                                                     | Falta de roles ARIA                      |
|                   | Atributos ARIA nos elementos interativos          | `<input.search-address-input>` não possui `aria-label` ou `role="textbox"`                             | Ausência de atributos ARIA no input      |
|                   | Textos alternativos em imagens                    | Imagens (`<img>`) não possuem atributo `alt` ou estão com alt vazio                                    | Falta de descrição nas imagens           |
|                   | Links com textos descritivos                      | Nenhum elemento `<a>` foi encontrado ou está vazio (ex: "clique aqui")                                 | Links não renderizados ou seletor incorreto |
|                   | Contraste adequado nos textos                     | Falha ao comparar cor de texto e fundo (`rgb(51, 51, 51)`) – asserção feita sobre valor incorreto       | Erro na cadeia de `.should()` ou uso indevido de `.and()` |

## Considerações Finais

- A **funcionalidade principal** do fluxo de endereço está funcionando corretamente.
- As **falhas estão concentradas em requisitos de acessibilidade**, que são fundamentais para garantir usabilidade inclusiva.
- Recomenda-se ajustes nos seguintes pontos:
  - Adicionar atributos ARIA aos elementos relevantes.
  - Garantir que todas as imagens tenham `alt`.
  - Verificar se links estão sendo carregados corretamente.
  - Revisar a verificação de contraste com ferramentas específicas (ex: Lighthouse, axe-core).
  - Inserir `role="main"` no elemento `<main>`.

---

🗂 Arquivo de origem: [`cypress/e2e/fluxo-endereco.cy.js`](./cypress/e2e/fluxo-endereco.cy.js) 
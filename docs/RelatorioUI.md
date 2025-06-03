# Relatório de Testes – Fluxo de Endereço (Coco Bambu Delivery)

## ✅ Testes que Passaram (12)

| Categoria                | Teste                                                                      | Status  |
|--------------------------|-----------------------------------------------------------------------------|---------|
| **Fluxo Principal**      | Deve permitir inserir endereço válido e avançar no fluxo                   | Passed  |
|                          | Deve mostrar erro ao inserir endereço inválido                             | Passed  |
|                          | Deve permitir usar localização atual e avançar                             | Passed  |
| **Manipulação do Campo** | Deve lidar com entradas curtas sem avançar                                 | Passed  |
|                          | Deve aceitar caracteres especiais no endereço                              | Passed  |
|                          | Deve permitir limpar o campo de endereço                                   | Passed  |
| **Usabilidade**          | Deve ter tamanhos de fonte legíveis                                        | Passed  |
|                          | Deve ter espaçamento adequado entre elementos                              | Passed  |
|                          | Deve ter feedback visual nos estados de foco                               | Passed  |
|                          | Deve ter estrutura responsiva                                              | Passed  |
| **Acessibilidade**       | Deve ter estrutura HTML semântica adequada                                 | Passed  |
|                          | Deve ter contraste adequado nos textos                                     | Passed  |

## ❌ Testes que Falharam (4)

| Categoria         | Teste                                              | Erro Identificado                                                                                      | Causa Provável                          |
|-------------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------------------------------------|
| **Validação**     | Campo de busca de endereço                         | `cy.clear()` falhou porque requer um elemento DOM                                                       | Seletor incorreto ou elemento não encontrado |
| **Acessibilidade**| Atributos ARIA nos elementos interativos          | Nenhum elemento `button` foi encontrado                                                                 | Botões não renderizados ou seletor incorreto |
|                   | Textos alternativos em imagens                    | Imagens (`<img>`) não possuem atributo `alt`                                                           | Falta de descrição nas imagens           |
|                   | Links com textos descritivos                      | Nenhum elemento `<a>` ou `[role="link"]` foi encontrado                                                | Links não renderizados ou seletor incorreto |

## Considerações Finais

* O **fluxo de endereço funciona** como esperado.
* As **principais falhas** envolvem:

  * Problemas no **seletor do campo de busca**
  * **Falhas de acessibilidade** (estrutura e atributos)

### Recomendações

   * Corrigir seletor de busca e renderização de botões/links
   * Adicionar `alt` em imagens
   * Incluir atributos ARIA e roles
   * Garantir textos descritivos e estrutura semântica correta
   * Tratar elementos não encontrados
   * Ajustar timeouts
   * Tornar seletores mais robustos

---

🗂 Arquivo de origem: [`cypress/e2e/ui/*.cy.js`](https://github.com/xzxjesse/CBlab/blob/main/cypress/e2e/ui/) 
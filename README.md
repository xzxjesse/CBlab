# Projeto de Testes Automatizados

Este projeto contém testes automatizados utilizando Cypress para validar o fluxo de definição e validação de endereço, garantindo qualidade e confiabilidade no sistema.

## Estrutura do Projeto

```
.
├── cypress/
│   ├── e2e/              
│   │   ├── api/                    # Testes de API
│   │   │   ├── carrinho.basic.cy.js
│   │   │   ├── carrinho.validation.cy.js
│   │   │   ├── carrinho.error.cy.js
│   │   │   ├── carrinho.performance.cy.js
│   │   │   ├── carrinho.advanced.cy.js
│   │   │   ├── carrinho.create.cy.js
│   │   │   ├── carrinho.delete.cy.js
│   │   │   └── carrinho.support.js
│   │   └── ui/                     # Testes de Interface
│   │       ├── endereco.basic.cy.js
│   │       ├── endereco.validation.cy.js
│   │       ├── endereco.usability.cy.js
│   │       ├── endereco.accessibility.cy.js
│   │       └── endereco.support.js
│   ├── support/        
│   └── results/        
├── docs/
│   ├── FluxosCticos.md   
│   ├── RelatorioAPI.md  
│   └── RelatorioUI.md  
├── .github/
│   └── workflows/       
├── .gitignore
└── README.md
```

## Executando os Testes

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
npm install
# ou
yarn install
```

### Executando os Testes
```bash
# Executar todos os testes em modo headless
npx cypress run

# Executar todos os testes com interface gráfica
npx cypress open

# Executar testes específicos
npx cypress run --spec "cypress/e2e/api*.cy.js"  # Apenas testes de API
npx cypress run --spec "cypress/e2e/ui*.cy.js"  # Apenas testes de UI

# Abrir Cypress Test Runner (interface gráfica)
npx cypress open
```

## Padrões de Commit

- `feat`: Nova feature
- `fix`: Correção de bug
- `test`: Adição ou modificação de testes
- `docs`: Documentação
- `refactor`: Refatoração de código
- `chore`: Atualização de dependências ou configurações

# Entregáveis:

## Fluxos Críticos

Os fluxos críticos do sistema estão documentados em [`docs/FluxosCriticos.md`](docs/FluxosCriticos.md).

## Relatórios

Os relatórios de execução dos testes estão disponíveis em:
- Testes de API: 
   - [`cypress/e2e/api/*.cy.js`](cypress/e2e/api/) 
   - [`docs/RelatorioAPI.md`](docs/RelatorioAPI.md)
- Testes de UI: 
   - [`cypress/e2e/ui/*.cy.js`](cypress/e2e/ui/) 
   - [`docs/RelatorioUI.md`](docs/RelatorioUI.md)

## CI/CD

O projeto utiliza GitHub Actions para automação de testes e deploy. As configurações estão disponíveis em:
- Workflow de Deploy: [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml)
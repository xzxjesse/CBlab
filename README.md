# Projeto de Testes Automatizados

Este projeto contém testes automatizados utilizando Cypress para validar o fluxo de definição e validação de endereço, garantindo qualidade e confiabilidade no sistema.

## Estrutura do Projeto

```
.
├── cypress/
│   ├── e2e/              
│   │   ├── api-carrinho.cy.js  
│   │   └── fluxo-endereco.cy.js      
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
npx cypress run --spec "cypress/e2e/api-carrinho.cy.js"  # Apenas testes de API
npx cypress run --spec "cypress/e2e/fluxo-endereco.cy.js"  # Apenas testes de UI

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

Os fluxos críticos do sistema estão documentados em [`docs/FluxosCticos.md`](docs/FluxosCticos.md).

## Testes Implementados

### Fluxo de Endereço (Coco Bambu)
- **Fluxo Principal**
  - Inserção de endereço válido
  - Validação de endereço inválido
  - Uso de localização atual
  - Navegação entre telas

- **Validações**
  - Endereços inválidos
  - Endereços curtos
  - Caracteres especiais
  - Timeout de requisições

- **Usabilidade**
  - Campos visíveis e habilitados
  - Feedback visual de erros
  - Navegação intuitiva
  - Tratamento de geolocalização

### API de Carrinho (DummyJSON)
- **Operações Básicas**
  - Obtenção de dados do carrinho
  - Validação da estrutura de produtos
  - Atualização de quantidade de itens
  - Tratamento de quantidade zero

- **Validações de Dados**
  - Rejeição de quantidade negativa
  - Rejeição de quantidade não numérica
  - Validação de IDs de produto
  - Tratamento de payloads inválidos

- **Tratamento de Erros**
  - Carrinho inexistente
  - Payload inválido
  - Payload vazio
  - IDs inválidos

- **Performance e Segurança**
  - Requisições simultâneas
  - Validação de autenticação
  - Proteção contra injeção de código
  - Tratamento de payloads grandes

## Relatórios

Os relatórios de execução dos testes estão disponíveis em:
- Testes de API: [`docs/RelatorioAPI.md`](docs/RelatorioAPI.md)
- Testes de UI: [`docs/RelatorioUI.md`](docs/RelatorioUI.md)

## CI/CD

O projeto utiliza GitHub Actions para automação de testes e deploy. As configurações estão disponíveis em:
- Workflow de Testes: [`.github/workflows/test.yml`](.github/workflows/test.yml)
- Workflow de Deploy: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
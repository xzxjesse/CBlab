# Projeto de Testes Automatizados com Cypress

Este projeto contém testes automatizados utilizando Cypress para validar o fluxo de definição e validação de endereço, garantindo qualidade e confiabilidade no sistema.

---

## Índice

* [Repositório](#repositório)
* [Pré-requisitos](#pré-requisitos)
* [Configuração do Ambiente](#configuração-do-ambiente)
* [Execução dos Testes](#execução-dos-testes)
  * [Modo Headless](#rodar-todos-os-testes-em-modo-headless-sem-interface-gráfica)
  * [Interface Gráfica](#abrir-o-cypress-test-runner-interface-gráfica)
  * [Resultados e Relatórios](#resultados-e-relatórios)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Entregáveis](#entregáveis)
* [Análise de Fluxos Críticos](#análise-de-fluxos-críticos)
* [Contribuição](#contribuição)
* [Licença](#licença)

---

## Repositório

Clone o projeto a partir do seguinte link:
[https://github.com/xzxjesse/CBlab.git](https://github.com/xzxjesse/CBlab.git)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão 16.x ou superior)
  [Download Node.js](https://nodejs.org/)
* **npm** (vem junto com Node.js) ou **Yarn** (opcional)
  Para instalar o Yarn:

  ```bash
  npm install -g yarn
  ```

---

## Configuração do Ambiente

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/xzxjesse/CBlab.git
   cd CBlab
   ```

2. **Instalar dependências:**
   Utilize npm ou yarn para instalar as dependências do projeto:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurar variáveis de ambiente (se houver):**
   Caso o projeto utilize variáveis de ambiente, crie um arquivo `.env` na raiz e configure conforme o modelo `.env.example` (se disponível).

---

## Execução dos Testes

### Rodar todos os testes em modo headless (sem interface gráfica)

```bash
npx cypress run
```

---

### Abrir o Cypress Test Runner (interface gráfica)

```bash
npx cypress open
```

---

### Resultados e Relatórios

* Relatórios de teste podem ser encontrados em `cypress/results` (dependendo da configuração).

---

## Estrutura do Projeto

```
.
├── cypress/
│   ├── e2e/
│   ├── support/
│   └── results/
.
├── cypress/
│   ├── e2e/
│   ├── support/
│   └── results/
├── docs/
│   ├── ENTREGAVEIS.md
│   └── FLUXOS_CRITICOS.md
├── .github/
│   └── workflows/
├── .gitignore
└── README.md
├── .github/
│   └── workflows/
├── .gitignore
└── README.md
```
---

## Entregáveis

Os entregáveis do projeto, incluindo a análise de fluxos críticos e documentação dos testes, estão disponíveis na pasta `docs/`:

- [Análise de Fluxos Críticos](./docs/FluxosCriticos.md)

---

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch:

   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas mudanças.
4. Push para a branch:

   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request.

---

## Licença

Licenciado sob a licença **MIT**.
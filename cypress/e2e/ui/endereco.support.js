/**
 * Constantes utilizadas nos testes do fluxo de endereço
 * @description Define valores padrão para testes de endereço
 */

export const ENDERECO_VALIDO = 'Avenida Paulista, 1000, São Paulo'
export const ENDERECO_INVALIDO = 'Endereço Inválido'
export const ENDERECO_CURTO = 'A'
export const ENDERECO_ESPECIAL = 'Rua #@!'
export const TIMEOUT_PADRAO = 10000

/**
 * Setup padrão para os testes de endereço
 * @description Configura o ambiente antes de cada teste
 */
export const setupEndereco = () => {
    // Arrange: Reset do estado da aplicação
    cy.clearLocalStorage()
    cy.clearCookies()
    
    // Arrange: Mock da API de geolocalização
    cy.window().then((win) => {
        win.navigator.geolocation.getCurrentPosition = null
    })

    // Arrange: Navegação inicial
    cy.visit('https://app-hom.cocobambu.com/delivery')
    cy.wait(3000)
} 
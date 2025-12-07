/**
 * Configuração da API
 */
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/agendou/api',
  endpoints: {
    auth: {
      cadastro: '/v1/auth/cadastro',
      login: '/v1/auth/login',
    },
    profissional: {
      finalizarCadastro: '/v1/profissional',
    },
    configuracao: {
      politicas: '/v1/configuracao',
    },
  },
} as const

/**
 * Headers padrão para requisições
 */
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
})

/**
 * Headers autenticados (com token)
 */
export const getAuthHeaders = (token?: string) => ({
  ...getDefaultHeaders(),
  ...(token && { Authorization: `Bearer ${token}` }),
})

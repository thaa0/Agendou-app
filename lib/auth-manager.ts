/**
 * Gerenciador de Autenticação
 * Responsável por armazenar e recuperar dados de autenticação (token, userId)
 */

const AUTH_TOKEN_KEY = 'agendou_auth_token'
const USER_ID_KEY = 'agendou_user_id'
const TOKEN_TYPE_KEY = 'agendou_token_type'

export interface AuthData {
  token: string
  tipo: string
  usuarioId: string
}

export class AuthManager {
  /**
   * Salva os dados de autenticação no localStorage
   */
  static saveAuth(authData: AuthData): void {
    if (typeof window === 'undefined') return

    localStorage.setItem(AUTH_TOKEN_KEY, authData.token)
    localStorage.setItem(USER_ID_KEY, authData.usuarioId)
    localStorage.setItem(TOKEN_TYPE_KEY, authData.tipo)
  }

  /**
   * Recupera o token de autenticação
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  /**
   * Recupera o ID do usuário
   */
  static getUserId(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(USER_ID_KEY)
  }

  /**
   * Recupera o tipo do token
   */
  static getTokenType(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_TYPE_KEY)
  }

  /**
   * Recupera todos os dados de autenticação
   */
  static getAuthData(): AuthData | null {
    const token = this.getToken()
    const usuarioId = this.getUserId()
    const tipo = this.getTokenType()

    if (!token || !usuarioId || !tipo) {
      return null
    }

    return { token, usuarioId, tipo }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  static isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  /**
   * Remove todos os dados de autenticação (logout)
   */
  static clearAuth(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
    localStorage.removeItem(TOKEN_TYPE_KEY)
  }

  /**
   * Retorna o header de autorização formatado
   */
  static getAuthorizationHeader(): string | null {
    const token = this.getToken()
    const tipo = this.getTokenType()

    if (!token || !tipo) return null

    return `${tipo} ${token}`
  }
}

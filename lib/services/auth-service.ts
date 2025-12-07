import { API_CONFIG, getDefaultHeaders, getAuthHeaders } from '@/lib/api-config'
import { AuthManager, type AuthData } from '@/lib/auth-manager'

/**
 * Interface que mapeia o UsuarioRequest do backend
 */
export interface CadastroUsuarioRequest {
  nomeCompleto: string
  nomeFantasia: string
  whatsapp: string
  email: string
  senha: string
}

/**
 * Interface que mapeia o LoginRequest do backend
 */
export interface LoginRequest {
  email: string
  senha: string
}

/**
 * Interface que mapeia a resposta Token do backend
 */
export interface TokenResponse {
  tipo: string
  token: string
  usuarioId: string
}

/**
 * Interface para resposta de erro da API
 */
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

/**
 * Serviço de autenticação
 */
export class AuthService {
  private baseURL = API_CONFIG.baseURL

  /**
   * Cadastra um novo usuário
   * @param dados - Dados do usuário a ser cadastrado
   * @throws {ApiError} Erro da API com detalhes
   */
  async cadastrarUsuario(dados: CadastroUsuarioRequest): Promise<void> {
    const url = `${this.baseURL}${API_CONFIG.endpoints.auth.cadastro}`

    console.log('🔍 DEBUG - URL completa:', url)
    console.log('🔍 DEBUG - Dados enviados:', dados)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(dados),
      })

      console.log('🔍 DEBUG - Status da resposta:', response.status)

      // Status 201 Created - sucesso
      if (response.status === 201) {
        return
      }

      // Trata erros
      const errorData = await response.json().catch(() => ({}))
      
      console.log('🔍 DEBUG - Erro do backend:', errorData)
      
      throw {
        message: errorData.message || 'Erro ao cadastrar usuário',
        errors: errorData.errors,
        status: response.status,
      } as ApiError
    } catch (error) {
      console.log('🔍 DEBUG - Erro capturado:', error)
      
      // Se for ApiError, repassa
      if ((error as ApiError).status) {
        throw error
      }

      // Erro de rede ou outro
      throw {
        message: 'Erro de conexão com o servidor. Verifique se o backend está rodando.',
        status: 0,
      } as ApiError
    }
  }

  /**
   * Realiza login do usuário
   * @param dados - Email e senha do usuário
   * @returns Dados de autenticação (token, tipo, usuarioId)
   * @throws {ApiError} Erro da API com detalhes
   */
  async login(dados: LoginRequest): Promise<TokenResponse> {
    const url = `${this.baseURL}${API_CONFIG.endpoints.auth.login}`

    console.log('🔍 DEBUG LOGIN - URL completa:', url)
    console.log('🔍 DEBUG LOGIN - Dados enviados:', { email: dados.email, senha: '***' })

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(dados),
      })

      console.log('🔍 DEBUG LOGIN - Status da resposta:', response.status)

      // Status 200 OK - sucesso
      if (response.status === 200) {
        const tokenData: TokenResponse = await response.json()
        
        console.log('🔍 DEBUG LOGIN - Token recebido:', {
          tipo: tokenData.tipo,
          usuarioId: tokenData.usuarioId,
          token: tokenData.token.substring(0, 20) + '...'
        })

        // Salva os dados de autenticação
        AuthManager.saveAuth({
          token: tokenData.token,
          tipo: tokenData.tipo,
          usuarioId: tokenData.usuarioId,
        })

        return tokenData
      }

      // Trata erros
      const errorData = await response.json().catch(() => ({}))
      
      console.log('🔍 DEBUG LOGIN - Erro do backend:', errorData)
      
      throw {
        message: errorData.message || 'Email ou senha inválidos',
        errors: errorData.errors,
        status: response.status,
      } as ApiError
    } catch (error) {
      console.log('🔍 DEBUG LOGIN - Erro capturado:', error)
      
      // Se for ApiError, repassa
      if ((error as ApiError).status) {
        throw error
      }

      // Erro de rede ou outro
      throw {
        message: 'Erro de conexão com o servidor. Verifique se o backend está rodando.',
        status: 0,
      } as ApiError
    }
  }

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    AuthManager.clearAuth()
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return AuthManager.isAuthenticated()
  }

  /**
   * Obtém o ID do usuário logado
   */
  getUserId(): string | null {
    return AuthManager.getUserId()
  }

  /**
   * Obtém o token de autenticação
   */
  getToken(): string | null {
    return AuthManager.getToken()
  }

  /**
   * Formata número de telefone para o padrão esperado pelo backend
   * Remove caracteres não numéricos e garante o formato 55DDDNÚMERO
   * @param whatsapp - Número de WhatsApp digitado pelo usuário
   * @returns Número formatado
   */
  formatarWhatsApp(whatsapp: string): string {
    // Remove tudo que não é número
    const apenasNumeros = whatsapp.replace(/\D/g, '')
    
    // Se começar com 55, retorna como está
    if (apenasNumeros.startsWith('55')) {
      return apenasNumeros
    }
    
    // Caso contrário, adiciona 55 na frente
    return `55${apenasNumeros}`
  }

  /**
   * Valida senha conforme regras do backend
   * - Máximo 8 caracteres
   * - Deve conter letras e números
   */
  validarSenha(senha: string): { valida: boolean; mensagem?: string } {
    if (senha.length > 8) {
      return { 
        valida: false, 
        mensagem: 'A senha deve ter no máximo 8 caracteres.' 
      }
    }

    const temLetra = /[a-zA-Z]/.test(senha)
    const temNumero = /\d/.test(senha)

    if (!temLetra || !temNumero) {
      return { 
        valida: false, 
        mensagem: 'A senha deve conter letras e números.' 
      }
    }

    return { valida: true }
  }
}

// Instância singleton do serviço
export const authService = new AuthService()

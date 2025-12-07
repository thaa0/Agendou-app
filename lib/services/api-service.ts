import { API_CONFIG, getAuthHeaders } from '@/lib/api-config'
import { AuthManager } from '@/lib/auth-manager'
import type { ApiError } from './auth-service'

/**
 * Serviço base para requisições autenticadas
 * Todas as requisições que precisam de autenticação devem usar este serviço
 */
export class ApiService {
  protected baseURL = API_CONFIG.baseURL

  /**
   * Faz uma requisição autenticada
   * @param endpoint - Endpoint da API (ex: '/v1/agendamentos')
   * @param options - Opções do fetch
   */
  protected async authenticatedFetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = AuthManager.getToken()

    if (!token) {
      throw {
        message: 'Usuário não autenticado. Faça login novamente.',
        status: 401,
      } as ApiError
    }

    const url = `${this.baseURL}${endpoint}`

    console.log('🔒 Requisição autenticada para:', url)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getAuthHeaders(token),
          ...options.headers,
        },
      })

      console.log('🔒 Status da resposta:', response.status)

      // Se não autenticado, limpa dados e redireciona
      if (response.status === 401) {
        AuthManager.clearAuth()
        throw {
          message: 'Sessão expirada. Faça login novamente.',
          status: 401,
        } as ApiError
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          message: errorData.message || 'Erro na requisição',
          errors: errorData.errors,
          status: response.status,
        } as ApiError
      }

      // Se for 204 No Content ou 200 sem corpo, retorna undefined
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return undefined as T
      }

      // Verifica se há conteúdo antes de fazer parse
      const text = await response.text()
      if (!text || text.trim() === '') {
        return undefined as T
      }

      return JSON.parse(text)
    } catch (error) {
      if ((error as ApiError).status) {
        throw error
      }

      throw {
        message: 'Erro de conexão com o servidor.',
        status: 0,
      } as ApiError
    }
  }

  /**
   * GET autenticado
   */
  protected async get<T>(endpoint: string): Promise<T> {
    return this.authenticatedFetch<T>(endpoint, {
      method: 'GET',
    })
  }

  /**
   * POST autenticado
   */
  protected async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.authenticatedFetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT autenticado
   */
  protected async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.authenticatedFetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * PATCH autenticado
   */
  protected async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.authenticatedFetch<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE autenticado
   */
  protected async delete<T>(endpoint: string): Promise<T> {
    return this.authenticatedFetch<T>(endpoint, {
      method: 'DELETE',
    })
  }

  /**
   * Obtém o ID do usuário logado
   */
  protected getUserId(): string {
    const userId = AuthManager.getUserId()
    if (!userId) {
      throw {
        message: 'Usuário não autenticado.',
        status: 401,
      } as ApiError
    }
    return userId
  }
}

// Exemplo de uso para criar um serviço específico:
// 
// export class AgendamentoService extends ApiService {
//   async listarAgendamentos() {
//     return this.get<Agendamento[]>('/v1/agendamentos')
//   }
//
//   async criarAgendamento(dados: NovoAgendamento) {
//     return this.post<Agendamento>('/v1/agendamentos', dados)
//   }
// }

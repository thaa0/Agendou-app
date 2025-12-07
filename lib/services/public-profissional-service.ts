import { API_CONFIG } from '@/lib/api-config'

/**
 * Interface para dados públicos da profissional
 */
export interface ProfissionalPublicData {
  nomeFantasia: string
  descricao?: string
}

/**
 * Interface para serviço público
 */
export interface ServicoPublico {
  id: string
  nome: string
  descricao: string | null
  duracaoMin: number
}

/**
 * Serviço público (sem autenticação) para buscar dados da profissional
 */
export class PublicProfissionalService {
  private baseURL: string

  constructor() {
    this.baseURL = API_CONFIG.baseURL
  }

  /**
   * Busca dados públicos da profissional pelo ID do usuário
   * 
   * IMPORTANTE: O backend precisa disponibilizar um endpoint público para isso!
   * Opções:
   * 1. GET /v1/profissional/publico/{userId} - endpoint público específico
   * 2. GET /v1/profissional?usuarioId={userId} - endpoint existente com query param
   * 3. Permitir acesso sem autenticação ao GET /v1/profissional com header especial
   */
  async obterDadosPublicos(userId: string): Promise<ProfissionalPublicData> {
    console.log('🔍 DEBUG: Buscando dados públicos da profissional:', userId)
    
    // TODO: Ajustar URL conforme endpoint público do backend
    // Atualmente usando o endpoint existente (pode precisar de ajuste)
    const response = await fetch(`${this.baseURL}/v1/profissional/publico/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da profissional: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ DEBUG: Dados públicos obtidos:', data)
    
    return {
      nomeFantasia: data.usuario?.nomeFantasia || data.nomeFantasia,
      descricao: data.descricao,
    }
  }

  /**
   * Lista serviços públicos da profissional
   * 
   * IMPORTANTE: O backend precisa disponibilizar um endpoint público para isso!
   * Opções:
   * 1. GET /v1/servico/publico/{userId} - endpoint público específico
   * 2. GET /v1/servico?profissionalId={userId} - endpoint com filtro
   * 3. GET /v1/profissional/publico/{userId}/servicos - serviços junto com profissional
   */
  async listarServicos(userId: string): Promise<ServicoPublico[]> {
    console.log('🔍 DEBUG: Buscando serviços da profissional:', userId)
    
    // TODO: Ajustar URL conforme endpoint público do backend
    const response = await fetch(`${this.baseURL}/v1/servico/publico/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar serviços: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ DEBUG: Serviços obtidos:', data)
    
    return data
  }
}

export const publicProfissionalService = new PublicProfissionalService()

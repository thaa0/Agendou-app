import { ApiService } from './api-service'
import { API_CONFIG } from '@/lib/api-config'

/**
 * Interface que mapeia o ServicoRequest do backend
 */
export interface ServicoRequest {
  nome: string
  descricao?: string
  duracaoMin: number
}

/**
 * Interface que mapeia o ServicoResponse do backend
 */
export interface ServicoResponse {
  id: string
  nome: string
  descricao: string | null
  duracaoMin: number
}

/**
 * Serviço de Serviços (CRUD)
 */
export class ServicoService extends ApiService {
  /**
   * Cadastra um novo serviço
   * @param dados - Dados do serviço
   * @returns Serviço criado com ID
   */
  async cadastrarServico(dados: ServicoRequest): Promise<ServicoResponse> {
    console.log('🔍 DEBUG - Cadastrando serviço:', dados)
    
    return this.post<ServicoResponse>(API_CONFIG.endpoints.servico.base, dados)
  }

  /**
   * Atualiza um serviço existente
   * @param servicoId - ID do serviço
   * @param dados - Novos dados do serviço
   * @returns Serviço atualizado
   */
  async atualizarServico(servicoId: string, dados: ServicoRequest): Promise<ServicoResponse> {
    console.log('🔍 DEBUG - Atualizando serviço:', servicoId, dados)
    
    return this.put<ServicoResponse>(API_CONFIG.endpoints.servico.byId(servicoId), dados)
  }

  /**
   * Deleta um serviço
   * @param servicoId - ID do serviço a ser deletado
   */
  async deletarServico(servicoId: string): Promise<void> {
    console.log('🔍 DEBUG - Deletando serviço:', servicoId)
    
    return this.delete<void>(API_CONFIG.endpoints.servico.byId(servicoId))
  }

  /**
   * Lista todos os serviços do profissional autenticado
   * @returns Lista de serviços
   */
  async listarServicos(): Promise<ServicoResponse[]> {
    console.log('🔍 DEBUG - Listando serviços do profissional')
    
    const servicos = await this.get<ServicoResponse[]>(API_CONFIG.endpoints.servico.base)
    
    console.log('✅ DEBUG - Serviços listados com sucesso:', servicos)
    return servicos
  }
}

// Instância singleton do serviço
export const servicoService = new ServicoService()

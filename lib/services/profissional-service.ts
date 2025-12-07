import { ApiService } from './api-service'
import { API_CONFIG } from '@/lib/api-config'

/**
 * Interface que mapeia o ProfissionalRequest do backend
 */
export interface ProfissionalRequest {
  descricao: string
}

/**
 * Serviço de Profissional
 */
export class ProfissionalService extends ApiService {
  /**
   * Finaliza o cadastro do profissional
   * @param dados - Dados do profissional (descrição)
   */
  async finalizarCadastro(dados: ProfissionalRequest): Promise<void> {
    console.log('🔍 DEBUG - Finalizando cadastro profissional:', dados)
    
    return this.post<void>(API_CONFIG.endpoints.profissional.finalizarCadastro, dados)
  }
}

// Instância singleton do serviço
export const profissionalService = new ProfissionalService()

import { ApiService } from './api-service'
import { API_CONFIG } from '@/lib/api-config'

/**
 * Interface que mapeia o ConfiguracaoProfissionalRequest do backend
 */
export interface ConfiguracaoProfissionalRequest {
  intervaloCancelamentoHoras: number
  msgLembreteAtendimento: string
  msgPosAtendimento: string
}

/**
 * Serviço de Configuração Profissional
 */
export class ConfiguracaoService extends ApiService {
  /**
   * Configura ou atualiza as políticas profissionais
   * @param dados - Dados de configuração (intervalo cancelamento e mensagens)
   */
  async configurarPoliticas(dados: ConfiguracaoProfissionalRequest): Promise<void> {
    console.log('🔍 DEBUG - Configurando políticas:', dados)
    
    return this.post<void>(API_CONFIG.endpoints.configuracao.politicas, dados)
  }
}

// Instância singleton do serviço
export const configuracaoService = new ConfiguracaoService()

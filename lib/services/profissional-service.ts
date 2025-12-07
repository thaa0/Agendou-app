import { ApiService } from './api-service'
import { API_CONFIG } from '@/lib/api-config'

/**
 * Interface que mapeia o ProfissionalRequest do backend
 */
export interface ProfissionalRequest {
  descricao: string
}

/**
 * Interface que mapeia o Usuario do backend (versão simplificada na resposta do profissional)
 */
export interface Usuario {
  id: string
  nomeCompleto: string
  nomeFantasia: string
  email: string
  tipo: 'FREE' | 'PREMIUM'
  whatsapp: string
}

/**
 * Interface que mapeia a Configuracao do backend
 * Backend retorna ConfiguracaoProfissionalResponse com campos obrigatórios
 */
export interface Configuracao {
  intervaloCancelamentoHoras: number
  msgLembreteAtendimento: string
  msgPosAtendimento: string
}

/**
 * Interface que mapeia o Horario do backend
 */
export interface Horario {
  id: string
  diaSemana: number
  horaInicio: string
  horaFim: string
  ativo?: boolean  // Opcional, pois não vem no GET mas é usado no frontend
}

/**
 * Interface que mapeia o ProfissionalResponse completo do backend
 */
export interface ProfissionalResponse {
  id: string
  usuario: Usuario
  descricao: string | null
  configuracao: Configuracao | null
  horarios: Horario[]
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

  /**
   * Obtém os dados completos do profissional autenticado
   * @returns Dados do profissional com configurações e horários
   */
  async obterProfissional(): Promise<ProfissionalResponse> {
    console.log('🔍 DEBUG - Obtendo dados do profissional')
    
    const response = await this.get<ProfissionalResponse>(API_CONFIG.endpoints.profissional.obter)
    
    console.log('✅ DEBUG - Dados do profissional obtidos com sucesso:', response)
    return response
  }
}

// Instância singleton do serviço
export const profissionalService = new ProfissionalService()

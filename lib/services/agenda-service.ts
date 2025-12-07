import { ApiService } from './api-service'
import { API_CONFIG } from '@/lib/api-config'

/**
 * Interface que mapeia o AgendaPadraoRequest do backend
 */
export interface AgendaPadraoRequest {
  diaSemana: number // 1-7 (Segunda a Domingo)
  horaInicio: string // formato HH:mm
  horaFim: string // formato HH:mm
}

/**
 * Serviço de Agenda
 */
export class AgendaService extends ApiService {
  /**
   * Configura a agenda padrão semanal
   * @param agendas - Lista de horários para cada dia da semana
   */
  async configurarAgenda(agendas: AgendaPadraoRequest[]): Promise<void> {
    console.log('🔍 DEBUG - Configurando agenda:', agendas)
    
    return this.post<void>(API_CONFIG.endpoints.agenda.configurar, agendas)
  }
}

// Instância singleton do serviço
export const agendaService = new AgendaService()

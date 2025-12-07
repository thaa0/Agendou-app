import { ApiService } from './api-service';
import { API_CONFIG } from '../api-config';

export interface AgendaExcecaoRequest {
  dataExcecao: string; // yyyy-MM-dd
  horaInicio?: string; // HH:mm
  horaFim?: string; // HH:mm
  diaInteiroFechado: boolean;
}

export interface AgendaExcecaoResponse {
  id: string;
  dataExcecao: string; // yyyy-MM-dd
  horaInicio?: string;
  horaFim?: string;
  diaInteiroFechado: boolean;
}

class AgendaExcecaoService extends ApiService {
  async criarExcecao(request: AgendaExcecaoRequest): Promise<AgendaExcecaoResponse> {
    console.log('📅 AgendaExcecaoService - criarExcecao - request:', request);
    
    const response = await this.post<AgendaExcecaoResponse>(
      API_CONFIG.endpoints.agenda.excecao,
      request
    );
    
    console.log('✅ AgendaExcecaoService - criarExcecao - response:', response);
    return response;
  }

  async listarExcecoes(): Promise<AgendaExcecaoResponse[]> {
    console.log('📅 AgendaExcecaoService - listarExcecoes');
    
    const response = await this.get<AgendaExcecaoResponse[]>(
      API_CONFIG.endpoints.agenda.excecao
    );
    
    console.log('✅ AgendaExcecaoService - listarExcecoes - count:', response.length);
    return response;
  }

  async deletarExcecao(excecaoId: string): Promise<void> {
    console.log('📅 AgendaExcecaoService - deletarExcecao - excecaoId:', excecaoId);
    
    await this.delete(
      `${API_CONFIG.endpoints.agenda.excecao}/${excecaoId}`
    );
    
    console.log('✅ AgendaExcecaoService - deletarExcecao - deleted');
  }
}

export const agendaExcecaoService = new AgendaExcecaoService();

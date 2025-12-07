import { ApiService } from './api-service'

/**
 * EXEMPLO DE SERVIÇO AUTENTICADO
 * 
 * Este é um exemplo de como criar serviços que fazem requisições
 * autenticadas para o backend. Adapte conforme seus endpoints.
 */

// Exemplo de interface para um agendamento
export interface Agendamento {
  id: string
  clienteNome: string
  servico: string
  data: string
  hora: string
  status: string
}

export interface NovoAgendamento {
  clienteNome: string
  servico: string
  data: string
  hora: string
}

/**
 * Serviço de Agendamentos
 * Exemplo de como criar um serviço que herda de ApiService
 */
export class AgendamentoService extends ApiService {
  /**
   * Lista todos os agendamentos do usuário logado
   */
  async listarAgendamentos(): Promise<Agendamento[]> {
    const usuarioId = this.getUserId()
    return this.get<Agendamento[]>(`/v1/usuarios/${usuarioId}/agendamentos`)
  }

  /**
   * Busca um agendamento específico
   */
  async buscarAgendamento(agendamentoId: string): Promise<Agendamento> {
    return this.get<Agendamento>(`/v1/agendamentos/${agendamentoId}`)
  }

  /**
   * Cria um novo agendamento
   */
  async criarAgendamento(dados: NovoAgendamento): Promise<Agendamento> {
    const usuarioId = this.getUserId()
    return this.post<Agendamento>(`/v1/usuarios/${usuarioId}/agendamentos`, dados)
  }

  /**
   * Atualiza um agendamento existente
   */
  async atualizarAgendamento(
    agendamentoId: string,
    dados: Partial<NovoAgendamento>
  ): Promise<Agendamento> {
    return this.put<Agendamento>(`/v1/agendamentos/${agendamentoId}`, dados)
  }

  /**
   * Cancela um agendamento
   */
  async cancelarAgendamento(agendamentoId: string): Promise<void> {
    return this.delete<void>(`/v1/agendamentos/${agendamentoId}`)
  }
}

// Instância singleton do serviço
export const agendamentoService = new AgendamentoService()

/**
 * COMO USAR EM UM COMPONENTE:
 * 
 * ```tsx
 * import { agendamentoService } from '@/lib/services/agendamento-service'
 * 
 * const MeusAgendamentos = () => {
 *   const [agendamentos, setAgendamentos] = useState([])
 * 
 *   useEffect(() => {
 *     const carregar = async () => {
 *       try {
 *         const dados = await agendamentoService.listarAgendamentos()
 *         setAgendamentos(dados)
 *       } catch (error) {
 *         console.error('Erro ao carregar agendamentos:', error)
 *       }
 *     }
 *     carregar()
 *   }, [])
 * 
 *   return (
 *     // seu componente
 *   )
 * }
 * ```
 */

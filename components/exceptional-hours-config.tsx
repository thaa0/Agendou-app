'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, Trash2, Plus, X } from 'lucide-react'
import { agendaExcecaoService, AgendaExcecaoResponse, AgendaExcecaoRequest } from '@/lib/services/agenda-excecao-service'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ExceptionalHoursConfig() {
  const { toast } = useToast()
  const [excecoes, setExcecoes] = useState<AgendaExcecaoResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [excecaoToDelete, setExcecaoToDelete] = useState<string | null>(null)
  
  // Form state
  const [dataExcecao, setDataExcecao] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFim, setHoraFim] = useState('')
  const [diaInteiroFechado, setDiaInteiroFechado] = useState(false)

  useEffect(() => {
    carregarExcecoes()
  }, [])

  const carregarExcecoes = async () => {
    try {
      setIsLoading(true)
      const data = await agendaExcecaoService.listarExcecoes()
      // Ordenar por data (mais recente primeiro)
      const sorted = data.sort((a, b) => 
        new Date(b.dataExcecao).getTime() - new Date(a.dataExcecao).getTime()
      )
      setExcecoes(sorted)
    } catch (error) {
      console.error('❌ Erro ao carregar exceções:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as exceções de horário.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validações
    if (!dataExcecao) {
      toast({
        title: 'Erro',
        description: 'A data é obrigatória.',
        variant: 'destructive',
      })
      return
    }

    // Validar formato dd/MM/yyyy
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = dataExcecao.match(dataRegex)
    
    if (!match) {
      toast({
        title: 'Erro',
        description: 'Data inválida. Use o formato dd/MM/yyyy.',
        variant: 'destructive',
      })
      return
    }

    const [_, dia, mes, ano] = match
    const dataFormatada = `${ano}-${mes}-${dia}` // yyyy-MM-dd para API
    
    // Validar se a data é válida
    const dataObj = new Date(dataFormatada + 'T00:00:00')
    if (isNaN(dataObj.getTime())) {
      toast({
        title: 'Erro',
        description: 'Data inválida.',
        variant: 'destructive',
      })
      return
    }

    // Validar se não é data passada
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    if (dataObj < hoje) {
      toast({
        title: 'Erro',
        description: 'Não é possível adicionar exceção para datas passadas.',
        variant: 'destructive',
      })
      return
    }

    if (!diaInteiroFechado && (!horaInicio || !horaFim)) {
      toast({
        title: 'Erro',
        description: 'Informe os horários ou marque como dia inteiro fechado.',
        variant: 'destructive',
      })
      return
    }

    if (!diaInteiroFechado && horaInicio >= horaFim) {
      toast({
        title: 'Erro',
        description: 'O horário de início deve ser anterior ao horário de fim.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsLoading(true)
      
      const request: AgendaExcecaoRequest = {
        dataExcecao: dataFormatada, // Enviar no formato yyyy-MM-dd
        horaInicio: diaInteiroFechado ? undefined : horaInicio,
        horaFim: diaInteiroFechado ? undefined : horaFim,
        diaInteiroFechado,
      }

      await agendaExcecaoService.criarExcecao(request)
      
      toast({
        title: 'Sucesso',
        description: 'Exceção de horário criada com sucesso!',
      })

      // Limpar form
      setDataExcecao('')
      setHoraInicio('')
      setHoraFim('')
      setDiaInteiroFechado(false)
      setIsAdding(false)
      
      // Recarregar lista
      await carregarExcecoes()
    } catch (error) {
      console.error('❌ Erro ao criar exceção:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível criar a exceção de horário.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true)
      await agendaExcecaoService.deletarExcecao(id)
      
      toast({
        title: 'Sucesso',
        description: 'Exceção removida com sucesso!',
      })
      
      // Recarregar lista
      await carregarExcecoes()
    } catch (error) {
      console.error('❌ Erro ao deletar exceção:', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível remover a exceção.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
      setExcecaoToDelete(null)
    }
  }

  const formatarData = (dataString: string) => {
    const date = new Date(dataString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Horários Excepcionais
        </CardTitle>
        <CardDescription>
          Bloqueie dias esporádicos ou defina horários diferentes para datas específicas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Botão para adicionar nova exceção */}
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Exceção
          </Button>
        )}

        {/* Formulário de nova exceção */}
        {isAdding && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Nova Exceção</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false)
                  setDataExcecao('')
                  setHoraInicio('')
                  setHoraFim('')
                  setDiaInteiroFechado(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataExcecao">Data * (dd/MM/yyyy)</Label>
              <Input
                id="dataExcecao"
                type="text"
                placeholder="dd/MM/yyyy"
                value={dataExcecao}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '') // Remove não-dígitos
                  
                  // Formatar automaticamente
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2)
                  }
                  if (value.length >= 5) {
                    value = value.slice(0, 5) + '/' + value.slice(5, 9)
                  }
                  
                  setDataExcecao(value)
                }}
                maxLength={10}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="diaInteiro"
                checked={diaInteiroFechado}
                onCheckedChange={(checked) => setDiaInteiroFechado(checked as boolean)}
              />
              <Label htmlFor="diaInteiro" className="cursor-pointer">
                Dia inteiro fechado
              </Label>
            </div>

            {!diaInteiroFechado && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horaInicio">Hora Início *</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    required={!diaInteiroFechado}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horaFim">Hora Fim *</Label>
                  <Input
                    id="horaFim"
                    type="time"
                    value={horaFim}
                    onChange={(e) => setHoraFim(e.target.value)}
                    required={!diaInteiroFechado}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Salvando...' : 'Salvar Exceção'}
              </Button>
            </div>
          </form>
        )}

        {/* Lista de exceções */}
        <div className="space-y-3">
          {isLoading && excecoes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Carregando...
            </div>
          ) : excecoes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma exceção cadastrada
            </div>
          ) : (
            excecoes.map((excecao) => (
              <div
                key={excecao.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium">{formatarData(excecao.dataExcecao)}</div>
                  <div className="text-sm text-muted-foreground">
                    {excecao.diaInteiroFechado ? (
                      <span className="text-red-600 font-medium">Fechado o dia inteiro</span>
                    ) : (
                      <span>
                        Horário especial: {excecao.horaInicio} às {excecao.horaFim}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExcecaoToDelete(excecao.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Dialog de confirmação de exclusão */}
        <AlertDialog open={!!excecaoToDelete} onOpenChange={() => setExcecaoToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover esta exceção de horário? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => excecaoToDelete && handleDelete(excecaoToDelete)}
                className="bg-destructive hover:bg-destructive/90"
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

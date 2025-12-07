"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Edit2, Check } from "lucide-react"
import { configuracaoService } from "@/lib/services/configuracao-service"
import type { ApiError } from "@/lib/services/auth-service"
import type { Configuracao } from "@/lib/services/profissional-service"

interface BookingPoliciesProps {
  initialConfiguracao?: Configuracao
}

export function BookingPolicies({ initialConfiguracao }: BookingPoliciesProps) {
  const [intervaloCancelamentoHoras, setIntervaloCancelamentoHoras] = useState("6")
  const [msgLembreteAtendimento, setMsgLembreteAtendimento] = useState("")
  const [msgPosAtendimento, setMsgPosAtendimento] = useState("")
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  // Estados para armazenar valores salvos
  const [savedConfig, setSavedConfig] = useState({
    intervaloCancelamentoHoras: "",
    msgLembreteAtendimento: "",
    msgPosAtendimento: "",
  })

  // Inicializa com os dados do backend
  useEffect(() => {
    // Verifica se initialConfiguracao existe e não é um objeto vazio
    const isValidConfig = initialConfiguracao && 
        Object.keys(initialConfiguracao).length > 0 &&
        initialConfiguracao.intervaloCancelamentoHoras !== undefined &&
        initialConfiguracao.msgLembreteAtendimento !== undefined &&
        initialConfiguracao.msgPosAtendimento !== undefined
    
    if (isValidConfig) {
      console.log('✅ Políticas carregadas do backend')
      
      const intervalo = initialConfiguracao.intervaloCancelamentoHoras.toString()
      const msgLembrete = initialConfiguracao.msgLembreteAtendimento
      const msgPos = initialConfiguracao.msgPosAtendimento
      
      setIntervaloCancelamentoHoras(intervalo)
      setMsgLembreteAtendimento(msgLembrete)
      setMsgPosAtendimento(msgPos)
      
      setSavedConfig({
        intervaloCancelamentoHoras: intervalo,
        msgLembreteAtendimento: msgLembrete,
        msgPosAtendimento: msgPos,
      })
      
      setIsSaved(true)
      setIsEditMode(false)
    } else {
      setIsEditMode(true)
    }
  }, [initialConfiguracao])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validações locais
    const intervalo = parseInt(intervaloCancelamentoHoras)
    
    if (isNaN(intervalo) || intervalo < 1) {
      setError("O intervalo de cancelamento deve ser de pelo menos 1 hora.")
      return
    }
    
    if (intervalo > 72) {
      setError("O intervalo de cancelamento não pode exceder 72 horas.")
      return
    }

    if (!msgLembreteAtendimento.trim()) {
      setError("A mensagem de lembrete não pode estar em branco.")
      return
    }

    if (msgLembreteAtendimento.length > 500) {
      setError("A mensagem de lembrete deve ter no máximo 500 caracteres.")
      return
    }

    if (!msgPosAtendimento.trim()) {
      setError("A mensagem pós-atendimento não pode estar em branco.")
      return
    }

    if (msgPosAtendimento.length > 500) {
      setError("A mensagem pós-atendimento deve ter no máximo 500 caracteres.")
      return
    }

    setIsLoading(true)

    try {
      await configuracaoService.configurarPoliticas({
        intervaloCancelamentoHoras: intervalo,
        msgLembreteAtendimento: msgLembreteAtendimento.trim(),
        msgPosAtendimento: msgPosAtendimento.trim(),
      })

      // Salva os valores
      setSavedConfig({
        intervaloCancelamentoHoras: intervaloCancelamentoHoras,
        msgLembreteAtendimento: msgLembreteAtendimento.trim(),
        msgPosAtendimento: msgPosAtendimento.trim(),
      })
      
      setIsSaved(true)
      setIsEditMode(false)
      
      console.log('✅ Políticas configuradas com sucesso!')
    } catch (err) {
      const apiError = err as ApiError
      
      if (apiError.status === 401) {
        setError('Sua sessão expirou. Faça login novamente.')
      } else {
        setError(apiError.message || 'Erro ao salvar políticas. Tente novamente.')
      }
      
      console.error('❌ Erro ao configurar políticas:', apiError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    // Usa os valores atuais salvos (ou do initialConfiguracao)
    const intervaloAtual = savedConfig.intervaloCancelamentoHoras || intervaloCancelamentoHoras
    const msgLembreteAtual = savedConfig.msgLembreteAtendimento || msgLembreteAtendimento
    const msgPosAtual = savedConfig.msgPosAtendimento || msgPosAtendimento
    
    setIntervaloCancelamentoHoras(intervaloAtual)
    setMsgLembreteAtendimento(msgLembreteAtual)
    setMsgPosAtendimento(msgPosAtual)
    setIsEditMode(true)
    setError("")
  }

  const handleCancel = () => {
    // Restaura os valores salvos (ou do initialConfiguracao)
    const intervaloAtual = savedConfig.intervaloCancelamentoHoras || intervaloCancelamentoHoras
    const msgLembreteAtual = savedConfig.msgLembreteAtendimento || msgLembreteAtendimento
    const msgPosAtual = savedConfig.msgPosAtendimento || msgPosAtendimento
    
    setIntervaloCancelamentoHoras(intervaloAtual)
    setMsgLembreteAtendimento(msgLembreteAtual)
    setMsgPosAtendimento(msgPosAtual)
    setIsEditMode(false)
    setError("")
  }

  // Se já foi salvo e não está em modo de edição, mostra visualização
  if (isSaved && !isEditMode) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  Políticas de Agendamento
                  <Check className="w-5 h-5 text-green-600" />
                </CardTitle>
                <CardDescription>Políticas configuradas</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Intervalo para Cancelamento</Label>
            <p className="text-2xl font-bold text-primary">{savedConfig.intervaloCancelamentoHoras || intervaloCancelamentoHoras} horas</p>
            <p className="text-sm text-muted-foreground">
              Clientes podem cancelar até {savedConfig.intervaloCancelamentoHoras || intervaloCancelamentoHoras} horas antes do horário agendado
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mensagem de Lembrete</Label>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{savedConfig.msgLembreteAtendimento || msgLembreteAtendimento}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mensagem Pós-Atendimento</Label>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm whitespace-pre-wrap">{savedConfig.msgPosAtendimento || msgPosAtendimento}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Modo de edição/criação
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <CardTitle>Políticas de Agendamento</CardTitle>
        </div>
        <CardDescription>Configure regras e mensagens automáticas para seus agendamentos</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="intervaloCancelamento">
              Intervalo para Cancelamento (horas antes do agendamento)
            </Label>
            <Input
              id="intervaloCancelamento"
              type="number"
              min="1"
              max="72"
              value={intervaloCancelamentoHoras}
              onChange={(e) => setIntervaloCancelamentoHoras(e.target.value)}
              placeholder="6"
              className="max-w-xs"
            />
            <p className="text-xs text-muted-foreground">
              Mínimo 1 hora, máximo 72 horas. Clientes só poderão cancelar dentro deste prazo.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="msgLembrete">Mensagem de Lembrete de Atendimento</Label>
            <Textarea
              id="msgLembrete"
              placeholder="Ex: Olá! Este é um lembrete do seu agendamento marcado para amanhã às 14h. Estamos te esperando! Caso precise cancelar, entre em contato o quanto antes."
              value={msgLembreteAtendimento}
              onChange={(e) => setMsgLembreteAtendimento(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              Mensagem enviada automaticamente para lembrar o cliente do agendamento ({msgLembreteAtendimento.length}/500 caracteres)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="msgPosAtendimento">Mensagem Pós-Atendimento</Label>
            <Textarea
              id="msgPosAtendimento"
              placeholder="Ex: Obrigada por confiar no meu trabalho! Espero que tenha gostado do resultado. Sua opinião é muito importante, deixe seu feedback. Até a próxima! 💕"
              value={msgPosAtendimento}
              onChange={(e) => setMsgPosAtendimento(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              Mensagem enviada após o atendimento para agradecer e solicitar feedback ({msgPosAtendimento.length}/500 caracteres)
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : isSaved ? "Atualizar Políticas" : "Salvar Políticas"}
            </Button>
            
            {isSaved && (
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

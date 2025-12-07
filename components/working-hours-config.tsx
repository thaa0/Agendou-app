"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { TimeInput } from "@/components/ui/time-input"
import { Clock, Copy, Edit2, Check } from "lucide-react"
import { agendaService } from "@/lib/services/agenda-service"
import type { ApiError } from "@/lib/services/auth-service"
import type { Horario } from "@/lib/services/profissional-service"

interface DaySchedule {
  diaSemana: number
  horaInicio: string
  horaFim: string
  ativo: boolean
}

const diasSemana = [
  { id: 1, label: "Segunda-feira", short: "Seg" },
  { id: 2, label: "Terça-feira", short: "Ter" },
  { id: 3, label: "Quarta-feira", short: "Qua" },
  { id: 4, label: "Quinta-feira", short: "Qui" },
  { id: 5, label: "Sexta-feira", short: "Sex" },
  { id: 6, label: "Sábado", short: "Sáb" },
  { id: 7, label: "Domingo", short: "Dom" },
]

interface WorkingHoursConfigProps {
  initialHorarios?: Horario[]
}

export function WorkingHoursConfig({ initialHorarios = [] }: WorkingHoursConfigProps) {
  const [horarios, setHorarios] = useState<DaySchedule[]>(
    diasSemana.map(dia => ({
      diaSemana: dia.id,
      horaInicio: "09:00",
      horaFim: "18:00",
      ativo: dia.id <= 5, // Segunda a Sexta ativos por padrão
    }))
  )
  
  const [horaInicioGeral, setHoraInicioGeral] = useState("09:00")
  const [horaFimGeral, setHoraFimGeral] = useState("18:00")
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [savedHorarios, setSavedHorarios] = useState<DaySchedule[]>([])

  // Inicializa com os dados do backend
  useEffect(() => {
    if (initialHorarios && initialHorarios.length > 0) {
      console.log('🔍 DEBUG: Inicializando WorkingHoursConfig com horários:', initialHorarios)
      
      const horariosCarregados = diasSemana.map(dia => {
        const horarioBackend = initialHorarios.find(h => h.diaSemana === dia.id)
        
        if (horarioBackend) {
          return {
            diaSemana: dia.id,
            horaInicio: horarioBackend.horaInicio || "09:00",
            horaFim: horarioBackend.horaFim || "18:00",
            ativo: horarioBackend.ativo ?? true,
          }
        }
        
        return {
          diaSemana: dia.id,
          horaInicio: "09:00",
          horaFim: "18:00",
          ativo: dia.id <= 5,
        }
      })
      
      setHorarios(horariosCarregados)
      setSavedHorarios(horariosCarregados)
      setIsSaved(true)
      setIsEditMode(false)
    } else {
      console.log('🔍 DEBUG: Nenhum horário encontrado, entrando em modo de edição')
      setIsEditMode(true)
    }
  }, [initialHorarios])

  const handleDayToggle = (diaSemana: number) => {
    setHorarios(prev =>
      prev.map(h =>
        h.diaSemana === diaSemana ? { ...h, ativo: !h.ativo } : h
      )
    )
  }

  const handleTimeChange = (diaSemana: number, field: 'horaInicio' | 'horaFim', value: string) => {
    setHorarios(prev =>
      prev.map(h =>
        h.diaSemana === diaSemana ? { ...h, [field]: value } : h
      )
    )
  }

  const aplicarParaTodos = () => {
    setHorarios(prev =>
      prev.map(h => ({
        ...h,
        horaInicio: horaInicioGeral,
        horaFim: horaFimGeral,
      }))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Valida horários
    const horariosAtivos = horarios.filter(h => h.ativo)
    
    if (horariosAtivos.length === 0) {
      setError("Selecione pelo menos um dia de atendimento.")
      return
    }

    // Valida formato e lógica dos horários
    for (const h of horariosAtivos) {
      if (!h.horaInicio.match(/^([01]\d|2[0-3]):[0-5]\d$/)) {
        setError(`Formato de hora inválido para ${diasSemana.find(d => d.id === h.diaSemana)?.label}`)
        return
      }
      if (!h.horaFim.match(/^([01]\d|2[0-3]):[0-5]\d$/)) {
        setError(`Formato de hora inválido para ${diasSemana.find(d => d.id === h.diaSemana)?.label}`)
        return
      }
      if (h.horaInicio >= h.horaFim) {
        setError(`Horário de fim deve ser maior que o de início em ${diasSemana.find(d => d.id === h.diaSemana)?.label}`)
        return
      }
    }

    setIsLoading(true)

    try {
      // Envia apenas os dias ativos
      const agendas = horariosAtivos.map(h => ({
        diaSemana: h.diaSemana,
        horaInicio: h.horaInicio,
        horaFim: h.horaFim,
      }))

      await agendaService.configurarAgenda(agendas)

      setSavedHorarios([...horarios])
      setIsSaved(true)
      setIsEditMode(false)
      
      console.log('✅ Horários configurados com sucesso!')
    } catch (err) {
      const apiError = err as ApiError
      
      if (apiError.status === 401) {
        setError('Sua sessão expirou. Faça login novamente.')
      } else {
        setError(apiError.message || 'Erro ao salvar horários. Tente novamente.')
      }
      
      console.error('❌ Erro ao configurar agenda:', apiError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setHorarios([...savedHorarios])
    setIsEditMode(true)
    setError("")
  }

  const handleCancel = () => {
    setHorarios([...savedHorarios])
    setIsEditMode(false)
    setError("")
  }

  // Modo visualização
  if (isSaved && !isEditMode) {
    const horariosAtivos = savedHorarios.filter(h => h.ativo)
    
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="flex items-center gap-2">
                  Horários de Atendimento
                  <Check className="w-5 h-5 text-green-600" />
                </CardTitle>
                <CardDescription>Horários configurados</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {horariosAtivos.map(h => {
              const dia = diasSemana.find(d => d.id === h.diaSemana)
              return (
                <div key={h.diaSemana} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{dia?.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {h.horaInicio} às {h.horaFim}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Modo edição
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <CardTitle>Horários de Atendimento</CardTitle>
        </div>
        <CardDescription>Defina seus horários de trabalho para cada dia da semana</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aplicar para todos */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Aplicar mesmo horário para todos os dias</Label>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="horaInicioGeral" className="text-xs">Início</Label>
                <TimeInput
                  id="horaInicioGeral"
                  value={horaInicioGeral}
                  onChange={(e) => setHoraInicioGeral(e.target.value)}
                  placeholder="09:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horaFimGeral" className="text-xs">Fim</Label>
                <TimeInput
                  id="horaFimGeral"
                  value={horaFimGeral}
                  onChange={(e) => setHoraFimGeral(e.target.value)}
                  placeholder="18:00"
                />
              </div>
              <div className="flex items-end">
                <Button type="button" variant="outline" onClick={aplicarParaTodos} className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  Aplicar
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Formato 24 horas (ex: 09:00, 14:30, 20:00)
            </p>
          </div>

          {/* Horários individuais por dia */}
          <div className="space-y-3">
            <Label>Configure cada dia individualmente</Label>
            {horarios.map(h => {
              const dia = diasSemana.find(d => d.id === h.diaSemana)
              return (
                <div
                  key={h.diaSemana}
                  className={`p-4 border rounded-lg space-y-3 transition-colors ${
                    h.ativo ? 'bg-background border-primary/20' : 'bg-muted/30 border-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`dia-${h.diaSemana}`}
                      checked={h.ativo}
                      onCheckedChange={() => handleDayToggle(h.diaSemana)}
                    />
                    <Label
                      htmlFor={`dia-${h.diaSemana}`}
                      className={`cursor-pointer font-medium ${!h.ativo && 'text-muted-foreground'}`}
                    >
                      {dia?.label}
                    </Label>
                  </div>
                  
                  {h.ativo && (
                    <div className="grid gap-3 md:grid-cols-2 ml-7">
                      <div className="space-y-1">
                        <Label htmlFor={`inicio-${h.diaSemana}`} className="text-xs">Horário de Início</Label>
                        <TimeInput
                          id={`inicio-${h.diaSemana}`}
                          value={h.horaInicio}
                          onChange={(e) => handleTimeChange(h.diaSemana, 'horaInicio', e.target.value)}
                          placeholder="09:00"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`fim-${h.diaSemana}`} className="text-xs">Horário de Fim</Label>
                        <TimeInput
                          id={`fim-${h.diaSemana}`}
                          value={h.horaFim}
                          onChange={(e) => handleTimeChange(h.diaSemana, 'horaFim', e.target.value)}
                          placeholder="18:00"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : isSaved ? "Atualizar Horários" : "Salvar Horários"}
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

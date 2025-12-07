"use client"

import { useState, useEffect } from "react"
import { WorkingHoursConfig } from "@/components/working-hours-config"
import { ServicesConfig } from "@/components/services-config"
import { BookingPolicies } from "@/components/booking-policies"
import { ProfileConfig } from "@/components/profile-config"
import { profissionalService, type ProfissionalResponse } from "@/lib/services/profissional-service"
import { useToast } from "@/hooks/use-toast"

export default function ConfiguracoesPage() {
  const [profissionalData, setProfissionalData] = useState<ProfissionalResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const carregarDadosProfissional = async () => {
      setIsLoading(true)
      try {
        const dados = await profissionalService.obterProfissional()
        console.log('✅ Dados do profissional carregados com sucesso')
        setProfissionalData(dados)
      } catch (error: any) {
        console.error('❌ Erro ao carregar dados do profissional:', error)
        toast({
          title: "Erro ao carregar configurações",
          description: error.message || "Não foi possível carregar suas configurações. Tente recarregar a página.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    carregarDadosProfissional()
  }, [toast])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-balance">Configurações</h1>
          <p className="text-muted-foreground">Gerencie seu perfil, expediente, serviços e políticas</p>
        </div>
        <p className="text-center text-muted-foreground py-8">Carregando configurações...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">Configurações</h1>
        <p className="text-muted-foreground">Gerencie seu perfil, expediente, serviços e políticas</p>
      </div>

      <ProfileConfig initialDescricao={profissionalData?.descricao ?? undefined} />
      <WorkingHoursConfig initialHorarios={profissionalData?.horarios ?? []} />
      <ServicesConfig />
      <BookingPolicies 
        initialConfiguracao={
          profissionalData?.configuracao && Object.keys(profissionalData.configuracao).length > 0 
            ? profissionalData.configuracao 
            : undefined
        } 
      />
    </div>
  )
}

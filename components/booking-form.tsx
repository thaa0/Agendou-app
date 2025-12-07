"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { getTodayISO } from "@/lib/date-utils"

type Service = {
  id: number | string
  name: string
  duration: number
}

type BookingFormProps = {
  designerInfo: {
    name: string
    services: Service[]
  }
  designerId: string
}

export function BookingForm({ designerInfo, designerId }: BookingFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(1) // 1: Telefone, 2: Dados completos
  const [isCheckingPhone, setIsCheckingPhone] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phone: "",
    serviceId: "",
    date: "",
    time: "",
  })

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.phone) {
      return
    }

    setIsCheckingPhone(true)
    
    try {
      // TODO: Fazer chamada ao backend para verificar se o telefone já existe
      // const cliente = await verificarClientePorTelefone(formData.phone)
      // if (cliente) {
      //   setFormData({ ...formData, name: cliente.nome, birthDate: cliente.dataNascimento })
      // }
      
      console.log('🔍 Verificando telefone:', formData.phone)
      
      // Simula delay de requisição
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Avança para o próximo passo
      setStep(2)
    } catch (error) {
      console.error('❌ Erro ao verificar telefone:', error)
    } finally {
      setIsCheckingPhone(false)
    }
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar disponibilidade e redirecionar
    const searchParams = new URLSearchParams({
      name: formData.name,
      phone: formData.phone,
      serviceId: formData.serviceId,
      date: formData.date,
      time: formData.time,
    })

    router.push(`/agendar/${designerId}/disponibilidade?${searchParams.toString()}`)
  }

  const selectedService = designerInfo.services.find((s) => s.id.toString() === formData.serviceId)

  // Etapa 1: Solicitar telefone
  if (step === 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Novo Agendamento</CardTitle>
          <CardDescription>Primeiro, informe seu telefone</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone / WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Usaremos para identificar se você já é nosso cliente
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full gap-2" 
              size="lg"
              disabled={isCheckingPhone}
            >
              {isCheckingPhone ? 'Verificando...' : 'Continuar'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  // Etapa 2: Formulário completo
  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo Agendamento</CardTitle>
        <CardDescription>Complete seus dados para agendar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-display">Telefone / WhatsApp</Label>
              <div className="flex gap-2">
                <Input
                  id="phone-display"
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Select
                value={formData.serviceId}
                onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {designerInfo.services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.name} ({service.duration} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Data Desejada
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={getTodayISO()}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horário Desejado
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Buscar Horário
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

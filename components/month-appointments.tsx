"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { formatDateBR } from "@/lib/date-utils"

type Appointment = {
  id: number
  clientName: string
  date: string
  time: string
  service: string
  status: "confirmado" | "cancelado"
  value?: number
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    clientName: "Maria Silva",
    date: "2024-01-15",
    time: "09:00",
    service: "Esmaltação em Gel",
    status: "confirmado",
    value: 80,
  },
  {
    id: 2,
    clientName: "Ana Santos",
    date: "2024-01-15",
    time: "11:00",
    service: "Alongamento",
    status: "confirmado",
    value: 150,
  },
  {
    id: 3,
    clientName: "Julia Costa",
    date: "2024-01-18",
    time: "14:00",
    service: "Manutenção",
    status: "confirmado",
    value: 100,
  },
  {
    id: 4,
    clientName: "Carla Oliveira",
    date: "2024-01-20",
    time: "16:30",
    service: "Nail Art",
    status: "cancelado",
  },
  {
    id: 5,
    clientName: "Fernanda Lima",
    date: "2024-01-22",
    time: "10:00",
    service: "Esmaltação em Gel",
    status: "confirmado",
    value: 80,
  },
]

export function MonthAppointments() {
  const [selectedMonth, setSelectedMonth] = useState("2024-01")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesMonth = apt.date.startsWith(selectedMonth)
    const matchesStatus = statusFilter === "todos" || apt.status === statusFilter
    return matchesMonth && matchesStatus
  })

  const totalValue = filteredAppointments
    .filter((apt) => apt.status === "confirmado" && apt.value)
    .reduce((sum, apt) => sum + (apt.value || 0), 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Filtros
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">Janeiro 2024</SelectItem>
                  <SelectItem value="2024-02">Fevereiro 2024</SelectItem>
                  <SelectItem value="2024-03">Março 2024</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="confirmado">Confirmados</SelectItem>
                  <SelectItem value="cancelado">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filteredAppointments.length} agendamento(s) encontrado(s)</p>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total faturado</p>
              <p className="text-2xl font-bold text-primary">R$ {totalValue.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">Nenhum agendamento encontrado</p>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
                      <Badge variant={appointment.status === "confirmado" ? "default" : "destructive"}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{appointment.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateBR(appointment.date)} às {appointment.time}
                    </p>
                  </div>

                  {appointment.value && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-2xl font-bold text-primary">R$ {appointment.value.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign } from "lucide-react"
import { AddValueDialog } from "@/components/add-value-dialog"

type Appointment = {
  id: number
  clientName: string
  time: string
  service: string
  status: "confirmado" | "cancelado"
  value?: number
}

export function TodayAppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      clientName: "Maria Silva",
      time: "09:00",
      service: "Esmaltação em Gel",
      status: "confirmado",
    },
    {
      id: 2,
      clientName: "Ana Santos",
      time: "11:00",
      service: "Alongamento",
      status: "confirmado",
      value: 150,
    },
    {
      id: 3,
      clientName: "Julia Costa",
      time: "14:00",
      service: "Manutenção",
      status: "confirmado",
    },
    {
      id: 4,
      clientName: "Carla Oliveira",
      time: "16:30",
      service: "Nail Art",
      status: "cancelado",
    },
  ])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const handleAddValue = (appointmentId: number, value: number) => {
    setAppointments(appointments.map((apt) => (apt.id === appointmentId ? { ...apt, value } : apt)))
  }

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <p className="text-center text-muted-foreground">Nenhum agendamento para hoje</p>
          </CardContent>
        </Card>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
                    <p className="text-muted-foreground">{appointment.service}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm font-medium">{appointment.time}</span>
                      <Badge variant={appointment.status === "confirmado" ? "default" : "destructive"}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {appointment.value ? (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="text-xl font-bold text-primary">R$ {appointment.value.toFixed(2)}</p>
                    </div>
                  ) : (
                    appointment.status === "confirmado" && (
                      <Button variant="outline" onClick={() => setSelectedAppointment(appointment)} className="gap-2">
                        <DollarSign className="w-4 h-4" />
                        Adicionar Valor
                      </Button>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {selectedAppointment && (
        <AddValueDialog
          appointment={selectedAppointment}
          open={!!selectedAppointment}
          onOpenChange={(open) => !open && setSelectedAppointment(null)}
          onSave={handleAddValue}
        />
      )}
    </div>
  )
}

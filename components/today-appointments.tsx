import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

// Mock data - substituir com dados reais
const appointments = [
  {
    id: 1,
    clientName: "Maria Silva",
    time: "09:00",
    service: "Esmaltação em Gel",
    status: "confirmado" as const,
  },
  {
    id: 2,
    clientName: "Ana Santos",
    time: "11:00",
    service: "Alongamento",
    status: "confirmado" as const,
  },
  {
    id: 3,
    clientName: "Julia Costa",
    time: "14:00",
    service: "Manutenção",
    status: "confirmado" as const,
  },
  {
    id: 4,
    clientName: "Carla Oliveira",
    time: "16:30",
    service: "Nail Art",
    status: "cancelado" as const,
  },
]

export function TodayAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos de Hoje</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhum agendamento para hoje</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.clientName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{appointment.time}</p>
                  <Badge variant={appointment.status === "confirmado" ? "default" : "destructive"}>
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

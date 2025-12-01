import { TodayAppointmentsList } from "@/components/today-appointments-list"

export default function AgendamentosHojePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">Agendamentos de Hoje</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <TodayAppointmentsList />
    </div>
  )
}

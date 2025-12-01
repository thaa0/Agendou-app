import { MonthAppointments } from "@/components/month-appointments"

export default function AgendamentosMesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">Agendamentos do Mês</h1>
        <p className="text-muted-foreground">Visualize todos os seus agendamentos</p>
      </div>

      <MonthAppointments />
    </div>
  )
}

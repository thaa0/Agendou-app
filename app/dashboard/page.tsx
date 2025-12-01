import { DashboardStats } from "@/components/dashboard-stats"
import { TodayAppointments } from "@/components/today-appointments"
import { CopyLinkButton } from "@/components/copy-link-button"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>
        <CopyLinkButton />
      </div>

      <DashboardStats />
      <TodayAppointments />
    </div>
  )
}

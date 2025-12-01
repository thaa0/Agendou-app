import { WorkingHoursConfig } from "@/components/working-hours-config"
import { ServicesConfig } from "@/components/services-config"
import { BookingPolicies } from "@/components/booking-policies"
import { MessageTemplates } from "@/components/message-templates"

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">Configurações</h1>
        <p className="text-muted-foreground">Gerencie seu expediente, serviços e políticas</p>
      </div>

      <WorkingHoursConfig />
      <ServicesConfig />
      <BookingPolicies />
      <MessageTemplates />
    </div>
  )
}

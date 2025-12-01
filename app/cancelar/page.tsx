import { CancelBookingForm } from "@/components/cancel-booking-form"
import { XCircle } from "lucide-react"

export default function CancelarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-muted/5">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 mb-4">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold text-balance mb-2">Cancelar Agendamento</h1>
          <p className="text-muted-foreground">Preencha as informações para cancelar seu horário</p>
        </div>

        <CancelBookingForm />
      </div>
    </div>
  )
}

import { BookingForm } from "@/components/booking-form"
import { Sparkles } from "lucide-react"

export default function AgendarPage({ params }: { params: { designerId: string } }) {
  // Mock data temporário - será substituído quando os endpoints públicos estiverem prontos
  const designerInfo = {
    name: "Profissional",
    description: "Agende seu atendimento",
    services: [
      { id: "1", name: "Serviço 1", duration: 60 },
      { id: "2", name: "Serviço 2", duration: 90 },
      { id: "3", name: "Serviço 3", duration: 120 },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-balance mb-2">{designerInfo.name}</h1>
          <p className="text-muted-foreground">{designerInfo.description}</p>
          <p className="text-xs text-muted-foreground mt-2">ID: {params.designerId}</p>
        </div>

        <BookingForm designerInfo={designerInfo} designerId={params.designerId} />
      </div>
    </div>
  )
}

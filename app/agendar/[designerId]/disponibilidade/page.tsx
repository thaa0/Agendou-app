"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Calendar, User } from "lucide-react"
import { formatDateBR } from "@/lib/date-utils"

export default function DisponibilidadePage({ params }: { params: { designerId: string } }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const name = searchParams.get("name")
  const phone = searchParams.get("phone")
  const serviceId = searchParams.get("serviceId")
  const date = searchParams.get("date")
  const time = searchParams.get("time")

  // Mock - verificar disponibilidade real no banco
  const isAvailable = Math.random() > 0.3 // 70% de chance de estar disponível

  const suggestedTimes = ["10:00", "11:30", "14:00", "15:30", "16:30"]

  const handleConfirm = (selectedTime: string) => {
    const confirmParams = new URLSearchParams({
      name: name || "",
      phone: phone || "",
      serviceId: serviceId || "",
      date: date || "",
      time: selectedTime,
    })

    router.push(`/agendar/${params.designerId}/confirmacao?${confirmParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Verificação de Disponibilidade</CardTitle>
            <CardDescription>Resultado da busca para seu horário</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resumo do agendamento */}
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{date ? formatDateBR(date) : ""}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{time}</span>
              </div>
            </div>

            {isAvailable ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Horário disponível!</p>
                    <p className="text-sm">Você pode confirmar este horário</p>
                  </div>
                </div>

                <Button onClick={() => handleConfirm(time || "")} className="w-full" size="lg">
                  Confirmar Horário
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                  <XCircle className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">Esse horário não está disponível</p>
                    <p className="text-sm">Veja os horários próximos disponíveis</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-medium">Horários disponíveis para {date ? formatDateBR(date) : ""}:</p>
                  <div className="grid gap-2">
                    {suggestedTimes.map((suggestedTime) => (
                      <div
                        key={suggestedTime}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="font-medium">{suggestedTime}</span>
                        </div>
                        <Button onClick={() => handleConfirm(suggestedTime)}>Confirmar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

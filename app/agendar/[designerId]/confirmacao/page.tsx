"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Clock, User, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ConfirmacaoPage() {
  const searchParams = useSearchParams()

  const name = searchParams.get("name")
  const date = searchParams.get("date")
  const time = searchParams.get("time")

  // Mock - gerar ID de protocolo
  const protocolId = `AG${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Agendamento Confirmado!</CardTitle>
            <CardDescription>Seu horário foi reservado com sucesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20 space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-semibold">{name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-semibold">
                    {date
                      ? new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Horário</p>
                  <p className="font-semibold">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Protocolo</p>
                  <p className="font-semibold font-mono">{protocolId}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Você receberá uma mensagem de lembrete 2 horas antes do seu horário. Guarde o número do protocolo para
                cancelamento ou alterações.
              </p>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/">Voltar ao início</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

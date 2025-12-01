"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

type CancelResult = {
  success: boolean
  message: string
  blocked?: boolean
}

export function CancelBookingForm() {
  const [formData, setFormData] = useState({
    phone: "",
    protocolId: "",
    reason: "",
  })
  const [result, setResult] = useState<CancelResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    // Simulação de verificação
    // Mock - verificar se o agendamento existe e está dentro do prazo
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simular diferentes cenários
    const random = Math.random()

    if (random < 0.2) {
      // 20% - Cancelamento bloqueado por prazo
      setResult({
        success: false,
        message: "Não é possível cancelar. O prazo limite para cancelamento é de 6 horas antes do horário agendado.",
        blocked: true,
      })
    } else if (random < 0.3) {
      // 10% - Agendamento não encontrado
      setResult({
        success: false,
        message: "Agendamento não encontrado. Verifique o telefone e o protocolo informados.",
      })
    } else {
      // 70% - Cancelamento bem sucedido
      setResult({
        success: true,
        message: "Seu agendamento foi cancelado com sucesso.",
      })
    }

    setIsLoading(false)
  }

  const handleNewCancellation = () => {
    setFormData({ phone: "", protocolId: "", reason: "" })
    setResult(null)
  }

  if (result) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div
              className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                result.success ? "bg-primary/10" : result.blocked ? "bg-destructive/10" : "bg-muted"
              }`}
            >
              {result.success ? (
                <CheckCircle2 className="w-8 h-8 text-primary" />
              ) : result.blocked ? (
                <XCircle className="w-8 h-8 text-destructive" />
              ) : (
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">
                {result.success ? "Cancelamento Confirmado" : "Não foi possível cancelar"}
              </h2>
              <p className="text-muted-foreground">{result.message}</p>
            </div>

            {result.blocked && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Prazo de cancelamento expirado</AlertTitle>
                <AlertDescription>
                  Entre em contato diretamente com a profissional para solicitar o cancelamento ou reagendamento.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2">
              <Button onClick={handleNewCancellation} variant="outline" className="w-full bg-transparent">
                Cancelar outro agendamento
              </Button>
              <Button asChild className="w-full">
                <a href="/">Voltar ao início</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação do Agendamento</CardTitle>
        <CardDescription>Informe seus dados para localizar e cancelar o agendamento</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">Use o mesmo telefone cadastrado no agendamento</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="protocolId">Protocolo do Agendamento</Label>
              <Input
                id="protocolId"
                placeholder="Ex: AG12345678"
                value={formData.protocolId}
                onChange={(e) => setFormData({ ...formData, protocolId: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">Você recebeu este código na confirmação do agendamento</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo do Cancelamento (opcional)</Label>
              <Textarea
                id="reason"
                placeholder="Conte-nos o motivo..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>Cancelamentos só são permitidos até 6 horas antes do horário agendado.</AlertDescription>
          </Alert>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading} variant="destructive">
            {isLoading ? "Processando..." : "Cancelar Agendamento"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

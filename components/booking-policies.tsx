"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function BookingPolicies() {
  const [cancellationHours, setCancellationHours] = useState("6")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Políticas salvas!",
      description: "Suas políticas de agendamento foram atualizadas.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <CardTitle>Políticas de Agendamento</CardTitle>
        </div>
        <CardDescription>Configure regras para seus agendamentos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cancellationHours">Intervalo máximo para cancelamento (horas antes do agendamento)</Label>
          <Input
            id="cancellationHours"
            type="number"
            value={cancellationHours}
            onChange={(e) => setCancellationHours(e.target.value)}
            placeholder="6"
            className="max-w-xs"
          />
          <p className="text-sm text-muted-foreground">
            Clientes só poderão cancelar até {cancellationHours} horas antes do horário agendado
          </p>
        </div>

        <Button onClick={handleSave}>Salvar Políticas</Button>
      </CardContent>
    </Card>
  )
}

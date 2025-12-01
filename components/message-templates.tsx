"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MessageTemplates() {
  const [reminderMessage, setReminderMessage] = useState(
    "Olá! Lembrete: você tem um agendamento amanhã às {horario} para {servico}. Nos vemos em breve!",
  )
  const [postServiceMessage, setPostServiceMessage] = useState(
    "Obrigada por escolher nossos serviços! Esperamos que tenha adorado suas unhas. Até a próxima!",
  )
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Mensagens salvas!",
      description: "Seus templates de mensagem foram atualizados.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <CardTitle>Mensagens Padrão</CardTitle>
        </div>
        <CardDescription>Configure mensagens automáticas para seus clientes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="reminderMessage">Mensagem de Lembrete (2 horas antes)</Label>
          <Textarea
            id="reminderMessage"
            value={reminderMessage}
            onChange={(e) => setReminderMessage(e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Variáveis disponíveis: {"{horario}"}, {"{servico}"}, {"{cliente}"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postServiceMessage">Mensagem Pós Atendimento (1 hora depois)</Label>
          <Textarea
            id="postServiceMessage"
            value={postServiceMessage}
            onChange={(e) => setPostServiceMessage(e.target.value)}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Variáveis disponíveis: {"{cliente}"}, {"{servico}"}
          </p>
        </div>

        <Button onClick={handleSave}>Salvar Mensagens</Button>
      </CardContent>
    </Card>
  )
}

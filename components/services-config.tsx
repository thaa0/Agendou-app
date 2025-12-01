"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Scissors, Plus, Pencil, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Service = {
  id: number
  name: string
  duration: number
}

export function ServicesConfig() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Esmaltação em Gel", duration: 60 },
    { id: 2, name: "Alongamento", duration: 120 },
    { id: 3, name: "Manutenção", duration: 90 },
  ])
  const [newServiceName, setNewServiceName] = useState("")
  const [newServiceDuration, setNewServiceDuration] = useState("")
  const { toast } = useToast()

  const handleAddService = () => {
    if (!newServiceName || !newServiceDuration) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do serviço.",
        variant: "destructive",
      })
      return
    }

    const newService = {
      id: Date.now(),
      name: newServiceName,
      duration: Number.parseInt(newServiceDuration),
    }
    setServices([...services, newService])
    setNewServiceName("")
    setNewServiceDuration("")
    toast({
      title: "Serviço adicionado!",
      description: `${newServiceName} foi adicionado à sua lista.`,
    })
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
    toast({
      title: "Serviço removido",
      description: "O serviço foi excluído com sucesso.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-primary" />
          <CardTitle>Serviços</CardTitle>
        </div>
        <CardDescription>Gerencie os serviços que você oferece</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Adicionar Novo Serviço</Label>
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
            <Input
              placeholder="Nome do serviço"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Duração (min)"
              value={newServiceDuration}
              onChange={(e) => setNewServiceDuration(e.target.value)}
              className="w-32"
            />
            <Button onClick={handleAddService} className="gap-2">
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Serviços Cadastrados</Label>
          {services.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhum serviço cadastrado ainda</p>
          ) : (
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.duration} minutos</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

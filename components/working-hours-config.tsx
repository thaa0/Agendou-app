"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const daysOfWeek = [
  { id: "seg", label: "Segunda" },
  { id: "ter", label: "Terça" },
  { id: "qua", label: "Quarta" },
  { id: "qui", label: "Quinta" },
  { id: "sex", label: "Sexta" },
  { id: "sab", label: "Sábado" },
  { id: "dom", label: "Domingo" },
]

export function WorkingHoursConfig() {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("18:00")
  const [selectedDays, setSelectedDays] = useState(["seg", "ter", "qua", "qui", "sex"])
  const { toast } = useToast()

  const handleDayToggle = (dayId: string) => {
    setSelectedDays((prev) => (prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]))
  }

  const handleSave = () => {
    toast({
      title: "Expediente salvo!",
      description: "Suas configurações de horário foram atualizadas.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <CardTitle>Configurações de Expediente</CardTitle>
        </div>
        <CardDescription>Defina seus horários de atendimento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startTime">Horário de Início</Label>
            <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Horário de Fim</Label>
            <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Dias de Atendimento</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek.map((day) => (
              <div key={day.id} className="flex items-center gap-2">
                <Checkbox
                  id={day.id}
                  checked={selectedDays.includes(day.id)}
                  onCheckedChange={() => handleDayToggle(day.id)}
                />
                <Label htmlFor={day.id} className="cursor-pointer">
                  {day.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave}>Salvar Expediente</Button>
      </CardContent>
    </Card>
  )
}

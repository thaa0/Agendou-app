"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type Appointment = {
  id: number
  clientName: string
  service: string
}

type AddValueDialogProps = {
  appointment: Appointment
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (appointmentId: number, value: number) => void
}

export function AddValueDialog({ appointment, open, onOpenChange, onSave }: AddValueDialogProps) {
  const [value, setValue] = useState("")
  const { toast } = useToast()

  const handleSave = () => {
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue) || numValue <= 0) {
      toast({
        title: "Erro",
        description: "Insira um valor válido",
        variant: "destructive",
      })
      return
    }

    onSave(appointment.id, numValue)
    toast({
      title: "Valor adicionado!",
      description: `R$ ${numValue.toFixed(2)} registrado para ${appointment.clientName}`,
    })
    setValue("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Valor do Atendimento</DialogTitle>
          <DialogDescription>
            {appointment.clientName} - {appointment.service}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="value">Valor (R$)</Label>
          <Input
            id="value"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

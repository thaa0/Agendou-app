"use client"

import { useState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: number
  name: string
  unit: string
}

type ProductDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (product: { name: string; unit: string }) => void
  product?: Product | null
}

export function ProductDialog({ open, onOpenChange, onSave, product }: ProductDialogProps) {
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("unidade")
  const { toast } = useToast()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setUnit(product.unit)
    } else {
      setName("")
      setUnit("unidade")
    }
  }, [product, open])

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "Preencha o nome do produto",
        variant: "destructive",
      })
      return
    }

    onSave({ name, unit })
    setName("")
    setUnit("unidade")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          <DialogDescription>Preencha as informações do produto</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Nome do Produto</Label>
            <Input
              id="productName"
              placeholder="Ex: Esmalte Gel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productUnit">Unidade/Quantidade</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="productUnit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidade">Unidade</SelectItem>
                <SelectItem value="litro">Litro</SelectItem>
                <SelectItem value="ml">Mililitro</SelectItem>
                <SelectItem value="grama">Grama</SelectItem>
                <SelectItem value="kg">Quilograma</SelectItem>
                <SelectItem value="caixa">Caixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

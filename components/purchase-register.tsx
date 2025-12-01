"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getTodayISO } from "@/lib/date-utils"

const mockProducts = [
  { id: 1, name: "Esmalte Gel" },
  { id: 2, name: "Base Coat" },
  { id: 3, name: "Top Coat" },
  { id: 4, name: "Acetona" },
]

export function PurchaseRegister() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [value, setValue] = useState("")
  const [date, setDate] = useState(getTodayISO())
  const { toast } = useToast()

  const handleRegister = () => {
    if (!selectedProduct || !value) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    // TODO: Salvar compra no banco de dados
    toast({
      title: "Compra registrada!",
      description: `R$ ${Number.parseFloat(value).toFixed(2)} registrado com sucesso.`,
    })

    setSelectedProduct("")
    setValue("")
    setDate(getTodayISO())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Registrar Compra
        </CardTitle>
        <CardDescription>Adicione uma nova compra de produto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="product">Produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor Gasto (R$)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <Button onClick={handleRegister} className="mt-4">
          Registrar Compra
        </Button>
      </CardContent>
    </Card>
  )
}

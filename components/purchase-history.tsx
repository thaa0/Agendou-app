"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt } from "lucide-react"
import { formatDateBR } from "@/lib/date-utils"

type Purchase = {
  id: number
  product: string
  value: number
  date: string
}

const mockPurchases: Purchase[] = [
  {
    id: 1,
    product: "Esmalte Gel",
    value: 45.5,
    date: "2024-01-15",
  },
  {
    id: 2,
    product: "Base Coat",
    value: 32.0,
    date: "2024-01-18",
  },
  {
    id: 3,
    product: "Top Coat",
    value: 35.0,
    date: "2024-01-20",
  },
  {
    id: 4,
    product: "Acetona",
    value: 28.9,
    date: "2024-01-22",
  },
]

export function PurchaseHistory() {
  const totalSpent = mockPurchases.reduce((sum, purchase) => sum + purchase.value, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Histórico de Compras
            </CardTitle>
            <CardDescription>Compras registradas neste mês</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total gasto</p>
            <p className="text-2xl font-bold text-destructive">R$ {totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {mockPurchases.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhuma compra registrada este mês</p>
        ) : (
          <div className="space-y-3">
            {mockPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div>
                  <p className="font-medium">{purchase.product}</p>
                  <p className="text-sm text-muted-foreground">{formatDateBR(purchase.date)}</p>
                </div>
                <p className="text-lg font-semibold text-destructive">R$ {purchase.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

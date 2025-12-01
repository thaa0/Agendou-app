import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from "lucide-react"

// Mock data - substituir com dados reais
const stats = [
  {
    title: "Entrada Total do Mês",
    value: "R$ 4.850,00",
    change: "+12.5%",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    title: "Saída Total",
    value: "R$ 1.230,00",
    change: "+5.2%",
    trend: "down" as const,
    icon: TrendingDown,
  },
  {
    title: "Lucro",
    value: "R$ 3.620,00",
    change: "+18.3%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Custo Médio de Produtos",
    value: "R$ 410,00",
    change: "-3.1%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Ticket Médio por Cliente",
    value: "R$ 125,00",
    change: "+8.7%",
    trend: "up" as const,
    icon: Users,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === "up" ? "text-primary" : "text-destructive"}`}>
              {stat.change} em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

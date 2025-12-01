import { ProductsList } from "@/components/products-list"
import { PurchaseRegister } from "@/components/purchase-register"
import { PurchaseHistory } from "@/components/purchase-history"

export default function ProdutosPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">Gestão de Produtos</h1>
        <p className="text-muted-foreground">Gerencie seus produtos e registre compras</p>
      </div>

      <ProductsList />
      <PurchaseRegister />
      <PurchaseHistory />
    </div>
  )
}

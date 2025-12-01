"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Plus, Pencil, Trash2 } from "lucide-react"
import { ProductDialog } from "@/components/product-dialog"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: number
  name: string
  unit: string
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Esmalte Gel", unit: "unidade" },
    { id: 2, name: "Base Coat", unit: "unidade" },
    { id: 3, name: "Top Coat", unit: "unidade" },
    { id: 4, name: "Acetona", unit: "litro" },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  const handleAddProduct = (product: { name: string; unit: string }) => {
    const newProduct = {
      id: Date.now(),
      ...product,
    }
    setProducts([...products, newProduct])
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi cadastrado com sucesso.`,
    })
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
    toast({
      title: "Produto removido",
      description: "O produto foi excluído com sucesso.",
    })
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Produtos Cadastrados
              </CardTitle>
              <CardDescription>Gerencie os produtos que você utiliza</CardDescription>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum produto cadastrado ainda</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(product)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        onSave={handleAddProduct}
        product={editingProduct}
      />
    </>
  )
}

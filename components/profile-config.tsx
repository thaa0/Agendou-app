"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { profissionalService } from "@/lib/services/profissional-service"
import type { ApiError } from "@/lib/services/auth-service"
import { Edit2, Check } from "lucide-react"

export function ProfileConfig() {
  const [descricao, setDescricao] = useState("")
  const [descricaoSalva, setDescricaoSalva] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Verifica no localStorage se já foi salvo
  useEffect(() => {
    const saved = localStorage.getItem('profissional_descricao_salva')
    if (saved === 'true') {
      setIsSaved(true)
      setIsEditMode(false)
    } else {
      setIsEditMode(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!descricao.trim()) {
      setError("A descrição não pode estar em branco")
      return
    }

    setIsLoading(true)

    try {
      await profissionalService.finalizarCadastro({
        descricao: descricao.trim(),
      })

      setDescricaoSalva(descricao.trim())
      setIsSaved(true)
      setIsEditMode(false)
      
      // Salva flag no localStorage
      localStorage.setItem('profissional_descricao_salva', 'true')
      
      console.log('✅ Cadastro profissional finalizado com sucesso!')
    } catch (err) {
      const apiError = err as ApiError
      
      if (apiError.status === 401) {
        setError('Sua sessão expirou. Faça login novamente.')
      } else {
        setError(apiError.message || 'Erro ao salvar descrição. Tente novamente.')
      }
      
      console.error('❌ Erro ao finalizar cadastro:', apiError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setDescricao(descricaoSalva)
    setIsEditMode(true)
    setError("")
  }

  const handleCancel = () => {
    setDescricao("")
    setIsEditMode(false)
    setError("")
  }

  // Se já foi salvo e não está em modo de edição, mostra visualização
  if (isSaved && !isEditMode) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Perfil Profissional
                <Check className="w-5 h-5 text-green-600" />
              </CardTitle>
              <CardDescription>
                Descrição profissional cadastrada
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{descricaoSalva}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Modo de edição/criação
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil Profissional</CardTitle>
        <CardDescription>
          Conte um pouco sobre você e seu trabalho. Esta descrição será exibida para seus clientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição Profissional</Label>
            <Textarea
              id="descricao"
              placeholder="Ex: Sou maquiadora profissional com 5 anos de experiência em maquiagem social e artística. Especializada em noivas e festas. Atendo com hora marcada em meu estúdio ou no local de sua preferência..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Descreva sua experiência, especialidades e o que torna seu trabalho único
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : isSaved ? "Atualizar Descrição" : "Salvar Descrição"}
            </Button>
            
            {isSaved && (
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

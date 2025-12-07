"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Scissors, Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { servicoService, type ServicoResponse } from "@/lib/services/servico-service"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ServicesConfig() {
  const [services, setServices] = useState<ServicoResponse[]>([])
  const [newServiceName, setNewServiceName] = useState("")
  const [newServiceDescription, setNewServiceDescription] = useState("")
  const [newServiceDuration, setNewServiceDuration] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editDuration, setEditDuration] = useState("")
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingList, setIsLoadingList] = useState(true)
  const { toast } = useToast()

  // Carrega os serviços ao montar o componente
  useEffect(() => {
    const carregarServicos = async () => {
      setIsLoadingList(true)
      try {
        console.log('🔍 DEBUG: Carregando serviços do profissional')
        const servicosCarregados = await servicoService.listarServicos()
        console.log('✅ DEBUG: Serviços carregados:', servicosCarregados)
        setServices(servicosCarregados)
      } catch (error: any) {
        console.error('❌ DEBUG: Erro ao carregar serviços:', error)
        toast({
          title: "Erro ao carregar serviços",
          description: error.message || "Não foi possível carregar os serviços. Tente recarregar a página.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingList(false)
      }
    }

    carregarServicos()
  }, [])

  const handleAddService = async () => {
    if (!newServiceName.trim() || !newServiceDuration) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o nome e a duração do serviço.",
        variant: "destructive",
      })
      return
    }

    const duration = Number.parseInt(newServiceDuration)
    if (duration <= 0) {
      toast({
        title: "Erro",
        description: "A duração deve ser maior que zero.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      console.log('🔍 DEBUG: Cadastrando novo serviço:', { nome: newServiceName, descricao: newServiceDescription || undefined, duracaoMin: duration })
      
      const novoServico = await servicoService.cadastrarServico({
        nome: newServiceName.trim(),
        descricao: newServiceDescription.trim() || undefined,
        duracaoMin: duration,
      })

      console.log('✅ DEBUG: Serviço cadastrado com sucesso:', novoServico)
      
      setServices([...services, novoServico])
      setNewServiceName("")
      setNewServiceDescription("")
      setNewServiceDuration("")
      
      toast({
        title: "Serviço adicionado!",
        description: `${novoServico.nome} foi adicionado à sua lista.`,
      })
    } catch (error: any) {
      console.error('❌ DEBUG: Erro ao cadastrar serviço:', error)
      toast({
        title: "Erro ao adicionar serviço",
        description: error.message || "Não foi possível adicionar o serviço. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditService = (service: ServicoResponse) => {
    setEditingId(service.id)
    setEditName(service.nome)
    setEditDescription(service.descricao || "")
    setEditDuration(service.duracaoMin.toString())
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName("")
    setEditDescription("")
    setEditDuration("")
  }

  const handleSaveEdit = async () => {
    if (!editingId) return

    if (!editName.trim() || !editDuration) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o nome e a duração do serviço.",
        variant: "destructive",
      })
      return
    }

    const duration = Number.parseInt(editDuration)
    if (duration <= 0) {
      toast({
        title: "Erro",
        description: "A duração deve ser maior que zero.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      console.log('🔍 DEBUG: Atualizando serviço:', { id: editingId, nome: editName, descricao: editDescription || undefined, duracaoMin: duration })
      
      const servicoAtualizado = await servicoService.atualizarServico(editingId, {
        nome: editName.trim(),
        descricao: editDescription.trim() || undefined,
        duracaoMin: duration,
      })

      console.log('✅ DEBUG: Serviço atualizado com sucesso:', servicoAtualizado)
      
      setServices(services.map(s => s.id === editingId ? servicoAtualizado : s))
      setEditingId(null)
      setEditName("")
      setEditDescription("")
      setEditDuration("")
      
      toast({
        title: "Serviço atualizado!",
        description: `${servicoAtualizado.nome} foi atualizado com sucesso.`,
      })
    } catch (error: any) {
      console.error('❌ DEBUG: Erro ao atualizar serviço:', error)
      toast({
        title: "Erro ao atualizar serviço",
        description: error.message || "Não foi possível atualizar o serviço. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteService = async () => {
    if (!deleteServiceId) return

    setIsLoading(true)
    try {
      console.log('🔍 DEBUG: Deletando serviço:', deleteServiceId)
      
      await servicoService.deletarServico(deleteServiceId)
      
      console.log('✅ DEBUG: Serviço deletado com sucesso')
      
      setServices(services.filter(s => s.id !== deleteServiceId))
      setDeleteServiceId(null)
      
      toast({
        title: "Serviço removido",
        description: "O serviço foi excluído com sucesso.",
      })
    } catch (error: any) {
      console.error('❌ DEBUG: Erro ao deletar serviço:', error)
      toast({
        title: "Erro ao remover serviço",
        description: error.message || "Não foi possível remover o serviço. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
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
            <div className="grid gap-4">
              <Input
                placeholder="Nome do serviço *"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                disabled={isLoading}
              />
              <Textarea
                placeholder="Descrição (opcional)"
                value={newServiceDescription}
                onChange={(e) => setNewServiceDescription(e.target.value)}
                disabled={isLoading}
                rows={3}
              />
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Duração (min) *"
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(e.target.value)}
                  disabled={isLoading}
                  className="w-40"
                  min="1"
                />
                <Button onClick={handleAddService} className="gap-2" disabled={isLoading}>
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Serviços Cadastrados</Label>
            {isLoadingList ? (
              <p className="text-sm text-muted-foreground text-center py-8">Carregando serviços...</p>
            ) : services.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Nenhum serviço cadastrado ainda</p>
            ) : (
              <div className="space-y-2">
                {services.map((service) => (
                  <div key={service.id} className="flex flex-col gap-3 p-4 rounded-lg border bg-card">
                    {editingId === service.id ? (
                      <>
                        <Input
                          placeholder="Nome do serviço *"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          disabled={isLoading}
                        />
                        <Textarea
                          placeholder="Descrição (opcional)"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          disabled={isLoading}
                          rows={3}
                        />
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Duração (min) *"
                            value={editDuration}
                            onChange={(e) => setEditDuration(e.target.value)}
                            disabled={isLoading}
                            className="w-40"
                            min="1"
                          />
                          <div className="ml-auto flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={handleSaveEdit}
                              disabled={isLoading}
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={handleCancelEdit}
                              disabled={isLoading}
                            >
                              <X className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{service.nome}</p>
                          {service.descricao && (
                            <p className="text-sm text-muted-foreground mt-1">{service.descricao}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">{service.duracaoMin} minutos</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditService(service)}
                            disabled={isLoading}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setDeleteServiceId(service.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteServiceId !== null} onOpenChange={(open) => !open && setDeleteServiceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService} disabled={isLoading}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

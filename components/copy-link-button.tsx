"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link2, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AuthManager } from "@/lib/auth-manager"
import { useRouter } from "next/navigation"

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCopy = () => {
    const userId = AuthManager.getUserId()
    
    if (!userId) {
      toast({
        title: "Erro",
        description: "Não foi possível obter o ID do usuário. Faça login novamente.",
        variant: "destructive",
      })
      return
    }

    const link = `${window.location.origin}/agendar/${userId}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    toast({
      title: "Link copiado!",
      description: "O link de agendamento foi copiado para a área de transferência.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVisit = () => {
    const userId = AuthManager.getUserId()
    
    if (!userId) {
      toast({
        title: "Erro",
        description: "Não foi possível obter o ID do usuário. Faça login novamente.",
        variant: "destructive",
      })
      return
    }

    router.push(`/agendar/${userId}`)
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleCopy} variant="outline" className="gap-2">
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        {copied ? "Copiado!" : "Copiar link"}
      </Button>
      <Button onClick={handleVisit} variant="default" className="gap-2">
        <ExternalLink className="w-4 h-4" />
        Visualizar
      </Button>
    </div>
  )
}

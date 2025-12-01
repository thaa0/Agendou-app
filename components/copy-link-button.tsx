"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    const link = `${window.location.origin}/agendar/seu-id-aqui`
    navigator.clipboard.writeText(link)
    setCopied(true)
    toast({
      title: "Link copiado!",
      description: "O link de agendamento foi copiado para a área de transferência.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button onClick={handleCopy} variant="outline" className="gap-2 bg-transparent">
      {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      {copied ? "Copiado!" : "Copiar link de agendamento"}
    </Button>
  )
}

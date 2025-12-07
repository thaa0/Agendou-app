"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { authService, type ApiError } from "@/lib/services/auth-service"
import { useRouter } from "next/navigation"

export function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeFantasia: "",
    whatsapp: "",
    email: "",
    senha: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validações locais
    if (formData.senha !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    // Valida senha conforme regras do backend
    const validacaoSenha = authService.validarSenha(formData.senha)
    if (!validacaoSenha.valida) {
      setError(validacaoSenha.mensagem || "Senha inválida")
      return
    }

    setIsLoading(true)

    try {
      // Formata o WhatsApp para o padrão esperado pelo backend
      const whatsappFormatado = authService.formatarWhatsApp(formData.whatsapp)

      // Envia requisição para o backend
      await authService.cadastrarUsuario({
        nomeCompleto: formData.nomeCompleto,
        nomeFantasia: formData.nomeFantasia,
        whatsapp: whatsappFormatado,
        email: formData.email,
        senha: formData.senha,
      })

      // Cadastro realizado com sucesso
      setSuccess(true)
      
      // Redireciona para login após 2 segundos
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      const apiError = err as ApiError
      
      // Exibe mensagem de erro
      if (apiError.errors) {
        // Se houver erros de validação específicos, mostra o primeiro
        const firstError = Object.values(apiError.errors)[0]?.[0]
        setError(firstError || apiError.message)
      } else {
        setError(apiError.message || "Erro ao realizar cadastro. Tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro</CardTitle>
        <CardDescription>Preencha seus dados para criar sua conta</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nomeCompleto">Nome Completo</Label>
            <Input
              id="nomeCompleto"
              placeholder="Seu nome completo"
              value={formData.nomeCompleto}
              onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
              required
              minLength={3}
              maxLength={120}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
            <Input
              id="nomeFantasia"
              placeholder="Nome do seu negócio"
              value={formData.nomeFantasia}
              onChange={(e) => setFormData({ ...formData, nomeFantasia: e.target.value })}
              required
              minLength={2}
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground">
              Como você quer que seus clientes vejam seu negócio
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="(11) 98765-4321"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Formato: DDD + número (ex: 11987654321)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              required
              maxLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Máximo 8 caracteres, deve conter letras e números
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              maxLength={8}
            />
          </div>
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              Cadastro realizado com sucesso! Redirecionando...
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading || success}>
            {isLoading ? "Criando conta..." : success ? "Cadastro realizado!" : "Criar conta"}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

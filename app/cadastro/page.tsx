import { SignupForm } from "@/components/signup-form"
import { Sparkles } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance mb-2">Crie sua conta</h1>
          <p className="text-muted-foreground">Comece a gerenciar seus agendamentos profissionalmente</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}

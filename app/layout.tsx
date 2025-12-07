import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
// <CHANGE> Importar Toaster para exibir notificações toast
import { Toaster } from "@/components/ui/toaster"
import { TimeInputConfigurator } from "@/components/time-input-configurator"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  // <CHANGE> Atualizar metadata para o sistema de agendamento
  title: "NailAgenda - Sistema de Agendamento para Nail Designers",
  description: "Sistema completo de agendamento e gestão para profissionais de nail design",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        <TimeInputConfigurator />
        {children}
        {/* <CHANGE> Adicionar Toaster para notificações */}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

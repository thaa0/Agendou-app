"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Settings, Package, LogOut, Sparkles, CalendarDays } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hoje",
    href: "/dashboard/agendamentos-hoje",
    icon: Calendar,
  },
  {
    title: "Mês",
    href: "/dashboard/agendamentos-mes",
    icon: CalendarDays,
  },
  {
    title: "Produtos",
    href: "/dashboard/produtos",
    icon: Package,
  },
  {
    title: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">NailAgenda</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

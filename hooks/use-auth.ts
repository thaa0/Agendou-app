"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/services/auth-service'
import { AuthManager } from '@/lib/auth-manager'

/**
 * Hook customizado para gerenciar autenticação
 */
export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // Verifica autenticação ao montar o componente
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      const id = authService.getUserId()
      
      setIsAuthenticated(authenticated)
      setUserId(id)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  /**
   * Realiza logout e redireciona para login
   */
  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUserId(null)
    router.push('/login')
  }

  /**
   * Redireciona para login se não autenticado
   */
  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }

  return {
    isAuthenticated,
    isLoading,
    userId,
    logout,
    requireAuth,
  }
}

/**
 * COMO USAR EM COMPONENTES:
 * 
 * ```tsx
 * 'use client'
 * 
 * import { useAuth } from '@/hooks/use-auth'
 * 
 * export function DashboardPage() {
 *   const { isAuthenticated, isLoading, userId, logout, requireAuth } = useAuth()
 * 
 *   // Redireciona para login se não autenticado
 *   useEffect(() => {
 *     requireAuth()
 *   }, [isAuthenticated, isLoading])
 * 
 *   if (isLoading) {
 *     return <div>Carregando...</div>
 *   }
 * 
 *   if (!isAuthenticated) {
 *     return null // Será redirecionado
 *   }
 * 
 *   return (
 *     <div>
 *       <p>Usuário ID: {userId}</p>
 *       <button onClick={logout}>Sair</button>
 *     </div>
 *   )
 * }
 * ```
 */

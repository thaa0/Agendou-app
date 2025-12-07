"use client"

import { useEffect } from 'react'

/**
 * Componente que força o formato 24h em inputs de tempo
 * Executa apenas no client-side para evitar erros de hidratação
 */
export function TimeInputConfigurator() {
  useEffect(() => {
    // Configura inputs existentes
    const configureTimeInputs = () => {
      document.querySelectorAll('input[type="time"]').forEach((input) => {
        input.setAttribute('lang', 'pt-BR')
      })
    }

    // Executa imediatamente
    configureTimeInputs()

    // Observer para inputs criados dinamicamente
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as Element
            
            // Se o próprio nó for um input[type="time"]
            if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'time') {
              element.setAttribute('lang', 'pt-BR')
            }
            
            // Se o nó contém inputs[type="time"]
            if (element.querySelectorAll) {
              element.querySelectorAll('input[type="time"]').forEach((input) => {
                input.setAttribute('lang', 'pt-BR')
              })
            }
          }
        })
      })
    })

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

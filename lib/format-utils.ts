/**
 * Utilitários para formatação de inputs
 */

/**
 * Formata número de telefone para exibição com máscara
 * @param value - Valor digitado pelo usuário
 * @returns Valor formatado com máscara (XX) XXXXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '')
  
  // Aplica a máscara conforme o tamanho
  if (numbers.length <= 2) {
    return numbers
  }
  
  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  }
  
  if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }
  
  // Limita a 11 dígitos
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

/**
 * Remove a formatação do telefone, mantendo apenas números
 * @param formatted - Número formatado
 * @returns Apenas números
 */
export function unformatPhoneNumber(formatted: string): string {
  return formatted.replace(/\D/g, '')
}

/**
 * Formata CPF para exibição com máscara
 * @param value - Valor digitado pelo usuário
 * @returns Valor formatado com máscara XXX.XXX.XXX-XX
 */
export function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, '')
  
  if (numbers.length <= 3) {
    return numbers
  }
  
  if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
  }
  
  if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
  }
  
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
}

/**
 * Formata CNPJ para exibição com máscara
 * @param value - Valor digitado pelo usuário
 * @returns Valor formatado com máscara XX.XXX.XXX/XXXX-XX
 */
export function formatCNPJ(value: string): string {
  const numbers = value.replace(/\D/g, '')
  
  if (numbers.length <= 2) {
    return numbers
  }
  
  if (numbers.length <= 5) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
  }
  
  if (numbers.length <= 8) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
  }
  
  if (numbers.length <= 12) {
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
  }
  
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
}

/**
 * Valida se um CPF é válido
 * @param cpf - CPF a ser validado (com ou sem formatação)
 * @returns true se válido, false caso contrário
 */
export function isValidCPF(cpf: string): boolean {
  const numbers = cpf.replace(/\D/g, '')
  
  if (numbers.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(numbers)) return false
  
  // Valida primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(numbers.charAt(9))) return false
  
  // Valida segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(numbers.charAt(10))) return false
  
  return true
}

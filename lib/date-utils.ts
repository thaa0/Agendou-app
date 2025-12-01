// Utilitários para formatação de datas no padrão brasileiro

export function formatDateBR(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString + "T00:00:00")
  return date.toLocaleDateString("pt-BR")
}

export function formatDateTimeBR(dateString: string, timeString: string): string {
  if (!dateString || !timeString) return ""
  const date = new Date(dateString + "T" + timeString)
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Converte data do formato ISO (yyyy-mm-dd) para formato brasileiro (dd/mm/yyyy)
export function isoToBR(isoDate: string): string {
  if (!isoDate) return ""
  const [year, month, day] = isoDate.split("-")
  return `${day}/${month}/${year}`
}

// Converte data do formato brasileiro (dd/mm/yyyy) para ISO (yyyy-mm-dd)
export function brToISO(brDate: string): string {
  if (!brDate) return ""
  const [day, month, year] = brDate.split("/")
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

export function getCurrentDateBR(): string {
  return new Date().toLocaleDateString("pt-BR")
}

export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0]
}

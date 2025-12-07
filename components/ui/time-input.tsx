"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    // Garante que o valor está sempre no formato HH:mm
    const normalizedValue = React.useMemo(() => {
      if (!value) return ''
      // Se já estiver no formato correto (HH:mm), retorna
      if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
        return value
      }
      return value
    }, [value])

    return (
      <input
        type="time"
        ref={ref}
        value={normalizedValue}
        onChange={onChange}
        step="900"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
          "[&::-webkit-datetime-edit-ampm-field]:hidden",
          "[&::-webkit-datetime-edit-ampm-field]:!hidden",
          "[&::-webkit-datetime-edit-ampm-field]:!w-0",
          "[&::-webkit-datetime-edit-ampm-field]:!opacity-0",
          "[&::-webkit-datetime-edit-ampm-field]:!display-none",
          className
        )}
        style={{
          colorScheme: 'light'
        }}
        {...props}
      />
    )
  }
)

TimeInput.displayName = "TimeInput"

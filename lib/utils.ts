import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(0)}K`
  }
  return `$${value.toLocaleString()}`
}

export function formatNumber(value: number): string {
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`
  }
  return value.toLocaleString()
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

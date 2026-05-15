import { create } from 'zustand'
import type { Parish, School } from './data'

interface AppState {
  // Selected filters
  selectedParish: string | null
  selectedSchoolType: string | null
  selectedSector: string | null
  
  // Simulator state
  investmentAmount: number
  investmentYears: number
  
  // UI state
  sidebarOpen: boolean
  
  // Actions
  setSelectedParish: (parish: string | null) => void
  setSelectedSchoolType: (type: string | null) => void
  setSelectedSector: (sector: string | null) => void
  setInvestmentAmount: (amount: number) => void
  setInvestmentYears: (years: number) => void
  setSidebarOpen: (open: boolean) => void
  resetFilters: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  selectedParish: null,
  selectedSchoolType: null,
  selectedSector: null,
  investmentAmount: 1000000,
  investmentYears: 5,
  sidebarOpen: true,
  
  // Actions
  setSelectedParish: (parish) => set({ selectedParish: parish }),
  setSelectedSchoolType: (type) => set({ selectedSchoolType: type }),
  setSelectedSector: (sector) => set({ selectedSector: sector }),
  setInvestmentAmount: (amount) => set({ investmentAmount: amount }),
  setInvestmentYears: (years) => set({ investmentYears: years }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  resetFilters: () => set({
    selectedParish: null,
    selectedSchoolType: null,
    selectedSector: null
  })
}))

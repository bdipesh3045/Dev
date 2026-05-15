import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SimulationScenario {
  id: string
  name: string
  stemAllocation: number
  teacherRetention: number
  infrastructure: number
  createdAt: Date
  projectedOutcome: number
}

export interface SelectedParish {
  name: string
  isOpen: boolean
}

interface AppState {
  // Simulation State
  stemAllocation: number
  teacherRetention: number
  infrastructure: number
  savedScenarios: SimulationScenario[]
  
  // Parish Drawer State
  selectedParish: SelectedParish | null
  
  // Map State
  bivariateMode: boolean
  mapLayer: 'opportunity' | 'poverty' | 'performance'
  
  // Chat State
  highlightedParishes: string[]
  
  // Actions
  setStemAllocation: (value: number) => void
  setTeacherRetention: (value: number) => void
  setInfrastructure: (value: number) => void
  saveScenario: (name: string) => void
  deleteScenario: (id: string) => void
  setSelectedParish: (parish: SelectedParish | null) => void
  setBivariateMode: (enabled: boolean) => void
  setMapLayer: (layer: 'opportunity' | 'poverty' | 'performance') => void
  setHighlightedParishes: (parishes: string[]) => void
  resetSimulation: () => void
}

const DEFAULT_STEM = 40
const DEFAULT_RETENTION = 30
const DEFAULT_INFRASTRUCTURE = 30

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      stemAllocation: DEFAULT_STEM,
      teacherRetention: DEFAULT_RETENTION,
      infrastructure: DEFAULT_INFRASTRUCTURE,
      savedScenarios: [],
      selectedParish: null,
      bivariateMode: false,
      mapLayer: 'opportunity',
      highlightedParishes: [],
      
      // Actions
      setStemAllocation: (value) => set({ stemAllocation: value }),
      setTeacherRetention: (value) => set({ teacherRetention: value }),
      setInfrastructure: (value) => set({ infrastructure: value }),
      
      saveScenario: (name) => {
        const state = get()
        const newScenario: SimulationScenario = {
          id: crypto.randomUUID(),
          name,
          stemAllocation: state.stemAllocation,
          teacherRetention: state.teacherRetention,
          infrastructure: state.infrastructure,
          createdAt: new Date(),
          projectedOutcome: calculateProjectedOutcome(
            state.stemAllocation,
            state.teacherRetention,
            state.infrastructure
          )
        }
        set({ savedScenarios: [...state.savedScenarios, newScenario] })
      },
      
      deleteScenario: (id) => {
        set({ savedScenarios: get().savedScenarios.filter(s => s.id !== id) })
      },
      
      setSelectedParish: (parish) => set({ selectedParish: parish }),
      setBivariateMode: (enabled) => set({ bivariateMode: enabled }),
      setMapLayer: (layer) => set({ mapLayer: layer }),
      setHighlightedParishes: (parishes) => set({ highlightedParishes: parishes }),
      
      resetSimulation: () => set({
        stemAllocation: DEFAULT_STEM,
        teacherRetention: DEFAULT_RETENTION,
        infrastructure: DEFAULT_INFRASTRUCTURE
      })
    }),
    {
      name: 'la-education-portal',
      partialize: (state) => ({
        stemAllocation: state.stemAllocation,
        teacherRetention: state.teacherRetention,
        infrastructure: state.infrastructure,
        savedScenarios: state.savedScenarios
      })
    }
  )
)

// Helper function to calculate projected outcome based on allocations
export function calculateProjectedOutcome(
  stem: number,
  retention: number,
  infra: number
): number {
  // Weighted formula for projected graduation rate improvement
  const baseImprovement = (stem * 0.35 + retention * 0.40 + infra * 0.25) / 100
  const currentRate = 48.5
  return Math.min(currentRate + (baseImprovement * 25), 85)
}

// Calculate priority score based on the formula
export function calculatePriorityScore(
  workforceGap: number,
  povertyIndex: number,
  currentFunding: number
): number {
  if (currentFunding === 0) return 0
  return Math.round((workforceGap * povertyIndex) / (currentFunding / 1000000) * 10) / 10
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_STEM = 40;
const DEFAULT_RETENTION = 30;
const DEFAULT_INFRASTRUCTURE = 30;

/**
 * Calculate projected outcome based on allocations
 * @param {number} stem - STEM allocation percentage
 * @param {number} retention - Teacher retention allocation percentage
 * @param {number} infra - Infrastructure allocation percentage
 * @returns {number} - Projected graduation rate
 */
export function calculateProjectedOutcome(stem, retention, infra) {
  const baseImprovement = (stem * 0.35 + retention * 0.40 + infra * 0.25) / 100;
  const currentRate = 48.5;
  return Math.min(currentRate + (baseImprovement * 25), 85);
}

/**
 * Calculate priority score for schools
 * @param {number} workforceGap - Workforce gap percentage
 * @param {number} povertyIndex - Poverty index
 * @param {number} currentFunding - Current funding amount
 * @returns {number} - Priority score
 */
export function calculatePriorityScore(workforceGap, povertyIndex, currentFunding) {
  if (currentFunding === 0) return 0;
  return Math.round((workforceGap * povertyIndex) / (currentFunding / 1000000) * 10) / 10;
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Simulation State
      stemAllocation: DEFAULT_STEM,
      teacherRetention: DEFAULT_RETENTION,
      infrastructure: DEFAULT_INFRASTRUCTURE,
      savedScenarios: [],

      // Parish Drawer State
      selectedParish: null,

      // Map State
      bivariateMode: false,
      mapLayer: 'opportunity',

      // Chat State
      highlightedParishes: [],

      // Actions
      setStemAllocation: (value) => set({ stemAllocation: value }),
      setTeacherRetention: (value) => set({ teacherRetention: value }),
      setInfrastructure: (value) => set({ infrastructure: value }),

      saveScenario: (name) => {
        const state = get();
        const newScenario = {
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
        };
        set({ savedScenarios: [...state.savedScenarios, newScenario] });
      },

      deleteScenario: (id) => {
        set({ savedScenarios: get().savedScenarios.filter(s => s.id !== id) });
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
);

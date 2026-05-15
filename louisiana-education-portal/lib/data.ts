export interface School {
  id: string
  name: string
  parish: string
  type: 'K-12' | 'Community College' | 'University' | 'Technical School'
  enrollment: number
  graduationRate: number
  opportunityScore: number
  workforceAlignment: number
  fundingNeeds: number
  topPrograms: string[]
  coordinates: { lat: number; lng: number }
}

export interface Parish {
  name: string
  population: number
  medianIncome: number
  unemploymentRate: number
  educationGap: number
  workforceDemand: string[]
  opportunityScore: number
}

export interface WorkforceTrend {
  sector: string
  demand: number
  growth: number
  gapPercentage: number
}

export const schools: School[] = [
  {
    id: '1',
    name: 'Louisiana State University',
    parish: 'East Baton Rouge',
    type: 'University',
    enrollment: 35678,
    graduationRate: 68,
    opportunityScore: 87,
    workforceAlignment: 82,
    fundingNeeds: 45000000,
    topPrograms: ['Engineering', 'Business', 'Agriculture'],
    coordinates: { lat: 30.4133, lng: -91.1800 }
  },
  {
    id: '2',
    name: 'University of New Orleans',
    parish: 'Orleans',
    type: 'University',
    enrollment: 8234,
    graduationRate: 42,
    opportunityScore: 78,
    workforceAlignment: 75,
    fundingNeeds: 28000000,
    topPrograms: ['Film', 'Hospitality', 'Marine Biology'],
    coordinates: { lat: 30.0277, lng: -90.0674 }
  },
  {
    id: '3',
    name: 'Delgado Community College',
    parish: 'Orleans',
    type: 'Community College',
    enrollment: 18500,
    graduationRate: 28,
    opportunityScore: 92,
    workforceAlignment: 88,
    fundingNeeds: 15000000,
    topPrograms: ['Healthcare', 'Culinary Arts', 'IT'],
    coordinates: { lat: 29.9761, lng: -90.0950 }
  },
  {
    id: '4',
    name: 'Louisiana Tech University',
    parish: 'Lincoln',
    type: 'University',
    enrollment: 12456,
    graduationRate: 52,
    opportunityScore: 85,
    workforceAlignment: 91,
    fundingNeeds: 32000000,
    topPrograms: ['Cyber Security', 'Engineering', 'Nursing'],
    coordinates: { lat: 32.5275, lng: -92.6451 }
  },
  {
    id: '5',
    name: 'SOWELA Technical Community College',
    parish: 'Calcasieu',
    type: 'Technical School',
    enrollment: 3200,
    graduationRate: 45,
    opportunityScore: 94,
    workforceAlignment: 96,
    fundingNeeds: 8500000,
    topPrograms: ['Industrial Tech', 'Process Tech', 'Welding'],
    coordinates: { lat: 30.2266, lng: -93.2174 }
  },
  {
    id: '6',
    name: 'Baton Rouge Community College',
    parish: 'East Baton Rouge',
    type: 'Community College',
    enrollment: 7800,
    graduationRate: 32,
    opportunityScore: 89,
    workforceAlignment: 84,
    fundingNeeds: 12000000,
    topPrograms: ['Nursing', 'Business', 'STEM'],
    coordinates: { lat: 30.4507, lng: -91.1403 }
  },
  {
    id: '7',
    name: 'McNeese State University',
    parish: 'Calcasieu',
    type: 'University',
    enrollment: 7200,
    graduationRate: 44,
    opportunityScore: 76,
    workforceAlignment: 79,
    fundingNeeds: 22000000,
    topPrograms: ['Nursing', 'Engineering', 'Education'],
    coordinates: { lat: 30.2077, lng: -93.2178 }
  },
  {
    id: '8',
    name: 'Northwestern State University',
    parish: 'Natchitoches',
    type: 'University',
    enrollment: 9100,
    graduationRate: 38,
    opportunityScore: 72,
    workforceAlignment: 71,
    fundingNeeds: 18000000,
    topPrograms: ['Education', 'Nursing', 'Creative Arts'],
    coordinates: { lat: 31.7607, lng: -93.0863 }
  }
]

export const parishes: Parish[] = [
  {
    name: 'Orleans',
    population: 383997,
    medianIncome: 45615,
    unemploymentRate: 5.2,
    educationGap: 18,
    workforceDemand: ['Healthcare', 'Hospitality', 'Tech'],
    opportunityScore: 88
  },
  {
    name: 'East Baton Rouge',
    population: 456781,
    medianIncome: 52890,
    unemploymentRate: 4.1,
    educationGap: 12,
    workforceDemand: ['Petrochemical', 'Healthcare', 'Government'],
    opportunityScore: 85
  },
  {
    name: 'Jefferson',
    population: 440781,
    medianIncome: 48230,
    unemploymentRate: 4.8,
    educationGap: 15,
    workforceDemand: ['Aerospace', 'Healthcare', 'Retail'],
    opportunityScore: 82
  },
  {
    name: 'Calcasieu',
    population: 216785,
    medianIncome: 51200,
    unemploymentRate: 5.5,
    educationGap: 20,
    workforceDemand: ['Petrochemical', 'LNG', 'Manufacturing'],
    opportunityScore: 91
  },
  {
    name: 'Caddo',
    population: 243243,
    medianIncome: 42100,
    unemploymentRate: 6.1,
    educationGap: 22,
    workforceDemand: ['Healthcare', 'Gaming', 'Manufacturing'],
    opportunityScore: 79
  },
  {
    name: 'Lafayette',
    population: 244390,
    medianIncome: 55120,
    unemploymentRate: 3.9,
    educationGap: 10,
    workforceDemand: ['Oil & Gas', 'Tech', 'Healthcare'],
    opportunityScore: 86
  }
]

export const workforceTrends: WorkforceTrend[] = [
  { sector: 'Healthcare', demand: 15420, growth: 18, gapPercentage: 24 },
  { sector: 'Petrochemical', demand: 8750, growth: 12, gapPercentage: 31 },
  { sector: 'Information Technology', demand: 6200, growth: 28, gapPercentage: 42 },
  { sector: 'Advanced Manufacturing', demand: 4800, growth: 15, gapPercentage: 35 },
  { sector: 'Construction Trades', demand: 7200, growth: 10, gapPercentage: 28 },
  { sector: 'Renewable Energy', demand: 2100, growth: 45, gapPercentage: 55 }
]

export const aiInsights = [
  {
    id: 1,
    title: 'High-Impact Investment Zone',
    description: 'Calcasieu Parish shows 96% workforce alignment with LNG industry expansion. Technical training programs here could yield 3.2x ROI within 5 years.',
    type: 'opportunity' as const,
    priority: 'high' as const
  },
  {
    id: 2,
    title: 'Workforce Gap Alert',
    description: 'IT sector in Orleans Parish faces 42% skills gap. Community college partnerships could address 60% of demand through accelerated programs.',
    type: 'alert' as const,
    priority: 'medium' as const
  },
  {
    id: 3,
    title: 'Emerging Trend',
    description: 'Renewable energy sector showing 45% YoY growth. Early investment in green technology training could position Louisiana as regional leader.',
    type: 'trend' as const,
    priority: 'high' as const
  },
  {
    id: 4,
    title: 'Partnership Opportunity',
    description: 'LSU Engineering and SOWELA Technical could create pipeline program addressing 28% of petrochemical workforce gap.',
    type: 'opportunity' as const,
    priority: 'medium' as const
  }
]

export const kpiData = {
  totalSchools: 178,
  totalEnrollment: 487650,
  avgOpportunityScore: 84,
  totalFundingGap: 2.4,
  workforceGap: 32,
  avgGraduationRate: 48.5
}

export const enrollmentTrend = [
  { year: '2020', enrollment: 425000, graduates: 42000 },
  { year: '2021', enrollment: 445000, graduates: 44500 },
  { year: '2022', enrollment: 458000, graduates: 46200 },
  { year: '2023', enrollment: 472000, graduates: 48100 },
  { year: '2024', enrollment: 480000, graduates: 49800 },
  { year: '2025', enrollment: 487650, graduates: 51200 }
]

export const fundingByCategory = [
  { name: 'Infrastructure', value: 850, fill: 'var(--chart-1)' },
  { name: 'Technology', value: 620, fill: 'var(--chart-2)' },
  { name: 'Faculty', value: 480, fill: 'var(--chart-3)' },
  { name: 'Programs', value: 340, fill: 'var(--chart-4)' },
  { name: 'Student Services', value: 290, fill: 'var(--chart-5)' }
]

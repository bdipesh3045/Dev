// Louisiana K-12 Education Data Types and Data

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
  k12Students: number
  publicSchools: number
  performanceGrade: 'A' | 'B' | 'C' | 'D' | 'F'
}

export interface WorkforceTrend {
  sector: string
  demand: number
  growth: number
  gapPercentage: number
}

export interface AIInsight {
  id: number
  title: string
  description: string
  type: 'opportunity' | 'alert' | 'trend'
  priority: 'high' | 'medium' | 'low'
}

// Louisiana K-12 Schools and Institutions
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
    coordinates: { lat: 30.4133, lng: -91.18 }
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
    coordinates: { lat: 29.9761, lng: -90.095 }
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

// Louisiana Parish Data with K-12 specifics
export const parishes: Parish[] = [
  {
    name: 'Orleans',
    population: 383997,
    medianIncome: 45615,
    unemploymentRate: 5.2,
    educationGap: 18,
    workforceDemand: ['Healthcare', 'Hospitality', 'Tech'],
    opportunityScore: 88,
    k12Students: 48500,
    publicSchools: 78,
    performanceGrade: 'C'
  },
  {
    name: 'East Baton Rouge',
    population: 456781,
    medianIncome: 52890,
    unemploymentRate: 4.1,
    educationGap: 12,
    workforceDemand: ['Petrochemical', 'Healthcare', 'Government'],
    opportunityScore: 85,
    k12Students: 42300,
    publicSchools: 89,
    performanceGrade: 'B'
  },
  {
    name: 'Jefferson',
    population: 440781,
    medianIncome: 48230,
    unemploymentRate: 4.8,
    educationGap: 15,
    workforceDemand: ['Aerospace', 'Healthcare', 'Retail'],
    opportunityScore: 82,
    k12Students: 51200,
    publicSchools: 82,
    performanceGrade: 'B'
  },
  {
    name: 'Calcasieu',
    population: 216785,
    medianIncome: 51200,
    unemploymentRate: 5.5,
    educationGap: 20,
    workforceDemand: ['Petrochemical', 'LNG', 'Manufacturing'],
    opportunityScore: 91,
    k12Students: 33400,
    publicSchools: 67,
    performanceGrade: 'B'
  },
  {
    name: 'Caddo',
    population: 243243,
    medianIncome: 42100,
    unemploymentRate: 6.1,
    educationGap: 22,
    workforceDemand: ['Healthcare', 'Gaming', 'Manufacturing'],
    opportunityScore: 79,
    k12Students: 38900,
    publicSchools: 71,
    performanceGrade: 'C'
  },
  {
    name: 'Lafayette',
    population: 244390,
    medianIncome: 55120,
    unemploymentRate: 3.9,
    educationGap: 10,
    workforceDemand: ['Oil & Gas', 'Tech', 'Healthcare'],
    opportunityScore: 86,
    k12Students: 31500,
    publicSchools: 45,
    performanceGrade: 'A'
  },
  {
    name: 'Ouachita',
    population: 160268,
    medianIncome: 44200,
    unemploymentRate: 5.8,
    educationGap: 19,
    workforceDemand: ['Healthcare', 'Education', 'Retail'],
    opportunityScore: 74,
    k12Students: 24800,
    publicSchools: 52,
    performanceGrade: 'C'
  },
  {
    name: 'Rapides',
    population: 132792,
    medianIncome: 43500,
    unemploymentRate: 5.4,
    educationGap: 17,
    workforceDemand: ['Healthcare', 'Military', 'Manufacturing'],
    opportunityScore: 77,
    k12Students: 22100,
    publicSchools: 48,
    performanceGrade: 'C'
  }
]

// Workforce Trends in Louisiana
export const workforceTrends: WorkforceTrend[] = [
  { sector: 'Healthcare', demand: 15420, growth: 18, gapPercentage: 24 },
  { sector: 'Petrochemical', demand: 8750, growth: 12, gapPercentage: 31 },
  { sector: 'Information Technology', demand: 6200, growth: 28, gapPercentage: 42 },
  { sector: 'Advanced Manufacturing', demand: 4800, growth: 15, gapPercentage: 35 },
  { sector: 'Construction Trades', demand: 7200, growth: 10, gapPercentage: 28 },
  { sector: 'Renewable Energy', demand: 2100, growth: 45, gapPercentage: 55 }
]

// AI-generated Insights for Investors
export const aiInsights: AIInsight[] = [
  {
    id: 1,
    title: 'High-Impact Investment Zone',
    description: 'Calcasieu Parish shows 96% workforce alignment with LNG industry expansion. Technical training programs here could yield 3.2x ROI within 5 years.',
    type: 'opportunity',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Workforce Gap Alert',
    description: 'IT sector in Orleans Parish faces 42% skills gap. Community college partnerships could address 60% of demand through accelerated programs.',
    type: 'alert',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Emerging Trend',
    description: 'Renewable energy sector showing 45% YoY growth. Early investment in green technology training could position Louisiana as regional leader.',
    type: 'trend',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Partnership Opportunity',
    description: 'LSU Engineering and SOWELA Technical could create pipeline program addressing 28% of petrochemical workforce gap.',
    type: 'opportunity',
    priority: 'medium'
  }
]

// KPI Summary Data
export const kpiData = {
  totalSchools: 1384,
  totalEnrollment: 716250,
  avgOpportunityScore: 84,
  totalFundingGap: 2.4, // in billions
  workforceGap: 32,
  avgGraduationRate: 82.5,
  totalParishes: 64,
  charteredSchools: 148
}

// Enrollment Trends Over Time
export const enrollmentTrend = [
  { year: '2020', enrollment: 685000, graduates: 52000 },
  { year: '2021', enrollment: 692000, graduates: 53500 },
  { year: '2022', enrollment: 701000, graduates: 55200 },
  { year: '2023', enrollment: 708000, graduates: 56800 },
  { year: '2024', enrollment: 712000, graduates: 57900 },
  { year: '2025', enrollment: 716250, graduates: 59200 }
]

// Funding by Category
export const fundingByCategory = [
  { name: 'Infrastructure', value: 850, fill: 'var(--chart-1)' },
  { name: 'Technology', value: 620, fill: 'var(--chart-2)' },
  { name: 'Faculty', value: 480, fill: 'var(--chart-3)' },
  { name: 'Programs', value: 340, fill: 'var(--chart-4)' },
  { name: 'Student Services', value: 290, fill: 'var(--chart-5)' }
]

// Investment Opportunity Zones
export const investmentZones = [
  {
    id: 1,
    parish: 'Calcasieu',
    sector: 'Industrial Tech',
    potentialROI: 3.2,
    riskLevel: 'Low',
    timeline: '3-5 years',
    investmentNeeded: 15000000
  },
  {
    id: 2,
    parish: 'Orleans',
    sector: 'Healthcare',
    potentialROI: 2.8,
    riskLevel: 'Medium',
    timeline: '2-4 years',
    investmentNeeded: 22000000
  },
  {
    id: 3,
    parish: 'Lafayette',
    sector: 'Technology',
    potentialROI: 4.1,
    riskLevel: 'Medium',
    timeline: '4-6 years',
    investmentNeeded: 18000000
  },
  {
    id: 4,
    parish: 'East Baton Rouge',
    sector: 'STEM Education',
    potentialROI: 2.5,
    riskLevel: 'Low',
    timeline: '3-5 years',
    investmentNeeded: 12000000
  }
]

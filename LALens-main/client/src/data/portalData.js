/**
 * Portal data converted from louisiana-education-portal
 * Contains schools, parishes, workforce trends, and KPI data
 */

export const schools = [
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
];

export const parishes = [
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
];

export const workforceTrends = [
  { sector: 'Healthcare', demand: 15420, growth: 18, gapPercentage: 24 },
  { sector: 'Petrochemical', demand: 8750, growth: 12, gapPercentage: 31 },
  { sector: 'Information Technology', demand: 6200, growth: 28, gapPercentage: 42 },
  { sector: 'Advanced Manufacturing', demand: 4800, growth: 15, gapPercentage: 35 },
  { sector: 'Construction Trades', demand: 7200, growth: 10, gapPercentage: 28 },
  { sector: 'Renewable Energy', demand: 2100, growth: 45, gapPercentage: 55 }
];

export const aiInsights = [
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
];

export const kpiData = {
  totalSchools: 178,
  totalEnrollment: 487650,
  avgOpportunityScore: 84,
  totalFundingGap: 2.4,
  workforceGap: 32,
  avgGraduationRate: 48.5
};

export const enrollmentTrend = [
  { year: '2020', enrollment: 425000, graduates: 42000 },
  { year: '2021', enrollment: 445000, graduates: 44500 },
  { year: '2022', enrollment: 458000, graduates: 46200 },
  { year: '2023', enrollment: 472000, graduates: 48100 },
  { year: '2024', enrollment: 480000, graduates: 49800 },
  { year: '2025', enrollment: 487650, graduates: 51200 }
];

export const fundingByCategory = [
  { name: 'Infrastructure', value: 850, fill: 'var(--purple)' },
  { name: 'Technology', value: 620, fill: 'var(--cyan)' },
  { name: 'Faculty', value: 480, fill: 'var(--green)' },
  { name: 'Programs', value: 340, fill: 'var(--amber)' },
  { name: 'Student Services', value: 290, fill: 'var(--red)' }
];

// Pipeline stages for visualization
export const pipelineStages = [
  { name: 'K-12 Students', value: 487650, color: 'var(--purple)' },
  { name: 'HS Graduates', value: 142000, color: 'var(--cyan)', dropoff: 71 },
  { name: 'Higher Ed Enrolled', value: 98000, color: 'var(--green)', dropoff: 31 },
  { name: 'Completers', value: 51200, color: 'var(--amber)', dropoff: 48 },
  { name: 'Local Workforce', value: 44000, color: 'var(--purple-strong)', dropoff: 14 },
];

// Industry destinations for pipeline
export const industryDestinations = [
  { name: 'Healthcare', graduates: 12500, demand: 15420, gap: -2920, color: 'var(--red)' },
  { name: 'Petrochemical', graduates: 8200, demand: 8750, gap: -550, color: 'var(--amber)' },
  { name: 'Information Tech', graduates: 3600, demand: 6200, gap: -2600, color: 'var(--red)' },
  { name: 'Manufacturing', graduates: 4100, demand: 4800, gap: -700, color: 'var(--amber)' },
  { name: 'Construction', graduates: 5200, demand: 7200, gap: -2000, color: 'var(--red)' },
  { name: 'Education', graduates: 5400, demand: 4500, gap: 900, color: 'var(--green)' },
];

// Expansion locations
export const expansionLocations = [
  {
    rank: 1,
    parish: 'Ouachita',
    city: 'Monroe',
    populationGrowth: 8.2,
    currentOvercrowding: 18,
    jobDemand: 'High',
    recommendedType: 'Technical College',
    rationale: 'Growing population with minimal technical training options. Healthcare and manufacturing demand exceed supply.'
  },
  {
    rank: 2,
    parish: 'Tangipahoa',
    city: 'Hammond',
    populationGrowth: 12.4,
    currentOvercrowding: 22,
    jobDemand: 'Very High',
    recommendedType: 'Community College Satellite',
    rationale: 'Fastest growing parish with limited post-secondary access. 40-mile gap to nearest community college.'
  },
  {
    rank: 3,
    parish: 'Livingston',
    city: 'Denham Springs',
    populationGrowth: 15.1,
    currentOvercrowding: 25,
    jobDemand: 'High',
    recommendedType: 'Vocational Training Center',
    rationale: 'Industrial corridor growth with critical shortage of trade-certified workers.'
  },
  {
    rank: 4,
    parish: 'Ascension',
    city: 'Gonzales',
    populationGrowth: 18.3,
    currentOvercrowding: 20,
    jobDemand: 'Very High',
    recommendedType: 'STEM Academy',
    rationale: 'Petrochemical industry hub needing engineering pipeline. High income area can support premium programs.'
  },
  {
    rank: 5,
    parish: 'St. Tammany',
    city: 'Covington',
    populationGrowth: 9.8,
    currentOvercrowding: 15,
    jobDemand: 'Medium',
    recommendedType: 'Healthcare Training Facility',
    rationale: 'Aging population driving healthcare demand. Current facilities at 95% capacity.'
  },
];

// Sample AI chat responses
export const sampleChatResponses = {
  delta: {
    content: `Based on my analysis of the Delta region parishes, **Madison, Tensas, and Concordia** parishes show the highest need for STEM funding. These parishes have:\n\n- Poverty rates exceeding 28%\n- School performance scores below state average\n- Limited access to technical training programs\n- Growing healthcare workforce demand\n\nI've highlighted these parishes on the map for your review.`,
    parishes: ['Madison', 'Tensas', 'Concordia'],
    policyCard: {
      title: 'Delta Region STEM Investment Analysis',
      summary: 'Critical need for STEM infrastructure in high-poverty Delta parishes with emerging healthcare sector growth.',
      parishes: ['Madison', 'Tensas', 'Concordia'],
      recommendation: 'Prioritize mobile STEM labs and partnership programs with regional hospitals for healthcare training pipelines.'
    }
  },
  stem: {
    content: `Looking at STEM funding needs across Louisiana, the parishes with the highest priority are:\n\n1. **Calcasieu** - 96% workforce alignment with LNG expansion\n2. **East Baton Rouge** - Major petrochemical corridor needs\n3. **Orleans** - Tech sector growth outpacing graduates\n\nThese areas show strong ROI potential due to existing industry partnerships.`,
    parishes: ['Calcasieu', 'East Baton Rouge', 'Orleans'],
    policyCard: {
      title: 'STEM Investment Priority Report',
      summary: 'Three parishes show exceptional ROI potential for STEM investments due to industry alignment and workforce demand.',
      parishes: ['Calcasieu', 'East Baton Rouge', 'Orleans'],
      recommendation: 'Focus on industry-certified programs in process technology, petrochemical engineering, and software development.'
    }
  },
  healthcare: {
    content: `Healthcare workforce gaps are most severe in:\n\n- **Caddo Parish** (Shreveport) - 24% nursing shortage\n- **Orleans Parish** - Critical care staff deficit\n- **Ouachita Parish** - Rural healthcare access crisis\n\nThese parishes need immediate investment in nursing programs and healthcare training facilities.`,
    parishes: ['Caddo', 'Orleans', 'Ouachita'],
    policyCard: {
      title: 'Healthcare Workforce Crisis Report',
      summary: 'Three parishes face critical healthcare workforce shortages requiring immediate educational intervention.',
      parishes: ['Caddo', 'Orleans', 'Ouachita'],
      recommendation: 'Establish accelerated nursing programs and offer tuition forgiveness for graduates who commit to serving in underserved areas.'
    }
  },
  default: {
    content: `I can help you analyze Louisiana education data. Try asking about:\n\n- Which parishes need the most STEM funding?\n- Where are healthcare workforce gaps most severe?\n- What are the best locations for new schools?\n- Which regions have the highest dropout rates?`,
    parishes: []
  }
};

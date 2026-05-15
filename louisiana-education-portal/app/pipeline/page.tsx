'use client'

import Link from 'next/link'
import { GraduationCap, ArrowLeft, ArrowRight, MapPin, Users, TrendingUp, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

// Pipeline flow data
const pipelineStages = [
  { name: 'K-12 Students', value: 487650, color: 'var(--chart-1)' },
  { name: 'HS Graduates', value: 142000, color: 'var(--chart-2)', dropoff: 71 },
  { name: 'Higher Ed Enrolled', value: 98000, color: 'var(--chart-5)', dropoff: 31 },
  { name: 'Completers', value: 51200, color: 'var(--chart-4)', dropoff: 48 },
  { name: 'Local Workforce', value: 44000, color: 'var(--primary)', dropoff: 14 },
]

// Industry destination data
const industryDestinations = [
  { name: 'Healthcare', graduates: 12500, demand: 15420, gap: -2920, color: 'var(--chart-3)' },
  { name: 'Petrochemical', graduates: 8200, demand: 8750, gap: -550, color: 'var(--chart-2)' },
  { name: 'Information Tech', graduates: 3600, demand: 6200, gap: -2600, color: 'var(--chart-3)' },
  { name: 'Manufacturing', graduates: 4100, demand: 4800, gap: -700, color: 'var(--chart-2)' },
  { name: 'Construction', graduates: 5200, demand: 7200, gap: -2000, color: 'var(--chart-3)' },
  { name: 'Education', graduates: 5400, demand: 4500, gap: 900, color: 'var(--chart-1)' },
]

// Top expansion locations
const expansionLocations = [
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
]

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">Pipeline & Expansion View</span>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Section: Pipeline Visualization */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">The Leaky Bucket: Student-to-Workforce Pipeline</h2>
              <p className="text-muted-foreground">Identifying drop-off zones where Louisiana loses talent</p>
            </div>
            
            {/* Sankey-style Flow Visualization */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  {/* Pipeline Stages */}
                  <div className="flex items-center justify-between gap-2">
                    {pipelineStages.map((stage, index) => (
                      <div key={stage.name} className="flex-1 flex flex-col items-center">
                        {/* Stage Box */}
                        <div 
                          className="w-full rounded-lg p-4 text-center border-2"
                          style={{ 
                            borderColor: stage.color,
                            backgroundColor: `color-mix(in srgb, ${stage.color} 10%, transparent)`
                          }}
                        >
                          <div className="text-2xl font-bold text-foreground">{(stage.value / 1000).toFixed(0)}K</div>
                          <div className="text-xs text-muted-foreground mt-1">{stage.name}</div>
                        </div>
                        
                        {/* Drop-off indicator */}
                        {stage.dropoff && (
                          <div className="mt-2 text-center">
                            <div className="text-xs font-bold text-chart-3">-{stage.dropoff}%</div>
                            <div className="text-[10px] text-muted-foreground">drop-off</div>
                          </div>
                        )}
                        
                        {/* Arrow between stages */}
                        {index < pipelineStages.length - 1 && (
                          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${(index + 1) * 20 - 2}%` }}>
                            <ArrowRight className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Flow Lines - SVG Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--chart-1)" />
                        <stop offset="100%" stopColor="var(--primary)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Key Insight */}
                <div className="mt-6 p-4 rounded-lg bg-chart-3/10 border border-chart-3/30">
                  <p className="text-sm font-medium text-chart-3">
                    Critical Insight: 71% of K-12 students never reach higher education. The largest drop-off occurs between high school and college enrollment, representing ~345,000 potential workers annually.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Section: Industry Flow */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">Workforce Destination Analysis</h2>
              <p className="text-muted-foreground">Where graduates go vs. where they are needed</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industryDestinations.map((industry) => (
                <Card key={industry.name}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between">
                      {industry.name}
                      <span className={`text-sm font-bold ${industry.gap >= 0 ? 'text-chart-1' : 'text-chart-3'}`}>
                        {industry.gap >= 0 ? '+' : ''}{industry.gap.toLocaleString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Graduates Placed</span>
                        <span className="text-foreground">{industry.graduates.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Industry Demand</span>
                        <span className="text-foreground">{industry.demand.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden mt-3">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${Math.min((industry.graduates / industry.demand) * 100, 100)}%`,
                            backgroundColor: industry.color
                          }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {Math.round((industry.graduates / industry.demand) * 100)}% of demand met
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Section: Expansion Recommender */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">Expansion Recommender: Top 5 Locations for New Schools</h2>
              <p className="text-muted-foreground">Based on population growth, overcrowding data, and job demand analysis</p>
            </div>
            
            <div className="space-y-4">
              {expansionLocations.map((location) => (
                <Card key={location.rank} className="transition-all hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Rank Badge */}
                      <div className="flex items-center justify-center">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg ${
                          location.rank === 1 ? 'bg-chart-1 text-primary-foreground' :
                          location.rank === 2 ? 'bg-chart-2 text-primary-foreground' :
                          'bg-secondary text-foreground'
                        }`}>
                          #{location.rank}
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{location.city}, {location.parish} Parish</h3>
                            <p className="text-sm text-primary font-medium">{location.recommendedType}</p>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-chart-1" />
                              <span className="text-foreground">+{location.populationGrowth}% growth</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4 text-chart-3" />
                              <span className="text-foreground">{location.currentOvercrowding}% overcrowded</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{location.rationale}</p>
                      </div>
                      
                      {/* Action */}
                      <div className="flex items-center">
                        <Link href="/intake">
                          <Button variant="outline" size="sm" className="gap-2">
                            <MapPin className="h-4 w-4" />
                            Invest Here
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Heatmap Overlay Info */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Demand-Access Gap Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Our heatmap analysis shows 12 parishes where job demand is highest but school access is lowest. 
                      These represent the most impactful investment opportunities for new educational facilities.
                    </p>
                  </div>
                </div>
                <Link href="/dashboard">
                  <Button className="gap-2">
                    View Full Map
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

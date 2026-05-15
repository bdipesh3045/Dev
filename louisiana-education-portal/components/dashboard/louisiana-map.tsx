'use client'

import { parishes } from '@/lib/data'
import { useAppStore } from '@/lib/store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

// Louisiana parish data with poverty and performance metrics
const parishData: Record<string, { poverty: number; performance: number; population: number }> = {
  'Orleans': { poverty: 23.8, performance: 72, population: 383997 },
  'East Baton Rouge': { poverty: 18.2, performance: 78, population: 456781 },
  'Jefferson': { poverty: 15.4, performance: 75, population: 440781 },
  'Calcasieu': { poverty: 16.8, performance: 68, population: 216785 },
  'Caddo': { poverty: 24.1, performance: 65, population: 243243 },
  'Lafayette': { poverty: 14.2, performance: 82, population: 244390 },
  'Ouachita': { poverty: 22.5, performance: 64, population: 158765 },
  'Rapides': { poverty: 19.8, performance: 67, population: 131546 },
  'Terrebonne': { poverty: 17.5, performance: 63, population: 110461 },
  'Tangipahoa': { poverty: 21.2, performance: 61, population: 134758 }
}

// Position mapping for parishes on simplified map
const parishPositions: Record<string, { x: number; y: number }> = {
  'Orleans': { x: 320, y: 220 },
  'East Baton Rouge': { x: 260, y: 180 },
  'Jefferson': { x: 300, y: 235 },
  'Calcasieu': { x: 100, y: 200 },
  'Caddo': { x: 80, y: 80 },
  'Lafayette': { x: 200, y: 200 },
  'Ouachita': { x: 170, y: 90 },
  'Rapides': { x: 160, y: 140 },
  'Terrebonne': { x: 280, y: 255 },
  'Tangipahoa': { x: 310, y: 180 }
}

function getBivariateColor(poverty: number, performance: number): string {
  // High poverty (>20%), low performance (<70) = red
  // Low poverty (<16%), high performance (>75) = teal
  // Mixed = yellow/amber
  const highPoverty = poverty > 20
  const lowPerformance = performance < 70
  
  if (highPoverty && lowPerformance) return 'var(--chart-3)' // Red - critical
  if (!highPoverty && !lowPerformance) return 'var(--chart-1)' // Teal - opportunity
  return 'var(--chart-2)' // Yellow - mixed
}

function getOpportunityColor(score: number): string {
  if (score >= 90) return 'var(--chart-1)'
  if (score >= 85) return 'var(--chart-2)'
  return 'var(--chart-5)'
}

export function LouisianaMap() {
  const { bivariateMode, setBivariateMode, selectedParish, setSelectedParish, highlightedParishes } = useAppStore()
  
  const handleParishClick = (parishName: string) => {
    setSelectedParish({ name: parishName, isOpen: true })
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h3 className="font-semibold text-foreground">Parish Intelligence Map</h3>
          <p className="text-sm text-muted-foreground">
            {bivariateMode ? 'Bivariate: Poverty Index vs School Performance' : 'Regional opportunity scores'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="bivariate-mode"
            checked={bivariateMode}
            onCheckedChange={setBivariateMode}
          />
          <Label htmlFor="bivariate-mode" className="text-sm cursor-pointer">Bivariate</Label>
        </div>
      </div>
      <div className="p-4">
        {/* Map visualization */}
        <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-lg bg-secondary/30">
          <svg viewBox="0 0 400 300" className="h-full w-full">
            {/* Louisiana outline */}
            <path
              d="M50,100 L80,80 L120,70 L160,60 L200,55 L250,60 L290,70 L320,90 L350,110 
                 L360,140 L355,170 L340,200 L320,220 L290,235 L250,245 L200,250 
                 L150,245 L100,235 L70,220 L50,200 L40,170 L35,140 Z"
              fill="var(--secondary)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            
            {/* Parish markers */}
            {parishes.map((parish) => {
              const pos = parishPositions[parish.name] || { x: 200, y: 150 }
              const data = parishData[parish.name] || { poverty: 18, performance: 70 }
              const isHighlighted = highlightedParishes.includes(parish.name)
              const isSelected = selectedParish?.name === parish.name
              
              const color = bivariateMode 
                ? getBivariateColor(data.poverty, data.performance)
                : getOpportunityColor(parish.opportunityScore)
              
              const size = isHighlighted || isSelected ? 16 : parish.opportunityScore >= 85 ? 12 : 10
              
              return (
                <g key={parish.name} onClick={() => handleParishClick(parish.name)} className="cursor-pointer">
                  {/* Glow effect for highlighted parishes */}
                  {(isHighlighted || isSelected) && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size + 6}
                      fill={color}
                      opacity={0.3}
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={size}
                    fill={color}
                    stroke={isSelected ? 'var(--foreground)' : 'transparent'}
                    strokeWidth={2}
                    className="transition-all hover:opacity-80"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + size + 12}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[9px] font-medium pointer-events-none"
                  >
                    {parish.name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          {bivariateMode ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">High Poverty + Low Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">Mixed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">Low Poverty + High Performance</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">High Opportunity (90+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">Good (85-89)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-5" />
                <span className="text-muted-foreground">Moderate (&lt;85)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useAppStore } from '@/lib/store'
import { parishes, schools } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { X, DollarSign, Users, TrendingUp, Building } from 'lucide-react'

// Parish specific needs data
const parishNeeds: Record<string, { needs: string[]; topSectors: string[]; urgentPrograms: string[] }> = {
  'Orleans': {
    needs: ['Healthcare workforce expansion', 'Tech bootcamp funding', 'Early childhood facilities'],
    topSectors: ['Healthcare', 'Hospitality', 'Tech'],
    urgentPrograms: ['Nursing', 'Software Development', 'Culinary Arts']
  },
  'East Baton Rouge': {
    needs: ['STEM lab equipment', 'Teacher retention bonuses', 'Transportation infrastructure'],
    topSectors: ['Petrochemical', 'Healthcare', 'Government'],
    urgentPrograms: ['Chemical Engineering', 'Public Administration', 'Nursing']
  },
  'Jefferson': {
    needs: ['Vocational training centers', 'Dual enrollment expansion', 'Career counseling'],
    topSectors: ['Aerospace', 'Healthcare', 'Retail'],
    urgentPrograms: ['Aviation Maintenance', 'Medical Coding', 'Business Admin']
  },
  'Calcasieu': {
    needs: ['Industrial tech equipment', 'LNG workforce training', 'Safety certification programs'],
    topSectors: ['Petrochemical', 'LNG', 'Manufacturing'],
    urgentPrograms: ['Process Technology', 'Welding', 'Industrial Maintenance']
  },
  'Caddo': {
    needs: ['Healthcare simulation labs', 'IT infrastructure', 'Rural outreach programs'],
    topSectors: ['Healthcare', 'Gaming', 'Manufacturing'],
    urgentPrograms: ['Nursing', 'Cybersecurity', 'Medical Imaging']
  },
  'Lafayette': {
    needs: ['Energy technology programs', 'Entrepreneurship centers', 'Research facilities'],
    topSectors: ['Oil & Gas', 'Tech', 'Healthcare'],
    urgentPrograms: ['Petroleum Engineering', 'Computer Science', 'Healthcare Admin']
  }
}

export function ParishDrawer() {
  const { selectedParish, setSelectedParish } = useAppStore()
  
  if (!selectedParish?.isOpen) return null
  
  const parish = parishes.find(p => p.name === selectedParish.name)
  const needs = parishNeeds[selectedParish.name] || {
    needs: ['General education funding', 'Infrastructure improvements'],
    topSectors: ['Healthcare', 'Education'],
    urgentPrograms: ['General Studies']
  }
  
  const parishSchools = schools.filter(s => s.parish === selectedParish.name)
  
  if (!parish) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l border-border shadow-2xl overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">{parish.name} Parish</h2>
          <p className="text-sm text-muted-foreground">Detailed Analysis</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setSelectedParish(null)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Population</span>
            </div>
            <div className="text-lg font-bold text-foreground">{parish.population.toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Opportunity Score</span>
            </div>
            <div className={`text-lg font-bold ${parish.opportunityScore >= 85 ? 'text-chart-1' : 'text-chart-2'}`}>
              {parish.opportunityScore}/100
            </div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Median Income</span>
            </div>
            <div className="text-lg font-bold text-foreground">${parish.medianIncome.toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Building className="h-4 w-4" />
              <span className="text-xs">Education Gap</span>
            </div>
            <div className={`text-lg font-bold ${parish.educationGap > 15 ? 'text-chart-3' : 'text-chart-1'}`}>
              {parish.educationGap}%
            </div>
          </div>
        </div>
        
        {/* Specific Needs */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Specific Needs</h3>
          <ul className="space-y-2">
            {needs.needs.map((need, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {need}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Top Sectors */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Workforce Demand Sectors</h3>
          <div className="flex flex-wrap gap-2">
            {needs.topSectors.map((sector, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {sector}
              </span>
            ))}
          </div>
        </div>
        
        {/* Urgent Programs */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Urgent Program Needs</h3>
          <div className="flex flex-wrap gap-2">
            {needs.urgentPrograms.map((program, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-chart-3/10 text-chart-3 text-xs font-medium">
                {program}
              </span>
            ))}
          </div>
        </div>
        
        {/* Local Schools */}
        {parishSchools.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Institutions in Parish</h3>
            <div className="space-y-2">
              {parishSchools.map((school) => (
                <div key={school.id} className="rounded-lg bg-secondary/50 p-3">
                  <div className="font-medium text-foreground text-sm">{school.name}</div>
                  <div className="text-xs text-muted-foreground">{school.type} • {school.enrollment.toLocaleString()} students</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Funding Need:</span>
                    <span className="font-medium text-chart-3">${(school.fundingNeeds / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <Button className="w-full gap-2" size="lg">
          <DollarSign className="h-4 w-4" />
          Allocate Funds to {parish.name}
        </Button>
      </div>
    </div>
  )
}

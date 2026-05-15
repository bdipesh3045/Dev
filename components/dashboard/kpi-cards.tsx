'use client'

import { Card, CardContent } from '@/components/ui/card'
import { kpiData } from '@/lib/data'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  DollarSign,
  Building2,
  Target
} from 'lucide-react'

const kpis = [
  {
    label: 'Total Schools',
    value: formatNumber(kpiData.totalSchools),
    icon: Building2,
    change: '+12',
    changeLabel: 'from last year',
    color: 'text-primary'
  },
  {
    label: 'Student Enrollment',
    value: formatNumber(kpiData.totalEnrollment),
    icon: Users,
    change: '+1.2%',
    changeLabel: 'growth rate',
    color: 'text-chart-2'
  },
  {
    label: 'Graduation Rate',
    value: `${kpiData.avgGraduationRate}%`,
    icon: GraduationCap,
    change: '+2.1%',
    changeLabel: 'improvement',
    color: 'text-success'
  },
  {
    label: 'Opportunity Score',
    value: kpiData.avgOpportunityScore,
    icon: Target,
    change: '+5',
    changeLabel: 'points increase',
    color: 'text-chart-4'
  },
  {
    label: 'Workforce Gap',
    value: `${kpiData.workforceGap}%`,
    icon: TrendingUp,
    change: '-3%',
    changeLabel: 'reduction',
    color: 'text-chart-3'
  },
  {
    label: 'Funding Gap',
    value: formatCurrency(kpiData.totalFundingGap * 1e9),
    icon: DollarSign,
    change: '-$200M',
    changeLabel: 'closed this year',
    color: 'text-warning'
  }
]

export function KPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.label} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg bg-secondary ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className={kpi.change.startsWith('-') && kpi.label !== 'Workforce Gap' ? 'text-destructive' : 'text-success'}>
                  {kpi.change}
                </span>
                <span className="text-muted-foreground">{kpi.changeLabel}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

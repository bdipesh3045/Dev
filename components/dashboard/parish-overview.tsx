'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { parishes } from '@/lib/data'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { MapPin } from 'lucide-react'

const gradeColors = {
  A: 'bg-success text-success-foreground',
  B: 'bg-chart-1 text-primary-foreground',
  C: 'bg-warning text-warning-foreground',
  D: 'bg-chart-3 text-destructive-foreground',
  F: 'bg-destructive text-destructive-foreground'
}

export function ParishOverview() {
  // Sort parishes by opportunity score
  const sortedParishes = [...parishes].sort((a, b) => b.opportunityScore - a.opportunityScore)

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">Top Parishes by Opportunity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedParishes.slice(0, 6).map((parish) => (
            <div key={parish.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{parish.name}</span>
                  <Badge className={`text-[10px] px-1.5 py-0 ${gradeColors[parish.performanceGrade]}`}>
                    Grade {parish.performanceGrade}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatNumber(parish.k12Students)} students</span>
                  <span className="font-medium text-foreground">{parish.opportunityScore}</span>
                </div>
              </div>
              <Progress value={parish.opportunityScore} className="h-1.5" />
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span>Income: {formatCurrency(parish.medianIncome)}</span>
                <span>Unemployment: {parish.unemploymentRate}%</span>
                <span className="text-primary">Demand: {parish.workforceDemand.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

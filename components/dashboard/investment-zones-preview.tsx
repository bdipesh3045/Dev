'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { investmentZones } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, Clock, Shield } from 'lucide-react'

const riskColors = {
  Low: 'bg-success/10 text-success border-success/20',
  Medium: 'bg-warning/10 text-warning border-warning/20',
  High: 'bg-destructive/10 text-destructive border-destructive/20'
}

export function InvestmentZonesPreview() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">Top Investment Zones</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {investmentZones.slice(0, 3).map((zone) => (
            <div
              key={zone.id}
              className="p-3 rounded-lg border bg-card/50 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium">{zone.parish}</h4>
                  <p className="text-xs text-muted-foreground">{zone.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{zone.potentialROI}x</p>
                  <p className="text-[10px] text-muted-foreground">ROI</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Badge variant="outline" className={riskColors[zone.riskLevel as keyof typeof riskColors]}>
                  <Shield className="h-2.5 w-2.5 mr-1" />
                  {zone.riskLevel}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  {zone.timeline}
                </Badge>
                <span className="ml-auto text-muted-foreground">
                  {formatCurrency(zone.investmentNeeded)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

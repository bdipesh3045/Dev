'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { aiInsights } from '@/lib/data'
import { Lightbulb, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react'

const typeConfig = {
  opportunity: {
    icon: Lightbulb,
    color: 'bg-success/10 text-success border-success/20'
  },
  alert: {
    icon: AlertTriangle,
    color: 'bg-warning/10 text-warning border-warning/20'
  },
  trend: {
    icon: TrendingUp,
    color: 'bg-primary/10 text-primary border-primary/20'
  }
}

const priorityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-muted text-muted-foreground'
}

export function AIInsightsPanel() {
  return (
    <Card className="row-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <CardTitle className="text-base font-medium">AI Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[340px] px-4 pb-4">
          <div className="space-y-3">
            {aiInsights.map((insight) => {
              const config = typeConfig[insight.type]
              const Icon = config.icon
              return (
                <div
                  key={insight.id}
                  className="p-3 rounded-lg border bg-card/50 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-md ${config.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium truncate">
                          {insight.title}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] px-1.5 py-0 ${priorityColors[insight.priority]}`}
                        >
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

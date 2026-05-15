'use client'

import { aiInsights } from '@/lib/data'
import { Lightbulb, AlertCircle, TrendingUp, Sparkles } from 'lucide-react'

export function AIInsightCards() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Lightbulb className="h-5 w-5" />
      case 'alert':
        return <AlertCircle className="h-5 w-5" />
      case 'trend':
        return <TrendingUp className="h-5 w-5" />
      default:
        return <Sparkles className="h-5 w-5" />
    }
  }

  const getColors = (type: string, priority: string) => {
    if (priority === 'high') {
      return {
        bg: 'bg-chart-1/10',
        border: 'border-chart-1/30',
        icon: 'text-chart-1',
        badge: 'bg-chart-1/20 text-chart-1'
      }
    }
    return {
      bg: 'bg-chart-2/10',
      border: 'border-chart-2/30',
      icon: 'text-chart-2',
      badge: 'bg-chart-2/20 text-chart-2'
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI-Powered Insights</h3>
          <p className="text-xs text-muted-foreground">Intelligence recommendations</p>
        </div>
      </div>
      <div className="divide-y divide-border">
        {aiInsights.map((insight) => {
          const colors = getColors(insight.type, insight.priority)
          return (
            <div
              key={insight.id}
              className={`p-4 transition-colors hover:${colors.bg}`}
            >
              <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${colors.bg}`}>
                  <span className={colors.icon}>{getIcon(insight.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{insight.title}</h4>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                      {insight.priority === 'high' ? 'High Priority' : 'Medium'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

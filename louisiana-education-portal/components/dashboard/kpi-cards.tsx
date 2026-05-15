'use client'

import { kpiData, enrollmentTrend } from '@/lib/data'
import { TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, AlertTriangle, Target, BarChart3 } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer } from 'recharts'

// Generate sparkline data from enrollment trend
const enrollmentSparkline = enrollmentTrend.map((d, i) => ({ v: d.enrollment / 1000 }))
const graduateSparkline = enrollmentTrend.map((d, i) => ({ v: d.graduates / 1000 }))
const opportunitySparkline = [{ v: 72 }, { v: 75 }, { v: 78 }, { v: 80 }, { v: 82 }, { v: 84 }]
const fundingSparkline = [{ v: 3.2 }, { v: 3.0 }, { v: 2.8 }, { v: 2.6 }, { v: 2.5 }, { v: 2.4 }]
const workforceSparkline = [{ v: 38 }, { v: 36 }, { v: 35 }, { v: 34 }, { v: 33 }, { v: 32 }]
const gradRateSparkline = [{ v: 42 }, { v: 44 }, { v: 45 }, { v: 46.5 }, { v: 47.2 }, { v: 48.5 }]

function Sparkline({ data, color = "var(--chart-1)", isPositive = true }: { data: { v: number }[], color?: string, isPositive?: boolean }) {
  return (
    <div className="h-8 w-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function KPICards() {
  const cards = [
    {
      title: 'Total Institutions',
      value: kpiData.totalSchools.toLocaleString(),
      change: '+3 this year',
      trend: 'up' as const,
      icon: <GraduationCap className="h-5 w-5" />,
      sparkline: enrollmentSparkline,
      color: 'var(--chart-1)'
    },
    {
      title: 'Total Enrollment',
      value: (kpiData.totalEnrollment / 1000).toFixed(0) + 'K',
      change: '+4.2% YoY',
      trend: 'up' as const,
      icon: <Users className="h-5 w-5" />,
      sparkline: enrollmentSparkline,
      color: 'var(--chart-1)'
    },
    {
      title: 'Avg Opportunity Score',
      value: kpiData.avgOpportunityScore + '/100',
      change: '+6 pts from 2024',
      trend: 'up' as const,
      icon: <Target className="h-5 w-5" />,
      sparkline: opportunitySparkline,
      color: 'var(--chart-1)'
    },
    {
      title: 'Funding Gap',
      value: '$' + kpiData.totalFundingGap + 'B',
      change: '-8% from last year',
      trend: 'down' as const,
      icon: <DollarSign className="h-5 w-5" />,
      sparkline: fundingSparkline,
      color: 'var(--chart-1)'
    },
    {
      title: 'Workforce Gap',
      value: kpiData.workforceGap + '%',
      change: 'Critical shortage',
      trend: 'alert' as const,
      icon: <AlertTriangle className="h-5 w-5" />,
      sparkline: workforceSparkline,
      color: 'var(--chart-3)'
    },
    {
      title: 'Avg Graduation Rate',
      value: kpiData.avgGraduationRate + '%',
      change: '+2.1% from 2024',
      trend: 'up' as const,
      icon: <BarChart3 className="h-5 w-5" />,
      sparkline: gradRateSparkline,
      color: 'var(--chart-1)'
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{card.icon}</span>
            <Sparkline data={card.sparkline} color={card.color} />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.title}</div>
          </div>
          <div className={`mt-2 flex items-center gap-1 text-xs ${
            card.trend === 'alert' ? 'text-chart-3' : 'text-chart-1'
          }`}>
            {card.trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {card.trend === 'down' && <TrendingDown className="h-3 w-3" />}
            {card.trend === 'alert' && <AlertTriangle className="h-3 w-3" />}
            {card.change}
          </div>
        </div>
      ))}
    </div>
  )
}

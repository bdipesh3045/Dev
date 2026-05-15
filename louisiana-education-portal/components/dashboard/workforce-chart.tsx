'use client'

import { workforceTrends } from '@/lib/data'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function WorkforceGapChart() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-foreground">Workforce Gap by Sector</h3>
        <p className="text-sm text-muted-foreground">Skills gap percentage vs workforce demand</p>
      </div>
      <div className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={workforceTrends}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} unit="%" />
              <YAxis 
                dataKey="sector" 
                type="category" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--foreground)'
                }}
                formatter={(value: number) => [`${value}%`, 'Skills Gap']}
              />
              <Bar dataKey="gapPercentage" radius={[0, 4, 4, 0]}>
                {workforceTrends.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.gapPercentage >= 40 ? 'var(--chart-3)' : entry.gapPercentage >= 30 ? 'var(--chart-2)' : 'var(--chart-1)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-chart-3" />
            <span className="text-muted-foreground">Critical (40%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-chart-2" />
            <span className="text-muted-foreground">Warning (30-39%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-chart-1" />
            <span className="text-muted-foreground">Moderate (&lt;30%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

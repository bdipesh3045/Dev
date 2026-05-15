'use client'

import { enrollmentTrend } from '@/lib/data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export function EnrollmentChart() {
  const formattedData = enrollmentTrend.map(item => ({
    ...item,
    enrollment: item.enrollment / 1000,
    graduates: item.graduates / 1000
  }))

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-foreground">Enrollment &amp; Graduate Trends</h3>
        <p className="text-sm text-muted-foreground">Historical data across Louisiana institutions</p>
      </div>
      <div className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="year" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickFormatter={(value) => `${value}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--foreground)'
                }}
                formatter={(value: number) => [`${value.toFixed(0)}K`, '']}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => <span className="text-muted-foreground text-sm">{value === 'enrollment' ? 'Total Enrollment' : 'Graduates'}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="enrollment" 
                stroke="var(--chart-1)" 
                strokeWidth={2}
                dot={{ fill: 'var(--chart-1)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--chart-1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="graduates" 
                stroke="var(--chart-2)" 
                strokeWidth={2}
                dot={{ fill: 'var(--chart-2)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--chart-2)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

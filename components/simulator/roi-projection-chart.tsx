"use client"

import { useAppStore } from "@/lib/store"
import { parishes, workforceTrends } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp } from "lucide-react"

function calculateProjections(
  amount: number,
  years: number,
  parishName: string | null,
  sectorName: string | null
) {
  // Base ROI factors
  let baseROI = 2.5
  let riskFactor = 1.0

  // Adjust based on parish opportunity score
  if (parishName) {
    const parish = parishes.find((p) => p.name === parishName)
    if (parish) {
      baseROI += (parish.opportunityScore - 80) * 0.02
      riskFactor *= 1 - parish.unemploymentRate * 0.02
    }
  }

  // Adjust based on sector growth
  if (sectorName) {
    const sector = workforceTrends.find((t) => t.sector === sectorName)
    if (sector) {
      baseROI += sector.growth * 0.03
      riskFactor *= 1 + sector.gapPercentage * 0.005
    }
  }

  // Generate year-by-year projections
  const projections = []
  for (let year = 0; year <= years; year++) {
    const conservativeGrowth = Math.pow(1 + (baseROI * 0.6) / 10, year)
    const expectedGrowth = Math.pow(1 + baseROI / 10, year)
    const optimisticGrowth = Math.pow(1 + (baseROI * 1.4) / 10, year)

    projections.push({
      year: `Year ${year}`,
      conservative: Math.round(amount * conservativeGrowth * riskFactor * 0.9),
      expected: Math.round(amount * expectedGrowth * riskFactor),
      optimistic: Math.round(amount * optimisticGrowth * riskFactor * 1.1),
    })
  }

  return {
    projections,
    finalROI: baseROI,
    riskFactor,
  }
}

function formatYAxis(value: number) {
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`
  if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`
  return `$${value}`
}

export function ROIProjectionChart() {
  const { investmentAmount, investmentYears, selectedParish, selectedSector } =
    useAppStore()

  const { projections, finalROI } = calculateProjections(
    investmentAmount,
    investmentYears,
    selectedParish,
    selectedSector
  )

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            ROI Projection
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Est. ROI: {finalROI.toFixed(1)}x over {investmentYears} years
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projections}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="optimistic" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="expected" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="conservative" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border/50"
              />
              <XAxis
                dataKey="year"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "",
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="optimistic"
                name="Optimistic"
                stroke="hsl(var(--chart-1))"
                fill="url(#optimistic)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expected"
                name="Expected"
                stroke="hsl(var(--primary))"
                fill="url(#expected)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="conservative"
                name="Conservative"
                stroke="hsl(var(--chart-3))"
                fill="url(#conservative)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useAppStore } from "@/lib/store"
import { parishes, workforceTrends } from "@/lib/data"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  Users,
  Briefcase,
  Building2,
  TrendingUp,
  Target,
} from "lucide-react"

function calculateImpact(
  amount: number,
  years: number,
  parishName: string | null,
  sectorName: string | null
) {
  // Calculate various impact metrics based on investment parameters
  const baseMultiplier = amount / 1000000 // Per million invested

  // Students trained per year
  const studentsPerYear = Math.round(baseMultiplier * 150 * (years * 0.3 + 0.7))

  // Jobs created
  const jobsCreated = Math.round(baseMultiplier * 45 * years * 0.4)

  // Programs funded
  const programsFunded = Math.round(baseMultiplier * 3 + years * 0.5)

  // Facilities upgraded
  const facilitiesUpgraded = Math.round(baseMultiplier * 1.5 + 1)

  // Workforce gap reduction
  let gapReduction = Math.min(baseMultiplier * 2 * years, 35)

  // Economic multiplier effect
  const economicMultiplier = 2.4 + years * 0.15

  // Adjust based on parish if selected
  if (parishName) {
    const parish = parishes.find((p) => p.name === parishName)
    if (parish) {
      gapReduction *= 1 + (parish.educationGap / 100)
    }
  }

  // Adjust based on sector if selected
  if (sectorName) {
    const sector = workforceTrends.find((t) => t.sector === sectorName)
    if (sector) {
      gapReduction *= 1 + (sector.gapPercentage / 100) * 0.5
    }
  }

  return {
    studentsPerYear,
    totalStudents: studentsPerYear * years,
    jobsCreated,
    programsFunded,
    facilitiesUpgraded,
    gapReduction: Math.min(gapReduction, 50),
    economicMultiplier,
    totalEconomicImpact: amount * economicMultiplier,
  }
}

export function ImpactBreakdown() {
  const { investmentAmount, investmentYears, selectedParish, selectedSector } =
    useAppStore()

  const impact = calculateImpact(
    investmentAmount,
    investmentYears,
    selectedParish,
    selectedSector
  )

  const impactMetrics = [
    {
      label: "Students Trained",
      value: formatNumber(impact.totalStudents),
      subtext: `${formatNumber(impact.studentsPerYear)}/year`,
      icon: GraduationCap,
      progress: Math.min((impact.totalStudents / 10000) * 100, 100),
      color: "text-primary",
    },
    {
      label: "Jobs Created",
      value: formatNumber(impact.jobsCreated),
      subtext: "Direct employment",
      icon: Users,
      progress: Math.min((impact.jobsCreated / 500) * 100, 100),
      color: "text-chart-1",
    },
    {
      label: "Programs Funded",
      value: impact.programsFunded.toString(),
      subtext: "New or expanded",
      icon: Briefcase,
      progress: Math.min((impact.programsFunded / 20) * 100, 100),
      color: "text-chart-2",
    },
    {
      label: "Facilities Upgraded",
      value: impact.facilitiesUpgraded.toString(),
      subtext: "Labs & centers",
      icon: Building2,
      progress: Math.min((impact.facilitiesUpgraded / 15) * 100, 100),
      color: "text-chart-3",
    },
    {
      label: "Workforce Gap Reduction",
      value: `${impact.gapReduction.toFixed(1)}%`,
      subtext: "In target sector",
      icon: Target,
      progress: impact.gapReduction * 2,
      color: "text-chart-4",
    },
    {
      label: "Economic Multiplier",
      value: `${impact.economicMultiplier.toFixed(1)}x`,
      subtext: formatCurrency(impact.totalEconomicImpact),
      icon: TrendingUp,
      progress: (impact.economicMultiplier / 4) * 100,
      color: "text-chart-5",
    },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Projected Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {impactMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/30"
            >
              <div className={`p-2 rounded-lg bg-background ${metric.color}`}>
                <metric.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm text-muted-foreground truncate">
                    {metric.label}
                  </span>
                  <span className="text-lg font-bold">{metric.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                <Progress value={metric.progress} className="h-1 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

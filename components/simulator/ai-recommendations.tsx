"use client"

import { useAppStore } from "@/lib/store"
import { investmentZones, parishes, workforceTrends } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, TrendingUp, AlertTriangle, Clock } from "lucide-react"

function generateRecommendations(
  amount: number,
  years: number,
  parishName: string | null,
  sectorName: string | null
) {
  const recommendations: Array<{
    title: string
    description: string
    type: "opportunity" | "warning" | "insight"
    roi?: string
  }> = []

  // Sector-based recommendations
  if (sectorName) {
    const sector = workforceTrends.find((t) => t.sector === sectorName)
    if (sector) {
      if (sector.growth > 30) {
        recommendations.push({
          title: `High-Growth Sector: ${sectorName}`,
          description: `${sectorName} shows ${sector.growth}% YoY growth with ${sector.gapPercentage}% skills gap. Early investment could capture significant market share.`,
          type: "opportunity",
          roi: `${(2.5 + sector.growth * 0.05).toFixed(1)}x`,
        })
      }
      if (sector.gapPercentage > 40) {
        recommendations.push({
          title: "Critical Skills Gap",
          description: `${sectorName} has ${sector.gapPercentage}% workforce gap. Training programs could fill ${Math.round(amount / 50000)} positions over ${years} years.`,
          type: "insight",
        })
      }
    }
  } else {
    // General sector recommendations
    const topSector = [...workforceTrends].sort(
      (a, b) => b.growth - a.growth
    )[0]
    recommendations.push({
      title: `Consider ${topSector.sector} Sector`,
      description: `Fastest growing sector at ${topSector.growth}% YoY. Could maximize ROI for your ${formatCurrency(amount)} investment.`,
      type: "opportunity",
      roi: `${(2.5 + topSector.growth * 0.05).toFixed(1)}x`,
    })
  }

  // Parish-based recommendations
  if (parishName) {
    const parish = parishes.find((p) => p.name === parishName)
    if (parish) {
      if (parish.opportunityScore > 85) {
        recommendations.push({
          title: `${parishName}: High Opportunity Zone`,
          description: `Score of ${parish.opportunityScore} indicates strong workforce alignment. ${parish.workforceDemand.slice(0, 2).join(" & ")} sectors show highest demand.`,
          type: "opportunity",
        })
      }
      if (parish.unemploymentRate > 5) {
        recommendations.push({
          title: "Employment Impact Potential",
          description: `${parishName} has ${parish.unemploymentRate}% unemployment. Investment could create significant local employment impact.`,
          type: "insight",
        })
      }
    }
  } else {
    // Recommend top parish
    const topParish = [...parishes].sort(
      (a, b) => b.opportunityScore - a.opportunityScore
    )[0]
    recommendations.push({
      title: `Top Parish: ${topParish.name}`,
      description: `Highest opportunity score (${topParish.opportunityScore}) with demand in ${topParish.workforceDemand[0]}.`,
      type: "insight",
    })
  }

  // Timeline recommendations
  if (years < 3) {
    recommendations.push({
      title: "Short Timeline Advisory",
      description:
        "Programs under 3 years may have limited impact. Consider extending to 4-5 years for optimal workforce development outcomes.",
      type: "warning",
    })
  } else if (years >= 7) {
    recommendations.push({
      title: "Long-Term Commitment",
      description: `${years}-year timeline enables comprehensive program development, facility upgrades, and sustained workforce pipeline creation.`,
      type: "opportunity",
    })
  }

  // Investment size recommendations
  if (amount < 500000) {
    recommendations.push({
      title: "Micro-Investment Strategy",
      description:
        "Consider focusing on a single program or school partnership for maximum impact at this investment level.",
      type: "insight",
    })
  } else if (amount > 20000000) {
    recommendations.push({
      title: "Major Investment Opportunity",
      description:
        "Investment of this scale could fund a dedicated training center or multi-parish program with state-level impact.",
      type: "opportunity",
      roi: "3.5x+",
    })
  }

  // Add matching investment zones
  const matchingZones = investmentZones.filter((zone) => {
    if (parishName && zone.parish !== parishName) return false
    if (sectorName && !zone.sector.toLowerCase().includes(sectorName.toLowerCase().split(" ")[0]))
      return false
    return zone.investmentNeeded <= amount * 1.5
  })

  if (matchingZones.length > 0) {
    const zone = matchingZones[0]
    recommendations.push({
      title: `Pre-Identified Zone: ${zone.parish}`,
      description: `${zone.sector} opportunity with ${zone.potentialROI}x ROI potential. Risk level: ${zone.riskLevel}. Timeline: ${zone.timeline}.`,
      type: "opportunity",
      roi: `${zone.potentialROI}x`,
    })
  }

  return recommendations.slice(0, 5)
}

export function AIRecommendations() {
  const { investmentAmount, investmentYears, selectedParish, selectedSector } =
    useAppStore()

  const recommendations = generateRecommendations(
    investmentAmount,
    investmentYears,
    selectedParish,
    selectedSector
  )

  const getIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case "warning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getTypeStyles(rec.type)}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getIcon(rec.type)}
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                  </div>
                  {rec.roi && (
                    <Badge
                      variant="outline"
                      className="text-xs font-mono shrink-0"
                    >
                      {rec.roi} ROI
                    </Badge>
                  )}
                </div>
                <p className="text-sm mt-2 opacity-90">{rec.description}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

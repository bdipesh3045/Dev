"use client"

import { useAppStore } from "@/lib/store"
import { parishes, workforceTrends } from "@/lib/data"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DollarSign, Calendar, MapPin, Briefcase } from "lucide-react"

export function InvestmentControls() {
  const {
    investmentAmount,
    investmentYears,
    selectedParish,
    selectedSector,
    setInvestmentAmount,
    setInvestmentYears,
    setSelectedParish,
    setSelectedSector,
  } = useAppStore()

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Investment Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Investment Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Investment Amount</Label>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(investmentAmount)}
            </span>
          </div>
          <Slider
            value={[investmentAmount]}
            onValueChange={([value]) => setInvestmentAmount(value)}
            min={100000}
            max={50000000}
            step={100000}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$100K</span>
            <span>$50M</span>
          </div>
        </div>

        {/* Investment Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </Label>
            <span className="text-lg font-bold text-primary">
              {investmentYears} {investmentYears === 1 ? "Year" : "Years"}
            </span>
          </div>
          <Slider
            value={[investmentYears]}
            onValueChange={([value]) => setInvestmentYears(value)}
            min={1}
            max={10}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Year</span>
            <span>10 Years</span>
          </div>
        </div>

        {/* Parish Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Target Parish
          </Label>
          <Select
            value={selectedParish || "all"}
            onValueChange={(value) =>
              setSelectedParish(value === "all" ? null : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Parishes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Parishes</SelectItem>
              {parishes.map((parish) => (
                <SelectItem key={parish.name} value={parish.name}>
                  {parish.name} (Score: {parish.opportunityScore})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sector Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Target Sector
          </Label>
          <Select
            value={selectedSector || "all"}
            onValueChange={(value) =>
              setSelectedSector(value === "all" ? null : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {workforceTrends.map((trend) => (
                <SelectItem key={trend.sector} value={trend.sector}>
                  {trend.sector} (+{trend.growth}% growth)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

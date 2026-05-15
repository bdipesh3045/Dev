"use client"

import { useAppStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Send, RefreshCw } from "lucide-react"

export function SimulatorActions() {
  const {
    investmentAmount,
    investmentYears,
    selectedParish,
    selectedSector,
    setInvestmentAmount,
    setInvestmentYears,
    resetFilters,
  } = useAppStore()

  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      parameters: {
        investmentAmount,
        investmentYears,
        targetParish: selectedParish || "All Parishes",
        targetSector: selectedSector || "All Sectors",
      },
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `lalens-simulation-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setInvestmentAmount(1000000)
    setInvestmentYears(5)
    resetFilters()
  }

  return (
    <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              Ready to invest in Louisiana&apos;s future?
            </p>
            <p className="font-semibold">
              {formatCurrency(investmentAmount)} over {investmentYears} years
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" asChild>
              <a href="/intake">
                <Send className="h-4 w-4 mr-2" />
                Submit Interest
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

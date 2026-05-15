'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowLeft, Save, RotateCcw, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAppStore, calculateProjectedOutcome } from '@/lib/store'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// Historical data for chart
const historicalData = [
  { year: '2020', current: 42, projected: null },
  { year: '2021', current: 44, projected: null },
  { year: '2022', current: 45, projected: null },
  { year: '2023', current: 46.5, projected: null },
  { year: '2024', current: 47.2, projected: null },
  { year: '2025', current: 48.5, projected: null },
]

export default function SimulatorPage() {
  const { 
    stemAllocation, 
    teacherRetention, 
    infrastructure,
    setStemAllocation,
    setTeacherRetention,
    setInfrastructure,
    resetSimulation,
    saveScenario,
    savedScenarios
  } = useAppStore()
  
  const [scenarioName, setScenarioName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  
  const projectedOutcome = calculateProjectedOutcome(stemAllocation, teacherRetention, infrastructure)
  
  // Generate projection data
  const projectionData = [
    ...historicalData,
    { year: '2026', current: 48.5, projected: 48.5 + (projectedOutcome - 48.5) * 0.2 },
    { year: '2027', current: null, projected: 48.5 + (projectedOutcome - 48.5) * 0.4 },
    { year: '2028', current: null, projected: 48.5 + (projectedOutcome - 48.5) * 0.6 },
    { year: '2029', current: null, projected: 48.5 + (projectedOutcome - 48.5) * 0.8 },
    { year: '2030', current: null, projected: projectedOutcome },
  ]
  
  const handleSaveScenario = () => {
    if (scenarioName.trim()) {
      saveScenario(scenarioName)
      setScenarioName('')
      setShowSaveDialog(false)
    }
  }
  
  const totalAllocation = stemAllocation + teacherRetention + infrastructure

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">Grant Investment Simulator</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[400px,1fr]">
            {/* Left: Control Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Allocation Controls</span>
                    <span className={`ml-auto text-sm font-normal ${totalAllocation === 100 ? 'text-chart-1' : 'text-chart-3'}`}>
                      {totalAllocation}%
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Adjust grant allocations to model ROI outcomes. Total should equal 100%.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* STEM Allocation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">STEM Programs</label>
                      <span className="text-sm font-bold text-primary">{stemAllocation}%</span>
                    </div>
                    <Slider
                      value={[stemAllocation]}
                      onValueChange={([v]) => setStemAllocation(v)}
                      max={100}
                      step={5}
                      className="[&_[role=slider]]:bg-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Lab equipment, curriculum development, industry partnerships
                    </p>
                  </div>
                  
                  {/* Teacher Retention */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Teacher Retention Bonuses</label>
                      <span className="text-sm font-bold text-chart-2">{teacherRetention}%</span>
                    </div>
                    <Slider
                      value={[teacherRetention]}
                      onValueChange={([v]) => setTeacherRetention(v)}
                      max={100}
                      step={5}
                      className="[&_[role=slider]]:bg-chart-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Signing bonuses, housing subsidies, professional development
                    </p>
                  </div>
                  
                  {/* Infrastructure */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">Infrastructure</label>
                      <span className="text-sm font-bold text-chart-5">{infrastructure}%</span>
                    </div>
                    <Slider
                      value={[infrastructure]}
                      onValueChange={([v]) => setInfrastructure(v)}
                      max={100}
                      step={5}
                      className="[&_[role=slider]]:bg-chart-5"
                    />
                    <p className="text-xs text-muted-foreground">
                      Building renovations, technology upgrades, transportation
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button variant="outline" className="flex-1 gap-2" onClick={resetSimulation}>
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button className="flex-1 gap-2" onClick={() => setShowSaveDialog(true)}>
                      <Save className="h-4 w-4" />
                      Save Scenario
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Saved Scenarios */}
              {savedScenarios.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Saved Scenarios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {savedScenarios.slice(-3).map((scenario) => (
                      <div key={scenario.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <div>
                          <div className="text-sm font-medium text-foreground">{scenario.name}</div>
                          <div className="text-xs text-muted-foreground">
                            STEM: {scenario.stemAllocation}% | Retention: {scenario.teacherRetention}% | Infra: {scenario.infrastructure}%
                          </div>
                        </div>
                        <div className="text-sm font-bold text-chart-1">{scenario.projectedOutcome.toFixed(1)}%</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Right: Impact Projections */}
            <div className="space-y-6">
              {/* Projected Outcome */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact Projection: Graduation Rate</CardTitle>
                  <CardDescription>
                    Dashed line shows predicted outcome vs. current trend (solid line)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartContainer
                      config={{
                        current: { label: "Current Trend", color: "var(--muted-foreground)" },
                        projected: { label: "Projected Outcome", color: "var(--chart-1)" }
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={projectionData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis 
                            dataKey="year" 
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                          />
                          <YAxis 
                            domain={[40, 90]}
                            stroke="var(--muted-foreground)"
                            fontSize={12}
                            tickFormatter={(v) => `${v}%`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ReferenceLine y={48.5} stroke="var(--border)" strokeDasharray="5 5" label={{ value: 'Current Rate', position: 'right', fill: 'var(--muted-foreground)', fontSize: 10 }} />
                          <Line
                            type="monotone"
                            dataKey="current"
                            stroke="var(--muted-foreground)"
                            strokeWidth={2}
                            dot={{ fill: 'var(--muted-foreground)', r: 4 }}
                            connectNulls={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="projected"
                            stroke="var(--chart-1)"
                            strokeWidth={3}
                            strokeDasharray="8 4"
                            dot={{ fill: 'var(--chart-1)', r: 5 }}
                            connectNulls={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-chart-1">{projectedOutcome.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground mt-1">Projected Grad Rate (2030)</div>
                      <div className="text-xs text-chart-1 mt-2">
                        +{(projectedOutcome - 48.5).toFixed(1)} pts from current
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-chart-2">
                        {Math.round((projectedOutcome - 48.5) * 4876)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Additional Graduates/Year</div>
                      <div className="text-xs text-chart-2 mt-2">
                        Based on current enrollment
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-chart-5">
                        ${Math.round((projectedOutcome - 48.5) * 12.5)}M
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Est. Economic Impact</div>
                      <div className="text-xs text-chart-5 mt-2">
                        5-year cumulative
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Investor CTA */}
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground">Ready to invest in this scenario?</h3>
                        <p className="text-sm text-muted-foreground">
                          Save this configuration and connect with schools that match your investment profile.
                        </p>
                      </div>
                    </div>
                    <Link href="/intake">
                      <Button className="gap-2 shadow-lg shadow-primary/25">
                        <Save className="h-4 w-4" />
                        Contact Schools
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Save Scenario</CardTitle>
              <CardDescription>Give this scenario a name to save it for later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="e.g., High STEM Focus"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSaveScenario}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

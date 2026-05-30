import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft, Save, RotateCcw, Info } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import BrandLogo from "../components/BrandLogo";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Slider } from "../components/ui/Slider";
import { useAppStore, calculateProjectedOutcome } from "../store/appStore";

// Historical data for chart
const historicalData = [
  { year: '2020', current: 42, projected: null },
  { year: '2021', current: 44, projected: null },
  { year: '2022', current: 45, projected: null },
  { year: '2023', current: 46.5, projected: null },
  { year: '2024', current: 47.2, projected: null },
  { year: '2025', current: 48.5, projected: null },
];

export default function Simulator() {
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
  } = useAppStore();
  
  const [scenarioName, setScenarioName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const projectedOutcome = calculateProjectedOutcome(stemAllocation, teacherRetention, infrastructure);
  
  // Generate projection data
  const projectionData = [
    ...historicalData,
    { year: '2026', current: 48.5, projected: 48.5 + (projectedOutcome - 48.5) * 0.2 },
    { year: '2027', current: null, projected: 48.5 + (projectedOutcome - 48.5) * 0.4 },
    { year: '2028', current: null, projected: 48.5 + (projectedOutcome - 48.5) * 0.6 },
    { year: '2029', current: null, projected: 48.5 + (projectedOutcome - 48.5) * 0.8 },
    { year: '2030', current: null, projected: projectedOutcome },
  ];
  
  const handleSaveScenario = () => {
    if (scenarioName.trim()) {
      saveScenario(scenarioName);
      setScenarioName('');
      setShowSaveDialog(false);
    }
  };
  
  const totalAllocation = stemAllocation + teacherRetention + infrastructure;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <BrandLogo variant="nav" />
              <div>
                <span className="text-lg font-semibold text-gray-900">Grant Investment Simulator</span>
              </div>
            </div>
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
                    <span className={`ml-auto text-sm font-normal ${totalAllocation === 100 ? 'text-green-600' : 'text-red-500'}`}>
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
                      <label className="text-sm font-medium text-gray-900">STEM Programs</label>
                      <span className="text-sm font-bold text-purple-600">{stemAllocation}%</span>
                    </div>
                    <Slider
                      value={[stemAllocation]}
                      onValueChange={([v]) => setStemAllocation(v)}
                      max={100}
                      step={5}
                    />
                    <p className="text-xs text-gray-500">
                      Lab equipment, curriculum development, industry partnerships
                    </p>
                  </div>
                  
                  {/* Teacher Retention */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-900">Teacher Retention Bonuses</label>
                      <span className="text-sm font-bold text-cyan-600">{teacherRetention}%</span>
                    </div>
                    <Slider
                      value={[teacherRetention]}
                      onValueChange={([v]) => setTeacherRetention(v)}
                      max={100}
                      step={5}
                    />
                    <p className="text-xs text-gray-500">
                      Signing bonuses, housing subsidies, professional development
                    </p>
                  </div>
                  
                  {/* Infrastructure */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-900">Infrastructure</label>
                      <span className="text-sm font-bold text-amber-600">{infrastructure}%</span>
                    </div>
                    <Slider
                      value={[infrastructure]}
                      onValueChange={([v]) => setInfrastructure(v)}
                      max={100}
                      step={5}
                    />
                    <p className="text-xs text-gray-500">
                      Building renovations, technology upgrades, transportation
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
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
                      <div key={scenario.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{scenario.name}</div>
                          <div className="text-xs text-gray-500">
                            STEM: {scenario.stemAllocation}% | Retention: {scenario.teacherRetention}% | Infra: {scenario.infrastructure}%
                          </div>
                        </div>
                        <div className="text-sm font-bold text-green-600">{scenario.projectedOutcome.toFixed(1)}%</div>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={projectionData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <YAxis 
                          domain={[40, 90]}
                          stroke="#9ca3af"
                          fontSize={12}
                          tickFormatter={(v) => `${v}%`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value?.toFixed(1)}%`]}
                          contentStyle={{
                            background: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                          }}
                        />
                        <ReferenceLine y={48.5} stroke="#e5e7eb" strokeDasharray="5 5" />
                        <Line
                          type="monotone"
                          dataKey="current"
                          stroke="#9ca3af"
                          strokeWidth={2}
                          dot={{ fill: '#9ca3af', r: 4 }}
                          connectNulls={false}
                          name="Current Trend"
                        />
                        <Line
                          type="monotone"
                          dataKey="projected"
                          stroke="var(--purple)"
                          strokeWidth={3}
                          strokeDasharray="8 4"
                          dot={{ fill: 'var(--purple)', r: 5 }}
                          connectNulls={false}
                          name="Projected"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">{projectedOutcome.toFixed(1)}%</div>
                      <div className="text-sm text-gray-500 mt-1">Projected Grad Rate (2030)</div>
                      <div className="text-xs text-green-600 mt-2">
                        +{(projectedOutcome - 48.5).toFixed(1)} pts from current
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-cyan-600">
                        {Math.round((projectedOutcome - 48.5) * 4876).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Additional Graduates/Year</div>
                      <div className="text-xs text-cyan-600 mt-2">
                        Based on current enrollment
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-600">
                        ${Math.round((projectedOutcome - 48.5) * 12.5)}M
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Est. Economic Impact</div>
                      <div className="text-xs text-amber-600 mt-2">
                        5-year cumulative
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Investor CTA */}
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Ready to invest in this scenario?</h3>
                        <p className="text-sm text-gray-600">
                          Save this configuration and connect with schools that match your investment profile.
                        </p>
                      </div>
                    </div>
                    <Link to="/intake">
                      <Button className="gap-2 shadow-lg shadow-purple-500/25">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
  );
}

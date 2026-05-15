import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, TrendingUp, Building } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { pipelineStages, industryDestinations, expansionLocations } from "../data/portalData";

export default function Pipeline() {
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
                <span className="text-lg font-semibold text-gray-900">Pipeline & Expansion View</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Section: Pipeline Visualization */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">The Leaky Bucket: Student-to-Workforce Pipeline</h2>
              <p className="text-gray-500">Identifying drop-off zones where Louisiana loses talent</p>
            </div>
            
            {/* Sankey-style Flow Visualization */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  {/* Pipeline Stages */}
                  <div className="flex items-start justify-between gap-2">
                    {pipelineStages.map((stage, index) => (
                      <div key={stage.name} className="flex-1 flex flex-col items-center relative">
                        {/* Stage Box */}
                        <div 
                          className="w-full rounded-xl p-4 text-center border-2 transition-all hover:shadow-md"
                          style={{ 
                            borderColor: stage.color,
                            backgroundColor: `color-mix(in srgb, ${stage.color} 10%, transparent)`
                          }}
                        >
                          <div className="text-2xl font-bold text-gray-900">{(stage.value / 1000).toFixed(0)}K</div>
                          <div className="text-xs text-gray-600 mt-1">{stage.name}</div>
                        </div>
                        
                        {/* Drop-off indicator */}
                        {stage.dropoff && (
                          <div className="mt-2 text-center">
                            <div className="text-xs font-bold text-red-500">-{stage.dropoff}%</div>
                            <div className="text-[10px] text-gray-400">drop-off</div>
                          </div>
                        )}
                        
                        {/* Arrow between stages */}
                        {index < pipelineStages.length - 1 && (
                          <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                            <ArrowRight className="h-5 w-5 text-gray-300" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Key Insight */}
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-700">
                    Critical Insight: 71% of K-12 students never reach higher education. The largest drop-off occurs between high school and college enrollment, representing ~345,000 potential workers annually.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Section: Industry Flow */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Workforce Destination Analysis</h2>
              <p className="text-gray-500">Where graduates go vs. where they are needed</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industryDestinations.map((industry) => (
                <Card key={industry.name}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between">
                      {industry.name}
                      <span className={`text-sm font-bold ${industry.gap >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {industry.gap >= 0 ? '+' : ''}{industry.gap.toLocaleString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Graduates Placed</span>
                        <span className="text-gray-900">{industry.graduates.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Industry Demand</span>
                        <span className="text-gray-900">{industry.demand.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 overflow-hidden mt-3">
                        <div 
                          className="h-full transition-all rounded-full"
                          style={{ 
                            width: `${Math.min((industry.graduates / industry.demand) * 100, 100)}%`,
                            backgroundColor: industry.color
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        {Math.round((industry.graduates / industry.demand) * 100)}% of demand met
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Section: Expansion Recommender */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Expansion Recommender: Top 5 Locations for New Schools</h2>
              <p className="text-gray-500">Based on population growth, overcrowding data, and job demand analysis</p>
            </div>
            
            <div className="space-y-4">
              {expansionLocations.map((location) => (
                <Card key={location.rank} className="transition-all hover:border-purple-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Rank Badge */}
                      <div className="flex items-center justify-center">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-lg ${
                          location.rank === 1 ? 'bg-purple-500 text-white' :
                          location.rank === 2 ? 'bg-cyan-500 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          #{location.rank}
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{location.city}, {location.parish} Parish</h3>
                            <p className="text-sm text-purple-600 font-medium">{location.recommendedType}</p>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span className="text-gray-700">+{location.populationGrowth}% growth</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4 text-red-500" />
                              <span className="text-gray-700">{location.currentOvercrowding}% overcrowded</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{location.rationale}</p>
                      </div>
                      
                      {/* Action */}
                      <div className="flex items-center">
                        <Link to="/intake">
                          <Button variant="outline" size="sm" className="gap-2">
                            <MapPin className="h-4 w-4" />
                            Invest Here
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Heatmap Overlay Info */}
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Demand-Access Gap Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Our heatmap analysis shows 12 parishes where job demand is highest but school access is lowest. 
                      These represent the most impactful investment opportunities for new educational facilities.
                    </p>
                  </div>
                </div>
                <Link to="/dashboard">
                  <Button className="gap-2">
                    View Full Map
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

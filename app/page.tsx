import Link from 'next/link'
import { 
  BarChart3, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  MapPin, 
  ArrowRight,
  Building2,
  Brain,
  Lightbulb
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { kpiData } from '@/lib/data'
import { formatNumber, formatCurrency } from '@/lib/utils'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LALens</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Simulator
            </Link>
            <Link href="/pipeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pipeline
            </Link>
            <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              AI Chat
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/intake">Investor Intake</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-sm mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Louisiana K-12 Education Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
              Data-Driven Insights for{' '}
              <span className="text-primary">Education Investment</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Empowering investors, policymakers, and educators to identify high-impact 
              educational opportunities across Louisiana&apos;s 64 parishes through 
              real-time analytics and AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/simulator">
                  Try Investment Simulator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="py-4">
              <CardContent className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{formatNumber(kpiData.totalSchools)}</div>
                <div className="text-sm text-muted-foreground">Public Schools</div>
              </CardContent>
            </Card>
            <Card className="py-4">
              <CardContent className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-chart-2" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{formatNumber(kpiData.totalEnrollment)}</div>
                <div className="text-sm text-muted-foreground">Students Enrolled</div>
              </CardContent>
            </Card>
            <Card className="py-4">
              <CardContent className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-chart-3" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{kpiData.avgGraduationRate}%</div>
                <div className="text-sm text-muted-foreground">Graduation Rate</div>
              </CardContent>
            </Card>
            <Card className="py-4">
              <CardContent className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-chart-4/10 flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-chart-4" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{formatCurrency(kpiData.totalFundingGap * 1e9)}</div>
                <div className="text-sm text-muted-foreground">Funding Gap</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Education Analytics
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From parish-level insights to AI-powered investment recommendations, 
              LALens provides the tools you need to make informed decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Interactive Dashboard</CardTitle>
                <CardDescription>
                  Real-time visualization of enrollment trends, funding allocations, 
                  and workforce alignment across all 64 Louisiana parishes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  View Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center mb-2">
                  <Lightbulb className="w-5 h-5 text-chart-2" />
                </div>
                <CardTitle>Investment Simulator</CardTitle>
                <CardDescription>
                  Model potential ROI scenarios based on investment amount, 
                  parish selection, and sector focus with predictive analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/simulator" className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Try Simulator <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center mb-2">
                  <Brain className="w-5 h-5 text-chart-5" />
                </div>
                <CardTitle>AI Policy Chat</CardTitle>
                <CardDescription>
                  Get instant answers to policy questions, funding opportunities, 
                  and strategic recommendations powered by AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/chat" className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Start Chat <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join investors and policymakers who are using LALens to drive meaningful 
              change in Louisiana&apos;s education system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/intake">
                  Submit Investor Profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pipeline">
                  View Expansion Pipeline
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">LALens</span>
              <span className="text-muted-foreground text-sm">| Louisiana Education Intelligence Portal</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Empowering data-driven education decisions
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

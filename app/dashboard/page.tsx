import { KPICards } from '@/components/dashboard/kpi-cards'
import { EnrollmentChart } from '@/components/dashboard/enrollment-chart'
import { WorkforceChart } from '@/components/dashboard/workforce-chart'
import { AIInsightsPanel } from '@/components/dashboard/ai-insights-panel'
import { ParishOverview } from '@/components/dashboard/parish-overview'
import { InvestmentZonesPreview } from '@/components/dashboard/investment-zones-preview'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calculator, 
  FileText, 
  MessageSquare,
  Map
} from 'lucide-react'

export const metadata = {
  title: 'Dashboard | LALens',
  description: 'Louisiana K-12 Education Analytics Dashboard'
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
                <p className="text-xs text-muted-foreground">Louisiana K-12 Education Insights</p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <Link href="/simulator">
                <Button variant="ghost" size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Simulator
                </Button>
              </Link>
              <Link href="/pipeline">
                <Button variant="ghost" size="sm">
                  <Map className="h-4 w-4 mr-2" />
                  Pipeline
                </Button>
              </Link>
              <Link href="/intake">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Intake
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Chat
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* KPI Cards */}
          <section>
            <KPICards />
          </section>

          {/* Charts Row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EnrollmentChart />
            <WorkforceChart />
          </section>

          {/* Insights and Data Row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ParishOverview />
            <div className="space-y-6">
              <AIInsightsPanel />
              <InvestmentZonesPreview />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>LALens - Louisiana Education Analytics</p>
            <p>Data updated: May 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

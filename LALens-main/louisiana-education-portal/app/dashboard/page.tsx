import Link from 'next/link'
import { GraduationCap, ArrowLeft, Settings, Bell, Search, PieChart, MessageSquare, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { KPICards } from '@/components/dashboard/kpi-cards'
import { OpportunityTable } from '@/components/dashboard/opportunity-table'
import { AIInsightCards } from '@/components/dashboard/ai-insights'
import { WorkforceGapChart } from '@/components/dashboard/workforce-chart'
import { EnrollmentChart } from '@/components/dashboard/enrollment-chart'
import { FundingChart } from '@/components/dashboard/funding-chart'
import { LouisianaMap } from '@/components/dashboard/louisiana-map'
import { ParishDrawer } from '@/components/dashboard/parish-drawer'
import { ThemeToggle } from '@/components/theme-toggle'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">LA EdTech Intel</span>
                <span className="ml-2 hidden rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary sm:inline-block">
                  Dashboard
                </span>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/simulator">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <PieChart className="h-4 w-4" />
                Simulator
              </Button>
            </Link>
            <Link href="/pipeline">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                Pipeline
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </Button>
            </Link>
            <Link href="/intake">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Intake
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="mx-auto max-w-[1600px] space-y-6">
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-foreground">Opportunity Intelligence Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time insights on Louisiana education investment opportunities • Click any parish on the map for detailed analysis
            </p>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - 2/3 width */}
            <div className="space-y-6 lg:col-span-2">
              {/* Louisiana Map - Moved higher for prominence */}
              <LouisianaMap />
              
              {/* Opportunity Table */}
              <OpportunityTable />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* AI Insights */}
              <AIInsightCards />
              
              {/* Charts */}
              <EnrollmentChart />
              <WorkforceGapChart />
              <FundingChart />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="px-4 lg:px-6">
          <div className="mx-auto max-w-[1600px] flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              Louisiana Education Intelligence Portal • EdTech Challenge 2026
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/simulator" className="hover:text-foreground transition-colors">Simulator</Link>
              <Link href="/pipeline" className="hover:text-foreground transition-colors">Pipeline</Link>
              <Link href="/chat" className="hover:text-foreground transition-colors">AI Chat</Link>
              <Link href="/intake" className="hover:text-foreground transition-colors">Investor Intake</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Data updated: May 15, 2026
            </p>
          </div>
        </div>
      </footer>
      
      {/* Parish Drawer */}
      <ParishDrawer />
    </div>
  )
}

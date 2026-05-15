import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { InvestmentControls } from "@/components/simulator/investment-controls"
import { ROIProjectionChart } from "@/components/simulator/roi-projection-chart"
import { ImpactBreakdown } from "@/components/simulator/impact-breakdown"
import { AIRecommendations } from "@/components/simulator/ai-recommendations"
import { SimulatorActions } from "@/components/simulator/simulator-actions"
import {
  LayoutDashboard,
  Calculator,
  GitBranch,
  FileText,
  MessageSquare,
  Home,
} from "lucide-react"

export const metadata = {
  title: "Investment Simulator | LALens",
  description:
    "Model your education investment impact on Louisiana's workforce pipeline",
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/simulator", label: "Simulator", icon: Calculator },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/intake", label: "Intake", icon: FileText },
  { href: "/chat", label: "AI Chat", icon: MessageSquare },
]

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    LA
                  </span>
                </div>
                <span className="font-bold text-xl">LALens</span>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={item.href === "/simulator" ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Investment Simulator
          </h1>
          <p className="text-muted-foreground mt-1">
            Model your education investment impact on Louisiana&apos;s workforce
            pipeline
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <InvestmentControls />
            <AIRecommendations />
          </div>

          {/* Right Column - Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            <ROIProjectionChart />
            <ImpactBreakdown />
            <SimulatorActions />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Projections are estimates based on historical data and current
            trends.
          </p>
          <p>
            Actual results may vary. Contact us for detailed analysis.
          </p>
        </div>
      </main>
    </div>
  )
}

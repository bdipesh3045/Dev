import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, DollarSign, GraduationCap, BarChart3, MapPin, Zap, Brain, PieChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedPipeline } from '@/components/landing/animated-pipeline'
import { GapCounters } from '@/components/landing/gap-counters'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">LA EdTech Intel</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#pipeline" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pipeline
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Simulator
            </Link>
            <ThemeToggle />
            <Link href="/dashboard">
              <Button size="sm" className="shadow-lg shadow-primary/25">Launch Portal</Button>
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button size="sm">Portal</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Louisiana EdTech Challenge 2026
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Decision-Ready Intelligence for{' '}
              <span className="text-primary">Louisiana Education</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              From awareness to action in 10 seconds. Identify where educational need, 
              workforce demand, and investment opportunity intersect.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
                <Zap className="h-5 w-5" />
                Launch Intelligence Portal
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gap Counters - The core "awareness" section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <GapCounters />
        </div>
      </section>

      {/* Animated Pipeline Section */}
      <section id="pipeline" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              The Student-to-Workforce Pipeline
            </h2>
            <p className="text-muted-foreground">
              Visualizing where Louisiana loses talent and where investment can have the greatest impact.
            </p>
          </div>
          <AnimatedPipeline />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Intelligence-Driven Investment
            </h2>
            <p className="text-muted-foreground">
              Every chart has a takeaway. Every metric tells a story. Move from data to decision instantly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<MapPin className="h-6 w-6" />}
              title="Geospatial Intelligence"
              description="Bivariate mapping shows poverty index and school performance simultaneously. Click any parish to drill down."
              href="/dashboard"
            />
            <FeatureCard
              icon={<PieChart className="h-6 w-6" />}
              title="Grant Investment Simulator"
              description="Model ROI with interactive sliders. See predicted outcomes vs. current trends in real-time."
              href="/simulator"
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Pipeline & Expansion View"
              description="Sankey diagrams reveal drop-off zones. Identify where to place new schools for maximum impact."
              href="/pipeline"
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title="AI Policy Chat"
              description="Ask questions in natural language. The AI highlights parishes on the map as it answers."
              href="/chat"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Investor Matching"
              description="Multi-step intake form matches your capacity and passions to schools that need your support."
              href="/intake"
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Priority Scoring"
              description="Transparent formula: (Workforce Gap × Poverty Index) / Current Funding. See exactly why schools rank."
              href="/dashboard"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Ready to Transform Louisiana Education?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join investors and policymakers who are using data-driven insights to build 
              a stronger workforce for Louisiana.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                  <Zap className="h-4 w-4" />
                  Launch Portal
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/intake">
                <Button variant="outline" size="lg" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  Investor Intake
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">LA EdTech Intel</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="/simulator" className="hover:text-foreground transition-colors">Simulator</Link>
              <Link href="/pipeline" className="hover:text-foreground transition-colors">Pipeline</Link>
              <Link href="/chat" className="hover:text-foreground transition-colors">AI Chat</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Louisiana EdTech Challenge 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <Link href={href}>
      <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 h-full">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}

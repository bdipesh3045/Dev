import { Link } from "react-router-dom";
import { GraduationCap, ArrowLeft, Settings, Bell, Search, PieChart, MessageSquare, Users } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import { Button } from "../components/ui/Button";
import { KPICards } from "../components/dashboard/KPICards";
import { OpportunityTable } from "../components/dashboard/OpportunityTable";
import { AIInsightCards } from "../components/dashboard/AIInsightCards";
import { WorkforceChart } from "../components/dashboard/WorkforceChart";
import { EnrollmentChart } from "../components/dashboard/EnrollmentChart";
import { FundingChart } from "../components/dashboard/FundingChart";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <BrandLogo variant="nav" />
              <div>
                <span className="text-lg font-semibold text-gray-900">LALens</span>
                <span className="ml-2 hidden rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700 sm:inline-block">
                  Dashboard
                </span>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/simulator">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                <PieChart className="h-4 w-4" />
                Simulator
              </Button>
            </Link>
            <Link to="/pipeline">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                Pipeline
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </Button>
            </Link>
            <Link to="/intake">
              <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
                <Users className="h-4 w-4" />
                Intake
              </Button>
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
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
            <h1 className="text-2xl font-bold text-gray-900">Opportunity Intelligence Dashboard</h1>
            <p className="text-gray-500">
              Real-time insights on Louisiana education investment opportunities
            </p>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - 2/3 width */}
            <div className="space-y-6 lg:col-span-2">
              {/* Opportunity Table */}
              <OpportunityTable />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* AI Insights */}
              <AIInsightCards />
              
              {/* Charts */}
              <EnrollmentChart />
              <WorkforceChart />
              <FundingChart />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 mt-8">
        <div className="px-4 lg:px-6">
          <div className="mx-auto max-w-[1600px] flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              Louisiana Education Intelligence Portal
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link to="/simulator" className="hover:text-gray-900 transition-colors">Simulator</Link>
              <Link to="/pipeline" className="hover:text-gray-900 transition-colors">Pipeline</Link>
              <Link to="/chat" className="hover:text-gray-900 transition-colors">AI Chat</Link>
              <Link to="/intake" className="hover:text-gray-900 transition-colors">Investor Intake</Link>
            </div>
            <p className="text-sm text-gray-500">
              Data updated: May 15, 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

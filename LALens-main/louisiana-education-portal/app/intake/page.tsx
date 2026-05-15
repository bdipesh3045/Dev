'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowLeft, ArrowRight, Check, DollarSign, Heart, Building, Briefcase, Users, GraduationCapIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { schools } from '@/lib/data'

type InvestorType = 'investor' | 'philanthropist' | 'operator' | null
type BudgetRange = '$10K-$100K' | '$100K-$500K' | '$500K-$1M' | '$1M-$5M' | '$5M+' | null
type PassionArea = 'stem' | 'vocational' | 'early-childhood' | 'healthcare' | 'general' | null

interface MatchedSchool {
  name: string
  parish: string
  type: string
  fundingNeed: number
  matchScore: number
  programs: string[]
}

export default function IntakePage() {
  const [step, setStep] = useState(1)
  const [investorType, setInvestorType] = useState<InvestorType>(null)
  const [budget, setBudget] = useState<BudgetRange>(null)
  const [passion, setPassion] = useState<PassionArea>(null)
  const [matches, setMatches] = useState<MatchedSchool[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Calculate matches
      const filteredSchools = schools.filter(school => {
        if (passion === 'stem' && !school.topPrograms.some(p => ['Engineering', 'IT', 'Cyber Security', 'STEM'].includes(p))) return false
        if (passion === 'vocational' && !school.topPrograms.some(p => ['Welding', 'Industrial Tech', 'Process Tech', 'Culinary Arts'].includes(p))) return false
        if (passion === 'healthcare' && !school.topPrograms.some(p => ['Nursing', 'Healthcare'].includes(p))) return false
        return true
      })
      
      const matchedSchools: MatchedSchool[] = filteredSchools.map(school => ({
        name: school.name,
        parish: school.parish,
        type: school.type,
        fundingNeed: school.fundingNeeds,
        matchScore: Math.round(70 + Math.random() * 25),
        programs: school.topPrograms
      })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5)
      
      setMatches(matchedSchools)
      setStep(4)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    if (step === 1) return investorType !== null
    if (step === 2) return budget !== null
    if (step === 3) return passion !== null
    return true
  }

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
                <span className="text-lg font-semibold text-foreground">Investor Intake</span>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="mx-auto max-w-2xl">
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                      s < step ? 'bg-primary text-primary-foreground' :
                      s === step ? 'bg-primary text-primary-foreground' :
                      'bg-secondary text-muted-foreground'
                    }`}>
                      {s < step ? <Check className="h-5 w-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`h-1 w-24 sm:w-32 mx-2 rounded ${
                        s < step ? 'bg-primary' : 'bg-secondary'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Your Role</span>
                <span>Budget</span>
                <span>Passion</span>
              </div>
            </div>
          )}

          {/* Step 1: Investor Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">Welcome to the Investor Portal</h1>
                <p className="text-muted-foreground mt-2">Let&apos;s find the perfect schools for your investment profile.</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">I am a...</p>
                <div className="grid gap-3">
                  <SelectCard
                    selected={investorType === 'investor'}
                    onClick={() => setInvestorType('investor')}
                    icon={<Briefcase className="h-6 w-6" />}
                    title="Investor"
                    description="Looking for ROI-focused education investments"
                  />
                  <SelectCard
                    selected={investorType === 'philanthropist'}
                    onClick={() => setInvestorType('philanthropist')}
                    icon={<Heart className="h-6 w-6" />}
                    title="Philanthropist"
                    description="Seeking impact-driven giving opportunities"
                  />
                  <SelectCard
                    selected={investorType === 'operator'}
                    onClick={() => setInvestorType('operator')}
                    icon={<Building className="h-6 w-6" />}
                    title="School Operator"
                    description="Interested in opening or expanding schools"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">What&apos;s your investment capacity?</h1>
                <p className="text-muted-foreground mt-2">This helps us match you with appropriate opportunities.</p>
              </div>
              
              <div className="grid gap-3">
                {[
                  { value: '$10K-$100K', label: '$10,000 - $100,000' },
                  { value: '$100K-$500K', label: '$100,000 - $500,000' },
                  { value: '$500K-$1M', label: '$500,000 - $1 Million' },
                  { value: '$1M-$5M', label: '$1 Million - $5 Million' },
                  { value: '$5M+', label: '$5 Million+' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setBudget(option.value as BudgetRange)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      budget === option.value 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className={`h-5 w-5 ${budget === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium text-foreground">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Passion Area */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">What are you passionate about?</h1>
                <p className="text-muted-foreground mt-2">Select the education area that resonates most with you.</p>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectCard
                  selected={passion === 'stem'}
                  onClick={() => setPassion('stem')}
                  icon={<span className="text-2xl">🔬</span>}
                  title="STEM Education"
                  description="Science, Technology, Engineering, Math"
                />
                <SelectCard
                  selected={passion === 'vocational'}
                  onClick={() => setPassion('vocational')}
                  icon={<span className="text-2xl">🔧</span>}
                  title="Vocational Training"
                  description="Trades, Technical Skills, Certification"
                />
                <SelectCard
                  selected={passion === 'early-childhood'}
                  onClick={() => setPassion('early-childhood')}
                  icon={<span className="text-2xl">🎨</span>}
                  title="Early Childhood"
                  description="Pre-K, Elementary, Foundation Years"
                />
                <SelectCard
                  selected={passion === 'healthcare'}
                  onClick={() => setPassion('healthcare')}
                  icon={<span className="text-2xl">🏥</span>}
                  title="Healthcare Education"
                  description="Nursing, Medical Training, Allied Health"
                />
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && !submitted && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Your Direct Matches</h1>
                <p className="text-muted-foreground mt-2">Based on your profile, these schools are the best fit for your investment.</p>
              </div>
              
              <div className="space-y-3">
                {matches.map((school, index) => (
                  <Card key={index} className="transition-all hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{school.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              school.matchScore >= 90 ? 'bg-chart-1/20 text-chart-1' :
                              school.matchScore >= 80 ? 'bg-chart-2/20 text-chart-2' :
                              'bg-secondary text-muted-foreground'
                            }`}>
                              {school.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{school.parish} Parish • {school.type}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {school.programs.slice(0, 3).map((program, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">${(school.fundingNeed / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-muted-foreground">Funding Need</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="w-full" size="lg" onClick={() => setSubmitted(true)}>
                Submit Interest for All Matches
              </Button>
            </div>
          )}

          {/* Submitted State */}
          {submitted && (
            <div className="space-y-6 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-chart-1/20 mb-4">
                <Check className="h-10 w-10 text-chart-1" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Application Submitted!</h1>
              <p className="text-muted-foreground">
                Your interest has been recorded. Schools matching your profile will receive your information 
                and reach out within 2-3 business days.
              </p>
              
              {/* Status Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Your Active Matches</CardTitle>
                  <CardDescription>Track your application status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-chart-2/10 border border-chart-2/30">
                      <div className="text-2xl font-bold text-chart-2">{matches.length}</div>
                      <div className="text-xs text-muted-foreground">Draft</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="text-2xl font-bold text-muted-foreground">0</div>
                      <div className="text-xs text-muted-foreground">Review</div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary">
                      <div className="text-2xl font-bold text-muted-foreground">0</div>
                      <div className="text-xs text-muted-foreground">Funded</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex gap-3 justify-center">
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                <Link href="/simulator">
                  <Button>Try Simulator</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="flex-1 gap-2"
              >
                {step === 3 ? 'Find Matches' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function SelectCard({ 
  selected, 
  onClick, 
  icon, 
  title, 
  description 
}: { 
  selected: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 text-left transition-all ${
        selected 
          ? 'border-primary bg-primary/10' 
          : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`${selected ? 'text-primary' : 'text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <div className="font-medium text-foreground">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        {selected && (
          <Check className="h-5 w-5 text-primary ml-auto" />
        )}
      </div>
    </button>
  )
}

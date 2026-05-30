import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, DollarSign, Heart, Building, Briefcase } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { schools } from "../data/portalData";

function SelectCard({ selected, onClick, icon, title, description }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all ${
        selected 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-200 hover:border-purple-300'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`${selected ? 'text-purple-600' : 'text-gray-500'}`}>
          {icon}
        </div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
        {selected && (
          <Check className="h-5 w-5 text-purple-600 ml-auto" />
        )}
      </div>
    </button>
  );
}

export default function Intake() {
  const [step, setStep] = useState(1);
  const [investorType, setInvestorType] = useState(null);
  const [budget, setBudget] = useState(null);
  const [passion, setPassion] = useState(null);
  const [matches, setMatches] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate matches
      const filteredSchools = schools.filter(school => {
        if (passion === 'stem' && !school.topPrograms.some(p => ['Engineering', 'IT', 'Cyber Security', 'STEM'].includes(p))) return false;
        if (passion === 'vocational' && !school.topPrograms.some(p => ['Welding', 'Industrial Tech', 'Process Tech', 'Culinary Arts'].includes(p))) return false;
        if (passion === 'healthcare' && !school.topPrograms.some(p => ['Nursing', 'Healthcare'].includes(p))) return false;
        return true;
      });
      
      const matchedSchools = filteredSchools.map(school => ({
        name: school.name,
        parish: school.parish,
        type: school.type,
        fundingNeed: school.fundingNeeds,
        matchScore: Math.round(70 + Math.random() * 25),
        programs: school.topPrograms
      })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
      
      setMatches(matchedSchools);
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return investorType !== null;
    if (step === 2) return budget !== null;
    if (step === 3) return passion !== null;
    return true;
  };

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
                <span className="text-lg font-semibold text-gray-900">Investor Intake</span>
              </div>
            </div>
          </div>
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
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                      s < step ? 'bg-purple-500 text-white' :
                      s === step ? 'bg-purple-500 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {s < step ? <Check className="h-5 w-5" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`h-1 w-24 sm:w-32 mx-2 rounded transition-all ${
                        s < step ? 'bg-purple-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
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
                <h1 className="text-2xl font-bold text-gray-900">Welcome to the Investor Portal</h1>
                <p className="text-gray-500 mt-2">Let&apos;s find the perfect schools for your investment profile.</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">I am a...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">What&apos;s your investment capacity?</h1>
                <p className="text-gray-500 mt-2">This helps us match you with appropriate opportunities.</p>
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
                    onClick={() => setBudget(option.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      budget === option.value 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className={`h-5 w-5 ${budget === option.value ? 'text-purple-600' : 'text-gray-500'}`} />
                      <span className="font-medium text-gray-900">{option.label}</span>
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
                <h1 className="text-2xl font-bold text-gray-900">What are you passionate about?</h1>
                <p className="text-gray-500 mt-2">Select the education area that resonates most with you.</p>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <SelectCard
                  selected={passion === 'stem'}
                  onClick={() => setPassion('stem')}
                  icon={<span className="text-2xl">&#x1F52C;</span>}
                  title="STEM Education"
                  description="Science, Technology, Engineering, Math"
                />
                <SelectCard
                  selected={passion === 'vocational'}
                  onClick={() => setPassion('vocational')}
                  icon={<span className="text-2xl">&#x1F527;</span>}
                  title="Vocational Training"
                  description="Trades, Technical Skills, Certification"
                />
                <SelectCard
                  selected={passion === 'early-childhood'}
                  onClick={() => setPassion('early-childhood')}
                  icon={<span className="text-2xl">&#x1F3A8;</span>}
                  title="Early Childhood"
                  description="Pre-K, Elementary, Foundation Years"
                />
                <SelectCard
                  selected={passion === 'healthcare'}
                  onClick={() => setPassion('healthcare')}
                  icon={<span className="text-2xl">&#x1F3E5;</span>}
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
                  <Check className="h-8 w-8 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Your Direct Matches</h1>
                <p className="text-gray-500 mt-2">Based on your profile, these schools are the best fit for your investment.</p>
              </div>
              
              <div className="space-y-3">
                {matches.map((school, index) => (
                  <Card key={index} className="transition-all hover:border-purple-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{school.name}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              school.matchScore >= 90 ? 'bg-green-100 text-green-700' :
                              school.matchScore >= 80 ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {school.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{school.parish} Parish - {school.type}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {school.programs.slice(0, 3).map((program, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600">
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">${(school.fundingNeed / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-gray-500">Funding Need</div>
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
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Application Submitted!</h1>
              <p className="text-gray-500">
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
                    <div className="p-3 rounded-xl bg-amber-100 border border-amber-200">
                      <div className="text-2xl font-bold text-amber-700">{matches.length}</div>
                      <div className="text-xs text-amber-600">Draft</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-100">
                      <div className="text-2xl font-bold text-gray-500">0</div>
                      <div className="text-xs text-gray-500">Review</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-100">
                      <div className="text-2xl font-bold text-gray-500">0</div>
                      <div className="text-xs text-gray-500">Funded</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex gap-3 justify-center">
                <Link to="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                <Link to="/simulator">
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
  );
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowLeft, Send, Download, Sparkles, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAppStore } from '@/lib/store'
import { parishes } from '@/lib/data'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  highlightedParishes?: string[]
  policyCard?: {
    title: string
    summary: string
    parishes: string[]
    recommendation: string
  }
}

// Sample AI responses for demo
const sampleResponses: Record<string, { content: string; parishes: string[]; policyCard?: Message['policyCard'] }> = {
  'delta': {
    content: `Based on my analysis of the Delta region parishes, **Madison, Tensas, and Concordia** parishes show the highest need for STEM funding. These parishes have:\n\n- Poverty rates exceeding 28%\n- School performance scores below state average\n- Limited access to technical training programs\n- Growing healthcare workforce demand\n\nI've highlighted these parishes on the map for your review.`,
    parishes: ['Madison', 'Tensas', 'Concordia'],
    policyCard: {
      title: 'Delta Region STEM Investment Analysis',
      summary: 'Critical need for STEM infrastructure in high-poverty Delta parishes with emerging healthcare sector growth.',
      parishes: ['Madison', 'Tensas', 'Concordia'],
      recommendation: 'Prioritize mobile STEM labs and partnership programs with regional hospitals for healthcare training pipelines.'
    }
  },
  'stem': {
    content: `Looking at STEM funding needs across Louisiana, the parishes with the highest priority are:\n\n1. **Calcasieu** - 96% workforce alignment with LNG expansion\n2. **East Baton Rouge** - Major petrochemical corridor needs\n3. **Orleans** - Tech sector growth outpacing graduates\n\nThese areas show strong ROI potential due to existing industry partnerships.`,
    parishes: ['Calcasieu', 'East Baton Rouge', 'Orleans'],
    policyCard: {
      title: 'STEM Investment Priority Report',
      summary: 'Three parishes show exceptional ROI potential for STEM investments due to industry alignment and workforce demand.',
      parishes: ['Calcasieu', 'East Baton Rouge', 'Orleans'],
      recommendation: 'Focus on industry-certified programs in process technology, petrochemical engineering, and software development.'
    }
  },
  'healthcare': {
    content: `Healthcare workforce gaps are most severe in:\n\n- **Caddo Parish** (Shreveport) - 24% nursing shortage\n- **Orleans Parish** - Critical care staff deficit\n- **Ouachita Parish** - Rural healthcare access crisis\n\nThese parishes need immediate investment in nursing programs and healthcare training facilities.`,
    parishes: ['Caddo', 'Orleans', 'Ouachita'],
    policyCard: {
      title: 'Healthcare Workforce Crisis Report',
      summary: 'Three parishes face critical healthcare workforce shortages requiring immediate educational intervention.',
      parishes: ['Caddo', 'Orleans', 'Ouachita'],
      recommendation: 'Establish accelerated nursing programs and offer tuition forgiveness for graduates who commit to serving in underserved areas.'
    }
  },
  'default': {
    content: `I can help you analyze Louisiana education data. Try asking about:\n\n- Which parishes need the most STEM funding?\n- Where are healthcare workforce gaps most severe?\n- What are the best locations for new schools?\n- Which regions have the highest dropout rates?`,
    parishes: []
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to the Louisiana Education Policy Assistant. I can help you analyze regional education data, identify investment opportunities, and generate policy recommendations.\n\n**Try asking:**\n- "Which parishes in the Delta need more STEM funding?"\n- "Where are healthcare workforce gaps most severe?"\n- "What are the top investment priorities for early childhood education?"`,
      highlightedParishes: []
    }
  ])
  const [input, setInput] = useState('')
  const { setHighlightedParishes } = useAppStore()

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Determine response based on input keywords
    let response = sampleResponses.default
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('delta') || lowerInput.includes('mississippi')) {
      response = sampleResponses.delta
    } else if (lowerInput.includes('stem') || lowerInput.includes('tech') || lowerInput.includes('engineering')) {
      response = sampleResponses.stem
    } else if (lowerInput.includes('healthcare') || lowerInput.includes('nursing') || lowerInput.includes('medical')) {
      response = sampleResponses.healthcare
    }
    
    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        highlightedParishes: response.parishes,
        policyCard: response.policyCard
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setHighlightedParishes(response.parishes)
    }, 800)
    
    setInput('')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">AI Policy Assistant</span>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Chat Column */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] space-y-3 ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-card border border-border'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                      {message.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                  </div>
                  
                  {/* Highlighted Parishes Indicator */}
                  {message.highlightedParishes && message.highlightedParishes.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Highlighted on map: {message.highlightedParishes.join(', ')}</span>
                    </div>
                  )}
                  
                  {/* Policy Card */}
                  {message.policyCard && (
                    <Card className="border-primary/30 bg-primary/5">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{message.policyCard.title}</CardTitle>
                          <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                            <Download className="h-3 w-3" />
                            Export PDF
                          </Button>
                        </div>
                        <CardDescription className="text-xs">{message.policyCard.summary}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-xs space-y-2">
                          <div>
                            <span className="font-medium text-foreground">Target Parishes: </span>
                            <span className="text-muted-foreground">{message.policyCard.parishes.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Recommendation: </span>
                            <span className="text-muted-foreground">{message.policyCard.recommendation}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Louisiana education policy, funding needs, or investment opportunities..."
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleSend} size="icon" className="h-12 w-12">
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput('Which parishes in the Delta need more STEM funding?')}
              >
                Delta STEM needs
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput('Where are healthcare workforce gaps most severe?')}
              >
                Healthcare gaps
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => setInput('What are the best locations for new technical schools?')}
              >
                New school locations
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mini Map Sidebar */}
        <aside className="hidden lg:block w-80 border-l border-border p-4 overflow-y-auto">
          <h3 className="font-semibold text-foreground mb-3">Parish Highlights</h3>
          <div className="rounded-lg bg-secondary/30 p-4 mb-4">
            <svg viewBox="0 0 400 300" className="w-full">
              <path
                d="M50,100 L80,80 L120,70 L160,60 L200,55 L250,60 L290,70 L320,90 L350,110 
                   L360,140 L355,170 L340,200 L320,220 L290,235 L250,245 L200,250 
                   L150,245 L100,235 L70,220 L50,200 L40,170 L35,140 Z"
                fill="var(--secondary)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              {parishes.map((parish) => {
                const positions: Record<string, { x: number; y: number }> = {
                  'Orleans': { x: 320, y: 220 },
                  'East Baton Rouge': { x: 260, y: 180 },
                  'Jefferson': { x: 300, y: 230 },
                  'Calcasieu': { x: 100, y: 200 },
                  'Caddo': { x: 80, y: 80 },
                  'Lafayette': { x: 200, y: 200 }
                }
                const pos = positions[parish.name] || { x: 200, y: 150 }
                const isHighlighted = useAppStore.getState().highlightedParishes.includes(parish.name)
                
                return (
                  <g key={parish.name}>
                    {isHighlighted && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={18}
                        fill="var(--primary)"
                        opacity={0.3}
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHighlighted ? 12 : 8}
                      fill={isHighlighted ? 'var(--primary)' : 'var(--muted-foreground)'}
                    />
                  </g>
                )
              })}
            </svg>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-secondary/50 p-2">
                <div className="text-lg font-bold text-foreground">64</div>
                <div className="text-muted-foreground">Parishes</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2">
                <div className="text-lg font-bold text-foreground">178</div>
                <div className="text-muted-foreground">Institutions</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2">
                <div className="text-lg font-bold text-primary">$2.4B</div>
                <div className="text-muted-foreground">Funding Gap</div>
              </div>
              <div className="rounded-lg bg-secondary/50 p-2">
                <div className="text-lg font-bold text-chart-3">32%</div>
                <div className="text-muted-foreground">Workforce Gap</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

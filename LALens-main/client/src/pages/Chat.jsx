import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Download, Sparkles, MapPin } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { useAppStore } from "../store/appStore";
import { parishes, sampleChatResponses } from "../data/portalData";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to the Louisiana Education Policy Assistant. I can help you analyze regional education data, identify investment opportunities, and generate policy recommendations.\n\n**Try asking:**\n- "Which parishes in the Delta need more STEM funding?"\n- "Where are healthcare workforce gaps most severe?"\n- "What are the top investment priorities for early childhood education?"`,
      highlightedParishes: []
    }
  ]);
  const [input, setInput] = useState('');
  const { setHighlightedParishes, highlightedParishes } = useAppStore();

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Determine response based on input keywords
    let response = sampleChatResponses.default;
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('delta') || lowerInput.includes('mississippi')) {
      response = sampleChatResponses.delta;
    } else if (lowerInput.includes('stem') || lowerInput.includes('tech') || lowerInput.includes('engineering')) {
      response = sampleChatResponses.stem;
    } else if (lowerInput.includes('healthcare') || lowerInput.includes('nursing') || lowerInput.includes('medical')) {
      response = sampleChatResponses.healthcare;
    }
    
    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        highlightedParishes: response.parishes,
        policyCard: response.policyCard
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setHighlightedParishes(response.parishes);
    }, 800);
    
    setInput('');
  };

  // Parish position mapping for mini map
  const parishPositions = {
    'Orleans': { x: 320, y: 220 },
    'East Baton Rouge': { x: 260, y: 180 },
    'Jefferson': { x: 300, y: 230 },
    'Calcasieu': { x: 100, y: 200 },
    'Caddo': { x: 80, y: 80 },
    'Lafayette': { x: 200, y: 200 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-900">AI Policy Assistant</span>
              </div>
            </div>
          </div>
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
                      ? 'bg-purple-500 text-white ml-auto' 
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </div>
                  </div>
                  
                  {/* Highlighted Parishes Indicator */}
                  {message.highlightedParishes && message.highlightedParishes.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>Highlighted on map: {message.highlightedParishes.join(', ')}</span>
                    </div>
                  )}
                  
                  {/* Policy Card */}
                  {message.policyCard && (
                    <Card className="border-purple-200 bg-purple-50">
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
                            <span className="font-medium text-gray-900">Target Parishes: </span>
                            <span className="text-gray-600">{message.policyCard.parishes.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Recommendation: </span>
                            <span className="text-gray-600">{message.policyCard.recommendation}</span>
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
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Louisiana education policy, funding needs, or investment opportunities..."
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button onClick={handleSend} size="icon" className="h-12 w-12 rounded-full">
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
        <aside className="hidden lg:block w-80 border-l border-gray-200 p-4 overflow-y-auto bg-white">
          <h3 className="font-semibold text-gray-900 mb-3">Parish Highlights</h3>
          <div className="rounded-xl bg-gray-100 p-4 mb-4">
            <svg viewBox="0 0 400 300" className="w-full">
              <path
                d="M50,100 L80,80 L120,70 L160,60 L200,55 L250,60 L290,70 L320,90 L350,110 
                   L360,140 L355,170 L340,200 L320,220 L290,235 L250,245 L200,250 
                   L150,245 L100,235 L70,220 L50,200 L40,170 L35,140 Z"
                fill="#e5e7eb"
                stroke="#d1d5db"
                strokeWidth="2"
              />
              {parishes.map((parish) => {
                const pos = parishPositions[parish.name] || { x: 200, y: 150 };
                const isHighlighted = highlightedParishes.includes(parish.name);
                
                return (
                  <g key={parish.name}>
                    {isHighlighted && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={18}
                        fill="var(--purple)"
                        opacity={0.3}
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isHighlighted ? 12 : 8}
                      fill={isHighlighted ? 'var(--purple)' : '#9ca3af'}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-gray-100 p-2">
                <div className="text-lg font-bold text-gray-900">64</div>
                <div className="text-gray-500">Parishes</div>
              </div>
              <div className="rounded-xl bg-gray-100 p-2">
                <div className="text-lg font-bold text-gray-900">178</div>
                <div className="text-gray-500">Institutions</div>
              </div>
              <div className="rounded-xl bg-gray-100 p-2">
                <div className="text-lg font-bold text-purple-600">$2.4B</div>
                <div className="text-gray-500">Funding Gap</div>
              </div>
              <div className="rounded-xl bg-gray-100 p-2">
                <div className="text-lg font-bold text-red-500">32%</div>
                <div className="text-gray-500">Workforce Gap</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

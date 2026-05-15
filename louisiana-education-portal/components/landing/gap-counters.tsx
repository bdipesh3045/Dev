"use client"

import { useEffect, useState } from "react"

interface CounterProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedCounter({ label, value, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const startTime = Date.now()
    const startValue = 0
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (value - startValue) * easeOut)
      
      setCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, duration])
  
  return (
    <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-card border border-border">
      <div className="text-4xl md:text-5xl font-mono font-bold text-primary tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground text-center">{label}</div>
    </div>
  )
}

export function GapCounters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
      <AnimatedCounter 
        label="Annual Funding Gap" 
        value={2.4} 
        prefix="$"
        suffix="B"
        duration={2500}
      />
      <AnimatedCounter 
        label="Unfilled Tech Jobs" 
        value={15420} 
        duration={2000}
      />
      <AnimatedCounter 
        label="Under-served Parishes" 
        value={32} 
        duration={1500}
      />
    </div>
  )
}

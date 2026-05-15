"use client"

import { useEffect, useRef } from "react"

export function AnimatedPipeline() {
  const pathRef = useRef<SVGPathElement>(null)
  
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    
    const animation = path.animate(
      [
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ],
      {
        duration: 3000,
        easing: "ease-in-out",
        fill: "forwards"
      }
    )
    
    return () => animation.cancel()
  }, [])
  
  return (
    <div className="relative w-full max-w-4xl mx-auto h-48 md:h-64">
      <svg
        viewBox="0 0 800 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1"/>
          </pattern>
          <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Pipeline stages */}
        <g className="text-muted-foreground">
          {/* K-12 node */}
          <circle cx="100" cy="100" r="35" fill="var(--secondary)" stroke="var(--border)" strokeWidth="2" />
          <text x="100" y="95" textAnchor="middle" className="fill-foreground text-xs font-medium">K-12</text>
          <text x="100" y="110" textAnchor="middle" className="fill-muted-foreground text-[10px]">487K Students</text>
          
          {/* Higher Ed node */}
          <circle cx="300" cy="100" r="35" fill="var(--secondary)" stroke="var(--border)" strokeWidth="2" />
          <text x="300" y="95" textAnchor="middle" className="fill-foreground text-xs font-medium">Higher Ed</text>
          <text x="300" y="110" textAnchor="middle" className="fill-muted-foreground text-[10px]">142K Enrolled</text>
          
          {/* Workforce node */}
          <circle cx="500" cy="100" r="35" fill="var(--secondary)" stroke="var(--border)" strokeWidth="2" />
          <text x="500" y="95" textAnchor="middle" className="fill-foreground text-xs font-medium">Workforce</text>
          <text x="500" y="110" textAnchor="middle" className="fill-muted-foreground text-[10px]">51K Graduates</text>
          
          {/* Industry node */}
          <circle cx="700" cy="100" r="35" fill="var(--secondary)" stroke="var(--primary)" strokeWidth="2" />
          <text x="700" y="95" textAnchor="middle" className="fill-foreground text-xs font-medium">Industry</text>
          <text x="700" y="110" textAnchor="middle" className="fill-primary text-[10px]">44K Jobs</text>
        </g>
        
        {/* Animated pipeline path */}
        <path
          ref={pathRef}
          d="M 135 100 C 180 100 180 100 265 100 M 335 100 C 380 100 380 100 465 100 M 535 100 C 580 100 580 100 665 100"
          fill="none"
          stroke="url(#pipelineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        
        {/* Drop-off indicators */}
        <g className="text-destructive">
          <path d="M 200 100 L 200 160" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
          <text x="200" y="175" textAnchor="middle" className="fill-destructive text-[10px]">-71% Drop</text>
          
          <path d="M 400 100 L 400 160" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
          <text x="400" y="175" textAnchor="middle" className="fill-destructive text-[10px]">-64% Drop</text>
          
          <path d="M 600 100 L 600 160" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
          <text x="600" y="175" textAnchor="middle" className="fill-destructive text-[10px]">-14% Gap</text>
        </g>
        
        {/* Animated dots flowing through pipeline */}
        <circle r="6" fill="var(--primary)" filter="url(#glow)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 135 100 C 180 100 180 100 265 100"
          />
        </circle>
        <circle r="6" fill="var(--primary)" filter="url(#glow)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="1.3s"
            path="M 335 100 C 380 100 380 100 465 100"
          />
        </circle>
        <circle r="6" fill="var(--primary)" filter="url(#glow)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="2.6s"
            path="M 535 100 C 580 100 580 100 665 100"
          />
        </circle>
      </svg>
      
      {/* Labels below */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around text-center text-xs text-muted-foreground">
        <span>Entry</span>
        <span>Transition</span>
        <span>Completion</span>
        <span>Employment</span>
      </div>
    </div>
  )
}

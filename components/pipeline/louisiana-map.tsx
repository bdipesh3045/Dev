'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { parishes, investmentZones, schools } from '@/lib/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Target } from 'lucide-react'

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/LA-22-louisiana-parishes.json'

interface MapMarker {
  name: string
  parish: string
  coordinates: [number, number]
  opportunityScore: number
  type: 'school' | 'zone'
  details?: string
}

export function LouisianaMap() {
  const [position, setPosition] = useState({ coordinates: [-91.5, 31], zoom: 1 })
  const [selectedParish, setSelectedParish] = useState<string | null>(null)

  const markers: MapMarker[] = [
    ...schools.map(s => ({
      name: s.name,
      parish: s.parish,
      coordinates: [s.coordinates.lng, s.coordinates.lat] as [number, number],
      opportunityScore: s.opportunityScore,
      type: 'school' as const,
      details: `${s.type} - ${s.enrollment.toLocaleString()} students`,
    })),
    ...investmentZones.map(z => ({
      name: `${z.parish} Investment Zone`,
      parish: z.parish,
      coordinates: getParishCoordinates(z.parish),
      opportunityScore: Math.round(z.potentialROI * 25),
      type: 'zone' as const,
      details: `${z.sector} - ${formatCurrency(z.investmentNeeded)} needed`,
    })),
  ]

  function getParishCoordinates(parishName: string): [number, number] {
    const coords: Record<string, [number, number]> = {
      'Orleans': [-90.07, 29.95],
      'East Baton Rouge': [-91.15, 30.45],
      'Jefferson': [-90.15, 29.85],
      'Calcasieu': [-93.22, 30.23],
      'Caddo': [-93.85, 32.5],
      'Lafayette': [-92.02, 30.22],
      'Ouachita': [-92.15, 32.5],
      'Rapides': [-92.45, 31.3],
      'Lincoln': [-92.65, 32.53],
      'Natchitoches': [-93.09, 31.76],
    }
    return coords[parishName] || [-91.5, 31]
  }

  function handleZoomIn() {
    if (position.zoom >= 4) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }))
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }))
  }

  function handleReset() {
    setPosition({ coordinates: [-91.5, 31], zoom: 1 })
    setSelectedParish(null)
  }

  const getParishData = (name: string) => {
    return parishes.find(p => name.toLowerCase().includes(p.name.toLowerCase()))
  }

  const getParishColor = (name: string) => {
    const parish = getParishData(name)
    if (!parish) return 'var(--muted)'
    
    if (selectedParish && !name.toLowerCase().includes(selectedParish.toLowerCase())) {
      return 'var(--muted)'
    }

    const score = parish.opportunityScore
    if (score >= 85) return 'var(--chart-1)'
    if (score >= 75) return 'var(--chart-2)'
    return 'var(--chart-3)'
  }

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Louisiana Investment Map
            </CardTitle>
            <CardDescription>Parish investment opportunities and school locations</CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative h-[400px] bg-background">
          <TooltipProvider>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 4500,
                center: [-91.5, 31],
              }}
              className="w-full h-full"
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates as [number, number]}
                onMoveEnd={({ coordinates, zoom }) => setPosition({ coordinates, zoom })}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const parishName = geo.properties.NAME || ''
                      const parishData = getParishData(parishName)
                      
                      return (
                        <Tooltip key={geo.rsmKey}>
                          <TooltipTrigger asChild>
                            <Geography
                              geography={geo}
                              fill={getParishColor(parishName)}
                              stroke="var(--border)"
                              strokeWidth={0.5}
                              style={{
                                default: { outline: 'none', opacity: 0.8 },
                                hover: { outline: 'none', opacity: 1, cursor: 'pointer' },
                                pressed: { outline: 'none', opacity: 0.9 },
                              }}
                              onClick={() => setSelectedParish(parishName)}
                            />
                          </TooltipTrigger>
                          {parishData && (
                            <TooltipContent>
                              <div className="text-sm">
                                <p className="font-semibold">{parishData.name} Parish</p>
                                <p className="text-muted-foreground">
                                  Opportunity Score: {parishData.opportunityScore}
                                </p>
                                <p className="text-muted-foreground">
                                  K-12 Students: {parishData.k12Students.toLocaleString()}
                                </p>
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )
                    })
                  }
                </Geographies>

                {markers.map((marker, idx) => (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>
                      <Marker coordinates={marker.coordinates}>
                        <circle
                          r={marker.type === 'zone' ? 6 : 4}
                          fill={marker.type === 'zone' ? 'var(--primary)' : 'var(--accent)'}
                          stroke="var(--background)"
                          strokeWidth={1.5}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </Marker>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p className="font-semibold">{marker.name}</p>
                        <p className="text-muted-foreground">{marker.details}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </TooltipProvider>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg border p-3">
            <p className="text-xs font-medium mb-2">Legend</p>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span>High Opportunity (85+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span>Medium Opportunity (75-84)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3" />
                <span>Developing ({"<"}75)</span>
              </div>
              <div className="flex items-center gap-2 mt-1 pt-1 border-t">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>Investment Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span>School/Institution</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

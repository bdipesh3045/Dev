'use client'

import { schools } from '@/lib/data'
import { calculatePriorityScore } from '@/lib/store'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Parish poverty index for priority calculation
const povertyIndex: Record<string, number> = {
  'Orleans': 23.8,
  'East Baton Rouge': 18.2,
  'Jefferson': 15.4,
  'Calcasieu': 16.8,
  'Caddo': 24.1,
  'Lafayette': 14.2,
  'Lincoln': 28.5,
  'Natchitoches': 26.2
}

export function OpportunityTable() {
  // Calculate priority score and sort schools
  const schoolsWithPriority = schools.map(school => {
    const poverty = povertyIndex[school.parish] || 18
    const workforceGap = 100 - school.workforceAlignment
    const priority = calculatePriorityScore(workforceGap, poverty, school.fundingNeeds)
    return { ...school, priority }
  })
  
  const sortedSchools = [...schoolsWithPriority].sort((a, b) => b.priority - a.priority)

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h3 className="font-semibold text-foreground">Priority Investment Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Schools ranked by: (Workforce Gap x Poverty Index) / Current Funding
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          View All <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="p-4 font-medium">Institution</th>
              <th className="p-4 font-medium">Parish</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium text-right">Enrollment</th>
              <th className="p-4 font-medium text-right">Priority Score</th>
              <th className="p-4 font-medium text-right">Workforce Gap</th>
              <th className="p-4 font-medium text-right">Funding Need</th>
            </tr>
          </thead>
          <tbody>
            {sortedSchools.map((school, index) => (
              <tr key={school.id} className="border-b border-border last:border-0 transition-colors hover:bg-secondary/50">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {index < 3 && (
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        index === 0 ? 'bg-chart-1 text-primary-foreground' :
                        index === 1 ? 'bg-chart-2 text-primary-foreground' :
                        'bg-chart-5 text-primary-foreground'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                    <div>
                      <div className="font-medium text-foreground">{school.name}</div>
                      <div className="text-xs text-muted-foreground">{school.topPrograms.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{school.parish}</td>
                <td className="p-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    school.type === 'University' ? 'bg-chart-4/20 text-chart-4' :
                    school.type === 'Community College' ? 'bg-chart-1/20 text-chart-1' :
                    school.type === 'Technical School' ? 'bg-chart-2/20 text-chart-2' :
                    'bg-chart-5/20 text-chart-5'
                  }`}>
                    {school.type}
                  </span>
                </td>
                <td className="p-4 text-right text-sm text-foreground">
                  {school.enrollment.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-sm font-bold ${
                      school.priority >= 1.5 ? 'text-chart-3' :
                      school.priority >= 1.0 ? 'text-chart-2' :
                      'text-chart-1'
                    }`}>
                      {school.priority.toFixed(1)}
                    </span>
                    {school.priority >= 1.5 && (
                      <ArrowUpRight className="h-3 w-3 text-chart-3" />
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full ${
                          (100 - school.workforceAlignment) >= 20 ? 'bg-chart-3' : 'bg-chart-1'
                        }`}
                        style={{ width: `${100 - school.workforceAlignment}%` }}
                      />
                    </div>
                    <span className="text-sm text-foreground">{100 - school.workforceAlignment}%</span>
                  </div>
                </td>
                <td className="p-4 text-right text-sm text-foreground">
                  ${(school.fundingNeeds / 1000000).toFixed(1)}M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Takeaway Header */}
      <div className="border-t border-border bg-chart-3/5 p-4">
        <p className="text-sm font-medium text-chart-3">
          Key Insight: Northwestern State University in Natchitoches shows highest priority score due to elevated poverty index and workforce gap despite moderate funding levels.
        </p>
      </div>
    </div>
  )
}

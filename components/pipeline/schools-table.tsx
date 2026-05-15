'use client'

import { useState, useMemo } from 'react'
import { School, schools, parishes } from '@/lib/data'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Search, ArrowUpDown, GraduationCap, Building2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SortKey = 'name' | 'enrollment' | 'opportunityScore' | 'fundingNeeds'
type SortOrder = 'asc' | 'desc'

export function SchoolsTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [parishFilter, setParishFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('opportunityScore')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const uniqueParishes = useMemo(() => {
    return [...new Set(schools.map(s => s.parish))].sort()
  }, [])

  const filteredSchools = useMemo(() => {
    let result = [...schools]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        s =>
          s.name.toLowerCase().includes(query) ||
          s.parish.toLowerCase().includes(query) ||
          s.topPrograms.some(p => p.toLowerCase().includes(query))
      )
    }

    if (parishFilter !== 'all') {
      result = result.filter(s => s.parish === parishFilter)
    }

    if (typeFilter !== 'all') {
      result = result.filter(s => s.type === typeFilter)
    }

    result.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })

    return result
  }, [searchQuery, parishFilter, typeFilter, sortKey, sortOrder])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const getTypeColor = (type: School['type']) => {
    switch (type) {
      case 'University':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'Community College':
        return 'bg-accent/10 text-accent-foreground border-accent/20'
      case 'Technical School':
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Schools & Institutions
            </CardTitle>
            <CardDescription>
              {filteredSchools.length} of {schools.length} institutions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {formatNumber(filteredSchools.reduce((acc, s) => acc + s.enrollment, 0))} students
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search schools, parishes, or programs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={parishFilter} onValueChange={setParishFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Parish" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parishes</SelectItem>
                {uniqueParishes.map(parish => (
                  <SelectItem key={parish} value={parish}>
                    {parish}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="University">University</SelectItem>
                <SelectItem value="Community College">Community College</SelectItem>
                <SelectItem value="Technical School">Technical School</SelectItem>
                <SelectItem value="K-12">K-12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[280px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 px-2 font-medium"
                  onClick={() => handleSort('name')}
                >
                  Institution
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 px-2 font-medium"
                  onClick={() => handleSort('enrollment')}
                >
                  Enrollment
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 px-2 font-medium"
                  onClick={() => handleSort('opportunityScore')}
                >
                  Opportunity
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Workforce Align.</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 px-2 font-medium"
                  onClick={() => handleSort('fundingNeeds')}
                >
                  Funding Need
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Top Programs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchools.map(school => (
              <TableRow key={school.id} className="group">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {school.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{school.parish} Parish</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(school.type)}>
                    {school.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{formatNumber(school.enrollment)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Progress value={school.opportunityScore} className="h-2 flex-1" />
                    <span className="text-sm font-medium w-8">{school.opportunityScore}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Progress
                      value={school.workforceAlignment}
                      className="h-2 flex-1 [&>div]:bg-accent"
                    />
                    <span className="text-sm font-medium w-8">{school.workforceAlignment}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-chart-1">
                    {formatCurrency(school.fundingNeeds)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {school.topPrograms.slice(0, 2).map(program => (
                      <Badge key={program} variant="secondary" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                    {school.topPrograms.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{school.topPrograms.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredSchools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No schools found matching your criteria</p>
            <Button
              variant="link"
              className="mt-1"
              onClick={() => {
                setSearchQuery('')
                setParishFilter('all')
                setTypeFilter('all')
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

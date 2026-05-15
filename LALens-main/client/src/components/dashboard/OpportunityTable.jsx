import { useState } from "react";
import { Search, ArrowUpDown, ExternalLink } from "lucide-react";
import { schools } from "../../data/portalData";
import { Badge } from "../ui/Badge";

export function OpportunityTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("opportunityScore");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredSchools = schools
    .filter(school => 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.parish.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-700";
    if (score >= 80) return "bg-purple-100 text-purple-700";
    if (score >= 70) return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Investment Opportunities</h3>
            <p className="text-sm text-gray-500">Schools ranked by opportunity score and funding needs</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Institution
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-purple-600"
                onClick={() => handleSort("opportunityScore")}
              >
                <span className="flex items-center gap-1">
                  Opportunity
                  <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-purple-600"
                onClick={() => handleSort("workforceAlignment")}
              >
                <span className="flex items-center gap-1">
                  Alignment
                  <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-purple-600"
                onClick={() => handleSort("fundingNeeds")}
              >
                <span className="flex items-center gap-1">
                  Funding Need
                  <ArrowUpDown className="h-3 w-3" />
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Programs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSchools.map((school) => (
              <tr key={school.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-gray-900">{school.name}</div>
                      <div className="text-sm text-gray-500">{school.parish} Parish</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{school.type}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(school.opportunityScore)}`}>
                    {school.opportunityScore}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${school.workforceAlignment}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{school.workforceAlignment}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-gray-900">
                    ${(school.fundingNeeds / 1000000).toFixed(1)}M
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {school.topPrograms.slice(0, 2).map((program, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        {program}
                      </span>
                    ))}
                    {school.topPrograms.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500">
                        +{school.topPrograms.length - 2}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

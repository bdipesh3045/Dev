import { Lightbulb, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
import { aiInsights } from "../../data/portalData";

const iconMap = {
  opportunity: Lightbulb,
  alert: AlertCircle,
  trend: TrendingUp,
};

const colorMap = {
  high: {
    opportunity: "bg-purple-50 border-purple-200 text-purple-700",
    alert: "bg-amber-50 border-amber-200 text-amber-700",
    trend: "bg-green-50 border-green-200 text-green-700",
  },
  medium: {
    opportunity: "bg-purple-50/50 border-purple-100 text-purple-600",
    alert: "bg-amber-50/50 border-amber-100 text-amber-600",
    trend: "bg-green-50/50 border-green-100 text-green-600",
  },
};

export function AIInsightCards() {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
          4 new
        </span>
      </div>
      <div className="space-y-3">
        {aiInsights.map((insight) => {
          const Icon = iconMap[insight.type] || Lightbulb;
          const colorClass = colorMap[insight.priority]?.[insight.type] || colorMap.medium.opportunity;
          
          return (
            <div
              key={insight.id}
              className={`p-3 rounded-xl border ${colorClass} transition-all hover:shadow-sm cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold truncate">{insight.title}</h4>
                    {insight.priority === "high" && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-[10px] font-semibold uppercase">
                        High
                      </span>
                    )}
                  </div>
                  <p className="text-xs opacity-80 line-clamp-2">{insight.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 opacity-50" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

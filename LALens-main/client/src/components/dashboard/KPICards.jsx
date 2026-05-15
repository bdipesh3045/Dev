import { TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, AlertTriangle, Target, BarChart3 } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { kpiData, enrollmentTrend } from "../../data/portalData";

// Generate sparkline data from enrollment trend
const enrollmentSparkline = enrollmentTrend.map((d) => ({ v: d.enrollment / 1000 }));
const graduateSparkline = enrollmentTrend.map((d) => ({ v: d.graduates / 1000 }));
const opportunitySparkline = [{ v: 72 }, { v: 75 }, { v: 78 }, { v: 80 }, { v: 82 }, { v: 84 }];
const fundingSparkline = [{ v: 3.2 }, { v: 3.0 }, { v: 2.8 }, { v: 2.6 }, { v: 2.5 }, { v: 2.4 }];
const workforceSparkline = [{ v: 38 }, { v: 36 }, { v: 35 }, { v: 34 }, { v: 33 }, { v: 32 }];
const gradRateSparkline = [{ v: 42 }, { v: 44 }, { v: 45 }, { v: 46.5 }, { v: 47.2 }, { v: 48.5 }];

function Sparkline({ data, color = "var(--purple)" }) {
  return (
    <div className="h-8 w-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function KPICards() {
  const cards = [
    {
      title: 'Total Institutions',
      value: kpiData.totalSchools.toLocaleString(),
      change: '+3 this year',
      trend: 'up',
      icon: <GraduationCap className="h-5 w-5" />,
      sparkline: enrollmentSparkline,
      color: 'var(--purple)'
    },
    {
      title: 'Total Enrollment',
      value: (kpiData.totalEnrollment / 1000).toFixed(0) + 'K',
      change: '+4.2% YoY',
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      sparkline: enrollmentSparkline,
      color: 'var(--purple)'
    },
    {
      title: 'Avg Opportunity Score',
      value: kpiData.avgOpportunityScore + '/100',
      change: '+6 pts from 2024',
      trend: 'up',
      icon: <Target className="h-5 w-5" />,
      sparkline: opportunitySparkline,
      color: 'var(--purple)'
    },
    {
      title: 'Funding Gap',
      value: '$' + kpiData.totalFundingGap + 'B',
      change: '-8% from last year',
      trend: 'down',
      icon: <DollarSign className="h-5 w-5" />,
      sparkline: fundingSparkline,
      color: 'var(--green)'
    },
    {
      title: 'Workforce Gap',
      value: kpiData.workforceGap + '%',
      change: 'Critical shortage',
      trend: 'alert',
      icon: <AlertTriangle className="h-5 w-5" />,
      sparkline: workforceSparkline,
      color: 'var(--red)'
    },
    {
      title: 'Avg Graduation Rate',
      value: kpiData.avgGraduationRate + '%',
      change: '+2.1% from 2024',
      trend: 'up',
      icon: <BarChart3 className="h-5 w-5" />,
      sparkline: gradRateSparkline,
      color: 'var(--purple)'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card p-4 transition-colors hover:border-purple-300"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{card.icon}</span>
            <Sparkline data={card.sparkline} color={card.color} />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-xs text-gray-500">{card.title}</div>
          </div>
          <div className={`mt-2 flex items-center gap-1 text-xs ${
            card.trend === 'alert' ? 'text-red-500' : 
            card.trend === 'down' ? 'text-green-500' : 'text-purple-600'
          }`}>
            {card.trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {card.trend === 'down' && <TrendingDown className="h-3 w-3" />}
            {card.trend === 'alert' && <AlertTriangle className="h-3 w-3" />}
            {card.change}
          </div>
        </div>
      ))}
    </div>
  );
}

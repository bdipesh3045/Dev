import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { workforceTrends } from "../../data/portalData";

export function WorkforceChart() {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Workforce Gap by Sector</h3>
      <p className="text-sm text-gray-500 mb-4">Skills gap percentage vs. industry demand</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workforceTrends} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[0, 60]} 
              tickFormatter={(v) => `${v}%`}
              fontSize={10}
              stroke="#9ca3af"
            />
            <YAxis 
              type="category" 
              dataKey="sector" 
              width={100}
              fontSize={10}
              stroke="#9ca3af"
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Gap"]}
              contentStyle={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
            <Bar 
              dataKey="gapPercentage" 
              fill="var(--purple)" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

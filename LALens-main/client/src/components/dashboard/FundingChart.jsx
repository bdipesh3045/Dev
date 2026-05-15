import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { fundingByCategory } from "../../data/portalData";

const COLORS = ["var(--purple)", "var(--cyan)", "var(--green)", "var(--amber)", "var(--red)"];

export function FundingChart() {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Funding Gap by Category</h3>
      <p className="text-sm text-gray-500 mb-4">Distribution of funding needs in millions</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={fundingByCategory}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {fundingByCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}M`, "Amount"]}
              contentStyle={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {fundingByCategory.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ background: COLORS[index % COLORS.length] }} 
            />
            <span className="text-xs text-gray-600">{item.name}</span>
            <span className="text-xs font-semibold text-gray-900 ml-auto">${item.value}M</span>
          </div>
        ))}
      </div>
    </div>
  );
}

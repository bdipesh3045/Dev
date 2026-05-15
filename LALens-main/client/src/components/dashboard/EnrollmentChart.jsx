import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { enrollmentTrend } from "../../data/portalData";

export function EnrollmentChart() {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Enrollment Trends</h3>
      <p className="text-sm text-gray-500 mb-4">Total enrollment and graduates over time</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={enrollmentTrend} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              fontSize={10}
              stroke="#9ca3af"
            />
            <YAxis 
              fontSize={10}
              stroke="#9ca3af"
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              formatter={(value, name) => [
                `${(value / 1000).toFixed(1)}K`,
                name === "enrollment" ? "Enrolled" : "Graduates"
              ]}
              contentStyle={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
            <Line
              type="monotone"
              dataKey="enrollment"
              stroke="var(--purple)"
              strokeWidth={2}
              dot={{ fill: "var(--purple)", r: 3 }}
              name="enrollment"
            />
            <Line
              type="monotone"
              dataKey="graduates"
              stroke="var(--cyan)"
              strokeWidth={2}
              dot={{ fill: "var(--cyan)", r: 3 }}
              name="graduates"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "var(--purple)" }} />
          <span className="text-xs text-gray-600">Enrollment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "var(--cyan)" }} />
          <span className="text-xs text-gray-600">Graduates</span>
        </div>
      </div>
    </div>
  );
}

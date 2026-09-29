"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { LoggedEntry, CATEGORY_META, formatKg } from "@/lib/carbon";

interface Props {
  entries: LoggedEntry[];
}

const COLORS: Record<string, string> = {
  transport: "#0ea5e9",
  energy: "#f59e0b",
  food: "#f97316",
  waste: "#a855f7",
  events: "#ec4899",
};

export default function Breakdown({ entries }: Props) {
  const byCat: Record<string, number> = {};
  entries.forEach((e) => {
    byCat[e.category] = (byCat[e.category] || 0) + e.emissions;
  });

  const data = Object.entries(byCat)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: CATEGORY_META[key as keyof typeof CATEGORY_META]?.label || key,
      value: Math.round(value * 100) / 100,
      key,
    }));

  if (data.length === 0) {
    return (
      <div className="card text-center py-10">
        <p className="text-3xl mb-2">📊</p>
        <p className="text-sm text-gray-500">
          Breakdown appears once you log positive-emission activities
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="font-bold text-eco-900 mb-1">Emission Breakdown</h2>
      <p className="text-xs text-gray-500 mb-4">By category (kg CO₂e)</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={COLORS[entry.key] || "#22c55e"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatKg(value), "CO₂e"]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #dcfce7",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

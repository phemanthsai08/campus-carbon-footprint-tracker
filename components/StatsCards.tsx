"use client";

import { formatKg } from "@/lib/carbon";
import { TrendingDown, Calendar, Flame, Award } from "lucide-react";

interface Props {
  totalKg: number;
  todayKg: number;
  entryCount: number;
  streakDays: number;
}

export default function StatsCards({
  totalKg,
  todayKg,
  entryCount,
  streakDays,
}: Props) {
  const cards = [
    {
      label: "Total Footprint",
      value: formatKg(totalKg),
      icon: Flame,
      accent: "from-orange-400 to-red-500",
      hint: "All time",
    },
    {
      label: "Today",
      value: formatKg(todayKg),
      icon: Calendar,
      accent: "from-sky-400 to-blue-500",
      hint: "Logged today",
    },
    {
      label: "Activities",
      value: String(entryCount),
      icon: TrendingDown,
      accent: "from-eco-400 to-eco-600",
      hint: "Logged so far",
    },
    {
      label: "Green Streak",
      value: `${streakDays}d`,
      icon: Award,
      accent: "from-amber-400 to-yellow-500",
      hint: "Days with logs",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="card !p-4 animate-slide-up"
        >
          <div className="flex items-start justify-between mb-2">
            <div
              className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.accent} flex items-center justify-center shadow-md`}
            >
              <c.icon className="w-4.5 h-4.5 text-white" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            {c.value}
          </p>
          <p className="text-sm font-medium text-gray-600">{c.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{c.hint}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

import { LoggedEntry, CATEGORY_META, formatKg } from "@/lib/carbon";
import { Trash2 } from "lucide-react";

interface Props {
  entries: LoggedEntry[];
  onDelete: (id: string) => void;
}

export default function History({ entries, onDelete }: Props) {
  if (entries.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-4xl mb-3">🌱</p>
        <p className="font-medium text-gray-700">No activities yet</p>
        <p className="text-sm text-gray-500 mt-1">
          Log your first campus activity to start tracking!
        </p>
      </div>
    );
  }

  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="card !p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-eco-100">
        <h2 className="font-bold text-eco-900">Recent Activity</h2>
        <p className="text-xs text-gray-500">{entries.length} entries</p>
      </div>
      <ul className="divide-y divide-eco-50 max-h-96 overflow-y-auto">
        {sorted.map((e) => {
          const meta = CATEGORY_META[e.category];
          const d = new Date(e.date);
          return (
            <li
              key={e.id}
              className="px-5 py-3.5 flex items-start gap-3 hover:bg-eco-50/50 transition group"
            >
              <div
                className={`badge ${meta.bg} ${meta.color} shrink-0 mt-0.5`}
              >
                {meta.label}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-800 truncate">
                  {e.label}
                </p>
                <p className="text-xs text-gray-500">
                  {e.value} {e.unit}
                  {e.note ? ` · ${e.note}` : ""}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {d.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`font-semibold text-sm ${
                    e.emissions <= 0 ? "text-eco-600" : "text-orange-600"
                  }`}
                >
                  {e.emissions <= 0 ? "−" : "+"}
                  {formatKg(Math.abs(e.emissions))}
                </p>
                <button
                  onClick={() => onDelete(e.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 transition mt-1"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

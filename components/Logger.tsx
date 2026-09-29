"use client";

import { useState } from "react";
import {
  ACTIVITY_TEMPLATES,
  CATEGORY_META,
  ActivityCategory,
  calcEmissions,
  formatKg,
} from "@/lib/carbon";
import { Plus, X } from "lucide-react";

interface Props {
  onAdd: (entry: {
    category: ActivityCategory;
    label: string;
    value: number;
    unit: string;
    emissions: number;
    note?: string;
  }) => void;
}

export default function Logger({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(ACTIVITY_TEMPLATES[0].id);
  const [value, setValue] = useState(1);
  const [note, setNote] = useState("");

  const template = ACTIVITY_TEMPLATES.find((t) => t.id === selectedId)!;
  const preview = calcEmissions(value, template.factor);

  const categories = Array.from(
    new Set(ACTIVITY_TEMPLATES.map((t) => t.category))
  ) as ActivityCategory[];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value <= 0) return;
    onAdd({
      category: template.category,
      label: template.label,
      value,
      unit: template.unit,
      emissions: preview,
      note: note.trim() || undefined,
    });
    setValue(1);
    setNote("");
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary w-full sm:w-auto shadow-lg shadow-eco-600/30"
      >
        <Plus className="w-5 h-5" />
        Log Activity
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="card w-full max-w-md max-h-[90vh] overflow-y-auto !p-0 animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-eco-100">
              <h2 className="text-lg font-bold text-eco-900">Log Activity</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-eco-50 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      const first = ACTIVITY_TEMPLATES.find(
                        (t) => t.category === cat
                      );
                      if (first) setSelectedId(first.id);
                    }}
                    className={`badge ${
                      template.category === cat
                        ? CATEGORY_META[cat].bg +
                          " " +
                          CATEGORY_META[cat].color +
                          " ring-2 ring-offset-1 ring-eco-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {CATEGORY_META[cat].label}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Activity
                </label>
                <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto">
                  {ACTIVITY_TEMPLATES.filter(
                    (t) => t.category === template.category
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedId(t.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                        selectedId === t.id
                          ? "bg-eco-100 border-2 border-eco-400"
                          : "bg-gray-50 border-2 border-transparent hover:bg-eco-50"
                      }`}
                    >
                      <span className="text-xl">{t.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-800 truncate">
                          {t.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t.factor === 0
                            ? "Zero emission ✨"
                            : t.factor < 0
                            ? `${t.factor} kg / ${t.unit}`
                            : `${t.factor} kg CO₂e / ${t.unit}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Amount ({template.unit})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={value}
                  onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Note (optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Morning commute"
                  className="input-field"
                  maxLength={80}
                />
              </div>

              <div className="rounded-xl bg-eco-50 border border-eco-200 p-3 flex items-center justify-between">
                <span className="text-sm text-eco-800">Estimated impact</span>
                <span
                  className={`font-bold text-lg ${
                    preview <= 0 ? "text-eco-600" : "text-orange-600"
                  }`}
                >
                  {preview <= 0 ? "−" : "+"}
                  {formatKg(Math.abs(preview))} CO₂e
                </span>
              </div>

              <button type="submit" className="btn-primary w-full">
                <Plus className="w-4 h-4" />
                Add to Tracker
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

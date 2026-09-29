"use client";

const TIPS = [
  {
    emoji: "🚲",
    title: "Active commute",
    text: "Walk or cycle when possible — zero emissions and better health.",
  },
  {
    emoji: "🚌",
    title: "Public & shared rides",
    text: "Buses and carpools cut per-person emissions dramatically.",
  },
  {
    emoji: "🥗",
    title: "Plant-forward meals",
    text: "One veggie day a week can save several kg of CO₂e.",
  },
  {
    emoji: "💡",
    title: "Switch off",
    text: "Turn off lights, ACs and chargers when leaving classrooms.",
  },
  {
    emoji: "♻️",
    title: "Refuse & recycle",
    text: "Skip single-use plastics and sort waste properly on campus.",
  },
  {
    emoji: "📱",
    title: "Digital first",
    text: "Prefer digital notes over printouts when practical.",
  },
];

export default function Tips() {
  return (
    <div className="card">
      <h2 className="font-bold text-eco-900 mb-1">Green Campus Tips</h2>
      <p className="text-xs text-gray-500 mb-4">
        Small daily choices add up to a lighter footprint
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {TIPS.map((t) => (
          <div
            key={t.title}
            className="flex gap-3 p-3 rounded-xl bg-eco-50/70 border border-eco-100"
          >
            <span className="text-2xl shrink-0">{t.emoji}</span>
            <div>
              <p className="font-semibold text-sm text-eco-900">{t.title}</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                {t.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

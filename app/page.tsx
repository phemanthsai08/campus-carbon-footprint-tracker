"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import Logger from "@/components/Logger";
import History from "@/components/History";
import Breakdown from "@/components/Breakdown";
import Tips from "@/components/Tips";
import {
  LoggedEntry,
  STORAGE_KEY,
  formatKg,
  getEquivalents,
  ActivityCategory,
} from "@/lib/carbon";

function loadEntries(): LoggedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: LoggedEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function calcStreak(entries: LoggedEntry[]): number {
  if (entries.length === 0) return 0;
  const days = new Set(
    entries.map((e) => new Date(e.date).toDateString())
  );
  let streak = 0;
  const d = new Date();
  for (;;) {
    if (days.has(d.toDateString())) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export default function Home() {
  const [entries, setEntries] = useState<LoggedEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveEntries(entries);
  }, [entries, hydrated]);

  const addEntry = useCallback(
    (data: {
      category: ActivityCategory;
      label: string;
      value: number;
      unit: string;
      emissions: number;
      note?: string;
    }) => {
      const entry: LoggedEntry = {
        id: crypto.randomUUID(),
        ...data,
        date: new Date().toISOString(),
      };
      setEntries((prev) => [entry, ...prev]);
    },
    []
  );

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const totalKg = entries.reduce((s, e) => s + e.emissions, 0);
  const todayStr = new Date().toDateString();
  const todayKg = entries
    .filter((e) => new Date(e.date).toDateString() === todayStr)
    .reduce((s, e) => s + e.emissions, 0);
  const streak = calcStreak(entries);
  const equivalents = getEquivalents(totalKg);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-soft text-eco-600 font-medium">
          Loading your footprint…
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <section className="text-center space-y-2 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-eco-900 tracking-tight">
            Your Campus Impact Dashboard
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Log everyday activities — transport, meals, energy use — and see
            how your choices shape the campus carbon footprint.
          </p>
        </section>

        <StatsCards
          totalKg={totalKg}
          todayKg={todayKg}
          entryCount={entries.length}
          streakDays={streak}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logger onAdd={addEntry} />
          {totalKg > 0 && equivalents.length > 0 && (
            <div className="text-sm text-gray-600 bg-white/60 rounded-xl px-4 py-2 border border-eco-100">
              <span className="font-medium text-eco-800">
                {formatKg(totalKg)} CO₂e
              </span>{" "}
              ≈ {equivalents[0]}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 space-y-5">
            <History entries={entries} onDelete={deleteEntry} />
          </div>
          <div className="lg:col-span-2 space-y-5">
            <Breakdown entries={entries} />
          </div>
        </div>

        <Tips />

        <footer className="text-center text-xs text-gray-400 py-8">
          <p>
            Built for campus sustainability · Emission factors are educational
            estimates
          </p>
          <p className="mt-1">
            Open source · Deployed on Vercel · Data stays in your browser
          </p>
        </footer>
      </main>
    </>
  );
}

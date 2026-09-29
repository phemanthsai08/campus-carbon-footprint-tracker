/**
 * Campus Carbon Footprint emission factors (kg CO₂e)
 * Approximate values for educational use — based on common LCA averages.
 */

export type ActivityCategory =
  | "transport"
  | "energy"
  | "food"
  | "waste"
  | "events";

export interface ActivityInput {
  id: string;
  category: ActivityCategory;
  label: string;
  value: number;
  unit: string;
  factor: number; // kg CO₂e per unit
  icon: string;
}

export interface LoggedEntry {
  id: string;
  category: ActivityCategory;
  label: string;
  value: number;
  unit: string;
  emissions: number;
  date: string; // ISO
  note?: string;
}

/** Default activity templates students can log */
export const ACTIVITY_TEMPLATES: Omit<ActivityInput, "value">[] = [
  // Transport
  {
    id: "walk-bike",
    category: "transport",
    label: "Walk / Cycle to campus",
    unit: "km",
    factor: 0,
    icon: "🚲",
  },
  {
    id: "bus",
    category: "transport",
    label: "Campus / City bus",
    unit: "km",
    factor: 0.089,
    icon: "🚌",
  },
  {
    id: "car-solo",
    category: "transport",
    label: "Car (solo)",
    unit: "km",
    factor: 0.171,
    icon: "🚗",
  },
  {
    id: "carpool",
    category: "transport",
    label: "Carpool (2+ people)",
    unit: "km",
    factor: 0.085,
    icon: "🚙",
  },
  {
    id: "motorcycle",
    category: "transport",
    label: "Two-wheeler",
    unit: "km",
    factor: 0.103,
    icon: "🏍️",
  },
  // Energy
  {
    id: "laptop",
    category: "energy",
    label: "Laptop usage",
    unit: "hours",
    factor: 0.05,
    icon: "💻",
  },
  {
    id: "ac",
    category: "energy",
    label: "AC / Cooling (shared room)",
    unit: "hours",
    factor: 0.8,
    icon: "❄️",
  },
  {
    id: "lights",
    category: "energy",
    label: "Lights & appliances",
    unit: "hours",
    factor: 0.12,
    icon: "💡",
  },
  // Food
  {
    id: "veg-meal",
    category: "food",
    label: "Vegetarian meal",
    unit: "meals",
    factor: 1.5,
    icon: "🥗",
  },
  {
    id: "nonveg-meal",
    category: "food",
    label: "Non-veg meal",
    unit: "meals",
    factor: 4.2,
    icon: "🍗",
  },
  {
    id: "packaged",
    category: "food",
    label: "Packaged / takeaway",
    unit: "items",
    factor: 0.8,
    icon: "📦",
  },
  // Waste
  {
    id: "plastic",
    category: "waste",
    label: "Single-use plastic",
    unit: "items",
    factor: 0.15,
    icon: "🛍️",
  },
  {
    id: "paper",
    category: "waste",
    label: "Paper / printouts",
    unit: "sheets",
    factor: 0.005,
    icon: "📄",
  },
  {
    id: "recycled",
    category: "waste",
    label: "Recycled properly",
    unit: "items",
    factor: -0.05,
    icon: "♻️",
  },
  // Events
  {
    id: "event-attendance",
    category: "events",
    label: "Large campus event",
    unit: "events",
    factor: 2.5,
    icon: "🎉",
  },
];

export const CATEGORY_META: Record<
  ActivityCategory,
  { label: string; color: string; bg: string }
> = {
  transport: { label: "Transport", color: "text-sky-700", bg: "bg-sky-100" },
  energy: { label: "Energy", color: "text-amber-700", bg: "bg-amber-100" },
  food: { label: "Food", color: "text-orange-700", bg: "bg-orange-100" },
  waste: { label: "Waste", color: "text-purple-700", bg: "bg-purple-100" },
  events: { label: "Events", color: "text-pink-700", bg: "bg-pink-100" },
};

export function calcEmissions(value: number, factor: number): number {
  return Math.round(value * factor * 100) / 100;
}

export function formatKg(kg: number): string {
  if (Math.abs(kg) < 0.01) return "0 kg";
  if (Math.abs(kg) < 1) return `${kg.toFixed(2)} kg`;
  return `${kg.toFixed(1)} kg`;
}

/** Rough equivalent comparisons for education */
export function getEquivalents(kg: number): string[] {
  const abs = Math.abs(kg);
  const items: string[] = [];
  if (abs >= 0.1) {
    items.push(`≈ ${(abs / 0.21).toFixed(1)} km driven by car`);
  }
  if (abs >= 0.5) {
    items.push(`≈ ${(abs / 2.5).toFixed(1)} smartphone charges`);
  }
  if (abs >= 1) {
    items.push(`≈ ${(abs / 21).toFixed(2)} trees needed for a year`);
  }
  return items;
}

export const STORAGE_KEY = "ccft-entries-v1";

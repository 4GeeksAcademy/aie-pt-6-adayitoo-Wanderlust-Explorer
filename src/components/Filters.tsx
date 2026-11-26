/* ------------------------------------------------------------------ */
/*  src/components/Filters.tsx – Category & destination dropdowns      */
/*  Reads initial values from the URL and fires callbacks on change.  */
/* ------------------------------------------------------------------ */

"use client";

import type { Category } from "../types/index";

/** The five available categories */
const CATEGORIES: Category[] = [
  "adventure",
  "cultural",
  "food",
  "nature",
  "wellness",
];

export interface FiltersProps {
  /** Current category value from URL */
  initialCategory: string;
  /** Current destination value from URL */
  initialDestination: string;
  /** Unique list of destinations to populate the dropdown */
  destinations: string[];
  /** Called when category changes */
  onCategoryChange: (value: string) => void;
  /** Called when destination changes */
  onDestinationChange: (value: string) => void;
}

/**
 * Filters – renders two `<select>` dropdowns for category and destination.
 * Values are driven by the URL (injected via props) so the URL remains
 * the single source of truth.
 */
export function Filters({
  initialCategory,
  initialDestination,
  destinations,
  onCategoryChange,
  onDestinationChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* ── Category dropdown ────────────────────────────── */}
      <div>
        <label htmlFor="category-select" className="sr-only">
          Filter by category
        </label>
        <select
          id="category-select"
          value={initialCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors appearance-none cursor-pointer"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ── Destination dropdown ─────────────────────────── */}
      <div>
        <label htmlFor="destination-select" className="sr-only">
          Filter by destination
        </label>
        <select
          id="destination-select"
          value={initialDestination}
          onChange={(e) => onDestinationChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-8 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors appearance-none cursor-pointer"
        >
          <option value="">All destinations</option>
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
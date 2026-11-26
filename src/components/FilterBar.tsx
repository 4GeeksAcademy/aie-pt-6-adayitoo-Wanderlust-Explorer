/* ------------------------------------------------------------------ */
/*  src/components/FilterBar.tsx – Category & destination dropdowns    */
/*  Controlled component; values come from the URL via props.          */
/* ------------------------------------------------------------------ */

"use client";

import type { Category } from "../types/index";

const CATEGORIES: Category[] = [
  "adventure",
  "cultural",
  "food",
  "nature",
  "wellness",
];

export interface FilterBarProps {
  initialCategory: string;
  initialDestination: string;
  destinations: string[];
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

/**
 * FilterBar – renders two `<select>` dropdowns for category and destination.
 * Values are injected via props (sourced from URL query params).
 */
export function FilterBar({
  initialCategory,
  initialDestination,
  destinations,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* ── Category ──────────────────────────────────────── */}
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

      {/* ── Destination ───────────────────────────────────── */}
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

export default FilterBar;